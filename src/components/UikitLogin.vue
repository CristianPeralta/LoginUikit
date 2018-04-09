<template lang="html">
  <div class="uk-height-1-1">
    <div class="uk-vertical-align uk-text-center uk-height-1-1" style="padding-top: 12rem">
      <div class="uk-vertical-align-middle" style="width: 250px;">
        <img class="uk-margin-bottom" width="140" height="120" src="https://cdn0.iconfinder.com/data/icons/user-icon-profile-businessman-finance-vector-illus/100/19-1User-512.png" alt="">
            <form class="uk-panel uk-panel-box uk-form">
                <div class="uk-form-row">
                    <input class="uk-width-1-1 uk-form-large" v-model="email" type="text" placeholder="Your Email">
                </div>
                <div class="uk-form-row">
                    <input class="uk-width-1-1 uk-form-large" type="password" v-model="password" placeholder="Password">
                </div>
                <div class="uk-form-row">
                    <a @click="login()" class="uk-width-1-1 uk-button uk-button-primary uk-button-large" href="#">Login</a>
                </div>
            </form>
            <p class="has-text-grey">
              <router-link to="/signup" exact>
                <a>Sign Up</a> &nbsp;·&nbsp;
              </router-link>
              <a href="../">Need Help?</a>
            </p>
        </div>
      </div>
    </div>
</template>

<script>
import LocalServices from '@/services/LocalServices'

export default {
  name: 'UikitLogin',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      session: {}
    }
  },
  created () {
    this.getUser(this.checkUser)
  },
  methods: {
    checkUser () {
      if (this.session.name) {
        this.$router.push({name: 'Home'});
      }
    },
    login () {
      LocalServices.login({
        email: this.email,
        password: this.password
      }).then((response) => {
        let user = response.data;
        console.log(user);
        this.$router.push({ name: 'Home'})
      })
    },
    getUser (cb) {
      LocalServices.user().then((response) => {
        this.session = response.data;
        cb();
      });
    }
  }
}
</script>

<style lang="css">
@import "https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.5/css/uikit.css";
</style>
