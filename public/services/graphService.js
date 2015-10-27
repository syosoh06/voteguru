/**
 * Created by sohamchakraborty on 10/27/15.
 */
(function (){
    'use strict';

    angular
        .module('plunker')
        .service('graphService', [ 'voteGuruService', function (voteGuruService) {

            return {
                loadBarDataForGraphs: function (data, labels) {
                    var barData = {};
                    barData.labels = labels;
                    barData.datasets = [];
                    barData.datasets[0] = {};
                    barData.datasets[0].data = data;
                    return barData;
                },
                loadGraphData: function () {
                    var data = [];
                    var poll = voteGuruService.getPollForGraphs();
                    var len = poll.Options.length;
                    for (var i = 0; i < len; i++) {
                        data.push(poll.Options[i].votes);
                    }
                    return data;
                },
                loadGraphLabels: function () {
                    var labels = [];
                    var poll = voteGuruService.getPollForGraphs();
                    var len = poll.Options.length;
                    for (var i = 0; i < len; i++) {
                        labels.push(poll.Options[i].option);
                    }
                    return labels;
                }
            }
        }
        ]);





    })();