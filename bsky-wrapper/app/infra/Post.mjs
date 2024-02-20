import Api from "./Api.mjs";

export default class Post {

    // Embed limit for valid app.bsky.feed.post data.
    // Developer note: This is really placeholder since a record can contain more than 4 non-image embed items. Ten seems like a feasible shutoff, though am open to suggestions.
    embedLimit = 4;

    /**
     * Constructor for the Post object. This is responsible for parsing the information in a post into valid app.bsky.feed.post data.
     * @param {object} param0 Optional parameter which contains predefined data for the post object. This is the easiest way to initialize the object, though may not be the easiest to work with for beginners.
     */
    constructor ({text, embed, facets, langs, labels, threadgate} = {text: "", embed: [], facets: [], langs: [], labels: [], threadgate: []}) {

        /**
         * Post text. Can be empty if media is provided.
         * @type {string}
         * @public
         */
        this.text = (text != undefined) ? text : "";

        /**
         * Post embed date. In array form because multiple can be sent.
         * @type {array}
         * @public
         */
        this.embed = embed;

        /**
         * Post facets. Includes optional formatting and mention pointers.
         * @type {array}
         * @public
         */
        this.facets = facets;

        /**
         * Post languages. Sets the included languages within a post using two-letter abbreviations.
         * @type {array}
         * @public
         */
        this.langs = langs;

        /**
         * Post labels. Optional labels to set with the post.
         * @type {array}
         * @public
         */
        this.labels = labels;

        /**
         * Post threadgate. Optional setting which gates who can reply to this specific post.
         * 
         * IMPORTANT:
         * 
         * In contrary to how this is done directly with the ATP, there are some changes which are meant to make interfacing with it here easier.
         * By the definition of the lexicon, the supported types are "#mentionRule", "#followingRule", and "#listRule".
         * However, instead of an empty gate object referencing a post which does not allow any replies, it will instead recognize the keyword "#allRules" to substitute.
         * This is to allow an "all reply"/"no gate" feature using an empty threadgate inside the post object.
         * 
         * As a reminder "#allRules" is not recognized by the ATP and will only work here.
         * 
         * To reference a #listRule parameter, simply substitute the at-uri for the list in place for the lexicon definition. Post will understand this and do proper conversion using @method Post.toJson
         * @type {array}
         * @public
         */
        this.threadgate = threadgate;
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

    getEmbedFormats = () => {

        var formats = [];

        for (const item of this.embed) {

            formats.push(item.blob.mimeType);
        }

        return formats;
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
     * Getter which retrieves the languages for a post.
     * @returns The languages for a post.
     */
    getLangs = () => {

        return this.langs;
    }

    /**
     * Sets the languages for the post.
     * @param {array} langs The languages for the post.
     */
    setLangs = (langs) => {

        this.langs = langs;
    }

    /**
     * Getter which retrieves the labels for the post.
     * @returns Labels for the post.
     */
    getLabels = () => {

        return this.labels;
    }

    /**
     * Sets the post's labels.
     * @param {array} labels The labels for the post.
     */
    setLabels = (labels) => {

        this.labels = labels;
    }

    /**
     * Getter which retrieves the user types that are allowed to reply to the post.
     * @returns Threadgate to be initalized for the post.
     */
    getThreadgate = () => {

        return this.threadgate;
    }

    /**
     * Sets the allowed user types to reply to the post.
     * @param {object} threadgate The threadgate user types which are allowed to reply to the post.
     */
    setThreadgate = (threadgate) => {

        this.threadgate = threadgate;
    }

    /**
     * Validates the data in the object to ensure that it is ready to be sent with @method Api.newRecord
     * Most of these conditionals are ranked based on how common the error may be. That way we can catch it earlier and make the process faster.
     * @return Boolean on whether post object is valid.
     */
    validate = () => {

        // If we have nothing to send.
        if ((this.getText() == "") && (this.getEmbed() == undefined)) return false;

        // If the embed type is not supported.
        if (this.getEmbed() != undefined) {

            var supported = true;
            for (const item of this.getEmbed()) {

                if (item.blob.size > Api.blobSizeLimit) supported = false;
            }
            if (supported == false) return false;

            var embedFormats = this.getEmbedFormats();
            
            supported = false;
            for (const type of Api.supportedEmbedTypes) {

                var plural = "";
                if (embedFormats[0].split("/")[0] == "image") plural = "s";

                const preppedEmbedType = embedFormats[0].split("/")[0] + plural
                
                if ("app.bsky.embed." + preppedEmbedType == type) {

                    this.preppedEmbedType = preppedEmbedType;
                    supported = true;
                }
            }
            if (supported == false) return false;

            
            var firstItem = embedFormats[0];
            for (const item of embedFormats.slice(1)) {

                if (item != firstItem) return false;
            }
        }

        // If the facets are not supported.
        if (this.getFacets() != undefined) {

            const facets = this.getFacets();

            var supported = true;

            for (const facet of facets) {

                var itemSupported = false;

                var facetType = "";

                if (facet.val.includes("did:plc:")) {

                    facetType = "app.bsky.richtext.facet#mention";
                } else if (facet.val.includes("https://") || facet.val.includes("at://")) {

                    facetType = "app.bsky.richtext.facet#link";
                } else if (facet.val.length <= 640) {

                    if (facet.val.match(/\p{Extended_Pictographic}/gu) == null) {

                        facetType = "app.bsky.richtext.facet#tag";
                    } else if (facet.val.match(/\p{Extended_Pictographic}/gu).length <= 64) {

                        facetType = "app.bsky.richtext.facet#tag";
                    }
                }

                for (const supportedFacet of Api.supportedFacetTypes) {

                    if (facetType == supportedFacet) {

                        itemSupported = true;
                    }
                }

                if (itemSupported == false) {

                    return false;
                }
            }
        }

        // If the threadgate type is not supported.
        if (this.getThreadgate() != undefined) {

            var threadgate = this.getThreadgate();

            for (const threadgateItem of threadgate) {

                var supported = false;
                for (const type of Api.supportedThreadgates) {

                    if (threadgateItem == type) {

                        supported = true;
                    } else if (threadgateItem.includes("at://") && threadgateItem.includes("/app.bsky.graph.list/")) {

                        supported = true;
                    }
                }

                if (supported == false) {

                    return false;
                }
            }
        }

        // If embed data is over the set limit.
        if ((this.getEmbed() != undefined) && (this.getEmbed().length > this.embedLimit)) return false;

        return true;
    }

    /**
     * Constructs and returns valid app.bsky.feed.post JSON, excluding creation date and repo DID.
     * In addition, this compiles the threadgate data, which is recognized by @method Api.newRecord and is created immediately after post creation.
     * Developer note: This is mostly complete but has not been thoroughly tested.
     * @returns Mostly complete, valid app.bsky.feed.post JSON.
     */
    toJson = () => {

        if (this.validate() == false) return {success: false, data: null};

        var embed = {};

        if (this.getEmbed()) {

            const embedData = this.getEmbed();

            embed.$type = "app.bsky.embed." + this.preppedEmbedType;
            embed[this.preppedEmbedType] = [];

            for (const item of embedData) {

                embed[this.preppedEmbedType].push({
                    "alt": (item.alt) ? item.alt : "",
                    "aspectRatio": {
                        "width": item.aspectRatio.width,
                        "height": item.aspectRatio.height
                    },
                    [item.blob.mimeType.split("/")[0]]: {
                        "$type": "blob",
                        "mimeType": item.blob.mimeType,
                        "ref": {
                            "$link": item.blob.ref.$link,
                        },
                        "size": item.blob.size
                    }
                })
            }
        }

        var facets = [];

        if (this.getFacets()) {

            const facetData = this.getFacets();

            for (const facet of facetData) {

                var facetType = {};

                if (facet.val.includes("did:plc:")) {

                    facetType = {"pointer": "app.bsky.richtext.facet#mention", "ref": "did"};
                } else if (facet.val.includes("https://") || facet.val.includes("at://")) {

                    facetType = {"pointer": "app.bsky.richtext.facet#link", "ref": "uri"};
                } else if (facet.val.length <= 640) {

                    if (facet.val.match(/\p{Extended_Pictographic}/gu) == null) {

                        facetType = {"pointer": "app.bsky.richtext.facet#tag", "ref": "tag"};
                    } else if (facet.val.match(/\p{Extended_Pictographic}/gu).length <= 64) {

                        facetType = {"pointer": "app.bsky.richtext.facet#tag", "ref": "tag"};
                    }
                }

                facets.push({
                    "$type": "app.bsky.richtext.facet",
                    "index": {
                        "byteStart": facet.byteStart,
                        "byteEnd": facet.byteEnd
                    },
                    "features": [
                        {
                            "$type": facetType.pointer,
                            [facetType.ref]: facet.val
                        }
                    ]
                })
            }
        }

        var labels = {};

        if (this.getLabels()) {

            const labelData = this.getLabels();

            labels = {
                "$type": "com.atproto.label.defs#selfLabels",
                "values": []
            };

            for (const label of labelData) {

                labels.values.push({"val": label});
            }
        }

        var threadgate = {};

        if (this.getThreadgate()) {

            const threadgateData = this.getThreadgate();

            threadgate = {
                "collection": "app.bsky.feed.threadgate",
                "record": {
                    "post": "hello",
                    "allow": [],
                    "$type": "app.bsky.feed.threadgate"
                }
            };

            for (const item of threadgateData) {

                if (item == "app.bsky.feed.threadgate#allRules") {
                    
                    threadgate.record.allow = [];
                } else if (item.includes("at://") && item.includes("/app.bsky.graph.list/")) {

                    threadgate.record.allow.push({"$type": "app.bsky.feed.threadgate#listRule", "list": item});
                } else {

                    threadgate.record.allow.push({"$type": item});
                }
            }
        }

        const parsedJson = {
            "collection": "app.bsky.feed.post",
            "record": {
                "text": this.getText()
            }
        };

        if (Object.keys(embed).length > 0) parsedJson.record.embed = embed;
        if (facets.length > 0) parsedJson.record.facets = facets;
        if (this.getLangs().length > 0) parsedJson.record.langs = this.getLangs();
        if (Object.keys(labels).length > 0) parsedJson.record.labels = labels;
        if (Object.keys(threadgate).length > 0) parsedJson.record.threadgate = threadgate;

        return {success: true, data: parsedJson};
    }
}