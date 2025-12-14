import { Prisma } from '@prisma/client';

export type Package = Prisma.PackageGetPayload<{
  include: {
    packageType: true,
    packagecategorymappings: {
      include: {
        category: true
      }
    },
    packageactivitymappings: {
      include: {
        activity: true
      }
    },
    packagesnapshotmappings: {
      include: {
        snapshot: true
      }
    },
    packagecities: {
      include: {
        cityObj: true,
        stateObj: true,
        countryObj: true,
        packagecitydaies: {
          include: {
            packagecitydaytravels: true,
            packagecitydaysightseeings: true,
            packagecitydayhotels: true,
            packagecitydaymeals: true,
            packagecitydaymealtypes: {
              include: {
                mealType: true
              }
            }
          }
        }
      }
    },
    destinationPackages: {
      include: {
        destination: true
      }
    },
    packageTermsConditions: true,
    packageInclusions: true,
    packageExclusions: true,
    packagePaymentPolicies: true,
    packageCancellationPolicies: true,
    packagePricings: true,
    packageOptions: true,
    packageGalleries: true
  }
}>;

export type PackageCreateDto = Prisma.PackageCreateInput;
export type PackageUpdateDto = Prisma.PackageUpdateInput;
