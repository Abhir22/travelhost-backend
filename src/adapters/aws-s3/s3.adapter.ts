import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Config } from './s3.config';
import { S3UploadOptions, S3UploadResult, S3DeleteResult, S3ListResult } from './s3.types';

/**
 * AWS S3 Adapter
 * Handles file uploads, downloads, and management with Amazon S3
 */
export class AwsS3Adapter {
  private client: S3Client;
  private bucket: string;

  constructor() {
    this.client = new S3Client({
      region: s3Config.region,
      credentials: {
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secretAccessKey,
      },
    });
    this.bucket = s3Config.bucket;
  }

  /**
   * Upload a file to S3
   */
  async upload(options: S3UploadOptions): Promise<S3UploadResult> {
    try {
      const key = options.key || `${Date.now()}-${options.fileName}`;
      
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: options.file,
        ContentType: options.contentType,
        Metadata: options.metadata,
        ACL: options.acl || 'private',
      });

      await this.client.send(command);

      const url = `https://${this.bucket}.s3.${s3Config.region}.amazonaws.com/${key}`;

      return {
        success: true,
        key,
        url,
        bucket: this.bucket,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get a signed URL for temporary access to a private file
   */
  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return await getSignedUrl(this.client, command, { expiresIn });
  }

  /**
   * Delete a file from S3
   */
  async delete(key: string): Promise<S3DeleteResult> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      await this.client.send(command);

      return {
        success: true,
        key,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * List files in S3 bucket
   */
  async list(prefix?: string, maxKeys: number = 1000): Promise<S3ListResult> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.bucket,
        Prefix: prefix,
        MaxKeys: maxKeys,
      });

      const response = await this.client.send(command);

      const files = (response.Contents || []).map(item => ({
        key: item.Key || '',
        size: item.Size || 0,
        lastModified: item.LastModified,
        etag: item.ETag,
      }));

      return {
        success: true,
        files,
        count: files.length,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        files: [],
        count: 0,
      };
    }
  }

  /**
   * Download a file from S3
   */
  async download(key: string): Promise<Buffer | null> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      const response = await this.client.send(command);
      const stream = response.Body as any;
      
      return await this.streamToBuffer(stream);
    } catch (error) {
      console.error('Error downloading file:', error);
      return null;
    }
  }

  /**
   * Helper: Convert stream to buffer
   */
  private async streamToBuffer(stream: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: any[] = [];
      stream.on('data', (chunk: any) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
}

// Export singleton instance
export const s3Adapter = new AwsS3Adapter();
