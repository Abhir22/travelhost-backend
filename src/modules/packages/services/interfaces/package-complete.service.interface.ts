import { Package } from '@/modules/packages/entities/package.entity';

interface PackageCreationResult {
  id: string;
  packageName: string;
  uploadedImages?: number;
}

interface PackageCompleteData {
  packageData: any;
  images?: Express.Multer.File[];
}

export interface IPackageCompleteService {
  createCompletePackage(data: PackageCompleteData): Promise<PackageCreationResult>;
  getCompletePackage(packageId: string): Promise<Package>;
  uploadPackageImages(packageId: string, images: Express.Multer.File[]): Promise<{
    uploadedCount: number;
    totalAttempted: number;
    imagePaths: string[];   // S3 paths/keys (stored in DB)
    imageUrls: string[];    // Full S3 URLs (for immediate use)
  }>;
}
