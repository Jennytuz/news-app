var options = {
    uploadJson: '/uploadImg'
};

KindEditor.ready(function (K) {
    window.editor = K.create('#editor', options);
});

////实例化验证控件
var validate = new ValidateForm();

var subBtn = document.getElementById('subBtn');
subBtn.onclick = function (event) {
    if (validate.doValidate()) {
        
        // window.location.href = '/list.html';

    }
    else{
        event.preventDefault();
    }
}

//////////文件上传点击
document.getElementById('yl_file_upload').onclick = function(){
    $("#single_image").click(); ////触发input的click事件，打开选择文件界面
}

////html5Uploader 标准配置方法
$("#single_image").html5Uploader({
    name: "Filedata",
    postUrl: "/common/file/uploadfile", ////图片上传的post提交地址
    onSuccess: function (msg) { /////上传成功后的回调函数
        console.log(msg);
        try {
            var url = JSON.parse(msg.currentTarget.response).url;
            $("#m_imgCtrl").attr("src", url); ////指定img控件的src属性
            $("#ImgUrls").val(url); /////服务器端接收时需要获取的标签
        }
        catch (e) {
            console.log(e);
        }
    }
});