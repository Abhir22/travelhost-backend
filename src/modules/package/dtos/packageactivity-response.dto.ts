
import { PackageActivity } from '@/modules/package/entities/packageactivity.entity';

export class PackageActivityResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  image?: string;

  constructor(packageactivity: PackageActivity) {
    if ('id' in packageactivity) this.id = packageactivity.id;
    if ('createdAt' in packageactivity) this.createdAt = packageactivity.createdAt;
    if ('updatedAt' in packageactivity) this.updatedAt = packageactivity.updatedAt;
    this.name = packageactivity.name;
    this.image = packageactivity.image || undefined;
  }
}
