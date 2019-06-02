import Home from "@/redux/components/home";
import TableList from "@/redux/views/tables";
import Error404 from "@/redux/components/error/404";
import Calendars from "@/redux/components/calender";
import BasicTableComp from "@/redux/components/tables/basicTable";

export const calendarMenuUrl = "/layout/calendar";

export const menus = [
    { path: '/layout/home', title: '首页', icon: 'home' },
    { path: calendarMenuUrl, title: '日程安排', icon: 'calendar' },
    {
        path: '/layout/table/main', title: '表格', icon: 'table',
        children: [
            { path: '/layout/table/list', title: '基础表格', icon: "table" },
            { path: '/layout/table/edit', title: '表格编辑', icon: "table"  },
            { path: '/layout/table/dynamic', title: '动态列表格' , icon: "table" },
        ],
    }
]

export const routes = [
    { path: '/layout/home',  exact:true, component: Home, value: 'Home' },
    { path: '/layout/error/404', component: Error404, value: '404'},
    { path: calendarMenuUrl, component: Calendars, value: '日程安排' },
    { path: '/layout/table/main',  component: null, value: '表格' },
    { path: '/layout/table/list', component: BasicTableComp, value: '基础表格' }
]

