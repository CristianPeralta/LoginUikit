<template lang="html">
  <div class="">
    <section class="hero is-ligth is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title" style="background: 000; ">
            Welcome
          </h1>
          <h2 class="subtitle">
            {{user.name}}
          </h2>
          <p class="image is-32x32" style="margin-right:10px;">
            <img style="border-radius: 50%;" height="128" width="128" :src="user.photo">
          </p>
          <br>

          <a @click="logout()">
            <span class="tag is-info">Logout</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import LocalServices from '@/services/LocalServices'

export default {
  name: 'Home',
  data () {
    return {
      user: {}
    }
  },
  mounted() {
    this.getUser(this.checkUser);
  },
  methods: {
    getUser (cb) {
        LocalServices.user().then((response) => {
          this.user = response.data;
          cb();
        });
      },
      checkUser () {
        if (!this.user.name) {
          this.$router.push({name: 'UikitLogin'});
        }
      },
      logout() {
        LocalServices.logout() .then((response) => {
          this.$router.push({ name: 'UikitLogin'});
        });
      }
  }
}
</script>

<style lang="css">

</style>
