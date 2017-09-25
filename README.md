# Introduction

Provides a service that will place a "loading" spinner at the center of the 
page and gray out the background.

Depends on font-awesome.

Demo [Here](https://lth.bright-things.com/angular-loading)

# Install

This module can be installed with npm

    npm install anagular-loading-lbthomsen --save

# Use

1. Load angular-loading

    <script src="node-modules/angular-loading/angular-loading.js"/>

2. Inject into your Angular application

    var app = angular.module("app", [
        'angular-loading'
    ]);

3. Toggle loading indicator from any controller

    $scope.$emit("setLoading");
    $scope.$emit("resetLoading");
