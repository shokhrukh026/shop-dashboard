<template>
  <q-page class="bg-grey-3">
    <div class="row q-pa-md">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-mr-md q-mb-md">
        <q-card class="card-bg text-black">
          <q-card-section class="text-h6 bg-blue">
            <div class="text-h6 text-white">Данные лекарства</div>
          </q-card-section>

          <q-list dense bordered separator class="bg-white shadow-1">
            <q-item v-ripple>
              <q-item-section>
                <q-item-label class="text-h6 text-green-9"
                  >Название лекарства :
                  <span class="text-subtitle1 text-black"
                    >&nbsp;{{ getMedicines.title }}</span
                  ></q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item v-ripple>
              <q-item-section>
                <q-item-label class="text-h6 text-green-9"
                  >Описание:
                  <span class="text-subtitle1 text-black"
                    >&nbsp;{{ getMedicines.description }}</span
                  ></q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item v-ripple>
              <q-item-section>
                <q-item-label class="text-h6 text-green-9"
                  >Штрих-код:
                  <span class="text-subtitle1 text-black"
                    >&nbsp;{{ getMedicines.barcode }}</span
                  ></q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item v-ripple>
              <q-item-section>
                <q-item-label class="text-h6 text-green-9"
                  >Страна:
                  <span class="text-subtitle1 text-black"
                    >&nbsp;{{ getMedicines.country }}</span
                  ></q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item v-ripple>
              <q-item-section>
                <q-item-label class="text-h6 text-green-9"
                  >Производитель:
                  <span class="text-subtitle1 text-black"
                    >&nbsp;{{ getMedicines.manufacture }}</span
                  ></q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item v-ripple>
              <q-item-section>
                <q-item-label class="text-h6 text-green-9"
                  >Серийный номер:
                  <span class="text-subtitle1 text-black"
                    >&nbsp;{{ getMedicines.serial_code }}</span
                  ></q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item v-ripple>
              <q-item-section>
                <q-item-label class="text-h6 text-green-9"
                  >НДС:
                  <span class="text-subtitle1 text-black"
                    >&nbsp;{{ getMedicines.vat }}%</span
                  ></q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item v-ripple>
              <q-item-section>
                <q-item-label class="text-h6 text-green-9"
                  >Общее количество в бизнесе:
                  <span class="text-subtitle1 text-black"
                    >&nbsp;{{ getMedicines.total_quantity }}</span
                  ></q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item v-ripple>
              <q-item-section>
                <q-item-label class="text-h6 text-green-9"
                  >Оставшееся количество в бизнесе:
                  <span class="text-subtitle1 text-black">{{
                    getMedicines.left_quantity
                  }}</span></q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <div
        class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-mt-md"
        v-for="(medInfo, item) in medicine_info_add"
        :key="item"
      >
        <q-card class="card-bg text-black">
          <q-card-section class="text-h6 bg-blue row justify-between">
            <div>
              <div class="text-h6 text-white">
                Добавить инфо для лекарства #{{ item + 1 }}
              </div>
              <div class="text-subtitle2 text-white">
                Введите данные лекарства
              </div>
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
                  <q-input
                    color="blue"
                    outlined
                    dense
                    v-model="medicine_info_add[item].quantity"
                    label="Кол-во упаковок"
                  />
                </q-item-section>
              </q-item>
              <q-item
                class="col-lg-6 col-md-12 col-sm-12 col-xs-12"
                v-if="getMedicineDetails.capacity > 1"
              >
                <q-item-section>
                  <q-input
                    color="blue"
                    outlined
                    dense
                    v-model="medicine_info_add[item].piece"
                    label="Кол-во штук"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    color="blue"
                    outlined
                    dense
                    v-model="medicine_info_add[item].purchase_price"
                    label="Цена покупки"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    color="blue"
                    outlined
                    dense
                    v-model="medicine_info_add[item].selling_price"
                    label="Цена продажи"
                  />
                </q-item-section>
              </q-item>

              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    color="blue"
                    outlined
                    v-model="medicine_info_add[item].expire_date"
                    label="Годен до"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            color="blue"
                            outlined
                            mask="YYYY-MM-DD"
                            today-btn
                            v-model="medicine_info_add[item].expire_date"
                            @input="() => $refs.qDateProxy[item].hide()"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right"> </q-card-actions>
        </q-card>
      </div>

      <div
        class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-mt-md row justify-between"
      >
        <q-btn
          color="blue"
          icon="add"
          label="Добавить информацию о лекарстве"
          size="md"
          @click="addInfoForMedicine"
        />
        <q-btn
          class="text-capitalize bg-blue text-white"
          @click="addMedicineInfo"
          size="md"
          v-if="medicine_info_add.length != 0"
          >Добавить</q-btn
        >
      </div>
    </div>

    <q-dialog v-model="addedMedInfo" position="top">
      <q-card class="bg-green">
        <q-card-section class="row justify-center no-wrap">
          <div class="text-white text-subtitle2">Успешно добавлено!</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      addedMedInfo: false,
      getMedicines: {
        title: "",
        barcode: "",
        country: "",
        manufacture: "",
        serial_code: "",
        vat: "",
        total_quantity: "",
        left_quantity: "",
        capacity: "",
      },
      response: { data: { data: {} } },
      medicine_info_add: [
        {
          quantity: "",
          piece: "",
          purchase_price: "",
          selling_price: "",
          expire_date: "",
        },
      ],
    };
  },
  watch: {},


  methods: {

    addInfoForMedicine() {
      if (this.getMedicines.capacity <= 1) {
        this.$set(this.medicine_info_add, this.medicine_info_add.length, {
          quantity: "",
          piece: 0,
          purchase_price: "",
          selling_price: "",
          expire_date: "",
        });
      } else {
        this.$set(this.medicine_info_add, this.medicine_info_add.length, {
          quantity: "",
          piece: "",
          purchase_price: "",
          selling_price: "",
          expire_date: "",
        });
      }
    },
    removeInfoForMedicine(item) {
      this.medicine_info_add.splice(item, 1);
    },

  },
};
</script>

<style scoped>
.m:hover {
  color: green;
}
</style>
