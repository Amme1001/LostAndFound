const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  sex: state => state.user.sex,
  phone: state => state.user.phone,
  permission: state => state.user.permission,
  baseImageUrl: state => state.user.baseImageUrl,
  currentRouter: state => state.user.currentRouter
}
export default getters
