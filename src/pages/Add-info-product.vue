<template>
    <q-page class="bg-grey-3">
        <div class="row q-pa-md">
           <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-mr-md q-mb-md">
             <q-btn push color="white" text-color="blue" icon="fas fa-arrow-left" 
              class="q-mb-xs q-mr-xs" :to="{ name: 'product-info', params: {id: id}}"/>

             <q-card class="card-bg text-black">
               <q-card-section class="text-h6 bg-blue">
                 <div class="text-h6 text-white">Данные продукта</div>
               </q-card-section>

              <q-list dense bordered separator class="bg-white shadow-1">
               <q-item v-ripple>
                 <q-item-section>
                     <q-item-label class="text-h6 text-green-9">Название продукта : <span class="text-subtitle1 text-black">&nbsp;{{getProduct.title}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-green-9">Описание: <span class="text-subtitle1 text-black">&nbsp;{{getProduct.description}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-green-9">Штрих-код: <span class="text-subtitle1 text-black">&nbsp;{{getProduct.barcode}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-green-9">Ед. измерения: <span class="text-subtitle1 text-black">&nbsp;{{getProduct.type_product_name}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-green-9">Страна: <span class="text-subtitle1 text-black">&nbsp;{{getProduct.country}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-green-9">Производитель: <span class="text-subtitle1 text-black">&nbsp;{{getProduct.manufacture}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-green-9">Категория: <span class="text-subtitle1 text-black">&nbsp;{{getProduct.category}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-green-9">НДС: <span class="text-subtitle1 text-black">&nbsp;{{getProduct.vat}}%</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-green-9">Общее количество в бизнесе: <span class="text-subtitle1 text-black">&nbsp;{{getProduct.total_quantity}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-green-9">Оставшееся количество в бизнесе: <span class="text-subtitle1 text-black">{{getProduct.left_quantity}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-green-9">Добавлено в: <span class="text-subtitle1 text-black">{{getProduct.added_at}}</span></q-item-label>
                 </q-item-section>
               </q-item>
             </q-list>


          
             </q-card>
           </div>

<!-- {{getProduct}} -->

          <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-mt-xs" v-for="(productInfo,item) in product_info_add" :key="item">
             <q-card class="card-bg text-black">
               <q-card-section class="text-h6 bg-blue row justify-between">
                 <div>
                   <div class="text-h6 text-white">Добавить инфо для продукта #{{item + 1}}</div>
                   <div class="text-subtitle2 text-white">Введите данные продукта</div>
                 </div>
                 <div>
                   <q-btn flat @click="removeInfoForMedicine(item)">
                    <q-icon name="close" class="text-white text-h5"></q-icon>
                   </q-btn>
                 </div>
               </q-card-section>
               <q-card-section class="q-pa-sm">
                 <q-list class="row">
                  
                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="product_info_add[item].quantity" label="Количество" />
                     </q-item-section>
                   </q-item>
                    <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="product_info_add[item].purchase_price" label="Цена покупки" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="product_info_add[item].selling_price" label="Цена продажи" />
                     </q-item-section>
                   </q-item>

                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>

                       <q-input dense color="blue" outlined v-model="product_info_add[item].expire_date" label="Годен до">
                         <template v-slot:append>
                           <q-icon name="event" class="cursor-pointer">
                             <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                               <q-date color="blue" outlined mask="YYYY-MM-DD" today-btn v-model="product_info_add[item].expire_date" @input="() => $refs.qDateProxy[item].hide()"/>          
                             </q-popup-proxy>
                           </q-icon>
                         </template>
                       </q-input>

                     </q-item-section>
                   </q-item>

                 </q-list>
               </q-card-section>
             </q-card>
           </div>

          <!-- {{product_info_add}} -->

           <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-mt-md row justify-between">
            <q-btn color="blue" icon="add" label="Добавить информацию о продукте" size="md" @click="addInfoForProduct"/>
            <q-btn class="text-capitalize bg-blue text-white" @click="addProductInfo" size="md" v-if="product_info_add.length != 0">Добавить</q-btn>
           </div>
              
        </div>
    </q-page>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    props: {
      id: [String, Number]
    },
    data(){
      return {
          getProduct: {},
          product_info_add: [{ quantity: '', purchase_price: '', selling_price: '', expire_date: ''}],
      }
    },
    watch: {
    
    },
    computed:{
      ...mapGetters([
        'getProductDetail', 
      ]),
    },
    async mounted(){
      const details = await this.FETCH_BUSSINESS_PRODUCT(this.id);
      this.getProduct = await this.getProductDetail;
    },
    methods:{
      ...mapActions([
        'ADD_PRODUCT_INFO', 'FETCH_BUSSINESS_PRODUCT'
      ]),
      async addInfoForProduct(){
        await this.$set(this.product_info_add, this.product_info_add.length, { quantity: '', purchase_price: '', selling_price: '', expire_date: ''});
      },
      async removeInfoForMedicine(item){
        await this.product_info_add.splice(item, 1);
      },
      
      async addProductInfo(){
        let response;
        for (let i = 0; i < this.product_info_add.length; i++) {
          response = await this.ADD_PRODUCT_INFO({
            business_product_id: this.id,
            quantity: this.product_info_add[i].quantity,
            purchase_price: this.product_info_add[i].purchase_price,
            selling_price: this.product_info_add[i].selling_price,
            expire_date: this.product_info_add[i].expire_date,
          })
        }
        this.$set(this.product_info_add, 0, {quantity: '', purchase_price: '', selling_price: '', expire_date: ''});
        for(let j = 1; j < this.product_info_add.length; j++){
          this.product_info_add.pop()
        }

        if(response.status == 'SUCCESS'){
          this.$q.notify({
            message: 'Успешно добавлено!',
            color: 'green'
          })
        }else{
          this.$q.notify({
            message: 'Ошибка!',
            color: 'negative'
          })
        }
      },


    }
}
</script>

<style scoped>
.m:hover{
  color: green;
}
</style>