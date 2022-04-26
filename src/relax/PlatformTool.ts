/**
 * 平台元数据
 */
export class PlatformTool {
  /**
   * Gets global variable where global stuff can be stored.
   */
  static getGlobalVariable(): any {
    return global
  }
}
