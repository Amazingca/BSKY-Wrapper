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

export async function getUserInfo() {
  
  const userId = localStorage.getItem("userDid");
  const token = await getToken();
  
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
    
    const authObj = JSON.parse(await fetch("https://bsky.social/xrpc/com.atproto.server.createSession", reqObj).then(r => {
      if (!r.ok) {
        throw new Error('Login not successful');
      } else {
        return r.text();
      }}));
    
    return authObj;
  } catch (e) {
    
    console.log(e);
    return undefined;
  }
}
