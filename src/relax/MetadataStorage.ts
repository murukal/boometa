import { PlatformTool } from './PlatformTool'

/**
 * 模块
 */
export interface Module {
  name: string
}

/**
 * 事件
 */
export interface Action {
  moduleName: string
  actionName: string

  trigger?: Function
}

/**
 * 数据源
 */
export class MetadataStorage {
  readonly modules: Module[] = []
  readonly actions: Action[] = []
}

/**
 * Gets metadata storage.
 */
export function getMetadataStorage(): MetadataStorage {
  const globalScope = PlatformTool.getGlobalVariable()
  if (!globalScope.relaxMetadataStorage) globalScope.relaxMetadataStorage = new MetadataStorage()
  return globalScope.relaxMetadataStorage
}
