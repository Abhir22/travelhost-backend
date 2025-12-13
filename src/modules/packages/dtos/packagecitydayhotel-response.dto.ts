import moment from 'moment';
import { PackageCityDayResponse } from '@/modules/packages/dtos/packagecityday-response.dto';
import { PackageCityDayHotel } from '@/modules/packages/entities/packagecitydayhotel.entity';

export class PackageCityDayHotelResponse {
  id?: string;
  packageCityDayId: string;
  hotelName: string;
  starRating: number;
  hotelType?: string;
  checkInTime?: string;
  checkOutTime?: string;
  roomType?: string;
  numberOfRooms?: number;
  packageCityDay?: PackageCityDayResponse;
  createdAt?: string;
  updatedAt?: string;

  constructor(packagecitydayhotel: PackageCityDayHotel) {
    if ('id' in packagecitydayhotel && packagecitydayhotel.id) this.id = packagecitydayhotel.id;
    this.packageCityDayId = packagecitydayhotel.packageCityDayId;
    this.hotelName = packagecitydayhotel.hotelName;
    this.starRating = packagecitydayhotel.starRating;
    this.hotelType = packagecitydayhotel.hotelType || undefined;
    this.checkInTime = packagecitydayhotel.checkInTime || undefined;
    this.checkOutTime = packagecitydayhotel.checkOutTime || undefined;
    this.roomType = packagecitydayhotel.roomType || undefined;
    this.numberOfRooms = packagecitydayhotel.numberOfRooms || undefined;
    this.packageCityDay = packagecitydayhotel.packageCityDay && typeof packagecitydayhotel.packageCityDay === 'object' ? new PackageCityDayResponse({ ...(packagecitydayhotel.packageCityDay as any) }) : undefined;
    if ('createdAt' in packagecitydayhotel && packagecitydayhotel.createdAt) this.createdAt = moment(packagecitydayhotel.createdAt).format('YYYY-MM-DD');
    if ('updatedAt' in packagecitydayhotel && packagecitydayhotel.updatedAt) this.updatedAt = moment(packagecitydayhotel.updatedAt).format('YYYY-MM-DD');
  }
}
