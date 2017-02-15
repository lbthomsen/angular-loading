/*
 * Angular Loading Module
 * 
 * Copyright 2017 by Lars Boegild Thomsen <lbthomsen@gmail.com>
 * 
 */
(function () {

    var module = angular.module("angular-loading", []);

    module.provider("LoadingService", [
        function () {

            var that = this;

            that.icon = "fa-spinner";
            that.overlayOpacity = 0.2;
            that.framed = true;
            that.frameOpacity = 0.9;
            that.frameBorderRadius = 10;
            that.color = "white";

            that.setIcon = function (icon) {
                that.icon = icon;
            };

            that.setOverlayOpacity = function (opacity) {
                that.overlayOpacity = opacity;
            };

            that.setFramed = function (framed) {
                that.framed = framed;
            };

            that.setFrameOpacity = function (opacity) {
                that.frameOpacity = opacity;
            };

            that.setFrameBorderRadius = function (radius) {
                that.frameBorderRadius = radius;
            };

            that.setColor = function (color) {
                that.color = color;
            };

            that.$get = ["$log",
                function ($log) {
                    $log.debug("LoadingService: starting");

                    var me = {
                        icon: that.icon,
                        overlayOpacity: that.overlayOpacity,
                        framed: that.framed,
                        frameOpacity: that.frameOpacity,
                        frameBorderRadius: that.frameBorderRadius,
                        color: that.color,
                        isLoading: false,
                        setLoading: function (loading) {
                            me.isLoading = loading;
                        }
                    };

                    return me;

                }
            ];

        }
    ]);

    module.directive("loading", ["$log",
        function ($log) {
            return {
                restrict: 'E',
                controller: ["$log", "LoadingService",
                    function ($log, loadingService) {
                        $log.debug("LoadingController: starting");
                        var that = this;
                        that.loadingService = loadingService;

                    }
                ],
                controllerAs: "loadingCtrl",
                template: '<div class="loading" ng-show="loadingCtrl.loadingService.isLoading" style="margin: 0; background: rgba(0, 0, 0, {{::loadingCtrl.loadingService.overlayOpacity}}); position: fixed; top: 0px; left: 0px; z-index: 99; width: 100%; height: 100%; display: flex;"><div style="display: flex; border-radius: 10px; background: rgba(0, 0, 0, 0.8); color: white; padding: 2em 3em 2em 3em; margin: auto"><span class="fa {{::loadingCtrl.loadingService.icon}} fa-spin fa-3x fa-fw"></span></div></div>',
                replace: true
            };
        }
    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */