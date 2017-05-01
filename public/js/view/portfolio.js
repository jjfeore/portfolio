'use strict';

(function(module) {
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

  function initAbout() {
    let uselessArr = [1, 2, 3, 38, 19, 43, 72, 4, 18, 23];
    $('#insert-transform').text(uselessArr.map(val => val + 1).reduce((a,b) => a + b));
  }

  PortfolioItem.loadAll = function(rawData) {
    rawData.forEach(function(ele) {
      PortfolioItem.all.push(new PortfolioItem(ele));
    });
  };

  PortfolioItem.fetchAll = function() {
    $.getJSON('data/projects.json').done(function (rawData) {
      PortfolioItem.loadAll(rawData);
      localStorage.setItem('rawData', JSON.stringify(rawData));
      initPage();
      initAbout();
    });
  };

  module.PortfolioItem = PortfolioItem;
})(window);
