# 百度地图API功能
init = (() ->
    new qq.maps.Map(document.getElementById("qq-map"), {
        center: new qq.maps.LatLng(39.916527,116.397128)
    });
)();

init && console.log(init);

# 百度地图API功能
map = new BMap.Map("baidu-map");               # 创建Map实例
point = new BMap.Point(116.404, 39.915);    # 创建点坐标
map.centerAndZoom(point,15);                # 初始化地图,设置中心点坐标和地图级别。
map.addControl(new BMap.ZoomControl());     #添加地图缩放控件
