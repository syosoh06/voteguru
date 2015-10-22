/**
 * Created by sohamchakraborty on 10/22/15.
 */
/**
 * Created by sohamchakraborty on 10/12/15.
 */
(function (){
    'use strict';

    angular
        .module('plunker')
        .controller('graphController', graphController);


    function graphController($scope, $http, $state, $rootScope, voteGuruService) {


        var vm = this;

        vm.activate = activate;
        vm.data=[];
        vm.labels=[];

        activate();

        function activate(){
            loadGraph();
        }

        function loadGraph(){
            vm.data=voteGuruService.loadGraphData();
            console.log('data = ', vm.data);
            vm.labels=voteGuruService.loadGraphLabels();
            console.log('labels = ', vm.labels);
            var barData = {};
            barData.labels=vm.labels;
            barData.datasets=[];
            barData.datasets[0]={};
            barData.datasets[0].data=vm.data;
            var context = document.getElementById('clients').getContext('2d');
            //context.canvas.width = 300;
            //context.canvas.height = 300;
            var clientsChart = new Chart(context).Bar(barData);
        }



    }

})();




