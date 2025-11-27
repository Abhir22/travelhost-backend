
import { Country } from '@/modules/locations/entities/country.entity';

export class CountryResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  isoCode?: string;

  constructor(country: Country) {
    if ('id' in country) this.id = country.id;
    if ('createdAt' in country) this.createdAt = country.createdAt;
    if ('updatedAt' in country) this.updatedAt = country.updatedAt;
    this.name = country.name;
    this.isoCode = country.isoCode || undefined;
  }
}
