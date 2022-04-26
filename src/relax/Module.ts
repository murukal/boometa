import { getMetadataStorage } from './MetadataStorage'

export const Module = (): ClassDecorator => {
  const decorator = (target: Function) => {
    getMetadataStorage().modules.push({
      name: target.name
    })
  }
  return decorator
}
