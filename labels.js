var OGDids;
var BSKYStaff;

if (localStorage.getItem("userDid") != null) {
  
  document.getElementById("labelCheckFlagged").disabled = false;
  document.getElementById("labelOfCheckFlagged").classList.remove("disabledFlag");
}

async function buildPreReqs() {
  
  if (localStorage.getItem("labels") != null) {

    const labelSwitches = JSON.parse(localStorage.getItem("labels"));

    for (var i = 0; i < Object.keys(labelSwitches).length; i++) {

      if (labelSwitches[Object.keys(labelSwitches)[i]] === "true") {

        switch (Object.keys(labelSwitches)[i]) {
          case "EarlyAccounts":
            document.getElementById("labelCheckOGDids").checked = true;

            try {

              OGDids = await fetch("../../../flags/OGDids.json").then(r => r.json());
            } catch (e) {

              console.log(e);
            }
            break;
          case "BlueskyStaff":
             document.getElementById("labelCheckBSKYStaff").checked = true;

            try {

              BSKYStaff = await fetch("../../../flags/BSKYStaff.json").then(r => r.json());
            } catch (e) {

              console.log(e);
            }
            break;
          case "LabeledAccounts":
            document.getElementById("labelCheckFlagged").checked = true;
            break;
          default:
            break;
        }
      }
    }
  }
}

buildPreReqs();

var value = [];

document.getElementById("labelCheckOGDids").addEventListener("change", function() {
  
  value[0] = "EarlyAccounts";
  value[1] = document.getElementById("labelCheckOGDids").checked;
  
  booleanToString(value);
});

document.getElementById("labelCheckBSKYStaff").addEventListener("change", function() {
  
  value[0] = "BlueskyStaff";
  value[1] = document.getElementById("labelCheckBSKYStaff").checked;
  
  booleanToString(value);
});

document.getElementById("labelCheckFlagged").addEventListener("change", function() {
  
  value[0] = "LabeledAccounts";
  value[1] = document.getElementById("labelCheckFlagged").checked;
  
  booleanToString(value);
});

function booleanToString(value) {
  
  if (value[1]) {
    
    value[1] = "true";
  } else {
    
    value[1] = "false";
  }
  
  saveLabels();
}

function saveLabels() {
  
  if (localStorage.getItem("labels") != null) {
    
    var cache = JSON.parse(localStorage.getItem("labels"));
    
    cache[value[0]] = value[1];
    
    localStorage.setItem("labels", JSON.stringify(cache));
  } else {
    
    var cache = {};
    
    cache[value[0]] = value[1];
    
    localStorage.setItem("labels", JSON.stringify(cache));
  }
  
  value = [];
}

function checkForLabels(did, labels) {
  
  if (localStorage.getItem("labels") === null) {
    
    return "";
  }
  
  const flagSaveData = JSON.parse(localStorage.getItem("labels"));
  
  if (Object.keys(flagSaveData).length === 0) {
    
    return "";
  }
  
  var enabledFlags = [];
  
  for (var i = 0; i < Object.keys(flagSaveData).length; i++) {
    
    if (flagSaveData[Object.keys(flagSaveData)[i]] === "true") {
      
      enabledFlags.push(Object.keys(flagSaveData)[i]);
    }
  }
  
  if (enabledFlags.length === 0) {
    
    return "";
  }
  
  var flagHTML = "";
  
  if (labels != null) {
    console.log("has labels")
  }
  
  for (var i = 0; i < enabledFlags.length; i++) {
    
    switch (enabledFlags[i]) {
      case "EarlyAccounts":
        
        for (var o = 0; o < OGDids.length; o++) {
          
          if (did === OGDids[o]) {
            
            flagHTML += "<h5 style='padding: 0.25rem; padding-right: 0.5rem; padding-bottom: 0px; text-align: center; background-image: linear-gradient(to bottom right, #0099ffAA, #3b82f6FF); -webkit-text-fill-color: white; width: fit-content; border-radius: 10px;'>OG Account</h5>";
          }
        }
        break;
      case "BlueskyStaff":
        
        for (var o = 0; o < BSKYStaff.length; o++) {
          
          if (did === BSKYStaff[o]) {
            
            flagHTML += "<h5 style='padding: 0.25rem; padding-right: 0.5rem; padding-bottom: 0px; text-align: center; background-image: linear-gradient(to bottom right, #0099ffAA, #3b82f6FF); -webkit-text-fill-color: white; width: fit-content; border-radius: 10px;'>Bluesky Staff</h5>";
          }
        }
        break;
      case "LabeledAccounts":
        
        if (labels != null) {
        console.log(labels)
          for (var o = 0; o < labels.length; o++) {
            
            flagHTML += `<h5 title="Created by ${labels[o].src} on ${labels[o].cts}" style='padding: 0.25rem; padding-bottom: 0px; text-align: center; background-image: linear-gradient(to bottom right, #ff0000aa, #c21313ff); -webkit-text-fill-color: white; width: fit-content; border-radius: 10px;'>${labels[o].val}</h5>`;
          }
        }
        break;
      default:
        break;
    }
  }
  
  if (flagHTML === "") {
    
    return [false];
  } else {
    
    return [true, flagHTML];
  }
}

