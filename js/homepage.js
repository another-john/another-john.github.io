var engineerText = "Trust me, I'm an Engineer but...";
var artistText = "I closed my eyes in order to See";
var greetingText = "Hi, I'm John and...";
$(document).ready(function(){

setCoverPageHeight();
bindPlayButton();
bindScrollAction();

$( window ).scroll(function() {
var scrollDistance = $(document).scrollTop();
console.log(scrollDistance);

if (scrollDistance<100){
	$("#greeting").text(greetingText);
	$(".intro-quote").css("background-color","rgba(240, 173, 78, 0.7)");
}
if (scrollDistance<=$(window).height() && scrollDistance>=100){
$("#greeting").text(engineerText);
$(".intro-quote").css("background-color","#FF9800");
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
$("#video-harmonica").prop("height",0.45*windowHeight);

$("#video-harmonica").prop("src","https://www.youtube.com/embed/W7x8KHzi4kc?wmode=transaparent&amp;autoplay=1")

$(this).parent().hide();
$("#video-wrapper").show();


});


}

function setCoverPageHeight(){
var windowHeight = $(window).height();
var windowWidth = $(window).width();
if ($(".content").length)
{
	$(".content").css("height",windowHeight);
	$("#content-engineer").css("height",0.3*windowHeight);

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