import { injectable } from 'tsyringe';
import { s3Adapter } from '@/adapters/aws-s3/s3.adapter';
import { BadRequestException } from '@/core/exceptions/http.exception';
import logger from '@/core/utils/logger';

export interface ImageUploadResult {
  success: boolean;
  imagePath?: string;  // S3 key/path (stored in DB, full URL constructed at runtime)
  fullUrl?: string;    // Full S3 URL (for immediate use if needed)
  s3Key?: string;      // Same as imagePath, kept for backward compatibility
  error?: string;
}

export interface PackageImageUpload {
  file: Express.Multer.File;
  imageOrder?: number;
  isCover?: boolean;
}

@injectable()
export class PackageImageUploadService {
  private readonly ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif'
  ];

  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private readonly S3_FOLDER = 'packages/images';

  /**
   * Validates uploaded image file
   */
  private validateImageFile(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('No image file provided');
    }

    if (!this.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types: ${this.ALLOWED_MIME_TYPES.join(', ')}`
      );
    }

    if (file.size > this.MAX_FILE_SIZE) {
      throw new BadRequestException(
        `File size too large. Maximum size: ${this.MAX_FILE_SIZE / (1024 * 1024)}MB`
      );
    }
  }

  /**
   * Generates S3 key for package image
   */
  private generateS3Key(packageId: string, fileName: string): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = fileName.split('.').pop();

    return `${this.S3_FOLDER}/${packageId}/${timestamp}-${randomString}.${fileExtension}`;
  }

  /**
   * Uploads a single image to S3
   */
  async uploadImage(
    packageId: string,
    file: Express.Multer.File
  ): Promise<ImageUploadResult> {
    try {
      this.validateImageFile(file);

      const s3Key = this.generateS3Key(packageId, file.originalname);

      logger.info('Uploading package image to S3', {
        packageId,
        fileName: file.originalname,
        fileSize: file.size,
        s3Key
      });

      const uploadResult = await s3Adapter.upload({
        file: file.buffer,
        fileName: file.originalname,
        key: s3Key,
        contentType: file.mimetype,
        acl: 'public-read',
        metadata: {
          packageId,
          originalName: file.originalname,
          uploadedAt: new Date().toISOString()
        }
      });

      if (!uploadResult.success) {
        logger.error('S3 upload failed', {
          packageId,
          error: uploadResult.error
        });
        return {
          success: false,
          error: uploadResult.error || 'Failed to upload image'
        };
      }

      logger.info('Package image uploaded successfully', {
        packageId,
        s3Key,
        imageUrl: uploadResult.url
      });

      return {
        success: true,
        imagePath: uploadResult.key,  // S3 path/key - store this in DB
        fullUrl: uploadResult.url,    // Full URL for immediate use
        s3Key: uploadResult.key       // Backward compatibility
      };

    } catch (error: any) {
      logger.error('Image upload error', {
        packageId,
        error: error.message,
        stack: error.stack
      });

      return {
        success: false,
        error: error.message || 'Failed to upload image'
      };
    }
  }

  /**
   * Uploads multiple images to S3
   */
  async uploadMultipleImages(
    packageId: string,
    images: PackageImageUpload[]
  ): Promise<ImageUploadResult[]> {
    const uploadPromises = images.map(({ file }) =>
      this.uploadImage(packageId, file)
    );

    return Promise.all(uploadPromises);
  }

  /**
   * Deletes image from S3
   */
  async deleteImage(s3Key: string): Promise<boolean> {
    try {
      const deleteResult = await s3Adapter.delete(s3Key);

      if (!deleteResult.success) {
        logger.error('Failed to delete image from S3', {
          s3Key,
          error: deleteResult.error
        });
        return false;
      }

      logger.info('Image deleted from S3', { s3Key });
      return true;

    } catch (error: any) {
      logger.error('Error deleting image from S3', {
        s3Key,
        error: error.message
      });
      return false;
    }
  }
}