const element = document.getElementById("hostName");
const total = document.getElementById("total");
var speedcontrolBundle = "nodecg-speedcontrol";
var hostName = nodecg.Replicant("hostName");
var donateTotal = nodecg.Replicant("donateTotal");


hostName.on("change", (newVal, oldVal) => {
  if (newVal) {
      element.value = newVal;
  }
});

donateTotal.on("change", (newVal, oldVal) => {
  if (newVal) {
      total.innerText = "Total arrecadado: R$"+ newVal;
  }
});


function newName(e) {
    var name = e.value;
    hostName.value = name;
}
