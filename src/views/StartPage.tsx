import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/Button';
import { Center } from '../shared/Center';
import { FloatButton } from '../shared/FloatButton';
import { Icon } from '../shared/Icon';
import { OverlayIcon } from '../shared/Overlay';
import s from './StartPage.module.scss';
export const StartPage = defineComponent({
  setup: (props, context) => {
    const onClick = () => {
      console.log('hi')
    }
    return () => (
      <MainLayout>{
        {

          title: () => '山竹记账',
          icon: () => <OverlayIcon/>,
          default: () => <>
            <Center class={s.pig_wrapper}>
              <Icon name='pig' class={s.pig} />
            </Center>
            <div class={s.button_wrapper}>
              <RouterLink to='/items/create'>
                <Button class={s.button} onClick={onClick}>开始记账</Button>
              </RouterLink>
              <RouterLink to='/items'>
                <FloatButton iconName='add' />
              </RouterLink>
            </div>
          </>
        }
      }</MainLayout>
    )
  }
})