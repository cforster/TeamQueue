/**
 * Created by charlie on 2/12/16.
 */
Template.teamItem.helpers({
    contactsCount: function() {
        return Contacts.find({teamId: this._id}).count();
    }
});

Template.teamItem.events({
    'click .delete': function(e) {
        e.preventDefault();

        if(confirm("Delete this team?")) {
            var currentTeamId = this._id;
            Teams.remove(currentTeamId);
            Contacts.remove({teamId: currentTeamId}); //TODO: not sure if this works....
            Router.go('teamsList');
        }
    }
})