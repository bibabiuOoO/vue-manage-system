<template>
    <el-header>
        <div class="l-content">
            <el-button plain icon="el-icon-menu" @click="handleMenu"></el-button>
            <!-- 面包屑组件 -->
            <el-breadcrumb separator=">">
            <!-- 组件中的to相当于路由跳转的to -->
                <el-breadcrumb-item v-for="tab in tabList" :key="tab.path" :to="{ path: tab.path }">{{tab.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" szie="mini">
                <span>
                    <img class="user" :src="userImg">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script>
    // 通过mapState快捷生成处理数据
import { mapState } from 'vuex'
    export default {
        name: 'CommonHeader',
        data() {
            return {
                userImg: require('../assets/image/user.jpg')
            }
        },
        methods: {
            handleMenu() {
                this.$store.commit('Tab/isCollapseMenu')
            }
        },
        computed: {
            ...mapState('Tab',['tabList'])
        }
    }
</script>

<style scoped>
    .r-content .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .el-header {
        display: flex;
        height: 100%;
        justify-content: space-between;
        align-items: center;
    }

    .l-content {
        display: flex;
        align-items: center;
    }

    .l-content h3 {
        color: #fff;
        font-size: 12px;
        font-family: 'Courier New', Courier, monospace;
    }

    .l-content .el-button {
        margin-right: 20px;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>