(function (){
    'use strict';

    angular
        .module('plunker')
        .controller('signupController', signupController);


    function signupController($state, voteGuruService, signupService) {


        var vm = this;

        vm.activate = activate;
        vm.login=login;
        vm.signup = signup;
        vm.userFormData = {};
        vm.closeErrorMessage = closeErrorMessage;

        activate();

        function activate(){
            console.log("sign up controller activated");
            vm.errorMessage = "";
        }

        function closeErrorMessage() {
            vm.errorMessage = "";
        }

        function login(){

            if (signupService.validateForm(vm.loginOrSignupForm) === true) {
                voteGuruService.get().success(function (data) {
                    console.log('list of users', data);
                    var validation = signupService.validate(vm.userFormData, data);
                    //voteGuruService.setUser(data.user);
                    changeState(validation);
                })
            }
            else {
                vm.errorMessage = signupService.getErrorMessage();
            }

        }

        function changeState(val){
            if(val === true) {
                voteGuruService.setNewPollFlag(true);
                $state.go('usersHomePage');
            }
            else {
                vm.errorMessage = "Username / Password does not exist"
            }

        }

        function signup(){

            if (signupService.validateForm(vm.loginOrSignupForm) === true) {
                checkUserName();
            }
            else {
                vm.errorMessage = signupService.getErrorMessage();
            }

        }

        function checkUserName() {
            voteGuruService.get().success(function (data) {
                console.log('list of users', data);
                var usernameExists = signupService.checkIfUsernameExists(vm.userFormData, data);
                if (usernameExists === true) {
                    vm.errorMessage = signupService.getErrorMessage();
                }
                else {
                    addUser();
                }
            });

        }

        function addUser() {
            voteGuruService.create(vm.userFormData).success(function (data) {
                vm.userFormData = {};
                voteGuruService.setNewPollFlag(true);
                voteGuruService.setUser(data.userCreated);
                $state.go('usersHomePage');
            });
        }

    }

})(); 