/**
 * Created by charlie on 2/15/16.
 */
Template.mobileLayout.onRendered(function(){
    $('#qraddress').qrcode({text: window.location.href});
});