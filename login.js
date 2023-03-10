import { loginReq } from "./api.js";

if ((((localStorage.getItem("accessJwt") != null) && (localStorage.getItem("refreshJwt") != null)) && ((!localStorage.getItem("accessJwt").includes("undefined")) && (!localStorage.getItem("refreshJwt").includes("undefined")))) || localStorage.getItem("viewFeed")) {
    
  window.location.href = "../";
}

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
