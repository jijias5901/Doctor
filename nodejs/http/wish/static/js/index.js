/*
* @Author: Tom
* @Date:   2018-07-25 14:33:24
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-24 11:48:27
*/

(function($){

	function getRandom(min,max) {	
		return Math.round(min + (max-min)*Math.random());
	}
	var $wish = $('.wish');
	var $wall = $('.wall');
	//获取父容器和自身的宽高
	var wishWidth = $wish.width(),
		wishHeight = $wish.height(),
		wallWidth = $wall.width(),
		wallHeight = $wall.height();


	function handPep($elem){
		//1.设置许愿卡片拖动
		$elem.pep({  constrainTo: '.wall' })
		//2.随机显示许愿卡片
		$elem.each(function(){
			let x = getRandom(0,wallWidth - wishWidth);
			let y = getRandom(0,wallHeight - wishHeight);
			$(this).css({
				transform: "matrix(1, 0, 0, 1, "+x+", "+y+")"
			})
		});
		$elem.hover(function(){
			$(this).css({
				zIndex:999
			})
		},function(){
			$(this).css({
				zIndex:0
			})
		});
	}
	handPep($wish);

	//监听添加事件
	$(".sub-btn").on("click",function(){
		$.ajax({
			url:"/Wish/add",
			type:"post",
			dataType:"json",
			data:{
				content:$("#content").val()
			}
		})
		.done(function(result){
			if(result.status == 0){
				var $dom = $(`<div class="wish" style="background: ${result.color}">
								<a href="javascript:;" class="close" data-id='${result.id}'></a>
								${result.data.content}
							</div>`);
				$wall.append($dom);
				handPep($dom);
				$("#content").val("");
			}else{
				alert(result.message);
			}
		})
	});
	
	//监听删除事件
	$wall.on("click",".close",function(){
		let $this = $(this);
		$.ajax({
			url:"/Wish/del/"+$this.data("id"),
			dataType:"json"
		})
		.done(function(result){
			if(result.status == 0){
				$(this.parentNode).remove();
			}else{
				alert(result.message);
			}
		}.bind(this));
	})

})(jQuery);	
