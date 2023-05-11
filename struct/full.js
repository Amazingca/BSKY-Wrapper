import { getPost, getUserRepo, listRecords, getUserInfo } from "../api.js";
import { labelHandle, labelUsername, labelStruct } from "../labels.js";
import { embeds, reactorContructor } from "../mods.js";

// Saved post dates and id
// <div style="color: #333; display: none;">${new Date(postObj.record.createdAt)}</div>
// <div style="color: #333; display: none;"><a onclick="addLocation();" href="${document.location.origin + document.location.pathname}?username=${userObj.handle}&postid=${postObj.uri.split("/")[postObj.uri.split("/").length - 1]}">id#${postObj.uri.split("/")[postObj.uri.split("/").length - 1]}</a></div>

export async function postFull(userId, post, type) {
  
  var userProfileObj;
  var userObj;
  var postObj;
  
  if(type === "snippet") {
    
    userObj = post.author;
    postObj = post;
  } else {
    
    userObj = post.post.author;
    postObj = post.post;
  }
  
  if ((userObj === null) || (postObj === null)) {
    
    return null;
  } else {
    
    var replostSumElement = "";
    
      
    if (post.reply != null) {
        
          
      const replyAuthorDid = post.reply.parent.author.did;
          
      var replyAuthorName;
          
      const replyAuthorProfile = post.reply.parent.author;
        
      if (replyAuthorProfile.displayName === "") {
            
        replyAuthorName = "@" + replyAuthorProfile.handle;
      } else {
            
        replyAuthorName = replyAuthorProfile.displayName;
      }
          
      replostSumElement = 
        `<a style="text-decoration: none;" onclick="addLocation();" href="${document.location.origin + document.location.pathname}?username=${userObj.handle}&postid=${postObj.uri.split("/")[postObj.uri.split("/").length - 1]}" title="Go to Thread">
          <flex class="reply-sum">
            <svg fill="#555" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M6.78 1.97a.75.75 0 0 1 0 1.06L3.81 6h6.44A4.75 4.75 0 0 1 15 10.75v2.5a.75.75 0 0 1-1.5 0v-2.5a3.25 3.25 0 0 0-3.25-3.25H3.81l2.97 2.97a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L1.47 7.28a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"></path></svg>
            <h5>Replied to ${replyAuthorName}</h5>
          </flex>
        </a>`;
    }
    
    if (post.reason != null) {
      
      const repostAuthorDid = post.reason.by.did;
          
      var repostAuthorName;
          
      const repostAuthorProfile = post.reason.by;
      
      if (repostAuthorProfile.displayName === "") {
            
        repostAuthorName = "@" + repostAuthorProfile.handle;
      } else {
            
        repostAuthorName = repostAuthorProfile.displayName;
      }
      
      replostSumElement = 
        `<a style="text-decoration: none;" onclick="addLocation();" href="${document.location.origin + document.location.pathname}?username=${repostAuthorDid}" title="Go to Thread">
          <flex class="reply-sum">
            <svg fill="#555" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M5.22 14.78a.75.75 0 0 0 1.06-1.06L4.56 12h8.69a.75.75 0 0 0 0-1.5H4.56l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3a.75.75 0 0 0 0 1.06l3 3Zm5.56-6.5a.75.75 0 1 1-1.06-1.06l1.72-1.72H2.75a.75.75 0 0 1 0-1.5h8.69L9.72 2.28a.75.75 0 0 1 1.06-1.06l3 3a.75.75 0 0 1 0 1.06l-3 3Z"></path></svg>
            <h5>Reposted by ${repostAuthorName}</h5>
          </flex>
        </a>`;
    }
    
    var imgSize = "50";
    var textType = "";
    var textSize = "";
    if (type === "snippet") {
      
      imgSize = "25";
      textType = "display: flex; align-items: center; gap: 0.25rem;";
      textSize = "font-size: 16px;";
    }
    
    /*var usernameElement;
    
    if (userObj.displayName === undefined) {
      
      usernameElement = "";
    } else {
      
      usernameElement = `<h3 style="${textSize}">${userObj.displayName}</h3>`;
    }*/
    
    var usernameElement;
    var handleElement;
    
    var labels = null;
    
    if (postObj.labels.length != 0) {
      
      window.alert("Found flagged account!");
      labels = postObj.labels;
    } else if (userObj.labels.length != 0) {
      
      if (labels === null) {
        
        labels = userObj.labels;
      } else {
        
        for (var i = 0; i < userObj.labels.length; i++) {
          
          labels.concat(userObj.labels);
        }
      }
    }
    
    if (userObj.displayName === undefined) {
      
      usernameElement = "";
      handleElement = labelHandle(userObj.did, "", userObj.handle, labels);
    } else {
      
      usernameElement = labelUsername(userObj.did, "", userObj.displayName, labels);
      handleElement = `<h3 style="color: #555;">@<a onclick="addLocation();" href="${document.location.origin + document.location.pathname}?username=${userObj.handle}" title="Go to User Profile">${userObj.handle}</a></h3>`;
    }
    
    var postText;
    
    if ((type === "snippet") || (type === "light")) {
      
      postObj.record = postObj.value;
    }
    
    var hasFacets = false;
    try {
      if (postObj.record["facets"]) {
        hasFacets = true;
      }
    } catch (e) {
      
      console.log("No facets in post.");
    }
    
    if (hasFacets) {
      
      var selection = [];

      for (var i = 0; i < postObj.record.facets.length; i++) {

        if (postObj.record.facets[i].$type === "app.bsky.richtext.facet") {
          
          const startPos = postObj.record.facets[i].index.byteStart;
          const endPos = postObj.record.facets[i].index.byteEnd;
          const mentionLength = endPos - startPos;
          
          selection[i] = [];
          selection[i][0] = postObj.record.facets[i].features[0].$type;
          selection[i][1] = "";
          selection[i][2] = "";
          
          if (postObj.record.facets[i].features[0].did != undefined) {
            
            selection[i][2] = postObj.record.facets[i].features[0].did;
          } else if (postObj.record.facets[i].features[0].uri != undefined) {
            
            selection[i][2] = postObj.record.facets[i].features[0].uri;
          }

          for (var o = 0; o < mentionLength; o++) {

            selection[i][1] = selection[i][1] + postObj.record.text.split("")[o + startPos];
          }
          
          //console.log(selection[i][1], selection[i][1].split("").length, mentionLength);
        }
      }
      
      for (var i = 0; i < selection.length; i++) {
        
        if (selection[i] === undefined) {
          
          continue;
        }
        
        if (selection[i][0] === "app.bsky.richtext.facet#mention") {
          
          postObj.record.text = postObj.record.text.replaceAll(selection[i][1], `<a href="${document.location.origin + document.location.pathname}?username=${selection[i][2]}" class="mention">${selection[i][1]}</a>`);
        } else if (selection[i][0] === "app.bsky.richtext.facet#link") {
          
          postObj.record.text = postObj.record.text.replaceAll(selection[i][1], `<a href="${selection[i][2]}" target="_blank" class="mention">${selection[i][1]}</a>`);
        }
      }
    }
    
    if (postObj.embed != undefined) {
      
      if (postObj.record.text != "") {

        postText = postObj.record.text.replaceAll("\n", "<br>") + "<br><br>" + await embeds(postObj.embed);
      } else {

        postText = await embeds(postObj.embed);
      }
    } else {

      postText = postObj.record.text.replaceAll("\n", "<br>");
    }
    
    
    var userProfileImage;
    if (postObj.author.avatar != undefined) {
      
      userProfileImage = `<img style="border-radius: 50%;" src="${postObj.author.avatar}" width="${imgSize}" height="${imgSize}">`;
    } else {
      
      userProfileImage = `<div class="default-user-photo">${postObj.author.handle.split("")[0].toUpperCase()}</div>`;
    }
    
    var reactors = "";
    if ((postObj.replyCount != undefined) && (postObj.repostCount != undefined) && (postObj.likeCount != undefined)) {
      
      reactors = reactorContructor(postObj, null);
    }
    
    const postElement = 
      `<div>
        ${replostSumElement}
        <div class="full-feed-container">
          <div style="margin: 0.5rem">
            <flex>
              ${userProfileImage}
              <div style="width: -webkit-fill-available; ${textType}">
                ${usernameElement}
                ${handleElement}
              </div>
            </flex>
            <br>
            <div title="${new Date(postObj.record.createdAt)}" onclick="addLocation();" href="${document.location.origin + document.location.pathname}?username=${userObj.handle}&postid=${postObj.uri.split("/")[postObj.uri.split("/").length - 1]}">${postText}</div>
          </div>
          ${reactors}
        </div>
      </div>`;
    
    return postElement;
  }
}

