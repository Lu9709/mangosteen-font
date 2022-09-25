import { defineComponent, onMounted, PropType, ref } from 'vue'
import { MainLayout } from '../../layouts/MainLayout'
import { Button } from '../../shared/Button'
import { http } from '../../shared/Http'
import { Icon } from '../../shared/Icon'
import { Tab, Tabs } from '../../shared/Tabs'
import { useTags } from '../../shared/useTags'
import { InputPad } from './InputPad'
import s from './ItemCreate.module.scss'
export const itemCreate = defineComponent({
  props: {},
  setup: (props, context) => {
    const refKind = ref('支出')
    const { tags: expensesTags, hasMore: expensesHasMore , fetchTag: expensesFetchTag } = useTags((page)=> {
      return http.get<Resources<Tag>>('/tags', {
        kind: 'expenses',
        page: page + 1,
        _mock: 'tagIndex'
      })
    })
    const { tags: incomeTags, hasMore: incomeHasMore, fetchTag: incomeFetchTag } = useTags((page)=> {
      return http.get<Resources<Tag>>('/tags', {
        kind: 'expenses',
        page: page + 1,
        _mock: 'tagIndex'
      })
    })
    return () => (
      <MainLayout>{{
        title: () => '记一笔',
        icon: () => <Icon name='left' class={s.navIcon}/>,
        default: () => <>
          <div class={s.wrapper}>
            {/* <Tabs selected={refKind.value} onUpdateSelected={name => refKind.value = name }> */}
            <Tabs v-model:selected={refKind.value} class={s.tabs}>
              <Tab name='支出'>
                <div class={s.tags_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>
                    {expensesTags.value.map(tag => 
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>
                          {tag.sign}
                        </div>
                        <div class={s.name}>
                          {tag.name}
                        </div>
                      </div>
                    )}
                </div>
                <div class={s.more}>
                  {expensesHasMore.value ?
                    <Button class={s.loadMore} onClick={expensesFetchTag}>加载更多</Button> :
                    <span class={s.noMore}>没有更多</span>
                  }
                </div>
              </Tab>
              <Tab name="收入" class={s.tags_wrapper}>
              <div class={s.tags_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>
                    {incomeTags.value.map(tag => 
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>
                          {tag.sign}
                        </div>
                        <div class={s.name}>
                          {tag.name}
                        </div>
                      </div>
                    )}
                </div>
                <div class={s.more}>
                  {incomeHasMore.value ?
                    <Button class={s.loadMore} onClick={incomeFetchTag}>加载更多</Button> :
                    <span class={s.noMore}>没有更多</span>
                  }
                </div>
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