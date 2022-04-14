<template>
  <el-container style="height: 100%">

    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <el-main>
        <common-tag></common-tag>
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
  import CommonAside from '@/components/CommonAside.vue'
  import CommonHeader from '@/components/CommonHeader.vue'
  import CommonTag from '@/components/CommonTag.vue'
  import CommonTable from '@/components/CommonTable.vue'
  export default {
    name: 'Main',
    components: {
      CommonAside,
      CommonHeader,
      CommonTag,
      CommonTable
    },
    data() {
      return {

      }
    },
  }
</script>
<style lang="less">
  .el-header {
    background-color: #42424b;
    padding-top: 0;
    width: 100%;
    height: 100%;
  }
</style>