const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  modules: state => state.user.modules,
  avatar: state => state.user.avatar,
  userId: state => state.user.userId,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
