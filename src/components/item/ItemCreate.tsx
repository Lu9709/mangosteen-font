import { AxiosError } from 'axios'
import { Dialog } from 'vant'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { http } from '../../shared/Http'
import { Icon } from '../../shared/Icon'
import { Tab, Tabs } from '../../shared/Tabs'
import { InputPad } from './InputPad'
import s from './ItemCreate.module.scss'
import { Tags } from './Tags'
export const itemCreate = defineComponent({
  props: {},
  setup: (props, context) => {
    const formData = reactive({
      kind: '支出',
      tags_id: [],
      amount: 0,
      happen_at: new Date().toISOString()
    })
    const router = useRouter()
    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        Dialog.alert({
          title: '出错',
          message: Object.values(error.response.data.errors).join('\n')
        })
        throw error
      }
    }
    const onSubmit = async () => {
      await http.post<Resource<Item>>('/items', formData, { params: { _mock: 'itemCreate' } }
      ).catch(onError)
      router.push('/items')
    }
    return () => (
      <MainLayout>{{
        title: () => '记一笔',
        icon: () => <Icon name='left' class={s.navIcon}/>,
        default: () => <>
          <div class={s.wrapper}>
            {/* <Tabs selected={refKind.value} onUpdateSelected={name => refKind.value = name }> */}
            <Tabs v-model:selected={formData.kind} class={s.tabs}>
              <Tab name='支出'>
                <Tags kind='expenses' v-model:selected={formData.tags_id[0]}/>
              </Tab>
              <Tab name="收入" class={s.tags_wrapper}>
                <Tags kind='income' v-model:selected={formData.tags_id[0]}/>
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad 
                v-model:happenAt={formData.happen_at}
                v-model:amount={formData.amount}
                onSubmit={onSubmit} />
            </div>
        </div>
        </>
      }}</MainLayout>
    )
  }
})