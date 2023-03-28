import { loginReq } from "./api.js";

var type = "login";
var signupActive = false;
var inviteMatchesFormat = false;

if ((((localStorage.getItem("accessJwt") != null) && (localStorage.getItem("refreshJwt") != null)) && ((!localStorage.getItem("accessJwt").includes("undefined")) && (!localStorage.getItem("refreshJwt").includes("undefined")))) || localStorage.getItem("viewFeed")) {
     
  window.location.href = "../";
}

const loginProps = document.getElementById("changeToLogin").getBoundingClientRect();
const selected = document.getElementById("selected");

selected.style.top = `calc(${loginProps.bottom}px + 0.4rem)`;

function changeLoginSelection() {

  if (type === "login") {

    const loginProps = document.getElementById("changeToLogin").getBoundingClientRect();
    const selected = document.getElementById("selected");

    //selected.style.top = `calc(${loginProps.bottom}px + 0.4rem)`;
    selected.style.left = loginProps.left + "px";
    selected.style.right = `calc(100vw - ${loginProps.right}px)`;
    selected.style.paddingTop = "0.3rem";
    
    const signupBoxProps = document.getElementById("signupView").getBoundingClientRect();
    const parentView = document.getElementsByTagName("mask")[0];
    
    const loginBox = document.getElementById("loginView");
    const signupBox = document.getElementById("signupView");
    
    signupBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
    
    document.getElementById("signupModal").classList.add("hidden");
    document.getElementById("loginModal").classList.remove("hidden");
    
    //document.getElementById("username").focus();
  } else if (type === "signup") {
    
    const loginProps = document.getElementById("changeToSignup").getBoundingClientRect();
    const selected = document.getElementById("selected");
    
    selected.style.transition = "0.4s cubic-bezier(0.34,0.14,0.28,1.13) 0s";
    
    //selected.style.top = `calc(${loginProps.bottom}px + 0.4rem)`;
    selected.style.left = loginProps.left + "px";
    selected.style.right = `calc(100vw - ${loginProps.right}px)`;
    
    const loginBoxProps = document.getElementById("loginView").getBoundingClientRect();
    const parentView = document.getElementsByTagName("mask")[0];
    
    const loginBox = document.getElementById("loginView");
    const signupBox = document.getElementById("signupView");
    
    loginBox.classList.add("hidden");
    signupBox.classList.remove("hidden");
    
    document.getElementById("loginModal").classList.add("hidden");
    document.getElementById("signupModal").classList.remove("hidden");
    
    //document.getElementById("signupInviteCode").focus();
 }
}

window.onload = function() {
  
  changeLoginSelection();
}

document.getElementById("changeToSignup").addEventListener("click", function() {

  type = "signup";
  changeLoginSelection();
});

document.getElementById("changeToLogin").addEventListener("click", function() {

  type = "login";
  changeLoginSelection();
});

document.getElementById("loginButton").addEventListener("click", async function() {
  
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  
  let reqObj = await loginReq(username, password);
  
  if ((reqObj != null) && (reqObj != undefined)) {
    
    localStorage.setItem("accessJwt", reqObj.accessJwt);
    localStorage.setItem("refreshJwt", reqObj.refreshJwt);
    localStorage.setItem("userDid", reqObj.did);
    
    window.location.href = "../";
  } else {
    
    window.alert("The provided username/password do not have an associated account!");
  }
});

document.getElementById("password").addEventListener("keyup", (event) => {
  
  if ((event.key === "Enter") && (document.getElementById("password").value != "")) {
    
    document.getElementById("loginButton").classList.add("trigger");
    document.getElementById("loginButton").click();
    
    setTimeout(function(){
      
      document.getElementById("loginButton").classList.remove("trigger");
    }, 500);
  }
});

document.getElementById("signupInviteCode").addEventListener("keyup", (event) => {
 
  if (((document.getElementById("signupInviteCode").value.includes("bsky-social") || document.getElementById("signupInviteCode").value.includes("bsky.social")) && (document.getElementById("signupInviteCode").value.split("").length === 17)) || ((document.getElementById("signupInviteCode").value.split("").length === 5) && ((!document.getElementById("signupInviteCode").value.includes("bsky-")) && (!document.getElementById("signupInviteCode").value.includes("bsky."))))) {
    
    if (((document.getElementById("signupInviteCode").value.split("").length === 5) || (document.getElementById("signupInviteCode").value.split("").length === 7)) && ((!document.getElementById("signupInviteCode").value.includes("bsky-")) && (!document.getElementById("signupInviteCode").value.includes("bsky.")))) {
        
      document.getElementById("signupInviteCode").value = "bsky-social-" + document.getElementById("signupInviteCode").value;
    }
    
    document.getElementById("nextSignupStage").classList.remove("hidden");
    document.getElementById("signupEmail").focus();
    
    inviteMatchesFormat = true;
  } else {
    
    document.getElementById("nextSignupStage").classList.add("hidden");
    
    inviteMatchesFormat = false;
  }
  
  tryForComplete();
});

document.getElementById("signupEmail").addEventListener("keyup", (event) => {
  
  tryForComplete();
});

document.getElementById("signupUsername").addEventListener("keyup", (event) => {
  
  tryForComplete();
});

document.getElementById("signupPassword").addEventListener("keyup", (event) => {
  
  tryForComplete();
});

function tryForComplete() {
  
  if ((document.getElementById("signupInviteCode").value != "") && (inviteMatchesFormat === true) && (document.getElementById("signupEmail").value != "") && (document.getElementById("signupUsername").value != "") && (document.getElementById("signupPassword").value != "")) {
    
    signupActive = true;
    document.getElementById("signupButton").classList.remove("disabled");
  } else {
    
    signupActive = false;
    document.getElementById("signupButton").classList.add("disabled");
  }
}
