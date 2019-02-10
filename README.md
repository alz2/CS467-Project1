CS467 Project 1
===============

We'll upload our meeting minutes here, and other sort of work/code we develop

### Methods of Downloading Facebook Messages

As there doesn't seem to be an official API to download FB messages from, we have found 
two different methods to do so.

1) Through [FB Settings](https://www.facebook.com/settings?tab=your_facebook_information)
    * Each conversation is its own directory and the messages are stored in `messages.json`
    * Each message has a timestamp, sender, content, reactions from other members.

2) [Scraping Messinger](https://github.com/ownaginatious/fbchat-archive-parser)
