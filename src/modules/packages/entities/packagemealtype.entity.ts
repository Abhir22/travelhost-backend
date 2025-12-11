import { Prisma } from '@prisma/client';

export type PackageMealType = Prisma.PackageMealTypeGetPayload<{
  include: {
    package: true,
    mealType: true
  }
}>;

export type PackageMealTypeCreateDto = Prisma.PackageMealTypeCreateInput;
export type PackageMealTypeUpdateDto = Prisma.PackageMealTypeUpdateInput;