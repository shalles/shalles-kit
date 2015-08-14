# 腾讯地图API功能
init = (() ->
    map = 3;
    new qq.maps.Map(document.getElementById("qq-map"), {
        center: new qq.maps.LatLng(39.916527,116.397128)
    });
)();

init && console.log(init);