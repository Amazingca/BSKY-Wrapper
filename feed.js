import { postDefault } from "./struct/default.js";
import { postFull } from "./struct/full.js";
import { getUserRepo, listRecords, getUserFeed } from "./api.js";
import { activateListeners } from "./listeners.js";

import { CarReader } from 'https://cdn.jsdelivr.net/npm/@ipld/car@5.1.1/+esm';
import { decode, decodeMultiple } from 'https://cdn.jsdelivr.net/npm/cbor-x@1.5.1/+esm';

export var hasStoppedBuilding = true;
export var stoppedBuilding = false;
export var userCache;

export function editExternalVars(name, value) {

  switch (name) {
    case "hasStoppedBuilding":
      hasStoppedBuilding = value;
      break;
    case "stoppedBuilding":
      stoppedBuilding = value;
      break;
    default:
      break;
  }
}

export async function modifyFlow() {
  
  if (((localStorage.getItem("accessJwt") != null) && (localStorage.getItem("refreshJwt") != null)) && ((!localStorage.getItem("accessJwt").includes("undefined")) && (!localStorage.getItem("refreshJwt").includes("undefined")))) {
    
    userFeed();
  } else {
    
    artificialFeed();
  }
}

async function userFeed() {
  
  try {
    
    const userId = localStorage.getItem("userDid");
    const userFeed = await getUserFeed();
    
    console.log(userFeed);
    
    if (userFeed === null) {
      
      return;
    } else {
      
      var feedStruct = "";
      
      for (var i = 0; i < userFeed.feed.length; i++) {
        
        if (stoppedBuilding) {

          break;
        }

        const postStruct = await postFull(userId, userFeed.feed[i]);
        
        feedStruct = feedStruct + postStruct;
        
        document.getElementById("feedStruct").innerHTML = "<spacer>" + feedStruct + "</spacer>";
      }
      
      hasStoppedBuilding = true;
      activateListeners();
    }
  } catch (e) {
    
    console.log(e);
  }
}

async function artificialFeed() {
  
  var feedStruct = "";

  const socket = new WebSocket('wss://bsky.social/xrpc/com.atproto.sync.subscribeRepos');

  var counter = 0;

  socket.addEventListener('message', async (event) => {
    
    counter++;

    if (counter % 5 != 0) return;

    try {
      
      const messageBuf = await event.data.arrayBuffer();

      const [header, body] = decodeMultiple(new Uint8Array(messageBuf))
      if (header.op !== 1) return
      const car = await CarReader.fromBytes(body.blocks);

      for (var block of car._blocks) {
        
        const record = decode(block.bytes)

        if (record.$type === "app.bsky.feed.post") {

          record.uri = "at://" + body.repo + "/" + body.ops[0].path;

          if (record.embed) {

            if (record.embed.$type === "app.bsky.embed.images") {

              var item = record.embed.images[0].image.ref.value.buffer;

              for (var i = 0; i < record.embed.images.length; i++) {

                console.log(record, record.embed.images[i].image.ref.value)
                record.embed.images[i].image.ref.value = await decode(record.embed.images[i].image.ref.value)
              }
            }
          }

          //var imgcid = decode(record.embeds.images[0].image.ref.$link);

          if (item) console.log(item)

          const postStruct = await postDefault(body.repo, record, "feed");

          feedStruct = postStruct + feedStruct;
        
          document.getElementById("feedStruct").innerHTML = "<spacer>" + feedStruct + "</spacer>";
        }
      }
    } catch(e) {
      
      console.log(e);
    }
  });
}