<template>
  <q-card class="">
    <q-card-section class="bg-info row">
      <div class="text-h6 text-white" style="padding-right: 100px;">Добавить Категорию</div>
      <q-space></q-space>
      <q-btn icon="close" color="white" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit.prevent="addCategoryInfo(category_add.description)"  @keyup.enter="addCategoryInfo(category_add.description)">
        <q-list class="row col-8">
          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-item-section class="">
              <q-input color="blue" outlined autogrow dense v-model="category_add.description" label="Названия Категори*" />
            </q-item-section>
          </q-item>
        </q-list>
        <div class="row col-12 justify-end q-px-md q-pa-sm ">
          <q-btn label="Добавить" type="submit" class="text-capitalize bg-info  text-white"/>
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
        category_add: {
          description: "",
        },
        isAdded: null,
      }
    },
    computed:{
      ...mapGetters([
        ''
      ]),
    },
    methods: {
      ...mapActions([
        'ADD_CATEGORY'
      ]),

      async addCategoryInfo(title)
      {
        let response = await this.ADD_CATEGORY(title);
        if(response)
        {
          this.$q.notify({
            message: 'new Category is added ',
            color: 'green',
            position: 'top',
          })
          this.category_add.description = "";
        }
        else
        {
          this.$q.notify({
            message: 'категория не добавилось.Попробуйте еще раз',
            color: 'red',
            position: 'top',
          })
        }

        this.onReset();
        this.addRow = false;
      }
    }
  }
</script>

<style scoped>

</style>
