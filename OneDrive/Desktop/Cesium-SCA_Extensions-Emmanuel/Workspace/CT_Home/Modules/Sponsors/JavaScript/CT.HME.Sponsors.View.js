define( 'CT.HME.Sponsors.View', [
  'ct_hme_sponsors.tpl',
  'Backbone.View',
  'Utils',
  'underscore'
], function( sponsors_tpl, BackboneView, Utils ) {
  'use strict';

  return BackboneView.extend( {
    template: sponsors_tpl,

    initialize: function( options ) {
      this.application = options.application;
      this.items = options.items;

      this.options.application
        .getLayout()
        .on( 'afterAppendView', this.initSlider, this );
    },

    initSlider: function() {
      Utils.initBxSlider( this.$( '[data-type="carousel-items"]' ), {
        pager: false,
        slideWidth: 264,
        minSlides: 1,
        maxSlides: 5,
        forceStart: true,
        touchEnabled: true
      } );
    },

    getContext: function() {
      this.items.forEach( function( item ) {
        item['data-touchpoint'] = item.dataTouchPoint;
        item['data-hashtag'] = item.dataHashtag;
      } );

      return { items: this.items };
    }
  } );
} );
