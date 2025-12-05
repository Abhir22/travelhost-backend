import { PackageDayResponse } from '@/modules/package/dtos/packageday-response.dto';
import { PackageDayHotel } from '@/modules/package/entities/packagedayhotel.entity';

export class PackageDayHotelResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  packageDayId: string;
  hotelName: string;
  starRating: number;
  hotelType?: string;
  checkInTime?: string;
  checkOutTime?: string;
  roomType?: string;
  numberOfRooms?: number;
  actualCheckIn?: string;
  actualCheckOut?: string;
  packageDay?: PackageDayResponse;

  constructor(packagedayhotel: PackageDayHotel) {
    if ('id' in packagedayhotel) this.id = packagedayhotel.id;
    if ('createdAt' in packagedayhotel) this.createdAt = packagedayhotel.createdAt;
    if ('updatedAt' in packagedayhotel) this.updatedAt = packagedayhotel.updatedAt;
    this.packageDayId = packagedayhotel.packageDayId;
    this.hotelName = packagedayhotel.hotelName;
    this.starRating = packagedayhotel.starRating;
    this.hotelType = packagedayhotel.hotelType || undefined;
    this.checkInTime = packagedayhotel.checkInTime || undefined;
    this.checkOutTime = packagedayhotel.checkOutTime || undefined;
    this.roomType = packagedayhotel.roomType || undefined;
    this.numberOfRooms = packagedayhotel.numberOfRooms || undefined;
    this.actualCheckIn = packagedayhotel.actualCheckIn || undefined;
    this.actualCheckOut = packagedayhotel.actualCheckOut || undefined;
    this.packageDay = packagedayhotel.packageDay && typeof packagedayhotel.packageDay === 'object' ? new PackageDayResponse({ ...(packagedayhotel.packageDay as any) }) : undefined;
  }
}
