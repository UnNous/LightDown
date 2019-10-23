
changeBg();
function changeBg(){
	// 读取数据，第一个参数是指定要读取的key以及设置默认值
	chrome.storage.local.get({light_down_color: '#666',enable_light_down: false}, function(items) {
		// if(items.enable_light_down){
			var color = items.light_down_color;
			var defaultElements = ["html","body","span","div","center","p","pre","tbody","tr","th","td","a","h1","h2","h3","h4","h5","tt"];
			for(i=0;i<defaultElements.length;i++){
			    var ele = document.getElementsByTagName(defaultElements[i]);
				for(j=0;j<ele.length;j++){
				    ele[j].style.backgroundColor = color;
				    var num = color.substring(color.length-1, color.length);
				    if((Number(num) && Number(num) < 6 )|| Number(num) == 0){
				    	ele[j].style.color = '#99a8b7';
				    }else{
				    	ele[j].style.color = '#000';
				    }
				}
			}
		// }
	});
}

