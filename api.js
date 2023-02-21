export async function getPost(userId, postId) {
  
  try {
    
    const post = JSON.parse(await fetch(`https://bsky.social/xrpc/com.atproto.repo.getRecord?user=${userId}&collection=app.bsky.feed.post&rkey=${postId}`).then(r => r.text()));
    
    return post;
  } catch (e) {
    
    console.error(e);
    return null;
  }
}

export async function getUserRepo(userId) {
  
  try {
    
    const userRepo = JSON.parse(await fetch(`https://bsky.social/xrpc/com.atproto.repo.describe?user=${userId}`).then(r => r.text()));
    
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
    
    const records = JSON.parse(await fetch(`https://bsky.social/xrpc/com.atproto.repo.listRecords?user=${userId}&collection=${collection}`).then(r => r.text())).records;
    
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