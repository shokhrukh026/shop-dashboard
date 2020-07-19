<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="../statics/profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="username"
                label="Username"
                lazy-rules
              />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules

              />

              <div>
                <q-btn label="Login" to="/" type="button" color="primary" @click="Login"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
        {{getUser}}
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios';
import {mapActions, mapGetters} from 'vuex'
import router from '../router/index'

export default {
    data() {
        return {
            username: 'admin',
            password: 'admin',
            posts: [],
        }
    },
    computed: {
      ...mapGetters([
        'getUser',
      ])
    },
    methods: {
      ...mapActions([
            'AUTHORIZATION',
        ]),
        
      async Login(){
         await this.AUTHORIZATION({username: this.username, password: this.password, router: this.$router});
        
        
      }
    }
}
</script>

<style>

  .bg-image {
   background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
  }
</style>
