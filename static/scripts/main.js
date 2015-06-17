'use strict';

var App = App || {};

App = {
  multi: function () {

    var max_fields  = 5; //maximum input boxes allowed
    var $wrapper    = $(".input_fields_wrap"); //Fields wrapper
    var $add_button = $(".add_field_button"); //Add button ID

    var inputTemplate    = '<section class="kicker-menu"><div class="small-8 columns"><label>Story Headline</label><input type="text" placeholder="Headline"></div><div class="small-4 columns"><label>Story URL</label><input type="text" placeholder="http://sfchronicle.com/"></div><a href="#" class="remove_field">Remove</a></section>';

    var kickerTemplate   = '<a href=""><h4><strong>&raquo;</strong><span class="reg-head"></span></h4></a>';

    var count = 1; //initlal text box count
    $add_button.on('click', function (event) { //on add input button click
        event.preventDefault();
        if(count < max_fields) { //max input box allowed
            count++; //text box increment
            $wrapper.append(inputTemplate); //add input box
        }
    });

    $wrapper.on('click', '.remove_field', function (event) { //user click on remove text
        event.preventDefault();
        event.target.parentElement.remove()
        count--;
    });

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
