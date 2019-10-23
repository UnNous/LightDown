$(document).ready(function(){
    chrome.storage.local.get({light_down_color: "#111", enable_light_down: false}, function(items) {
        var color = items.light_down_color;
        var enaled = items.enable_light_down;
        var colorNum = color.substring(color.length-1, color.length);
        var index = reverseNum(colorNum);
        $("#lightDownRangeId").val(index);
       
        // if(enaled){
        //     $("#light_down_checkbox").attr('checked','checked');
        //     $("#light_down_checkbox").val(true);
        // }else{
        //     $("#light_down_checkbox").removeAttr('checked');
        //     $("#light_down_checkbox").val(false);
        // }
        // $("#light_down_checkbox").click(function(event){
        //     var checkFlag = event.currentTarget.checked;
        //     chrome.storage.local.set({enable_light_down: checkFlag}, function() {});
        //     $("#light_down_checkbox").val(checkFlag);
        // })

        initProgress(enaled);
    });
})
function initProgress(enaled){
    // 进度条
    $('input').RangeSlider({ min: 0,   max: 15,  step: 1,  callback: function($el) {
        // 启动chrome缓存
        chrome.storage.local.set({light_down_color: formatNum($el.value), enable_light_down: true}, function() {
            // 修改背景色
            executeScriptFileToCurrentTab('./js/modifyBg.js');
            // if(!enaled){
            //     setTimeout(function(){
            //         chrome.storage.local.set({enable_light_down: false}, function() {
            //         })
            //     },50);
            // }
        });
    }});
}
var arr = ['f','e','d','c','b','a','9','8','7','6','5','4','3','2','1','0']
function formatNum(i){
    return '#'+arr[i]+arr[i]+arr[i];
}
function reverseNum(num){
    for(i=0; i< arr.length; i++){
        if(arr[i] == num){
            return i;
        }
    }
    return 0;
}

// 向content-script注入JS片段
function executeScriptToCurrentTab(code) {
	getCurrentTabId((tabId) => {
		chrome.tabs.executeScript(tabId, {code: code});
	});
}

// 向content-script注入JS片段
function executeScriptFileToCurrentTab(file_) {
	getCurrentTabId((tabId) => {
		chrome.tabs.executeScript(tabId, {file: file_});
		// chrome.tabs.executeScript(tabId, {code: 'document.body.style.backgroundColor="red";'});
	});
}

// 获取当前选项卡ID
function getCurrentTabId(callback) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}

// ------------------------------进度条----------------------------

$.fn.RangeSlider = function(cfg){
    this.sliderCfg = {
        min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null, 
        max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
        step: cfg && Number(cfg.step) ? cfg.step : 1,
        callback: cfg && cfg.callback ? cfg.callback : null
    };
    var $input = $(this);
    var min = this.sliderCfg.min;
    var max = this.sliderCfg.max;
    var step = this.sliderCfg.step;
    var callback = this.sliderCfg.callback;

    $input.attr('min', min).attr('max', max).attr('step', step);
    $input.bind("input", function(e){
        $input.attr('value', this.value);
        // $input.css( 'background', 'linear-gradient(to right, #fff, #333 ' + this.value + '%, #333)' );
        if ($.isFunction(callback)) {
            callback(this);
        }
    });
};
 
