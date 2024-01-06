import Api from "./Api.mjs";

export default class Post {

    // Embed limit for valid app.bsky.feed.post data.
    // Developer note: This is really placeholder since a record can contain more than 4 embed items. Ten seems like a feasible shutoff, though am open to suggestions.
    embedLimit = 10;

    // Post text. Can be empty if media is provided.
    //text = "";

    // Post media. In array form because multiple can be sent.
    //media = [];

    // Post facets. Includes optional formatting and mention pointers.
    //facets = [];

    // Post flags. Optional flags to set with the post.
    //flags = [];

    /**
     * Constructor for the Post object. This is responsible for parsing the information in a post into valid app.bsky.feed.post data.
     * @param {object} param0 Optional parameter which contains predefined data for the post object. This is the easiest way to initialize the object, though may not be the easiest to work with for beginners.
     */
    constructor ({text, embed, facets, flags} = {text: "", embed: {}, facets: {}, flags: {}}) {

        this.text = (text != undefined) ? text : "";
        this.embed = embed;
        this.facets = facets;
        this.flags = flags;
    }

    /**
     * Getter for retrieving the text in the post.
     * @returns Text for the post.
     */
    getText = () => {

        return this.text;
    }

    /**
     * Sets the post text.
     * @param {string} text The post text.
     */
    setText = (text) => {

        this.text = text;
    }

    /**
     * Getter for retrieving the embed data for the post.
     * @returns Embed for the post.
     */
    getEmbed = () => {

        return this.embed;
    }

    /**
     * Sets the post's embeds.
     * @param {array} embed The post embed. 
     */
    setEmbed = (embed) => {

        this.embed = embed;
    }

    /**
     * Setter which modifies the embed's type.
     * @param {string} type The new embed type.
     */
    setEmbedType = (type) => {

        this.embed.type = type;
    }

    /**
     * Appends new embed data to the embed object.
     * @param {object} newEmbed An ambed object.
     */
    addEmbedData = (newEmbed) => {

        this.embed.data.push(newEmbed);
    }
    
    /**
     * Setter which removes the media at a specified index.
     * @param {integer} itemIndex The index of the item to remove from the embed data.
     */
    removeEmbedData = (itemIndex) => {

        this.embed.data.splice(itemIndex, 1);
    }

    /**
     * Setter which moves a specified embed entry to another index in the object.
     * The items around adapt to this change by shifting around the edit.
     * @param {integer} itemIndex Index for the target embed.
     * @param {integer} destination Index for the destination of the embed.
     */
    arrangeEmbedData = (itemIndex, destination) => {

        var tempItem;

        if (itemIndex > destination) {

            for (var i = 0; i < itemIndex - destination; i++) {

                tempItem = this.embed.data[destination + i];

                this.embed.data[destination + i] = this.embed.data[itemIndex];

                this.embed.data[itemIndex] = tempItem;
            }
        } else if (itemIndex < destination) {

            for (var i = 0; i < destination - itemIndex; i++) {

                tempItem = this.embed.data[destination - i];

                this.embed.data[destination - i] = this.embed.data[itemIndex];

                this.embed.data[itemIndex] = tempItem;
            }
        }
    }

    /**
     * Getter which retrieves the facets for the post.
     * @returns Facets for the post.
     */
    getFacets = () => {

        return this.facets;
    }

    /**
     * Sets the post's facets.
     * @param {array} facets The facets for the post.
     */
    setFacets = (facets) => {

        this.facets = facets;
    }

    /**
     * Getter which retrieves the flags for the post.
     * @returns Flags for the post.
     */
    getFlags = () => {

        return this.flags;
    }

    /**
     * Sets the post's flags.
     * @param {array} flags The flags for the post.
     */
    setFlags = (flags) => {

        this.flags = flags;
    }

    /**
     * Validates the data in the object to ensure that it is ready to be sent with @method Api.newRecord
     * @return Boolean on whether post object is valid.
     */
    validate = () => {

        // If we have nothing to send.
        if ((this.getText() == "") && (this.getEmbed() == undefined)) return false;

        // If the embed type is not supported.
        if (this.getEmbed() != undefined) {
            
            var supported = false;
            for (const type of Api.supportedEmbedTypes) {
                
                if (this.getEmbed().type == type) supported = true;
            }
            if (supported == false) return false;
        }

        // If embed data is over the set limit.
        if ((this.getEmbed() != undefined) && (this.getEmbed().data.length > this.embedLimit)) return false;

        return true;
    }

    /**
     * Constructs and returns valid app.bsky.feed.post JSON, excluding creation date and repo DID.
     * Developer note: This is incomplete and only compiles the post text.
     * @returns Mostly complete, valid app.bsky.feed.post JSON.
     */
    toJson = () => {

        if (this.validate() == false) return {success: false, data: null};

        const parsedJson = {
            "collection": "app.bsky.feed.post",
            "record": {
                "text": this.getText()
            }
        };

        return {success: true, data: parsedJson};
    }
}