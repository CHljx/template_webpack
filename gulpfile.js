var gulp=require("gulp"),
	webserver = require('gulp-webserver');

gulp.task("server",function(){
	  gulp.src( './dest/' ) // 服务器目录（./代表根目录）
        .pipe(webserver({ // 运行gulp-webserver
           // livereload: true, // 启用LiveReload
			//root:'./',
		    //host:'ljx.h5.com',
			port:8888,
            open: true // 服务器启动时自动打开网页
        }));
})