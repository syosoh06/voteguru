/**
 * Created by sohamchakraborty on 10/22/15.
 */
angular
    .module('plunker')
    .directive('dirtyCheck', dirtyCheck);

function dirtyCheck() {
    var directive = {
        link: link,
        /*templateUrl: '/template/is/located/here.html',*/
        restrict: 'EA',
        require: '^form'
    };
    return directive;

    function link(scope, element, attrs, formCtrl) {
        /* */

    }
}