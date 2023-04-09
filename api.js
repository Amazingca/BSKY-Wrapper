export async function getPost(userId, postId) {
  
  try {
    
    const post = JSON.parse(await fetch(`https://bsky.social/xrpc/com.atproto.repo.getRecord?repo=${userId}&collection=app.bsky.feed.post&rkey=${postId}`).then(r => r.text()));
    
    return post;
  } catch (e) {
    
    console.error(e);
    return null;
  }
}

export async function getUserRepo(userId) {
  
  try {
    
    const userRepo = JSON.parse(await fetch(`https://bsky.social/xrpc/com.atproto.repo.describeRepo?repo=${userId}`).then(r => r.text()));
    
    return userRepo;
  } catch (e) {
    
    console.error(e);
    return null;
  }
}

export async function listRecords(userId, collection) {
  
  const supportedC = ["app.bsky.graph.follow", "app.bsky.feed.post", "app.bsky.feed.vote", "app.bsky.actor.profile", "app.bsky.feed.repost"];
  var isSupportedC = false;
  
  for (const type of supportedC) {
    
    if (type === collection) {
      
      isSupportedC = true;
    }
  }
  
  if (isSupportedC === false) {
    
    return null;
  }
  
  try {
    
    const records = JSON.parse(await fetch(`https://bsky.social/xrpc/com.atproto.repo.listRecords?repo=${userId}&collection=${collection}&limit=100`).then(r => r.text())).records;
    
    if (records.length === 0) {
      
      return null;
    } else {
      
      return records;
    }
  } catch (e) {
    
    console.error(e);
    return null;
  }
}

export async function getUserFeed() {
  
  const userIf = localStorage.getItem("userDid");
  const token = await getToken();
  
  const req = {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  }
  
  try {
    
    const feedReq = JSON.parse(await fetch("https://bsky.social/xrpc/app.bsky.feed.getTimeline", req).then(r => r.text()));
    
    return feedReq;
  } catch (e) {
    
    return null;
    console.log(e);
  }
}

export async function getUserNotifCount() {
  
  const userId = localStorage.getItem("userDid");
  const token = localStorage.getItem("accessJwt");
  
  const req = {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  }
  
  try {
    
    const notifCountObj = JSON.parse(await fetch("https://bsky.social/xrpc/app.bsky.notification.getUnreadCount", req).then(r => r.text()));
    
    return notifCountObj.count;
  } catch (e) {
    
    return "no"
  }
}

export async function upvotePost(postUri, postCid) {
  
  const userId = localStorage.getItem("userDid");
  const token = localStorage.getItem("accessJwt");
  
  const creationDate = new Date().toISOString();
  
  const req = {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      "subject": {
        "uri": postUri,
        "cid": postCid
      },
      "createdAt": creationDate
    })
  }
  
  try {
    
    const res = JSON.parse(await fetch("https://bsky.social/xrpc/app.bsky.feed.like", req).then(r => r.text()));
    
    if (res.uri != undefined) {
      
      return res.uri;
    } else {
      
      return null;
    }
  } catch (e) {
    
    return null
  }
}

export async function getUserInfo() {
  
  const userId = localStorage.getItem("userDid");
  const token = localStorage.getItem("accessJwt");
  
  const req = {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  }
  
  try {
    
    const reqObj = JSON.parse(await fetch("https://bsky.social/xrpc/app.bsky.actor.getProfile?actor=" + userId, req).then(r => r.text()));
    
    return reqObj;
  } catch (e) {
    
    console.log(e);
  }
}

export async function getToken() {
        
  var refreshToken = localStorage.getItem("refreshJwt");
        
  try {
          
    const req = {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + refreshToken
      }
    }

    const newTokens = JSON.parse(await fetch("https://bsky.social/xrpc/com.atproto.server.refreshSession", req).then(r => r.text()));

    localStorage.setItem("accessJwt", newTokens.accessJwt);
    localStorage.setItem("refreshJwt", newTokens.refreshJwt);

    return newTokens.accessJwt;
  } catch (e) {

    console.log(e);
  }
}

export async function getSession() {
  
  const req = {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + await getToken()
    }
  }

  try {

    const res = JSON.parse(await fetch("https://bsky.social/xrpc/com.atproto.server.getSession", req).then(r => r.text()));

    if (res.error === undefined) {
            
      return true;
    } else {
        
      console.log(res);
                  
      return false;
    }
  } catch (e) {
                  
    console.log(e);
                  
    return false;
  }
}

export async function loginReq(handle, password) {
  
  if (password.split("").length === 0) {
    
    return null;
  }
  
  if ((!handle.includes(".bsky.social")) && (!handle.includes("."))) {
    
    handle = handle + ".bsky.social";
  }
  
  const reqObj = {
    body: JSON.stringify({
      "handle": handle,
      "password": password
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  }
  
  try {
    
    const authObj = JSON.parse(await fetch("https://bsky.social/xrpc/com.atproto.server.createSession", reqObj).then(r => {
      if (!r.ok) {
        throw new Error('Login not successful');
      } else {
        return r.text();
      }}));
    
    return authObj;
  } catch (e) {
    
    window.alert("User could not be authenticated! This could be due to expired tokens–please re-login to your account.");
    console.log(e);
    return undefined;
  }
}

export async function createAccountReq(inviteCode, userEmail, userHandle, userPassword) {
  
  let reqObj = {
    body: JSON.stringify({
      "email": userEmail,
      "handle": userHandle,
      "inviteCode": inviteCode,
      "password": userPassword
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  }
  
  try {
    
    let accObj = JSON.parse(await fetch("https://bsky.social/xrpc/com.atproto.server.createAccount", reqObj).then(r => r.text()));
    
    if (accObj.error === undefined) {
      
      localStorage.setItem("accessJwt", accObj.accessJwt);
      localStorage.setItem("refreshJwt", accObj.refreshJwt);
      localStorage.setItem("userDid", accObj.did);
      
      return "Success";
    } else {
      
      return [accObj.error, accObj.message];
    }
  } catch (e) {
    
    console.log(e);
    return "Error: The request could not be made! Try clicking the button again.";
  }
}
