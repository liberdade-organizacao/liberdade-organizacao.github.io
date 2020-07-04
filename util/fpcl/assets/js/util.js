/**
 * sets cookie
 * @param name cookie key
 * @param value cookie value
 * @param days cookie expiration time
 */
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

/**
 * gets cookie
 * @param name cookie key
 * @returns cookie value
 */
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

/**
 * erases cookie
 * @param name cookie key
 */
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}

/**
 * Returns an array containing the [x, y] dimensions of the window
 */
function getWindowSize() {
    var win = window,
        doc = document,
        docElem = doc.documentElement,
        body = doc.getElementsByTagName('body')[0],
        x = win.innerWidth || docElem.clientWidth || body.clientWidth,
        y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
    return [x, y];
}


/**
 * Get a paramter from an URL
 * @param param the desired URL parameter
 * @returns an empty string if there is no parameter or
 *          the value that is associated with the key
 */
function getUrlParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}


/**
 * Used to setup the main function
 */
function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}
