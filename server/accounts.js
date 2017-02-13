/**
 * Created by charlie on 2/2/17.
 */

Meteor.methods({
    createUserWithEmail: function (e) {
        var userid = Accounts.createUser({email: e.email, username: e.email});
        Accounts.sendEnrollmentEmail(userid, e.email);
    }
});