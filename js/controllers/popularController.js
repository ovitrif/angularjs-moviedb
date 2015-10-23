movieApp.controller( 'popularController', ['$scope', '$http',
  function ($scope, $http) {

    var page = 0;
    $scope.moviesList = [];

    $scope.getMoviesList = function() {

      var url = $apiEndpoint + '&page=' + ++page;

      // Get data from API
      $responsePromise = $http({ method: 'GET', url: url });
      $responsePromise
        .success(function (data, status, headers, config) {

          if (status==200) {
            // Pagination Setup
            page = data.page;
            // Append new movies to the list
            $scope.moviesList.push.apply( $scope.moviesList, data.results );

            window.$moviesData = $scope.moviesList; // TODO: delete in production
          } else {
            console.error( $error_noData );
          };

        })
        .error(function (data, status, headers, config) {
          console.error( $error_noData );
        });
    };

    // Calling the function
    $scope.getMoviesList();

  }
])
