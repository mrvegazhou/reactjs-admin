import * as type from '@/modules/constants/actionTypes'

// 改变左侧菜单栏宽度（是否显示）
const changeIsMobile = playload => ({
    type: type.CHANGE_ISMOBILE,
    playload
})

// 改变左侧菜单栏宽度（展开或者收缩）
const changeCollapsed = playload => ({
    type: type.CHANGE_COLLAPSED,
    playload
})

export {
    changeIsMobile,
    changeCollapsed
}
