/**
 * Created by charlie on 2/2/17.
 */
Accounts.config({
    forbidClientAccountCreation : true
});

Meteor.methods({
    createUserWithEmail: function (e) {
        var userid = Accounts.createUser({email: e.email});
        Accounts.sendEnrollmentEmail(userid, e.email);
    }
});