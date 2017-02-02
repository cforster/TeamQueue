/**
 * Created by charlie on 2/2/17.
 */
Template.newUser.events({
    'submit form': function(e) {
        e.preventDefault();

        Meteor.call('createUserWithEmail', { email:  e.target.email.value });

        $("form").trigger('reset');
    }
});