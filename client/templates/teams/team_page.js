/**
 * Created by charlie on 2/12/16.
 */
Template.teamPage.helpers({
    contacts: function() {
        return Contacts.find({teamId: this._id});
    }
});