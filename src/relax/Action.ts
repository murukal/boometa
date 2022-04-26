import { getMetadataStorage } from './MetadataStorage'

export const Action = (): MethodDecorator => (target, propertyKey, descriptor) => {
  getMetadataStorage().actions.push({
    moduleName: target.constructor.name,
    actionName: propertyKey.toString(),
    trigger: descriptor.value as Function | undefined
  })
}
