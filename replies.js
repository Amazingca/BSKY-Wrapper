import { embeds } from "./mods.js";
import { postDefault } from "./struct/default.js";

export async function loadFirstReplies(postObj) {
  
  if (postObj.value.reply.root.cid === postObj.value.reply.parent.cid) {
            
    document.getElementById("parentposts").classList.remove("hidden");
    loadParent(postObj.value.reply);
  } else {
            
    document.getElementById("rootpost").classList.remove("hidden");
    document.getElementById("parentposts").classList.remove("hidden");
    loadParent(postObj.value.reply);
    loadRoot(postObj.value.reply);
  }
}

async function loadParent(replies) {
  
  const userid = replies.parent.uri.split("//")[1].split("/")[0];
  const postid = replies.parent.uri.split("/")[replies.parent.uri.split("/").length - 1];
  
  try {
    
    document.getElementById("parentposts").innerHTML = "<div>" + await postDefault(userid, postid) + "<div class='lined-spacer'></div></div>";
  } catch(e) {
    
    console.log(e);
  }
}

async function loadRoot(replies) {
  
  const userid = replies.root.uri.split("//")[1].split("/")[0];
  const postid = replies.root.uri.split("/")[replies.root.uri.split("/").length - 1];
  
  try {
    
    document.getElementById("rootpost-container").innerHTML = await postDefault(userid, postid);
  } catch(e) {
    
    console.log(e);
  }
}
