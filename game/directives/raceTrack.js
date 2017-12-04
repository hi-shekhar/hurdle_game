angular.module('myApp')
    .directive('raceTrack', function () {
        return {
            transclude: true,
            scope: {
                pathCoord: '@'
            },
            template: `<div  ng-class= "{'routeTable1': 1  == level , 'routeTable2': 2 == level || 3  == level }">
                            <table class="table" id="road">
                                <tr ng-repeat="lane in lanes">
                                    <td  class="text-center" ng-repeat="block in blocks"></td>
                                </tr>
                            </table>
                        </div>
                        <div ng-transclude></div>`,
            controller: function ($scope, $timeout, $interval) {
                var vm = this;
                var hurdle = "<img src='assets/images/stone.jpg'>";
                var player = "<img src='assets/images/player.gif'>";
                var destination = "<img src='assets/images/destination.jpg'>"; 
                var speed = 1000;
                $scope.level;
                $scope.trackDetails = {
                    1: [lanes = [1, 2], blocks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]],
                    2: [lanes = [1, 2, 3, 4, 5], blocks = [1, 2, 3, 4, 5]],
                    3: [lanes = [1, 2, 3, 4, 5], blocks = [1, 2, 3, 4, 5]]
                }
                function trackreset() {
                    for (let m = 0; m < $scope.lanes.length; m++) {
                        for (let n = 0; n < $scope.blocks.length; n++) {
                            document.getElementById('road').rows[m].cells[n].innerHTML = "";
                        }
                    }
                }
                $scope.$watch('level', function (newLevel) {
                    if (newLevel) {
                        $scope.lanes = $scope.trackDetails[newLevel][0];
                        $scope.blocks = $scope.trackDetails[newLevel][1];
                    }
                    switch (newLevel) {
                        case 1: $timeout(function () {
                            trackreset();
                            let resetX = 0, resetY = 0;
                            vm.pathCtrlX = 0;
                            vm.pathCtrlY = 1;
                            for (let i = 0, j = 2; i < 15, j < 15;) {
                                document.getElementById('road').rows[0].cells[i].innerHTML = hurdle;
                                document.getElementById('road').rows[0].cells[14].innerHTML = destination;
                                resetX++ , resetY++;
                                if (resetX == 2) {
                                    i = i + 3;
                                    resetX = 0;
                                }
                                else {
                                    i++;
                                }
                                if (resetY == 1 || resetY == 2) {
                                    document.getElementById('road').rows[1].cells[j].innerHTML = hurdle;
                                    j++;
                                    if (resetY == 2) {
                                        resetY = 0;
                                        j = j + 2;
                                    }
                                }
                            }

                            document.getElementById('road').rows[vm.pathCtrlY].cells[vm.pathCtrlX].innerHTML = player;
                        })

                            break;
                        case 2:
                            $timeout(function () {
                                trackreset();
                                let resetX = 0, resetY = 0;
                                vm.pathCtrlX = 0;
                                vm.pathCtrlY = 4;
                                for (let i = 0; i < 5; i++) {
                                    for (let j = 0; j < 5; j++) {
                                        if (i % 2 == 0 && j % 2 == 0 && Math.abs(i - j) != 4) {
                                            document.getElementById('road').rows[i].cells[j].innerHTML = hurdle;
                                            document.getElementById('road').rows[0].cells[4].innerHTML = destination;
                                        }
                                    }
                                }

                                document.getElementById('road').rows[vm.pathCtrlY].cells[vm.pathCtrlX].innerHTML = player;
                            })
                            break;

                        case 3:
                            $timeout(function () {
                                trackreset();
                                let resetX = 0, resetY = 0;
                                vm.pathCtrlX = 0;
                                vm.pathCtrlY = 4;
                                for (let i = 0; i < 5; i++) {
                                    for (let j = 0; j < 5; j++) {
                                        if ((i + j) % 2 != 0 || (i == 2 && j == 2)) {
                                            document.getElementById('road').rows[i].cells[j].innerHTML = hurdle;
                                            document.getElementById('road').rows[0].cells[4].innerHTML = destination;
                                        }
                                    }
                                }

                                document.getElementById('road').rows[vm.pathCtrlY].cells[vm.pathCtrlX].innerHTML = player;
                            })
                            break;
                    }
                })
            },
            link: function (scope, elem, attr) {
                attr.$observe('pathCoord', function (newCord) {
                    updatedCoord = JSON.parse(newCord);
                    scope.level = updatedCoord.level;
                })

            }
        };
    })