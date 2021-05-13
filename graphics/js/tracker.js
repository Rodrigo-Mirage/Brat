var speedcontrolBundle = 'nodecg-speedcontrol';
var ProgramScene = nodecg.Replicant('obs:programScene');
var LayoutConfigs = nodecg.Replicant('layoutConfigs');
var videoCrops = nodecg.Replicant('videocrops');

var randomLayout = null;
var randoTracker = nodecg.Replicant("randoTracker");
var randoBase = nodecg.Replicant("randoBase");


var timer = nodecg.Replicant("timer", speedcontrolBundle);
var runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
var optionsActiveData = nodecg.Replicant("optionsActiveData");
var embedData = nodecg.Replicant("embedData");


//elements

const maintimer = document.getElementById("RaceTimer");
const timerDiv = document.getElementById("timer");
const playerNameDiv = document.getElementById("playerName");

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const pl = urlParams.get('pl');
var player = pl-1 || 0;
var layout = "OOT";


randoTracker.on("change", (newVal, oldVal) => {
    updateTracker(newVal)
});

function resetTracker(player) {    
    nodecg.readReplicant("randoTracker", "Brat", (optionsOld) => {
        var newData =
        {
            layout: optionsOld.layout,
            itens: optionsOld.itens
        }
        if (optionsOld.layout == "OOT") {
            newData.itens[player] = baseData[0];
        }
        if (optionsOld.layout == "MMR") {
            newData.itens[player] = baseData[1];
        }
        if (layout == "ALTTP") {
            newData.itens[player] = baseData[2];
        }
        if (layout == "SMZ3") {
            newData.itens[player] = baseData[3];
        }
        randoTracker.value = newData;
    });
}

function updateTracker(newVal) {

    var medalwidth = "65px";
    var medalheight = "70px";


    var prizemarginT = "30px";
    var prizemargin = "5px";
    var prizewidth = "50px";
    var prizeheight = "20px";


    var itemwidth = "50px";
    var itemheight = "50px";

    layout = newVal.layout;
    var randoTrackerDiv = document.getElementById("tracker");
    randoTrackerDiv.style.height = "auto";
    randoTrackerDiv.innerHTML = "";
    var i = player;
    var newcontent = document.createElement('div');

    var tracker = "<span>Player " +(i+1) + " - "+playerName+"<span></br>";
    newVal.itens[i].forEach(element => {
        var imgName = element.name;
        if (element.have == 0) {
            imgName += "_fade";
        } else {
            if (element.have != element.max || (element.have == element.max && element.max != 1) ) {
                imgName += "_" + element.have;
            }
        }
        
        if (element.type == "break") {
            tracker += "</div><div style = 'margin-left:5px;'>";

        } else { 
            switch (element.type) {
                //OOT
                case "jewel":
                    tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + medalwidth + ";height :" + medalheight + "' onclick=\"addItem('" + element.name + "','"+layout+"',"+i+")\"><div class='location' style='margin-top:45px;z-index: 100' onclick=\"rotateLocation('" + element.name + "','" + element.location + "','"+newVal.layout+"',"+i+")\">" + element.location + "</div></div>";
                break;
                case "medal":
                    tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + itemwidth + ";height :" + itemheight + "' onclick=\"addItem('" + element.name + "','"+layout+"',"+i+")\"><div class='location' style='margin-top:35px;z-index: 100' onclick=\"rotateLocation('" + element.name + "','" + element.location + "','"+newVal.layout+"',"+i+")\">" + element.location + "</div></div>";
                break;
                case "location":
                    tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain;background-position: center; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + itemwidth + ";height :" + itemheight + "' onclick=\"addItem('" + element.name + "','"+layout+"',"+i+")\"><div class='location' onclick=\"rotatePrize('" + element.name + "','" + element.prize + "','"+newVal.layout+"',"+i+")\" style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;z-index: 100;background-size: contain;margin-top:"+prizemarginT+";margin-left:"+prizemargin+"; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + element.prize + ".png\"); width:" + prizewidth + ";height :" + prizeheight + "'></div></div>";
                break;
                case "item":
                case "music":
                case "transf_mask":
                case "boss_mask":
                    tracker += "<div style='display:inline-block;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + itemwidth + ";height :" + itemheight + "' onclick=\"addItem('" + element.name + "','"+layout+"',"+i+")\"></div>";
                    break;
                case "space":
                    tracker += "<div style='display:inline-block;background-repeat: no-repeat;background-size: contain; width:" + itemwidth + ";height :" + itemheight + "' ></div>";
                    break;
            }
        }
    });
    tracker += `<button onclick="resetTracker(${i})">Reset</button>`;    

    newcontent.innerHTML = tracker;
    randoTrackerDiv.appendChild(newcontent);


}

var prior = false;

