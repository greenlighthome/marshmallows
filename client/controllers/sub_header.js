Template.subHeader.events({

    'click #login': function(event) {
        event.preventDefault();
        $('.dropdown-button').dropdown();
    },

    'click #facebook-login': function(event) {
        event.preventDefault();

        Meteor.loginWithFacebook({}, function(err){

            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },

    'click #logout': function(event) {
        event.preventDefault();

        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        });
    },

    'click #facebook-name': function(event) {
        event.preventDefault();
            $('.dropdown-button2').dropdown({
                inDuration: 300,
                outDuration: 225,
                constrain_width: true,
                hover: false,
                belowOrigin: true,
                alignment: 'left'
            });
    },

    'click #trigger': function(event) {
        event.preventDefault();
        $('#modal1').openModal({
            dismissible: true,
            opacity: .7,
            in_duration: 400,
            out_duration: 500
        });
    },
    'click .mdi-navigation-close': function(event) {
        event.preventDefault();
        $('#modal1').closeModal();
    }
});

Template.subHeader.onRendered(function() {
    $('.dropdown-button').dropdown();
    $('.dropdown-button2').dropdown();
});