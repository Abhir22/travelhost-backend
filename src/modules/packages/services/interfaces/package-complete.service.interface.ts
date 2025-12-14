import { Package } from '@/modules/packages/entities/package.entity';

interface PackageCreationResult {
  id: string;
  packageName: string;
}

export interface IPackageCompleteService {
  createCompletePackage(data: any): Promise<PackageCreationResult>;
  getCompletePackage(packageId: string): Promise<Package>;
}