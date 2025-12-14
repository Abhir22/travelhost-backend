import { container } from 'tsyringe';
import { MealTypeRepository } from './repositories/mealtype.repository';
import { MealTypeService } from './services/mealtype.service';
import { IMealTypeService } from './services/interfaces/mealtype.service.interface';
import { IMealTypeRepository } from './repositories/interfaces/mealtype.repository.interface';
import { MealCategoryRepository } from './repositories/mealcategory.repository';
import { MealCategoryService } from './services/mealcategory.service';
import { IMealCategoryService } from './services/interfaces/mealcategory.service.interface';
import { IMealCategoryRepository } from './repositories/interfaces/mealcategory.repository.interface';
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
  // Meal Type
  container.register<IMealTypeRepository>('IMealTypeRepository', { useClass: MealTypeRepository });
  container.register<IMealTypeService>('IMealTypeService', { useClass: MealTypeService });
  
  // Meal Category
  container.register<IMealCategoryRepository>('IMealCategoryRepository', { useClass: MealCategoryRepository });
  container.register<IMealCategoryService>('IMealCategoryService', { useClass: MealCategoryService });
  
  // Travel Type
  container.register<ITravelTypeRepository>('ITravelTypeRepository', { useClass: TravelTypeRepository });
  container.register<ITravelTypeService>('ITravelTypeService', { useClass: TravelTypeService });
  
  // Travel Mode
  container.register<ITravelModeRepository>('ITravelModeRepository', { useClass: TravelModeRepository });
  container.register<ITravelModeService>('ITravelModeService', { useClass: TravelModeService });
  
  // Vehicle Type
  container.register<IVehicleTypeRepository>('IVehicleTypeRepository', { useClass: VehicleTypeRepository });
  container.register<IVehicleTypeService>('IVehicleTypeService', { useClass: VehicleTypeService });

  console.log('✅ All travels module dependencies registered');
};

export const clearDependencies = () => {
  container.reset();
};
