export class PackageCountryResponseDto {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  packageTypeId: string;
  countryId: string;
  country?: {
    id: string;
    name: string;
    isoCode?: string;
  };

  constructor(packagecountry: any) {
    this.id = packagecountry.id;
    if ('createdAt' in packagecountry) this.createdAt = packagecountry.createdAt;
    if ('updatedAt' in packagecountry) this.updatedAt = packagecountry.updatedAt;
    this.packageTypeId = packagecountry.packageTypeId;
    this.countryId = packagecountry.countryId;
    if (packagecountry.country) {
      this.country = {
        id: packagecountry.country.id,
        name: packagecountry.country.name,
        isoCode: packagecountry.country.isoCode || undefined,
      };
    }
  }
}