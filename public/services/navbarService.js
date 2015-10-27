/**
 * Created by sohamchakraborty on 10/27/15.
 */
(function(){
    'use strict';

    angular
        .module('plunker')
        .factory('navbarService', ['voteGuruService', function (voteGuruService){

            return{

                showSignup: function () {
                    if (voteGuruService.getToState() === 'home' || voteGuruService.getToState() === 'login') {
                        return true;
                    }
                    else {
                        return false;
                    }
                },
                showLogin: function () {
                    if (voteGuruService.getToState() === 'home' || voteGuruService.getToState() === 'signup') {
                        return true;
                    }
                    else {
                        return false;
                    }
                },
                showSettingsOrLogout: function () {
                    if (voteGuruService.getToState() === 'home' || voteGuruService.getToState() === 'signup' || voteGuruService.getToState() === 'login') {
                        return false;
                    }
                    else {
                        return true;
                    }
                }


            }
        }] );




})();