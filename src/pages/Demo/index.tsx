import { BeeDown } from 'beedown'

const Demo = () => {
  import('beedown').then((s) => {
    console.log('s====', s)
  })

  return <BeeDown />
}

export default Demo
