Posts = new Mongo.Collection('posts');

Posts.allow({
    update: function(userId, post) {
        return ownsDocument(userId, post);
    },
    remove: function(userId, post) {
        return ownsDocument(userId, post);
    }
});

Posts.deny({
    update: function(userId, post, fieldNames) {
        return (_.without(fieldNames, 'title', 'header', 'body', 'imgUrl', 'imgPublicId').length > 0);
    }
});


Meteor.methods({

    postInsert: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            header: String,
            body: String,
            imgUrl: String,
            imgPublicId: String
        });
        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.profile.name,
            date: new Date(),
            commentsCount: 0,
            upvoters: [],
            voters: 0

        });
        var postId = Posts.insert(post);

        return {
            _id: postId
        };
    },

    upvote: function(postId) {
        check(this.userId, String);
        check(postId, String);

        var affected = Posts.update({
            _id: postId,
            upvoters: {$ne: this.userId}
        }, {
            $addToSet: {upvoters: this.userId},
            $inc: {votes: 1}
        });
        if (! affected)
            throw new Meteor.Error('invalid', "You weren't able to upvote that post");
    }
});
