/**
 * Created by sohamchakraborty on 10/13/15.
 */
(function (){
    'use strict';

    angular
        .module('plunker')
        .controller('navbarController', navbarController);


    function navbarController(voteGuruService, navbarService) {


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
            return navbarService.showLogin();
        }

        function showSignup() {
            return navbarService.showSignup();
        }

        function showSettingsOrLogout() {
            return navbarService.showSettingsOrLogout();
        }
    }

})();
