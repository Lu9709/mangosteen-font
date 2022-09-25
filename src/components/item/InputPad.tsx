import { defineComponent, ref } from 'vue'
import { Icon } from '../../shared/Icon'
import { Time } from '../../shared/time'
import s from './InputPad.module.scss'
import { DatetimePicker, Popup } from 'vant';
import 'vant/es/popup/style';
import 'vant/es/datetime-picker/style';
export const InputPad = defineComponent({
  props: {
    happenAt: String,
    amount: Number
  },
  setup: (props, context) => {
    const buttons = [
      { text: '1', onClick: () => { appendText(1) } },
      { text: '2', onClick: () => { appendText(2) } },
      { text: '3', onClick: () => { appendText(3) } },
      { text: '4', onClick: () => { appendText(4) } },
      { text: '5', onClick: () => { appendText(5) } },
      { text: '6', onClick: () => { appendText(6) } },
      { text: '7', onClick: () => { appendText(7) } },
      { text: '8', onClick: () => { appendText(8) } },
      { text: '9', onClick: () => { appendText(9) } },
      { text: '.', onClick: () => { appendText('.') } },
      { text: '0', onClick: () => { appendText(0) } },
      { text: '清空', onClick: () => { refAmount.value = '0' } },
      { text: '提交', onClick: () => { 
        context.emit('update:amount',
        parseFloat(refAmount.value) * 100)
      } },
    ]
    const refAmount = ref(props.amount ? (props.amount /100).toString() : '0')
    const refDatePickerVisible = ref(false)
    const setDate = (date: Date) => { 
      context.emit('update:happenAt', date.toISOString());
      hideDatePicker() 
    }
    const showDatePicker = () => refDatePickerVisible.value = true
    const hideDatePicker = () => refDatePickerVisible.value = false
    const appendText = (n: string | number) => {
      const nString = n.toString()
      const amountValue = refAmount.value
      const amountValueLength = amountValue.length
      const dotIndex = amountValue.indexOf('.')
      if (amountValueLength >= 13) {
        return
      }
      if (dotIndex >= 0 && amountValueLength - dotIndex > 2) {
        return
      }
      if (nString === '.') {
        if (dotIndex >= 0) {
          return
        }
      } else if (nString === '0') { 
        if (dotIndex === -1) {
          return
        }
      } else { 
        if (refAmount.value === '0') {
          refAmount.value = ''
        }
      }
      refAmount.value += nString
    }
    return () => <>
      <div class={s.dateAndAmount}>
        <span class={s.date}>
          <Icon name='date' class={s.icon} />
          <span>
            <span onClick={showDatePicker}>{new Time(props.happenAt).format()}</span>
            <Popup position='bottom' v-model:show={refDatePickerVisible.value}>
              <DatetimePicker value={props.happenAt} type="date" title="选择年月日"
                onConfirm={setDate} onCancel={hideDatePicker}
              />
            </Popup>
          </span>
        </span>
        <span class={s.amount}>{refAmount.value}</span>
      </div>
      <div class={s.buttons}>
        {buttons.map(button => <button onClick={button.onClick}>{button.text}</button>)}
      </div>
    </>
  }
})