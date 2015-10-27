/**
 * Created by sohamchakraborty on 10/27/15.
 */
(function (){
    'use strict';

    angular
        .module('plunker')
        .factory('votingPageService', votingPageService);


    function votingPageService(myPollsPageService){
        return {

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

                this.pushNameToAlreadyVotedArray(poll, obj);
                this.reduceVotesIfAlreadyVoted(poll);

                return poll;
            },

            pushNameToAlreadyVotedArray: function(poll, obj){
                if(poll.alreadyVoted)
                    poll.alreadyVoted.push(obj);
                else {
                    poll.alreadyVoted = [];
                    poll.alreadyVoted.push(obj);
                }

                return poll;
            },

            reduceVotesIfAlreadyVoted: function(poll){

                var len = poll.alreadyVoted.length;
                if(len>1){
                    for(var i = 0; i<len-1; i++){
                        if(poll.alreadyVoted[i].username === poll.alreadyVoted[i+1].username){
                            myPollsPageService.reduceVotes(poll.alreadyVoted[i].option, poll);
                            poll.alreadyVoted.splice(i,1);
                            break;
                        }
                    }
                }
                return poll;

            }

        }
    }

})();