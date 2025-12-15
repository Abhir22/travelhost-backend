
import moment from 'moment';
import { Destination } from '@/modules/destinations/entities/destination.entity';
import { CountryResponse } from '@/modules/locations/dtos/country-response.dto';
import { CityResponse } from '@/modules/locations/dtos/city-response.dto';

export class DestinationResponse {
  id?: string;
  destinationType: string;
  countries?: CountryResponse[];
  cities?: CityResponse[];
  packageCount?: number;
  packageTypes?: string[];
  createdAt?: string;
  updatedAt?: string;

  constructor(destination: Destination) {
    if ('id' in destination && destination.id) this.id = destination.id;
    this.destinationType = destination.destinationType;

    // Handle many-to-many relations
    this.countries = Array.isArray(destination.destinationCountries)
      ? destination.destinationCountries.map((dc: any) => new CountryResponse(dc.country))
      : [];

    this.cities = Array.isArray(destination.destinationCities)
      ? destination.destinationCities.map((dc: any) => new CityResponse(dc.city))
      : [];

    this.packageCount = Array.isArray(destination.destinationPackages)
      ? destination.destinationPackages.length
      : 0;

    this.packageTypes = Array.isArray(destination.destinationPackageTypes)
      ? destination.destinationPackageTypes.map((dpt: any) => dpt.packageType)
      : [];

    if ('createdAt' in destination && destination.createdAt) this.createdAt = moment(destination.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in destination && destination.updatedAt) this.updatedAt = moment(destination.updatedAt).format('DD-MM-YYYY');
  }
}
