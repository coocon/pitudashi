import './scss/app.scss';

function isPC(UA) {
    UA = UA || '';
    var agents = ['Android', 'iPhone', 'SymbianOS', 'Mobile'];
    var flag = true;
    for (let v = 0; v < agents.length; v++) {
        if (UA.indexOf(agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

(function(){
    var isInPC = isPC(navigator.userAgent);
    var url = location.href;
    if (!isInPC && url.indexOf('mobile.html') === -1) {
        location.href = './mobile.html';
    }

})();
