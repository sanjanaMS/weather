const express=require('express');
const https=require('https');
const bodyparser=require('body-parser');
const app=express();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){

res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
const query=req.body.cityName;
const appid="f085b5e14711f520bc9454bfd7a75f90";
const units="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q=" + query+ "&appid=" +appid+ "&units=" + units;
https.get(url,function(response){
  console.log(response.statusCode);
  response.on("data",function(data){

    const weatherData=JSON.parse(data);
  const temp=weatherData.main.temp;
  const weatherDescription=weatherData.weather[0].description;

  const icon=weatherData.weather[0].icon;
  const imageURL="http://openweathermap.org/img/wn/" + icon + "@2x.png";

  res.write( "<p>the weather is currently" + weatherDescription+"<p>");
  res.write("<h1> The temperature in" + query + " is" + temp + "celsius</h1>");
  res.write("<img src =" + imageURL+ ">");
  res.send();
  });
});

});





app.listen(3000,function(){
  console.log("server is running on port 3000");
});
