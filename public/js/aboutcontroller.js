'use strict';

(function(module) {
  const aboutController = {};

  aboutController.index = () => {
    $('#long-bio').show().siblings().hide();
    repos.requestRepos(repoView.index);
  };

  module.aboutController = aboutController;
})(window);
