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
            checkIfUsernameExists: function (userFormData, data) {
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    if (data[i].username === userFormData.username) {
                        this.setErrorMessage("Username already exists - Please choose a different name");
                        return true;
                    }
                }
                return false;
            },
            setErrorMessage: function (message) {
                errorMessage = message;
            },
            getErrorMessage: function () {
                return errorMessage;
            },
            validateForm: function (form) {
                if (form.$invalid) {

                    this.setErrorMessage("Please enter your details in order to proceed");
                    return false;
                }
                else {
                    return true;
                }
            },
            loadBarDataForGraphs: function (data, labels) {
                var barData = {};
                barData.labels = labels;
                barData.datasets = [];
                barData.datasets[0] = {};
                barData.datasets[0].data = data;
                return barData;
            },
            setNewPollFlagIfEnteringHomePage: function () {
                if (((this.getFromState() === 'login') || (this.getFromState() === 'signup')) && (this.getToState() === 'usersHomePage')) {
                    this.setNewPollFlag(true);
                }
            },
            showSignup: function () {
                if (toState === 'home' || toState === 'login') {
                    return true;
                }
                else {
                    return false;
                }
            },
            showLogin: function () {
                if (toState === 'home' || toState === 'signup') {
                    return true;
                }
                else {
                    return false;
                }
            },
            showSettingsOrLogout: function () {
                if (toState === 'home' || toState === 'signup' || toState === 'login') {
                    return false;
                }
                else {
                    return true;
                }
            },
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
            getSinglePoll: function (id, poll) {
                var url = ('//localhost:8080/api/polls/' + id).toString();
                return $http.get( url, poll);
            },
            setNewPollFlag: function(flag){
                createNewPoll = flag;
            },
            getNewPollFlag: function(){
                return createNewPoll;
            },

            deletePoll: function(poll){
                var url = ('//localhost:8080/api/polls/' + poll._id).toString();
                return $http.delete( url, poll);
            },


            getAllPolls: function(){
                return $http.get('//localhost:8080/api/polls');
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
                var url = ('//localhost:8080/api/polls/' + id).toString();
                return $http.put( url, poll);
            },
            addPoll: function(poll){
                return $http.post('//localhost:8080/api/polls', poll);
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
                return $http.get('//localhost:8080/api/users');
            },

            create: function(formData){
                return $http.post('//localhost:8080/api/users', formData);
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
                var url = ('//localhost:8080/api/users/' + id).toString();
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

            submitPolls: function(optionSelected, poll){
                var len= poll.Options.length;
                for(var i=0; i<len; i++){
                    if(optionSelected === poll.Options[i].option){
                        poll.Options[i].votes++;
                    }
                }
                return poll;
            },

            getSingleUser: function(id, userdata){
                var url = ('//localhost:8080/api/users/' + id).toString();
                return $http.get(url, userdata);
            }
        }

    }
})();







