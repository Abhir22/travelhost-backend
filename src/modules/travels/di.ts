import { container } from 'tsyringe';
import { MealTypeRepository } from './repositories/mealtype.repository';
import { MealTypeService } from './services/mealtype.service';

container.register('IMealTypeRepository', { useClass: MealTypeRepository });
container.register('IMealTypeService', { useClass: MealTypeService });
import { IHotelService } from '../hotels/services/interfaces/hotel.service.interface';
import { HotelService } from '../hotels/services/hotel.service';
import { IHotelRepository } from '../hotels/repositories/interfaces/hotel.repository.interface';
import { HotelRepository } from '../hotels/repositories/hotel.repository';
import { ITravelTypeService } from './services/interfaces/traveltype.service.interface';
import { TravelTypeService } from './services/traveltype.service';
import { ITravelTypeRepository } from './repositories/interfaces/traveltype.repository.interface';
import { TravelTypeRepository } from './repositories/traveltype.repository';
import { ITravelModeService } from './services/interfaces/travelmode.service.interface';
import { TravelModeService } from './services/travelmode.service';
import { ITravelModeRepository } from './repositories/interfaces/travelmode.repository.interface';
import { TravelModeRepository } from './repositories/travelmode.repository';

export const registerDependencies = () => {

  container.register<ITravelTypeService>('ITravelTypeService', { useClass: TravelTypeService });
  container.register<ITravelTypeRepository>('ITravelTypeRepository', { useClass: TravelTypeRepository });
  container.register<ITravelModeService>('ITravelModeService', { useClass: TravelModeService });
  container.register<ITravelModeRepository>('ITravelModeRepository', { useClass: TravelModeRepository });
  console.log('All module dependencies registered');
};

export const clearDependencies = () => {
  container.reset();
};
