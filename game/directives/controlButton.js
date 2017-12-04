angular.module('myApp')

    .directive('controlButton', function () {
        return {

            restrict: 'E',
            $scope: {
                nextLevel: '@',
                crashed: '@'
            },
            require: '^raceTrack',
            template: `<div class="btn-group">
                            <div class="text-center" style="margin-bottom: 2px;">
                                <button type="button" class="btn btn-primary" ng-click="move(7)">LEFT UP <span class="glyphicon glyphicon-bishop" aria-hidden="true"></span></button>
                                <button type="button" class="btn btn-primary" ng-click="move(8)">UP <span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></button>
                                <button type="button" class="btn btn-primary" ng-click="move(9)">RIGHT UP <span class="glyphicon glyphicon-bishop" aria-hidden="true"></span></button>
                            </div>
                            <div>
                                <button type="button" class="btn btn-primary" ng-click="move(4)">LEFT <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></button>
                                <button type="button" class="btn btn-primary">GAME ON <span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span></button>
                                <button type="button" class="btn btn-primary" ng-click="move(6)">RIGHT<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button>
                            </div>
                            <div class="text-center" style="margin-top:2px;">
                                <button type="button" class="btn btn-primary" ng-click="move(1)">LEFT DOWN <span class="glyphicon glyphicon-bishop" aria-hidden="true"></span></button>
                                <button type="button" class="btn btn-primary" ng-click="move(2)">DOWN <span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></button>
                                <button type="button" class="btn btn-primary" ng-click="move(3)">RIGHT DOWN <span class="glyphicon glyphicon-bishop" aria-hidden="true"></span></button>
                            </div>

                            <div class="buttonCover" ng-class=" {'removeCover' : pathComplete}">
                                <div class="text">Control Button</div>
                            </div>
                        </div>`,
            link: function (scope, elem, attr, trackCtrl) {
                var playerCoordinates = {};
                var player = "<img src='assets/images/player.gif' width='46' height='46'>";
                var fail = "<img src='assets/images/fail.jpg' width='46' height='46'>";
                var done = "<img src='assets/images/done.jpg' width='46' height='46'>";
                scope.pathComplete = false;
                scope.controlStage;
                var fineshedLevel;
                attr.$observe('nextLevel', function (pram) {
                    if (pram == undefined || pram == "") {
                        scope.pathComplete = true;
                    }
                    else if (pram == '1' || pram == '2' || pram == '3') {
                        scope.pathComplete = false;
                        scope.controlStage = +pram;
                    }

                })
                scope.move = function (value) {
                    valueResult = {
                        8: 'up', 38: 'up',
                        4: 'left', 37: 'left',
                        6: 'right', 39: 'right',
                        2: 'down', 40: 'down',
                        7: 'leftUp', 81: 'leftUp',
                        9: 'rightUp', 69: 'rightUp',
                        1: 'leftDown', 65: 'leftDown',
                        3: 'rightDown', 68: 'rightDown'
                    }
                    scope.$emit('pathChange', valueResult[value]);
                }


                angular.element(document).bind('keyup', function (e) {
                    if (!scope.pathComplete) {
                        scope.move(e.keyCode);
                    }

                })

                scope.$on('pathChange', function (event, param) {
                    document.getElementById('road').rows[trackCtrl.pathCtrlY].cells[trackCtrl.pathCtrlX].innerHTML = " ";

                    if (param == 'up') {
                        --trackCtrl.pathCtrlY;
                        console.log(trackCtrl.pathCtrlY);
                    }
                    else if (param == 'down') {
                        ++trackCtrl.pathCtrlY;
                    }
                    else if (param == 'right') {
                        ++trackCtrl.pathCtrlX;
                    }
                    else if (param == 'left') {
                        --trackCtrl.pathCtrlX;
                    }
                    else if (param == 'leftUp') {
                        --trackCtrl.pathCtrlX; trackCtrl.pathCtrlY--;
                    }
                    else if (param == 'rightUp') {
                        ++trackCtrl.pathCtrlX; trackCtrl.pathCtrlY--;
                    }
                    else if (param == 'leftDown') {
                        --trackCtrl.pathCtrlX; trackCtrl.pathCtrlY++;
                    }
                    else if (param == 'rightDown') {
                        ++trackCtrl.pathCtrlX; trackCtrl.pathCtrlY++;
                    }

                    if (scope.controlStage == 1) {
                        if (trackCtrl.pathCtrlY > 1) {
                            trackCtrl.pathCtrlY = 1;
                        }
                        else if (trackCtrl.pathCtrlY < 0) {
                            trackCtrl.pathCtrlY = 0;
                        }
                        if (trackCtrl.pathCtrlX < 0) {
                            trackCtrl.pathCtrlX = 0;
                        }
                    }

                    else if (scope.controlStage > 1) {
                        if (trackCtrl.pathCtrlY > 4) {
                            trackCtrl.pathCtrlY = 4;
                        }
                        else if (trackCtrl.pathCtrlY < 0) {
                            trackCtrl.pathCtrlY = 0;
                        }

                        if (trackCtrl.pathCtrlX < 0) {
                            trackCtrl.pathCtrlX = 0;
                        }
                        else if (trackCtrl.pathCtrlX > 4) {
                            trackCtrl.pathCtrlX = 4;
                        }
                    }

                    if (trackCtrl.pathCtrlY != undefined || trackCtrl.pathCtrlX != undefined) {
                        document.getElementById('road').rows[trackCtrl.pathCtrlY].cells[trackCtrl.pathCtrlX].innerHTML = player;
                    }

                    playerCoordinates["ycoord"] = trackCtrl.pathCtrlY;
                    playerCoordinates["xcoord"] = trackCtrl.pathCtrlX;
                    scope.$emit('scoreCheck', playerCoordinates);


                    if (scope.controlStage == 1) {
                        if (trackCtrl.pathCtrlX == 14 || scope.crashed) {
                            scope.pathComplete = true;
                            fineshedLevel = scope.controlStage;
                            scope.$emit('gameFinished',fineshedLevel);
                            if (scope.crashed) {
                                document.getElementById('road').rows[trackCtrl.pathCtrlY].cells[trackCtrl.pathCtrlX].innerHTML = fail;
                            }
                            else {
                                document.getElementById('road').rows[trackCtrl.pathCtrlY].cells[trackCtrl.pathCtrlX].innerHTML = done;
                            }
                        }
                    }
                    else if (scope.controlStage > 1) {
                        if ((trackCtrl.pathCtrlX == 4 && trackCtrl.pathCtrlY == 0) || scope.crashed) {
                            scope.pathComplete = true;
							fineshedLevel = scope.controlStage;
                            scope.$emit('gameFinished',fineshedLevel);
                            if (scope.crashed) {
                                document.getElementById('road').rows[trackCtrl.pathCtrlY].cells[trackCtrl.pathCtrlX].innerHTML = fail;
                            }
                            else {
                                document.getElementById('road').rows[trackCtrl.pathCtrlY].cells[trackCtrl.pathCtrlX].innerHTML = done;
                            }
                        }
                    }

                })
            }
        };
    });