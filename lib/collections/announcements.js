/**
 * Created by charlie on 2/15/16.
 */
Announcements = new Mongo.Collection('announcements');

Meteor.methods({
    clearAnnouncement: function() {
        Announcements.update({current:true}, {$set: {current:false}});
    },
    announceInsert: function(attr) {
        check(this.userId, String);
        check(attr, {
            text: String
        });

        var announce = _.extend(attr, {
            timestamp: new Date(),
            current: true
        });

        return Announcements.insert(announce);
    }
});

Announcements.allow({ //only users can update teams:
    insert: function() { return true; },
});