export function labelHandle(did, textSize, handle, sourceLabels) {
  
  var labels;
  
  if (sourceLabels != null) {
    
    labels = checkForLabels(did, sourceLabels);
  } else {
    
    labels = checkForLabels(did, null);
  }
  
  if (labels[0] === true) {
    
    console.log('labeled', labels[1], did)
    return `<h3 style="color: var(--redir-primary); ${textSize}"><flex style="justify-content: space-between;"><div>@<a onclick="addLocation(event);" href="${document.location.origin + document.location.pathname}/user/${handle}" title="Go to User Profile" class="userRedir">${handle}</a></div><flex>${labels[1]}</flex></flex></h3>`;
  } else {
    
    return `<h3 style="color: var(--redir-primary); ${textSize}">@<a onclick="addLocation(event);" href="${document.location.origin + document.location.pathname}/user/${handle}" title="Go to User Profile" class="userRedir">${handle}</a></h3>`;
  }
}

export function labelUsername(did, textSize, displayName, sourceLabels) {
  
  var labels;
  
  if (sourceLabels != null) {
    
    labels = checkForLabels(did, sourceLabels);
  } else {
    
    labels = checkForLabels(did, null);
  }
  
  if (labels[0] === true) {
    
    return `<h3 style="${textSize}"><flex style="justify-content: space-between;"><div>${displayName}</div><flex>${labels[1]}</flex></flex></h3>`;
  } else {
    
    return `<h3 style="${textSize}">${displayName}</h3>`;
  }
}

export function labelStruct(did, sourceLabels) {
  
  var labels;
  
  if (sourceLabels != null) {
    
    labels = checkForLabels(did, sourceLabels);
  } else {
    
    labels = checkForLabels(did, null);
  }
  
  if (labels[0] === true) {
    
    return labels[1];
  } else {
    
    return "";
  }
}

export function isExplicit(labels) {
  
  const flagSaveData = JSON.parse(localStorage.getItem("labels"));
  
  var enabledFlags = ["LabeledAccounts"];
  
  if (flagSaveData) {

    for (var i = 0; i < Object.keys(flagSaveData).length; i++) {
      
      if (flagSaveData[Object.keys(flagSaveData)[i]] === "true") {

        var insideAlready = false;
        for (var o = 0; i < enabledFlags.length; o++) {

          if (Object.keys(flagSaveData)[i] === enabledFlags[o]) {

            insideAlready = true;
          }
        }

        if (insideAlready === false) {

          enabledFlags.push(Object.keys(flagSaveData)[i]);
        }
      }
    }
  }
  
  if (enabledFlags.length === 0) {
    
    return "";
  }

  var isExplicit = false;
  
  if (labels === null) {
    
    return isExplicit;
  }
  
  for (var i = 0; i < enabledFlags.length; i++) {

    if (enabledFlags[i] === "LabeledAccounts") {

      for (var flag of labels) {
        console.log(labels)
        if ((flag.val === "sexual") || (flag.val === "porn") || (flag.val === "nudity")) {
  
          isExplicit = true;
        }
      }
    }
  }

  return isExplicit;
}