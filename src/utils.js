const doc = document;
let _isReady = false;
let _readyList = [];

// 判断初始化是否完成
export const ready = (fn) => {
    if (_isReady) {
        return fn && fn();
    }

    if (!doc.body) {
        fn && _readyList.push(fn);
        return setTimeout(function () {
            ready();
        });
    }

    var _list = _readyList;
    _isReady = true;
    for (var i = 0, l = _list.length; i < l; i++) {
        _list[i]();
    }
    fn && fn();
    _list.length = 0;
};
