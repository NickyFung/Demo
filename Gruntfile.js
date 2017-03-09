module.exports = function (grunt) {
    // 项目配置
    grunt.initConfig({
        //定义常量
        pkg: grunt.file.readJSON('package.json'),
        //定义目录路径常量，dist最终生成目录,image压缩源目录
        paths: {tmp: '.tmp', dist: 'dist', image: 'src/img'},

        //uglify插件的配置信息(js压缩插件)
        uglify: {
            //公共属性
            options: {
                //false不混淆变量名,true混淆
                mangle: true,
                //Default: 'min',Choices: 'none', 'min', 'gzip'，输出压缩率
                report: 'min',
                //允许生成的压缩文件带banner
                stripBanners: true,
                // banner: '/*! <%= pkg.name%>-<%= pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                //添加footer
                // footer: '\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            // //任务一
            // build: {
            //     src: 'src/js/test.js',
            //     dest: 'dist/js/<%= pkg.name %>-<%= pkg.version%>.min.js'
            // },
            // //任务二
            // build2:{
            //     //私有属性
            //     options: {
            //         mangle: false,//不混淆变量名
            //     },
            //     files:{
            //         'dist/js/test.min.js': ['src/js/test.js']
            //     }
            // },
            //任务三：按原文件结构压缩js文件夹内所有JS文件
            build3: {
                files: [{
                    expand: true,                                      //展开下面*通配符匹配的文件
                    cwd: 'src/js',                                    //源文件根目录
                    src: ['**/*.js', '!*.min.js'],                  //优化 src/js 目录下所有 js文件，不要做 “!” 指定的文件
                    dest: 'dist/js',                                //输出到此目录下
                    ext: '.min.js'                                  //压缩文件的后缀名
                }]
            }
            //任务四：合并压缩1.js和2.js
            // build4: {
            //     files: {
            //         'dist/js/3.min.js': ['src/js/1/1.js', 'src/js/1/2/2.js']
            //     }
            // }
        },
        //jshint插件的配置信息(js语法规整校验插件)
        jshint: {
            options: {
                jshintrc: '.jshintrc'//用什么规则检查语法
            },
            //build或test1都行，这里是一个自定义名称的task。包括csslint、cssmin也是一样可以自定义，但要符合js语法规则
            // test1: ['Gruntfile.js'],
            // test2: ['src/*.js'],
            // build: ['Gruntfile.js','src/js/*.js'],
            build2: {
                files: [{
                    expand: true,                                      //展开下面*通配符匹配的文件
                    cwd: 'src/js',                                    //源文件根目录
                    src: ['**/*.js', '!*.min.js'],                 //不要做 “!” 指定的文件
                }]
            }
        },
        //csslint插件的配置信息(css语法规整校验插件)
        csslint: {
            options: {
                csslint: '.csslint'//用什么规则检查语法
            },
            build: ['src/css/*.css']
        },
        //css压缩插件
        cssmin: {
            options: {
                // keepSpecialComments:0,//此选项用来配置是否保留特殊注释，是 clean-css 提供的底层配置选项。
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            //按原文件结构压缩css文件夹内所有css文件
            build: {
                files: [{
                    expand: true,                                       //展开下面*通配符匹配的文件
                    cwd: 'src/css',                                     //源文件根目录
                    src: ['**/*.css', '!*.min.css'],                 //不要做 “!” 指定的文件
                    dest: 'dist/css',                                   //压缩文件的输出目录
                    ext: '.min.css'                                     //压缩文件的后缀名
                }]
            }
        },
        //压缩HTML
        htmlmin: {
            options: {
                removeComments: true,                     //去除html注释
                removeCommentsFromCDATA: true,          //删除<script>和<style>标签中的CDTA区段
                collapseWhitespace: true,                //删除文档树中文本节点的空白。不会影响重大的空白，比如在SCRIPT,STYLE,PRE或TEXTAREA等元素内容。
                collapseBooleanAttributes: true,        //省略布尔属性的值 <input checked="true"/> ==> <input />
                removeAttributeQuotes: true,            //删除属性的引号，当安全的情况下。
                removeRedundantAttributes: true,       //删除多余的属性，像type="text/javascript"。
                useShortDoctype: true,                   //用短的HTML5的<!DOCTYPE html>代替doctype
                removeEmptyAttributes: true,             //删除空（或空白）属性 <input id="" /> ==> <input />
                removeOptionalTags: true,                 //一些元素允许省略标签，像</td>
                // removeEmptyElements:true,                 //删除空元素
                removeScriptTypeAttributes: true,       //删除<script>的type="text/javascript"
                removeStyleLinkTypeAttributes: true,   //删除<style>和<link>的type="text/css"
                minifyJS: true,                             //压缩页面JS
                minifyCSS: true                             //压缩页面CSS
            },
            html: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.html'],
                    dest: 'dist'
                }]
            }
        },
        //  watch插件的配置信息(监控js,css文件,如改变自动压缩,语法检查
        // api文档:http://www.jianshu.com/p/1a05b1e155cb
        watch: {
            options: {
                //使得触发的任务可以共享进程上下文,并且提高速度。这会导致监控任务容易崩溃
                //默认 true。默认会创建一个新的子进程来执行触发的任务
                spawn: false,
                //字符串或者数组，默认为 'all'
                //指定监控目标的特定事件类型，可以为 'all', 'changed', 'added' 和 'deleted'.
                // event: ['added', 'deleted'],
                //这是整数类型的参数，如果同样的文件或者路径被修改，需要等待多长时间才触发事件。默认 500 毫秒。
                // debounceDelay:500
            },
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['jshint', 'uglify']
            },
            css: {
                files: ['src/css/*.css'],
                tasks: ['csslint', 'cssmin']
            },
            html: {
                files: ['src/html/*.html', 'src/*.html'],
                tasks: ['htmlmin'],
                options: {
                    spawn: false
                }
            }
        },
        //清除目录
        clean: {
            // all: ['dist/html/**', 'dist/*.*'],
            // image: 'dist/html/images',
            // css: 'dist/html/css',
            // html: 'dist/html/**/*',
            dist: '<%= paths.dist %>'
        },
        //压缩图片
        imagemin: {
            options: {
                optimizationLevel: 3,               // 默认：3  取值范围：0-7（优化等级）
                progressive: true,                  // 默认：false 无损压缩jpg图片
                interlaced: true,                   //默认：false 隔行扫描gif进行渲染
                svgoPlugins: [{removeViewBox: false}]       //不要移除svg的viewbox属性
                // use: [pngquant()],                 //使用pngquant深度压缩png图片的imagemin插件
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.image %>',
                    src: ['**/*.{png,jpg,jpeg,gif,webp,svg}'],
                    dest: 'dist/img'
                }]
            }
        },
        // 文件合并
        concat: {
            options: {
                banner: '/*! <%= pkg.name%>-<%= pkg.version%>.css <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                separator: ';',               //文件连接分隔符，表示连接的文件用指定的separator分割。
                stripBanners: true          //如果为true，去除代码中的块注释，默认为false
            },
            js: {
                src: ["src/js/*.js", "src/js/**/*.js"],
                dest: "src/js/main.js"
            },
            css: {
                options: {
                    separator: '',
                },
                src: ["src/css/*.css", "src/css/**/*.css"],
                dest: "src/css/main.css"
            }
            //其他写法
            // build: {
            //     files: {
            //         'all.js': ['a.js'],
            //         'all-sec': ['b.js', 'c.js'],
            //     }
            // }
            // dist: {
            //     src: ['a.js', 'b.js', 'c.js'],
            //     dest: 'all.js',
            // }
        },
    });

    //输入那个文件给修改了
    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });


    //  加载jshint检查javascript语法错误
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // 加载提供"uglify"任务的插件,压缩javascript代码
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // 默认任务，告诉grunt当我们在终端中输入grunt命令时需要做些什么（注意先后顺序）
    grunt.registerTask('default', ['clean', 'csslint', 'jshint', 'concat', 'uglify', 'cssmin', 'htmlmin', 'imagemin', 'watch']);
    // grunt.registerTask('load', ['clean', 'default']);
    // grunt.registerTask('default', []);
};