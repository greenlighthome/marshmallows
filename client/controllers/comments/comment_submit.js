Template.commentSubmit.events({
    'submit form': function(event, template) {
        event.preventDefault();

        var $body = $(event.target).find('[name=body]');
        var comment = {
            body: $body.val(),
            postId: template.data._id
        };

        Meteor.call('commentInsert', comment, function(error, commentId) {
            if (error){
                throwError(error.reason);
            } else {
                $body.val('');
            }
        });
    }
});

Template.commentSubmit.onRendered({
});