const fs=require('fs');
const os=require('os');
const tmpdir=os.tmpdir();
var test_module_js=tmpdir+'/xxx.js';
console.log(test_module_js);

//test_module_js=__dirname+'/xxx.js';
//console.log(test_module_js);

var try_require=require('./try_require.js');

function test_build_xxx(){
	var TEST=Math.random();
	fs.writeFileSync(test_module_js, `
		var build=function(){
			return ${TEST};
		};
		module.exports=build;
		`);
}

test_build_xxx();
var xx=try_require(test_module_js);
console.log(xx);

test_build_xxx();
var xx=try_require(test_module_js);
console.log(xx());

test_build_xxx();
var xx=try_require(test_module_js,true);
console.log(xx());

test_build_xxx();
var xx=try_require(test_module_js,true);
console.log(xx());

test_build_xxx();
var xx=try_require(test_module_js,false);
console.log(xx());

//test_build_xxx();
//var xx=try_require('xxx',false,function(m){
//	//console.log('cb=',m);
//});
//console.log(xx());
//test_build_xxx();
//var xx=try_require('xxx',false);
//console.log(xx());

//var cmp=try_require("https://raw.githubusercontent.com/tangxw1983/mega-common/master/mg_core.js",false,function(m){
//	console.log(m);
//});
var cmp=try_require("https://raw.githubusercontent.com/tangxw1983/mega-common/master/mg_core.js",false);
console.log(cmp);
