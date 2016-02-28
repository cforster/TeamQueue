/**
 * Created by charlie on 2/27/16.
 */
Template.displayProgress.helpers({
    event: function() {
        return _.uniq(Events.find().fetch(), false, function(d) { return d.name });
    },
    team: function() {
        return Teams.find();
    },
    completed: function(ename, teamid) {
        return _.contains(_.pluck(Teams.findOne(teamid).completed, 'name'), ename);
    }
});