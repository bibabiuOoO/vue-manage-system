<template>
    <div class="tags">
        <!-- 逻辑根据顶部的tabList来即可 -->
        <!-- effect即可动态实现当前路由组件对应的tag高亮 -->
        <el-tag size="small" :closable="tag.name !== 'home'" :effect="$route.name === tag.name ? 'dark' : 'plain'"
            @click="changeMenu(tag)" @close="handleClose(tag,index)" v-for="(tag,index) in tabList" :key="tag.name">
            {{tag.label}}
        </el-tag>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    export default {
        name: 'CommonTag',
        data() {
            return {

            }
        },
        methods: {
            changeMenu(tag) {
                this.$router.push({
                    name: tag.name
                })
            },
            handleClose(tag, index) {
                // index+1位置的路由
                // 删除index的路由时同时跳转到index+1路由
                // 需要进行边界判断
                if (tag.name === this.$route.name) {
                    if (index === this.tabList.length - 1) {
                        this.$router.push({
                            name: 'home'
                        })
                    } else {
                        const nextTag = this.tabList[index + 1]
                        this.$router.push({
                            name: nextTag.name
                        })
                    }
                }
                this.$store.commit('tab/deleteTag', index)
            }
        },
        computed: {
            ...mapState('tab', ['tabList'])
        }
    }
</script>

<style lang="less" scoped>
    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
</style>