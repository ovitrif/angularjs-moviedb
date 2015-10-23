'use strict';

var $apiEndpoint = 'https://api.themoviedb.org/3/movie/popular?api_key=549d9cee00ec185e5af7b4b4815a65ba',
    $error_noData = 'Uups! No connection to the database.',
    $moviesData; // Used to store data for debugging [TODO: remove in production, also from popularController.js:22 ]


// Angular App
var movieApp = angular.module( 'movieApp', ['ngRoute', 'ngAnimate'] );

// Configuration and routing
movieApp
  .config( ['$httpProvider',
    function ($httpProvider) {

      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

    }
  ])
  .config( ['$routeProvider',
    function ($routeProvider) {

      $routeProvider
        .when( '/', {
          controller: 'popularController',
          templateUrl: 'js/views/popularView.html'
        })

      $routeProvider.otherwise( {'redirectTo': '/'} );
    }
  ]);


// jQuery
(function($){
  'use strict';

  // Change navbar opacity on scroll
  $(window).scroll( function( event ) {

    var $nav = $('#main-navbar');
    if ( $(document).scrollTop() > 50 ) {
      $nav
        .addClass('scrolled');
    } else {
      $nav
        .removeClass('scrolled');
    }

  });

  // more

})(jQuery);
