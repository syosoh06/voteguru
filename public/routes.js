angular
    .module('plunker')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    nav: {
                        templateUrl: 'views/navbar.html'
                    },
                    content: {
                        templateUrl: 'views/home.html'
                    },
                    midbar: {
                        templateUrl: 'views/midbar.html'
                    }
                }

            })
            .state('login', {
                url: '/login',
                views: {
                    nav: {
                        templateUrl: 'views/navbar.html'
                    },
                    content: {
                        templateUrl: 'views/login.html'
                    },
                    midbar: {
                        templateUrl: 'views/midbar.html'
                    }
                }
            })
            .state('usersHomePage', {
                url: '/usersHomePage',
                views : {
                    nav: {
                    templateUrl: 'views/navbar.html'
                    },
                    content: {
                        templateUrl: 'views/newPollContent.html'
                    },
                    midbar: {
                        templateUrl: 'views/usersHomePageMidbar.html'
                    }
                }
            })
            .state('votingPage', {
                url: '/votingPage',
                views : {
                    nav: {
                        templateUrl: 'views/navbar.html'
                    },
                    content: {
                        templateUrl: 'views/votingPageContent.html'
                    },
                    midbar: {
                        templateUrl: 'views/usersHomePageMidbar.html'
                    }
                }
            })
            .state('graphPage', {
                url: '/graphPage',
                views : {
                    nav: {
                        templateUrl: 'views/navbar.html'
                    },
                    content: {
                        templateUrl: 'views/graphPageContent.html'
                    },
                    midbar: {
                        templateUrl: 'views/usersHomePageMidbar.html'
                    }
                }
            })
            .state('myPollsPage', {
                url: '/myPollsPage',
                views : {
                    nav: {
                        templateUrl: 'views/navbar.html'
                    },
                    content: {
                        templateUrl: 'views/myPollsPageContent.html'
                    },
                    midbar: {
                        templateUrl: 'views/usersHomePageMidbar.html'
                    }
                }
            })
            .state('settingPage', {
                url: '/settings',
                views: {
                    nav: {
                       templateUrl: 'views/navbar.html'
                    },
                    content: {
                        templateUrl: 'views/settingsPageContent.html'
                    }
                }
            })
            .state('signup', {
                url: '/signup',
                views: {
                    nav: {
                        templateUrl: 'views/navbar.html'
                    },
                    content: {
                        templateUrl: 'views/login.html'
                    },
                    midbar: {
                        templateUrl: 'views/midbar.html'
                    }
                }
            });
        // use the HTML5 History API
        $locationProvider.html5Mode(true);

    });