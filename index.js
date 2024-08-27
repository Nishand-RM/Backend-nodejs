//create a server

const http = require('http'); //commonjs method to import

//import http from 'http';//ES6 way to import 

//create a server object
const server = http.createServer((request,response)=>{
    const{url,method} = request;

    if(url === '/'){
        //return response.end("welcome to page");
        if(method === 'GET'){
            return response.end("GET METHOD");

        }

        else if(method === 'POST'){
            return response.end("POST METHOD");

        }

        else if(method === 'DELETE'){
            return response.end("DELETE METHOD");

        }
        else{
            return response.end('No method');
        }
    }
    else if(url === '/page'){
        return response.end("this is page endpoint");
    }
    
    else{
        return response.end("url not found");
    }
    /*console.log(request.method, request.url,request.headers);
    console.log(request.body);
    response.end("hello world");//write response to client*/

});

//start the server listening for request
server.listen(3001,'localhost',()=>{
    console.log("server is running on http://localhost:3001");
});