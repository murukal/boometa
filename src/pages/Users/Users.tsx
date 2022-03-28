// antd
import { Card } from 'antd'

import UserDataSet from '../../components/DataSet/Users'

const Users = () => {
  return (
    <Card className='overflow-auto'>
      <UserDataSet />
    </Card>
  )
}

export default Users
