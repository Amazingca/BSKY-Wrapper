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
              
              newElement = newElement + `alt: "${obj.images[0].alt}" cid: ${obj.images[0].image.cid}, `;
            } else {
              
              newElement = newElement + `alt: "${obj.images[0].alt}" cid: ${obj.images[0].image.cid}'>`;
            }
          }
          
          return newElement + `Attached: ${amount} images</h3>`;
        }
      case "app.bsky.embed.external":
        return newElement + `${obj.external.uri}'>Attached: <a href='${obj.external.uri}'>1 link</a></h3>`;
    }
}