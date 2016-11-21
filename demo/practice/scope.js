var a='yyy';
function aa(){
	var a="ss";
	var that=this;
	return function(){
		return this.a;
	}
}
console.log(aa()());