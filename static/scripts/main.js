'use strict';

var App = App || {};

App = {
  enableMultiEditor: function () {
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
  _form2body: function (input, output, callback) {
    /* Take the text input and move it to output. Render optional callback*/
    $(input).on('change keypress paste focus textInput input', function () {
      $(output).text(this.value);

      typeof callback === 'function' && callback();
    });

  },
  _updateMultiEmbed: function () {
    var $embed = $('.sfc-multi-embed-container');
    var code = '<link rel="stylesheet" href="http://s3-us-west-1.amazonaws.com/sfc-banner-builder/static/styles/main.css">'+
      '<link rel="stylesheet" href="http://s3-us-west-1.amazonaws.com/sfc-banner-builder/static/styles/multi.css">';
    $('textarea#embed-code').text( code += $embed.html() );
  },
  _toggleBreakingLabel: function () {
    var template = '<div class="sfc-label"><h3 class="sfc-kicker-link">Breaking</h3></div>';
    $('input[name=breaking-label]').on('change', function (event) {
      if (this.id === 'breakingNo') {
        $('.sfc-label').remove();
        App._updateMultiEmbed();
      } else {
        $('.head-grp').prepend(template);
        App._updateMultiEmbed();
      }
    });
  },
  _toggleDeepModule: function () {
    var $classes = $('.bg, .row, .sfc-h1-head');

    $('input[name=extend-bg-photo]').on('change', function () {
      if (this.id === 'extendBgYes') {
        $('section.banner').prepend('<div class="bg fade"></div>');
        $('.bg.fade').addClass('deep');
        $classes.addClass('deep');

        App._updateMultiEmbed();
      } else {
        $('.bg.fade').remove();
        $classes.removeClass('deep');
        App._updateMultiEmbed();
      }
    });
  },
  _updateKicker: function (count) {
    count   = parseInt(count);

    $('input#kicker-link-'+count).on('change keypress paste focus textInput input', function () {
        $('a#kicker-link-'+count).attr('href', this.value);
        App._updateMultiEmbed();

    });
    $('input#kicker-hed-'+count).on('change keypress paste focus textInput input', function () {
        $('span#kicker-hed-'+count).text(this.value);
        App._updateMultiEmbed();
    });
  },
  _createKicker: function () {
    var updateKicker     = this._updateKicker;
    var updateMultiEmbed = this._updateMultiEmbed;
    var max_fields   = 100; //maximum input boxes allowed
    var $wrapper     = $(".input_fields_wrap"); //Fields wrapper
    var $add_button  = $(".add_field_button"); //Add button ID
    var $kickers     = $('.story-head-block'); // kicker wrapper

    var inputTemplate  = function (count) {
      return ' <section class="kicker-menu" data-count="'+count+'">'+
        '<div class="small-8 columns"><label>Story Headline</label>'+
        '<input id="kicker-hed-'+count+'" type="text" placeholder="Headline">'+
        '</div> <div class="small-4 columns"><label>Story URL</label>'+
        '<input id="kicker-link-'+count+'" type="text" placeholder="http://sfchronicle.com/">'+
        '</div> <a href="#" class="remove_field">Remove</a></section></section>';
    }

    var kickerTemplate = function (count) {
      return '<a id="kicker-link-'+count+'" href=""><h4> <strong>&raquo; </strong>'+
        '<span class="reg-head" id="kicker-hed-'+count+'">'+
        'An example headline</span></h4></a>';
    }

    var count = 1; //initlal text box count
    updateKicker(count) // initial logic

    $add_button.on('click', function (event) { //on add input button click
        event.preventDefault();
        if(count < max_fields) { //max input box allowed
            count++; //text box increment
            $wrapper.append( inputTemplate(count) ); //add input box
            $kickers.append( kickerTemplate(count) ); // add kicker
            updateKicker(count); // add events
            updateMultiEmbed();
        }
    });

    $wrapper.on('click', '.remove_field', function (event) { //user click on remove text
      var thisCount = $(event.target.parentElement).data().count;
      event.preventDefault();
      event.target.parentElement.remove();
      $('a#kicker-link-'+thisCount).remove();

      count--;
      updateMultiEmbed();
    });
  },
  multi: function () {
    App.enableMultiEditor();

    var f2b              = this._form2body;
    var updateMultiEmbed = this._updateMultiEmbed;
    var updateBgImage    = function () {
      var url = 'url('+this.value+')';
      if (this.value !== '') {
        $('.bg:not(.fade)').css('background-image', url);
      }
      updateMultiEmbed();
    };

    this._createKicker();
    this._toggleBreakingLabel();
    this. _toggleDeepModule();

    f2b('input#headline', '.sfc-h1-head', updateMultiEmbed);
    f2b('textarea#dek', '.sfc-deck', updateMultiEmbed);
    f2b('textarea#blurb', '.sfc-deck-sty2', updateMultiEmbed);

    $('input#bg-img').on('change keypress paste focus textInput input', updateBgImage);
  },
  simple: function () {
    var updateEmbed = function () {
      var $embed = $('.sfc-embed-container');
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
