/**
 * Created by charlie on 2/12/16.
 */

Template.updateStatus.helpers({
    team: function() {
        return Teams.find({status: {$in: ["Called", "Queued", "Active", "Complete"]}}, {sort: {number: 1}}); //include a filter for teams that have been called
    },
    timelapse: function() {
        //return moment(this.timestamp).fromNow(); //(new Date()).getTime()-this.timestamp;
        return momentReactive(moment.duration(moment().diff(this.timestamp)).asMilliseconds()).format('m:ss');
    },
    teamsel: function() {
        var teamid = Session.get('teamselected');
        return Teams.findOne({_id: teamid});
    },
    queuedStatus: function() {
        if(this.status!='Called') return 'disabled';
        else return '';
    },
    activeStatus: function() {
        if(this.status!='Queued') return 'disabled';
        else return '';
    },
    completeStatus: function() {
        if(this.status!='Active') return 'disabled';
        else return '';
    }

});

Template.updateStatus.events({
    'click .team': function(e) {
        e.preventDefault();

        Session.set('teamselected', $(e.target).attr('name'));
    },
    'click .status': function(e) {
        e.preventDefault();

        var teamid = Session.get('teamselected');
        if(e.target.firstChild.data=='Complete') {
            //COMPLETE HERE
            var event = Teams.findOne({_id: teamid}).event;
            Meteor.call('completeTask', {team: teamid, event: event});
            Session.set('teamselected', false);
        }
        else Teams.update(teamid,{$set: {
            status: e.target.firstChild.data,
            timestamp: (new Date()).getTime()
        }});


    }
})

