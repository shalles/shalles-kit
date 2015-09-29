//参考： http://blog.csdn.net/junfeng120125/article/details/9966857
var transform = (function(){
    var pi = 3.14159265358979323846;
    var a = 6378245.0;
    var ee = 0.00669342162296594323;

    function transform(wgLat, wgLng) {
        if (outOfBoundary(wgLat, wgLng)) {
            return [wgLat, wgLng];
        }
        var dLat = transformLat(wgLng - 105.0, wgLat - 35.0),
            dLng = transformLng(wgLng - 105.0, wgLat - 35.0),
            radLat = wgLat / 180.0 * pi,
            magic = Math.sin(radLat),
            sqrtMagic;

        magic = 1 - ee * magic * magic;

        sqrtMagic = Math.sqrt(magic);

        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
        dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);

        return [wgLat + dLat, wgLng + dLng];
    }

    function outOfBoundary(lat, Lng) {
        if (Lng < 72.004 || Lng > 137.8347)
            return true;
        if (lat < 0.8293 || lat > 55.8271)
            return true;
        return false;
    }

    function transformLat(x, y) {
        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
        return ret;
    }

    function transformLng(x, y) {
        var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
        return ret;
    }

    return transform;
})()