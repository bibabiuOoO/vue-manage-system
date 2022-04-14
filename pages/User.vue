<template>
  <!-- 通过form表单实现 -->
  <div class="manage">
    <!-- 设置弹窗 -->
    <el-dialog :title="operateType === 'add' ? '添加用户':'更新用户'" :visible.sync="isShow">
      <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form">
      </common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form :formLabel="formLabel" :form="searchForm" :inline="true" ref="form">
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>

    <!-- 通过自定义事件实现父子组件之间的数据传递 -->
    <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @change="getList()" @edit="editUser"
      @delete="deleteUser">
    </common-table>
  </div>
</template>

<script>
  import CommonForm from '../src/components/CommonForm.vue'
  import CommonTable from '../src/components/CommonTable.vue'
  // 接口引入
  import {
    getUser
  } from '../api/data'
  export default {
    name: 'User',
    components: {
      CommonForm,
      CommonTable
    },
    data() {
      return {
        operateType: 'add',
        isShow: false,
        operateFormLabel: [{
            model: " name",
            label: "姓名",
            type: "input",
          }, {
            model: "age",
            label: "年龄",
            type: "input",
          }, {
            model: "sex",
            label: "性别",
            type: "select",
            opts: [{
              label: "男",
              value: 1,
            }, {
              label: "女",
              value: 0,
            }, ],
          },
          {
            model: "birth",
            label: "出生日期",
            type: "date",
          }, {
            model: "addr",
            label: "地址",
            type: "input",
          }
        ],
        operateForm: {
          name: "",
          addr: "",
          age: "",
          birth: "",
          sex: "",
        },
        formLabel: [{
          model: "keyword",
          label: '',
          type: 'input'
        }, ],
        searchForm: {
          keyword: ''
        },
        tableLabel: [{
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'age',
            label: '年龄'
          },
          {
            prop: 'sex',
            label: '性别'
          },
          {
            prop: 'birth',
            label: '出生日期',
            width: 200
          },
          {
            prop: 'addr',
            label: '地址',
            width: 200
          },
        ],
        config: {
          page: 1,
          total: 100,
          loading: false
        },
        tableData: []
      }
    },
    methods: {
      confirm() {
        if (this.operateType === 'edit') {
          this.$http.post('/user/edit', this.operateForm).then(res => {
            console.log(res)
            this.isShow = false
            this.getList()
          })
        } else {
          this.$http.post('/user/add', this.operateForm).then(res => {
            console.log(res)
            this.isShow = false
            this.getList()
          })
        }
      },

      // 会弹出窗口以及默认属性,随后调用confirm方法
      addUser() {
        this.isShow = true
        this.operateType = 'add'
        this.operateForm = {
          name: "",
          addr: "",
          age: "",
          birth: "",
          sex: "",
        };
      },
      editUser(row) {
        this.operateType = 'edit'
        this.isShow = true
        this.operateForm = row
      },
      deleteUser(row) {
        this.$confirm('此操作将删除该信息', '提示', {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          const id = row.id
          this.$http.post("/user/delete", {
            params: {
              id
            }
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          })
        })
      },
      // 接口调用怎么李洁
      getList(name = '') {
        this.config.loading = true
        name ? (this.config.page = 1) : ''
        console.log('getList被调用')

        getUser({
          page: this.config.page,
          name
        }).then(({
          data: res
        }) => {
          console.log(res)
          console.log('getUser调用')
          this.tableData = res.list.map(item => {
            item.sexLabel = item.sex === 0 ? "女" : "男"
            return item
          })
          this.config.total = res.count
          this.config.loading = false
        })
      }
    },
    created() {
      this.getList()
    }
  };
</script>

<style lang="less" scoped>
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>