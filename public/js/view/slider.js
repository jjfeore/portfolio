'use strict';

var currentIndex = 0;

function cycleItems() {
  var item = $('.portfolio-image').eq(currentIndex);
  $('#carousel-bullets').children().css('color', '#666');
  $('#carousel-bullets').find('span').eq(currentIndex).css('color', '#000');
  $('.portfolio-image').hide();
  item.css('display','block');
}

var autoSlide = setInterval(function() {
  currentIndex += 1;
  if (currentIndex > PortfolioItem.all.length - 1) {
    currentIndex = 0;
  }
  cycleItems();
}, 5000);

$('#button-right').click(function() {
  clearInterval(autoSlide);
  currentIndex += 1;
  if (currentIndex > PortfolioItem.all.length - 1) {
    currentIndex = 0;
  }
  cycleItems();
  autoSlide = setInterval(function() {
    currentIndex += 1;
    if (currentIndex > PortfolioItem.all.length - 1) {
      currentIndex = 0;
    }
    cycleItems();
  }, 5000);
});

$('#button-left').click(function() {
  clearInterval(autoSlide);
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = PortfolioItem.all.length - 1;
  }
  cycleItems();
  autoSlide = setInterval(function() {
    currentIndex += 1;
    if (currentIndex > PortfolioItem.all.length - 1) {
      currentIndex = 0;
    }
    cycleItems();
  }, 5000);
});

$('#quick-bio a').on('click', function(e) {
  e.preventDefault();
  $('body').animate({scrollTop: $($(this).attr('href')).offset().top}, 500);
});

$('.portfolio-image span').on('mouseover mouseleave', function(e) {
  if (e.type == 'mouseover') {
    $(this).find('p').show();
  }
  else {
    $(this).find('p').hide();
  }
});
