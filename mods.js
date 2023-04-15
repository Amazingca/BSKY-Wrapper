import { getUserRepo, listRecords } from "./api.js";
import { postDefault } from "./struct/default.js";
import { postFull } from "./struct/full.js";

export async function embeds(obj) {
  var newElement = `<h3 title="`;

  switch (obj["$type"]) {
    case "app.bsky.embed.images":
      var amount = obj.images.length;

      if (amount === 1) {
        return (
          newElement +
          `alt: “${obj.images[0].alt}” cid: ${obj.images[0].image.cid}">Attached: ${amount} image</h3>`
        );
      } else {
        for (var i = 0; i < obj.images.length; i++) {
          if (i + 1 != obj.images.length) {
            newElement =
              newElement +
              `alt: “${obj.images[i].alt}” cid: ${obj.images[i].image.cid}, `;
          } else {
            newElement =
              newElement +
              `alt: “${obj.images[i].alt}” cid: ${obj.images[i].image.cid}">`;
          }
        }

        return newElement + `Attached: ${amount} images</h3>`;
      }
    case "app.bsky.embed.images#view":
      var imageEmbed =
        "<div style='display: grid; gap: 0.5rem; width: inherit;'>";

      var divisor = 1;
      if (obj.images.length > 1) {
        divisor = 2;
      }

      for (var i = 0; i < obj.images.length; i++) {
        
        var row;
        var rowend;
        var column;
        var columnend;
        var width;
        
        if (i === 0) {
          
          row = 1;
          column = 1;
          
          if (obj.images.length === 3) {
             
            
            row = 1;
            rowend = 3;
            column = 1;
            columnend = 3;
          }
        } else if (i === 1) {
          row = 1;
          column = 2;
          
          if (obj.images.length === 3) {

            row = 2;
            rowend = 1;
            column = 3;
            columnend = 3;
          }
        } else if (i === 2) {
          row = 2;
          column = 1;
          
          if (obj.images.length === 3) {

            row = 2;
            rowend = 2;
            column = 3;
            columnend = 3;
          }
        } else if (i === 3) {
          row = 2;
          column = 2;
        }

        var index;
        if (obj.images.length === 1) {
          index = "object-fit: contain; grid-column-start: 1; grid-column-end: 2; grid-row-start: 1; grid-row-end: 2;";
        } else if (obj.images.length === 2) {
          index = `aspect-ratio: 1/1; object-fit: cover; grid-column-start: ${column}; grid-column-end: ${column}; grid-row-start: 1; grid-row-end: 2;`;
        } else if (obj.images.length === 3) {
          index = `aspect-ratio: 1/1; object-fit: cover; grid-column-start: ${column}; grid-column-end: ${columnend}; grid-row-start: ${row}; grid-row-end: ${rowend};`;
        } else if (obj.images.length === 4) {
          index = `aspect-ratio: 1/1; object-fit: cover; grid-column-start: ${column}; grid-column-end: ${column}; grid-row-start: ${row}; grid-row-end: ${row};`;
        } else {
          return "<div>More than 4 images</div>";
        }

        imageEmbed =
          imageEmbed +
          `<img onclick="window.open('${obj.images[i].fullsize}')" src="${obj.images[i].thumb}" title="${obj.images[i].alt}" style="cursor: pointer; border-radius: 7px; ${index} max-width:100%; display: flex; height: auto;">`;
      }

      return imageEmbed + "</div>";
    case "app.bsky.embed.record":
      const quotePostUri = obj.record.uri;
      return await postDefault(
        quotePostUri.split("//")[1].split("/")[0],
        quotePostUri.split("//")[1].split("/")[
          quotePostUri.split("//")[1].split("/").length - 1
        ]
      );
    case "app.bsky.embed.record#view":
      return await postFull(obj.record.author.did, obj.record, "snippet");
    case "app.bsky.embed.external":
      return (
        newElement +
        `${obj.external.uri}">Attached: <a href='${obj.external.uri}' target='_blank'>1 link</a></h3>`
      );
    case "app.bsky.embed.external#view":
      return `<a href='${obj.external.uri}' target='_blank' title="${obj.external.title}\n\n${obj.external.description}"><div style="width: auto;" class="feed-container">${obj.external.title}</div></a>`;
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

export function reactorContructor(postObj, amounts) {
  
  if (amounts != null) {
    
    postObj.replyCount = amounts[0][0];
    postObj.repostCount = amounts[1][0];
    postObj.likeCount = amounts[2][0];
    
    postObj.viewer.repost = amounts[1][1];
    postObj.viewer.like = amounts[2][1];
  }
  
  var upvoteE;
  var repostE;

  if (postObj.viewer.repost != undefined) {
    repostE = 
      `<flex class="reactors">
        <svg class="repost_${postObj.uri}-${postObj.cid}" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="20" height="20"><path d="M5.22 14.78a.75.75 0 0 0 1.06-1.06L4.56 12h8.69a.75.75 0 0 0 0-1.5H4.56l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3a.75.75 0 0 0 0 1.06l3 3Zm5.56-6.5a.75.75 0 1 1-1.06-1.06l1.72-1.72H2.75a.75.75 0 0 1 0-1.5h8.69L9.72 2.28a.75.75 0 0 1 1.06-1.06l3 3a.75.75 0 0 1 0 1.06l-3 3Z"></path></svg>
        <div class="reactor">reposted ${postObj.repostCount}</div>
      </flex>`;
  } else {
    repostE = 
      `<flex class="reactors">
        <svg class="repost_${postObj.uri}-${postObj.cid}" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="20" height="20"><path d="M5.22 14.78a.75.75 0 0 0 1.06-1.06L4.56 12h8.69a.75.75 0 0 0 0-1.5H4.56l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3a.75.75 0 0 0 0 1.06l3 3Zm5.56-6.5a.75.75 0 1 1-1.06-1.06l1.72-1.72H2.75a.75.75 0 0 1 0-1.5h8.69L9.72 2.28a.75.75 0 0 1 1.06-1.06l3 3a.75.75 0 0 1 0 1.06l-3 3Z"></path></svg>
        <div class="reactor">${postObj.repostCount}</div>
      </flex>`;
  }
  
  if (postObj.viewer.like != undefined) {
    upvoteE = 
      `<flex class="reactors">
        <svg class="upvote_${postObj.uri}-${postObj.cid}" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="20" height="20"><path d="M7.655 14.916v-.001h-.002l-.006-.003-.018-.01a22.066 22.066 0 0 1-3.744-2.584C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.044 5.231-3.886 6.818a22.094 22.094 0 0 1-3.433 2.414 7.152 7.152 0 0 1-.31.17l-.018.01-.008.004a.75.75 0 0 1-.69 0Z"></path></svg>
        <div class="reactor">${postObj.likeCount}</div>
      </flex>`;
  } else {
    upvoteE = 
      `<flex class="reactors">
        <svg class="upvote_${postObj.uri}-${postObj.cid}" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="20" height="20"><path d="m8 14.25.345.666a.75.75 0 0 1-.69 0l-.008-.004-.018-.01a7.152 7.152 0 0 1-.31-.17 22.055 22.055 0 0 1-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.066 22.066 0 0 1-3.744 2.584l-.018.01-.006.003h-.002ZM4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.58 20.58 0 0 0 8 13.393a20.58 20.58 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z"></path></svg>
        <div class="reactor">${postObj.likeCount}</div>
      </flex>`;
  }

  return `<reactors>
            <flex class="reactors">
              <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="20" height="20"><path d="M6.78 1.97a.75.75 0 0 1 0 1.06L3.81 6h6.44A4.75 4.75 0 0 1 15 10.75v2.5a.75.75 0 0 1-1.5 0v-2.5a3.25 3.25 0 0 0-3.25-3.25H3.81l2.97 2.97a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L1.47 7.28a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"></path></svg>
              <div class="reactor">${postObj.replyCount}</div>
            </flex>
            ${repostE}
            ${upvoteE}
            <flex class="reactors">
              <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" width="20" height="20"><path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path></svg>
            </flex>
          </reactors>`;
}
