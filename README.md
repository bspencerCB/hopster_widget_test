# README #

Example embed code

```
#!javascript

<div id="hpcpn-cb-widget-bl-479da006be77b16fc6f394133974a66d"></div>
<script type="text/javascript" data-id="hpcpn-cb-init-script-bl-654d8fb8328876fc20e5fcfd32f610ec" src="https://cdn1.collectivebias.com/js/initialize.min.js?https://www.hopster.com/affiliates/livingrichwithcoupons-iframe/80/feed.rss&width=300"></script>

```

### What is this repository for? ###

* Widget that displays Hopster coupons

### How do I get set up? ###

* Cloudfront: `https://cdn1.collectivebias.com/`.
* Staging: `https://beta.cdn1.collectivebias.com/`.
* Update JS min files before pushing to cdn (sync/create invalidation).

### How to push to CDN? ###
* Request permissions from IT
* Create script file `hopster-widget-push.sh`
* Run script `sh hopster-widget-push.sh`
* Script for production:
```
#!/bin/sh
local="<PATH_TO_SCRIPT>" #local location
s3_bucket="s3://cb-hopster/production" #s3 bucket location
distribution_id="<GET_FROM_IT>" #This is the cloud_front ID if used
#-------Do not edit below this line
aws s3 sync $local $s3_bucket --acl public-read --exclude 'hopster-widget-push.sh' --exclude '*.git/*' --exclude '.DS_Store' --delete
aws cloudfront create-invalidation --distribution-id $distribution_id --paths "/*"
echo "The Push for sync Has Finished!"
```
* Script for staging:
```
#!/bin/sh
local="<PATH_TO_SCRIPT>" #local location
s3_bucket="s3://cb-hopster/staging" #s3 bucket location
distribution_id="<GET_FROM_IT>" #This is the cloud_front ID if used
#-------Do not edit below this line
aws s3 sync $local $s3_bucket --acl public-read --exclude 'hopster-widget-push.sh' --exclude '*.git/*' --exclude '.DS_Store' --delete
aws cloudfront create-invalidation --distribution-id $distribution_id --paths "/*"
echo "The Push for sync Has Finished!"
```
