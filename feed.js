import { postDefault } from "./struct/default.js";
import { postFull } from "./struct/full.js";
import { getUserRepo, listRecords, getUserFeed } from "./api.js";
import { activateListeners } from "./listeners.js";
export var userCache;

async function initializeCaches() {
              
  var going = true;

  while (going) {

    try {

      userCache = await fetch("./dids/didCache.json").then(r => r.json());
      console.log(userCache);
      if (typeof userCache === "object") {

        going = false;
      }
    } catch (e) {

      console.log(e);
    }
  }  
}
            
initializeCaches();

var sortedObj = [];

export async function modifyFlow() {
  
  if (((localStorage.getItem("accessJwt") != null) && (localStorage.getItem("refreshJwt") != null)) && ((!localStorage.getItem("accessJwt").includes("undefined")) && (!localStorage.getItem("refreshJwt").includes("undefined")))) {
    
    userFeed();
  } else {
    
    artificialFeed();
  }
}

async function userFeed() {
  
  try {
    
    const userId = localStorage.getItem("userDid");
    const userFeed = await getUserFeed();
    
    console.log(userFeed);
    
    if (userFeed === null) {
      
      return;
    } else {
      
      var feedStruct = "";
      
      for (var postObj of userFeed.feed) {
        
        const postStruct = await postFull(userId, postObj);
        
        feedStruct = feedStruct + postStruct;
        
        document.getElementById("feedStruct").innerHTML = "<spacer>" + feedStruct + "</spacer>";
      }
      
      activateListeners();
    }
  } catch (e) {
    
    console.log(e);
  }
}

async function artificialFeed() {
  
  try {
    
    document.getElementById("feedStruct").innerHTML = "";

    for (var i = 0; i < userCache.length; i++) {
      
      const userDataObj = await getUserRepo(userCache[i]);

      if (userDataObj === null) {

        continue;
      }
      
      if (userDataObj.collections === undefined) {
        
        continue;
      }

      var hasPostCollection = false;

      //check whether user has "collection": app.bsky.feed.post
      //^ this will determine whether user has any posts and whether we should continue
      for (var o = 0; o < userDataObj.collections.length; o++) {

        if (userDataObj.collections[o] === "app.bsky.feed.post") {

          hasPostCollection = true;
        }
      }

      if (hasPostCollection === false) {

        continue;
      }
        
      const userMostRecentPost = await listRecords(userCache[i], "app.bsky.feed.post");

      sortPosts(Date.parse(userMostRecentPost[0].value.createdAt), await postDefault(userCache[i], userMostRecentPost[0]));
    }
  } catch(e) {
    
    console.log(e);
  }
}

function sortPosts(timestamp, newItem) {
  
  var recentCache = "";
  
  if (sortedObj.length === 0) {
    
    sortedObj[0] = [timestamp, newItem];
    
  } else if (sortedObj.length === 1) {
    
    if (timestamp < sortedObj[0][0]) {
      
      sortedObj.unshift([timestamp, newItem]);
    } else {
      
      sortedObj.push([timestamp, newItem]);
    }
  } else {
    
    for (var z = 0; z < sortedObj.length; z++) {
      
      if ((timestamp > sortedObj[z][0]) && ((z + 1) === sortedObj.length)) {
        
        sortedObj.splice(z + 1, 0, [timestamp, newItem]);
      } else if ((timestamp > sortedObj[z][0]) && (timestamp < sortedObj[z + 1][0])) {
        
        sortedObj.splice(z + 1, 0, [timestamp, newItem]);
      }
    }
  }
  
  for (var x = 0; x < sortedObj.length; x++) {
    
    recentCache = recentCache + sortedObj[sortedObj.length - x - 1][1];
  }
  
  document.getElementById("feedStruct").innerHTML = "<spacer>" + recentCache + "</spacer>";
}
