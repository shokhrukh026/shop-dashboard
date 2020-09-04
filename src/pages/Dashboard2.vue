<template>
  <q-page class="q-pa-sm">
    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">
          <div class="col-md-4 col-sm-12 col-xs-12" v-for="(block, item) in monitoring_blocks" :key="item">
            <q-card>
              <q-item class="q-pa-none" :class="block.color">
                <q-item-section class="q-pa-md q-ml-none  text-white">
                  <q-item-label class="text-white text-h6 text-weight-bolder">{{block.amount}} сум</q-item-label>
                  <q-item-label>{{block.label}}</q-item-label>
                </q-item-section>
                <q-item-section side class="q-mr-md text-white">
                  <q-icon :name="block.icon" color="white" size="44px"></q-icon>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
         
        </div>
      </q-card-section>
    </q-card>
    <!-- {{monitoring_blocks}} -->

    <q-card class="q-mt-sm">
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="blue" name="fas fa-chart-line" size="44px"/>
          </q-item-section>

          <q-item-section>
            <div class="text-h6">Статистика ежегодной прибыли</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="row">
        <div class="col-lg-7 col-sm-12 col-xs-12 col-md-7">
          <!-- <div class="row">
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="blue" text-color="white" class="q-pl-sm" icon="bluetooth"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-blue text-bold">4321</q-item-label>
                  <q-item-label caption>Fashions</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="grey-8" text-color="white" class="q-pl-sm" icon="bluetooth"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-grey-8 text-bold">9876</q-item-label>
                  <q-item-label caption>Electronics</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="green-6" text-color="white" class="q-pl-sm" icon="bluetooth"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-green-6 text-bold">345</q-item-label>
                  <q-item-label caption>Toys</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="orange-8" text-color="white" class="q-pl-sm" icon="bluetooth"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-orange-8 text-bold">1021</q-item-label>
                  <q-item-label caption>Vouchers</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div> -->
          <div>
            <IEcharts style="height: 250px" :option="getSalesOptions" :resizable="true"/>
          </div>
        </div>
        <!-- <div class="col-lg-5 col-sm-12 col-xs-12 col-md-5">
          <q-item>
            <q-item-section avatar class="">
              <q-icon color="blue" name="fas fa-gift" class="q-pl-md" size="24px"/>
            </q-item-section>

            <q-item-section>
              <div class="text-h6">TODAY SALES</div>
            </q-item-section>
          </q-item>
          <div>
            <IEcharts style="height: 250px" :option="getPieOptions" :resizable="true"/>
          </div>
        </div> -->
      </q-card-section>
    </q-card>
    <!-- {{data}} -->

    
  </q-page>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import IEcharts from 'vue-echarts-v3/src/full.js'

    export default {
        components: {
            IEcharts
        },
        data() {
            return {
                slide: 1,
                tab: 'contact',
                monitoring_blocks: [
                  { amount: '', icon: 'fas fa-chart-pie', label: 'Ежемесячный доход', color:'bg-blue'},
                  { amount: '', icon: 'fas fa-chart-bar', label: 'Еженедельный доход', color:'bg-secondary'},
                  { amount: '', icon: 'fas fa-chart-line', label: 'Ежедневный доход', color:'bg-orange'},
                ],
                data: [],

            }
        },
        async mounted(){
          let monitoring = await this.GET_MONITORING_PERIOD();
          this.monitoring_blocks[0].amount = monitoring.month;
          this.monitoring_blocks[1].amount = monitoring.week;
          this.monitoring_blocks[2].amount = monitoring.day;

          let bar_chart_values = await this.GET_MONITORING_BAR_CHART();
          let bar_chart = Object.values(bar_chart_values);
          for(let i = 0; i < bar_chart.length; i++){
            this.$set(this.data, i, bar_chart[i]);
          }
          //[40, 45, 27, 50, 32, 50, 70, 30, 30, 40, 67, 29]

        },
        computed: {
            getSalesOptions() {
                return {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {// Coordinate axis indicator, coordinate axis trigger is valid
                            type: 'shadow' // The default is a straight line, optional:'line' |'shadow'
                        }
                    },
                    grid: {
                        left: '2%',
                        right: '2%',
                        top: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitLine: {
                                show: false
                            }
                        }
                    ],
                    series: [
                        {
                            name: 'Доход',
                            type: 'bar',
                            data: this.data,
                            color: '#546bfa'
                        },
                    ]
                }
            },
            
        },
        methods: {
            ...mapActions([
              'GET_MONITORING_PERIOD', 'GET_MONITORING_BAR_CHART'
            ]),
            // getColor(val) {
            //     if (val > 70 && val <= 100) {
            //         return 'green'
            //     } else if (val > 50 && val <= 70) {
            //         return 'blue'
            //     }
            //     return 'red'
            // },
            // getChipColor(status) {
            //     if (status == 'Canceled') {
            //         return 'negative'
            //     } else if (status == 'Sent') {
            //         return 'positive'
            //     } else if (status == 'Pending') {
            //         return 'warning'
            //     } else if (status == 'Paid') {
            //         return 'info'
            //     } else {
            //         return 'dark'
            //     }
            // }
        }
    }
</script>

<style scoped>

</style>
