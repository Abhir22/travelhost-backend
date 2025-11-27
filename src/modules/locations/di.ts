import { container } from 'tsyringe';
import { ICountryService } from './services/interfaces/country.service.interface';
import { CountryService } from './services/country.service';
import { ICountryRepository } from './repositories/interfaces/country.repository.interface';
import { CountryRepository } from './repositories/country.repository';
import { IStateService } from './services/interfaces/state.service.interface';
import { StateService } from './services/state.service';
import { IStateRepository } from './repositories/interfaces/state.repository.interface';
import { StateRepository } from './repositories/state.repository';
import { ICityService } from './services/interfaces/city.service.interface';
import { CityService } from './services/city.service';
import { ICityRepository } from './repositories/interfaces/city.repository.interface';
import { CityRepository } from './repositories/city.repository';
import { ISightseeingService } from './services/interfaces/sightseeing.service.interface';
import { SightseeingService } from './services/sightseeing.service';
import { ISightseeingRepository } from './repositories/interfaces/sightseeing.repository.interface';
import { SightseeingRepository } from './repositories/sightseeing.repository';

export const registerDependencies = () => {
  container.register<ICountryService>('ICountryService', { useClass: CountryService });
  container.register<ICountryRepository>('ICountryRepository', { useClass: CountryRepository });
  container.register<IStateService>('IStateService', { useClass: StateService });
  container.register<IStateRepository>('IStateRepository', { useClass: StateRepository });
  container.register<ICityService>('ICityService', { useClass: CityService });
  container.register<ICityRepository>('ICityRepository', { useClass: CityRepository });
  container.register<ISightseeingService>('ISightseeingService', { useClass: SightseeingService });
  container.register<ISightseeingRepository>('ISightseeingRepository', { useClass: SightseeingRepository });
  console.log('All module dependencies registered');
};

export const clearDependencies = () => {
  container.reset();
};
