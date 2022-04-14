import Cookie from 'js-cookie'

export default {
    namespaced:true,
    state:{
        isCollapse:false,
        tabList:[{
            path:'/home',
            name:'home',
            label:'首页',
            icon:'home'
        }],
        currentMenu:null,
        menu:[]
    },
    mutations:{
        isCollapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state,val){
            // 判断是否是首页tab
            if(val.name !== 'home'){
                state.currentMenu = val
                // 判断tab中是否存在
                const result = state.tabList.findIndex(item => item.name === val.name)
                if (result === -1){
                    state.tabList.push(val)
                }
            }else{
                // ??
                state.currentMenu = null
            }
        },
        deleteTag(state,tagIndex){
            // 删除即可,直接通过数据监视watch重新渲染
            state.tabList.splice(tagIndex,1)
        },
        setMenu(state,val){
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))
        },
        clearMenu(state){
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state,router){
            if(!Cookie.get('menu')){
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item => {
                        // 模板字符串
                        item.component = () => import(`../../pages/${item.url}`)
                        return item
                    })
                    // 如果是有二级菜单,将其转为一维数组在存入
                    menuArray.push(...item.children)
                    
                }else{
                    item.component = () => import(`../../pages/${item.url}`)
                    menuArray.push(item)
                }
            });
            // 路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main',item)
            });
            // 添加之后,跳转login进行接口调用实现登录判断处理
        }
    }

}