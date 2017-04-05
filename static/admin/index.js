var indexcss = require("./index.css");
var tmpl = require('./index.tpl');

var data = {
	title: '标签',
	list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
};

var html = tmpl(data);
console.log(html);
document.body.innerHTML = html;

