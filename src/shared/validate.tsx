interface FData {
  [k: string]: string | number | null | undefined | FData
}
type Rule<T> = {
  key: keyof T,
  message: string
} & (
    { type: 'required' } |
    { type: 'pattern', regex: RegExp }
  )
type Rules<T> = Rule<T>[]
export type { Rules }
export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
  type Errors = {
    [k in keyof T]?: string[]
  }
  const errors: Errors = {}
  rules.map(rule => {
    const { key, message, type } = rule
    const value = formData[key]
    switch (type) {
      case 'required':
        if (isEmpty(value)) {
          console.log(value,'value')
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break;
      case 'pattern':
        if (value && !rule.regex.test(value.toString())) {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break;
      default:
        return;
    }
  })
  return errors
}
const isEmpty = (value: null | undefined | string | number | FData ) => {
  return value === null || value === undefined || value === ''
}

export function hasError(errors: Record<string,string[]>) {
  // 可以使用reduce 但是reduce无法终止循环
  // return Object.values(errors).reduce((result,value)=> result += value.length,0) > 0
  let result = false
  for(let key in errors) {
    if(errors[key].length > 0) {
      result = true
      break
    }
  }
  return result
}