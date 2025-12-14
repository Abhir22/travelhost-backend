import { Prisma } from '@prisma/client';

export type PackagePaymentPolicy = Prisma.PackagePaymentPolicyGetPayload<{}>;
export type PackagePaymentPolicyCreateDto = Prisma.PackagePaymentPolicyCreateInput;
export type PackagePaymentPolicyUpdateDto = Prisma.PackagePaymentPolicyUpdateInput;
