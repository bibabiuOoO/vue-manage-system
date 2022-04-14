<template>
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="login-container">
        <h3 class="login-title">系统登录</h3>

        <el-form-item label="用户名" label-width="80px" prop="username" class="username">
            <el-input type="input" v-model="form.username" auto-complete="off" placeholder="请输入账号"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="80px" prop="password" class="password">
            <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form class="login-submit">
            <el-button type="primary" @click="login" class="login-submit">
                登录
            </el-button>
        </el-form>
    </el-form>
</template>

<script>
    // import Mock from 'mockjs'
    // 引入接口调用
    import {
        getMenu
    } from '../api/data'
    export default {
        name: 'Login',
        data() {
            return {
                form: {},
                rules: {
                    username: [{
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            message: '用户名长度不能小于3',
                            trigger: 'blur'
                        }
                    ],
                    password: [{
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            message: '请输入密码',
                            trigger: 'blur'
                        }
                    ],
                }
            }
        },
        methods: {
            login() {
                console.log('正在login')
                getMenu(this.form).then(
                    // 调用接口时会获得一个回调函数,其中res为响应返回数据
                    // (此处结构赋值,应为需要的是响应数据当中的data,因此为data其起别名res)
                    ({data:res}) => {
                        console.log('返回响应')
                        if (res.code === 20000) {
                            // 接口调用成功之后菜单权限的处理
                            // 使用动态添加路由的方式
                            this.$store.commit('tab/clearMenu')
                            this.$store.commit('tab/setMenu', res.data.menu)
                            this.$store.commit('user/setToken', res.data.token)
                            this.$store.commit('tab/addMenu', this.$router)
                            this.$router.push({
                                name: 'home'
                            })
                        } else {
                            this.$message.warning(res.message)
                        }
                    }
                )
                // const token = Mock.random.guid()
                // this.$store.commit('user/setToken', token)
                // this.$router.push({
                //     name: 'home'
                // })
                // console.log('调用成功')
            }
        }
    }
</script>

<style lang="less" scoped>
    .login-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .login-title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .login-submit {
        margin: 10px;
        text-align: center;
    }
</style>