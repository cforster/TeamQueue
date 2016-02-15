/**
 * Created by charlie on 2/14/16.
 */
Template.joinTeam.onRendered(function(){
    $('#qraddress').qrcode({text: window.location.href});
});