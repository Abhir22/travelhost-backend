import { Prisma } from '@prisma/client';

export type VehicleType = Prisma.VehicleTypeGetPayload<{}>;

export type VehicleTypeCreateDto = Prisma.VehicleTypeCreateInput;
export type VehicleTypeUpdateDto = Prisma.VehicleTypeUpdateInput;