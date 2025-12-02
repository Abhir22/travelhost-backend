import { container } from 'tsyringe';
import { IDestinationService } from './services/interfaces/destination.service.interface';
import { DestinationService } from './services/destination.service';
import { IDestinationRepository } from './repositories/interfaces/destination.repository.interface';
import { DestinationRepository } from './repositories/destination.repository';

export const registerDependencies = () => {
  container.register<IDestinationService>('IDestinationService', { useClass: DestinationService });
  container.register<IDestinationRepository>('IDestinationRepository', { useClass: DestinationRepository });
  console.log('All module dependencies registered');
};

export const clearDependencies = () => {
  container.reset();
};
