export const menus = [
    { path: '/dashboard', title: '首页', icon: 'home' },
    {
        path: '/table', title: '表格', icon: 'copy',
        children: [
            { path: '/table/basic', title: '基础表格' },
            { path: '/table/edit', title: '表格编辑' },
            { path: '/table/dynamic', title: '动态列表格' },
        ],
    }
]

export const routes = [
    { path: '/dashboard', component: Dashboard }
]