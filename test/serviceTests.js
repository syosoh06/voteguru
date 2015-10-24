/**
 * Created by sohamchakraborty on 10/24/15.
 */
describe('voteGuruService Tests', function () {
    var voteGuruService, httpBackend;

    var poll = {
        "_id": "562b6567149c310000000002",
        "username": "kat@kat.com",
        "name": "bebo vs kat vs pc",
        "__v": 1,
        "Options": [
            {
                "votes": 1,
                "option": "bebo"
            },
            {
                "votes": 0,
                "option": "pc"
            },
            {
                "votes": 0,
                "option": "kat"
            }
        ]
    };

    var data = [{
        "_id": "5628584d4aec180000000003",
        "pollNameToBeEdited": "",
        "toBeEdited": false,
        "password": "pc@pc.com",
        "username": "pc@pc.com",
        "name": "pc",
        "__v": 0,
        "polls": []
    }];

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

    it('should load graph results', function () {

        voteGuruService.setPollForGraphs(poll);
        var result = [1, 0, 0];
        var graphData = voteGuruService.loadGraphData();
        expect(graphData).toEqual(result);
    });

    it('should load graph labels', function () {

        voteGuruService.setPollForGraphs(poll);
        var result = ['bebo', 'pc', 'kat'];
        var graphLabels = voteGuruService.loadGraphLabels();
        expect(graphLabels).toEqual(result);
    });

    it('should hide and un-hide delete button according to the business logic', function () {
        voteGuruService.setUser({username: 'pc@pc.com'});
        var result1 = true;
        var result2 = false;
        var poll1 = {
            "_id": "56288e2d1816b70000000001",
            "username": "pc@pc.com",
            "name": "a vs b vs c",
            "__v": 4,
            "Options": [
                {
                    "votes": 1,
                    "option": "a"
                },
                {
                    "votes": 2,
                    "option": "b"
                },
                {
                    "votes": 0,
                    "option": "c"
                }
            ]
        };

        var poll2 = {
            "_id": "5628998a1816b70000000003",
            "username": "bebo@bebo.com",
            "name": "c vs d vs e",
            "__v": 2,
            "Options": [
                {
                    "votes": 0,
                    "option": "c"
                },
                {
                    "votes": 1,
                    "option": "d"
                },
                {
                    "votes": 0,
                    "option": "e"
                }
            ]
        };

        var resultForPoll1 = voteGuruService.hideDeleteButton(poll1);
        var resultForPoll2 = voteGuruService.hideDeleteButton(poll2);

        expect(resultForPoll1).toEqual(result2);
        expect(resultForPoll2).toEqual(result1);

    });

    it('should submit polls successfully', function () {
        var optionSelected = "bebo";


        var expectedResult = poll;
        expectedResult.Options[0].votes = 2;

        var actualResult = voteGuruService.submitPolls(optionSelected, poll);

        expect(actualResult).toEqual(expectedResult);
    });

    it('should successfully add one more option to the poll', function () {
        var expectedResult = poll;
        expectedResult.Options[3] = {option: "", votes: 0};
        var actualResult = voteGuruService.addOneMoreOption(poll);
        expect(actualResult).toEqual(expectedResult);
    });

    it('should be able to validate login successfully', function () {
        var formData = {
            "password": "bebo@bebo.com",
            "username": "bebo@bebo.com"
        };

        var expectedResult = false;

        var actualResult = voteGuruService.validate(formData, data);
        expect(actualResult).toEqual(expectedResult);


    });

    it('should successfully set up a Poll for a new page or editable page', function () {
        voteGuruService.setPollToBeRetrievedInNewPollsPage(poll);
        voteGuruService.setFromState('myPollsPage');

        var expectedResult = poll;
        var actualResult = voteGuruService.setPollForNewPollPage();
        expect(actualResult).toEqual(expectedResult);
    });


});