/**
 * Created by charlie on 2/12/16.
 */
Template.contactItem.events({
    'click .delete': function(e) {
        e.preventDefault();

        console.log(this);

        if(confirm("Delete this contact?")) {
            var currentContactId = this._id;
            Contacts.remove(currentContactId);
            Router.go('teamPage', {_id: this.teamId} );
        }
    }
})