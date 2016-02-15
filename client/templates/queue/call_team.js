/**
 * Created by charlie on 2/12/16.
 */
Template.callTeam.helpers({
    team: function() {
        return Teams.find({type:'team', status: {$exists: false}}); //include a filter for teams that have NOT been called
    },
    teamselected: function() {
        return Session.get('team');
    },
    event: function() {
        return Session.get('event');
    },
    destination: function() {
        var event = Session.get('event');
        return event.toString().includes('Judging')?'6th floor':'1st floor theater';
    }
});
Template.callTeam.events({
    'submit form': function (e) {
        e.preventDefault();

        var teamid = Session.get('team');

        // Send messages
        var message = $(e.target).find('[name=message]').val();

        if($('input#checkedSms').is(':checked')) {
            Contacts.find({teamId: teamid}).forEach(function(data) {
                var smsOptions = {
                    to: data.cell,
                    message: message
                };

                Meteor.call('sendSMS', smsOptions, function (err, result) {
                    if (err) {
                        alert("There was an error sending the message. See the console for more info");
                        console.warn("There was an error sending the message.", smsOptions, err);
                        return;
                    }
                    //alert("Message sent successfully. See the console for more info.");
                    //console.log("Message sent. Result: ", result);
                });
            });
        }


        //update status:
        Teams.update(teamid,{$set: {
            status: 'Called',
            event: Session.get('event'),
            timestamp: (new Date()).getTime(),
            message: message
        }});

        Session.set('event', false);
        Session.set('team', false);
    },
    'click .event': function(e) {
        e.preventDefault();

        Session.set('event', $(e.target).find('input').attr('id'));
    },
    'click .team': function(e) {
        e.preventDefault();

        Session.set('team', $(e.target).find('input').attr('id'));
    }

});
