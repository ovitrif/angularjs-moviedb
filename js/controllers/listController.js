'use strict';

/* Popular Movies Controller */

movieApp.controller( 'listController', ['$scope', '$http', '$routeParams',
  function ($scope, $http, $routeParams) {

    var page = 0,
        $url = $apiEndpoint,
        $date = new Date();
    $scope.moviesList = [];

    // Set up URL and Page Heading
    switch ($routeParams.page) {
      case 'now-playing':
        $url += 'movie/now_playing';
        $scope.pageHeading = 'Now Playing in Theaters';
        break;
      case 'top-box-office':
        $url += 'discover/movie?primary_release_year='+$date.getFullYear()+'&sort_by=revenue.desc';
        $scope.pageHeading = 'Highest Grossing Movies of 2015';
        break;
      case 'top-rated':
        $url += 'movie/top_rated';
        $scope.pageHeading = 'Top Rated Movies';
        break;
      default:
        $url += 'movie/popular';
        $scope.pageHeading = 'Popular Movies';
    }

    $scope.getMoviesList = function() {

      var $responsePromise;

      // Get data from API
      $responsePromise = $http({
        method: 'GET',
        url: $url,
        params: {
          api_key: $apiKey,
          page: ++page
        }
       });

      // Process requestss
      $responsePromise.then(
        function successCallback(response) {

          // Pagination Setup
          page = response.data.page;
          // Append new movies to the list
          $scope.moviesList.push.apply( $scope.moviesList, response.data.results );

          window.$moviesData = $scope.moviesList; // TODO: delete in production

        }, function errorCallback() {
          console.error( $error_noData );
        }
      );
    }

    // Calling the function
    $scope.getMoviesList();
  }
])
