import { defineComponent, PropType } from 'vue';
import { Icon } from './Icon';
import s from './Overlay.module.scss';
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
    return () => <>
      <div class={s.mask} onClick={close}></div>
      <div class={s.overlay}>
        <section>
          <h2>未登录用户</h2>
          <p>点击这里登录</p>
        </section>
        <nav>
          <ul>
            <li>
              <Icon name="charts" />
              <span>统计图表</span>
            </li>
            <li>
              <Icon name="export" />
              <span>导出数据</span>
            </li>
            <li>
              <Icon name="notify" />
              <span>记账提醒</span>
            </li>
          </ul>
        </nav>
      </div>
    </>
  }
}) 
