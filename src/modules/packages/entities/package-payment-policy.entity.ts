import { Prisma } from '@prisma/client';

export type PackagePaymentPolicy = Prisma.PackagePaymentPolicyGetPayload<{}>;
export type PackagePaymentPolicyCreateDto = Prisma.PackagePaymentPolicyUncheckedCreateInput;
export type PackagePaymentPolicyUpdateDto = Prisma.PackagePaymentPolicyUncheckedUpdateInput;
