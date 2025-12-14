
import moment from 'moment';
import { Destination } from '@/modules/destinations/entities/destination.entity';
import { CountryResponse } from '@/modules/locations/dtos/country-response.dto';
import { StateResponse } from '@/modules/locations/dtos/state-response.dto';
import { CityResponse } from '@/modules/locations/dtos/city-response.dto';

export class DestinationResponse {
  id?: string;
  destinationType: string;
  name: string;
  description?: string;
  priceRange?: string;
  thumbnailPhoto?: string;
  bannerPhoto?: string;
  video?: string;
  countries?: CountryResponse[];
  states?: StateResponse[];
  cities?: CityResponse[];
  packageCount?: number;
  packageTypeCount?: number;
  createdAt?: string;
  updatedAt?: string;

  constructor(destination: Destination) {
    if ('id' in destination && destination.id) this.id = destination.id;
    this.destinationType = destination.destinationType;
    this.name = destination.name;
    this.description = destination.description || undefined;
    this.priceRange = destination.priceRange || undefined;
    this.thumbnailPhoto = destination.thumbnailPhoto || undefined;
    this.bannerPhoto = destination.bannerPhoto || undefined;
    this.video = destination.video || undefined;
    
    // Handle many-to-many relations
    this.countries = Array.isArray(destination.destinationCountries) 
      ? destination.destinationCountries.map((dc: any) => new CountryResponse(dc.country))
      : [];
    
    this.states = Array.isArray(destination.destinationStates)
      ? destination.destinationStates.map((ds: any) => new StateResponse(ds.state))
      : [];
    
    this.cities = Array.isArray(destination.destinationCities)
      ? destination.destinationCities.map((dc: any) => new CityResponse(dc.city))
      : [];
    
    this.packageCount = Array.isArray(destination.destinationPackages) 
      ? destination.destinationPackages.length 
      : 0;
    
    this.packageTypeCount = Array.isArray(destination.destinationPackageTypes)
      ? destination.destinationPackageTypes.length
      : 0;
    
    if ('createdAt' in destination && destination.createdAt) this.createdAt = moment(destination.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in destination && destination.updatedAt) this.updatedAt = moment(destination.updatedAt).format('DD-MM-YYYY');
  }
}
