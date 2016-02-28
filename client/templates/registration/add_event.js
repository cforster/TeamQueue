/**
 * Created by charlie on 2/23/16.
 */

Template.addEvent.events({
    'click #queue': function(e) {
        $('#location').toggle();
    },
    'submit form': function(e) {
        e.preventDefault();

        var event = {
            name:  $(e.target).find('[name=event]').val()
        };

        console.log($('#queue').is(':checked'));

        if($('#queue').is(':checked')) {
            _.extend(event, {location: $(e.target).find('[name=location]').val()})
        }

        Events.insert(event);

        //reset form:
        $("form").trigger('reset');
        $('#location').hide();
    }
});
