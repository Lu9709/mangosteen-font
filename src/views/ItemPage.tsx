import { defineComponent, PropType } from 'vue'
import { RouterView } from 'vue-router'
export const ItemPage = defineComponent({
  props: {
    name: String as PropType<string>
  },
  setup: (props, context) => {
    return () => (
      <RouterView/>
    )
  }
})