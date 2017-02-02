/**
 * Created by charlie on 2/12/16.
 */

/*
TODO: make sms not visible for events that don't need queueing
TODO: use location on this page to create sms
TODO: iterate over the events rather than hard code.
 */
 calledTeams = [];

Template.callTeam.helpers({
    team: function() {
        return Teams.find({type:'team', status: {$exists: false}}); //include a filter for teams that have NOT been called
    },
    teamselected: function() {
        return Session.get('team');
    },
    event: function() {
        return Events.find();
    },
    eventselected: function() {
        return Session.get('event');
    },
    locationselected: function() {
        return Session.get('location');
    }
});
Template.callTeam.events({
    'submit form': function (e) {
        e.preventDefault();

        for(i=0; i<calledTeams.length; i++) {
            var teamid=calledTeams[i];
            console.log(teamid);

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


            if(Session.get('location')) {
                //update status:
                Teams.update(teamid, {
                    $set: {
                        status: 'Called',
                        event: Session.get('event'),
                        timestamp: (new Date()).getTime(),
                        message: message
                    }
                });
            } else {
                //COMPLETE HERE
                Meteor.call('completeTask', {team: teamid, event: Session.get('event')});
            }
        }

        calledTeams=[];
        Session.set('event', false);
        Session.set('team', false);
        Session.set('location', false);
        $('form').trigger('reset');

        //this is necessary but seems dirty:
        $('form').find('label').removeClass('active');
    },
    'click .event': function(e) {
        e.preventDefault();

        var target = e.target;
        if (target.nodeName=='SPAN') target = target.parentNode;

        Session.set('event', $(target).find('input').attr('id'));
        var loc = $(target).find('span').attr('id');
        if(loc) Session.set('location', loc);
        else Session.set('location', false);
    },
    'click .team': function(e) {
        e.preventDefault();

        var teamid = e.target.getElementsByTagName('input')[0].id
        if(!_.contains(calledTeams, teamid)) {
            calledTeams.push(teamid)
        } else {
            calledTeams = _.without(calledTeams, teamid);
        }

        console.log(calledTeams);
        Session.set('team', calledTeams.length>0);
    }

});
