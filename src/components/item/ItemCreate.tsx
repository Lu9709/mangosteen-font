import { defineComponent, onMounted, PropType, ref } from 'vue'
import { MainLayout } from '../../layouts/MainLayout'
import { Button } from '../../shared/Button'
import { http } from '../../shared/Http'
import { Icon } from '../../shared/Icon'
import { Tab, Tabs } from '../../shared/Tabs'
import { useTags } from '../../shared/useTags'
import { InputPad } from './InputPad'
import s from './ItemCreate.module.scss'
import { Tags } from './Tags'
export const itemCreate = defineComponent({
  props: {},
  setup: (props, context) => {
    const refKind = ref('支出')
    return () => (
      <MainLayout>{{
        title: () => '记一笔',
        icon: () => <Icon name='left' class={s.navIcon}/>,
        default: () => <>
          <div class={s.wrapper}>
            {/* <Tabs selected={refKind.value} onUpdateSelected={name => refKind.value = name }> */}
            <Tabs v-model:selected={refKind.value} class={s.tabs}>
              <Tab name='支出'>
                <Tags kind='expenses'/>
              </Tab>
              <Tab name="收入" class={s.tags_wrapper}>
                <Tags kind='income'/>
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad />
            </div>
        </div>
        </>
      }}</MainLayout>
    )
  }
})