var engineerText = "Trust me, I'm an Engineer but...";
var artistText = "I also play some music";
var greetingText = "Hi, I'm John and...";
$(document).ready(function(){
$.material.init();
 $('.chart').easyPieChart({
           animate: 2000,
			barColor: '#69c',
			trackColor: '#ace',
			scaleColor: false,
			lineWidth: 10,
			trackWidth: 10,
			lineCap: 'butt'
    });

setCoverPageHeight();
bindPlayButton();
bindScrollAction();

$( window ).scroll(function() {
var scrollDistance = $(document).scrollTop();
//console.log(scrollDistance);

if (scrollDistance<100){
	$("#greeting").text(greetingText);
	
}
if (scrollDistance<=$(window).height() && scrollDistance>=100){
$("#greeting").text(engineerText);

}
	
if (scrollDistance>$(window).height())
	$("#greeting").text(artistText);

});



});

function bindPlayButton() {

$(document).on('click','.play-button-artist',function(){


var windowHeight = $(window).height();
var windowWidth = $("#video-wrapper").width();

$("#video-harmonica").prop("width","100%");
$("#video-harmonica").prop("height",0.35*windowHeight);

$("#video-harmonica").prop("src","https://www.youtube.com/embed/W7x8KHzi4kc?wmode=transaparent&amp;autoplay=1")

$(this).parent().hide();
$("#video-wrapper").show();


});


}

function setCoverPageHeight(){
var windowHeight = $(window).height();
var windowWidth = $(window).width();
var img = document.getElementById('profile-engineer'); 
var imgHeight = img.clientHeight;
$("#content-engineer").css("height",0.7*imgHeight);

if ($(".content").length)
{
	$(".content").css("height",windowHeight);
	


	$(".video-pre").css("height",windowHeight);

}	


}




function stopNativeScroll(){

	$("html, body").on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove",function(){

         $('html, body').stop();
	});
}
function bindScrollAction(){

$(document).on("click",".scrollto",function(e){
e.preventDefault();
scrollToAction();


});

}

function scrollToAction(){
var scrollspeed=500;
$("html, body").animate(
{
  scrollTop:$($("#scrolldown").data("scrolltarget")).offset().top
},
scrollspeed,
function(){
$("html, body").off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
}
);




}