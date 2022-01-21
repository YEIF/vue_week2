import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js'
// import { Cookies } from 'js-cookie'

const app = createApp({
  data () {
    return {
      tempProduct: {},
      apiUrl: 'https://vue3-course-api.hexschool.io',
      apiPath: 'clothes',
      // config: {
      //   headers: { Authorization: '' }
      // },
      products: []
    }
  },
  methods: {
    checkLogin () {
      const url = `${this.apiUrl}/api/user/check`
      // axios.post(url, {}, this.config)
      axios.post(url)
        .then((res) => {
          console.log(res)
          if (!res.data.success) {
            alert('請重新登入')
            window.location = 'index.html'
          } else {
            this.getData()
          }
        })
        .catch((err) => {
          console.dir(err.data)
          window.location = 'index.html'
        })
    },
    getData () {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`
      // axios.get(url, this.config)
      axios.get(url)
        .then((res) => {
          this.products = res.data.products
        })
        .catch((err) => {
          console.dir(err.data)
        })
    },
    openProduct(item){
      this.tempProduct=item
    },
    logout () {
      const url = `${this.apiUrl}/v2/logout`
      axios.post(url)
        .then((res) => {
          Cookies.remove('hexToken')
          alert('登出成功')
          window.location = 'index.html'
        }).catch((err) => {
          console.dir(err.data)
        })
    }
  },
  mounted () {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = token
    // this.config.headers.Authorization = token
    this.checkLogin()
  }
})
app.mount('#app')
