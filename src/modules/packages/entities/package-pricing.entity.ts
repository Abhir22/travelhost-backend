import { Prisma } from '@prisma/client';

export type PackagePricing = Prisma.PackagePricingGetPayload<{}>;
export type PackagePricingCreateDto = Prisma.PackagePricingUncheckedCreateInput;
export type PackagePricingUpdateDto = Prisma.PackagePricingUncheckedUpdateInput;
