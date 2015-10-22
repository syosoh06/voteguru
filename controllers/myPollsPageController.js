/**
 * Created by sohamchakraborty on 10/14/15.
 */
(function (){
    'use strict';

    angular
        .module('plunker')
        .controller('myPollsPageController', myPollsPageController);


    function myPollsPageController($scope, $http, $state, voteGuruService, $rootScope) {


        var vm = this;

        vm.activate = activate;
        vm.deletePoll = deletePoll;
        vm.editPoll = editPoll;
        vm.polls=[];
        vm.getOnlyMyPolls = getOnlyMyPolls;
        vm.hideDeleteButton= hideDeleteButton;
        vm.vote = vote;
        vm.viewResults=viewResults;

        function vote(poll){
            voteGuruService.setPollForVotingPage(poll);
            voteGuruService.setPollToBeRetrievedInNewPollsPage({});
            $state.go('votingPage');
        }

        function viewResults(poll){
            voteGuruService.getSinglePoll(poll).success(function(data){
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
            return voteGuruService.hideDeleteButton(poll);
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
                getOnlyMyPolls();
            })
        }

        function editPoll(pollObj){
            voteGuruService.setNewPollFlag(false);
            voteGuruService.getSinglePoll(pollObj).success(function(data){
                voteGuruService.setPollToBeRetrievedInNewPollsPage(data);
                $state.go('usersHomePage');
            })

        }

        function activate(){
            console.log("my polls page controller activated");
            if(voteGuruService.getshowAllPollsFlag() === true){
                showAllPolls();
            }
            else{
                getOnlyMyPolls();
            }

        }


    }

})();