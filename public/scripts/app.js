
  function renderTweets(tweets) {
      for(id in tweets) {
          let $tweet = createTweetElement(tweets[id]);
          $('.tweet-container').append($tweet);
      }
    //   return $tweet;
    // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
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
    let $tweetFooter = $('<footer>').html(tweet.created_at);
    
    $tweet.append($tweetHeader);
    $tweet.append($tweetBody);
    $tweet.append($tweetFooter);
    return $tweet;
}
$(document).ready(function() {
  function validate(charCount){
    var error = '';
    if(charCount > 140 ) {
      alert('Too many characters!');
      error = true;
    } else if(charCount === 0) {
      alert('Please enter a message');
      error = true;
    }
    return error;
  }
  $("form").submit(function( event ) {
    event.preventDefault();
    var charCount = $(this).children('textarea').val().length;
    // console.log(charCount);
    var error = validate(charCount);
    if (!error) {

    }
    ( $ (this).serialize());
  }); 
  $(function loadTweets(){
        $.ajax('http://localhost:8080/tweets', {method: 'GET'})
        .then(function (tweets) {
          renderTweets(tweets);
        });
      });
    });

    