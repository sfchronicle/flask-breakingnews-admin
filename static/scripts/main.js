'use strict';

var App = App || {};

App = {
  multi: function () {
    $('.right-off-canvas-toggle').on('click', function (event) {
      event.preventDefault();
      $('.cd-panel').addClass('is-visible');
    });

    $('.cd-panel').on('click', function (event){
  		if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) {
  			$('.cd-panel').removeClass('is-visible');
  			event.preventDefault();
  		}
  	});
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
