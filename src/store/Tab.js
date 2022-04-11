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
        currentMenu:null
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
        }
    }
}