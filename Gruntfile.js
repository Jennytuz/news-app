module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //代码合并
        // concat: {

        //     options: {
        //         separator: ';'
        //     },
        //     dist: {
        //         src: ['src/*.js'],
        //         dest: 'build/build.js'
        //     }
        // },
        concat: {
            foo: {
                files: [
                    { src: ['public/javascripts/list.js','public/lib/template.js'], dest: 'public/build/list.js' },
                    { src: ['public/javascripts/index.js', 'public/lib/template.js'], dest: 'public/build/index.js' },
                    { src: ['public/javascripts/alert.js', 'public/javascripts/add.js', 'public/lib/validate_form.js', 'public/lib/kindeditor-4.1.10/lang/zh_CN.js', 'public/lib/kindeditor-4.1.10/kindeditor.js'],dest:'public/build/add.js'}
                ]
            }

        },
        uglify: {
            options: {
                //此处定义的banner注释将插入到输出文件的顶部
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
                //是否生成min.js.map
                sourceMap: true,
                footer: '\n/*这个一个grunt的demo，在压缩后的底部*/'
            },
            dist: {
                //此处对多个js文件进行压缩 用数组表示
                //对象数组的第一个参数是压缩后的文件名 第二个参数是需要压缩的文件名
                files: [{ 'public/build/list.min.js': 'public/build/list.js' },
                    { 'public/build/index.min.js': 'public/build/index.js' },
                    { 'public/build/add.min.js': 'public/build/add.js'}]
                // files: {
                //     'build/build.min.js': 'build/build.js'
                // }
                // src:['build/build.js'],
                // dest:'build/build.min.js'
            }
        },
        jshint: {
            //需要测试的代码
            files: ['Gruntfile.js', 'src/*.js'],
            options: {
                // 循环或者条件语句必须用花括号包围
                curly: true,
                // 兼容低级浏览器 用var而不是let
                es3: false,
                //禁止重写原生对象的原型 如Date Array
                freeze: true,
                //禁止定义之前使用变量
                latedef: "nofunc",
                //构造器函数首字母大写
                newcap: true,
                // 为true时 禁止单引号和双引号混用
                "quotmark": false,
                // 变量未定义
                "undef": false,
                //变量未使用
                "unused": false,
                // 代码中使用的一些第三方插件
                globals: {
                    jQuery: true,
                    module: true
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    // 目标文件 : 源文件数组
                    'public/build/css/build.css': ['public/stylesheets/style.css', 'public/stylesheets/alert.css','public/stylesheets/confirm.css']
                }
            }
            
        },
        watch: {
            scripts: {
                files: ['Gruntfile.js','package.json','public/javascripts/*.js','public/lib/*.js','src/css/*.css'],
                tasks: ['default']
            }
        }
    });
    //注册一个代码测试的任务 放在合并之前
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //注册一个合并代码的任务
    grunt.loadNpmTasks('grunt-contrib-concat');
    //对代码进行压缩
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-watch');
    // 默认被执行的任务列表
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'watch']);

};