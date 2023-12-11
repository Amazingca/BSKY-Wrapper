import { hasStoppedBuilding, stoppedBuilding, editExternalVars, modifyFlow } from "../../../feed.js";
import { nameResolver } from "../../../mods.js";
import { loadFirstReplies } from "../../../replies.js";
import { getPost, getUserRepo, listRecords, getSession, getUserNotifCount, isHidden } from "../../../api.js";
import { postDefault, user, userLight } from "../../../struct/default.js";
import { userInfoModalBuild, postModalBuild } from "../../../struct/full.js";
import { activateListeners } from "./listeners.js";

export var stoppedBuildingUser = true;

const url = document.location.search;
const urlParams = new URLSearchParams(url);
    
if (localStorage.getItem("introViewed") === null) {
      
    //document.getElementById("introMessage").classList.remove("hidden");
    localStorage.setItem("recent", "[]");
    localStorage.setItem("introViewed", true);
}
    
if (localStorage.getItem("rolodexVisible") != null) {
    
    if (localStorage.getItem("rolodexVisible") === "true") {
        
        document.getElementsByTagName('rolodex')[0].classList.add('visible');
        document.getElementsByTagName('grid')[0].classList.add('nav');
    }
}
    
if (((localStorage.getItem("accessJwt") != null) && (localStorage.getItem("refreshJwt") != null)) && ((!localStorage.getItem("accessJwt").includes("undefined")) && (!localStorage.getItem("refreshJwt").includes("undefined")))) {
    
    var tryForAuth = true;
    
    while(tryForAuth) {
        
        var userAuthed = await getSession();
        
        if (userAuthed === true) {
        
            tryForAuth = false;
            
            buildPreReqs();
        }
    }
}

