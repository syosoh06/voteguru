angular
    .module('plunker')
    .run(function ($state,$rootScope) {
        $rootScope.$state = $state;
    })