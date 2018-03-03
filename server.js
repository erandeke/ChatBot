


const express=require("express")
const bodyparser=require("body-parser")
const request=require("request")

//initialize the app

const app=express();

//set the port
//either use the default port means configured with that ENV (say cloud 9) or use 3030
app.set('port',(process.env.PORT || 3030));


//url encoding for processing the data as request  body needs to get parsed to  be used/process

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//Routes
app.get("/",function(req,res)
{

  res.send("Hi I am chat bot");
});

//Implementing  webhooks for configure them to cause events on one site to invoke behaviour on another which is facebook graph api
//everytime an event is made the app  will verify the token 'Kdelights'

app.get("/webhook/", function(req,res)
{
   if(req.query['hub.verify_token']==='Kdelights')
{
     res.send(req.query['hub.challenge'])
}
else
{
	res.send("WRONG TOKEN")
}

});

//listening the port

app.listen(app.get('port'), function()
{
	console.log("listening:port")

	});


