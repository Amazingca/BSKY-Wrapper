import { parseURL, checkUrl, stoppedBuildingUser } from "../../../location.js";
import { hasStoppedBuilding } from "../../../feed.js";
import { votePost } from "../../../api.js";

export function activateListeners() {
  
  const upvoteB = document.getElementsByClassName("upvoteB");
  const repostB = document.getElementsByClassName("repostB");
  
  //const repostElements = document.getElementsByClassName(`repost_${postId}-${postCid}`);
  //const upvoteElements = document.getElementsByClassName(`upvote_${postId}-${postCid}`);
  
  for (var i = 0; i < upvoteB.length; i++) {
    
    upvoteB[i].addEventListener("click", async function() {
      
      const actionType = this.classList[1];
      
      try {
        
        const req = await votePost(actionType.split("_")[0], actionType.split("_")[1].split("-")[0], actionType.split("_")[1].split("-")[1]);
        
        if (req[0] === true) {
          
          if (req[1] === "upvoted") {
            
            const occurence = document.getElementsByClassName(actionType);
            
            for (var o = 0; o < occurence.length; o++) {
              
              occurence[o].classList.add(actionType.replace("upvote", "devote"));

              occurence[o].innerHTML = `<path d="M7.655 14.916v-.001h-.002l-.006-.003-.018-.01a22.066 22.066 0 0 1-3.744-2.584C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.044 5.231-3.886 6.818a22.094 22.094 0 0 1-3.433 2.414 7.152 7.152 0 0 1-.31.17l-.018.01-.008.004a.75.75 0 0 1-.69 0Z"></path>`;

              var likeCount = Number.parseInt(occurence[o].nextElementSibling.innerHTML) + 1;
              occurence[o].nextElementSibling.innerHTML = likeCount;
              
              occurence[o].classList.remove(actionType);
            }
          } else if (req[1] === "devoted") {
            
            const occurence = document.getElementsByClassName(actionType);
            
            for (var o = 0; o < occurence.length; o++) {
              
              occurence[o].classList.add(actionType.replace("devote", "upvote"));

              occurence[o].innerHTML = `<path d="m8 14.25.345.666a.75.75 0 0 1-.69 0l-.008-.004-.018-.01a7.152 7.152 0 0 1-.31-.17 22.055 22.055 0 0 1-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.066 22.066 0 0 1-3.744 2.584l-.018.01-.006.003h-.002ZM4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.58 20.58 0 0 0 8 13.393a20.58 20.58 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z"></path>`;

              var likeCount = Number.parseInt(occurence[o].nextElementSibling.innerHTML) - 1;
              occurence[o].nextElementSibling.innerHTML = likeCount;
              
              occurence[o].classList.remove(actionType);
            }
          }
        } else {
          
          throw "Error";
        }
      } catch (e) {
        
        console.log(e);
        window.alert("This action could not be made!");
      }
    });
  }

  var userRedirs = document.getElementsByClassName("userRedir");
  var userMentionRedirs = document.getElementsByClassName("mention");
  
  userRedirs = [...userRedirs, ...userMentionRedirs];

  for (var i = 0; i < userRedirs.length; i++) {

    userRedirs[i].addEventListener("click", function() {

      const userHandle = this.innerHTML.replaceAll("@", "");

      if (hasStoppedBuilding && stoppedBuildingUser) {
        
        window.history.pushState(null, null, document.location.origin + "/user/" + userHandle);
        checkUrl(parseURL(document.location.pathname));
      } else {

        window.location.href = document.location.origin + "/user/" + userHandle
      }
    });
  }

  const postRedirs = document.getElementsByClassName("postRedir");

  for (var i = 0; i < postRedirs.length; i++) {

    postRedirs[i].addEventListener("click", function() {

      const location = this.title.split("- ")[1].split("#");

      const userHandle = location[0];
      const postId = location[1];

      if (hasStoppedBuilding && stoppedBuildingUser) {

        window.history.pushState(null, null, document.location.origin + "/user/" + userHandle + "/post/" + postId);
        checkUrl(parseURL(document.location.pathname));
      } else {

        window.location.href = document.location.origin + "/user/" + userHandle + "/post/" + postId;
      }
    });
  }

  const profileRedirs = document.getElementsByClassName("profileRedir");

  for (var i = 0; i < profileRedirs.length; i++) {

    profileRedirs[i].addEventListener("click", function() {

      const userDid = localStorage.getItem("userDid");

      if (hasStoppedBuilding && stoppedBuildingUser) {

        window.history.pushState(null, null, document.location.origin + "/user/" + userDid);
        checkUrl(parseURL(document.location.pathname));
      } else {

        window.location.href = document.location.origin + "/user/" + userDid;
      }
    });
  }

  const followingRedirs = document.getElementsByClassName("followingRedir");

  for (var i = 0; i < followingRedirs.length; i++) {

    followingRedirs[i].addEventListener("click", function() {

      const userHandle = this.title;

      if (hasStoppedBuilding && stoppedBuildingUser) {

        window.history.pushState(null, null, document.location.origin + "/user/" + userHandle + "/following");
        checkUrl(parseURL(document.location.pathname));
      } else {

        window.location.href = document.location.origin + "/user/" + userHandle + "/following";
      }
    });
  }
}
