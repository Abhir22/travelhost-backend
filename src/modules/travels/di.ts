import { container } from 'tsyringe';
import { MealTypeRepository } from './repositories/mealtype.repository';
import { MealTypeService } from './services/mealtype.service';
import { ITravelTypeService } from './services/interfaces/traveltype.service.interface';
import { TravelTypeService } from './services/traveltype.service';
import { ITravelTypeRepository } from './repositories/interfaces/traveltype.repository.interface';
import { TravelTypeRepository } from './repositories/traveltype.repository';
import { ITravelModeService } from './services/interfaces/travelmode.service.interface';
import { TravelModeService } from './services/travelmode.service';
import { ITravelModeRepository } from './repositories/interfaces/travelmode.repository.interface';
import { TravelModeRepository } from './repositories/travelmode.repository';
import { IVehicleTypeService } from './services/interfaces/vehicletype.service.interface';
import { VehicleTypeService } from './services/vehicletype.service';
import { IVehicleTypeRepository } from './repositories/interfaces/vehicletype.repository.interface';
import { VehicleTypeRepository } from './repositories/vehicletype.repository';

export const registerDependencies = () => {
  container.register('IMealTypeRepository', { useClass: MealTypeRepository });
  container.register('IMealTypeService', { useClass: MealTypeService });
  container.register<ITravelTypeService>('ITravelTypeService', { useClass: TravelTypeService });
  container.register<ITravelTypeRepository>('ITravelTypeRepository', { useClass: TravelTypeRepository });
  container.register<ITravelModeService>('ITravelModeService', { useClass: TravelModeService });
  container.register<ITravelModeRepository>('ITravelModeRepository', { useClass: TravelModeRepository });
  container.register<IVehicleTypeService>('IVehicleTypeService', { useClass: VehicleTypeService });
  container.register<IVehicleTypeRepository>('IVehicleTypeRepository', { useClass: VehicleTypeRepository });

  console.log('✅ All module dependencies registered');
};

export const clearDependencies = () => {
  container.reset();
};
