Template.postPage.helpers({

    ownPost: function() {
        return this.userId === Meteor.userId();
    },
    comments: function() {
        return Comments.find({postId: this._id}, {sort: {submitted: -1}});
    },
    commentsCount: function() {
        return Comments.find({postId: this._id}).count()
    }
});

Template.postPage.events({

    'click #trigger-edit': function(event) {
        event.preventDefault();
        $('#modal2').openModal({
            dismissible: false,
            opacity: .7, // Opacity of modal background
            in_duration: 400, // Transition in duration
            out_duration: 500
        });
    },
    'click .mdi-navigation-close': function(event) {
        event.preventDefault();
        $('#modal2').closeModal();

    },

    'click .upvote': function(event) {
        event.preventDefault();

        Meteor.call('upvote', this._id)
    }
});

Template.postPage.onRendered(function() {
    this.$('.materialboxed').materialbox();

});