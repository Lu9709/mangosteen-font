import { defineComponent, PropType } from 'vue';
import { RouterLink } from 'vue-router';
import { Icon, IconName } from './Icon';
import s from './Overlay.module.scss';
type NavbarItem = {
  routerLink: string
  iconName: IconName
  content: string
}
const NavbarList: NavbarItem[] = [
  { routerLink: '/statistics', iconName: 'charts', content: '统计图表' },
  { routerLink: '/export', iconName: 'export', content: '导出数据' },
  { routerLink: '/notify', iconName: 'notify', content: '记账提醒' },
]
export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>
    }
  },
  setup: (props, context) => {
    const close = () => {
      props.onClose?.()
    }
    // 可以通过props传递的点击遮罩层的关闭事件 ()内可以传递参数
    // 也可以通过emit的方式来传递
    // const { emit } = context
    // const close = () => {
    //   emit('close')
    //}
    const onClickSignIn = () => { }
    return () => <>
      <div class={s.mask} onClick={close}></div>
      <div class={s.overlay}>
        <section class={s.currentUser} onClick={onClickSignIn}>
          <h2>未登录用户</h2>
          <p>点击这里登录</p>
        </section>
        <nav>
          <ul class={s.action_list}>
            {
              NavbarList.map(item => (
                <li>
                  <RouterLink to={item.routerLink} class={s.action}>
                    <Icon name={item.iconName} class={s.icon} />
                    <span>{item.content}</span>
                  </RouterLink>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
    </>
  }
}) 
