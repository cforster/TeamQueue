/**
 * Created by charlie on 2/12/16.
 */
Contacts = new Mongo.Collection('contacts');

Meteor.methods({
    contactInsert: function(contactAttributes) {
        //check(this.userId, String);
        check(contactAttributes, {
            cell: String,
            name: String,
            teamId: String
        });

        var team = Teams.findOne(contactAttributes.teamId);

        if (!team)
            throw new Meteor.Error('invalid-team', 'You are trying to add a contact to a nonexistant team');

        contact = _.extend(contactAttributes, {
            submitted: new Date()
        });

        return Contacts.insert(contact);
    }
});

Contacts.allow({
    remove: function() { return Meteor.user(); }
});
