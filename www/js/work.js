// JavaScript Document
$(document).ready(function(){
	function curTime(){
		var d = new Date();
		return d.getTime() * .001;	
	}
	
	var origTime = curTime()
	
	var sw = $(window).width()
	var sh = $(window).height()
	
	var nRec = 0;
	var main = "";
	var waiter = 15;
	var curLevWid = 50
	
	var start = true
	var recArray = []
	
	var gCol = 'rgba(0,90,255,.8)'//"blue" //good Color
	var bCol = 'rgba(256,200,0,.8)' //bad Color
	
	var start = new Date;
	var levelTime = 30
		
	function widthDeterminer(level){
		return 80 / (level + (level - 1) * .111111) * sw * .01
	}
	
	function figureLeft(level, num){
		curLevWid = widthDeterminer(level)
		var standardLeft = .1 * sw
		return standardLeft + num % level * 1.111111 * curLevWid
	}
	
	function figureTop(level, num){
		curLevWid = widthDeterminer(level)
		var standardTop = 120
		return standardTop + Math.floor(num / level) * 1.1111111 * curLevWid
	}
	
	var Rec = function(level, num){
		var widthy = widthDeterminer(level)
		this.fullSize = widthy
		this.width = widthy
		this.height = widthy
		var lefty = figureLeft(level,num)
		var toppy = figureTop(level,num)
		this.origLeft = lefty
		this.left = lefty
		this.origTop = toppy
		this.top = toppy
		this.borderColor = gCol
		this.backgroundColor = 'rgba(0,0,0,0)'
		this.func = false
		this.grow = false
		this.shrink = false
		this.dir = "h"
		this.endTime = 0;
		this.corRad = 10;
		this.vis = 'visible';
	}
	
	Rec.prototype.switchColor = function(){
		if(this.borderColor == gCol) this.borderColor = bCol
		else this.borderColor = gCol
	}
	
	Rec.prototype.stay = function(){
		this.func = false	
	}
	
	Rec.prototype.step = function(){
		if(this.func){
			if(this.shrink){
				if(this.dir == 'h'){
					if(this.width > 0){
						this.width -= this.fullSize * .1
						this.left += this.fullSize * .05
						this.corRad -= 1
					}
					else{
						this.switchColor()
						this.shrink = false
						this.grow = true
					}
				}
				else{//when dir == 'v'
					if(this.height > 0){
						this.height -= this.fullSize * .1
						this.top += this.fullSize * .05
						this.corRad -= 1
					}
					else{
						this.switchColor()
						this.shrink = false
						this.grow = true
					}
					
				}
			}
			else if(this.grow){
				if(this.dir == 'h'){
					if(this.width < this.fullSize){
						this.width += this.fullSize * .1
						this.left -= this.fullSize * .05
						this.corRad += 1
					}
					else{
						this.grow = false
					}
				}
				else{// if dir == 'v'
					if(this.height < this.fullSize){
						this.height += this.fullSize * .1
						this.top -= this.fullSize * .05
						this.corRad += 1
					}
					else{
						this.grow = false
					}
				}
			}
			else{
				if(ranMan(.02)){
					this.shrink = true
					if(ranMan(.5)){
						this.dir = 'v'	
					}
					else{
						this.dir = 'h'	
					}
				}
			}
		}
	}
	
	function arrayMaker(level){
		var output = []
		for(i = 0; i < level * level; i++){
			output[i] = new Rec(level, i)	
		}
		return output
	}
	
	function recDisplay(recNum){
		var oif = recArray[recNum]
		$('#rec'+recNum).css({'width':oif.width,
								'height':oif.height,
								'left':oif.left,
								'top':oif.top,
								'border-color':oif.borderColor,
								'background-color':oif.backgroundColor,
								'visibility':oif.vis})
	}
	
	function incrementer(){
		for(i = 0; i < recArray.length; i++){
			recArray[i].step()
			recDisplay(i)
		}
	}
	
	function starter(level){
		recArray = arrayMaker(level)
	}
	
	function powerOn(){
		for(i = 0; i < recArray.length; i++){
			recArray[i].func = true	
		}
	}	
	
	function ranMan(num){
		return Math.random() < num
	}
	var c = 0
	
	$(function(){
		if(start){
			 setInterval(function(){
				incrementer();
			 },waiter);
			 
		}
    });
	
	$('#begin-button').mousedown(function(){
		fireItUp();
	})
	//document.getElementById("clickMe").addEventListener("click", myFunction);
	//document.getElementById("clickIt").addEventListener("click", otherFunction);
	//document.getElementById("powerOn").addEventListener("click", powerOn);
	//document.getElementById("timerStart").addEventListener("click", timer);
	//document.getElementById("rec2").addEventListener("click", myFunction);
	//$('#rec1').addClass('b-rec').addClass('black').addClass('func')
	//$('#rec1').css({'left':50+'%'})
	function fireItUp(){
		c = (c+1) % 8
		if(c == 0 && recArray.length > 0){
			$('.play').each(function(i, obj) {
			recArray[i].vis = 'hidden'
			});	
		}
		else recArray = arrayMaker(c)
	}
	function otherFunction(){
		if(recArray.length > 0){
			$('.play').each(function(i, obj) {
				recArray[i].func = false
			});
		}
	}
	
	
	$('.play').mousedown(function(){
		if(recArray.length > 0){
			var oif = recArray[parseInt($(this).attr('id').substr(3))]
			oif.func = false
			oif.backgroundColor = (oif.borderColor).substring(0, oif.borderColor.length - 3) + '.4)' 
		}
	})
	//document.getElementById('home').innerHTML = "<div class = 'b-rec'></div>";
	//testy(document.getElementById('home').innerHTML + "<div style = 'left:50px' class = 'b-rec'></div>")
	
	
	function testy(test){
		$('#test').html(test);$('#test').css({'visibility':'visible','z-index':40,'color':'#00C'});	
	}
})