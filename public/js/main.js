'use strict';

function PortfolioItem(newPort) {
  this.name = newPort.name;
  this.desc = newPort.desc;
  this.url = newPort.url;
  this.pic = newPort.pic;
}
PortfolioItem.all = [];

PortfolioItem.prototype.toHtml = function() {
  var render = Handlebars.compile($('#carousel-template').html());
  return render(this);
};

function initPage() {
  PortfolioItem.all.forEach(function(portfolio) {
    $('#make-stuff').prepend(portfolio.toHtml());
    $('#carousel-bullets').append('<span>&#x25CF;</span>');
  });
  $('.portfolio-image').eq(0).show();
  $('#carousel-bullets').find('span').eq(0).css('color', '#000');
}

PortfolioItem.loadAll = function(rawData) {
  rawData.forEach(function(ele) {
    PortfolioItem.all.push(new PortfolioItem(ele));
  });
};

PortfolioItem.fetchAll = function() {
  if (localStorage.rawData) {
    PortfolioItem.loadAll(JSON.parse(localStorage.getItem('rawData')));
    initPage();
  } else {
    $.getJSON('data/projects.json').done(function (rawData) {
      PortfolioItem.loadAll(rawData);
      localStorage.setItem('rawData', JSON.stringify(rawData));
      initPage();
    });
  }
};

// Slider code based on code at: https://www.sitepoint.com/web-foundations/making-simple-image-slider-html-css-jquery/
// Modified the code a bunch and added the bullet stuff and animations - James

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
    // .animate({
    //   top: 500
    // }, 200);
  }
  else {
    $(this).find('p').hide();
    // $(this).animate({
    //   top: 0
    // }, 200);
  }
});
