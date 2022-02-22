// project
import type { Tenant, CreateTenant, UpdateTenant } from '../typings/tenant'
import arq from '.'

const url = `/api/tenant`

/** 获取租户清单 */
export const getTenants = () => arq.get<Tenant[]>(url)

/** 获取租户信息 */
export const getTenant = (code: string) => arq.get<Tenant>(`${url}/${code}`)

/** 租户入驻 */
export const create = (tenant: CreateTenant) => arq.post<Tenant>(url, tenant)

/** 更新租户信息 */
export const update = (id: string, tenant: UpdateTenant) => arq.patch<Tenant>(`${url}/${id}`, tenant)

/** 删除租户 */
export const remove = (id: string) => arq.delete(`${url}/${id}`)