export async function postModalBuild() {
  
  const userInfo = await getUserInfo();
  
  var userInitial;
  
  if (userInfo.displayName != undefined) {
    
    userInitial = userInfo.displayName.split("")[0].toUpperCase();
  } else {
    
    userInitial = userInfo.handle.split("")[0].toUpperCase();
  }
  
  var userProfileImage;
  if (userInfo.avatar != undefined) {
    userProfileImage = `<img style="border-radius: 50%;" src="${userInfo.avatar}" width="64" height="64">`;
  } else {
    userProfileImage = `<div class="default-user-photo post">${userInitial}</div>`;
  }
  
  document.getElementById("flex-post-area").innerHTML =
    `<spacer>${userProfileImage}
      <div class="post-options"></div>
      <div id="text-amount-indicator">300</div>
      <div class="post-options"></div>
      <button class="cover" onclick="chooseImage();">
        <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="32" height="32"><path d="M12.212 3.02a1.753 1.753 0 0 0-2.478.003l-5.83 5.83a3.007 3.007 0 0 0-.88 2.127c0 .795.315 1.551.88 2.116.567.567 1.333.89 2.126.89.79 0 1.548-.321 2.116-.89l5.48-5.48a.75.75 0 0 1 1.061 1.06l-5.48 5.48a4.492 4.492 0 0 1-3.177 1.33c-1.2 0-2.345-.487-3.187-1.33a4.483 4.483 0 0 1-1.32-3.177c0-1.195.475-2.341 1.32-3.186l5.83-5.83a3.25 3.25 0 0 1 5.553 2.297c0 .863-.343 1.691-.953 2.301L7.439 12.39c-.375.377-.884.59-1.416.593a1.998 1.998 0 0 1-1.412-.593 1.992 1.992 0 0 1 0-2.828l5.48-5.48a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-5.48 5.48a.492.492 0 0 0 0 .707.499.499 0 0 0 .352.154.51.51 0 0 0 .356-.154l5.833-5.827a1.755 1.755 0 0 0 0-2.481Z"></path></svg>
      </button>
      <button class="cover" onclick="addLink();">
        <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="32" height="32"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg>
      </button>
    </spacer>
    <textarea type="text" placeholder="Your post goes here..." maxlength="300" id="post-text"></textarea>`;
  
  document.getElementById("post-text").addEventListener("input", function() {
      
    document.getElementById("text-amount-indicator").style.setProperty("--deg", (document.getElementById("post-text").value.split("").length * (360 / 300)) + "deg");
    document.getElementById("text-amount-indicator").innerHTML = (300 - document.getElementById("post-text").value.split("").length);
  });
}

