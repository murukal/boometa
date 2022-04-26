import { getMetadataStorage, Type } from './MetadataStorage'

export const Module = () => {
  const decorator = (target: Type) => {
    getMetadataStorage().modules.push({
      target,
      name: target.name
    })
  }
  return decorator
}
