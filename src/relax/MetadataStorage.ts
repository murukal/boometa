import { PlatformTool } from './PlatformTool'

export interface Type<T = any> extends Function {
  new (...args: any[]): T
}

/**
 * 模块
 */
export interface Module {
  target: Type
  name: string
}

/**
 * 数据源
 */
export class MetadataStorage {
  readonly modules: Module[] = []
}

/**
 * Gets metadata storage.
 */
export function getMetadataStorage(): MetadataStorage {
  const globalScope = PlatformTool.getGlobalVariable()
  if (!globalScope.relaxMetadataStorage) globalScope.relaxMetadataStorage = new MetadataStorage()
  return globalScope.relaxMetadataStorage
}
