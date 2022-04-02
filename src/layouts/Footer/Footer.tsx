// router
import { Link } from 'react-router-dom'
// antd
import { Image, Typography } from 'antd'
import type { Props } from '.'

const { Text } = Typography

const Footer = (props: Props) => {
  return (
    <footer className={`${props.className} p-6`}>
      <Link target='_blank' rel='noreferrer' to='https://beian.miit.gov.cn'>
        浙ICP备2021003835号
      </Link>

      <Link
        className='flex items-center'
        target='_blank'
        rel='noreferrer'
        to='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902003160'
      >
        <Image src='/assets/beian.png' />
        浙公网安备 33010902003160号
      </Link>

      <Text>Copyright © 2022 by fanfan & tutu</Text>
    </footer>
  )
}

export default Footer
