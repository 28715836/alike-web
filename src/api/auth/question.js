import request from '@/utils/request'

export function getQuestionBankList (parameter) {
  return request({
    url: '/question/banks',
    method: 'get',
    params: parameter,
  })
}

export function getQuestionBankListAll () {
  return request({
    url: '/question/bank',
    method: 'get',
  })
}

export function addQuestionBank (data) {
  return request({
    url: '/question/bank',
    method: 'post',
    data,
  })
}

export function addQuestion (data) {
  return request({
    url: '/question',
    method: 'post',
    data,
  })
}

export function getQuestions () {
  return request({
    url: '/question',
    method: 'post'
  })
}
