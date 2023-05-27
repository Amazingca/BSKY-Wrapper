export async function getPost(userId, postId) {
  
  try {
    
    const post = await fetch(`https://bsky.social/xrpc/com.atproto.repo.getRecord?repo=${userId}&collection=app.bsky.feed.post&rkey=${postId}`).then(r => r.json());
    
    return post;
  } catch (e) {
    
    console.error(e);
    return null;
  }
}

export async function getPostFull(userId, postId) {
  
  if (userId.includes(".bsky.social")) {
    
    userId = await getUserRepo(userId);
    userId = userId.did;
  }
  
  const token = await getToken();
  
  const reqObj = {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  }
  
  try {
    
    const req = await fetch("https://bsky.social/xrpc/app.bsky.feed.getPostThread?uri=at://" + userId + "/app.bsky.feed.post/" + postId, reqObj).then(r => r.json());
    
    if (req.error === undefined) {
      
      return [userId, req];
    } else {
      
      console.log(req);
      return null;
    }
  } catch (e) {
    
    console.log(e);
    return null;
  }
}

export async function getUserRepo(userId) {
  
  try {
    
    const userRepo = await fetch(`https://bsky.social/xrpc/com.atproto.repo.describeRepo?repo=${userId}`).then(r => r.json());
    
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
    
    const records = await fetch(`https://bsky.social/xrpc/com.atproto.repo.listRecords?repo=${userId}&collection=${collection}&limit=100`).then(r => r.json()).records;
    
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
    
    const feedReq = await fetch("https://bsky.social/xrpc/app.bsky.feed.getTimeline?limit=100", req).then(r => r.json());
    
    return feedReq;
  } catch (e) {
    
    return null;
    console.log(e);
  }
}

export async function getUserNotifCount() {
  
  const userId = localStorage.getItem("userDid");
  const token = await getToken();
  
  const req = {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  }
  
  try {
    
    const notifCountObj = await fetch("https://bsky.social/xrpc/app.bsky.notification.getUnreadCount", req).then(r => r.json());
    
    return notifCountObj.count;
  } catch (e) {
    
    return "no"
  }
}

export async function votePost(type, postUri, postCid) {
  
  const userId = localStorage.getItem("userDid");
  const token = await getToken();
  
  const creationDate = new Date().toISOString();
  
  if (type === "upvote") {
    
    const req = {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "collection": "app.bsky.feed.like",
        "repo": userId,
        "record": {
          "subject": {
            "uri": postUri,
            "cid": postCid
          },
          "createdAt": creationDate
        }
      })
    }

    try {

      const res = await fetch("https://bsky.social/xrpc/com.atproto.repo.createRecord", req).then(r => r.json());

      if (res.uri != undefined) {

        return [true, "upvoted"];
      } else {

        return [false];
      }
    } catch (e) {

      return [false];
    }
  } else if (type === "devote") {
    
    const postData = await getPostFull(postUri.split("//")[1].split("/")[0], postUri.split("//")[1].split("/")[2]);
    const postRKey = postData[1].thread.post.viewer.like.split("//")[1].split("/")[2];
    
    const req = {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "collection": "app.bsky.feed.like",
        "repo": userId,
        "rkey": postRKey
      })
    }

    try {

      const res = await fetch("https://bsky.social/xrpc/com.atproto.repo.deleteRecord", req).then(r => r.status);

      if (res === 200) {

        return [true, "devoted"];
      } else {

        return [false];
      }
    } catch (e) {

      return [false];
    }
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
    
    const reqObj = await fetch("https://bsky.social/xrpc/app.bsky.actor.getProfile?actor=" + userId, req).then(r => r.json());
    
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

    const newTokens = await fetch("https://bsky.social/xrpc/com.atproto.server.refreshSession", req).then(r => r.json());

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

    const res = await fetch("https://bsky.social/xrpc/com.atproto.server.getSession", req).then(r => r.json());

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
      "identifier": handle,
      "password": password
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  }
  
  try {
    
    const authObj = await fetch("https://bsky.social/xrpc/com.atproto.server.createSession", reqObj).then(r => {
      if (!r.ok) {
        throw new Error('Login not successful');
      } else {
        return r.json();
      }});
    
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
    
    let accObj = await fetch("https://bsky.social/xrpc/com.atproto.server.createAccount", reqObj).then(r => r.json());
    
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
