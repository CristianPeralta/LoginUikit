<template lang="html">
  <section class="hero is-success is-fullheight container">
    <div class=""></div>
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Sign Up</h3>
          <div class="box">
            <figure class="avatar">
              <img height="128" width="128" :src='preview'>
              <div class="file is-centered">
                <label class="file-label">
                  <input class="file-input" type="file" @change="processFile($event)">
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                      Choose a file…
                    </span>
                  </span>
                </label>
              </div>
            </figure>
              <div class="field">
                <div class="control">
                  <input class="input is-large" type="text" v-model="name" placeholder="Your Name" autofocus="">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input class="input is-large" type="email" v-model="email" placeholder="Your Email">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input class="input is-large" type="password" v-model="password" placeholder="Your Password">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input class="input is-large" type="password" v-model="confirmPassword" placeholder="Confirm Password">
                </div>
              </div>

              <button @click="sendForm()" class="button is-block is-info is-large is-fullwidth">Sign Me Up</button>
          </div>
          <p class="has-text-grey">
            <router-link to="/" exact>
              <a>Sign In</a> &nbsp;·&nbsp;
            </router-link>
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
  </section>
</template>

<script>
import LocalServices from '@/services/LocalServices'
export default {
  name: 'SignUp',
  data () {
    return {
      name: '',
      email: '',
      photo: {},
      preview: 'https://image.flaticon.com/icons/svg/179/179948.svg',
      password: '',
      gender: '',
      confirmPassword: ''
    }
  },
  methods: {
    processFile (e) {
      this.photo = e.target.files[0];
      this.preview = URL.createObjectURL(e.target.files[0]);
    },
    sendForm () {
      if (this.password === this.confirmPassword) {
        let form = new FormData();
        form.append('name', this.name);
        form.append('email', this.email);
        form.append('password', this.password);
        form.append('photo', this.photo);
        LocalServices.signup(form).then((response) => {
              let user = response.data;
              this.$router.push({ name: 'Home', params: {user: user}})
            })
      } else{
        alert('Password doesnt match');
      }
    }
  }
}
</script>

<style>
   html,body {
    font-family: 'Open Sans', serif;
    font-size: 14px;
    font-weight: 300;
  }
  .container{
    margin:0;
    padding: 0;
  }
  .hero.is-success {
    background: #F2F6FA;
  }
  .hero .nav, .hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .box {
    margin-top: 5rem;
  }
  .avatar {
    margin-top: -70px;
    padding-bottom: 20px;
  }
  .avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  }
  input {
    font-weight: 300;
  }
  p {
    font-weight: 700;
  }
  p.subtitle {
    padding-top: 1rem;
  }
</style>
