<template>
<el-card class="box-card" style="margin:auto">
  <div slot="header" class="clearfix">
    <span>天气</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="refresh">刷新</el-button>
  </div>
  <div class="text item">
    {{'地点：' + city}}
  </div>
  <div class="text item">
    {{'最低温度：' + temp1}}
  </div>
  <div class="text item">
    {{'最高温度：' + temp2}}
  </div>
  <div class="text item">
    {{'天气：' + weather}}
  </div>
</el-card>
</template>

<script>
export default {
  data() {
    return {
      city: '',
      temp1: '',
      temp2: '',
      weather: '',
    };
  },
  created() {
    this.refresh()
  },
  methods: {
    refresh() {
      (async () => {
        let data = await fetch('/api')
        data = await data.json()
        data = data.weatherinfo
        console.log(data)
        this.city = data.city
        this.temp1 = data.temp1
        this.temp2 = data.temp2
        this.weather = data.weather
      })()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
