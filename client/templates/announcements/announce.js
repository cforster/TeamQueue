/**
 * Created by charlie on 2/14/16.
 */
Template.announce.helpers({
    announcement: function() {
        return Session.get('announcement');
    },
    liveannouncement: function() {
        return Announcements.findOne({current:true});
    }
});

Template.announce.events({
    'click .modal-toggle': function (e) {
        Session.set('announcement', $(e.target.parentElement).find('[name=message]').val());
    },
    'submit form': function(e) {
        e.preventDefault();
        $('#modal-dialog').modal('show');
    },
    'click .rel': function(e) {
        e.preventDefault();

        Meteor.call('clearAnnouncement');
    }
});

Template.announce.onRendered(function() {
    $('#btnYes').click(function () {

        // handle form processing here
        var a = Session.get('announcement');

        //release old announcement
        Meteor.call('clearAnnouncement');

        Contacts.find().forEach(function(data) {
            var smsOptions = {
                to: data.cell,
                message: a
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


        var temp = Meteor.call('announceInsert', {text: a});

        Session.set('announcement', false);

        $('#modal-dialog').modal('hide');
    });
});