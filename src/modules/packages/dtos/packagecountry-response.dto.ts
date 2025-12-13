import moment from 'moment';

export class PackageCountryResponseDto {
  id: string;
  packageTypeId: string;
  countryId: string;
  country?: {
    id: string;
    name: string;
    isoCode?: string;
  };
  createdAt?: string;
  updatedAt?: string;

  constructor(packagecountry: any) {
    this.id = packagecountry.id;
    this.packageTypeId = packagecountry.packageTypeId;
    this.countryId = packagecountry.countryId;
    if (packagecountry.country) {
      this.country = {
        id: packagecountry.country.id,
        name: packagecountry.country.name,
        isoCode: packagecountry.country.isoCode || undefined,
      };
    }
    if ('createdAt' in packagecountry && packagecountry.createdAt) this.createdAt = moment(packagecountry.createdAt).format('YYYY-MM-DD');
    if ('updatedAt' in packagecountry && packagecountry.updatedAt) this.updatedAt = moment(packagecountry.updatedAt).format('YYYY-MM-DD');
  }
}