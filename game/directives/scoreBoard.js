angular.module('myApp', [])
    .directive('scoreBoard', function () {
        return {
            transclude: true,
            restrict: 'EA',
            template: ` <div ng-transclude></div>
                    <div class="scoreTime">
                        <div class="scoreTimeBox">
                            <div>
                                <span>LEVEL 1 SCORE: </span><p ng-bind = "score.level1"></p>
                                <span>LEVEL 1 TIME: </span><p ng-bind = "score.time1 +' s'"></p>
                            </div>
                        </div>
                         
                        <div class="scoreTimeBox">
                             <div>
                                <span>LEVEL 2 SCORE: </span><p ng-bind = "score.level2"></p>
                                <span>LEVEL 2 TIME: </span><p ng-bind = "score.time2 +' s'"></p>
                            </div>
                        </div> 
                        <div class="scoreTimeBox">
                            <div>
                                <span>LEVEL 3 SCORE: </span><p ng-bind = "score.level3"></p>
                                <span>LEVEL 3 TIME: </span><p ng-bind = "score.time3 +' s'"></p>
                            </div>
                        </div> 
                    </div>
                    <div class="levelButton">
                    <button class="btn btn-warning" ng-click = "level_1()" ng-disabled = "coordinates.level == 1">LEVEL 1</button>
                    <button class="btn btn-warning" ng-click = "level_2()" ng-disabled = "coordinates.level == 2">LEVEL 2</button>
                    <button class="btn btn-warning" ng-click = "level_3()" ng-disabled = "coordinates.level == 3">LEVEL 3</button>
                    </div>
                    `,
            controller: function ($scope, $interval) {
                $scope.coordinates = {};
                $scope.crashed = false;
                var time1record, time2record, time3record;
                $scope.score = {
                    level1: 0, time1: 0,
                    level2: 0, time2: 0,
                    level3: 0, time3: 0
                }

                $scope.hurdel_1 = [[0, 0], [0, 1], [0, 4], [0, 5], [0, 8], [0, 9], [0, 12], [1, 2], [1, 3], [1, 6], [1, 7], [1, 10], [1, 11], [1, 14]];
                $scope.hurdel_2 = [[0, 0], [0, 2], [2, 0], [2, 2], [2, 4], [4, 2], [4, 4]];
                $scope.hurdel_3 = [[0, 1], [0, 3], [1, 0], [1, 2], [1, 4], [2, 1], [2, 2], [2, 3], [3, 0], [3, 2], [3, 4], [4, 1], [4, 3]];

                $scope.$on('gameFinished',function(event,param){
                    console.log(param);
                     if(param == 1){
                        $interval.cancel(time1record);
						console.log(param + " canceled")
                     }
                     if(param == 2){
                        $interval.cancel(time2record);
						 console.log(param + " canceled")
                     }
                     if(param == 3){
						 console.log(param + " canceled")
                        $interval.cancel(time3record);
                     }
                })

                $scope.level_1 = function () {
                    $scope.coordinates['level'] = 1;
                    $scope.score["level1"] = 0 ; $scope.score["time1"] = 0;
                    $interval.cancel(time2record);
                    $interval.cancel(time3record);
                    time1record = $interval(function () {       
                        $scope.score['time1']++ }, 1000);
                }

                $scope.level_2 = function () {
                    $scope.coordinates['level'] = 2;
                    $scope.score["level2"] = 0 ; $scope.score["time2"] = 0;
                    $interval.cancel(time1record);
                    $interval.cancel(time3record);
                    time2record = $interval(function () { $scope.score['time2']++ }, 500)
                }

                $scope.level_3 = function () {
                    $interval.cancel(time1record);
                    $interval.cancel(time2record);
                    $scope.coordinates['level'] = 3;
                    $scope.score["level3"] = 0 ; $scope.score["time3"] = 0;
                    time3record = $interval(function () { $scope.score['time3']++ }, 500)
                }

                $scope.$on('scoreCheck', function (event, param) {

                    $scope.coordinates['x_coord'] = param['xcoord'];
                    $scope.coordinates['y_coord'] = param['ycoord'];

                    $scope.crashed = false;
                    if ($scope.coordinates['level'] == 1) {
                        for (let m = 0; m < $scope.hurdel_1.length; m++) {
                            if (param['ycoord'] == $scope.hurdel_1[m][0] && param['xcoord'] == $scope.hurdel_1[m][1]) {
                                $scope.crashed = true;
                                $interval.cancel(time1record);
                            }
                        }
                        $scope.score['level1'] = $scope.coordinates['x_coord'] * 10;
                    }

                    if ($scope.coordinates['level'] == 2) {
                        for (let m = 0; m < $scope.hurdel_2.length; m++) {
                            if (param['ycoord'] == $scope.hurdel_2[m][0] && param['xcoord'] == $scope.hurdel_2[m][1]) {
                                $scope.crashed = true;
                                $interval.cancel(time2record);
                            }
                        }
                        $scope.score['level2'] = $scope.coordinates['x_coord'] * 10;
                    }

                    if ($scope.coordinates['level'] == 3) {
                        for (let m = 0; m < $scope.hurdel_3.length; m++) {
                            if (param['ycoord'] == $scope.hurdel_3[m][0] && param['xcoord'] == $scope.hurdel_3[m][1]) {
                                $scope.crashed = true;
                                $interval.cancel(time3record);
                            }
                        }
                        $scope.score['level3'] = $scope.coordinates['x_coord'] * 10;
                    }
                })
            }

        };
    })