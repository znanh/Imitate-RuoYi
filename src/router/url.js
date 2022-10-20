import data from '../../routes.json'
import Layout from '@/layout'
// const Layout = () => import('@/layout')
// const Dashboard = () => import('@/views/dashboard/index.vue')
const Login = () => import('@/views/login/index')
const NotFound = () => import('@/views/404')
function getChildrenPath (data,First='',parentPath='') {   
    let route = []   
    for (let item of data) { 
        let childArr = []   
         
         const obj = {
            // path: item.path
         }
         if(First){
             obj.component = Layout
             obj.path = item.path
         }else {
             let component = () => import('@/views' + parentPath + item.path + '/index.vue')
            //  console.log('@/views' + parentPath + item.path + '/index.vue');
             
             
             obj.component = component
             obj.path = parentPath + item.path
         }
        //  parentPath ? obj.path = parentPath + item.path : obj.path = item.path
        //  First ? obj.component = Layout : item.
         item.children ? obj.children = childArr : ''
         item.meta ? obj.meta = item.meta : ''
         item.redirect ? obj.redirect = item.redirect : ''
         item.name ? obj.name = item.name : ''
        if(item.children){
            /* for (let child of item.children) {   
                const childItem = {         
                    name: child.name,         
                    meta: child.meta      
                }
                First ? childItem.path = child.path : childItem.path = `${obj.path}/${child.path}`
                if(child.path == 'index'){// 后续这里可能要做修改
                    childItem.component = () => import('@/views' + item.path + '/index.vue')
                }else if(child.path == 'dashboard'){
                    childItem.component = () => import('@/views/' + childItem.path + '/index.vue')
                }else if(child.path.includes('dashboard')){
                    childItem.path = child.path
                } else {                 
                    childItem.component = () => import('@/views' + childItem.path + '/index.vue')
                }
                if(child.children){
                    let allPath
                    parentPath ? allPath = `${parentPath}/${item.path}/${child.path}/` : allPath = `${item.path}/${child.path}/`
                    childItem.children = getChildrenPath(child.children,'',allPath)
                }
                childArr.push(childItem)     
            } */
            for (let child of item.children) {   
                const childItem = {         
                    name: child.name,         
                    meta: child.meta      
                }
                // console.log(obj.path);
                // console.log(child.path);
                
                obj.path == '/' ? childItem.path = child.path : childItem.path = `${obj.path}/${child.path}`
                if(child.path == 'index'){// 后续这里可能要做修改
                    childItem.component = () => import('@/views' + item.path + '/index.vue')
                }else if(child.path == 'dashboard'){
                    // console.log(childItem.path);
                    
                    childItem.component = () => import('@/views/' + childItem.path + '/index.vue')
                    // childItem.component = Dashboard
                    // console.log('@/views/' + childItem.path + '/index.vue');
                    
                }else if(child.path.includes('http')){
                    childItem.path = child.path
                } else {                 
                    childItem.component = () => import('@/views' + childItem.path + '/index.vue')
                }
                if(child.children){
                    let allPath
                    parentPath ? allPath = `${parentPath}/${item.path}/${child.path}/` : allPath = `${item.path}/${child.path}/`
                    childItem.children = getChildrenPath(child.children,'',allPath)
                }
                childArr.push(childItem)     
            }
        }
        route.push(obj)   
    }
    // console.log(route);
    
    return route 
}

const url = [
    ...getChildrenPath(data,'first'),
    {
        path: '/login',
        component: Login,
        hidden: true
    },
    
    {
        path: '/404',
        component: NotFound,
        hidden: true
    },

    { path: '*', redirect: '/404', hidden: true }
]

export default url