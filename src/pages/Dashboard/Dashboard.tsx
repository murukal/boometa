// antd
import { Card, Col, Row, Statistic } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons/lib/icons'
// project
import PV from '~/components/Charts/PV'
import Ratio from '~/components/Charts/Ratio'
import HeatMap from '~/components/Charts/HeatMap'

const Dashboard = () => {
  return (
    <div className='h-full flex flex-col'>
      <Row gutter={12}>
        <Col span={6}>
          <Card>
            <Statistic
              title='昨日新增文章'
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix='%'
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title='今日新增文章'
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix='%'
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title='昨日新注册用户'
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix='%'
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title='今日新注册用户'
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix='%'
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={12} className='mt-3'>
        <Col span={16}>
          <Card
            bodyStyle={{
              height: 500
            }}
          >
            <PV />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            bodyStyle={{
              height: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Ratio />
          </Card>
        </Col>
      </Row>

      <Row className='mt-3'>
        <Card className='w-full'>
          <HeatMap />
        </Card>
      </Row>
    </div>
  )
}

export default Dashboard
