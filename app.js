function wConditions(t)
{
var description="";
var image="";
switch(t){
 case 0: description="tornado"; image="icon-8.svg";break;
  case 1: description="tropical storm"; image="icon-12.svg";break;
  case 2: description="hurricane"; image="icon-8.svg";break;
  case 3: description="severe thunderstorms"; image="icon-11.svg";break;
  case 4: description="thunderstorms"; image="icon-12.svg";break;
  case 5: description="mixed rain and snow"; image="icon-13.svg";break;
  case 6: description="mixed rain and sleet"; image="icon-4.svg";break;
  case 7: description="mixed snow and sleet"; image="icon-13.svg";break;
  case 8: description="freezing drizzle"; image="icon-13.svg";break;
  case 9: description="drizzle"; image="icon-9.svg";break;
  case 10: description="freezing rain"; image="icon-9.svg";break;
  case 11: description="showers"; image="icon-10.svg";break;
  case 12: description="showers"; image="icon-10.svg";break;
  case 13: description="snow flurries"; image="icon-13.svg";break;
  case 14: description="light snow showers"; image="icon-13.svg";break;
  case 15: description="blowing snow"; image="icon-14.svg";break;
  case 16: description="snow"; image="icon-14.svg";break;
  case 17: description="hail"; image="icon-7.svg";break;
  case 18: description="sleet"; image="icon-8.svg";break;
  case 19: description="dust"; image="icon-8.svg";break;
  case 20: description="foggy"; image="icon-8.svg";break;
  case 21: description="haze"; image="icon-8.svg";break;
  case 22: description="smoky"; image="icon-8.svg";break;
  case 23: description="blustery"; image="icon-8.svg";break;
  case 24: description="windy"; image="icon-7.svg";break;
  case 25: description="cold"; image="icon-14.svg";break;
  case 26: description="cloudy"; image="icon-6.svg";break;
  case 27: description="mostly cloudy"; image="icon-6.svg";break;
  case 28: description="mostly cloudy"; image="icon-3.svg";break;
  case 29: description="partly cloudy"; image="icon-5.svg";break;
  case 30: description="partly cloudy"; image="icon-3.svg";break;
  case 31: description="clear"; image="icon-1.svg";break;
  case 32: description="sunny"; image="icon-2.svg";break;
  case 33: description="fair"; image="icon-1.svg";break;
  case 34: description="fair"; image="icon-1.svg";break;
  case 35: description="mixed rain and hail"; image="icon-4.svg";break;
  case 36: description="hot"; image="icon-2.svg";break;
  case 37: description="isolated thunderstorms"; image="icon-12.svg";break;
  case 38: description="scattered thunderstorms"; image="icon-11.svg";break;
  case 39: description="scattered thunderstorms"; image="icon-11.svg";break;
  case 40: description="scattered showers"; image="icon-10.svg";break;
  case 41: description="heavy snow"; image="icon-14.svg";break;
  case 42: description="scattered snow showers"; image="icon-14.svg";break;
  case 43: description="heavy snow"; image="icon-14.svg";break;
  case 44: description="partly cloudy"; image="icon-3.svg";break;
  case 45: description="thundershowers"; image="icon-12.svg";break;
  case 46: description="snow showers"; image="icon-14.svg";break;
  case 47: description="isolated thundershowers"; image="icon-11.svg";break;

}
var arry = [description,image];
return arry;
}


function  degToCompass(num){
    var val=((num/22.5)+0.5);
    arr=["NORTH","NORTH EAST","NORTH EAST","EAST NORTH EAST","EAST","EAST SOUTH EAST", "SOUTH EAST", "SOUTH EAST","SOUTH","SOUTH  WEST","SOUTH WEST","WEST SOUTH WEST","WEST","WEST NORTH WEST","NORTH WEST","NORTH WEST"];
    return arr[(val % 16)];
    }

function getWeather(loc){
var xmlhttp = new XMLHttpRequest();
var url = "https://query.yahooapis.com/v1/public/yql?q=select wind,item,atmosphere,location from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+loc+"')&format=json";

xmlhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
     var mainArr = myArr.query.results.channel.item;
    // alert();
    var wind = myArr.query.results.channel.wind;
    var forecast = mainArr.forecast;
    var location = myArr.query.results.channel.location;
    var atmosphere= myArr.query.results.channel.atmosphere;
   
   var cels0 = (((forecast[0]['high']-32)*5)/9);
   var cond  =  wConditions(parseInt(forecast[0]['code']));
   
   var mainstring1 = '';
   mainstring1  = '<div class="today forecast"><div class="forecast-header"><div class="day">'+forecast[0]['day']+'</div><div class="date">'+forecast[0]['date']+'</div></div><div class="forecast-content"><div class="location">'+location['city']+', '+location['region']+' , '+location['country']+' ( '+cond[0]+' )</div><div class="degree"><div class="num">'+Math.round(cels0)+'<sup>o</sup>C</div><div class="forecast-icon"><img src="images/icons/'+cond[1]+'" alt="" width=90></div></div><span>Humidity: '+atmosphere['humidity']+'%</span><span>Wind Speed: '+wind['speed']+' mph</span></div>';
   
   document.getElementById('forecast-container').innerHTML = mainstring1 ;	
   var mainstring = '';	
   for(var i = 1;i<7;i++)
   {
   var cels0 = (((forecast[i]['high']-32)*5)/9);
   var cels0_low = (((forecast[i]['low']-32)*5)/9);
   
    var cond2  =  wConditions(parseInt(forecast[i]['code']));
   //alert(forecast[i]["date"]);
   
   mainstring ='<div class="forecast"><div class="forecast-header"><div class="day">'+forecast[i]['day']+'</div></div><div class="forecast-content"><div class="forecast-icon"><img src="images/icons/'+cond2[1]+'" alt="" width=48></div><div class="degree">'+Math.round(cels0)+'<sup>o</sup>C</div><small>'+Math.round(cels0_low)+'<sup>o</sup></small><div><span style="font-size:13px;">'+cond2[0]+'</span></div></div></div>';
   
	document.getElementById('forecast-container').innerHTML += mainstring ;					
						
   };

    };
};

xmlhttp.open("GET", url, true);
xmlhttp.send();
}

getWeather("surrey canada");
