Meteor.publish('posts', function(options) {
    return Posts.find({}, options);
});
Meteor.publish('singlePost', function(id) {
    check(id, String);
    return Posts.find(id);
});

Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId});
});

Meteor.publish('comments', function() {
    return Comments.find();
});