/**
 * Created by sohamchakraborty on 10/24/15.
 */
describe('voteGuruService Tests', function () {
    var voteGuruService, httpBackend;

    beforeEach(function () {

        //beforeEach(module('plunker'));
        module('plunker');

        inject(function (_voteGuruService_, $httpBackend) {
            voteGuruService = _voteGuruService_;
            httpBackend = $httpBackend;

        });
    });

    /* afterEach(function() {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
     });*/

    it('get my polls function should exist', function () {
        expect(angular.isFunction(voteGuruService.getMyPolls)).toBe(true);
    });

    it('get my polls function should work', function () {
        var data = [{username: 'kareena'}, {username: 'kareena'}, {username: 'katrina'}, {username: 'deepika'}];
        var username = 'kareena';
        var myPolls = voteGuruService.getMyPolls(data, username);
        var result = [{username: 'kareena'}, {username: 'kareena'}];
        expect(myPolls).toEqual(result);
    });

    it('deleteOptions function should work', function () {
        var arrayOfOptions = [
            {
                option: 'A'
            },
            {
                option: 'B'
            },
            {
                option: 'C'
            }
        ];

        var index = 2;
        var result = [{
            option: 'A'
        },
            {
                option: 'B'
            }];

        var arrayAfterDeletingOptions = voteGuruService.deleteOption(arrayOfOptions, index);
        expect(arrayAfterDeletingOptions).toEqual(result);
    });

});