/**
 * Created by charlie on 2/11/16.
 */
Meteor.publish('teams', function() {
    return Teams.find();
});
Meteor.publish('contacts', function(){
    return Contacts.find();
});