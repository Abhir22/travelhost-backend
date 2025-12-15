import { Prisma } from '@prisma/client';

export type Destination = Prisma.DestinationGetPayload<{
  include: {
    destinationCountries: {
      include: {
        country: true;
      }
    };
    destinationCities: {
      include: {
        city: true;
      }
    };
    destinationPackages: {
      include: {
        package: true;
      }
    };
    destinationPackageTypes: true;
  }
}>;

export type DestinationCreateDto = Prisma.DestinationCreateInput;
export type DestinationUpdateDto = Prisma.DestinationUpdateInput;
