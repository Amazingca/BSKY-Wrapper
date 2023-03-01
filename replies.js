import { embeds } from "./mods.js";

export async function loadParent(replies) {
  
  const userid = replies.parent.uri.split("//")[1].split("/")[0];
  const postid = replies.parent.uri.split("/")[replies.parent.uri.split("/").length - 1];
  
  try {
        
    const rawuser = await fetch(`https://bsky.social/xrpc/com.atproto.repo.listRecords?user=${userid}&collection=app.bsky.actor.profile`).then(r => r.text());
    const userparsed = JSON.parse(rawuser);
        
    var username = "";
    var userClasses;
        
    if ((userparsed.records.length > 0) && (userparsed.records[0].value.displayName != undefined)) {
          
      username = userparsed.records[0].value.displayName;
    } else {
      
      userClasses = "hidden";
    }
        
    var handle = userid;
        
    if (!userid.includes(".bsky.social")) {
          
      const rawuser2 = await fetch(`https://bsky.social/xrpc/com.atproto.repo.describe?user=${userid}`).then(r => r.text());
      const user2parsed = JSON.parse(rawuser2);
          
      handle = user2parsed.handle;
    } 
        
    const rawres = await fetch(`https://bsky.social/xrpc/com.atproto.repo.getRecord?user=${userid}&collection=app.bsky.feed.post&rkey=${postid}`).then(r => r.text());
    const parsedres = JSON.parse(rawres);
        
    var posttext;
        
    if (parsedres.value.embed != undefined) {
          
      if (parsedres.value.text != "") {
            
        posttext = parsedres.value.text.replaceAll("\n", "<br>") + "<br><br>" + embeds(parsedres.value.embed);
      } else {
            
        posttext = embeds(parsedres.value.embed);
      }
    } else {
          
      posttext = parsedres.value.text.replaceAll("\n", "<br>");
    }
        
    const postdate = new Date(parsedres.value.createdAt);
    
    const postStruct = 
      `<div class="feed-container">
        <h3 class="${userClasses}">${username}</h3>
        <h3 style="color: #555;">@<a href="${document.location.origin + document.location.pathname}?username=${handle}" title="Go to User Profile">${handle}</a></h3>
        <br>
        <div>${posttext}</div>
        <br>
        <flex style="justify-content: space-between;">
          <div style="color: #333;">${new Date(parsedres.value.createdAt)}</div>
          <div style="color: #333;"><a href="${document.location.origin + document.location.pathname}?username=${handle}&postid=${parsedres.uri.split("/")[parsedres.uri.split("/").length - 1]}">id#${parsedres.uri.split("/")[parsedres.uri.split("/").length - 1]}</a></div>
        </flex>
      </div>`;
    
    document.getElementById("parentposts").innerHTML = "<div>" + postStruct + "<div class='lined-spacer'></div></div>";
  } catch(e) {
    
    console.log(e);
  }
}

export async function loadRoot(replies) {
  
  const userid = replies.root.uri.split("//")[1].split("/")[0];
  const postid = replies.root.uri.split("/")[replies.root.uri.split("/").length - 1];
  
  try {
    
    const parentUserId = replies.parent.uri.split("//")[1].split("/")[0];
    const parentPostId = replies.parent.uri.split("/")[replies.root.uri.split("/").length - 1];
        
    const parentParent = JSON.parse(await fetch(`https://bsky.social/xrpc/com.atproto.repo.getRecord?user=${parentUserId}&collection=app.bsky.feed.post&rkey=${parentPostId}`).then(r => r.text())).value.reply.parent.uri;
    const parentParentId = parentParent.split("/")[parentParent.split("/").length - 1];
    
    if (parentParentId === postid) {
      
      document.getElementById("separationrtp").classList.remove("dotted-spacer");
      document.getElementById("separationrtp").classList.add("lined-spacer");
      document.getElementById("loadButton").classList.add("hidden");
    }
    
    const rawuser = await fetch(`https://bsky.social/xrpc/com.atproto.repo.listRecords?user=${userid}&collection=app.bsky.actor.profile`).then(r => r.text());
    const userparsed = JSON.parse(rawuser);
        
    var username = "";
    var userClasses;
        
    if ((userparsed.records.length > 0) && (userparsed.records[0].value.displayName != undefined)) {
          
      username = userparsed.records[0].value.displayName;
    } else {
      
      userClasses = "hidden";
    }
        
    var handle = userid;
        
    if (!userid.includes(".bsky.social")) {
          
      const rawuser2 = await fetch(`https://bsky.social/xrpc/com.atproto.repo.describe?user=${userid}`).then(r => r.text());
      const user2parsed = JSON.parse(rawuser2);
          
      handle = user2parsed.handle;
    } 
        
    const rawres = await fetch(`https://bsky.social/xrpc/com.atproto.repo.getRecord?user=${userid}&collection=app.bsky.feed.post&rkey=${postid}`).then(r => r.text());
    const parsedres = JSON.parse(rawres);
        
    var posttext;
        
    if (parsedres.value.embed != undefined) {
          
      if (parsedres.value.text != "") {
            
        posttext = parsedres.value.text.replaceAll("\n", "<br>") + "<br><br>" + embeds(parsedres.value.embed);
      } else {
            
        posttext = embeds(parsedres.value.embed);
      }
    } else {
          
      posttext = parsedres.value.text.replaceAll("\n", "<br>");
    }
        
    const postdate = new Date(parsedres.value.createdAt);
    
    const postStruct = 
      `<h3 class="${userClasses}">${username}</h3>
        <h3 style="color: #555;">@<a href="${document.location.origin + document.location.pathname}?username=${handle}" title="Go to User Profile">${handle}</a></h3>
        <br>
        <div>${posttext}</div>
        <br>
        <flex style="justify-content: space-between;">
          <div style="color: #333;">${new Date(parsedres.value.createdAt)}</div>
          <div style="color: #333;"><a href="${document.location.origin + document.location.pathname}?username=${handle}&postid=${parsedres.uri.split("/")[parsedres.uri.split("/").length - 1]}">id#${parsedres.uri.split("/")[parsedres.uri.split("/").length - 1]}</a></div>
        </flex>`;
    
    document.getElementById("rootpost-container").innerHTML = postStruct;
  } catch(e) {
    
    console.log(e);
  }
}
