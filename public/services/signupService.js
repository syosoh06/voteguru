/**
 * Created by sohamchakraborty on 10/27/15.
 */
(function  (){
    'use strict';

    angular
        .module('plunker')
        .factory('signupService', signupService);

    function signupService(voteGuruService){
        var errorMessage = "";

        return {

            validateForm: function (form) {
                if (form.$invalid) {

                    this.setErrorMessage("Please enter your details in order to proceed");
                    return false;
                }
                else {
                    return true;
                }
            },

            setErrorMessage: function (message) {
                errorMessage = message;
            },
            getErrorMessage: function () {
                return errorMessage;
            },

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

            validate: function(formData, data) {
                var len = data.length;
                var validation = false;
                for (var i = 0; i < len; i++) {
                    if (data[i].username === formData.username && data[i].password === formData.password) {
                        validation = true;
                        voteGuruService.setUser(data[i]);
                    }

                }
                return validation;
            }

        }


    }


})();