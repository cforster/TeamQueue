/**
 * Created by charlie on 2/12/16.
 */
Template.addContact.onRendered(function(){
    $('.contact-form').validate({
        rules: {
            cell: {
                required: true,
                phoneUS: true
            },
            name: {
                required: true
            }
        }
    });
    $('#smssuccess').hide();
    $('#smswarning').show();
});
$.validator.addMethod( "phoneUS", function( phone_number, element ) {
    phone_number = phone_number.replace( /\s+/g, "" );
    return this.optional( element ) || phone_number.length > 9 &&
        phone_number.match( /^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/ );
}, "Please specify a valid phone number" );

Template.addContact.events({
    'focus .form-control': function() {
        $('#smssuccess').hide();
        $('#smswarning').show()
    },
    'submit form': function(e, template) {
        e.preventDefault();

        console.log(template);

        if(template.data!=null) {
            var teamId = template.data._id;
        } else {
            var teamId = Session.get('myteam');
        }

        var contact = {
            name:  $(e.target).find('[name=name]').val(),
            cell:  $(e.target).find('[name=cell]').val(),
            teamId: teamId
        };

        Meteor.call('contactInsert', contact, function(error, contactId) {
            if(error) {
                if(error.error=="cell-exists") alert(error.message);
                else throwError(error.reason);
            }
            else {
                //send a success message:
                var team = Teams.findOne(teamId);
                Meteor.call('sendSMS', {
                    to:contact.cell,
                    message:"You have successfully registered to receive SMS notifications for " + team.name
                },
                function (err, result) {
                    if (err) {
                        console.warn("There was an error sending the message.", smsOptions, err);
                    }
                });


                if(template.data==null) Router.go('teamsDisplay'); //if on mobile, reroute
                else { //otherwise, reset:
                    $("form").trigger('reset');
                    $("#smssuccess").show();
                    $('#smswarning').hide();
                }
            }
        });
    }
});