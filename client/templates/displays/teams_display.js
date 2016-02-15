/**
 * Created by charlie on 2/13/16.
 */
Template.teamsDisplay.helpers({
    team: function() {
        return Teams.find({}, {
            sort: {number: 1}
        });
    },
    time: function() {
        return momentReactive(this.timestamp).fromNow();
    },
    message: function() {
        if(_.isEqual(this.status,'Called')) {
            return this.message;
        }
        else if(_.isEqual(this.status, 'Queued')) {
            return this.status + " for " + this.event;
        }
        else if(_.isEqual(this.status, 'Active')) {
            return "in " + this.event;
        }
        else return '';
    }
});