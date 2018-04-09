import Api from '@/services/Api'

export default {
  signup (params) {
    return Api().post('signup', params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  },
  login (params) {
    return Api().post('login', params);
  },
  logout () {
    return Api().post('logout');
  },
  user () {
    return Api().get('user');
  }
}
