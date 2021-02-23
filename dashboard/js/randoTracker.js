
var randoTracker = nodecg.Replicant("randoTracker");


var locationList = ["???", "FREE", "DKT", "DDC", "JJB", "FOR", "WAT", "FIR", "SPR", "SHD"];


var data = {
    layout: "OOT",
    itens: [
        //jewels
        {
            type: "item",
            name: "bomb",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "slingshot",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "boomerang",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "bow",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "dins_fire",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "hammer",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "hookshot",
            have: 0,
            max: 2,
            location: ""
        },
        {
            type: "item",
            name: "forca",
            have: 0,
            max: 3,
            location: ""
        },
        {
            type: "item",
            name: "hover_boots",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "iron_boots",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "mirror_shield",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "light_arrows",
            have: 0,
            max: 1,
            location: ""
        },
        
        {
            type: "break",
        },
        {
            type: "music",
            name: "ZL",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "epona",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "sarias",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "suns",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "storms",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "time",
            have: 0,
            max: 1,
            location: ""
        },


        {
            type: "music",
            name: "minuet",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "bolero",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "serenade",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "nocturne",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "requiem",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "prelude",
            have: 0,
            max: 1,
            location: ""
        },
        
        
        {
            type: "break",
        },
        {
            type: "jewel",
            name: "forestmed",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "jewel",
            name: "firemed",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "jewel",
            name: "watermed",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "jewel",
            name: "shadowmed",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "jewel",
            name: "spiritmed",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "jewel",
            name: "lightmed",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "jewel",
            name: "Kokiri",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "jewel",
            name: "ruby",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "jewel",
            name: "zora",
            have: 0,
            max: 1,
            location: "???"
        },
    ]
};


randoTracker.on("change", (newVal, oldVal) => { 
    if (!newVal) {
        randoTracker.value = data;
    }
    else { 
        updateTracker(newVal)
    }
});

function resetTracker() { 
    randoTracker.value = data;
}

function updateTracker(newVal) {
    var medalwidth = "65px";
    var medalheight = "70px";
    var itemwidth = "50px";
    var itemheight = "50px";
    var musicwidth = "50px";
    var musicheight = "50px";

    if (newVal.layout == "OOT") {
        var randoTrackerDiv = document.getElementById("randoTracker");
        randoTrackerDiv.style.height = "180px";
        var tracker = "<div style = 'margin-left:5px;'>";
        newVal.itens.forEach(element => {
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
                    case "jewel":
                        tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//OOT//" + imgName + ".png\"); width:" + medalwidth + ";height :" + medalheight + "' onclick=\"addItem('" + element.name + "')\"><div class='location' style='margin-top:45px' onclick=\"rotateLocation('" + element.name + "','" + element.location + "')\">" + element.location + "</div></div>";
                    break;
                    case "item":
                        tracker += "<div style='display:inline-block;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//OOT//" + imgName + ".png\"); width:" + itemwidth + ";height :" + itemheight + "' onclick=\"addItem('" + element.name + "')\"></div>";
                    break;
                    case "music":
                        tracker += "<div style='display:inline-block;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//OOT//" + imgName + ".png\"); width:" + musicwidth + ";height :" + musicheight + "' onclick=\"addItem('" + element.name + "')\"></div>";
                     break;
                }
            }
        });
        tracker += "</div>";

        randoTrackerDiv.innerHTML = tracker;
    }
}
var prior = false;
function rotateLocation(name, location) {
    prior = true;
     
    var nextLoc = "";
    var ins = false;
    locationList.forEach((loc) => {
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
            optionsOld.itens.forEach((item) => {
                if (item.name == name) {
                    item.location = nextLoc;
                }
                newList.push(item);
            });
            var full = {
                layout:optionsOld.layout,
                itens: newList
            }
            randoTracker.value = full;
        }
    });

    setTimeout(() => {
        prior = false
    }, 300);
}


function addItem(name) { 
    setTimeout(() => {
        if (prior == false) {
            var newList = [];
            nodecg.readReplicant("randoTracker", "Brat", (optionsOld) => {
                if (optionsOld) {
                    optionsOld.itens.forEach((item) => {
                        if (item.name == name) {
                            item.have = item.have + 1;
                            if (item.have > item.max) {
                                item.have = 0;
                            }
                        }
                        newList.push(item);
                    });

                    var full = {
                        layout: optionsOld.layout,
                        itens: newList
                    }

                    randoTracker.value = full;
                }
            });
        }
    }, 200);
}