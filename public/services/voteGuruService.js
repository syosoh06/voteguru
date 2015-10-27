/**
 * Created by sohamchakraborty on 10/12/15.
 */
/**
 * Created by sohamchakraborty on 10/5/15.
 */
(function (){
    'use strict';

    angular
        .module('plunker')
        .factory('voteGuruService', voteGuruService);

    voteGuruService.$inject = ['$http'];

    function voteGuruService($http){

        var users=[];
        var user = {};
        var createNewPoll = false;

        var filterPollsByUsername = function(username, allPolls){
            var len=allPolls.length;
            var myPolls = [];
            for(var i=0; i<len; i++){
                if(allPolls[i].username === username){
                    myPolls.push(allPolls[i]);
                }
            }
            return myPolls;
        };

        var pollForVotingPage = {};
        var oldPoll = {};
        var toState, fromState;
        var showAllPolls;
        var pollForGraphs;
        var errorMessage = "";



        return {

            setNewPollFlagIfEnteringHomePage: function () {
                if (((this.getFromState() === 'login') || (this.getFromState() === 'signup')) && (this.getToState() === 'usersHomePage')) {
                    this.setNewPollFlag(true);
                }
            },


            setPollForGraphs: function(poll){
                pollForGraphs=poll;
            },
            getPollForGraphs: function(){
                return pollForGraphs;
            },

            getshowAllPollsFlag: function(){
                return showAllPolls;
            },
            setshowAllPollsFlag: function(flag){
                showAllPolls = flag;
            },
            getSinglePoll: function (id, poll) {
                var url = ('/api/polls/' + id).toString();
                return $http.get( url, poll);
            },
            setNewPollFlag: function(flag){
                createNewPoll = flag;
            },
            getNewPollFlag: function(){
                return createNewPoll;
            },

            deletePoll: function(poll){
                var url = ('/api/polls/' + poll._id).toString();
                return $http.delete( url, poll);
            },


            getAllPolls: function(){
                return $http.get('/api/polls');
            },

            getMyPolls: function( data, username){
                var myPolls=[];

                var allPolls = data;

                myPolls = filterPollsByUsername(username, allPolls);

                return myPolls;


            },

            setPollForNewPollPage: function(){
                if((fromState === 'myPollsPage' || fromState === 'allVotesPage') && this.getNewPollFlag() === false){
                    var poll = this.getPollToBeRetrievedInNewPollsPage();
                }
                else{
                    var poll = this.createPolls();
                }
                return poll;
            },

            setToState: function(state){
                toState = state;
            },
            getToState: function(){
                return toState;
            },
            setFromState: function(state){
                fromState = state;
            },
            getFromState: function(){
                return fromState;
            },
            updatePoll: function(id, poll){
                var url = ('/api/polls/' + id).toString();
                return $http.put( url, poll);
            },
            addPoll: function(poll){
                return $http.post('/api/polls', poll);
            },

            deleteOption: function(arrayOfOptions, index){
                var len= arrayOfOptions.length;
                if(len-1 !== index){
                    var temp = arrayOfOptions[len-1];
                    arrayOfOptions[len-1]=arrayOfOptions[index];
                    arrayOfOptions[index]=temp;
                    arrayOfOptions.pop();
                }
                else{
                    arrayOfOptions.pop();
                }
                return arrayOfOptions;
            },
            setPollToBeRetrievedInNewPollsPage: function(poll){
                oldPoll = poll;
            },

            getPollToBeRetrievedInNewPollsPage: function(){
                return oldPoll;
            },

            getUser: function(){
                return user;
            },

            setUser: function(userInfo){
                user = userInfo;
            },

            get: function(){
                return $http.get('/api/users');
                //return $http.get('//localhost:8080/api/users');
            },

            create: function(formData){
                return $http.post('/api/users', formData);
            },

            validate: function(formData, data){
                var len = data.length;
                var validation = false;
                for(var i=0; i<len; i++){
                    if (data[i].username === formData.username && data[i].password === formData.password) {
                        validation = true;
                        this.setUser(data[i]);
                    }

                }
                return validation;
            },

            createPolls: function(){

                var pollObj = {};
                pollObj.name = "";
                pollObj.Options = [{option: "", votes: 0},{option: "", votes: 0}];
                return pollObj;


            },

            update: function(id, userData){
                var url = ('/api/users/' + id).toString();
                return $http.put( url, userData);
            },

            addOneMoreOption : function(selectedPollObj){
                selectedPollObj.Options.push({option: "", votes: 0});
                return selectedPollObj;
            },

            setPollForVotingPage: function(selectedPoll){
                pollForVotingPage = selectedPoll;
            },

            getPollForVotingPage: function(){
                return pollForVotingPage;
            },

            submitPolls: function(optionSelected, poll, user){
                var len= poll.Options.length;
                for(var i=0; i<len; i++){
                    if(optionSelected === poll.Options[i].option){
                        poll.Options[i].votes++;
                    }
                }

                var obj = {};
                obj.username = user.username;
                obj.option = optionSelected;
                poll.alreadyVoted.push(obj);


                return poll;
            },

            getSingleUser: function(id, userdata){
                var url = ('/api/users/' + id).toString();
                return $http.get(url, userdata);
            }



        }

    }
})();
