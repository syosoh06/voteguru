/**
 * Created by sohamchakraborty on 10/14/15.
 */
(function (){
    'use strict';

    angular
        .module('plunker')
        .controller('usersHomePageMidbarController', usersHomePageMidbarController);


    function usersHomePageMidbarController($state, voteGuruService, $rootScope) {


        var vm = this;

        vm.activate = activate;
        vm.goToNewPolls=goToNewPolls;
        vm.goToMyPolls=goToMyPolls;
        vm.goToAllPolls=goToAllPolls;

        activate();

        function goToNewPolls(){
            voteGuruService.setNewPollFlag(true);
            //setSelectedPoll();
            //$state.go('usersHomePage');
            $rootScope.$broadcast('createNewPoll');
        }

        function goToMyPolls(){
            if(voteGuruService.getToState() === 'myPollsPage'){
                voteGuruService.setshowAllPollsFlag(false);
                $rootScope.$broadcast('viewOnlyMyPolls');
            }
            else {
                voteGuruService.setshowAllPollsFlag(false);
                $state.go('myPollsPage');
            }

        }

        function goToAllPolls(){
            if(voteGuruService.getToState() === 'myPollsPage'){
                voteGuruService.setshowAllPollsFlag(false);
                $rootScope.$broadcast('viewAllPolls');
            }
            else {
                voteGuruService.setshowAllPollsFlag(true);
                $state.go('myPollsPage');
            }

        }

        function activate(){
            console.log("users home page midbar controller activated");

        }


    }

})();