# collaborative-markdown

A collaborative Markdown editor built on Derby.js.

The goal of this project was to build a simple proof-of-concept that takes advantage of [Derby.js](http://derbyjs.com/)'s
(via [ShareJS](http://sharejs.org/)) [Operational Transformation](http://en.wikipedia.org/wiki/Operational_transformation)
support to build a Google Docs-style collaborative editor based on Markdown.

There is some cleanup/styling work that would need to be done to turn this into a real production-quality app, but
as-is the editor functionality works and all documents are automatically saved.

## Installation on Uberspace
### Redis
* Setup Redis as descriped [here](http://uberspace.de/dokuwiki/database:redis)
* delete port settings from redis config file `~/.redis/conf`:

		port 0

### MongoDB

* Setup MongoDB as descriped [here](http://uberspace.de/dokuwiki/database:mongodb)

### Setup `config.json`

        "redis" : {
                "unixport" : "<Unix Port of Redis>"
        },
        "mongodb" : {
                "host" : "localhost",
                "port" : <MongoDB Port>,
                "username" : "<username>",
                "password" :  "<password>"
        },
        "collabdown" : {
                "secret" : "<YOUR SECRET HERE>",
          

###Setup service
	$ uberspace-setup-service collabdown sh <path to collabdown>/collabdown/collabdown-startup.sh

	Creating the ~/etc/run-collabdown/run service run script
	Creating the ~/etc/run-collabdown/log/run logging run script
	Symlinking ~/etc/run-collabdown to ~/service/collabdown to start the service
	Waiting for the service to start ... 1 2 3 4 started!
	
	Congratulations - the ~/service/collabdown service is now ready to use!
	To control your service you'll need the svc command (hint: svc = service control):
	
	To start the service (hint: u = up):
	  svc -u ~/service/collabdown
	To stop the service (hint: d = down):
	  svc -d ~/service/collabdown
	To reload the service (hint: h = HUP):
	  svc -h ~/service/collabdown
	To restart the service (hint: du = down, up):
	  svc -du ~/service/collabdown
	
	To remove the service:
	  cd ~/service/collabdown
	  rm ~/service/collabdown
	  svc -dx . log
	  rm -rf ~/etc/run-collabdown
	
	More information about controlling daemons can be found here:
	https://uberspace.de/dokuwiki/system:daemontools#wenn_der_daemon_laeuft

###Subdomain creation
See [http://uberspace.de/dokuwiki/start:domain#subdomains](http://uberspace.de/dokuwiki/start:domain#subdomains)

###Port forwarding
add a `.htaccess`-File to root level of collabdown

	RewriteEngine On
	RewriteRule (.*) http://localhost:61543/$1 [P]

###Force https
add following lines to your `.htaccess`-file

	RewriteCond %{HTTPS} !=on
	RewriteCond %{ENV:HTTPS} !=on
	RewriteRule .* https://%{SERVER_NAME}%{REQUEST_URI} [R=301,L]