async function buildPreReqs() {

    document.getElementById("loginMobile").classList.remove("active");
    document.getElementById("loginButton").classList.add("hidden");
    document.getElementById("logoutButton").classList.remove("hidden");
    
    userInfoModalBuild();
    postModalBuild();
    
    document.getElementById("new-post").style.display = "";

    const docURL = parseURL(document.location.pathname);
    
    if (document.location.hash === "#notifications") {
        
        document.getElementById("navNotifsDesktop").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="27" height="27"><path d="M8 16c.9 0 1.7-.6 1.9-1.5.1-.3-.1-.5-.4-.5h-3c-.3 0-.5.2-.4.5.2.9 1 1.5 1.9 1.5ZM3 5c0-2.8 2.2-5 5-5s5 2.2 5 5v3l1.7 2.6c.2.2.3.5.3.8 0 .8-.7 1.5-1.5 1.5h-11c-.8.1-1.5-.6-1.5-1.4 0-.3.1-.6.3-.8L3 8.1V5Z"></path></svg><div style="font-weight: 800 !important;">Notifications</div>`;
        document.getElementById("navNotifsMobile").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="24" height="24"><path d="M8 16c.9 0 1.7-.6 1.9-1.5.1-.3-.1-.5-.4-.5h-3c-.3 0-.5.2-.4.5.2.9 1 1.5 1.9 1.5ZM3 5c0-2.8 2.2-5 5-5s5 2.2 5 5v3l1.7 2.6c.2.2.3.5.3.8 0 .8-.7 1.5-1.5 1.5h-11c-.8.1-1.5-.6-1.5-1.4 0-.3.1-.6.3-.8L3 8.1V5Z"></path></svg>`;
    } else if (urlParams.get("username") === null) {
        
        document.getElementById("navButtonHomeDesktop").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="27" height="27"><defs/><g><path d="M6.906 0.664C7.54511 0.152016 8.45389 0.152016 9.093 0.664L14.343 4.864C14.758 5.196 15 5.699 15 6.231L15 13.25C15 14.2165 14.2165 15 13.25 15L9.75 15C9.33579 15 9 14.6642 9 14.25L9 9L7 9L7 14.25C7 14.6642 6.66421 15 6.25 15L2.75 15C1.7835 15 1 14.2165 1 13.25L1 6.23C1 5.699 1.242 5.196 1.657 4.864L6.907 0.664L6.906 0.664Z" fill-rule="nonzero" opacity="1" stroke="none"/></g></svg><div style="font-weight: 800 !important;">Home</div>`
        document.getElementById("navButtonHomeMobile").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="24" height="24"><defs/><g><path d="M6.906 0.664C7.54511 0.152016 8.45389 0.152016 9.093 0.664L14.343 4.864C14.758 5.196 15 5.699 15 6.231L15 13.25C15 14.2165 14.2165 15 13.25 15L9.75 15C9.33579 15 9 14.6642 9 14.25L9 9L7 9L7 14.25C7 14.6642 6.66421 15 6.25 15L2.75 15C1.7835 15 1 14.2165 1 13.25L1 6.23C1 5.699 1.242 5.196 1.657 4.864L6.907 0.664L6.906 0.664Z" fill-rule="nonzero" opacity="1" stroke="none"/></g></svg>`;
    }
    
    if (docURL[0] === "user") {

        const userObj = await getUserRepo(docURL[1].userHandle);

        if ((docURL[1].userHandle === localStorage.getItem("userDid")) || (userObj.did === localStorage.getItem("userDid"))) {

            document.getElementById("navButtonProfileDesktop").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="27" height="27"><path d="M4.243 4.757a3.757 3.757 0 1 1 5.851 3.119 6.006 6.006 0 0 1 3.9 5.339.75.75 0 0 1-.715.784H2.721a.75.75 0 0 1-.714-.784 6.006 6.006 0 0 1 3.9-5.34 3.753 3.753 0 0 1-1.664-3.118Z"></path></svg><div style="font-weight: 800 !important;">Profile</div>`
            document.getElementById("navButtonProfileMobile").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="24" height="24"><path d="M4.243 4.757a3.757 3.757 0 1 1 5.851 3.119 6.006 6.006 0 0 1 3.9 5.339.75.75 0 0 1-.715.784H2.721a.75.75 0 0 1-.714-.784 6.006 6.006 0 0 1 3.9-5.34 3.753 3.753 0 0 1-1.664-3.118Z"></path></svg>`;
        }
    }

    const notifCount = await getUserNotifCount();
    
    if (notifCount != 0) {
        
        document.getElementById("notifCountDesktop").innerHTML = notifCount;
        document.getElementById("notifCountDesktop").classList.remove("hidden");
        
        document.getElementById("notifCountMobile").innerHTML = notifCount;
        document.getElementById("notifCountMobile").classList.remove("hidden");
    }
    
    //document.getElementById("navButtonNotifsDesktop").href = document.location.origin + document.location.pathname + "#notifications";
    //document.getElementById("navButtonNotifsMobile").href = document.location.origin + document.location.pathname + "#notifications";
    
    document.getElementById("navButtonProfileDesktop").href = document.location.origin + "/user/" + localStorage.getItem("userDid");
    document.getElementById("navButtonProfileMobile").href = document.location.origin + "/user/" + localStorage.getItem("userDid");
    
    document.getElementById("directories").classList.remove("hidden");
    document.getElementById("navbar").classList.add("active");

    activateListeners();
}

if (document.location.pathname === "/") {
    
    localStorage.setItem("recent", "[]");
}

export function parseURL(path) {
    
    if ((path === "") || (path === "/")) {

        return ["home"];
    }

    path = path.split("");
    path[path.length] === "/" ? path.pop() : path;
    path.shift();
    path = path.join("");

    var arrayFactor = path.split("/");

    switch (arrayFactor[0]) {
        case "notifications":
            return ["notifications"];
            break;
        case "user":
            if (arrayFactor.length > 2) {
                switch (arrayFactor[2]) {
                    case "post":
                        if (arrayFactor.length > 3) {
                            return ["post", { "userHandle": arrayFactor[1], "postId": arrayFactor[3] }];
                        } else {
                            return ["home"];
                        }
                        break;
                    case "following":
                        return ["userFollowing", { "userHandle": arrayFactor[1] }];
                        break;
                    default:
                        return ["user", { "userHandle": arrayFactor[1] }];
                        break;
                }
            } else {
                return ["user", { "userHandle": arrayFactor[1] }];
            }
            break;
        default:
            return ["home"];
            break;
    }
}

console.log(parseURL(document.location.pathname));

checkUrl(parseURL(document.location.pathname));

