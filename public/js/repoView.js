'use strict';

(function(module) {
  const repoView = {};

  const ui = function() {
    let $about = $('#about');

    $about.find('ul').empty();
    $about.show().siblings().hide();
  };

  let render = Handlebars.compile($('#repo-template').html());

  repoView.index = function() {
    ui();
    $('#long-bio ul').append(
      repos.with('name').map(render);
    );
  };

  module.repoView = repoView;
})(window);
