let path =require("path"),
	webpack=require("webpack"),
    htmlWebpackPlugin=require("html-webpack-plugin"),
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
                filename:file,
				minify:false
            })
        )
    }
});
plugins.push(new extractTextWebpackPlugin("asset/css/index.min.css"));
plugins.push(new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
}))
module.exports={
    entry:{
        index:"./src/js/entry.js"
    },
    output:{
        path:path.resolve(__dirname,"..","dist"),
        filename: "asset/js/[name].min.js"
    },
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
        port:8090
    },
    resolve:{
        extensions: [ '.js']
    }
}