/**
 * Created by soham chakraborty on 10/14/15.
 */
(function (){
    'use strict';

    angular
        .module('plunker')
        .controller('newPollController', newPollController);


    function newPollController($scope, $http, $state, voteGuruService, $rootScope) {


        var vm = this;

        vm.activate = activate;
        //vm.polls = [];
        vm.submit = submit;
        vm.addMoreOptions = addMoreOptions;
        vm.deleteOption = deleteOption;

        //vm.selectedPoll={};

        $rootScope.$on('createNewPoll', function () {
            setSelectedPoll();
        });


        function deleteOption(index){
            voteGuruService.deleteOption(vm.selectedPoll.Options, index);
        }


        activate();

        /*function getSingleUser(id, user){
            voteGuruService.getSingleUser(id, user).success(function(data){
                vm.userInfo = data;
                //console.log(vm.user);
                if(vm.userInfo.polls){
                    vm.polls = vm.userInfo.polls;
                }

                if(vm.userInfo.toBeEdited === true){
                    vm.selectedPoll = voteGuruService.setSelectedPollForEditing(vm.userInfo.pollNameToBeEdited, vm.userInfo);
                    voteGuruService.setOldPoll(vm.selectedPoll);
                }
                else{
                    vm.selectedPoll = voteGuruService.createPolls();
                }

            });
        }*/

        function setSelectedPoll(){
            vm.selectedPoll=voteGuruService.setPollForNewPollPage();
        }

        function activate(){
            console.log("users controller activated");

            /*var user = voteGuruService.getUser();
            var id =user._id;
            getSingleUser(id, user);*/
            setSelectedPoll();

        }

        function addMoreOptions(){
            voteGuruService.addOneMoreOption(vm.selectedPoll);
        }

        function addPolls(){
            vm.selectedPoll.username = voteGuruService.getUser().username;
                voteGuruService.addPoll(vm.selectedPoll).success(function(data){
                voteGuruService.setPollForVotingPage(vm.selectedPoll);
                voteGuruService.setPollToBeRetrievedInNewPollsPage({});
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
            if(voteGuruService.getFromState() === 'myPollsPage' || voteGuruService.getFromState() === 'allVotesPage')
            updatePolls();
            else
            addPolls();

            /*voteGuruService.updateUserInfoBeforeSubmitting(vm.userInfo, vm.selectedPoll);
            voteGuruService.update(vm.userInfo._id, vm.userInfo).success(function(data){

            })*/
        }




    }

})();