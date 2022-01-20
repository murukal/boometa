// project
import { request } from '.'

export const getRoles = () =>
  request({
    url: '/api/role',
    method: 'GET'
  })
