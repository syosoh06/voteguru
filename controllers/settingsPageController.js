/**
 * Created by sohamchakraborty on 10/14/15.
 */
(function (){
    'use strict';

    angular
        .module('plunker')
        .controller('settingsPageController', settingsPageController);


    function settingsPageController($state, voteGuruService) {


        var vm = this;

        vm.activate = activate;
        vm.submit = submit;

        function submit(){
                vm.user.username = vm.username;
                vm.user.password = vm.password;
                voteGuruService.update(vm.user._id, vm.user).success(function(data){
                    $state.go('usersHomePage');
                })
        }

        activate();

        function activate(){
            console.log("settings page controller activated");
                var user = voteGuruService.getUser();
            var id =user._id;
            voteGuruService.getSingleUser(id, user).success(function(data){
                vm.user = data;
            });
        }


    }

})();