import Home from "@/redux/components/home";
import menuMapToComponent from "./menuMapToComponent";

export const calendarMenuUrl = "/layout/calendar";

export const menus = [
    { path: '/layout/home', title: '首页', icon: 'home', level: 1, value: 'home' },
    { path: calendarMenuUrl, title: '日程安排', icon: 'calendar', level: 1, value: 'calendars' },
    {
        path: '', title: '表格', icon: 'table', level: 1, value: 'mainTable',
        children: [
            { path: '/layout/table/list', title: '基础表格', icon: "table", value: 'tableDemo' }
        ]
    },
    {
        path: '', title: '员工', icon: 'user', level: 1, value: 'mainUser',
        children: [
            { path: '/layout/user/profile', title: '用户信息', icon: 'user', value: 'userProfile' }
        ]
    }
]

export const routes = [
    { path: '/layout/home',  component: menuMapToComponent['home'], value: 'home',  title: '首页'},
    { path: '/layout/error/404', component: menuMapToComponent['error404'], value: '404', title: '404'},
    { path: "/layout/calendar", component: menuMapToComponent['calendars'], value: 'calendars', title: '日程安排' },
    { path: '/layout/table/list',  component: menuMapToComponent['tableDemo'], value: 'tableDemo', title: '表格' },
    { path: '/layout/user/profile', component: menuMapToComponent['userProfile'], value: 'userProfile', title: '用户信息'}
]

