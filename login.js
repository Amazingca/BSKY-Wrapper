import { loginReq, createAccountReq } from "./api.js";

var type = "login";
var signupActive = false;
var inviteMatchesFormat = false;

const url = document.location.search;
const urlParams = new URLSearchParams(url);

var authType = "default";

if (urlParams.get("auth") != undefined) {
    if (urlParams.get("auth") === "tooling") {
        
        authType = "tooling";
    } else {
        
        console.log("Improper auth type given in url!");
        authType = "default";
    }
}

if ((((localStorage.getItem("accessJwt") != null) && (localStorage.getItem("refreshJwt") != null)) && ((!localStorage.getItem("accessJwt").includes("undefined")) && (!localStorage.getItem("refreshJwt").includes("undefined")))) || localStorage.getItem("viewFeed")) {
     
  if (authType === "default") {
        
      window.location.href = "../";
  } else if (authType === "tooling") {
        
      window.opener.authenticated();
      window.close();
  }
}

var loginProps = document.getElementById("changeToLogin").getBoundingClientRect();
const selected = document.getElementById("selected");

selected.style.top = `calc(${loginProps.bottom}px + 0.4rem)`;

function changeLoginSelection() {

  if (type === "login") {

    const selected = document.getElementById("selected");
    
    const signupBoxProps = document.getElementById("signupView").getBoundingClientRect();
    const parentView = document.getElementsByTagName("mask")[0];
    
    const loginBox = document.getElementById("loginView");
    const signupBox = document.getElementById("signupView");
    
    signupBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
    
    document.getElementById("signupModal").classList.add("hidden");
    document.getElementById("loginModal").classList.remove("hidden");
    
    const loginProps = document.getElementById("changeToLogin").getBoundingClientRect();
    
    //selected.style.top = `calc(${loginProps.bottom}px + 0.4rem)`;
    selected.style.left = loginProps.left + "px";
    selected.style.right = `calc(100vw - ${loginProps.right}px)`;
    selected.style.paddingTop = "0.3rem";
  } else if (type === "signup") {
    
    const selected = document.getElementById("selected");
    const loginProps = document.getElementById("changeToSignup").getBoundingClientRect();
    
    selected.style.left = loginProps.left + "px";
    
    if (inviteMatchesFormat === true) {
      
      selected.style.right = `calc(98vw - ${loginProps.right}px)`;
    } else {
      
      selected.style.right = `calc(100vw - ${loginProps.right}px)`;
    }
    
    selected.style.transition = "0.4s cubic-bezier(0.34,0.14,0.28,1.13) 0s";
    
    const loginBoxProps = document.getElementById("loginView").getBoundingClientRect();
    const parentView = document.getElementsByTagName("mask")[0];
    
    const loginBox = document.getElementById("loginView");
    const signupBox = document.getElementById("signupView");
    
    loginBox.classList.add("hidden");
    signupBox.classList.remove("hidden");
    
    document.getElementById("loginModal").classList.add("hidden");
    document.getElementById("signupModal").classList.remove("hidden");
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
    
    if (authType === "default") {
        
        window.location.href = "../";
    } else if (authType === "tooling") {
        
        window.opener.authenticated();
        window.close();
    }
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
 
  if (((document.getElementById("signupInviteCode").value.includes("bsky-social") || document.getElementById("signupInviteCode").value.includes("bsky.social")) && ((document.getElementById("signupInviteCode").value.split("").length === 17) || (document.getElementById("signupInviteCode").value.split("").length === 19))) || ((document.getElementById("signupInviteCode").value.split("").length === 7) && ((!document.getElementById("signupInviteCode").value.includes("bsky-")) && (!document.getElementById("signupInviteCode").value.includes("bsky."))))) {
    
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
  
  const selected = document.getElementById("selected");
  const loginProps = document.getElementById("changeToSignup").getBoundingClientRect();
    
  if (inviteMatchesFormat === true) {
      
    selected.style.right = `calc(98vw - ${loginProps.right}px)`;
  } else {
      
    selected.style.right = `calc(100vw - ${loginProps.right}px)`;
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

document.getElementById("signupButton").addEventListener("click", async function signup() {
  
  if (signupActive === false) {
    
    return;
  }
  
  let inviteCode = document.getElementById("signupInviteCode").value;
  let userEmail = document.getElementById("signupEmail").value;
  let userHandle = document.getElementById("signupUsername").value;
  let userPassword = document.getElementById("signupPassword").value;
  
  if ((!userEmail.includes("@")) && (!userEmail.includes("."))) {
    
    window.alert("The provided email was not valid!");
    
    return;
  }
  
  if (!userHandle.includes(".bsky.social")) {
    
    window.alert("User handle must include a supported handle domain!\nEX: *.bsky.social");
    
    return;
  }
  
  try {
    
    let createAccount = await createAccountReq(inviteCode, userEmail, userHandle, userPassword);
    
    if (createAccount === "Success") {
      
      if (authType === "default") {
        
          window.location.href = "../";
      } else if (authType === "tooling") {

          window.opener.authenticated();
          window.close();
      }
    } else {
      
      window.alert("Error: " + createAccount[0] + ", " + createAccount[1]);
    }
  } catch (e) {
    
    console.log(e);
    window.alert(e);
  }
})
