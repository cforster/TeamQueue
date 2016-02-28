/**
 * Created by charlie on 2/23/16.
 */
Events = new Mongo.Collection('events');

Events.allow({
    insert: function() { return Meteor.user(); },
    remove: function() { return Meteor.user(); }
});
