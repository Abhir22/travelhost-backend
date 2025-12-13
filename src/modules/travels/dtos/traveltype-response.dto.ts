
import { TravelType } from '@/modules/travels/entities/traveltype.entity';

export class TravelTypeResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;

  constructor(traveltype: TravelType) {
    if ('id' in traveltype) this.id = traveltype.id;
    if ('createdAt' in traveltype) this.createdAt = traveltype.createdAt;
    if ('updatedAt' in traveltype) this.updatedAt = traveltype.updatedAt;
    this.name = traveltype.name;
  }
}
