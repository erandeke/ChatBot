


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

token="EAAFD9j5qh50BAHTva5cJG1Dx4ZCP4mRUxArviXiEXJxuK6ycxA0ogq6vr1ofT6SZCQ2TFVQbToXAseceF4gMLZB3nWi23xk7l5UkZCsvq1O40HbudcaLnqEqtS5qH6TNSgRVmUZBjkZBf4fKinNLUBewQLEdemhI6972HZATk1SWWsna7TbXpQV"

app.post('/webhook/',function(req,res)
{
  let messaging_events=req.body.entry[0].messaging_events
  //iterate through each event or message
  for(let i=0; i<messaging_events.length;i++)
  {
  	let event=messaging_events[i]
  	//sender
  	let sender=event.sender.id
     //if there is a  message and message has text then
      if(event.message && event.message.text)
      {
      	//variable for saving our text
       
        let text=event.message.text
        //send the text back with sender id 
        //create a function with sendText

        sendText(sender,"Text echo:" +text.substring(0,100))




      }
    

  }
  res.sendStatus(200)
})

//listening the port



function sendText(sender, text)
{
	//store the each text for th text
	let messageData= {text:text}
    request
    ({
      
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: {access_token,token},
      method:"POST",
      json:
      {
      	receipt:{id:sender},
      	message:messageData
      }

    },function(error,response,body)
    {
    	if(error)
    	{
    		console.log("error")
    	}
    	elseif(response.body.error)
    	{
           console.log("response body error")
    	}
    })

}


app.listen(app.get('port'), function()
{
	console.log("listening:port")

	});


