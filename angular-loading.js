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

            that.setIcon = function (icon) {
                that.icon = icon;
            };

            that.$get = ["$log", "$rootScope",
                function ($log, $rootScope) {
                    $log.debug("LoadingService: starting");

                    var me = {
                        icon: that.icon, 
                        isLoading: false,
                        setLoading: function(loading) {
                            me.isLoading = loading;
                        }
                    };

                    return me;

                }
            ];

        }
    ]);
    
    module.directive("loading", ["$log", 
        function($log) {
            return {
                restrict: 'E', 
                controller: ["$log", "LoadingService", 
                    function($log, loadingService) {
                        $log.debug("LoadingController: starting");
                        var that = this;
                        that.loadingService = loadingService;
                        
                    }
                ], 
                controllerAs: "loadingCtrl", 
                template: '<div class="loading" ng-show="loadingCtrl.loadingService.isLoading" style="position: absolute; z-index: 10; width: 100%; height: 100%; opacity: 0.5;"><span class="fa {{loadingCtrl.loadingService.icon}} fa-spin fa-3x fa-fw"></span></div>', 
                replace: true
            };
        }
    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */