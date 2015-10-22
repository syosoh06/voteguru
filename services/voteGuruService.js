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

        return {
            loadGraphData: function(){
                var data = [];
                var poll = this.getPollForGraphs();
                var len = poll.Options.length;
                for(var i=0; i<len; i++){
                    data.push(poll.Options[i].votes);
                }
                return data;
            },
            loadGraphLabels: function(){
                var labels = [];
                var poll = this.getPollForGraphs();
                var len = poll.Options.length;
                for(var i=0; i<len; i++){
                    labels.push(poll.Options[i].option);
                }
                return labels;
            },
            setPollForGraphs: function(poll){
                pollForGraphs=poll;
            },
            getPollForGraphs: function(){
                return pollForGraphs;
            },
            hideDeleteButton: function (poll) {
                var username = this.getUser().username;
                if(poll.username === username){
                    return false;
                }
                else{
                    return true;
                }
            },
            getshowAllPollsFlag: function(){
                return showAllPolls;
            },
            setshowAllPollsFlag: function(flag){
                showAllPolls = flag;
            },
            getSinglePoll: function(poll){
                var url = ('http://localhost:8080/api/polls/'+poll._id).toString();
                return $http.get( url, poll);
            },
            setNewPollFlag: function(flag){
                createNewPoll = flag;
            },
            getNewPollFlag: function(){
                return createNewPoll;
            },

            deletePoll: function(poll){
                var url = ('http://localhost:8080/api/polls/'+poll._id).toString();
                return $http.delete( url, poll);
            },


            getAllPolls: function(){
                return $http.get('http://localhost:8080/api/polls');
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
                var url = ('http://localhost:8080/api/polls/'+id).toString();
                return $http.put( url, poll);
            },
            addPoll: function(poll){
                return $http.post('http://localhost:8080/api/polls', poll);
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

            updateUserInfoBeforeSubmitting: function(userInfo , selectedPoll){
                this.deletePoll( this.getOldPoll(), userInfo.polls);
                userInfo.polls.push(selectedPoll);
                userInfo.toBeEdited = false;
                userInfo.pollNameToBeEdited = "";
                return userInfo;
            },

            setSelectedPollForEditing: function(name, user){
                var len = user.polls.length;
                var index;
                for(var i=0; i<len; i++){
                    if(user.polls[i].name === name)
                    {
                        index=i;
                        break;
                    }
                }
                return user.polls[index];
            },

            addEditPollNameAndSetEditFieldToTrue: function(pollObj, user){
                user.pollNameToBeEdited = pollObj.name;
                user.toBeEdited = true;
                return user;
            },

            /*deletePoll: function(pollObj, arrayOfPolls){
                if(arrayOfPolls){
                    var indexToBeDeleted, temp;
                    var len = arrayOfPolls.length;
                    for(var i=0; i<len; i++){
                        if(arrayOfPolls[i].name === pollObj.name){
                            indexToBeDeleted = i;
                            break;
                        }
                    }
                    if((len-1)!==indexToBeDeleted){
                        temp = arrayOfPolls[len-1];
                        arrayOfPolls[len-1]=arrayOfPolls[indexToBeDeleted];
                        arrayOfPolls[indexToBeDeleted]=temp;
                        arrayOfPolls.pop();
                    }
                    else{
                        arrayOfPolls.pop();
                    }

                }
                return arrayOfPolls;
            },*/

            getUser: function(){
                return user;
            },

            setUser: function(userInfo){
                user = userInfo;
            },

            get: function(){
                return $http.get('http://localhost:8080/api/users');
            },

            create: function(formData){
                return $http.post('http://localhost:8080/api/users', formData);
            },

            validate: function(formData, data){
                var len = data.length;
                var validation = false;
                for(var i=0; i<len; i++){
                    if(data[i].username === formData.username && data[i].password === formData.username){
                        validation = true;
                        this.setUser(data[i]);
                    }

                }
            return validation;
            },

            setUsers: function(usersArray){
                users = usersArray;
            },

            getUsers: function(){
                return users;
            },

            createPolls: function(){

                var pollObj = {};
                pollObj.name = "";
                pollObj.Options = [{option: "", votes: 0},{option: "", votes: 0}];
                return pollObj;


            },

            update: function(id, userData){
                var url = ('http://localhost:8080/api/users/'+id).toString();
                return $http.put( url, userData);
            },

            addOneMoreOption : function(selectedPollObj){
                selectedPollObj.Options.push({option: "", votes: 0});
                return selectedPollObj;
            },

            copySelectedPoll : function(selectedPoll, pollsArray){
                if(pollsArray) {
                pollsArray.push(selectedPoll);
                }
                return pollsArray;
            },

            setPollForVotingPage: function(selectedPoll){
                pollForVotingPage = selectedPoll;
            },

            getPollForVotingPage: function(){
                return pollForVotingPage;
            },

            submitPolls: function(optionSelected, poll){
                var len= poll.Options.length;
                for(var i=0; i<len; i++){
                    if(optionSelected === poll.Options[i].option){
                        poll.Options[i].votes++;
                    }
                }
                return poll;
            },

            updateUserWithPollVotes: function(poll, user){
                var len = user.polls.length;
                for(var i =0; i<len; i++){
                    if(user.polls[i].name === poll.name){
                        user.polls[i]=poll;
                        break;
                    }
                }
                return user;
            },

            getSingleUser: function(id, userdata){
                var url = ('http://localhost:8080/api/users/'+id).toString();
                return $http.get(url, userdata);
            }
        }

    }
})();







