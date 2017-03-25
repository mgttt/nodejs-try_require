var _invalidateRequireCacheForFile = function(mmm){
	try{
		var p=require.resolve(mmm);
		delete require.cache[p];
	}catch(ex){};
};

var try_require=function(mmm,nocache,cb){
	var rt=null;
	if(nocache) _invalidateRequireCacheForFile(mmm);
	var m;
	if(m=mmm.match(/^(https?):\/\//)){
		var os=require('os');
		var fs=require('fs');
		var tmpdir=os.tmpdir();
		var test_module_js=tmpdir+'/'+(new Date()).getTime()+'.js';
		var web=require(m[1]);
		var file = fs.createWriteStream(test_module_js);
		if(cb){
			web.get(mmm, function( res ){
				res.pipe(file);
				file.on('finish', function() {
					file.close(function(){
						//vm.runInThisContext( data, mmm );
						cb(require(test_module_js));
					});
				});
			});
		}else{
			var done = false;
			setTimeout(function(){
				rt=new Error('Timeout');
				done=true;//TODO timeout
			},5000);
			web.get(mmm, function( res ){
				res.pipe(file);
				file.on('finish', function() {
					file.close(function(){
						rt=require(test_module_js);
						done=true;//TODO merge codes with the above
					});
				});
			});
			require('deasync').loopWhile(function(){return !done;});
		}
	}else{
		try{
			rt=require(mmm);
		}catch(ex){
			try{
				rt=require('./src/'+mmm+'.js');
			}catch(ex){
				mmm='./'+mmm+'.js';
				try{
					rt=require(mmm);
				}catch(ex){
					mmm='.'+mmm;
					try{
						rt=require(mmm);
					}catch(ex){
						console.log(ex);
					}
				}
			}
		}
		if(cb){
			cb(rt);
		}
	}
	return rt;
};

module.exports=try_require;
