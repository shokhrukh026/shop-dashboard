<template>
        <q-card>
               <q-card-section class="bg-blue row">
                 <div class="text-h6 text-white">Добавить продукт</div>
                 <q-space></q-space>
                 <q-btn icon="close" color="white" flat round dense v-close-popup />
               </q-card-section>
                      
          <q-card-section class="row">

            <q-list class="row col-8">
                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                      <q-input
                        label="Название"
                        outlined
                        dense
                        v-model="product_add_new.title"
                        color="blue"
                      >
                      </q-input>
                     </q-item-section>
                   </q-item>
                    
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                        <q-input
                        label="Штрих-код"
                        outlined
                        dense
                        v-model="product_add_new.barcode"
                        color="blue"
                      >
                      </q-input>
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <div class="row justify-between">
                         <q-select
                            outlined
                            dense
                            v-model="product_add_new.type"
                            use-input
                            input-debounce="0"
                            label="Ед. измерения"
                            :options="type_options"
                            @filter="filterTypeFn"
                            clearable
                            emit-value
                            map-options
                            option-value="id"
                            option-label="name"
                            class="col-10"
                          >
                            <template v-slot:no-option>
                              <q-item>
                                <q-item-section class="text-grey">
                                  No results
                                </q-item-section>
                              </q-item>
                            </template>
                          </q-select>
                         <!-- <q-input  color="blue" outlined dense v-model="product_add_new.type" label="Единица измерения" class="col-10"/> -->
                         <q-btn color="blue" label="" size="xs" icon="fas fa-plus" class="q-ml-sm col" @click="addTypePopup = !addTypePopup"/>
                       </div>
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="product_add_new.country" label="Страна" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="product_add_new.manufacture" label="Производитель" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <div class="row justify-between">
                          <q-select
                            outlined
                            dense
                            v-model="product_add_new.category_id"
                            use-input
                            input-debounce="0"
                            label="Категория"
                            :options="categories_options"
                            @filter="filterFn"
                            clearable
                            emit-value
                            map-options
                            option-value="category_id"
                            option-label="title"
                            class="col-10"
                          >
                            <template v-slot:no-option>
                              <q-item>
                                <q-item-section class="text-grey">
                                  No results
                                </q-item-section>
                              </q-item>
                            </template>
                          </q-select>
                         <!-- <q-input  color="blue" outlined dense v-model="product_add_new.category_id" label="Категория" class="col-10"/> -->
                         <q-btn color="blue" label="" size="xs" icon="fas fa-plus" class="q-ml-sm col" 
                         @click="addCategoryPopUp = !addCategoryPopUp"/>
                       </div>
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="product_add_new.vat" label="НДС" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <q-item-section>
                        <q-input color="blue" outlined autogrow dense v-model="product_add_new.description" label="Описание" />
                      </q-item-section>
                    </q-item>              
                 </q-list>


               <q-list class="col">
                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="product_add_new.quantity" label="Кол-во" />
                     </q-item-section>
                   </q-item>
                  <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <!-- <q-input color="blue" outlined dense v-model="product_add_new.purchase_price" 
                        :mask="getMask" reverse-fill-mask fill-mask="0" :disable="!product_add_new.type"  label="Цена покупки" /> -->
                        <q-field
                          outlined
                          dense
                          color="blue"
                          :disable="!product_add_new.type"
                          v-model="product_add_new.purchase_price"
                          label="Цена покупки"
                        >
                          <template v-slot:control="{ id, floatingLabel, value, emitValue }">
                            <input :id="id" class="q-field__input" :value="value"
                             @change="e => emitValue(e.target.value)" v-money="money" v-show="floatingLabel">
                          </template>
                        </q-field>
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <!-- <q-input color="blue" outlined dense v-model="product_add_new.selling_price" 
                       :mask="getMask" reverse-fill-mask fill-mask="0"  :disable="!product_add_new.type" label="Цена продажи" /> -->
                       <q-field
                          outlined
                          dense
                          color="blue"
                          :disable="!product_add_new.type"
                          v-model="product_add_new.selling_price"
                          label="Цена продажи"
                        >
                          <template v-slot:control="{ id, floatingLabel, value, emitValue }">
                            <input :id="id" class="q-field__input" :value="value" :disable="!product_add_new.type"
                             @change="e => emitValue(e.target.value)" v-money="money" v-show="floatingLabel">
                          </template>
                        </q-field>
                     </q-item-section>
                   </q-item>

                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>

                       <q-input dense color="blue" outlined v-model="product_add_new.expire_date" label="Годен до">
                         <template v-slot:append>
                           <q-icon name="event" class="cursor-pointer">
                             <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                               <q-date color="blue" outlined mask="YYYY-MM-DD" today-btn v-model="product_add_new.expire_date" @input="() => $refs.qDateProxy.hide()"/>
                             </q-popup-proxy>
                           </q-icon>
                         </template>
                       </q-input>
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                        <q-btn class="text-capitalize bg-blue text-white" @click="addNewMedicine">Добавить</q-btn>
                     </q-item-section>
                   </q-item>
                 </q-list>
             </q-card-section>

             <q-dialog v-model="addTypePopup" persistent>
              <addType  @onDestroyComponent="updateTypes"/>
             </q-dialog>

              <q-dialog v-model="addCategoryPopUp" persistent>
              <addCategory  @onDestroyComponent="updateCategories"/>
             </q-dialog>

              <!-- {{getAllTypes}} -->
             <!-- {{getAllCategories}} -->

             --------{{product_add_new}}
            </q-card>
