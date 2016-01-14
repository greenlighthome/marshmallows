Template.commentItem.helpers({
    submittedDate: function() {
        return moment().to(this.submitted);
    }
});