export async function checkUrl(url) {

    try {

        var hasClearedAll = await clearLoaded();
        
        if (!hasClearedAll) {

            throw "clearLoaded() returned false!";
        } else {

            editExternalVars("stoppedBuilding", false);
        }
    } catch (e) {

        console.log("Issue clearing build state!", e);
    }

    console.log("Building now")
    
    if (url[0] != "home") {
    
        if ((url[1].userHandle.split("").length > 0) || url[1].userHandle.includes("did:plc:")) {

            if (url[0] === "post") {
                
                loadPost(url[1].userHandle, url[1].postId);
            } else {
                
                if (url[0] === "userFollowing") {
                
                    editExternalVars("hasStoppedBuilding", false);
                    getUserFollows(url[1].userHandle);
                } else {

                    editExternalVars("hasStoppedBuilding", false);
                    getUser(url[1].userHandle);
                }
            }
        } else {
        
            console.log("URL doesn't have any proper user id!")
            return;
        }
    } else {
        
        editExternalVars("hasStoppedBuilding", false);
        modifyFlow();
    }
}

async function loadPost(userId, postId) {
    
    document.getElementById("feed").classList.toggle("hidden");
    document.getElementById("post").classList.toggle("hidden");
    
    if ((!userId.includes(".bsky.social")) && (!userId.includes(".")) && (!userId.includes("did:plc:"))) {
        
        userId = userId + ".bsky.social";
    }
    
    try {
        
        const postObj = await getPost(userId, postId);
        
        document.getElementById("postContainer").innerHTML = await postDefault(userId, postId, "light");
        
        if (postObj.value.reply != undefined) {
        
            loadFirstReplies(postObj);
        }

        activateListeners();
    } catch(e) {
        
        console.log(e);
        return;
    }
}

async function getUser(userId) {
    
    document.getElementById("feed").classList.toggle("hidden");
    document.getElementById("user").classList.toggle("hidden");

    if ((!userId.includes(".bsky.social")) && (!userId.includes(".")) && (!userId.includes("did:plc:"))) {
        
        userId = userId + ".bsky.social";
    }
    
    try {
        
        const userObj = await getUserRepo(userId);
        
        userId = userObj.did;

        if (localStorage.getItem("accessJwt") == null) {

            if (await isHidden(userId)) {

                document.getElementById("userStruct").innerHTML = "<div class='feed-container'><h4>This user has opted into a no-visibility rule, so their profile will not be displayed.</h4></div>";
                return;
            }
        }
        
        var hasPosts = false;

        for (var i = 0; i < userObj.collections.length; i++) {
          
            if (userObj.collections[i] === "app.bsky.feed.post") {
              
                hasPosts = true;
            }
        }
        
        if (hasPosts === true) {
        
            const userModal = await user(userId) + `<br><br><h3 style="padding-left: 0.5rem;">${await nameResolver(userId)}'s Posts:</h3><br>`;
            
            const userPosts = await listRecords(userId, "app.bsky.feed.post");
            var tempPosts = "";
            
            for (var i = 0; i < userPosts.length; i++) {
                
                tempPosts = tempPosts + await postDefault(userId, userPosts[i]);
                document.getElementById("userStruct").innerHTML = userModal + "<spacer>" + tempPosts + "</spacer>";
                activateListeners();
            }

            editExternalVars("hasStoppedBuilding", true);
        } else {
        
            document.getElementById("userStruct").innerHTML = await user(userId);
            editExternalVars("hasStoppedBuilding", true);
            activateListeners();
        }
    } catch(e) {
        
        console.log(e);
    }
}

