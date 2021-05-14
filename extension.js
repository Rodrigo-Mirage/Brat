'use strict';

const {OBSUtility} = require('nodecg-utility-obs');

module.exports = function (nodecg) {

    const obs = new OBSUtility(nodecg, {namespace: 'obs'});
    obs.replicants.websocket.on('change', () => {/* ... */});
    obs.replicants.programScene.on('change', () => {/* ... */});
    obs.replicants.previewScene.on('change', () => {/* ... */});
    obs.replicants.sceneList.on('change', () => {/* ... */});
    obs.replicants.transitioning.on('change', () => {/* ... */});
    obs.replicants.studioMode.on('change', () => {/* ... */});

}

