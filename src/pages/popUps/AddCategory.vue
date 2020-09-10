<template>
  <q-card style="min-width: 27vw;">
    <q-card-section class="bg-info row">
      <div class="text-h6 text-white">Добавить Категорию</div>
      <q-space></q-space>
      <q-btn icon="close" color="white" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit.prevent="addCategoryInfo" class="q-mt-md">
        <q-list class="row">
          <q-item class="col-12">
            <q-item-section>
              <q-input color="blue" outlined dense v-model="title" label="Название Категории*" />
            </q-item-section>
          </q-item>
          <q-item class="col">
            <q-item-section>
              <div class="row justify-end">
                <q-btn label="Добавить" type="submit" class="bg-info text-white" v-close-popup/>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
    </q-form>

    <!-- {{medicine_add}} -->
  </q-card>
</template>


<script>
  import {mapActions, mapGetters} from 'vuex';
  export default {
    data(){
      return {
        title: '',
      }
    },
    destroyed($event) {
      this.$emit('onDestroyComponent');
    },
    computed:{
      ...mapGetters([
        'getAllCategories'
      ]),
    },
    methods: {
      ...mapActions([
        'ADD_CATEGORY', 'FETCH_ALL_CATEGORIES'
      ]),
      async addCategoryInfo(){
        let response = await this.ADD_CATEGORY(this.title);
        if(response){
          this.$q.notify({
            message: 'Успешно добавлено!',
            color: 'green',
            position: 'top',
          });
          this.title = '';
          await this.FETCH_ALL_CATEGORIES();
        }else{
          this.$q.notify({
            message: 'Ошибка!',
            color: 'red',
            position: 'top',
          })
        }
      },
    }
  }
</script>

<style scoped>

</style>
