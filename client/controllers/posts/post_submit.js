Template.postSubmit.events({

    'change input[type="file"]': function(event) {
        event.preventDefault();


        var files;
        files = event.currentTarget.files;


        swal({
            title: '<h4>Please wait</h4>',
            text: '<h5>Yor image is being uploaded</h5><div class="progress"><div class="indeterminate"></div></div>',
            html: true,
            showConfirmButton: false

        });

        return Cloudinary.upload(files, {
            folder: "avalon"
        }, function(err, result) {
            if (err)
                console.log("Upload Error: " + err);

            Tracker.autorun(function() {
                if (result) {
                    swal.close();
                    createSubmitButton();
                }

            });

            return Session.set('imgUrl', result.url), Session.set('imgPublicId', result.public_id);
        });
    },

    'submit form': function(event, postPage) {
        event.preventDefault();

        var post = {
            title: $(event.target).find('[name=title]').val(),
            header: $(event.target).find('[name=sub-header]').val(),
            body: $(event.target).find('[name=content]').val(),
            imgUrl: Session.get('imgUrl'),
            imgPublicId: Session.get('imgPublicId')

        };


        Meteor.call('postInsert', post, function(error, result) {
            if (error)
                return swal({title: error.reason});
            $('#modal1').closeModal();
            Router.go('postPage', {_id: result._id});

        });
    }
});

Template.postSubmit.onRendered(function() {
    this.$('input#title, textarea#body-submit').characterCounter();
});


Template.postSubmit.onRendered(function() {
    this.$('#submit-form1').validate();
    var editor = new MediumEditor('.editable', {
        placeholder: {
            text: "Tell us your story"
        },

        toolbar: {
            /* These are the default options for the toolbar,
             if nothing is passed this is what is used */
            allowMultiParagraphSelection: true,
            buttons: ['bold', 'italic', 'underline', 'anchor', 'h4', 'h5', 'quote', 'pre', 'justifyCenter', 'justifyLeft', 'justifyRight', 'justifyFull'],
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

