/**
 * Created by sohamchakraborty on 10/12/15.
 */
(function (){
    'use strict';

    angular
        .module('plunker')
        .controller('mainController', mainController);


    function mainController($rootScope, voteGuruService) {


        var vm = this;

        vm.activate = activate;

        activate();

        function activate(){

        }

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                // do something
                console.log("to state", toState);
                voteGuruService.setToState(toState.name);
                console.log("from state", fromState);
                voteGuruService.setFromState(fromState.name);
            });

    }

})();




