# cors_exploring

I wanted to learn more about what the cors middleware is actually doing.

<br><br>

In this brief repo I am conducting some experiments in order to try and get a better idea.

<br><br>

From https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors

> CORS errors
Cross-Origin Resource Sharing (CORS) is a standard that allows a server to relax the same-origin policy. This is used to explicitly allow some cross-origin requests while rejecting others. For example, if a site offers an embeddable service, it may be necessary to relax certain restrictions. Setting up such a CORS configuration isn't necessarily easy and may present some challenges. In these pages, we'll look into some common CORS error messages and how to resolve them.
If the CORS configuration isn't setup correctly, the browser console will present an error like "Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at $somesite" indicating that the request was blocked due to violating the CORS security rules. This might not necessarily be a set-up mistake, though. It's possible that the request is in fact intentionally being disallowed by the user's web application and remote external service. However, If the endpoint is meant to be available, some debugging is needed to succeed.

If you don't set up CORS then accessing resources from a server different from your own will be a security concern for the browser and you will get an error message telling you that your request has failed. So let's look at how we can use nodeJS and the cors middleware to address this. 

First thing to do is to install express.

``` 
npm i express 
```
And then install cors.
```
npm i cors
```
