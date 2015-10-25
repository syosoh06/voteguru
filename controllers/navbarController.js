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
        vm.showLogin = showLogin;
        vm.showSignup = showSignup;

        activate();

        function activate(){
            console.log("navbar controller activated");
            vm.user = voteGuruService.getUser();
            // just getting user info
        }

        function showLogin() {
            return voteGuruService.showLogin();
        }

        function showSignup() {
            return voteGuruService.showSignup();
        }

        function showSettingsOrLogout() {
            return voteGuruService.showSettingsOrLogout();
        }
    }

})();




