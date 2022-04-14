<template>
  <el-row class="home" :gutter="20">
    <!-- 左侧展示 -->
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">{{name}}</p>
            <p class="access">{{access}}</p>
          </div>
        </div>
        <hr class="hrline" />
        <div class="login-info">
          <p class="time">上次登录时间<span>{{timenow}}</span></p>
          <p class="address">上次登录地点<span>{{address}}</span></p>
        </div>
      </el-card>

      <el-card style="margin-top:20px;height:460px">
        <el-table :data="tableData" header-row-class-name="headerrow">
          <el-table-column v-for="(val,index) in tableLabel" :key="index" :prop="index" :label="val" align="center">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <!-- 右侧展示 -->
    <el-col :span="16">
      <div class="num">
        <el-card class="numcard" v-for="(item,index) in countData" :key="index" shadow=hover
          :body-style="{padding:'0px',width:'230px',height:'60px',display:'flex'}">
          <i class="icon" :class="'el-icon-'+item.icon" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="numsale">${{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height:280px;margin-top:20px">
        <!-- <div style="height:260px" ref="echarts"></div> -->
        <echart :chartData="echartData.order" style="height:280px" />
      </el-card>
      <div class="graph">
        <el-card style="height:260px;width:49%">
          <!-- <div style="height:240px" ref="userecharts"></div> -->
          <echart :chartData="echartData.user" style="height:240px" />
        </el-card>
        <el-card style="height:260px;width:49%">
          <!-- <div style="height:240px" ref="videoecharts"></div> -->
          <echart :chartData="echartData.video" style="height:240px" :isAxisChart="false" />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import {
    // getMenu,
    getData
  } from '../api/data.js'
  // import * as echart from 'echarts'
  import Echart from '../src/components/Echarts.vue'

  export default {
    name: 'Home',
    components: {
      Echart
    },
    data() {
      return {
        userImg: require('../src/assets/image/user.jpg'),
        // 总计卡片
        countData: [{
            name: "今日支付订单",
            value: 1234,
            icon: "success",
            color: "#2ec7c9"
          },
          {
            name: "今日收藏订单",
            value: 210,
            icon: "star-on",
            color: "#ffb980"
          },
          {
            name: "今日未支付订单",
            value: 1234,
            icon: "s-goods",
            color: "#5ab7e9"
          },
          {
            name: "本月支付订单",
            value: 1234,
            icon: "success",
            color: "#2ec7c9"
          },
          {
            name: "本月收藏订单",
            value: 210,
            icon: "star-on",
            color: "#ffb980"
          },
          {
            name: "本月未支付订单",
            value: 1234,
            icon: "s-goods",
            color: "#5ab7e9"
          },
        ],
        // 从接口处获取数据
        tableData: [],
        echartData: {
          order: {
            xData: [],
            series: []
          },
          user: {
            xData: [],
            series: []
          },
          video: {
            series: []
          }
        },

        // 默认静态数据
        tableLabel: {
          name: "品牌",
          todayBuy: "今日购买",
          monthBuy: "本月购买",
          totalBuy: "总计"
        },
        name: 'Admin',
        access: '超级管理员',
        address: '湖北',
        timenow: '2022-02-22'
      }
    },
    mounted() {
      getData().then(res => {
        console.log('getData被调用并返回响应')
        const {
          code,
          data
        } = res.data
        if (code === 20000) {
           // 使用封装组件

          // 销售表
          this.tableData = data.tableData

        // 订单折现图
          const order = data.orderData
          const xData = order.date
          const keyArray = Object.keys(order.data[0])
          const series = []
          keyArray.forEach(key => {
            series.push({
              name: key,
              data: order.data.map(item => item[key]),
              type: 'line'
            })
          })
          this.echartData.order.xData = xData
          this.echartData.order.series = series

        // 用户柱状图
          this.echartData.user.xData = data.userData.map(item => item.date)
          this.echartData.user.series = [{
              name: '新增用户',
              data: data.userData.map(item => item.new),
              type: 'bar'
            },
            {
              name: '活跃用户',
              data: data.userData.map(item => item.active),
              type: 'bar'
            }
          ]
          // 销售饼图
          this.echartData.video.series = [{
            data: data.videoData,
            type: 'pie'
          }]

        }
      })
    },
  }
</script>

<style scoped>
  .el-col {
    margin-top: 20px;
  }

  .num {
    width: 100%;
    height: 125px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    align-content: space-between;
  }

  .numcard {
    width: 230px;
    height: 60px;
  }

  .numcard .icon {
    display: inline-block;
    text-align: center;
    line-height: 55px;
    height: 60px;
    width: 60px;
    margin-right: 10px;
    color: rgb(245, 238, 238);
    font-size: 26px;

  }

  .numcard .detail {
    margin-left: 10px;
    width: 150px;
    height: 60px;
    margin-top: 8px;


  }

  .detail .numsale {
    font: bold italic 20px arial;
    color: #000;
  }

  .detail .txt {
    font-size: 11px;
    margin-top: 5px;
    color: #959597;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }

  .graph {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }


  .user {
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;

  }

  .user img {
    margin-right: 25px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .userinfo {
    margin-bottom: 25px;
  }

  .userinfo .name {
    font-size: 20px;
    color: #070606;
    margin-bottom: 10px;
  }

  .userinfo .access {
    font-size: 14px;
    color: #959597;
  }

  .hrline {
    height: 1px;
    border: none;
    border-top: 1px solid #555;
    margin: 15px 3px;
  }

  .login-info p {
    font-size: 11px;
    color: #59595a;
  }

  .login-info span {
    margin-left: 50px;
  }

  .headerrow {
    font-size: 11px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #555;
  }
</style>