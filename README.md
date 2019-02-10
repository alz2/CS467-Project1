CS467 Project 1
===============

We'll upload our meeting minutes here, and other sort of work/code we develop

[Presentation link](https://docs.google.com/presentation/d/1Oibjgl0EAXBdimj2uKEa8znpXydmDb2pbVCbwte87RY/edit?usp=sharing)
### Methods of Downloading Facebook Messages

As there doesn't seem to be an official API to download FB messages from, we have found 
two different methods to do so.

1) Through [FB Settings](https://www.facebook.com/settings?tab=your_facebook_information)
    * Each conversation is its own directory and the messages are stored in `messages.json`
    * Each message has a timestamp, sender, content, reactions from other members.

2) [Scraping Messinger](https://github.com/ownaginatious/fbchat-archive-parser)


### Current Plan

* Color maps to metric
* Intensity maps to value
* 1 view: You vs People.
   - possibly: One person vs metrics
* Zooming: combining colors issue
* Bucketing of some minimal time interval (e.g 1 hour)
