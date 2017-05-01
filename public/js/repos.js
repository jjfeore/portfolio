'use strict';

(function(module) {
  const repos = {};

  function MyRepos(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  repos.all = [];

  repos.requestRepos = function(callback) {
    $.get(`https://api.github.com/users/jjfeore`)
    .then(
      results => {
        repos.all = results.map(ele => new MyRepos(ele));
        callback();
      });
  };
  
  repos.with = attr => repos.all.filter(repo => repo[attr]);

  module.repos = repos;
})(window);
