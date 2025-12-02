
import { Destination } from '@/modules/destinations/entities/destination.entity';

export class DestinationResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  destinationType: string;
  name: string;
  countryId?: string;
  stateId?: string;
  cityId?: string;
  priceRange?: string;
  thumbnailPhoto?: string;
  bannerPhoto?: string;
  video?: string;

  constructor(destination: Destination) {
    if ('id' in destination) this.id = destination.id;
    if ('createdAt' in destination) this.createdAt = destination.createdAt;
    if ('updatedAt' in destination) this.updatedAt = destination.updatedAt;
    this.destinationType = destination.destinationType;
    this.name = destination.name;
    this.countryId = destination.countryId || undefined;
    this.stateId = destination.stateId || undefined;
    this.cityId = destination.cityId || undefined;
    this.priceRange = destination.priceRange || undefined;
    this.thumbnailPhoto = destination.thumbnailPhoto || undefined;
    this.bannerPhoto = destination.bannerPhoto || undefined;
    this.video = destination.video || undefined;
  }
}
