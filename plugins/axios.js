export default function ({$axios, redirect}) {

  $axios.onRequest(config => {

    const token = localStorage['token'] || sessionStorage['token']

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config

    // console.log('Making request to ' + config.url)
  })

  $axios.onResponse(response => {

    return response.data.status == 'error' ? Promise.reject(response.data) : Promise.resolve(response.data);

  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
    if (code === 404) {
      redirect('/404')
    }

    if (code == 422) {
      return store.dispatch('account_auth/refresh')
        .then(response => {
          return $axios(error.config)
        })
        .catch(() => {
          store.commit('account_auth/remove_auth');
          redirect('/login')
        })
    }
  })
}


