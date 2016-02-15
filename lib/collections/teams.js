/**
 * Created by charlie on 2/11/16.
 */
Teams = new Mongo.Collection('teams');


Meteor.methods({
    teamInsert: function(teamAttributes) {
        check(Meteor.userId(), String);
        check(teamAttributes, {
            number: String,
            name: String,
            type: String
        });

        var teamId = Teams.insert(teamAttributes);

        return {
            _id: teamId
        };
    }
});

Teams.allow({ //only users can update teams:
    remove: function() { return Meteor.user(); },
    update: function() { return Meteor.user(); }
});
