/**
 * Created by sohamchakraborty on 10/13/15.
 */
(function (){
    'use strict';

    angular
        .module('plunker')
        .controller('navbarController', navbarController);


    function navbarController($scope, $http, $state, voteGuruService) {


        var vm = this;

        vm.activate = activate;

        vm.user = {};
        vm.showSettingsOrLogout = showSettingsOrLogout;
        vm.showLoginOrSignup = showLoginOrSignup;

        activate();

        function activate(){
            console.log("navbar controller activated");
            vm.user = voteGuruService.getUser();
            // just getting user info
        }

        function showLoginOrSignup() {
            return voteGuruService.showLoginOrSignup();
        }

        function showSettingsOrLogout() {
            return voteGuruService.showSettingsOrLogout();
        }
    }

})();




