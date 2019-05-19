
const deleteToken = ()=> dispatch=>{
    localStorage.removeItem('token')
    dispatch({
        type: DELETE_TOKEN
    })
    message.success('已退出登录')
    window.location = '#/login'
}

export {
    deleteToken
}