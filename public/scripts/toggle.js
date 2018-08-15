$(document).ready(function(){
    $("#compose").click(function(){
        $('.new-tweet').slideToggle("slow", function(){
            $("textarea").select();
        });
    });
});