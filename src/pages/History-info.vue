<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-md">
      <q-expansion-item
        expand-separator
        icon="info"
        default-opened
        header-class="bg-blue text-h6"
        dark
        :label="'Информация о лекарстве '"
      >
        <q-list bordered separator dense class="bg-white shadow-1">
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Название лекарства :
                <span class="text-subtitle1 text-black"
                  >&nbsp;</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Код:
                <span class="text-subtitle1 text-black"
                  >&nbsp;</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Описание:
                <span class="text-subtitle1 text-black"
                  >&nbsp;</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Штрих-код:
                <span class="text-subtitle1 text-black"
                  >&nbsp;</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Страна:
                <span class="text-subtitle1 text-black"
                  >&nbsp;</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Производитель:
                <span class="text-subtitle1 text-black"
                  >&nbsp;</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Серийный номер:
                <span class="text-subtitle1 text-black"
                  >&nbsp;</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >НДС:
                <span class="text-subtitle1 text-black"
                  >&nbsp;</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Количество:
                <span class="text-subtitle1 text-black"
                  >&nbsp;</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Вместимость:
                <span class="text-subtitle1 text-black"
                  >&nbsp;</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Статус:
                <span class="text-subtitle1 text-black"
                  >&nbsp;</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Цена покупки:
                <span class="text-subtitle1 text-black"
                  >&nbsp;</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Цена продажи:
                <span class="text-subtitle1 text-black"
                  >&nbsp;</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Годен до:
                <span class="text-subtitle1 text-black">}</span></q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </div>
  </q-page>
</template>

<script>

export default {
  props: {
    id: {
      type: "",
      required: true,
    },
  },
  data() {
    return {
      data: [],
    };
  },
  watch: {},
  async mounted() {
    this.data = await this.getArrivalAllInfo;
  },
};
</script>

<style scoped></style>
