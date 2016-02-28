/**
 * Created by charlie on 2/15/16.
 */
Template.join.helpers({
    team: function() {
        return Teams.find({type:'team'});
    },
    volunteer: function() {
        return Teams.find({type:'volunteer'});
    },
    myteam: function() {
        return Session.get('myteam');
    },
    isselected: function() {
        return (this._id==Session.get('myteam'))?'selected':'';
    }
});
Template.join.events({
    'click .team': function (e) {
        e.preventDefault();

        Session.set('myteam', $(e.target).attr('name'));
    }
});