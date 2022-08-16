import { defineComponent, PropType } from 'vue'
import { RouterView } from 'vue-router'
export const TagPage = defineComponent({
  setup: (props, context) => {
    return () => (
      <RouterView/>
    )
  }
})