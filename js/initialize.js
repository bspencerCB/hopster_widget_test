var _comscore = _comscore || [];
_comscore.push({ c1: "2", c2: "23500416" });

(function (window, document) {

  window.HOPSTER = window.HOPSTER || {}

  HOPSTER.Frame = {

    init: function() {
      this.currentScript = document.querySelector('script[data-id="hpcpn-cb-init-script-bl-654d8fb8328876fc20e5fcfd32f610ec"]');
      this.params = this.currentScript.getAttribute('src').split('?')[1].split('&');

      this.buildiFrame();
      this.buildComscoreScript();
    },

    buildiFrame: function() {
      var params = {};
      for (i = 1, length = this.params.length; i < length; i++) {
        var pair = this.params[i].split('=');
        params[pair[0]] = pair[1];
      }

      var container = document.getElementById('hpcpn-cb-widget-bl-479da006be77b16fc6f394133974a66d');

      if (params.width)
        var fWidth = params.width;
      else if (container.offsetWidth < 300)
        var fWidth = '99%';
      else
        var fWidth = '300';

      var fHeight = (params.height) ? params.height : '285';

      var a = document.createElement('a');
      a.href = this.currentScript.getAttribute('src');
      var root = 'coupons.html?';
      var host = (a.hostname) ? ('//' + a.hostname + '/' + root) : root;
      var queryStr = params.cat ? host + this.params[0] + '?cat=' + params.cat : host + this.params[0];
      document.getElementById('hpcpn-cb-widget-bl-479da006be77b16fc6f394133974a66d').innerHTML = '<iframe style="border-color:#cccccc; border-style:solid; border-width:1px; background-color:#ffffff" src="' + queryStr + '" width="' + fWidth + '" height="' + fHeight + '" scrolling="no"></iframe>';
    },

    buildComscoreScript: function() {
      var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
      s.src = "https://sb.scorecardresearch.com/beacon.js";

      var img = document.createElement("img"); ns = document.createElement("noscript");
      img.src = "https://sb.scorecardresearch.com/p?c1=2&c2=23500416&cv=2.0&cj=1";
      ns.appendChild(img);

      var newElems = [s, ns];
      newElems.forEach(function(element) {
        el.parentNode.insertBefore(element, el);
      });
    }

  }

  HOPSTER.Frame.init();

})(window, document);