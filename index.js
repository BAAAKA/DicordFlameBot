const Discord = require('discord.js');
const client = new Discord.Client();



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//START MESSAGE
client.on('message', msg => {
   if (msg.content === 'ping') {
     msg.reply('I love you');
   }
   if (msg.content === 'lol') {
     msg.reply('lol?');
   }
   if (msg.content.startsWith("summoner: ")) {
     //GET API KEY
     var fs = require('fs');
     var codeFileName="../Stuff/riotAPIcode.txt"
     var apikey=fs.readFileSync(codeFileName, 'utf8');
     //Reading Links
     var summonerName=msg.content.substring(9).trim();
     msg.reply("You are the summoner: "+summonerName);
     //What Type of Request
     URLType="summonerByName"

     leagueRequest(getCompleteRequestUrl(summonerName,URLType,apikey),function(returnData){
       summonerBasicInfos=returnData;
       console.log(summonerBasicInfos["name"])
     });





   }
 }); //END MESSAGE
 //##########################################################################################
 //Functions
 //##########################################################################################
  function leagueRequest(completeRequestUrl,returnData){
    //JQuery Library...
    src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"
    //returnData to return Data because of asynchronous ajax
    $.ajax({ //FIX THIS
        url: completeRequestUrl,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
          //return json string parsed into object
          returnData(eval(data));
        },
        error: function() { alert('boo!'); },
        beforeSend: setHeader
    });
  }
  function getCompleteRequestUrl(summonerData,requestUrlName,apikey){
    var requestUrlList = {
      summonerByName:"https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/",
      leagueByID:"https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/",
      matchByAccountId:"https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/",
      theEnd:"?api_key=",
    };
    if(requestUrlName=="summonerByName"){
      summonerData=encodeURI(summonerData);
    }
    //combine URL with (Encoded Summonername) or other + API KEY "header" + API Key
    var CompleteRequestUrl=requestUrlList[requestUrlName].concat(summonerData.concat(requestUrlList["theEnd"].concat(apikey)));
    return CompleteRequestUrl;
  }
  function setHeader(xhr) {
      xhr.setRequestHeader('securityCode', 'Foo');
      xhr.setRequestHeader('passkey', 'Bar');
  }

client.login('NjQ5Mjk0NTY5MjI5Mzg1NzM4.Xd6zUA.HFJcExLY1xwScyBilutfuXqba54');
