/**
 * Created by charlie on 2/15/16.
 */
Template.header.helpers({
    myteam: function () {
        return Session.get('myteam');
    }
});