import { Package } from '@/modules/packages/entities/package.entity';

export interface IPackageCompleteService {
  createCompletePackage(data: any): Promise<Package>;
}