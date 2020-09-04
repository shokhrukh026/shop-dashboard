<template>
  <q-card style="min-width: 27vw;">
    <q-card-section class="bg-info row">
      <div class="text-h6 text-white">Добавить единицу измерения</div>
      <q-space></q-space>
      <q-btn icon="close" color="white" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit.prevent="addTypeInfo" class="q-mt-md">
        <q-list class="row">
          <q-item class="col-12">
            <q-item-section>
              <q-input color="blue" outlined dense v-model="title" label="Название единицы измерения*" />
              
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-toggle
                v-model="isCountable"
                color="blue"
                keep-color
              />
            </q-item-section>
            <q-item-section>
              <q-btn label="Добавить" type="submit" class="bg-info text-white" v-close-popup/>
             </q-item-section>
          </q-item>
        </q-list>
        <!-- <q-separator></q-separator> -->
        <div class="row justify-end">
        </div>
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
        isCountable: false,
      }
    },
    destroyed($event) {
      this.$emit('onDestroyComponent');
    },
    computed:{
      ...mapGetters([
        'getAllTypes'
      ]),
    },
    methods: {
      ...mapActions([
        'ADD_TYPE'
      ]),
      async addTypeInfo(){
        let response = await this.ADD_TYPE({ name: this.title, is_countable: this.isCountable});
        if(response){
          this.$q.notify({
            message: 'Успешно добавлено!',
            color: 'green',
            position: 'top',
          });
          this.title = '';
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
