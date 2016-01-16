Template.postEdit.events({

    'change input[type="file"]': function(event) {
        event.preventDefault();

        var files;
        files = event.currentTarget.files;

        swal({
            title: '<h4>Please wait</h4>',
            text: '<h5>Your image is being uploaded</h5><div class="progress"><div class="indeterminate"></div></div>',
            html: true,
            showConfirmButton: false

        });
        var oldImg = this.imgPublicId;
        Cloudinary.delete(oldImg);
        return Cloudinary.upload(files, {
            folder: "avalon"
        }, function(err, result) {
            if (err)
                throwError(error.reason);
            Tracker.autorun(function() {
                if (result) {
                    swal.close();
                }
            });

            return Session.set('imgPublicId', result.public_id);
        });
    },

    'submit form': function(event) {
        event.preventDefault();

        var currentPostId = this._id;
        var postProperties = {
            title: $(event.target).find('[name=title-edit]').val(),
            header: $(event.target).find('[name=sub-header-edit]').val(),
            body: $(event.target).find('[name=body-edit]').val(),
            imgPublicId: Session.get('imgPublicId')
        };

        console.log(currentPostId);
        Posts.update(currentPostId, {$set: postProperties}, function(error, result) {
            if (error) {
                throwError(error.reason);
            } else {
                console.log(result);
                $('#modal2').closeModal();
                Router.go('postPage', {_id: currentPostId});
            }

        });
    },


    'click .delete': function(event) {
        event.preventDefault();
        var currentPostId = this._id;
        var oldImg = this.imgPublicId;

        swal({
                title: "Are you sure?",
                text: "You will not be able to recover this file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm){
                if (isConfirm) {
                    swal({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        type: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                    console.log('this should be deleted --> ' + oldImg);
                    Cloudinary.delete(oldImg);
                    Posts.remove(currentPostId);
                    Router.go('postsList');
                    $('#modal2').closeModal();
                } else {
                    swal({
                        title: "Cancelled",
                        text: "Your file is safe",
                        type: "error",
                        timer: 1500,
                        showConfirmButton: false}
                    );
                }
            });
    }
});

Template.postEdit.onRendered(function() {
    this.$('#edit-form1').validate();
    var editor = new MediumEditor('.editable', {
        toolbar: {
            /* These are the default options for the toolbar,
             if nothing is passed this is what is used */
            allowMultiParagraphSelection: true,
            buttons: ['bold', 'italic', 'underline', 'anchor', 'h3', 'h4', 'quote', 'pre', 'justifyCenter', 'justifyLeft', 'justifyRight', 'justifyFull'],
            diffLeft: 0,
            diffTop: -10,
            firstButtonClass: 'medium-editor-button-first',
            lastButtonClass: 'medium-editor-button-last',
            standardizeSelectionStart: false,
            static: true,

            /* options which only apply when static is true */
            align: 'center',
            sticky: true,
            updateOnEmptySelection: false
        }
    });
});

