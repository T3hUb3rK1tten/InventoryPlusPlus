<?php
// Insert your keys/tokens
$consumerKey = '';
$consumerSecret = '';
$OAuthToken = '';
$OAuthSecret = '';

// Full path to twitterOAuth.php (change OAuth to your own path)
require_once($_SERVER['DOCUMENT_ROOT'].'/OAuth/twitterOAuth.php');

// create new instance
$tweet = new TwitterOAuth($consumerKey, $consumerSecret, $OAuthToken, $OAuthSecret);

// Your Message
$message = "This is a test message.";

// Send tweet 
$tweet->post('statuses/update', array('status' => "$message"));
?>
