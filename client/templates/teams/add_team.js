/**
 * Created by charlie on 2/11/16.
 */
Template.addTeam.events({
    'submit form': function (e) {
        e.preventDefault();

        var team = {
            number: $(e.target).find('[name=number]').val(),
            name: $(e.target).find('[name=name]').val(),
            type: $(e.target).find('option:selected').val()
        };

        Meteor.call('teamInsert', team, function(error, result) {
           if(error) return alert(error.reason);
            Router.go('teamPage', {_id: result._id});
        });
    }
});
