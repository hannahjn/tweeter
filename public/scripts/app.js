
  function renderTweets(tweets) {
      for(id in tweets) {
          let $tweet = createTweetElement(tweets[id]);
          $('.tweet-container').prepend($tweet);
        }
    }
function createTweetElement(tweet) {
    let $tweet = $('<article>').addClass(tweet);
    let $tweetName = $('<h2>').html(tweet.user.name);
    let $tweetUsername = $('<p>').html(tweet.user.handle);
    let $tweetImg = $('<img>').attr('src', tweet.user.avatars.small);
    let $tweetHeader = $('<header>');
    $tweetHeader.append($tweetName);
    $tweetHeader.append($tweetUsername);
    $tweetHeader.append($tweetImg);
    
    let $tweetBody = $('<section>').html(tweet.content.text);
    let $tweetTime = moment(tweet.created_at).fromNow();
    let $footerFlag = $('<i>').addClass('far fa-flag');
    let $footerLike = $('<i>').addClass('far fa-thumbs-up');
    let $footerRetweet = $('<i>').addClass('fas fa-retweet');
    let $tweetFooter = $('<footer>').html($tweetTime);
    
    $tweetFooter.append($footerFlag);
    $tweetFooter.append($footerLike);
    $tweetFooter.append($footerRetweet);

    $tweet.append($tweetHeader);
    $tweet.append($tweetBody);
    $tweet.append($tweetFooter);
  
    return $tweet;
}

$(document).ready(function() {
  $('.errors').hide();
  function validate(charCount){
    var error = '';
    if(charCount > 140 ) {
      // alert('Too many characters!');
      error = true;
    } else if(charCount === 0) {
        // alert('Please enter a message');
        error = true;
    }
    if (error) {
      $('.errors').slideDown();
    } else {
      $('.errors').slideUp();
    }
    return error;
  }
  $("form").submit(function( event ) {
    event.preventDefault();
    var charCount = $(this).children('textarea').val().length;
    // console.log(charCount);
    var error = validate(charCount);
    if (!error) {
      $.ajax({
        type: 'post',
        url: '/tweets',
        data: $(this).serialize(),
      }).then(function(){
        loadTweets(1);
      });
    };
  }); 
 
  function loadTweets(size){
    $.ajax('http://localhost:8080/tweets', {method: 'GET'})
    .then(function (tweets) {
      if (size) {
        renderTweets(tweets.slice(tweets.length-1));
      } else {
        renderTweets(tweets);
      }
    });
  };
  loadTweets();
});