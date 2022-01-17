
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js'

createApp({
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin'
      // const username = this.username
      // console.log(username)
      axios.post(api, this.user).then((response) => {
        const { token, expired } = response.data
        // 寫入 cookie token
        // expires 設置有效時間
        console.log(this.user)
        console.log(response)
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`
        window.location = 'products.html'
      }).catch((error) => {
        alert(error.data.message)
      })
    }
  }
}).mount('#app')
