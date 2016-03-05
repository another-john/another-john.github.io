var engineerText = "Trust me, I'm an Engineer but...";
var artistText = "I also play some music ;)";
var greetingText = "Hi, I'm John and...";

$(window).on("orientationchange",function(){
setCoverPageHeight();
bindPlayButton();
bindScrollAction();
});





$(document).ready(function(){
$.material.init();
 var chart = $('.chart').easyPieChart({
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
if($("#content-engineer").height()<5 || $("#content-artist").height()<5)
setBackgroundHeight();
if (scrollDistance<100){
	$("#greeting").text(greetingText);
	$("#scrolldown").data("scrolltarget","#content-engineer");

}
else if (scrollDistance<=$("#engineer-container").height() && scrollDistance>=100){
$("#greeting").text(engineerText);
$("#scrolldown").data("scrolltarget","#content-artist");
}

else {
	$("#greeting").text(artistText);
	$("#scrolldown").data("scrolltarget","#content-engineer");
}

});



});

function bindPlayButton() {

var windowHeight = $(window).height();
var windowWidth = $("#video-wrapper").width();

$(".video-frame").prop("width","100%");
$(".video-frame").prop("height",0.35*windowHeight);

$("#video-wrapper").show();


$("#video-harmonica").prop("src","https://www.youtube.com/embed/W7x8KHzi4kc?wmode=transaparent&amp;");

$("#video-guitar").prop("src","https://www.youtube.com/embed/Bbh-WArxP48?wmode=transaparent&amp;");

$("#video-guitar-harmonica").prop("src","https://www.youtube.com/embed/jAbYthcFLHc?wmode=transaparent&amp;");

$("#video-margin").prop("height",$("#scrolldown").height());

}
function setBackgroundHeight(){

  var windowHeight = $(window).height();
  var windowWidth = $(window).width();
  var imgEngineer = document.getElementById('profile-engineer');
  var imgEngineerHeight = imgEngineer.clientHeight;
  $("#content-engineer").css("height",imgEngineerHeight);
  var imgArtist = document.getElementById('profile-artist');
  var imgArtistHeight = imgEngineer.clientHeight;
  $("#content-artist").css("height",imgArtistHeight);

}


function setCoverPageHeight(){
var windowHeight = $(window).height();

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