async function getUserFollows(userId) {
    
    document.getElementById("feed").classList.toggle("hidden");
    document.getElementById("user").classList.toggle("hidden");
    
    try {
        
        const userObj = await getUserRepo(userId);

        console.log("case case", userObj);
        
        userId = userObj.did;

        if (localStorage.getItem("accessJwt") == null) {

            if (await isHidden(userId)) {

                document.getElementById("userStruct").innerHTML = "<div class='feed-container'><h4>This user has opted into a no-visibility rule, so their profile will not be displayed.</h4></div>";
                return;
            }
        }
        
        var hasFollows = false;

        for (var i = 0; i < userObj.collections.length; i++) {
          
            if (userObj.collections[i] === "app.bsky.graph.follow") {
              
                hasFollows = true;
            }
        }
        
        if (hasFollows === true) {
        
            const userModal = await user(userId) + `<br><br><h3 style="padding-left: 0.5rem;">${await nameResolver(userId)}'s Following:</h3><br>`;
            
            const userFollows = await listRecords(userId, "app.bsky.graph.follow");
            var tempUsers = "";
            
            for (var i = 0; i < userFollows.length; i++) {

                console.log(i, userFollows[i].value.subject);
                tempUsers = tempUsers + await userLight(userFollows[i].value.subject);
                document.getElementById("userStruct").innerHTML = userModal + "<spacer>" + tempUsers + "</spacer>";

                activateListeners();
            }

            editExternalVars("hasStoppedBuilding", true);
        } else {
        
            document.getElementById("userStruct").innerHTML = "<h3>This user is not following any other users!</h3>";
        }
    } catch(e) {
        
        console.log(e);
    }
}
    
var userInfoVisible = false;

