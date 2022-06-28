# cors_exploring

I wanted to learn more about what the cors middleware is actually doing.

<br>

In this brief repo I am conducting some experiments in order to try and get a better idea.

<br>

From https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors

> CORS errors
Cross-Origin Resource Sharing (CORS) is a standard that allows a server to relax the same-origin policy. This is used to explicitly allow some cross-origin requests while rejecting others. For example, if a site offers an embeddable service, it may be necessary to relax certain restrictions. Setting up such a CORS configuration isn't necessarily easy and may present some challenges. In these pages, we'll look into some common CORS error messages and how to resolve them.
If the CORS configuration isn't setup correctly, the browser console will present an error like "Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at $somesite" indicating that the request was blocked due to violating the CORS security rules. This might not necessarily be a set-up mistake, though. It's possible that the request is in fact intentionally being disallowed by the user's web application and remote external service. However, If the endpoint is meant to be available, some debugging is needed to succeed.

If you don't set up CORS then accessing resources from a server different from your own will be a security concern for the browser and you will get an error message telling you that your request has failed. So let's look at how we can use nodeJS and the cors middleware to address this. 

First thing to do is to install express.

``` 
npm install --save express 
```
And then install cors.
```
npm install --save cors
```
Now to set up a really simple express server - I've followed the tutorial at https://codeforgeek.com/express-nodejs-tutorial/ and created the following file:

```
// app.js

const express = require("express");
const app = express();

app.get('/', (req, res) => {
  res.send("Hello");
});

app.listen(process.env.port || 3000);
console.log('Web server is listening at port' + (process.env.port || 3000));
```
Then run the server:
```
node app.js
```
If you now go to localhost:3000 on your browser you should be able to see the text 'Hello'. <br>

This is because we have made a server with this information and we are connecting to it. Because we are connecting to it from the same machine there is not deemed to be any security issue and we have not problem. At the moment we are just using express (without the cors middleware) and so we are going to have standard behaviour. Let's see what this means if we try and access it from another website. "How do we do this?" - ah I'm glad you asked. If you visit another website and open the devloper tools you can write some javascript in the console and it will behave as if we are making the request from that site. So it is an easy way to test this principle out. <br><br>

I'm going to visit the website of my very good friend (and brilliant photographer) Emile Holba - his website is https://www.emileholba.co.uk/

In the console I'm going to type the following:

```
fetch("http://localhost:3000").then(req => req.text()).then(console.log)
```

When I run this I get the standard response for this type of request, that is, when we try and request stuff from a remote server, and that is a failure. This is essentially a cross origin error - we are trying to get stuff from another place, and in order to keep us safe, browser says no. These are the errors I got:

```
Access to fetch at 'http://localhost:3000/' from origin 'https://www.emileholba.co.uk' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

(index):13          GET http://localhost:3000/ net::ERR_FAILED 200

Uncaught (in promise) TypeError: Failed to fetch
    at t.<computed> ((index):13:4850)
    at <anonymous>:1:1
```

This is what our cors middleware is going to help us with. We are going to use it to let our server know that Emile's website is trusted and solve this. We do this adding cors and telling express that we want to use it. We also add Emile's web address to the "allowed" list.

```
const cors = require("cors");

app.use(cors({
  origin: 'https://www.emileholba.co.uk'
}));
```

And there it is - we can now access these resources from Emile's website. <br><br>

That, in essence, is what cors middleware is for - it allows us to easily manage a complicated problem when we are managing the server (managing it the other way - i.e. when someone else is managing the server and we want access is a different matter entirely).
