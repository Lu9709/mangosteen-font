import { defineComponent, FunctionalComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { SkipFeatures } from '../../shared/SkipFeatures'
import s from './welcome.module.scss'
export const SecondActions: FunctionalComponent = () => (
  <div class={s.actions}>
    <SkipFeatures class={s.fake}/>
    <RouterLink to="/welcome/3" >下一页</RouterLink>
    <SkipFeatures/>
  </div>
)
SecondActions.displayName = 'SecondActions'