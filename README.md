# ExpressJS-website
## The code is written by Joury Zanklo
## Back-end

The web application uses ExpressJS (framework for NodeJS). To use this web application it's required to have good knowledge in JavaScript, NPM, ExpressJS and basic experience with Docker. <br>
ExpressJS has a lot of advantage:
- [ExpressJS](https://expressjs.com/) is a framework for NodeJS and it uses JavaScript as a programming language. That is an advantage because in the future the developers and/or the next team can simply use one programming language for both the back-end and the front-end. 
- It uses [Google V8 engine](https://v8.dev/) to execute the code, V8 engine is incredibly fast.
- It uses [NPM](https://www.npmjs.com/) which is a packet-manager to install any library I want with a single command, the NPM is becoming more and more popular and is growing a lot.
- Node is fast for small applications (our case) and for high-traffic applications. It can be easily modified to serve high-traffic application (which mean that the developers can easily expand the existing web-app and add more functionality without needing to change the whole infrastructure).
- The online documentation of [NodeJS](https://nodejs.org/en/docs/) and [ExpressJS](http://expressjs.com/en/api.html) is really easy to follow and very clear. 
- In addition, ExpressJS contains many modern features that can be useful.


### libraries
A different libraries were used to ensure that we have the functionality and security that we want. 
- bcrypt: To hash passwords and then store them in MongoDB Atlas.
- mongodb: To be able to connect to MongoDB Atlas (for authentication)
- consolidate and mustache: To be able to laod HTML pages.
- express-session: To create sessions for the users.
- nodemon: In case anything is changed, the website will be restarted automatically. 

To install any additional library, you can run the following command:\
```npm install --save <library_name>```

### Installing the project
It's really simple to install the project and running it on your system. Docker architecture makes it very easy for anyone to run the project on their host OS because Docker can be installed on the most modern operating systems. 

- First you need to download the DockerWebApp directory which contains the necessary files. 
- Then you want to install docker-compose on your OS, you can use [this](https://docs.docker.com/compose/install/) link.
- After that you want to go to the directory where you can find the docker-compose.yml file and then run this command: ```docker-compose up```.<br> **Note:** if you are using linux, you might need to use SUDO privileges: ```sudo docker-compose up``` 
- Docker will now download everyhing for you and will run the web-application.
- The website is now available: http://localhost <br>
**Note:** if you want to run the project without Docker (for exmaple, for testing purposes), you need to install NodeJS and NPM. You can use [this](https://nodejs.org/en/download/) link. Then you can run it: ```npm start --nodemon```





## Infrastructure 
### Authentication
For the authentication database MongoDB Atlas was used. MongoDB Atlas comes with 500MB for free to store data, because we don't need much storage space, 500MB was enough. MongoDB Atlas has several advantages:
- It is modern and very fast. 
- MongoDB is widely used by various companies because it contains many good features, such as storing organized data (eg JSON). 
- The database is 24/7 online and available for the users. 
- The connection to the database is encrypted (TLS/SSL).
- There is an open source community edition (free).
- Can be used for high-traffic sites which means that expanding the current project with new databases won't be an issue. <br>

#### Possible configurations 
For this project a cluster was used with collection *user* and database *users*. <br>
The network setting were changed to allow access from everywhere (all IP's) and that is good in our case and in order for the developers and next teams to be able to use it. You can change that in the *Network Access* section.<br>
To access the database from your application you can add a user in the section *Database Access*.<br>




### Firebase
I've also created a Firebase account and then Firebase database as a “real-time” database. In our project we used Firebase to send real-time data from the Wemos D1-mini to the website. The reason for using Firebase is that:
- The Wemos D1-mini support Firebase and there is a library for us to use it. 
- It's very fast (the server is in Belgium) and secure (encrypted) and is under the GDPR (General Data Protection Regulation).
- More professional than using a localhost database.
- Can be easily transferred to the next team. <br>


#### Possible configurations 
After logging in to the you can choose *Go to the console* and then you can choose *PROJECT* project.<br>
After that you can access the database through *Realtime Database* section.<br>
The configurations can be found the *Project settings* and then *General* (at the bottom). <br>
The database secrts (to authenticate) can be found in *Project settings* and then *Service accounts*, you can add new secrets if you want to use them in the application.

### Docker
In this project we used docker because it's really a great infrastructure to use. It has a lot of great advantage such as:
- A Docker application can be run on most major operating systems(you just need to install Docker and then install the project).
- Easy to scale.
- Isolated environments and networks (better security).
- Fast to deploy and uses less resources than other options like virtual box. 
- You can create your own image(from your own application) and share with everyone (DockerHub).

