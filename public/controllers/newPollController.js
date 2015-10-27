/**
 * Created by soham chakraborty on 10/14/15.
 */
(function (){
    'use strict';

    angular
        .module('plunker')
        .controller('newPollController', newPollController);


    function newPollController($state, voteGuruService, $rootScope, newPollService) {


        var vm = this;

        vm.activate = activate;
        //vm.polls = [];
        vm.submit = submit;
        vm.addMoreOptions = addMoreOptions;
        vm.deleteOption = deleteOption;

        //vm.selectedPoll={};

        $rootScope.$on('createNewPoll', function () {
            voteGuruService.setNewPollFlag(true);
            $state.go('usersHomePage');
            //setSelectedPoll();
        });


        function deleteOption(index){
            newPollService.deleteOption(vm.selectedPoll.Options, index);
        }


        activate();

        function setSelectedPoll(){
            vm.selectedPoll=voteGuruService.setPollForNewPollPage();
        }

        function activate(){
            console.log("users controller activated");
            voteGuruService.setNewPollFlagIfEnteringHomePage();
            setSelectedPoll();

        }

        function addMoreOptions(){
            newPollService.addOneMoreOption(vm.selectedPoll);
        }

        function addPolls(){
            vm.selectedPoll.username = voteGuruService.getUser().username;
            voteGuruService.addPoll(vm.selectedPoll).success(function(data){
                voteGuruService.setPollForVotingPage(data.pollAdded);
                voteGuruService.setPollToBeRetrievedInNewPollsPage({});
                voteGuruService.setNewPollFlag(false);
                vm.selectedPoll = {};
                $state.go('votingPage');
            });
        }

        function updatePolls(){

            voteGuruService.updatePoll(vm.selectedPoll._id, vm.selectedPoll).success(function(data){
                voteGuruService.setPollForVotingPage(vm.selectedPoll);
                voteGuruService.setPollToBeRetrievedInNewPollsPage({});
                vm.selectedPoll = {};
                $state.go('votingPage');
            })
        }

        function submit(){
            // vm.polls is an array of poll objects
            // selectedPoll is just the poll object which will be added to the array of polls
            if (voteGuruService.getNewPollFlag() === false) {
                updatePolls();
            }
            else {
                addPolls();
            }

        }




    }

})();