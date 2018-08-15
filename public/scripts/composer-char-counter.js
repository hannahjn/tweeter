$(document).ready(function() {
$("textarea").on('keypress', function(){
    var finalCount = 140;
    var charCount = ($(this).val().length); 
    var counter = $(this).siblings('.counter').text(finalCount - charCount);
    if(charCount > 140){
        $(counter).css('color', 'red');
    };
});
});