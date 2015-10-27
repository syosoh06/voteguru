/**
 * Created by sohamchakraborty on 10/27/15.
 */
/**
 * Created by sohamchakraborty on 10/27/15.
 */
(function (){
    'use strict';

    angular
        .module('plunker')
        .factory('myPollsPageService', myPollsPageService);

    //graphService.$inject = ['$http'];

    function myPollsPageService(voteGuruService){

        return {

            editAlreadyVotedArray: function(poll, username){
                var len=poll.alreadyVoted.length;
                if(poll.alreadyVoted[len-1].username === username){
                    poll = this.reduceVotes(poll.alreadyVoted[len-1].option, poll);
                    poll.alreadyVoted.pop();
                }
                else {
                    for(var i=0; i<len; i++){
                        if(poll.alreadyVoted[i].username === user.username){
                            poll.alreadyVoted[i] = poll.alreadyVoted[len-1];
                            poll = this.reduceVotes(poll.alreadyVoted[i].option, poll);
                            poll.alreadyVoted.pop();
                        }
                    }
                }
                return poll;
            },

            checkIfAlreadyVoted: function(user, poll){
                var len=poll.alreadyVoted.length;
                for(var i=0; i<len; i++){
                    if(poll.alreadyVoted[i].username === user.username){
                        return true;
                    }
                }
                return false;
            },
            reduceVotes: function(option, poll){
                var len= poll.Options.length;
                for(var i=0; i<len; i++){
                    if(option === poll.Options[i].option){
                        poll.Options[i].votes--;
                    }
                }
                return poll;
            },
            hideDeleteButton: function (poll) {
                var username = voteGuruService.getUser().username;
                if(poll.username === username){
                    return false;
                }
                else{
                    return true;
                }
            }
        }




    }
})();