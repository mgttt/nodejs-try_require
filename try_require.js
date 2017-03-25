var _invalidateRequireCacheForFile = function(mmm){
	try{
		var p=require.resolve(mmm);
		delete require.cache[p];
	}catch(ex){};
};

var try_require=function(mmm,opts,cb){
	var rt=null;
	opts=opts||{};
	if(opts.nocache) _invalidateRequireCacheForFile(mmm);
	var m;
	if(m=mmm.match(/^(https?):\/\//)){
		var os=require('os');
		var fs=require('fs');
		var tmpdir=os.tmpdir();
		var test_module_js=tmpdir+'/'+(new Date()).getTime()+'.js';
		var web=require(m[1]);
		var file = fs.createWriteStream(test_module_js);
		var done = false;
		var tm=setTimeout(function(){
			rt=new Error('Network Timeout');
			done=true;
		},opts.timeout||7000);
		web.get(mmm, function( res ){
			res.pipe(file);
			file.on('finish', function() {
				file.close(function(){
					rt=require(test_module_js);
					if(cb){
						cb(rt);
					}else{
						clearTimeout(tm);
						delete tm;
						done=true;//TODO merge codes with the above
					}
				});
			});
		});
		if(!cb)
			require('deasync').loopWhile(function(){return !done;});
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

