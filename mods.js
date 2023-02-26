import { getUserRepo, listRecords } from "./api.js";

export function embeds(obj) {
  
  var newElement = "<h3 title='";
  
  switch (obj["$type"]) {
    case "app.bsky.embed.images":
      var amount = obj.images.length;
      
      if (amount === 1) {
        
        return newElement + `alt: "${obj.images[0].alt}" cid: ${obj.images[0].image.cid}'>Attached: ${amount} image</h3>`;
      } else {
        
        for (var i = 0; i < obj.images.length; i++) {
          
          if ((i + 1) != obj.images.length) {
            
            newElement = newElement + `alt: "${obj.images[i].alt}" cid: ${obj.images[i].image.cid}, `;
          } else {
            
            newElement = newElement + `alt: "${obj.images[i].alt}" cid: ${obj.images[i].image.cid}'>`;
          }
        }
        
        return newElement + `Attached: ${amount} images</h3>`;
      }
    case "app.bsky.embed.external":
      return newElement + `${obj.external.uri}'>Attached: <a href='${obj.external.uri}'>1 link</a></h3>`;
  }
}

export async function nameResolver(userId) {
  
  var hasProfileCollection = false;
  
  const userObj = await getUserRepo(userId);
  
  for (var collection of userObj.collections) {
    
    if (collection === "app.bsky.actor.profile") {
      
      hasProfileCollection = true;
    }
  }
  
  if (hasProfileCollection === false) {
    
    return userObj.handle;
  } else {
    
    const actorProfile = await listRecords(userId, "app.bsky.actor.profile");
    
    if (actorProfile[0].value.displayName === "") {
      
      return userObj.handle;
    } else {
      
      return actorProfile[0].value.displayName;
    }
  }
}