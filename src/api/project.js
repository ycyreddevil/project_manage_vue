import request from '@/utils/request'

export function findProjects(data) {
  return request({
    url: '/project/findProjects',
    method: 'post',
    data
  })
}

export function findProjectMember(params) {
  return request({
    url: '/project/findProjectMember',
    method: 'post',
    params
  })
}

export function addOrUpdateProject(data) {
  return request({
    url: '/project/addOrUpdateProject',
    method: 'post',
    data
  })
}

export function getProjectById(params) {
  return request({
    url: '/project/getProjectById',
    method: 'post',
    params
  })
}
