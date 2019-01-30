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
            that.overlayOpacity = 0.3;
            that.frameOpacity = 0.9;
            that.frameBorderRadius = "10px";

            that.setIcon = function (icon) {
                that.icon = icon;
            };

            that.setOverlayOpacity = function (opacity) {
                that.overlayOpacity = opacity;
            };

            that.setFrameOpacity = function(opacity) {
                that.frameOpacity = opacity;
            };

            that.setFrameBorderRadius = function(frameBorderRadius) {
                that.frameBorderRadius = frameBorderRadius;
            };

            that.$get = ["$log", "$rootScope", 
                function ($log, $rootScope) {
                    $log.debug("LoadingService: starting");

                    var me = {
                        icon: that.icon, 
                        overlayOpacity: that.overlayOpacity, 
                        frameOpacity: that.frameOpacity, 
                        frameBorderRadius: that.frameBorderRadius,
                        isLoading: false,
                        setLoading: function (loading) {
                            me.isLoading = loading;
                        }
                    };
                    
                    $rootScope.$on("setLoading", function() {
                        me.isLoading = true;
                    });
                    
                    $rootScope.$on("resetLoading", function() {
                        me.isLoading = false;
                    });

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
                template: '<div class="loading" ng-show="loadingCtrl.loadingService.isLoading" style="margin: 0; background: rgba(0, 0, 0, {{::loadingCtrl.loadingService.overlayOpacity}}); position: fixed; top: 0px; left: 0px; z-index: 10099; width: 100%; height: 100%; display: flex;"><div style="display: flex; border-radius: {{::loadingCtrl.loadingService.frameBorderRadius}}; background: rgba(0, 0, 0, {{::loadingCtrl.loadingService.frameOpacity}}); color: white; padding: 2em 3em 2em 3em; margin: auto"><span class="fa {{::loadingCtrl.loadingService.icon}} fa-spin fa-3x fa-fw"></span></div></div>', 
                replace: true
            };
        }
    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */
