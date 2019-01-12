# vuejsSkillsTest_async

Test project to demonstrate development skills using vue .js.

### General requirements

You must implement SPA 
using vue.js@2. Each section must have its own url.
Separate sections should be implemented as loadable modules. The code / resources of each section should loading only after the transition to it.

#### Task #1: Fraction calculator
> It is necessary to implement the calculator of ordinary fractions.
> To the left of the “=” sign is an expression.
> To the right of the “=” sign is an result.
> The minimum set of operators - "+ - * /", the brackets will be a plus, to the right of the sign, the result is equal to the form of an irreducible ordinary fraction.

> When you click on the link "add fraction" in the expression on the left should be added one character (operator) and another fraction.

> Whenever data is changed, the expression must be recalculated.
> It is necessary to handle all sorts of erroneous input options.

#### Task #2: Interaction with the server using the websocket protocol.

There is a web server, connection to which occurs via the websocket protocol. Requests are sent to the server. Each request contains its own number. The server sends, in response to each request, a request number and some response.

```
Example:
Request "1, request body"  ->  response "1, response body"
Request "2, request body"  ->  response "2, response body"
```

**Important:** on both sides (server and client) the websocket protocol provide asynchronous processing. Those first the client can send 5 requests, and then get 5 answers.

**Problem:** the server may not respond in the order in which the requests were made. Every server response
requires unique actions on the client side. The server may not respond to any of the requests at all, verification is necessary (the ability to specify a timeout is optional).

```
Server address: 
ws://echo.websocket.org/
```

**Task:** implement asynchronous processing of server responses. Further description of what needs to be implemented.

> The page contains a list of 10 different comments.
Next to each comment there is a “delete” button.
When you click on this button forms a request to the server.


> At the beginning of each request indicates its number
(since the task is a test one, then it is not necessary to indicate anything other than the number).
Server response also contains the request number
(since the task is a test one, the server response contains only the number).
When receiving a correct response from the server to a request with a specific number, the desired comment removed from the list.


**Project created with [@vue/cli version 3](https://cli.vuejs.org).**

```
npm run serve
npm run build
npm run test
npm run lint
```