import { Form, Field, ErrorMessage, defineRule, configure  } from 'vee-validate'
import { required } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import * as AllRules from '@vee-validate/rules'

Object.keys(AllRules).forEach((rule) => {
  if (rule != 'all') {
    defineRule(rule, AllRules[rule])
  }
})

// defineRule('required', required);
defineRule('password_regex', (value) => {
  const containsUpperCaseLetter = +/[A-Z]/.test(value)
  const containsLowerCaseLetter = +/[a-z]/.test(value)
  const containsNumber = +/\d/.test(value)

  const conditionsMet = containsUpperCaseLetter + containsLowerCaseLetter + containsNumber

  return conditionsMet > 2
})

defineRule('password_not_match', () => {
  return false
})

configure({
  generateMessage: localize('en', {
    messages: {
      required: (context) => `Vui lòng nhập ${context.field}`,
      email: "Email không đúng định dạng",
      password_regex: 'Mật khẩu phải có ít nhất 8 ký tự, trong đó ít nhất 1 chữ hoa, 1 chữ thường và 1 số',
      password_not_match: 'Mật khẩu xác nhận không khớp',      
      max: (context) => `Nhập tối đa ${context.rule?.params[0]} ký tự`,
      min: (context) => `Nhập tối thiểu ${context.rule?.params[0]}  ký tự`
    },
  }),
})

export const checkRulesConfirmPassword = (password, password_confirmation) => {
  if (password_confirmation.length == 0 || password_confirmation.trim().length == 0) {
    return 'required'
  } else if (password_confirmation !== password) {
    return 'password_not_match'
  }
}

export function useValidate(app) {
  app.component('Form', Form)
  app.component('Field', Field)
  app.component('ErrorMessage', ErrorMessage)
}
