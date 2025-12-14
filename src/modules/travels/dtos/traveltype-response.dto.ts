
import moment from 'moment';
import { TravelType } from '@/modules/travels/entities/traveltype.entity';

export class TravelTypeResponse {
  id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(traveltype: TravelType) {
    if ('id' in traveltype && traveltype.id) this.id = traveltype.id;
    this.name = traveltype.name;
    if ('createdAt' in traveltype && traveltype.createdAt) this.createdAt = moment(traveltype.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in traveltype && traveltype.updatedAt) this.updatedAt = moment(traveltype.updatedAt).format('DD-MM-YYYY');
  }
}
