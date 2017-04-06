/*__dirname 是nodejs中的一个全局变量，它指向当前执行脚本所在的目录*/
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',//有四种配置方式，由慢到快，也是由好到差

    //entry: __dirname + "/app/main.js",//唯一的入口文件
    entry: {
        admin: __dirname + "/static/admin/index.js",
        index: __dirname + "/static/index/index.js",
    },
    output: {
        path: __dirname + "/build",//打包之后存放的地方
        filename: "/static/js/[name].js" //打包输出文件的文件名称
    },

    module: {
        loaders: [
            {
                test: /\.json$/, 
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel' //在webpack的module部分的loaders里进行配置即可
            },
            {
                test: /\.ejs$/,
                loader: 'ejs'
            },
            {
                test: /\.css$/,
                /*在后面加了一个modules*/
                // loader: 'style!css?modules!postcss'//添加对样式表的处理，感叹号的作用在于同一文件能够使用不同类型的loader
                loader: ExtractTextPlugin.extract("style-loader","css-loader")
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url-loader?limit=10000',
            },
            {
                test: /\.tpl$/,
                loader: 'art-template'
            },
            /*fonts*/
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }

        ]
    },

    /*实现css自动添加前缀的方法*/
    post: [
        require('autoprefixer')
    ],

    resolve: {
        alias: {
            jquery: __dirname + '/static/common/jquery'
        }
    },

    /*实现自动输出index.html并自动添加js文件并输出*/
    plugins: [
        new webpack.ProvidePlugin({
            _: "underscore",
            $: "jquery"
        }),
        new ExtractTextPlugin("static/css/[name].css"),
        new  webpack.optimize.CommonsChunkPlugin('jquery.js',['jquery']),
        new HtmlWebpackPlugin({
            chunks: [
                'index',
            ],
            filename: 'index.html',
            template: __dirname + "/page/index.tmpl.html" //new这个插件的实例并传入相关参数
        }),
        /*new HtmlWebpackPlugin({
            chunks: [
                'admin',
            ],
            filename: 'admin.html',
            template: __dirname + "/page/admin.tmpl.html" //new这个插件的实例并传入相关参数
        }),*/
        new HtmlWebpackPlugin({
            chunks: [
                'admin',
            ],
            filename: 'admin.html',
            // template: __dirname + "/page/admin.tmpl.html" //new这个插件的实例并传入相关参数
            template: 'page/admin.js',
            hash: true
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
         new CopyWebpackPlugin([
             {
                from: './static/common/lib/jquery.js',
                to: './build/static/lib/jquery.js',
            }])
    ],

    /*配置webpack-dev-server服务的设置*/
    devServer: {
        contentBase: "./public", //本地所有服务器所加载的页面所在目录
        colors: true,//终端输出的结果为彩色
        historyApiFallback: true, //不跳转，使用单页所有跳转都基于index.html
        inline: true //实时刷新
    }
}
