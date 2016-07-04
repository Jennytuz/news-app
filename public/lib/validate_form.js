//////验证插件 需要使用bootstrap的样式
var ValidateForm = function() {
    this.hasErr = false;
    /*****
     *隐藏页面中的所有错误提示
     * */
    this.allHelpTips = document.querySelectorAll('.help-block');
    for (var i = 0; i < this.allHelpTips.length; i++) {
        var helpTip = this.allHelpTips[i];
        helpTip.style.display = 'none';
    }


    /****
     *页面中所有的需要验证的input
     * *****/
    this.allInputs = document.querySelectorAll('.required');
}
ValidateForm.prototype = {
    ////返回true验证通过 false验证失败
    doValidate: function() {
        for (var i = 0; i < this.allInputs.length; i++) {
            var input = this.allInputs[i];
            //input.addEventListener('blur', validateInput); ////光标移开时验证控件输入
            doEachValidate(input);
        }

        // function validateInput(event) {
        //     var target = event.target;
        //     doValidate(target);
        // }

        /**
         * 验证标签输入是否合法
         * @param  {[type]} target 标签
         * @return {[type]}        返回true和false
         */
        function doEachValidate(target) {
            var value = target.value.trim();
            if (!!!value) {
                showErr(target);
                //this.hasErr = true;
            }
            else{
                hideErr(target);
            }           
            //this.hasErr = false;
        }


        /**
         * 隐藏错误提示
         * @return {[type]} [description]
         */
        function hideErr(target) {
            ////寻找上一级的上一级 添加has-error样式
            target.parentElement.parentElement.classList.remove('has-error');
            ////设置提示文字显示
            target.nextElementSibling.nextElementSibling.style.display = 'none';
        }

        /**
         * 显示错误提示
         * @return {[type]} [description]
         */
        function showErr(target) {
            target.parentElement.parentElement.classList.add('has-error');
            target.nextElementSibling.nextElementSibling.style.display = 'block';
        }

        // for (var i = 0; i < this.allInputs.length; i++) {
        //     if (!doValidate(this.allInputs[i])) {
        //         this.hasErr = true;
        //         break;
        //     }
        // }
        if(document.querySelectorAll('.has-error').length>0){
            this.hasErr = true;
        }
        else{
            this.hasErr = false;
        }
        if (!this.hasErr) {
            //alert('提交成功')
            return true;
        } else {
            // event.preventDefault();
            return false;
        }
    }
}
