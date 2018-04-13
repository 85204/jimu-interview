<template>
  <div class="hello">
    <el-button type="primary" @click="start" v-show="!showRestart">开抽</el-button>
    <el-button type="success" @click="restart" v-show="showRestart">再一次</el-button>
    <el-table
    :data="tableData"
    stripe
    style="width: 10em;margin: auto;">
    <el-table-column
      prop="log"
      label="抽奖记录">
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      tableData: [],
      showRestart: false
    };
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.tableData = []
      this.space = []
      for (let i = 1; i <= 9; i++) {
        this.space.push(i)
      }
      this.showRestart = false
    },
    start() {
      let data = this.getResult()
      console.log(data)
      if (data) {
        this.$message.success(`您获得的是${data}元`);
        this.tableData.push({ log: data })
      } else {
        this.$message.error('奖都抽完啦！');
        this.showRestart = true
      }
    },
    getResult() {
      return this.space.length
        ? this.space.splice(Math.floor(Math.random() * this.space.length), 1)[0]
        : false
    },
    restart() {
      this.showRestart = false
      this.init()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
