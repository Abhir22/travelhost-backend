import { PackageCityDayResponse } from '@/modules/packages/dtos/packagecityday-response.dto';
import { PackageCityDayHotel } from '@/modules/packages/entities/packagecitydayhotel.entity';

export class PackageCityDayHotelResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  packageCityDayId: string;
  hotelName: string;
  starRating: number;
  hotelType?: string;
  checkInTime?: string;
  checkOutTime?: string;
  roomType?: string;
  numberOfRooms?: number;
  packageCityDay?: PackageCityDayResponse;

  constructor(packagecitydayhotel: PackageCityDayHotel) {
    if ('id' in packagecitydayhotel) this.id = packagecitydayhotel.id;
    if ('createdAt' in packagecitydayhotel) this.createdAt = packagecitydayhotel.createdAt;
    if ('updatedAt' in packagecitydayhotel) this.updatedAt = packagecitydayhotel.updatedAt;
    this.packageCityDayId = packagecitydayhotel.packageCityDayId;
    this.hotelName = packagecitydayhotel.hotelName;
    this.starRating = packagecitydayhotel.starRating;
    this.hotelType = packagecitydayhotel.hotelType || undefined;
    this.checkInTime = packagecitydayhotel.checkInTime || undefined;
    this.checkOutTime = packagecitydayhotel.checkOutTime || undefined;
    this.roomType = packagecitydayhotel.roomType || undefined;
    this.numberOfRooms = packagecitydayhotel.numberOfRooms || undefined;
    this.packageCityDay = packagecitydayhotel.packageCityDay && typeof packagecitydayhotel.packageCityDay === 'object' ? new PackageCityDayResponse({ ...(packagecitydayhotel.packageCityDay as any) }) : undefined;
  }
}