document.getElementById("userInfoButton").addEventListener("click", async function() {
    
    if (userInfoVisible === false) {
        
        document.getElementById("profileInfoModal").style.display = "block";
        
        setTimeout(function(){
        
            document.getElementById("profileInfoModal").style.right = "0.5rem";
            document.getElementById("profileInfoModal").style.bottom = "5.5rem";
        }, 1);
        
        document.getElementById("userInfoButton").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24" height="24"><defs/><g><path d="M5.16859 15.3916C4.94159 15.2435 4.81215 14.9844 4.83 14.714L4.993 11.384C4.995 11.299 4.943 11.168 4.786 11.068C3.05016 9.96776 1.99876 8.05515 2 6C1.99907 4.03876 2.95783 2.20117 4.567 1.08C5.06307 0.72296 5.72744 0.707075 6.24 1.04C6.702 1.336 7 1.867 7 2.463L7 5.283C7 5.365 7.041 5.443 7.11 5.489L7.86 5.999C7.94458 6.05617 8.05542 6.05617 8.14 5.999L8.89 5.489C8.95888 5.44265 9.00014 5.36502 9 5.282L9 2.463C9 1.867 9.298 1.336 9.76 1.04C10.2726 0.707075 10.9369 0.72296 11.433 1.08C13.0422 2.20117 14.0009 4.03876 14 6C14.0012 8.05515 12.9498 9.96776 11.214 11.068C11.057 11.168 11.005 11.298 11.007 11.383L11.17 14.713C11.1861 14.9826 11.0565 15.2401 10.8303 15.3877C10.6042 15.5353 5.39559 15.5396 5.16859 15.3916Z" fill-rule="nonzero" opacity="1" stroke="none"/></g></svg>`;
        
        userInfoVisible = true;
    } else {
        
        document.getElementById("profileInfoModal").classList.add("tempTransition");
        document.getElementById("profileInfoModal").style.right = "0rem";
        document.getElementById("profileInfoModal").style.bottom = "-12rem";
        
        setTimeout(function(){
        
            document.getElementById("profileInfoModal").classList.remove("tempTransition");
        }, 100);
        
        document.getElementById("userInfoButton").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="24" height="24"><path d="M5.433 2.304A4.492 4.492 0 0 0 3.5 6c0 1.598.832 3.002 2.09 3.802.518.328.929.923.902 1.64v.008l-.164 3.337a.75.75 0 1 1-1.498-.073l.163-3.33c.002-.085-.05-.216-.207-.316A5.996 5.996 0 0 1 2 6a5.993 5.993 0 0 1 2.567-4.92 1.482 1.482 0 0 1 1.673-.04c.462.296.76.827.76 1.423v2.82c0 .082.041.16.11.206l.75.51a.25.25 0 0 0 .28 0l.75-.51A.249.249 0 0 0 9 5.282V2.463c0-.596.298-1.127.76-1.423a1.482 1.482 0 0 1 1.673.04A5.993 5.993 0 0 1 14 6a5.996 5.996 0 0 1-2.786 5.068c-.157.1-.209.23-.207.315l.163 3.33a.752.752 0 0 1-1.094.714.75.75 0 0 1-.404-.64l-.164-3.345c-.027-.717.384-1.312.902-1.64A4.495 4.495 0 0 0 12.5 6a4.492 4.492 0 0 0-1.933-3.696c-.024.017-.067.067-.067.16v2.818a1.75 1.75 0 0 1-.767 1.448l-.75.51a1.75 1.75 0 0 1-1.966 0l-.75-.51A1.75 1.75 0 0 1 5.5 5.282V2.463c0-.092-.043-.142-.067-.159Z"></path></svg>`;
        
        userInfoVisible = false;
    }
});

async function clearLoaded() {

    var views = document.getElementsByTagName("feed")[0].children;

    for (var i = 0; i < views.length - 1; i++) {

        views[i].classList.add("hidden");
    }

    document.getElementById("feed").classList.remove("hidden");

    document.getElementById("feedStruct").innerHTML = '<div class="feed-container"><div class="spinner"><svg style="animation: spin 1s infinite;" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="32" height="32"><path d="M5.029 2.217a6.5 6.5 0 0 1 9.437 5.11.75.75 0 1 0 1.492-.154 8 8 0 0 0-14.315-4.03L.427 1.927A.25.25 0 0 0 0 2.104V5.75A.25.25 0 0 0 .25 6h3.646a.25.25 0 0 0 .177-.427L2.715 4.215a6.491 6.491 0 0 1 2.314-1.998ZM1.262 8.169a.75.75 0 0 0-1.22.658 8.001 8.001 0 0 0 14.315 4.03l1.216 1.216a.25.25 0 0 0 .427-.177V10.25a.25.25 0 0 0-.25-.25h-3.646a.25.25 0 0 0-.177.427l1.358 1.358a6.501 6.501 0 0 1-11.751-3.11.75.75 0 0 0-.272-.506Z"></path><path d="M9.06 9.06a1.5 1.5 0 1 1-2.12-2.12 1.5 1.5 0 0 1 2.12 2.12Z"></path></svg></div></div>';
    document.getElementById("userStruct").innerHTML = '<div class="spinner"><svg style="animation: spin 1s infinite;" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="32" height="32"><path d="M5.029 2.217a6.5 6.5 0 0 1 9.437 5.11.75.75 0 1 0 1.492-.154 8 8 0 0 0-14.315-4.03L.427 1.927A.25.25 0 0 0 0 2.104V5.75A.25.25 0 0 0 .25 6h3.646a.25.25 0 0 0 .177-.427L2.715 4.215a6.491 6.491 0 0 1 2.314-1.998ZM1.262 8.169a.75.75 0 0 0-1.22.658 8.001 8.001 0 0 0 14.315 4.03l1.216 1.216a.25.25 0 0 0 .427-.177V10.25a.25.25 0 0 0-.25-.25h-3.646a.25.25 0 0 0-.177.427l1.358 1.358a6.501 6.501 0 0 1-11.751-3.11.75.75 0 0 0-.272-.506Z"></path><path d="M9.06 9.06a1.5 1.5 0 1 1-2.12-2.12 1.5 1.5 0 0 1 2.12 2.12Z"></path></svg></div>';
    
    document.getElementById("rootpost-container").innerHTML = '<div class="feed-container spinner"><svg style="animation: spin 1s infinite;" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="32" height="32"><path d="M5.029 2.217a6.5 6.5 0 0 1 9.437 5.11.75.75 0 1 0 1.492-.154 8 8 0 0 0-14.315-4.03L.427 1.927A.25.25 0 0 0 0 2.104V5.75A.25.25 0 0 0 .25 6h3.646a.25.25 0 0 0 .177-.427L2.715 4.215a6.491 6.491 0 0 1 2.314-1.998ZM1.262 8.169a.75.75 0 0 0-1.22.658 8.001 8.001 0 0 0 14.315 4.03l1.216 1.216a.25.25 0 0 0 .427-.177V10.25a.25.25 0 0 0-.25-.25h-3.646a.25.25 0 0 0-.177.427l1.358 1.358a6.501 6.501 0 0 1-11.751-3.11.75.75 0 0 0-.272-.506Z"></path><path d="M9.06 9.06a1.5 1.5 0 1 1-2.12-2.12 1.5 1.5 0 0 1 2.12 2.12Z"></path></svg></div>';
    document.getElementById("parentposts").innerHTML = '<div><div class="feed-container"><div class="spinner"><svg style="animation: spin 1s infinite;" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="32" height="32"><path d="M5.029 2.217a6.5 6.5 0 0 1 9.437 5.11.75.75 0 1 0 1.492-.154 8 8 0 0 0-14.315-4.03L.427 1.927A.25.25 0 0 0 0 2.104V5.75A.25.25 0 0 0 .25 6h3.646a.25.25 0 0 0 .177-.427L2.715 4.215a6.491 6.491 0 0 1 2.314-1.998ZM1.262 8.169a.75.75 0 0 0-1.22.658 8.001 8.001 0 0 0 14.315 4.03l1.216 1.216a.25.25 0 0 0 .427-.177V10.25a.25.25 0 0 0-.25-.25h-3.646a.25.25 0 0 0-.177.427l1.358 1.358a6.501 6.501 0 0 1-11.751-3.11.75.75 0 0 0-.272-.506Z"></path><path d="M9.06 9.06a1.5 1.5 0 1 1-2.12-2.12 1.5 1.5 0 0 1 2.12 2.12Z"></path></svg></div></div><div class="lined-spacer"></div></div>';
    document.getElementById("postContainer").innerHTML = '<div class="spinner"><svg style="animation: spin 1s infinite;" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="32" height="32"><path d="M5.029 2.217a6.5 6.5 0 0 1 9.437 5.11.75.75 0 1 0 1.492-.154 8 8 0 0 0-14.315-4.03L.427 1.927A.25.25 0 0 0 0 2.104V5.75A.25.25 0 0 0 .25 6h3.646a.25.25 0 0 0 .177-.427L2.715 4.215a6.491 6.491 0 0 1 2.314-1.998ZM1.262 8.169a.75.75 0 0 0-1.22.658 8.001 8.001 0 0 0 14.315 4.03l1.216 1.216a.25.25 0 0 0 .427-.177V10.25a.25.25 0 0 0-.25-.25h-3.646a.25.25 0 0 0-.177.427l1.358 1.358a6.501 6.501 0 0 1-11.751-3.11.75.75 0 0 0-.272-.506Z"></path><path d="M9.06 9.06a1.5 1.5 0 1 1-2.12-2.12 1.5 1.5 0 0 1 2.12 2.12Z"></path></svg></div>';

    editExternalVars("stoppedBuilding", true);

    return true;
}
    
var isTriggered = false;
window.onscroll = function () {
    
    if (((localStorage.getItem("accessJwt") != null) && (localStorage.getItem("refreshJwt") != null)) && ((!localStorage.getItem("accessJwt").includes("undefined")) && (!localStorage.getItem("refreshJwt").includes("undefined")))) {
        
        if ((document.getElementsByTagName("body")[0].getBoundingClientRect().height - 10) < (window.visualViewport.height + window.visualViewport.pageTop)) {
        
            if (isTriggered === false) {
                
                console.log("At bottom");
                isTriggered = true;
            }
        }
    }
}

document.getElementById("goToUserButton").addEventListener("click", function() {

    const userId = document.getElementById("getUserId");

    if (!userId.value) {

        return;
    }

    if (hasStoppedBuilding && stoppedBuildingUser) {
        
        window.history.pushState(null, null, document.location.origin + "/user/" + userId.value);
        checkUrl(parseURL(document.location.pathname));
    } else {

        window.location.href = document.location.origin + "/user/" + userId.value;
    }
});

document.getElementById("goToPostButton").addEventListener("click", function() {

    const postUser = document.getElementById("getPostUser");
    const postId = document.getElementById("getPostId");
      
    if ((!postUser.value) || (!postId.value)) {

        return;
    }

    if (hasStoppedBuilding && stoppedBuildingUser) {
        
        window.history.pushState(null, null, document.location.origin + "/user/" + postUser.value + "/post/" + postId.value);
        checkUrl(parseURL(document.location.pathname));
    } else {

        window.location.href = document.location.origin + "/user/" + postUser.value + "/post/" + postId.value;
    }
});