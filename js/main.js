'use strict';

function PortfolioItem(name, description, url, pic) {
  this.name = name;
  this.desc = description;
  this.url = url;
  this.pic = pic;
}

new PortfolioItem('Four in a Row', 'My final project for Code Fellows 201 was just a simple and clean replica of the Four in a Row game we\'re all familiar with.', 'https://jjfeore.github.io/fourinarow/', 'images/fourinarow.jpg');
new PortfolioItem('Seattle Online Broadcasters Assc.', 'I\'ve helped build one of the largest and most active online broadcasting non-profits in the nation. SOBA dedicates itself to assisting all broadcasters in the Puget Sound area.', 'https://www.meetup.com/SOBA-Meetup/', 'images/soba.jpeg');
new PortfolioItem('BanzaiBaby', 'As BanzaiBaby\'s channel and community manager, I\'ve helped build her channel to being among the most well-recognized on all of Twitch Creative.', 'https://www.twitch.tv/banzaibaby', 'images/banzaibaby.png');
