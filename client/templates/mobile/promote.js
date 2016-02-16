/**
 * Created by charlie on 2/15/16.
 */
Template.promote.helpers({
    nextStatus: function () {
        if(this.status=="Called") return "Queued: The team is present and ready?";
        else if(this.status=="Queued") return "Active: The team is in the activity?";
        else if(this.status=="Active") return "Complete: The team is done with the activity?";
        else {
            return 'no status to promote';
        }
    }
});
Template.promote.events({
    'submit form': function(e) {
        e.preventDefault();

        var status = $(e.target).find('button.btn-lg').attr('name');

        if(status=='Active') {
            Teams.update(this._id, {$unset: {status: ''}});
        }
        else if(status=='Queued')
            Teams.update(this._id,{$set: {
                status: 'Active',
                timestamp: (new Date()).getTime()
            }});
        else if(status=='Called')
            Teams.update(this._id,{$set: {
                status: 'Queued',
                timestamp: (new Date()).getTime()
            }});

        Router.go('/');
    }
});