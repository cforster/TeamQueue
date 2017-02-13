/**
 * Created by charlie on 2/11/16.
 */

Template.teamsList.helpers({
    teams: function() {
        return Teams.find({}, {
            sort: {number: 1}
        });
    }
});