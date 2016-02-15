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
});
$.validator.addMethod( "phoneUS", function( phone_number, element ) {
    phone_number = phone_number.replace( /\s+/g, "" );
    return this.optional( element ) || phone_number.length > 9 &&
        phone_number.match( /^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/ );
}, "Please specify a valid phone number" );

Template.addContact.events({
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
            if(error) throwError(error.reason);
            else {
                if(template.data==null) Router.go('teamsDisplay');
            }
        });
    }
});