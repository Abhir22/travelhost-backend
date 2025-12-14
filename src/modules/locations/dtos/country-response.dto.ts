
import moment from 'moment';
import { Country } from '@/modules/locations/entities/country.entity';

export class CountryResponse {
  id?: string;
  name: string;
  isoCode?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(country: Country) {
    if ('id' in country && country.id) this.id = country.id;
    this.name = country.name;
    this.isoCode = country.isoCode || undefined;
    if ('createdAt' in country && country.createdAt) this.createdAt = moment(country.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in country && country.updatedAt) this.updatedAt = moment(country.updatedAt).format('DD-MM-YYYY');
  }
}
