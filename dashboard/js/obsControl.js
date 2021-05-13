var scene = document.getElementById('scene');	
        
var speedcontrolBundle = 'nodecg-speedcontrol';
var runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
var ProgramScene = nodecg.Replicant('obs:programScene');

var LayoutConfigs = nodecg.Replicant('layoutConfigs');
var videoCrops = nodecg.Replicant('videocrops');

var atual = {};
        
var videosConfig = {};

var videosList = [];

var playerList = [];

LayoutConfigs.on('change',(newval,oldval)=>{
    videosConfig = newval.config;
    videosList = newval.list;
});

videoCrops.on('change',(newval,oldval)=>{
    playerList = newval;
});

runDataActiveRun.on('change', (newVal, oldVal) => {
    if (newVal){
        atual = newVal;
        updateScene(newVal);
    }
}); 

ProgramScene.on('change', (newVal, oldVal) => {
    
    if (newVal)
        scene.innerHTML = newVal.name;
});

function InterMission(){
    nodecg.sendMessage('obs:previewScene', 'InterMission').then(() => {
        nodecg.sendMessage('obs:transition', 'Fade').then(() => {
        }).catch(err => {
        });
    }).catch(err => {
    });
}

function Entrevista(){
    nodecg.sendMessage('obs:previewScene', 'Entrevista').then(() => {

        nodecg.sendMessage('obs:transition', 'Fade').then(() => {
        }).catch(err => {
        });
    }).catch(err => {
    });
}

function Run (){
    updateScene(atual);
}

function updateScene(runData){
    var count = 0;
    for (var i=0; i < runData.teams.length ;i++){
        for (var j=0; j < runData.teams[i].players.length ;j++){
            count++;
        }				
    }

    var cena = 'Main';

    nodecg.sendMessage('obs:previewScene', cena).then(() => {
        nodecg.sendMessage('obs:transition', 'Fade').then(() => {
        }).catch(err => {
        });
    }).catch(err => {
    });
}

function test(){
    console.log("Start");
    nodecg.sendMessage('obs:sendMessage', { 'messageName':"GetSceneList" }, (data)=>{
        if (data.scenes.filter(e => e.name == 'Main').length == 0 ) {
            nodecg.sendMessage('obs:sendMessage', { 'messageName':'CreateScene','data': {
                'sceneName': "Main"
            }}, (reateData)=>{

                nodecg.sendMessage('obs:sendMessage', { 'messageName':'GetSceneItemList', 'data': { 'sceneName': 'Main' }} , (createData) => {
                    for (var i = 0;i < videosList.length ;i++) {
                        setUrl(createData.sceneItems, "Main", 'Player'+(i+1) , videosList[i].x, videosList[i].y,playerList[i])
                    }
                })
            });
        }else{
            nodecg.sendMessage('obs:sendMessage', { 'messageName':'GetSceneItemList', 'data': { 'sceneName': 'Main' }} , (createData) => {
                for (var i = 0;i < videosList.length ;i++) {
                    setUrl(createData.sceneItems, "Main", 'Player'+(i+1) , videosList[i].x, videosList[i].y,playerList[i])
                }
            })
        }
    })
}

function setUrl(list, scene, source, x, y, playerData) {
    var url = 'https://player.twitch.tv/?channel=' + playerData.twitch + '&enableExtensions=true&muted=false&parent=twitch.tv&player=popout&volume='+playerData.volume
    if (list.filter(e => e.sourceName == source).length > 0) {
        nodecg.sendMessage('obs:sendMessage', { 'messageName':'SetSceneItemProperties', 'data': {
            'sceneName': scene,
            'item': source,
            'bounds': {
                type: "OBS_BOUNDS_STRETCH",
                y:videosConfig.height,
                x:videosConfig.width
            },
            'position': {
                'x': x,
                'y': y
            },
            'crop':playerData.crop
        }}, (e) => {
            nodecg.sendMessage('obs:sendMessage', { 'messageName':'SetSourceSettings', 'data': {
                'sceneName': scene,
                'sourceName': source,
                'sourceSettings': {
                    'url':url,
                    height:videosConfig.height,
                    width:videosConfig.width
                }
            }});
        });
    } else {
        var objData = {
            'sourceName': source,
            'sourceKind': "browser_source",
            'sceneName': "Main",
            'sourceSettings': {
                'url':url,
                height:videosConfig.height,
                width:videosConfig.width
            }
        };
        nodecg.sendMessage('obs:sendMessage', { 'messageName':'CreateSource', 'data': objData } , (e)=>{
            nodecg.sendMessage('obs:sendMessage', { 'messageName':'SetSceneItemProperties', 'data': {
                'sceneName': scene,
                'item': source,
                'bounds': {
                    type: "OBS_BOUNDS_STRETCH",
                    y:videosConfig.height,
                    x:videosConfig.width
                },
                'position': {
                    'x': x,
                    'y': y
                },
                'crop':playerData.crop
            }});
        });
    }

}