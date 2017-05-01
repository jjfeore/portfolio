'use strict';

(function(module) {
  const sliderController = {};
  sliderController.index = () => {
    PortfolioItem.fetchAll();

    $('#long-bio').hide().siblings().show();
  };

  module.articleController = articleController;
})(window);
