(function (window, document){

  require(['jquery'], function($) {

    window.HOPSTER = window.HOPSTER || {};

    HOPSTER.Coupons = {

      init: function() {
        var params = window.location.search.substring(1).split('&');

        if(params[0].search('.rss') == -1)
          this.url = params[0];
        else
          this.url = params[0].split('.rss').join('.json');

        this.couponList = $('#hpcpn-cb-coupon-slider-list');
        this.btnNext = $('#hpcbn-cb-show-next');
        this.btnPrev = $('#hpcpn-cb-show-prev');
        this.qtyToDisplay = ( $(window).width() >= 265 ) ? 3 : 1;
        this.getCoupons();
        this.positionArrows();
        this.bindEvents();
      },

      bindEvents: function() {
        this.btnNext.on('click', $.proxy(this.showNext, this));
        this.btnPrev.on('click', $.proxy(this.showPrev, this));
      },

      getCoupons: function() {
        $.getJSON( this.url, function(data) {
          var results = data.Coupons;
          $.each(results, function(index, coupon) {
            var partner = $('<p>', {
              'class': 'hpcpn-cb-partner',
              text: coupon.partner
            });

            var savings_link = $('<a />', {
              'class': 'hpcpn-cb-savings',
              href: coupon.link,
              target: '_blank',
              text: '$' + coupon.savings + ' Off'
            });

            var img_link = $('<a />', {
              'class': 'bg-img hpcpn-cb-img-container',
              href: coupon.link,
              target: '_blank',
              style: 'background-image:url(' + coupon.image_url + ')'
            });

            var html = $('<li>', {
              'class': (index < this.qtyToDisplay) ? 'active' : 'is-hidden'
            }).addClass('text-center').attr('data-id', index).append(img_link).append(savings_link).append(partner);

            $('#hpcpn-cb-coupon-slider-list').append(html);
          }.bind(this));

          $('#hpcpn-cb-coupon-slider-list').after('<div id="hpcpn-cb-btn-print" class="text-center"><a href="' + data.meta.public_url + '" target="_blank">Print Coupons</a></div>');
        }.bind(this));
      },

      positionArrows: function() {
        topPx = (document.documentElement.clientHeight - 30) / 2;
        $('.navigate').css("top", topPx);
        this.btnNext.css("right", 2);
        this.btnPrev.css("left", 2);
      },

      showNext: function(e) {
        e.preventDefault();
        var currentCoupons = this.couponList.find('.active');
        var lastId = this.couponList.find('li').length-1;
        var nextId = parseInt(currentCoupons.last().attr('data-id')) + 1;
        currentCoupons.removeClass('active').addClass('is-hidden');

        var startId = (nextId > lastId) ? 0 : nextId;

        if(this.qtyToDisplay > 1)
          var target = this.couponList.find('li').slice(startId, startId+3);
        else
          var target = this.couponList.find('li[data-id=' + startId + ']');

        target.removeClass('is-hidden').addClass('active');
      },

      showPrev: function(e) {
        e.preventDefault();
        var currentCoupons = this.couponList.find('.active');
        var allCoupons = this.couponList.find('li');
        var totalCoupons = allCoupons.length;
        var prevId = parseInt(currentCoupons.first().attr('data-id')) - 1;
        currentCoupons.removeClass('active').addClass('is-hidden');

        if(this.qtyToDisplay > 1) {
          var diff = (totalCoupons % 3 == 0) ? 3 : totalCoupons % 3;
          var target = (prevId < 0) ? allCoupons.slice(totalCoupons-diff) : allCoupons.slice(prevId-2, prevId+1);
        }
        else {
          targetId = (prevId < 0) ? totalCoupons - 1 : prevId;
          var target = this.couponList.find('li[data-id=' + targetId + ']');
        }

        target.removeClass('is-hidden').addClass('active');
      }
    }

    HOPSTER.Coupons.init();

  });

})(window, document);