</template>


<script>
import {VMoney} from 'v-money'
import {mapActions, mapGetters} from 'vuex';
import addCategory from "./popUps/AddCategory";
import addType from './popUps/AddType';

export default {
    components: {
      addCategory,
      addType
    },
    directives: {money: VMoney},
    data(){
        return {
            addTypePopup: false,
            addCategoryPopUp: false,
            categories_options: [],
            type_options: [],
            product_add_new: {title: '', barcode: '', type: '', country: '', manufacture: '', category_id: '', quantity: '',
            vat: '', description: '', purchase_price: '', selling_price: '', expire_date: ''},
            money: {
              decimal: '.',
              thousands: ',',
              prefix: '',
              suffix: '',
              precision: 2,
              masked: false /* doesn't work with directive */
            }
        } 
    },
    watch:{
      'product_add_new.type': function(newVal, oldVal){
        let unit = this.getAllTypes.filter(el => el.id == this.product_add_new.type);
        if(unit.length == 0){
          this.money.precision = 2
        }
        if(unit[0].is_countable == true){
          this.money.precision = 0
        }else {
          this.money.precision = 2
        }
      }
    },
    async mounted(){
      await this.updateCategories();
      await this.updateTypes();
    },
    computed:{
      ...mapGetters([
        'getAllCategories', 'getAllTypes'
      ]),
      getMask(){
        
      },
    },
    methods:{
       ...mapActions([
        'ADD_PRODUCT', 'ADD_CATEGORY', 'FETCH_ALL_CATEGORIES', 'FETCH_ALL_TYPES'
      ]),
      async updateCategories(){
        await this.FETCH_ALL_CATEGORIES();
      },
      async updateTypes(){
        await this.FETCH_ALL_TYPES();
      },
      filterTypeFn (val, update) {
        if (val === '') {
          update(async () => {
            for(let i = 0; i < this.getAllTypes.length; i++){
              await this.$set(this.type_options, i, this.getAllTypes[i]);
            }
          })
          return
        }
        update(() => {
          let a = []
          for(let i = 0; i < this.getAllTypes.length; i++){
            a.push(this.getAllTypes[i]);
          }
          const needle = val.toLowerCase()
          this.type_options = a.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
        })
      },
      filterFn (val, update) {
        if (val === '') {
          update(async () => {
            for(let i = 0; i < this.getAllCategories.length; i++){
              await this.$set(this.categories_options, i, this.getAllCategories[i]);
            }
          })
          return
        }
        update(() => {
          let a = []
          for(let i = 0; i < this.getAllCategories.length; i++){
            a.push(this.getAllCategories[i]);
          }
          const needle = val.toLowerCase()
          this.categories_options = a.filter(v => v.title.toLowerCase().indexOf(needle) > -1);
        })
      },

      async addNewMedicine(){
        let answer = await this.ADD_PRODUCT(
          {
            title: this.product_add_new.title,
            barcode: this.product_add_new.barcode,
            type: this.product_add_new.type,
            country: this.product_add_new.country,
            manufacture: this.product_add_new.manufacture,
            category_id: this.product_add_new.category_id,
            quantity: this.product_add_new.quantity,
            vat: this.product_add_new.vat,
            description: this.product_add_new.description,
            purchase_price: this.product_add_new.purchase_price.replaceAll(',', ''),
            selling_price: this.product_add_new.selling_price.replaceAll(',', ''),
            expire_date: this.product_add_new.expire_date
          }
        )
        console.log(answer);
        Object.assign(this.product_add_new, {title: '', barcode: '', type: '', country: '', manufacture: '', category_id: '', quantity: '',
              vat: '', description: '', purchase_price: '', selling_price: '', expire_date: ''});
        if(answer.status == 'SUCCESS'){
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

</style>