export async function userInfoModalBuild() {
  
  const userInfo = await getUserInfo();
  console.log(userInfo)
  var userInitial;
  
  if (userInfo.displayName != undefined) {
    
    userInitial = userInfo.displayName.split("")[0].toUpperCase();
  } else {
    
    userInitial = userInfo.handle.split("")[0].toUpperCase();
  }
  
  var userProfileImageMobile;
  var userProfileImageDesktop;
  if (userInfo.avatar != undefined) {
    
    userProfileImageMobile = `<img style="border-radius: 50%;" src="${userInfo.avatar}" width="45" height="45">`;
    userProfileImageDesktop = `<img style="border-radius: 50%;" src="${userInfo.avatar}" width="55" height="55">`;
  } else {
    
    userProfileImageMobile = `<div style="width: 45px; height: 45px; font-size: 1.5rem;" class="default-user-photo post">${userInitial}</div>`;
    userProfileImageDesktop = `<div style="width: 55px; height: 55px; font-size: 1.75rem;" class="default-user-photo post">${userInitial}</div>`;
  }
  
  var username = "";
  if (userInfo.displayName != undefined) {
    
    username = `<div>${userInfo.displayName}</div>`
  }
  
  var labels;
  
  if (userInfo.labels != null) {
    
    labels = labelStruct(userInfo.did, userInfo.labels);
  } else {
    
    labels = labelStruct(userInfo.did, null);
  }
  
  var labelsMobile = "";
  var labelsDesktop = "";
  
  if (labels != "") {
    
    labelsMobile = `<div style="font-size: 1rem; font-weight: 700 !important; color: #555;">Account Labels</div><div style="display: flex; justify-content: flex-end; gap: 0.25rem;">${labels}</div>`;
    labelsDesktop = `<div style="margin: 0.5rem; font-weight: 700 !important; color: #555;">Account Labels:</div><div style="margin: 0.5rem; display: flex; gap: 0.25rem;">${labels}</div>`;
  }
  
  document.getElementById("profileInfoModal").innerHTML =
    `<div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin: 0.5rem;">
      <div>
        <h5 style="font-size: 1rem;">
          @${userInfo.handle}
        </h5>
        ${username}
      </div>
      ${userProfileImageMobile}
    </div>
    <div style="display: flex; gap: 0.5rem; justify-content: flex-end; flex-direction: column; margin: 0.5rem;">
      ${labelsMobile}
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem; font-size: 1rem;">
        <div style="font-weight: 700 !important;">
          ${userInfo.followersCount}
        </div>
        <div style="font-weight: 700 !important; color: #555;">
          Followers
        </div>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem; font-size: 1rem;">
        <div style="font-weight: 700 !important;">
          ${userInfo.followsCount}
        </div>
        <div style="font-weight: 700 !important; color: #555;">
          Following
        </div>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem; font-size: 1rem;">
        <div style="font-weight: 700 !important;">
          ${userInfo.postsCount}
        </div>
        <div style="font-weight: 700 !important; color: #555;">
          Posts
        </div>
      </div>
    </div>
    <div class="user-options"></div>
    <div style="display: flex; flex-direction: column;">
      <button class="userInfoOptionsButton" style="display: none;">Go to Profile</button>
      <button onclick="logout();" class="userInfoOptionsButton" style="color: #ff4a4a; border-bottom-left-radius: 9px; border-bottom-right-radius: 9px;">Logout</button>
    </div>`;
  
  document.getElementById("userInfoDesktop").innerHTML =
    `<div style="display: flex; gap: 0.5rem; align-items: center; margin: 0.5rem; margin-bottom: 0px;overflow-x: hidden; ">
      ${userProfileImageDesktop}
      </div>
      <div style="font-weight: 700 !important; font-size: 1.3rem; padding: 0.5rem;">
        ${username}
        <h5 title="@${userInfo.handle}" style="font-size: 1.1rem;">
          @${userInfo.handle}
        </h5>
      </div>
      ${labelsDesktop}
      <div style="display: flex; flex-direction: column; gap: 0.5rem; padding: 0.5rem;">
        <div style="display: flex; gap: 0.5rem;">
          <div style="font-weight: 700 !important; color: #555;">
            Followers:
          </div>
          <div style="font-weight: 700 !important;">
            ${userInfo.followersCount}
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <div style="font-weight: 700 !important; color: #555;">
            Following:
          </div>
          <div style="font-weight: 700 !important;">
            ${userInfo.followsCount}
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <div style="font-weight: 700 !important; color: #555;">
            Posts made:
          </div>
          <div style="font-weight: 700 !important;">
            ${userInfo.postsCount}
          </div>
        </div>
      </div>`;
}
