import Home from "@/redux/components/home";
import menuMapToComponent from "./menuMapToComponent";

export const calendarMenuUrl = "/layout/calendar";

export const menus = [
    { path: '/layout/home', title: '首页', icon: 'home', level: 1, value: 'Home' },
    { path: calendarMenuUrl, title: '日程安排', icon: 'calendar', level: 1, value: 'calendars' },
    {
        path: '/layout/table/main', title: '表格', icon: 'table', level: 1, value: 'table',
        children: [
            { path: '/layout/table/list', title: '基础表格', icon: "table", value: 'basicTableComp' },
            { path: '/layout/table/edit', title: '表格编辑', icon: "table"  },
            { path: '/layout/table/dynamic', title: '动态列表格' , icon: "table" },
        ],
    }
]

export const routes = [
    { path: '/layout/home',  exact:true, component: Home, value: 'Home',  title: '首页'},
    { path: '/layout/error/404', component: menuMapToComponent['error404'], value: '404', title: '404'},
    { path: calendarMenuUrl, component: menuMapToComponent['calendars'], value: 'calendars', title: '日程安排' },
    { path: '/layout/table/main',  component: null, value: 'table', title: '表格' },
    { path: '/layout/table/list', component: menuMapToComponent['basicTableComp'], value: 'basicTableComp', title: '基础表格' }
]

