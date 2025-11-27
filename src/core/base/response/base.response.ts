
export abstract class BaseResponse<T> {
  constructor(entity: T) {
    Object.assign(this, entity);
  }

  static mapOne<E, R extends BaseResponse<E>>(entity: E, ResponseClass: new (entity: E) => R): R {
    return new ResponseClass(entity);
  }

  static mapMany<E, R extends BaseResponse<E>>(entities: E[], ResponseClass: new (entity: E) => R): R[] {
    return entities.map((entity) => new ResponseClass(entity));
  }
}
