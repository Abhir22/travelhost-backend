
import moment from 'moment';
import { TravelMode } from '@/modules/travels/entities/travelmode.entity';

export class TravelModeResponse {
  id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(travelmode: TravelMode) {
    if ('id' in travelmode && travelmode.id) this.id = travelmode.id;
    this.name = travelmode.name;
    if ('createdAt' in travelmode && travelmode.createdAt) this.createdAt = moment(travelmode.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in travelmode && travelmode.updatedAt) this.updatedAt = moment(travelmode.updatedAt).format('DD-MM-YYYY');
  }
}
