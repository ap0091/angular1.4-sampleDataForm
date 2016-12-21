commands to run
1. cd <APP FOLDER>
2. sudo npm install
3. bower install
4. gulp
5. node server.js

Utilizing HTML5, CSS, Angular 1.4 + Routing, Bootstrap and Responsive Design
Utilizing Node as a basic web server for this sample project.
Using Bower for Dependencies and Gulp to combine all JS files into a single client file.

This app fetches data from http://jsonplaceholder.typicode.com/ and builds a forum based system. (most of the data is stored locally)

100 Posts are fetched and each post has Users and Comments.
A user is able to be edited so you can change their names and details
A post is able to be clicked on to view more information about that post and also comments related to that post. (comments are fetched on the fly, not stored upon first grab .. this was a design choice )
A post is able to be favorited.
A user is able to be clicked on to view other posts for that user.

Design Patterns Made;
All JS Files live within the JS Folder
All Controllers live in a controller folder
All Services live in a services folder

