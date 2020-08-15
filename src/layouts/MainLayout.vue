<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-green">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" aria-label="Menu" />

        <q-toolbar-title>
          <router-link class="cursor-pointer" to="/main" tag="div">
            UzPos Аналитика
          </router-link>
        </q-toolbar-title>


        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <!-- <q-btn round dense flat color="white" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()" v-if="$q.screen.gt.sm">
                       <q-tooltip>Messages</q-tooltip>
          </q-btn> -->
          <!-- <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              5
            </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
                       <q-tooltip>Notifications</q-tooltip>
          </q-btn> -->
          <q-btn round flat to="/shopping-cart">
            <q-icon name="shopping_cart"></q-icon>
            <q-badge color="red" floating v-if="cart > 0">{{cart}}</q-badge>
          </q-btn>
          


          <q-btn round flat>
            <q-avatar size="26px">
              <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png"> -->
              <q-icon name="fas fa-user-circle"></q-icon>
            </q-avatar>

            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list style="min-width: 100px">
                <q-item clickable to="/branches">
                  <q-item-section>Филиалы</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable to="/profile">
                  <q-item-section>Настройки</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>
                    <q-btn color="blue" label="Выход" push size="sm" v-close-popup to="/" @click="logout" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>

          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-green text-white">
      <router-link class="q-pa-sm cursor-pointer" to="/main" tag="div">
        <q-img  :src="require('../statics/Uzpos_logo_rectangle.png')"></q-img>
      </router-link>
      <q-list>
       
      

        <q-item :to="bar.url" active-class="q-item-no-link-highlighting" v-for="(bar,item) in sideBar" :key="item">
          <q-item-section avatar>
            <q-icon :name="bar.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{bar.title}}</q-item-label>
          </q-item-section>
        </q-item>
       
        


      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view @medicines="distributeMedicines"/> 
      <!-- @medicines="distributeMedicines" :medicine="shopping_cart" -->
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'
import Messages from "./Messages";
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'MainLayout',
  components: {
    Messages,
    EssentialLink
  },
  data() {
    return {
      cart: '0',
      leftDrawerOpen: false,
      // shopping_cart: [],
      sideBar: [
        {title: 'Главная', icon: 'dashboard', url: '/main'},
        {title: 'Филиалы', icon: 'fas fa-building', url: '/branches'},
        {title: 'Лекарства', icon: 'fas fa-box-open', url: '/medicines'},
        {title: 'История', icon: 'fas fa-history', url: '/history'},
        {title: 'Панель приборов', icon: 'fas fa-chart-pie ', url: '/medicines'},
        {title: 'Лучшие продажи', icon: 'fas fa-chart-line', url: '/medicines'},
        {title: 'Остаток средств', icon: 'fas fa-chart-bar', url: '/medicines'},



      ]

    }
  },
  watch: {

  },
  async mounted(){
    await this.GET_SHOPPING_CART_MEDICINES();
    console.log(this.getShoppingCartMedicines.length);
    // sessionStorage.setItem('cart', this.getShoppingCartMedicines.length);
    // this.cart = sessionStorage.getItem('cart');
    this.cart = this.getShoppingCartMedicines.length;
  },
  computed:{
    ...mapGetters([
      'getShoppingCartMedicines'
    ])
  },
  methods: {
    ...mapActions([
      'GET_SHOPPING_CART_MEDICINES'
    ]),
    //clears Session
    async logout(){
      await this.$store.dispatch('LOGOUT');
    },
    async distributeMedicines(value){
      // this.$set(this.shopping_cart, this.shopping_cart.length, await value);
      console.log(value);
      if(value == true){
        this.cart++;
      }else if(value == false){
        this.cart--;
      }else if(value == 'distribute_all'){
        this.cart = 0;
      }
    }

  }
}
</script>
