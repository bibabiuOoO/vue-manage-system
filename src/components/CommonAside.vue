<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <h3>{{isCollapse ? '后台':'通用后台管理系统'}}</h3>

        <el-menu-item v-for="item in noChildren" :index="item.path+''" :key="item.path" @click="clickMenu(item)">
            <i :class="'el-icon-'+item.icon"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>

        <el-submenu  v-for="item in hasChildren" :index="item.path+''" :key="item.path">
            <template slot="title">
                <i :class="'el-icon-'+item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path">
                <!-- <span slot="title" >{{subItem.name}}</span> -->
                <el-menu-item :index="subIndex+''" @click="clickMenu(subItem)">{{subItem.label}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

    </el-menu>
</template>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .el-menu {
        height: 100%;
        border: none;
    }

    .el-menu h3 {
        text-align: center;
        color: #fff;
        line-height: 48px;
        font-size: 16px;
    }
</style>

<script>
    export default {
        data() {
            return {
                menu: []
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            clickMenu(item) {
                this.$router.push({
                    name: item.name
                })
                this.$store.commit('tab/selectMenu', item)
            }
        },
        computed: {
            noChildren() {
                return this.asyncMenu.filter(item =>
                    !item.children
                )
            },
            hasChildren() {
                return this.asyncMenu.filter(item =>
                    item.children
                )
            },
            isCollapse() {
                return this.$store.state.tab.isCollapse
            },
            asyncMenu(){
                return this.$store.state.tab.menu
            }
        }
        
    }
</script>