document.head = document.head ||
document.getElementsByTagName('head')[0];
var link = document.createElement('link');
link.id = 'dynamic-favicon';
link.rel = 'icon';
link.href = 'ressources/images/c98c28f13736.png';
document.head.appendChild(link);
var $clicked = null;
var onRecaptchaSubmit = function(token){
	$clicked.off('valid.fndtn.abide').off('submit');
	$clicked.submit();
}
var myCall = function(e, $idxForm){
	$clicked = $(e.target);	
	grecaptcha.execute($idxForm);
}

var getFormIndex = function($formId, $form){
	var index = 0 ;
	if($formId > 0){
		$ ('form:has(.g-recaptcha)').each(function(idx) {
			if ( $ (this).is($form) ){
				index = idx ;
			}
		});
	}
	return index ;
}

$(function(){
	$('form:has(.g-recaptcha)').on('valid.fndtn.abide',function(e){
		var $formId = (typeof $(this).find('input[name="fideo"]') !== "undefined") ? $(this).find('input[name="fideo"]').val() : 0 ;
		if (typeof $formId == "undefined"){
			$formId = 0;
		}
		var $idxForm = getFormIndex($formId, $ (this));
		myCall(e, $idxForm);
	})
	.on('invalid.fndtn.abide',function(e){
		grecaptcha.reset();
	})
	.on('submit',function(e){
		e.preventDefault();
		return false;
	});
});

function verifierEtat(checkbox){
                    $(checkbox).each(function(){ 
                        if($(this).prop("checked")===true){ 
                            $(checkbox).removeAttr("required"); 
                            return false; 
                        }else{ 
                            $(checkbox).attr("required", true); 
                        } 
                    }); 
                }
$(window).on("load", function() {
                var chkboxname = "input[name='formtag0-rgpd-check-1[]']"; 
                var attribu = $(chkboxname).attr("required");
                if( attribu !== undefined && attribu !== false) {
                  verifierEtat(chkboxname);
                  $(chkboxname).on("change",function() {
                    verifierEtat(chkboxname);
                  });
                } 
            });
        
$(window).on("load", function() {
                var chkboxname = "input[name='formtag1-rgpd-check-1[]']"; 
                var attribu = $(chkboxname).attr("required");
                if( attribu !== undefined && attribu !== false) {
                  verifierEtat(chkboxname);
                  $(chkboxname).on("change",function() {
                    verifierEtat(chkboxname);
                  });
                } 
            });
        
var hasIntersectionObserver = false;

if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
  hasIntersectionObserver = true;
}

var IdeoMapUtils = {
  Icons: {
    spritesheets: {
      baseUrl: document.getElementById('publicPath').value + '/integration/assets/img/',
      black: 'maps-icons.png',
      blue: 'maps-icons2.png',
      green: 'maps-icons3.png',
      orange: 'maps-icons4.png',
      red: 'maps-icons5.png',
      turkish: 'maps-icons6.png',
      white: 'maps-icons7.png',
      yellow: 'maps-icons8.png'
    },
    shapes: {
      standard: {origin: {x: 2, y: 54}, size: {width: 22, height: 30}},
      thin: {origin: {x: 2, y: 24}, size: {width: 20, height: 30}},
      big: {origin: {x: 2, y: 112}, size: {width: 26, height: 30}},
      'no-circle': {origin: {x: 2, y: 84}, size: {width: 24, height: 28}},
      needle: {origin: {x: 22, y: 26}, size: {width: 19, height: 28}},
      'split-bubble': {origin: {x: 28, y: 112}, size: {width: 21, height: 30}},
      comma: {origin: {x: 24, y: 55}, size: {width: 20, height: 29}},
      flag: {origin: {x: 26, y: 84}, size: {width: 21, height: 28}},
      circle: {origin: {x: 2, y: 2}, size: {width: 22, height: 22}},
      triangle: {origin: {x: 24, y: 4}, size: {width: 24, height: 22}}
    },
    getIcon: function (iconClass, color) {
      if (this.spritesheets[color] && this.shapes[iconClass]) {
        var icon = {url: this.spritesheets.baseUrl + this.spritesheets[color]}
        $.extend(icon, this.shapes[iconClass]);
        icon.size = new google.maps.Size(icon.size.width, icon.size.height, 'px', 'px');
        icon.anchor = {x: icon.size.width / 2, y: icon.size.height}
        return icon;
      }
    }
  },
  Styles: {colors: [
      {
      }
    ],
    bw: [
      {
        "stylers": [
          {"saturation": -100}
        ]
      }
    ]
  }
}

