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

export function addOrUpdateProjectMember(data) {
  return request({
    url: '/project/addOrUpdateProjectMember',
    method: 'post',
    data
  })
}

export function getProjectMemberById(params) {
  return request({
    url: '/project/getProjectMemberById',
    method: 'post',
    params
  })
}

export function getProjectTaskTree(params) {
  return request({
    url: '/project/getProjectTaskTree',
    method: 'post',
    params
  })
}

export function getTaskById(params) {
  return request({
    url: '/project/getTaskById',
    method: 'post',
    params
  })
}

export function getTaskRecordByProjectId(data) {
  return request({
    url: '/project/getTaskRecordByProjectId',
    method: 'post',
    data
  })
}

export function getProjectCommentById(params) {
  return request({
    url: '/project/getProjectCommentById',
    method: 'post',
    params
  })
}

export function addProjectComment(data) {
  return request({
    url: '/project/addProjectComment',
    method: 'post',
    data
  })
}
