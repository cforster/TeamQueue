/**
 * Created by charlie on 2/13/16.
 */
var twilioClient = new Twilio({
    from: Meteor.settings.TWILIO.FROM,
    sid: Meteor.settings.TWILIO.SID,
    token: Meteor.settings.TWILIO.TOKEN
});