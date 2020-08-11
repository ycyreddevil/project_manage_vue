import request from '@/utils/request'

export function fileupload(data) {
  return request({
    url: '/fleUpload/fileUpload',
    method: 'post',
    data
  })
}
