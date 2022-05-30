import { Dropdown } from 'antd'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '~/redux'
import { User } from '~/typings/boomemory/auth'
import { Props } from '.'
import Overlay from './Overlay'
import styles from './UserProfile.module.css'
import { MenuClickEventHandler } from 'rc-menu/lib/interface'
import { signOut } from '~/utils/app'

const UserProfile = (props: Props) => {
  const user = useSelector<State, User | undefined>((state) => state.userProfile.user)
  const [isVisiable, setIsVisiable] = useState(false)

  /**
   * 用户名称
   */
  const thumbUsername = useMemo(() => {
    return user?.username.slice(0, 2)
  }, [user?.username])

  /**
   * 用户头像
   */
  const avatar = useMemo(() => {
    return user?.avatar
  }, [user?.avatar])

  /**
   * 下拉窗口可视变更
   */
  const onVisibleChange = (visible: boolean) => {
    setIsVisiable(visible)
  }

  /**
   * 头像容器的class names
   */
  const avatarWrapperClassName = useMemo(() => {
    const classnames = [styles['avatar-wrapper']]

    if (isVisiable) {
      classnames.push(styles['avatar-wrapper-hovered'])
    } else {
      classnames.push(styles['avatar-wrapper-unhover'])
    }

    return classnames.join(' ')
  }, [isVisiable])

  /**
   * 下拉抽屉定位容器的class names
   */
  const wrapperClassName = useMemo(() => {
    const classnames = props.className ? [props.className] : []
    classnames.push(styles.wrapper)
    return classnames.join(' ')
  }, [props.className])

  /**
   * 菜单渲染父节点
   */
  const getPopupContainer = () => {
    const wrapper = document.getElementById('user-profile-wrapper')
    return wrapper || document.body
  }

  /**
   * 点击菜单item
   */
  const onMenuItemClick: MenuClickEventHandler = ({ key }) => {
    // 退出登录
    if (key === 'logout') {
      signOut()
      return
    }

    // 修改个人设置
    if (key === 'settings') {
      console.log('settings')
      return
    }

    // 查看个人主页
    if (key === 'profile') {
      console.log('profile')
      return
    }
  }

  return (
    <div id='user-profile-wrapper' className={wrapperClassName}>
      <Dropdown
        overlay={<Overlay onMenuItemClick={onMenuItemClick} />}
        onVisibleChange={onVisibleChange}
        placement='bottom'
        getPopupContainer={getPopupContainer}
        trigger={['click']}
      >
        <div className={styles['dropdown-position-wrapper']} style={props.style}>
          {/* 头像部分 */}
          <div className={avatarWrapperClassName}>
            {avatar ? (
              // 用户头像图片
              <></>
            ) : (
              // 用户名称
              <div className={styles.avatar}>{thumbUsername}</div>
            )}
          </div>
        </div>
      </Dropdown>
    </div>
  )
}

export default UserProfile
