// antd
import { Card, Col, Row, Statistic } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons/lib/icons'
// project
import UPers from '../../components/Charts/UPer'
import Hot from '../../components/Charts/Hot'
import Footer from '../../layouts/Footer'

const Dashboard = () => {
  return (
    <div className='h-full flex flex-col'>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title='Active'
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
              title='Active'
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
              title='Active'
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
              title='Active'
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix='%'
            />
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={16}>
          <UPers />
        </Col>
        <Col span={8}>
          <Hot />
        </Col>
      </Row>

      <Footer className='mt-auto flex justify-between px-6 pb-6' />
    </div>
  )
}

export default Dashboard
