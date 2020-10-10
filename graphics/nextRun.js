var next4runs = nodecg.Replicant("next4runs");
var embed = document.getElementById("TPlayers");
var nextrun;

var embedData;

next4runs.on("change", (newVal, oldVal) => {
  if (newVal) {
    nextrun = newVal[0];
    updateSceneFields(nextrun);
    LoadVideos();
  }
});

var options = {
  width: 854,
  height: 480,
  channel: "",
  parent: "localhost",
  autoplay: true,
  muted: false,
};

function updateSceneFields(runData) {
  var playerNumber = 0;

  var tags = "";
  var lista = [];

  for (var i = 0; i < runData.teams.length; i++) {
    for (var j = 0; j < runData.teams[i].players.length; j++) {
      lista.push({
        status: "Play",
        volume: "0.0",
        channel: runData.teams[i].players[j].social.twitch,
      });
    }
  }

  embedData = { players: lista };
  //LoadVideos(embedData);
}

function LoadVideos() {
  var players = embedData.players;
  var tags = "";
  console.log(players);
  for (var j = 0; j < players.length; j++) {
    tags += "<div id='TwitchPlayer" + j + "'></div>";
  }

  embed.innerHTML = tags;

  EmbedList = [];
  for (var j = 0; j < players.length; j++) {
    var options2 = {
      width: options.width,
      height: options.height,
      channel: players[j].channel ? players[j].channel : "brat2",
      parent: "localhost",
      autoplay: true,
    };
    var TwitchPlayer = new Twitch.Player("TwitchPlayer" + j, options2);
    TwitchPlayer.setVolume(players[j].volume);
    EmbedList.push(TwitchPlayer);
  }
}
