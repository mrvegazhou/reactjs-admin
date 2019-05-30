import Home from "@/redux/components/home";
import TableList from "@/redux/views/tables";
import Error404 from "@/redux/components/error/404";
import Calendars from "@/redux/components/calender";
export const menus = [
    { path: '/layout/home', title: '首页', icon: 'home' },
    { path: '/layout/calendar', title: '日程安排', icon: 'calendar' },
    {
        path: '/layout/list', title: '表格', icon: 'copy',
        children: [
            { path: '/layout/list', title: '基础表格' },
            { path: '/layout/table/edit', title: '表格编辑' },
            { path: '/layout/table/dynamic', title: '动态列表格' },
        ],
    }
]

export const routes = [
    { path: '/layout/home', component: Home, value: 'Home' },
    { path: '/layout/home',  exact:true, component: Home, value: 'Home' },
    { path: '/layout/list', component: TableList, value: '列表'},
    { path: '/layout/error/404', component: Error404, value: '404'},
    { path: '/layout/calendar', component: Calendars, value: '日程安排' }
]