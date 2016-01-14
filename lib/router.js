Router.configure({
    SiteLayoutTemplate: 'siteLayout',
    layoutTemplate: 'applicationLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [Meteor.subscribe('userData')];

    }
});

Router.route('/', {
    name: 'index',
    layoutTemplate: 'siteLayout',
    onAfterAction: function() {
        document.title = 'home';
    }
});

PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    postsLimit: function() {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function() {
        return {sort: {date: -1}, limit: this.postsLimit()};
    },
    subscriptions: function() {
        this.postsSub = Meteor.subscribe('posts', this.findOptions());
    },
    posts: function() {
        return Posts.find({}, this.findOptions());
    },
    data: function() {
        var hasMore = this.posts().count() === this.postsLimit();
        var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
        return {
            posts: this.posts(),
            ready: this.postsSub.ready,
            nextPath: hasMore ? nextPath : null
        };
    }
});

Router.route('/blog/:postsLimit?', {
    name: 'postsList',
    onAfterAction: function() {
        document.title = 'Avalon';
    },
    waitOn: function() {
        return [Meteor.subscribe('comments', this.params._id)];
    }
});

Router.route('blog/posts/:_id', {
    name: 'postPage',
    waitOn: function() {
        return [
            Meteor.subscribe('comments', this.params._id),
            Meteor.subscribe('singlePost', this.params._id)
        ];
    },
    data: function() {
        return Posts.findOne(this.params._id);
    },
    onAfterAction: function() {
        document.title = 'Avalon';

    }
});

var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: ['postSubmit', 'postEdit']});