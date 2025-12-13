
import moment from 'moment';
import { Sightseeing } from '@/modules/locations/entities/sightseeing.entity';

export class SightseeingResponse {
  id?: string;
  name: string;
  cityId?: string;
  city?: {
    id: string;
    name: string;
    countryId: string;
    stateId?: string;
    country?: {
      id: string;
      name: string;
      isoCode?: string;
    };
    state?: {
      id: string;
      name: string;
    };
  };
  createdAt?: string;
  updatedAt?: string;

  constructor(sightseeing: Sightseeing) {
    if ('id' in sightseeing && sightseeing.id) this.id = sightseeing.id;
    this.name = sightseeing.name;
    this.cityId = sightseeing.cityId || undefined;
    
    // Include city information if available
    if (sightseeing.city) {
      this.city = {
        id: sightseeing.city.id,
        name: sightseeing.city.name,
        countryId: sightseeing.city.countryId,
        stateId: sightseeing.city.stateId || undefined,
      };
      
      // Include country information if available
      if (sightseeing.city.country) {
        this.city.country = {
          id: sightseeing.city.country.id,
          name: sightseeing.city.country.name,
          isoCode: sightseeing.city.country.isoCode || undefined,
        };
      }
      
      // Include state information if available
      if (sightseeing.city.state) {
        this.city.state = {
          id: sightseeing.city.state.id,
          name: sightseeing.city.state.name,
        };
      }
    }
    if ('createdAt' in sightseeing && sightseeing.createdAt) this.createdAt = moment(sightseeing.createdAt).format('YYYY-MM-DD');
    if ('updatedAt' in sightseeing && sightseeing.updatedAt) this.updatedAt = moment(sightseeing.updatedAt).format('YYYY-MM-DD');
  }
}