var IdeoMap = function(mapName){
  if (typeof(IdeoMap.maplist) === 'undefined')
      IdeoMap.maplist = {};
  IdeoMap.maplist[mapName] = this;
  var mapEntity = this;
  this.mapType = google.maps.MapTypeId.ROADMAP;
  this.markers = [];
  this.infowindows = [];
  this.map = null;
  this.zoom = 16;
  this.markerCount = 0;
  this.infoCount = 0;
  this.center = new google.maps.LatLng(0, 0);
  this.directionsDisplay = null;
  this.centered = false;
  this.bounds = null;
  IdeoMap.get = function(name){
      if (typeof(IdeoMap.maplist[name]) === 'undefined')
          return null;
      return IdeoMap.maplist[name];
  };
  // Initialisation de la carte
  this.initialize = function (options) {
    var htmlId = options.item;
    var mpStyles = [];

    if (options.mapType)
      this.mapType = this.checkMapType(options.mapType);
    if (options.zoom)
      this.zoom = options.zoom;
    //not defined!!!!
    if (options.center)
      this.center = new google.maps.LatLng(options.center.lat, options.center.lng);
    if (options.background == 'bw') {
      mpStyles = [
        {
          featureType: 'all',
          stylers: [
            {saturation: -100},
            {lightness: 0},
            {gamma: 0.5}
          ]
        }
      ]
    }

    this.map = new google.maps.Map(document.getElementById(htmlId), {
      zoom: this.zoom,
      center: this.center,
      mapTypeId: this.mapType,
      mapTypeControl: false,
      scaleControl: true,
      styles: mpStyles
    });
    return this;
  };
  this.checkMapType = function (type) {
    switch (type) {
      case 'Satellite':
      case 'SATELLITE':
        return google.maps.MapTypeId.SATELLITE;
        break;
      case 'PlanSatellite':
      case 'HYBRID':
        return google.maps.MapTypeId.HYBRID;
        break;
      default :
        return google.maps.MapTypeId.ROADMAP;
    }
  };
  this.addMarkerByPosition = function (marker, textInfo, showValue, zoom, pointer, pointerColor) {
    var show = showValue === true || showValue === 'Oui';
    var label = {};
    if (!pointer)
    {
      pointer = 'standard';
      pointerColor = 'blue';
    }
    if (marker.label)
      label = marker.label;

    var mk = new google.maps.Marker({
      position: new google.maps.LatLng(marker.lat, marker.lng),
      map: this.map,
      icon: IdeoMapUtils.Icons.getIcon(pointer, pointerColor)
    });

    var info = undefined;
    if (textInfo)
      info = new google.maps.InfoWindow({
        content: '<div class="infowindow">' + textInfo + '</div>'
      });
    this.markers[this.markerCount] = {marker: mk,
      infoWindow: info};

    latLng = new google.maps.LatLng(marker.lat, marker.lng);
    if (!this.bounds)
      this.bounds = new google.maps.LatLngBounds(latLng, latLng);
    else
      this.bounds.extend(latLng);

    if (this.markers.length > 1) {
      // Si plusieurs markers => calcul du center des bounds
      this.map.fitBounds(this.bounds);
      this.map.setCenter(this.bounds.getCenter());
      
    }
    else {
      // Si un seul marker => setCenter normal
      this.center = latLng;
      this.map.setCenter(latLng);
    }

    //open infowindow on tiles load, only once, if show = true
    var currentMap = this.map;
    var tilesloadedHandle = google.maps.event.addListener(this.map, 'tilesloaded', function() {
      if (show) {
        show = false;
        google.maps.event.removeListener(tilesloadedHandle);
        info.open(currentMap, mk);
      }
    });
    //open infowindow on click
    google.maps.event.addListener(mk, 'click', function() {
      info.open(this.map,mk);
    });

    this.markerCount++;
    return mk;
  };
  this.addAddress = function (config, address, coords, pointer, pointerColor, showValue) {
    var marker = config;
    var textInfo =  '<div class="infowindow-container">'
                  + '<div class="place-name">' + config.name + '</div>'
                  + '<div class="address">' + config.address + ' </div>'
                  + (config.phone ? ('<div class="phone">' + config.phone + '</div>') : '')
                  + (config.email ? ('<div class="email"><a href="mailto:' + config.email + '">' + config.email + '</a></div>') : '')
                  + (config.website ? ('<div class="website"><a href="' + config.website + '" target="_blank">' + config.website + '</a></div>') : '')
                  + '</div>';
    var label = {};
    if (typeof (showValue) === 'undefined')
      showValue = false;

    marker.address = address;

    if (coords && coords.lng && coords.lat) {
      marker.lng = coords.lng;
      marker.lat = coords.lat;
    }

    if (marker.lat && marker.lng) {
      this.addMarkerByPosition(marker, textInfo, showValue, this.zoom, pointer, pointerColor);
      return;
    }

    (function (marker) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': marker.address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          marker.lat = results[0].geometry.location.lat();
          marker.lng = results[0].geometry.location.lng();
          mapEntity.addMarkerByPosition(marker, textInfo, showValue, this.zoom, pointer, pointerColor);
        }
      });

    })(marker);
  };
};
/*!
 * addresses.1.js
 * Generated PlanAcces01 JS file
 */
