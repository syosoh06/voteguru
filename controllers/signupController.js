(function (){
    'use strict';

    angular
        .module('plunker')
        .controller('signupController', signupController);


    function signupController($scope, $http, $state, voteGuruService) {


        var vm = this;

        vm.activate = activate;
        vm.login=login;
        vm.signup = signup;
        vm.userFormData = {};

        activate();

        function activate(){
            console.log("sign up controller activated");
            vm.errorMessage = "";
        }

        function login(){
            voteGuruService.get().success(function(data){
                console.log('list of users', data);
                var validation = voteGuruService.validate(vm.userFormData, data);
                //voteGuruService.setUser(data.user);
                changeState(validation);
            })
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
            vm.errorMessage = "";
            voteGuruService.create(vm.userFormData).success(function(data){
                vm.userFormData = {};
                voteGuruService.setNewPollFlag(true);
                voteGuruService.setUser(data.userCreated);
                $state.go('usersHomePage');
            });

        }

    }

})(); 




