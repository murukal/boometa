import { useCallback } from 'react'
import { getDictionaryEnumsByDictionaryCode } from '../../../apis/dictionary-enum'
import { DICTIONARY_CODE_ABILITY_KEY, DICTIONARY_CODE_PERMISSION_KEY } from '../../Singleton/Dictionary/assets'

const PermissionTree = () => {
  const onFetch = useCallback(async () => {
    // 权限key
    const { data: dictionaryEnums } = await getDictionaryEnumsByDictionaryCode(DICTIONARY_CODE_PERMISSION_KEY)
    // 权利key
    const { data: abilityEnums } = await getDictionaryEnumsByDictionaryCode(DICTIONARY_CODE_ABILITY_KEY)
  }, [])

  return <></>
}

export default PermissionTree
