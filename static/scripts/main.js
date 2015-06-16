'use strict';

var App = App || {};

App = {
  multi: function () {

  },
  simple: function () {
    var updateEmbed = function () {
      var $embed = $('.sfc-breaking-embed');
      var code = '<link rel="stylesheet" href="http://s3-us-west-1.amazonaws.com/sfc-banner-builder/static/styles/main.css">';
      $('textarea').text( code += $embed.html() );
    }

    $('#body').on('change keypress paste focus textInput input', function () {
        $('.sfc-deck').text(this.value);
        updateEmbed();
    });

    $('#headline').on('change keypress paste focus textInput input', function () {
        $('.sfc-h1-head').text(this.value);
        updateEmbed();
    });

    $('#story-link').on('change keypress paste focus textInput input', function () {
        $('.story-link').attr('href', this.value);
        updateEmbed();
    });

    $('#background-image-link').on('change keypress paste focus textInput input', function () {
        var url = 'url('+this.value+')';
        if (this.value !== '') {
          $('.banner').css('background-image', url);
        }
        updateEmbed();
    });
  }
};
