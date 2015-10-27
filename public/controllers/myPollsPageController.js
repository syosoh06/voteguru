/**
 * Created by sohamchakraborty on 10/14/15.
 */
(function (){
    'use strict';

    angular
        .module('plunker')
        .controller('myPollsPageController', myPollsPageController);


    function myPollsPageController($state, voteGuruService, $rootScope, myPollsPageService) {


        var vm = this;

        vm.activate = activate;
        vm.deletePoll = deletePoll;
        vm.editPoll = editPoll;
        vm.polls=[];
        vm.getOnlyMyPolls = getOnlyMyPolls;
        vm.hideDeleteButton= hideDeleteButton;
        vm.vote = vote;
        vm.viewResults=viewResults;

        vm.voteAgain = voteAgain;
        vm.closeDuplicateVoteModal=closeDuplicateVoteModal;

        function voteAgain(){
            var poll = myPollsPageService.editAlreadyVotedArray(vm.pollToBeVoted, vm.user.username);
            //vote(poll);
            goToVotingPage(poll);
            closeDuplicateVoteModal();
        }

        function closeDuplicateVoteModal(){
            vm.displayModalFlag = false;
        }


        function goToVotingPage(poll){
            voteGuruService.setPollForVotingPage(poll);
            voteGuruService.setPollToBeRetrievedInNewPollsPage({});
            $state.go('votingPage');
        }

        function vote(poll){
            vm.pollToBeVoted = poll;
            vm.displayModalFlag = myPollsPageService.checkIfAlreadyVoted(vm.user, poll);
            if(vm.displayModalFlag === false){
                goToVotingPage(poll);
            }

        }

        function viewResults(poll){
            voteGuruService.getSinglePoll(poll._id, poll).success(function (data) {
                voteGuruService.setPollForGraphs(data);
                $state.go('graphPage');
            })

        }

        $rootScope.$on('viewOnlyMyPolls', function () {
            getOnlyMyPolls();
        });

        $rootScope.$on('viewAllPolls', function () {
            showAllPolls();
        });

        function hideDeleteButton(poll){
            return myPollsPageService.hideDeleteButton(poll);
        }

        function showAllPolls(){
            voteGuruService.getAllPolls().success(function(data){
                vm.polls = data;
            });
        }

        function getOnlyMyPolls(){

            voteGuruService.getAllPolls().success(function(data){
                vm.polls = voteGuruService.getMyPolls(data, voteGuruService.getUser().username);
            });
        }

        activate();

        function deletePoll(pollObj){
            voteGuruService.deletePoll(pollObj).success(function(data){
                activate();
            })
        }

        function editPoll(pollObj){
            voteGuruService.setNewPollFlag(false);
            voteGuruService.getSinglePoll(pollObj._id, pollObj).success(function(data){
                voteGuruService.setPollToBeRetrievedInNewPollsPage(data);
                $state.go('usersHomePage');
            })

        }

        function activate(){
            console.log("my polls page controller activated");
            vm.user = voteGuruService.getUser();
            vm.displayModalFlag = false;
            if(voteGuruService.getshowAllPollsFlag() === true){
                showAllPolls();
            }
            else{
                getOnlyMyPolls();
            }

        }


    }

})();