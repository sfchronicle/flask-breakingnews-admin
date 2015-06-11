'use strict';

var App = App || {};

App = {
  simple: function () {
    $('button').on('click', function (event) {
      var $embed = $('.embed');
      $('pre').text( $embed.html() );
    });

    $('#body').on('change keypress paste focus textInput input', function () {
        $('.sfc-deck').text(this.value);
    });

    $('#headline').on('change keypress paste focus textInput input', function () {
        $('.sfc-h1-head').text(this.value);
    });

    $('#story-link').on('change keypress paste focus textInput input', function () {
        $('.story-link').attr('href', this.value);
    });

    $('#background-image-link').on('change keypress paste focus textInput input', function () {
        var url = 'url('+this.value+')'
        $('.banner').css('background-image', url);
    });
  }
};
