/**
 * Created by charlie on 2/13/16.
 */
Meteor.methods({
    'sendSMS': function (opts) {

        HTTP.call(
            "POST",
            'https://api.twilio.com/2010-04-01/Accounts/' +
            Meteor.settings.TWILIO.SID + '/SMS/Messages.json', {
                params: {
                    From: Meteor.settings.TWILIO.FROM,
                    To: opts.to,
                    Body: opts.message
                },
                // Set your credentials as environment variables
                // so that they are not loaded on the client
                auth:
                Meteor.settings.TWILIO.SID + ':' +
                Meteor.settings.TWILIO.TOKEN
            },
            // Print error or success to console
            function (error) {
                if (error) {
                    throw new Meteor.error(error);
                }
                else {
                    return 'SMS sent successfully.';
                }
            }
        );

        //try {
        //    var opt = {to: opts.to, body: opts.message};
        //    var result = twilioClient.sendMessage(opt);
        //} catch (err) {
        //    throw new Meteor.error(err);
        //}
        //return result;
    }
});