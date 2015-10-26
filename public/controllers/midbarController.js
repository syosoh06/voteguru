/**
 * Created by sohamchakraborty on 10/13/15.
 */
(function (){
    'use strict';

    angular
        .module('plunker')
        .controller('midbarController', midbarController);


    function midbarController($state) {


        var vm = this;

        vm.activate = activate;
        vm.signup = signup;

        function signup(){
            $state.go('signup');
        }

        activate();

        function activate(){
            console.log("midbar controller activated");

        }
    }

})();




