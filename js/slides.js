var imageFront = document.getElementsByClassName('image_front')[0];
var imageBack = document.getElementsByClassName('image_back')[0];
var url = ['images/clear1.jpg','images/clear2.jpg','images/clear3.jpg','images/clear4.jpg','images/clear5.jpg','images/night1.jpg','images/night2.jpg','images/night3.jpg','images/night4.jpg','images/misty1.jpg','images/misty2.jpg','images/rain1.jpg','images/rain2.jpg','images/rain3.jpg','images/storm1.jpg','images/storm2.jpg','images/storm3.jpg','images/snow1.jpg','images/snow2.jpg','images/snow3.jpg'];
var i = 0;

imageFront.style.backgroundImage = 'url(' +url[0]+ ')';
imageBack.style.backgroundImage = 'url(' +url[1]+ ')';

var slide = setInterval(mySlides,10000);

function mySlides() {
  if (i == url.length-1) {
    i = 0;
    imageFront.style.opacity = 1;
    imageBack.style.opacity = 0;
    imageFront.style.backgroundImage = 'url(' +url[i]+ ')';
  }else {
    i++;
    if (imageFront.style.opacity = 0) {
      imageFront.style.opacity = 1;
      imageBack.style.opacity = 0;
      imageFront.style.backgroundImage = 'url(' +url[i]+ ')';
    }else {
      imageFront.style.opacity = 0;
      imageBack.style.opacity = 1;
      imageBack.style.backgroundImage = 'url(' +url[i]+ ')';
    }
      console.log(url[i]);
  }
}
