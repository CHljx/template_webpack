let path =require("path"),
	webpack=require("webpack"),
    htmlWebpackPlugin=require("html-webpack-plugin"),
    openBrowserPlugin =require("open-browser-webpack-plugin"),
    extractTextWebpackPlugin=require("extract-text-webpack-plugin"),
    fs=require("fs");

var viewPath=path.resolve(__dirname,"..","src/view"),
    files=fs.readdirSync(viewPath,"utf-8"),
    plugins=[];
files.forEach(function(file){
    var stats=fs.statSync(path.resolve(viewPath,file));
    if(stats.isFile()){
        plugins.push(
            new htmlWebpackPlugin({
                template:path.resolve(viewPath,file),
                filename:file
            })
        )
    }
});
plugins.push(new webpack.DefinePlugin({
}))
plugins.push(new openBrowserPlugin({
    url:"http://localhost:8888"
}))
plugins.push(new extractTextWebpackPlugin("asset/css/index.min.css"))
module.exports={
    entry:{
        index:"./src/js/entry.js"
    },
    output:{
        path:path.resolve(__dirname,"..","dest"),
        filename: "asset/js/[name].min.js"
    },
    devtool:"cheap-source-map",
    module:{
        rules:[
            {
                test:/\.js$/,
                loaders:"babel-loader"
            },
            {
                test:/\.css$/,
                use: extractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!postcss-loader"
                })
            },
            {
                test:/\.less$/,
                use: extractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!postcss-loader!less-loader"
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test:/\.html$/,
                loader:"html-loader"
            }
        ]
    },
    plugins: plugins,
    devServer:{
        inline:true,
        port:8888
    },
    resolve:{
        extensions: [ '.js'],
		alias:{
			"@css":path.resolve(__dirname,"..","src/css"),
			"@js":path.resolve(__dirname,"..","src/js"),
			"@view":path.resolve(__dirname,"..","src/view"),
		}
    }
}