'use strict';

/* Single Movie Page Controller */

movieApp.controller( 'singleController', ['$scope', '$http', '$routeParams',
  function ($scope, $http, $routeParams) {

    var url = $apiEndpoint + $routeParams.movieId,
        $responsePromise;
    $scope.movieData = [];

    // Get data from API
    $responsePromise = $http({
      method: 'GET',
      url: url,
      params: {
        api_key: $apiKey
      }
     });

    // TODO: use new method (the current one is deprecated)
    // SEE:  //code.angularjs.org/1.4.7/docs/api/ng/service/$http#deprecation-notice
    $responsePromise
      .success(function (data, status, headers, config) {

        var $genresList = '';

        if (status==200) {
          // Add movie data to scope
          $scope.movieData = data;

          /**
           * Translate values to human-readable format
           */
          // Translate genres
          for (var i = 0; i < $scope.movieData.genres.length; i++) {
            $genresList += $scope.movieData.genres[i].name + ', ';
          };
          $scope.movieData.genres = $genresList.slice(0, $genresList.length-2);

          // Translate popularity
          $scope.movieData.popularity = $scope.movieData.popularity.toFixed(1);

          // Translate monetary values
          $scope.movieData.budget = $scope.movieData.budget.toFixed(1)
            .replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
          $scope.movieData.revenue = $scope.movieData.revenue.toFixed(1)
            .replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

          // Translate time
          $scope.movieData.runtime =
            Math.floor( $scope.movieData.runtime / 60 ) * 1 + ' hours ' +
            ( $scope.movieData.runtime % 60 ) + ' minutes';

          window.$singleData = data; // TODO: delete in production
        } else {
          console.error( $error_noData );
        };

      })
      .error(function (data, status, headers, config) {
        console.error( $error_noData );
      });

  }
])
