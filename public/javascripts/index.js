
function getXHRData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/news/all');
    xhr.send();
    xhr.onreadystatechange = function (eve) {
        if (xhr.readyState == 4) {
            console.log(xhr.response);
            /////返回结果进行格式化处理 生成js对象
            var res = JSON.parse(xhr.response);
            if (res) {

                /////方式一 拼接字符串
                // var str = '';
                // for(var i=0;i<res.length;i++){
                // 	var obj = res[i];
                // 	str += '<li class="list-group-item">';
                // 	str += '<p  class="lead">'+obj.content+'</p>'
                // 	str += '<span class="span-ip">'+obj.ip+'</span>'
                // 	str += '<span class="span-date">'+obj.date+'</span>'
                // 	str += '</li>';
                // }	

                ////方式二
                /////在客户端使用art-template模版
                var html = template('template', { list: res.reverse() });
                console.log(html);

                document.getElementById('newsList').innerHTML = html;//str;
            }
        }
    }
}
getXHRData();
