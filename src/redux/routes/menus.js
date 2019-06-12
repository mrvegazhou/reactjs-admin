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
            { path: '/layout/table/edit', title: '表格编辑', icon: "table", value: 'editTableComp'  },
            { path: '/layout/table/tableDemo', title: '动态列表格' , icon: "table", value: 'tableDemo' },
        ],
    }
]

export const routes = [
    { path: '/layout/home',  exact:true, component: menuMapToComponent['home'], value: 'Home',  title: '首页'},
    { path: '/layout/error/404', component: menuMapToComponent['error404'], value: '404', title: '404'},
    { path: "/layout/calendar", component: menuMapToComponent['calendars'], value: 'calendars', title: '日程安排' },
    { path: '/layout/table/list',  component: menuMapToComponent['basicTableComp'], value: 'table', title: '表格' },
    { path: '/layout/table/tableDemo', component: menuMapToComponent['tableDemo'], value: 'tableDemo', title: '动态列表格' }
]

