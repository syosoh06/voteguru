/**
 * Created by sohamchakraborty on 10/27/15.
 */
(function(){
    'use strict';

    angular
        .module('plunker')
        .factory('newPollService', newPollService);

    function newPollService(){
        return {

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

            addOneMoreOption : function(selectedPollObj){
                selectedPollObj.Options.push({option: "", votes: 0});
                return selectedPollObj;
            }
        }
    }


})();