function rotateLocation(name, location, type, player) {
    prior = true;
    var list = [];
    if (type == "OOT") {
        list = locationListOOT;
    }
    if (type == "ALTTP" || type == "SMZ3") {
        list = magicListALTTP;
    }
    
    var nextLoc = "";
    var ins = false;
    list.forEach((loc) => {
        if (ins) { 
            nextLoc = loc
            ins = false;
        }
        if (location == loc) { 
            ins = true;
        }
    });
    if (nextLoc == "") { 
        nextLoc = "???";
    }

    var newList = [];
    nodecg.readReplicant("randoTracker", "Brat", (optionsOld) => {

        if (optionsOld) {
            var itens = [];
            for (i = 0; i < player; i++) {
                itens[i] = optionsOld.itens[i]
            }

            optionsOld.itens[player].forEach((item) => {
                if (item.name == name) {
                    item.location = nextLoc;
                }
                newList.push(item);
            });

            itens[player] = newList;
            for (i = player+1; i < optionsOld.itens.length; i++) {
                itens[i] = optionsOld.itens[i]
            }

            var full = {
                layout:optionsOld.layout,
                itens: itens
            }

            randoTracker.value = full;
        }
    });
    setTimeout(() => {
        prior = false
    }, 300);
}

function rotatePrize(name, prize, type, player) {
    prior = true;
     
    var nextLoc = "";
    var ins = false;
    locationListALTTP.forEach((loc) => {
        if (ins) { 
            nextLoc = loc
            ins = false;
        }
        if (prize == loc) { 
            ins = true;
        }
    });
    if (nextLoc == "") { 
        nextLoc = "unk";
    }

    var newList = [];
    nodecg.readReplicant("randoTracker", "Brat", (optionsOld) => {

        if (optionsOld) {
            var itens = [];
            for (i = 0; i < player; i++) {
                itens[i] = optionsOld.itens[i]
            }

            optionsOld.itens[player].forEach((item) => {
                if (item.name == name) {
                    item.prize = nextLoc;
                }
                newList.push(item);
            });

            itens[player] = newList;
            for (i = player+1; i < optionsOld.itens.length; i++) {
                itens[i] = optionsOld.itens[i]
            }

            var full = {
                layout:optionsOld.layout,
                itens: itens
            }

            randoTracker.value = full;
        }
    });

    setTimeout(() => {
        prior = false
    }, 300);
}

function addItem(name, layout, player) {
    setTimeout(() => {
        if (prior == false) {
            var newList = [];
            nodecg.readReplicant("randoTracker", "Brat", (optionsOld) => {
                if (optionsOld) {

                    
                    var itens = [];
                    for (i = 0; i < player; i++) {
                        itens.push(optionsOld.itens[i]);
                    }

                    optionsOld.itens[player].forEach((item) => {
                        if (item.name == name) {
                            item.have = item.have + 1;
                            if (item.have > item.max) {
                                item.have = 0;
                            }
                        }
                        newList.push(item);
                    });

                    itens.push(newList);
                    for (i = player+1; i < optionsOld.itens.length; i++) {
                        itens.push(optionsOld.itens[i]);
                    }

                    var full = {
                        layout:optionsOld.layout,
                        itens: itens
                    }
                    randoTracker.value = full;

                }
            });
        }
    }, 200);
}


var baseData = [];
var locationListOOT = [];
var locationListALTTP = [];
var magicListALTTP = [];
var optionsData = [];

embedData.on("change", (newVal, oldVal) => {
    optionsData = newVal;
    console.log(optionsData);
});
  

randoBase.on("change", (newVal, oldVal) => {

    baseData = newVal.baseData;
    locationListOOT = newVal.locationListOOT;
    locationListALTTP = newVal.locationListALTTP;
    magicListALTTP = newVal.magicListALTTP;

});


var id = "";
var playerName = "";

runDataActiveRun.on("change", (newVal, oldVal) => {
    updateSceneFields(newVal);
});

function updateSceneFields(runData) {
    id = runData.teams[player].id;
    nodecg.readReplicant("embedData", "Brat", (optionsOld) => {
        if(optionsOld.players[player]){
            LoadVideos(optionsOld.players[player]);
            playerNameDiv.innerHTML = optionsOld.players[player].channel;
        }
        nodecg.readReplicant("embedData", "Brat", (time) => {
            console.log(time)
            if(id!= ""){
                if (time.teamFinishTimes) {
                    if (time.teamFinishTimes[id]) {
                        timerDiv.innerHTML = time.teamFinishTimes[id].time;
                    }
                }
            }
        });
    });
}

timer.on("change", (newVal, oldVal) => {
    maintimer.innerHTML = newVal.time;
    if(id!= ""){
        if (newVal.teamFinishTimes) {
            if (newVal.teamFinishTimes[id]) {
                timerDiv.innerHTML = newVal.teamFinishTimes[id].time;
            }else{
                timerDiv.innerHTML = newVal.time;
            }
        }else{
            timerDiv.innerHTML = newVal.time;
        }
    }else{
        timerDiv.innerHTML = newVal.time;
    }
});

function LoadVideos(playerData) {
    var options = {
        width: 800,
        height: 450,
        channel: playerData.channel ? playerData.channel : "brat2",
        parent: "localhost",
        autoplay: true,
        muted: false
    };
    
    var div = document.getElementById("containerPlayer");
    div.innerHTML = "";

    if (div) { 
        var TwitchPlayer = new Twitch.Player("containerPlayer",options);
        TwitchPlayer.setVolume(parseFloat(playerData.volume));
    }
}