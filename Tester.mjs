import Api from "./Api.mjs";
import Post from "./Post.mjs";

const apiTester = new Api("https://bsky.social", 100);
const postTester = new Post({text: "Hello, this is a test post coming from an Api refactor at https://github.com/Amazingca/BSKY-Wrapper."});

const asyncCheckers = async () => {

    //await apiTester.authorize("new", {identifier: process.env.TESTING_IDENTIFIER, password: process.env.TESTING_APP_PASSWORD});
    
    //console.log(await apiTester.newRecord(postTester));

    //console.log("PDS:", apiTester.getDataServer());
    //console.log("Is expired:", apiTester.checkTokenExpiry());
    //console.log("Feed (What's Hot):", await apiTester.getFeed("at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot"));
    //console.log("Feed (What's Testing):", await apiTester.getFeed("at://did:plc:4usvqnzxonnvz2hyvx2msr4h/app.bsky.feed.generator/whats-testing"));
    //console.log("Feed (Timeline):", await apiTester.getFeed());
    //console.log("User records:", await apiTester.listRecords("app.bsky.feed.generator", "amazingca.dev"));
    //console.log("Checker to see if user is private. Should be false:", await apiTester.isHidden("caleb.bsky.social"));
}

asyncCheckers();

//const postTester = new Post({embed: {type: "nothing", data: ["one", "two", "three", "four", "five"]}});

const postCheckers = async () => {

    postTester.setEmbed([
        {
            "blob": {
                "$type": "blob",
                "ref": {
                    "$link": "bafkreiga4jolwtpmgpr7ohrw4pnz5rleok6vq4uipzindhxhwsa4nofyxu"
                },
                "mimeType": "image/png",
                "size": 58300
            },
            "aspectRatio": {
                "width": 1,
                "height": 1
            }
        },
        {
            "blob": {
                "$type": "blob",
                "ref": {
                    "$link": "bafkreiga4jolwtpmgpr7ohrw4pnz5rleok6vq4uipzindhxhwsa4nofyxu"
                },
                "mimeType": "image/png",
                "size": 58300
            },
            "aspectRatio": {
                "width": 1,
                "height": 1
            }
        },
        {
            "blob": {
                "$type": "blob",
                "ref": {
                    "$link": "bafkreiga4jolwtpmgpr7ohrw4pnz5rleok6vq4uipzindhxhwsa4nofyxu"
                },
                "mimeType": "image/png",
                "size": 58300
            },
            "aspectRatio": {
                "width": 1,
                "height": 1
            }
        },
        {
            "blob": {
                "$type": "blob",
                "ref": {
                    "$link": "bafkreiga4jolwtpmgpr7ohrw4pnz5rleok6vq4uipzindhxhwsa4nofyxu"
                },
                "mimeType": "image/png",
                "size": 58300
            },
            "aspectRatio": {
                "width": 1,
                "height": 1
            }
        }
    ]);

    //console.log(postTester.toJson());

    await apiTester.authorize("new", {identifier: process.env.TESTING_IDENTIFIER, password: process.env.TESTING_APP_PASSWORD});

    console.log(await apiTester.newRecord(postTester));

    //postTester.arrangeEmbedData(0, 4);

    //console.log(postTester.getEmbed());

    //postTester.removeEmbedData(2);

    //console.log(postTester.getEmbed());

    //console.log(postTester.validate());

    //postTester.setEmbedType("app.bsky.embed.external");

    //console.log(postTester.getEmbed());

    //console.log(postTester.validate());

    //console.log({thing: 1} instanceof Post);
}

/*

Additional thoughts regarding creating a post record with embed media.
This is the current flow that I am thinking about using:

apiTester = new Api("https://bsky.social", 100)
await apiTester.authorize({ AUTHORIZATION DATA })

postTester = new Post({text: "Post containing media."})

[ FILE CHOOSE => file ]

blobData = await apiTester.uploadBlob(file)

[ Note: Only showing the media client-side once it's been uploaded allows us to spread out API events. It also allows for a cleaner record creation process once the user sends it. ]

if (blobData != null)

    postTester.addEmbedData(blobData)

await apiTester.newRecord(postTester)

The toJson method on Post will determine, by the data in the embed array, what type of embed media to set.
This allows us to cleanly manage our embed data without having to initalize it with types.

*/

postCheckers();