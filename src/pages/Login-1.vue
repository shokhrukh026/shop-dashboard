<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="../statics/profile.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Войти
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input filled v-model="username" label="Логин" lazy-rules />

              <q-input
                filled
                v-model="password"
                label="Пароль"
                lazy-rules
                :type="isPwd ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <div>
                <q-btn
                  label="Вход"
                  type="button"
                  color="primary"
                  @click="Login"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>

        <q-dialog v-model="error" position="top">
          <q-card class="bg-negative">
            <!-- <q-linear-progress :value="0.6" color="red" /> -->

            <q-card-section class="row items-center no-wrap">
              <div class="text-white">
                Ошибка. Неправильный логин или пароль.
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
        {{ getUser }}
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
import { mapMutations, mapActions, mapGetters } from "vuex";
import router from "../router/index";

export default {
  data() {
    return {
      isPwd: true,
      username: "admin",
      password: "admin",
      error: false,
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(["getUser"]),

    ...mapMutations(["UNSET_USER_FROM_STATE"]),
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // access to component's instance using `vm` .
      // this is done because this navigation guard is called before the component is created.
      // clear your previously populated search results.
      // re-populate search results

      // vm.$root.enterToRouter;
      vm.UNSET_USER_FROM_STATE;
      // next();
    });
  },

  methods: {
    ...mapActions(["AUTHORIZATION"]),

    async Login() {
      let a = await this.AUTHORIZATION({
        username: this.username,
        password: this.password,
        router: this.$router,
      });
      if (a === "error") {
        this.error = true;
      }
    },
  },
};
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg ,#20BF55 0%, #63D471 100%);
}
</style>
