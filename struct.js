import { getPost, getUserRepo, listRecords} from "./api.js";
import { embeds } from "./mods.js";

export async function post(userId, post) {
  
  const userProfileObj = await listRecords(userId, "app.bsky.actor.profile");
  const userObj = await getUserRepo(userId);
  
  var postObj;
  
  if (typeof post === 'object' && post.constructor === Object) {
    
    postObj = post;
  } else {
    
    postObj = await getPost(userId, post);
  }
  
  if ((userObj === null) || (postObj === null)) {
    
    return null;
  } else {
    
    var usernameElement;
    
    if ((userProfileObj[0].value.displayName === "") || (userProfileObj[0].value.displayName === undefined)) {
      
      usernameElement = "";
    } else {
      
      usernameElement = `<h3>${userProfileObj[0].value.displayName}</h3>`;
    }
    
    var postText;
    
    if (postObj.value.embed != undefined) {
      
      if (postObj.value.text != "") {
        
        postText = postObj.value.text.replaceAll("\n", "<br>") + "<br><br>" + embeds(postObj.value.embed);
      } else {
        
        postText = embeds(postObj.value.embed);
      }
    } else {
      
      postText = postObj.value.text.replaceAll("\n", "<br>");
    }
    
    const postElement = 
      `<div class="feed-container">
        ${usernameElement}
        <h3 style="color: #555;">@<a href="${document.location.origin + document.location.pathname}?username=${userObj.handle}" title="Go to User Profile">${userObj.handle}</a></h3>
        <br>
        <div>${postText}</div>
        <br>
        <flex>
          <div style="color: #333;">${new Date(postObj.value.createdAt)}</div>
          <div style="color: #333;"><a href="${document.location.origin + document.location.pathname}?username=${userObj.handle}&postid=${postObj.uri.split("/")[postObj.uri.split("/").length - 1]}">id#${postObj.uri.split("/")[postObj.uri.split("/").length - 1]}</a></div>
        </flex>
      </div>`;
    
    return postElement;
  }
}

export async function user(userId) {
  
  const userProfileObj = await listRecords(userId, "app.bsky.actor.profile");
  const userFollows = await listRecords(userId, "app.bsky.graph.follow");
  const userObj = await getUserRepo(userId);
  
  if (userObj === null) {
    
    return null;
  } else {
    
    var usernameElement;
    
    if (userProfileObj[0].value.displayName === "") {
      
      usernameElement = "";
    } else {
      
      usernameElement = `<h3>${userProfileObj[0].value.displayName}</h3>`;
    }
    
    var userFollowing;
    
    if ((userFollows.length === 0) || (userFollows.length > 1)) {
      
      userFollowing = `Following: <a href="${document.location.origin + document.location.pathname}?username=${userObj.handle}&type=follows">${userFollows.length} users</a>`;
    } else {
      
      userFollowing = `Following: <a href="${document.location.origin + document.location.pathname}?username=${userObj.handle}&type=follows">${userFollows.length} user</a>`;
    }
    
    const userElement = 
      `<div class="feed-container">
        ${usernameElement}
        <h3 style="color: #555;">@${userObj.handle} / ${userObj.did}</h3>
        <br>
        <div id="user-description">${userProfileObj[0].value.description}</div>
        <br>
        <flex>
          <div id="user-follows">${userFollowing}</div>
        </flex>
      </div>`;
    
    return userElement;
  }
}

export async function userLight(userId) {
  
  const userProfileObj = await listRecords(userId, "app.bsky.actor.profile");
  const userObj = await getUserRepo(userId);
  
  if (userObj === null) {
  
    return "";
  } else {
    
    var usernameElement;
    
    if ((userProfileObj === null) || (userProfileObj[0].value.displayName === "") || (userProfileObj[0].value.displayName === undefined)) {
      
      usernameElement = "";
    } else {
      
      usernameElement = `<h3>${userProfileObj[0].value.displayName}</h3>`;
    }
    
    const userElement = 
      `<div class="feed-container">
        ${usernameElement}
        <h3 style="color: #555;">@<a href="${document.location.origin + document.location.pathname}?username=${userObj.handle}" title="Go to User Profile">${userObj.handle}</a></h3>
      </div>`;
    
    return userElement;
  }
  
}