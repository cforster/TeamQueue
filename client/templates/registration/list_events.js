/**
 * Created by charlie on 2/23/16.
 */
Template.listEvents.helpers({
    event: function() {
        return Events.find();
    }
});
Template.listEvents.events({
    'click .delete': function (e) {
        e.preventDefault();

        if (confirm("Delete this event?")) {
            var currentEventId = this._id;
            Events.remove(currentEventId);
        }
    }
});
