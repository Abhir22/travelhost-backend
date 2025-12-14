import { Prisma } from '@prisma/client';

export type PackageCancellationPolicy = Prisma.PackageCancellationPolicyGetPayload<{}>;
export type PackageCancellationPolicyCreateDto = Prisma.PackageCancellationPolicyUncheckedCreateInput;
export type PackageCancellationPolicyUpdateDto = Prisma.PackageCancellationPolicyUncheckedUpdateInput;
