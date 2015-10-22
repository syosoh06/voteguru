/**
 * Created by sohamchakraborty on 10/13/15.
 */
(function (){
    'use strict';

    angular
        .module('plunker')
        .controller('votingPageController', votingPageController);


    function votingPageController($scope, $http, $state, voteGuruService) {


        var vm = this;

        vm.activate = activate;
        vm.optionSelected = "";
        vm.submit = submit;

        function submit(){
            voteGuruService.submitPolls(vm.optionSelected, vm.poll );
            //voteGuruService.updateUserWithPollVotes(vm.poll, vm.user);
            voteGuruService.updatePoll(vm.poll._id, vm.poll).success(function(data){

                voteGuruService.getSinglePoll(vm.poll).success(function(data){
                    vm.optionSelected = "";
                    voteGuruService.setPollForGraphs(data);
                    $state.go('graphPage');
                })

            })
        }

        activate();

        function activate(){
            console.log("voting page controller activated");
            //vm.user = voteGuruService.getUser();
            vm.poll = voteGuruService.getPollForVotingPage();
            // this just is a poll object containing the options and name
        }


    }

})();




