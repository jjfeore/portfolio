'use strict';

var fullPortfolio = [];

function PortfolioItem(name, description, url, pic) {
  this.name = name;
  this.desc = description;
  this.url = url;
  this.pic = pic;
  fullPortfolio.push(this);
}

PortfolioItem.prototype.toHtml = function() {
  var $newPortfolio = $('#make-stuff div:first-child').clone();
  $newPortfolio.find('a').attr('href', this.url);
  $newPortfolio.find('img').attr('src', this.pic);
  $newPortfolio.find('span').text(this.name);
  $newPortfolio.find('span').attr('data-desc', `<p>${this.desc}</p>`);
  return $newPortfolio;
};

new PortfolioItem('Four in a Row', 'My final project for Code Fellows 201 was just a simple and clean replica of the Four in a Row game we\'re all familiar with.', 'https://jjfeore.github.io/fourinarow/', 'images/fourinarow.jpg');
new PortfolioItem('SOBA', 'I\'ve helped build one of the largest and most active online broadcasting non-profits in the nation. The Seattle Online Broadcasters Association dedicates itself to assisting all broadcasters in the Puget Sound area.', 'https://www.meetup.com/SOBA-Meetup/', 'images/soba.jpeg');
new PortfolioItem('BanzaiBaby', 'As BanzaiBaby\'s channel and community manager, I\'ve helped build her channel to being among the most well-recognized on all of Twitch Creative.', 'https://www.twitch.tv/banzaibaby', 'images/banzaibaby.png');

fullPortfolio.forEach(function(portfolio) {
  $('#make-stuff').prepend(portfolio.toHtml());
  $('#carousel-bullets').append('<span>&#x25CF;</span>');
});

// Slider code based on code at: https://www.sitepoint.com/web-foundations/making-simple-image-slider-html-css-jquery/
// Modified the code a bunch and added the bullet stuff and animations - James

var currentIndex = 0;
$('.portfolio-image').eq(0).show();
$('#carousel-bullets').find('span').eq(0).css('color', '#000');

function cycleItems() {
  var item = $('.portfolio-image').eq(currentIndex);
  $('#carousel-bullets').children().css('color', '#666');
  $('#carousel-bullets').find('span').eq(currentIndex).css('color', '#000');
  $('.portfolio-image').hide();
  item.css('display','block');
}

var autoSlide = setInterval(function() {
  currentIndex += 1;
  if (currentIndex > fullPortfolio.length - 1) {
    currentIndex = 0;
  }
  cycleItems();
}, 3000);

$('#button-right').click(function() {
  clearInterval(autoSlide);
  currentIndex += 1;
  if (currentIndex > fullPortfolio.length - 1) {
    currentIndex = 0;
  }
  cycleItems();
  autoSlide = setInterval(function() {
    currentIndex += 1;
    if (currentIndex > fullPortfolio.length - 1) {
      currentIndex = 0;
    }
    cycleItems();
  }, 3000);
});

$('#button-left').click(function() {
  clearInterval(autoSlide);
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = fullPortfolio.length - 1;
  }
  cycleItems();
  autoSlide = setInterval(function() {
    currentIndex += 1;
    if (currentIndex > fullPortfolio.length - 1) {
      currentIndex = 0;
    }
    cycleItems();
  }, 3000);
});

$('#quick-bio a').on('click', function(e) {
  e.preventDefault();
  $('body').animate({scrollTop: $($(this).attr('href')).offset().top}, 500);
});

$('.portfolio-image span').on('mouseover mouseleave', function(e) {
  if (e.type == "mouseover") {
    $(this).append($(this).attr('data-desc'));
    $(this).animate({
      top: 500
    }, 200);
  }
  else {
    $(this).find('p').remove();
    $(this).animate({
      top: 0
    }, 200);
  }
});
