'use strict';

var $apiEndpoint  = 'https://api.themoviedb.org/3/movie/',
    $apiKey = '549d9cee00ec185e5af7b4b4815a65ba',
    $error_noData = 'Uups! No connection to the database.',
    $moviesData, // Used to store data for debugging [TODO: remove in production, also from listController.js:37 ]
    $singleData; // Used to store data for debugging [TODO: remove in production, also from singleController.js:55 ]


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
        .when( '/movies', {
          controller: 'listController',
          templateUrl: 'js/views/main.html'
        })
        .when('/movies/:movieId', {
          controller: 'singleController',
          templateUrl: 'js/views/single.html'
        })

      $routeProvider.otherwise( {'redirectTo': '/movies'} );
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
