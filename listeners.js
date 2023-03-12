export function activateListeners(postId, postCid) {
  
  const repostElements = document.getElementsByClassName(`repost_${postId}-${postCid}`);
  const upvoteElements = document.getElementsByClassName(`upvote_${postId}-${postCid}`);
  
  for (var i = 0; i < repostElements.length; i++) {
    
    repostElements[i].addEventListener("click", async function() {
      
      console.log(repostElements[i]);
    });
  }
}
