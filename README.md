# CHAT_APP ASSIGNMENT
A simple Real-time chat application using Nodejs and Socket.io.

# Pre-Requisites
1. Socket.io: A javascipt library used for real time communication between services
2. NodeJs: Used for backend
3. Redis : used for storage of messages

# INSTALLATION
1. Clone the entire repository to a new folder
2. Open the terminal in the above folder and run the command npm install. This will install all the required dependencies
3. Now Enter the command nodemon index.js to start the server
4 .To start the client go to browser and type localhost:2000/

# STEPS TO USE
1. User will enter the room by entering the name and will get redirected to DEMO CHAT ROOM.
2. As some new user entered the room all the users will get notified of the newly entered user and the newly entered user can also see the message history .
3. Newly enter user can start typing messages and it will broadcast to all the users also other users will also get notified of the typing event of message.
4. Message will  not get lost on page refresh.
