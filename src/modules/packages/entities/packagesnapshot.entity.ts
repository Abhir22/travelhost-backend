import { Prisma } from '@prisma/client';

export type PackageSnapshot = Prisma.PackageSnapshotGetPayload<{
  include: {
    packagesnapshotmappings: true
  }
}>;

export type PackageSnapshotCreateDto = Prisma.PackageSnapshotCreateInput;
export type PackageSnapshotUpdateDto = Prisma.PackageSnapshotUpdateInput;
