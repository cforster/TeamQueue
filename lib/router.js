/**
 * Created by charlie on 2/11/16.
 */
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [Meteor.subscribe('teams'), Meteor.subscribe('contacts')];
    }
});

Router.route('/', {name: 'teamsList'});
Router.route('/teams/:_id', {
    name: 'teamPage',
    data: function() { return Teams.findOne(this.params._id); }
});
Router.route('/addteam', {name: 'addTeam'});
Router.route('/status', {name: 'updateStatus'});
Router.route('/call', {name: 'callTeam'});
Router.route('/announce', {name: 'announce'});
Router.route('/join/:number', {
    name: 'joinTeam',
    data: function() { return Teams.findOne({number: Number(this.params.number)}); },
    layoutTemplate: 'displayLayout'
});
Router.route('/display', {
    name: 'teamsDisplay',
    layoutTemplate: 'displayLayout'
});

var requireLogin = function() {
    if(!Meteor.user()) {
        if(Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}
Router.onBeforeAction(requireLogin, {only: ['addTeam', 'announce', 'callTeam', 'updateStatus']});

Router.onBeforeAction('dataNotFound', {only: ['teamPage', 'joinTeam']});