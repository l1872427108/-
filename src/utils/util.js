export function param2Obj (url) {
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ');
    if (!search) {
      return {};
    }
    const obj = {};
    const searchArr = search.split('&');
    searchArr.forEach(v => {
      const index = v.indexOf('=');
      if (index !== -1) {
        const name = v.substring(0, index);
        const val = v.substring(index + 1, v.length);
        obj[name] = val;
      }
    });
    return obj;
}

/**
 * 动态插入 css
 */

export const loadStyle = (url) => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
};

/**
 * 动态删除 css
 */
export const removeCss = (href) => {
    const links = document.getElementsByTagName('link');
    for (let i = links.length ; i >= 0 ; i--) {
        const link = links[i];
        if (link && link.getAttribute('href') && link.getAttribute('href') === href) {
          link.parentNode.removeChild(link);
        }
    }
};


/**
 * 判断屏幕
 */
export const getScreen = () => {
    let width = document.body.clientWidth;
    if(width >= 1200) {
        return 3; // 大
    } else if (width >= 992) {
        return 2; //  中
    } else if (width >= 768) {
        return 1;  // 小
    } 
    return 0;  // 超小
};


/**
 * 表单序列化
 */
export const serialize = data => {
    let list = [];
    Object.keys(data).forEach(ele => {
        list.push(`${ele}=${data[ele]}`);
    });
    return list.join('&');
};

/**
 * 获取数据类型
 */
export const getObjType = obj => {
    let toString = Object.prototype.toString;
    let map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    if(obj instanceof Element) {
        return 'element';
    }
    return map[toString.call(obj)];
};

/**
 * 对象深拷贝
 */
export const deepClone = data => {
    let type = getObjType(data);
    let obj;
    if(type === 'array') {
        obj = [];
    } else if (type === 'object') {
        obj = {};
    } else {
        return data;
    }
    if(type === 'array') {
        for(let i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]));
        }
    } else if (type === 'object') {
        for(let key in data) {
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
};

export const fullscreenEnable = () => {
    let isFullscreen = document.isFullscreen || document.mozIsFullScreen || document.webkitIsFullScreen;
    return isFullscreen;
};

/**
 * 判断是否全屏
 */
export const fullscreen = () => {
    if(fullscreenEnable()) {
        exitFullScreen();
    } else {
        reqFullScreen();
    }
};

export const exitFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.exitFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.mozCancelFullScreen();
    }
};

export const reqFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    }
};

/**
 * esc监听全屏
 */
export const listenerfullscreen = (callback) => {
    function listen () {
        callback();
    }

    document.addEventListener("fullscreenchange", function () {
        listen();
    });
    document.addEventListener("mozfullscreenchange", function () {
        listen();
    });
    document.addEventListener("webkitfullscreenchange", function () {
        listen();
    });
    document.addEventListener("msfullscreenchange", function () {
        listen();
    });
};