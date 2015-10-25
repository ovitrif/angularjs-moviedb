'use strict';

/* Single Movie Page Controller */

movieApp.controller( 'singleController', ['$scope', '$http', '$routeParams',
  function ($scope, $http, $routeParams) {

    var url = $apiEndpoint + 'movie/' + $routeParams.movieId,
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

    // Process requests
    $responsePromise.then(
      function successCallback(response) {

        var $genresList = '';

        // Add movie data to scope
        $scope.movieData = response.data;

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

      }, function errorCallback() {
        console.error( $error_noData );
      }
    );
  }
])
