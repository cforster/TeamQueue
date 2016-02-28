/**
 * Created by charlie on 2/11/16.
 */
Meteor.publish('teams', function() {
    return Teams.find();
});
Meteor.publish('contacts', function(){
    return Contacts.find();
});
Meteor.publish('announcements', function(){
    return Announcements.find();
});
Meteor.publish('events', function(){
    return Events.find();
});