var optionsData = nodecg.Replicant("optionsData");
var optionsActiveData = nodecg.Replicant("optionsActiveData");
var optionsNextData = nodecg.Replicant("optionsNextData");

var changeCropData = nodecg.Replicant("changeCropData");

var speedcontrolBundle = "nodecg-speedcontrol";
var runDataActiveRun = nodecg.Replicant("runDataActiveRun", speedcontrolBundle);
var runDataArray = nodecg.Replicant("runDataArray", speedcontrolBundle);

var idRun = 0;
var idNextRun = 0;
const gameName = document.getElementById("gameName");
const couch = document.getElementById("couch");
const layout = document.getElementById("layout");
const crop = document.getElementById("crops");

const gameNameNext = document.getElementById("gameNameNext");
const layoutNext = document.getElementById("layoutNext");
const cropNext = document.getElementById("cropsNext");
const couchNext = document.getElementById("couchNext");

optionsData.on("change", (newVal, oldVal) => {
  if (newVal != oldVal) {
    nodecg.readReplicant(
      "runDataActiveRun",
      speedcontrolBundle,
      (activeVal) => {
        SetActive(activeVal);
      }
    );
  }
});

runDataActiveRun.on("change", (newVal, oldVal) => {
  if (newVal != oldVal) SetActive(newVal);
});

runDataArray.on("change", (newVal, oldVal) => {
  if (newVal != oldVal) SetAll(newVal);
});

optionsActiveData.on("change", (newVal, oldVal) => {
  if (newVal != oldVal) {
    gameName.innerHTML = newVal.gameName ? newVal.gameName : "";
    var text =
      "<button onclick='SetRatio(\"" +
      newVal.idRun +
      '","' +
      newVal.layout +
      "\")'>setRatio</button>";
    layout.innerHTML = (newVal.layout ? newVal.layout : "") + text;
    var htmlCrops = "";
    if (newVal.crops) {
      newVal.crops.forEach((crop) => {
        if (htmlCrops != "") {
          htmlCrops += "<br>";
        }
        htmlCrops +=
          '<button class="nodecg-configure round-button" nodecg-dialog="setCrop" onclick="openCrop(\'' +
          newVal.idRun +
          "','" +
          crop.channel +
          "','" +
          newVal.layout +
          "','" +
          crop.prop +
          "')\">Crop</button>";
      });
      crop.innerHTML = htmlCrops;
    }
    couch.value = (newVal.couch ? newVal.couch : "");
  }
});

optionsNextData.on("change", (newVal, oldVal) => {
  if (newVal != oldVal) {
    gameNameNext.innerHTML = newVal.gameName ? newVal.gameName : "";
    var text =
      "<button onclick='SetRatio(\"" +
      newVal.idRun +
      '","' +
      newVal.layout +
      "\")'>setRatio</button>";
    layoutNext.innerHTML = (newVal.layout ? newVal.layout : "") + text;
    var htmlCrops = "";
    if (newVal.crops) {
      newVal.crops.forEach((crop) => {
        if (htmlCrops != "") {
          htmlCrops += "<br>";
        }

        htmlCrops +=
          '<button class="nodecg-configure round-button" nodecg-dialog="setCrop" onclick="openCrop(\'' +
          newVal.idRun +
          "','" +
          crop.channel +
          "','" +
          newVal.layout +
          "','" +
          crop.prop +
          "')\">Crop</button>";
      });
      cropNext.innerHTML = htmlCrops;
    }
    couchNext.value = (newVal.couch ? newVal.couch : "");

  }
});

function openCrop(id, channel, layout, prop) {
  var data = {
    id: id,
    channel: channel,
    layout: layout,
    prop: prop,
  };
  changeCropData.value = data;
}

function SetAll(runs) {
  var optList = [];

  runs.forEach((element) => {
    var players = [];
    for (var i = 0; i < element.teams.length; i++) {
      for (var j = 0; j < element.teams[i].players.length; j++) {
        players.push({
          prop: "100",
          channel: element.teams[i].players[j].social.twitch,
        });
      }
    }

    var thisOptions = {
      idRun: element.id,
      gameName: element.game,
      layout: "16",
      crops: players,
    };

    optList.push(thisOptions);
  });

  var newList = [];
  nodecg.readReplicant("optionsData", "Brat", (optionsOld) => {
    optList.forEach((opt) => {
      optionsOld.forEach((old) => {
        if (opt.idRun == old.idRun) {
          opt.layout = old.layout;
          opt.gameName = old.gameName;
          opt.crops = old.crops;
        }
      });
      newList.push(opt);
    });
    optionsData.value = newList;
  });
}

function SetActive(activeRun) {
  var next = false;
  nodecg.readReplicant("optionsData", "Brat", (optionsOld) => {
    optionsOld.forEach((opt) => {
      if (next) {
        optionsNextData.value = opt;
        idNextRun = opt.idRun
        next = false;
      }
      if (opt.idRun == activeRun.id) {
        optionsActiveData.value = opt;
        idRun = opt.idRun
        next = true;
      }
    });
  });
}

function SetRatio(id, layout) {
  var newList = [];
  nodecg.readReplicant("optionsData", "Brat", (optionsOld) => {
    optionsOld.forEach((run) => {
      if (id == run.idRun) {
        if (layout == "16") {
          run.layout = "4";
        } else {
          run.layout = "16";
        }
      }
      newList.push(run);
    });
    optionsData.value = newList;
  });
}

function SetCouch(act) {
  var test = 0;
  if (act) {
    ch = couch.value
    test = idRun
  } else { 
    ch = couchNext.value
    test = idNextRun
  }

  var newList = [];
  nodecg.readReplicant("optionsData", "Brat", (optionsOld) => {
    optionsOld.forEach((run) => {
      if (test == run.idRun) {
        run.couch = ch;
      }
      newList.push(run);
    });
    optionsData.value = newList;
  });
}