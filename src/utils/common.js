let common = {

};

//找到对应元素的索引
common.catchIndex = function (arr, key){ //获取INDEX
    arr.map(function (ar, index) {
        if(ar.key === key){
            return index;
        }
    });
    return 0;
}

//替换数组的对应项
common.replace = function (arr, item, place){ //arr 数组,item 数组其中一项, place 替换项
    arr.map(function (ar) {
        if(ar.key === item){
            arr.splice(arr.indexOf(ar),1,place)
        }
    });
    return arr;
}

//数组中是否包含某项
common.isContains = function (arr, item){
    arr.map(function (ar) {
        if(ar === item){
            return true;
        }
    });
    return false;
}

common.urlToList = function (url) {
    const urllist = url.split('/').filter(i => i);
    return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
}

common.openAccesseMenu = function (accesseMenu) {
    let openAccesseMenu = [];
    let forFn = function (menulist, parentName) {
        for (var item of menulist) {
            item.parentName = parentName;
            openAccesseMenu.push(item)
            if (item.children && item.children.length > 0) {
                forFn(item.children, item.name)
            }
        }
    }
    forFn(accesseMenu, '');
    return openAccesseMenu;
}

common.formatDateTime = function (inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};

common.menusToList = function (datas) {
    let arr = [];
    let forFn = function (tmpDatas) {
        tmpDatas.map(function(item){
            if (item.hasOwnProperty('children')) {
                forFn(item.children);
            }
            arr.push(item);
        });
    };
    forFn(datas);
    return arr;
};

export default common;