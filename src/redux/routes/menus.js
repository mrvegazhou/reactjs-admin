import Home from "@/redux/components/home";
import TableList from "@/redux/views/tables";
import Error404 from "@/redux/components/error/404";

export const menus = [
    { path: '/home', title: '首页', icon: 'home' },
    {
        path: '/table', title: '表格', icon: 'copy',
        children: [
            { path: '/list', title: '基础表格' },
            { path: '/table/edit', title: '表格编辑' },
            { path: '/table/dynamic', title: '动态列表格' },
        ],
    }
]

export const routes = [
    { path: '/home', component: Home },
    { path: '/list', component: TableList},
    { path: '/error/404', component: Error404},
]