google.maps.event.addDomListener(window, 'load', function(){

	var Mp = new IdeoMap('map_BLOCK_4GV6K1CMV7_5e3c1ac4bc959'),
		mapsOptions = {
		    'item' : 'gmap_map_BLOCK_4GV6K1CMV7_5e3c1ac4bc959',
		    'zoom' : 15,
		    'mapType' : 'ROADMAP',
		    'background' : 'colors'
		},
		mapEl = document.getElementById('map_BLOCK_4GV6K1CMV7_5e3c1ac4bc959'),
		gmap_map_BLOCK_4GV6K1CMV7_5e3c1ac4bc959,
		observer;

	if( hasIntersectionObserver ) {

		observer = new IntersectionObserver(
		  function(entries, self) {
		    var isIntersecting = typeof entries[0].isIntersecting === 'boolean' ? entries[0].isIntersecting : entries[0].intersectionRatio > 0;
		    if (isIntersecting) {
		    	gmap_map_BLOCK_4GV6K1CMV7_5e3c1ac4bc959 = Mp.initialize( mapsOptions );
		    	gmap_map_BLOCK_4GV6K1CMV7_5e3c1ac4bc959.addAddress({"name":"Eurotech Security","address":"17 Rue Des Pavillons, 93100 MONTREUIL SOUS BOIS","city":"MONTREUIL SOUS BOIS","country":"","zip":"93100","rawAddress":"","website":"","email":"","phone":""},"17 Rue Des Pavillons, 93100 MONTREUIL SOUS BOIS",{"lng":2.4556823,"lat":48.8704011}, 'standard', 'red', true);

		    	self.unobserve( mapEl );
		    }
		  },{rootMargin: '100px', threshold: 0});

		observer.observe( mapEl );

	} else {
		gmap_map_BLOCK_4GV6K1CMV7_5e3c1ac4bc959 = Mp.initialize( mapsOptions );
		gmap_map_BLOCK_4GV6K1CMV7_5e3c1ac4bc959.addAddress({"name":"Eurotech Security","address":"17 Rue Des Pavillons, 93100 MONTREUIL SOUS BOIS","city":"MONTREUIL SOUS BOIS","country":"","zip":"93100","rawAddress":"","website":"","email":"","phone":""},"17 Rue Des Pavillons, 93100 MONTREUIL SOUS BOIS",{"lng":2.4556823,"lat":48.8704011}, 'standard', 'red', true);
	}

});
