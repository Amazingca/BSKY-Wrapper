import Post from "./Post.mjs"

export default class Api {

    // How many seconds have passed once a generated accessJwt expires.
    tokenRefresh = 7200;

    // Default non-authenticated feed.
    defaultFeedUri = "at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot";

    // Public Bluesky API node.
    publicBlueskyApi = "https://public.api.bsky.app";

    // Supported embed inheritance of app.bsky.embed.*
    static supportedEmbedTypes = ["app.bsky.embed.record", "app.bsky.embed.images", "app.bsky.embed.audio", "app.bsky.embed.video", "app.bsky.embed.external"];

    /**
     * Creates an Api object responsible for communicating with the PDS. One can create an Api object with or without authorization.
     * @constructor
     * @param {string} pdsUrl The url of the PDS that the class will communicate with. This will be overridden by any localized PDS designated by an authorized user's DID doc.
     * @param {object} param1 The object that contains the authorization data. Pass an empty object if you are not authenticating a user.
     * @param {integer} recordLimit Optional parameter which sets a universal record return limit (useful for machines that can't handle as much data). Maximum can be 100.
     */
    constructor (pdsUrl, recordLimit=50) {

        this.plcRouting = "https://plc.directory";
        this.pdsUrl = pdsUrl;
        this.authorization = null;
        this.recordLimit = recordLimit;
    }

    /**
     * This method is responsible for verifying the authorzation object passed to the constructor. If successful, if will return the authorization object, or it will return null.
     * @param {string} authType Type of authorization. This could be a new authorization, using an identifier and password, or by using a refreshJwt.
     * @param {object} authorizationObject The object passing the authorization, either an identifier and password, or refreshJwt.
     * @returns Authorization object, if successful, containing accessJwt, refreshJwt, handle, and DID.
     */
    authorize = async (authType, authorizationObject) => {

        var xrpcRequest;
        var requestData = {
            method: "POST",
            headers: {}
        }

        if (authType == "new") {

            xrpcRequest = "com.atproto.server.createSession";

            requestData.headers["Content-Type"] = "application/json";
            requestData.body = JSON.stringify({
                "identifier": authorizationObject.identifier,
                "password": authorizationObject.password
            });
        } else if (authType == "refresh") {

            xrpcRequest = "com.atproto.server.refreshSession";

            requestData.headers["Authorization"] = `Bearer ${authorizationObject.refreshJwt}`;
        }

        try {

            const authorizationObject = await fetch(`${this.pdsUrl}/xrpc/${xrpcRequest}`, requestData).then(r => r.json());

            if (authorizationObject.accessJwt) {

                this.authorization = authorizationObject;
                this.authorization["expirationDate"] = Math.round(Date.now() / 1000) + this.tokenRefresh;

                const pdsUrl = await this.queryLocalizedPDS(this.authorization.did);

                if (pdsUrl) {

                    this.pdsUrl = pdsUrl;
                }
            } else {

                throw new Error("Login was not successful.");
            }
        } catch (e) {

            console.warn(e);
        }
    }

    /**
     * Refreshes the user authentication object, and returns the updated token if returnAccessJwt is true.
     * @param {boolean} returnAccessJwt Optional parameter option to return updated accessJwt if true. False by default.
     * @returns Optional return of accessJwt.
     */
    refreshSession = async (returnAccessJwt=false) => {

        if (!this.authorization) {

            console.error("Cannot refresh session without a refreshJwt!");
            return null;
        }

        xrpcRequest = "com.atproto.server.refreshSession";
        requestData = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.authorization.refreshJwt}`
            }
        }

        try {

            const authorizationObject = await fetch(`${this.pdsUrl}/xrpc/${xrpcRequest}`, requestData).then(r => r.json());

            if (authorizationObject.accessJwt) {

                this.authorization = authorizationObject;
                this.authorization["expirationDate"] = Math.round(Date.now() / 1000) + this.tokenRefresh;

                if (returnAccessJwt) {

                    return this.authorization.accessJwt;
                }
            }
        } catch (e) {

            console.warn(e);
            return null
        }
    }

    /**
     * Scalable method to retieve accessJwt, taking into consideration token expiry.
     * @returns Verified valid accessJwt.
     */
    getAccessJwt = async () => {

        if (!this.checkTokenExpiry()) {

            return this.authorization.accessJwt;
        } else {

            return await this.refreshSession(true);
        }
    }

    /**
     * This method checks whether the expiration date for an accessJwt has passed.
     * @param {integer} expirationUnix Optional parameter that can be used to provide a valid UNIX timestamp.
     * @returns False if expiration has not passed, true in all other cases.
     */
    checkTokenExpiry = (expirationUnix=(this.authorization) ? this.authorization.expirationDate : null) => {

        if (expirationUnix == null) {

            console.warn("No expiration date was passed.");
            return false;
        }

        return (Math.round(Date.now() / 1000) >= expirationUnix);
    }

    /**
     * This method returns a localized PDS url that is associated with a user's DID doc, if one exists.
     * @param {string} did DID associated with an authorized user.
     * @returns The user's localized PDS url. Null in all other cases.
     */
    queryLocalizedPDS = async (did) => {

        try {

            const didDoc = await fetch(`${this.plcRouting}/${did}`).then(r => r.json());

            if (didDoc.service) {

                const pdsQuery = didDoc.service.filter(item => item.type == "AtprotoPersonalDataServer");

                if (pdsQuery) {

                    return pdsQuery[0].serviceEndpoint;
                }
            }
        } catch (e) {

            console.warn(e);
            return null;
        }
    }

    /**
     * Setter which is responsible for setting a new record retrieval limit, if one can be used.
     * @param {integer} newLimit The new record retrieval limit.
     */
    setRecordLimit = (newLimit) => {

        this.recordLimit = newLimit;
    }

    /**
     * Setter to set default feed when calling @function getFeed
     * @param {string} defaultFeedUri The new default feed URI.
     */
    setDefaultFeed = (defaultFeedUri) => {

        this.defaultFeedUri = defaultFeedUri;
    }

    /**
     * Getter for default feed URI.
     * @returns Default feed URI.
     */
    getDefaultFeed = () => {

        return this.defaultFeedUri;
    }

    /**
     * Getter for returning the designated data server initalized by the constructor.
     * @returns The object's PDS url.
     */
    getDataServer = () => {

        return this.pdsUrl;
    }

    /**
     * This is a low-level method which is responsible for all non-authenticated record retrievals.
     * It will return all records (in consideration with the record retrieval limit) inside the provided collection.
     * Before making an XRPC request, the method will perform a check beforehand to ensure that the provided collection exists within the supportedCollections array.
     * @param {string} collection The given collection to retrieve records from.
     * @param {string} userId The optionally-provided user repository to retrieve those records from. Default is the authenticated user, if one exists.
     * @returns The collection records associated with the provided user.
     */
    listRecords = async (collection, userId=(this.authorization) && this.authorization.did) => {

        if (userId == null) return null;

        const supportedCollections = ["app.bsky.actor.profile", "app.bsky.feed.generator", "app.bsky.feed.like", "app.bsky.feed.post", "app.bsky.feed.repost", "app.bsky.graph.follow"];
        var isSupported = false;
        
        for (const supportedCollection of supportedCollections) {
            
            if (supportedCollection === collection) {
            
                isSupported = true;
            }
        }
        
        if (isSupported === false) {
            
            console.warn("Provided collection not supported! =>", collection);
            return null;
        }

        try {

            const xrpcRequest = "com.atproto.repo.listRecords";

            const recordList = await fetch(`${this.pdsUrl}/xrpc/${xrpcRequest}?repo=${userId}&collection=${collection}&limit=${this.recordLimit}`).then(r => r.json());

            if (recordList.records.length > 0) {

                return recordList;
            } else {

                return null;
            }
        } catch (e) {

            console.warn(e);
            return null;
        }
    }

    /**
     * Method which retrieves public-facing user flags for a supplied user.
     * @param {string} userId Optional argument which contains the user to retrieve the flags for. Default is authorized user, if one exists.
     * @returns All flag records for a given user. Null in all other cases.
     */
    getUserLabels = async (userId=(this.authorization) && this.authorization.did) => {

        if (userId == false) return null;

        try {

            const userProfileObj = await this.listRecords("app.bsky.actor.profile", userId);

            if (userProfileObj.records[0].value.labels) {

                return userProfileObj.records[0].value.labels;
            } else {

                return null;
            }
        } catch (e) {

            console.warn(e);
            return null;
        }
    }

    /**
     * Checker method that determines whether the supplied user, or user that is authenticated, has elected to have their account not shown publicly.
     * @param {string} userId Optional parameter that is the chosen user to check. The default is the authorized user, if it exists.
     * @returns True if a "!no-unauthenticated" flag has been detected in public-facing flag record. False in all other conditions.
     */
    isHidden = async (userId=(this.authorization) && this.authorization.did) => {

        if (userId == null) return false;

        try {

            const userLabels = await this.getUserLabels(userId);

            if (userLabels == null) return false;

            for (const label of userLabels.values) {
        
                if (label.val == "!no-unauthenticated") {
            
                    return true;
                }
            }

        } catch (e) {

            console.warn(e);
            return false;
        }
    }

    /**
     * This method is responsible for returning a feed, based on authentication and what is passed as a feed URI.
     * There are four main branches that we can find ourselves in, being that a boolean of whether we are authenticated and whether we have a given feed URI yields four combinations.
     * We will authenticate requests for a feed that can be authenticated, while using a different url to make public API requests.
     * The default unauthenticated return is the "What's Hot" feed, made by Bluesky.
     * The default authenticated return is the user's timeline.
     * @param {string} uri Optional URI that points to a feed on the ATP.
     * @returns A hydrated feed object.
     */
    getFeed = async (uri=null) => {

        var xrpcRequest;
        var feedUri = uri;
        var requestData = {
            method: "GET",
            headers: {}
        }

        // DEVELOPER NOTE: Can rework this nested conditional to make it cleaner.
        if (feedUri == null) {

            if (!this.authorization) {

                xrpcRequest = "app.bsky.feed.getFeed";
                feedUri = this.defaultFeedUri;
            } else {

                xrpcRequest = "app.bsky.feed.getTimeline";
                requestData.headers["Authorization"] = `Bearer ${await this.getAccessJwt()}`;
            }
        } else {

            if (!this.authorization) {

                xrpcRequest = "app.bsky.feed.getFeed";
            } else {

                xrpcRequest = "app.bsky.feed.getFeed";
                requestData.headers["Authorization"] = `Bearer ${await this.getAccessJwt()}`;
            }
        }

        try {

            const hydratedFeedObj = await fetch(`${(requestData.headers["Authorization"]) ? this.pdsUrl : this.publicBlueskyApi}/xrpc/${xrpcRequest}${(feedUri) ? "?feed=" + feedUri + "&" : "?"}limit=${this.recordLimit}`, requestData).then(r => r.json());

            if (hydratedFeedObj) {

                return hydratedFeedObj;
            } else {

                throw new Error("Not retrievable.");
            }
        } catch (e) {

            console.warn(e);
            return null;
        }
    }

    /**
     * Responsible for uploading a file to the specified PDS. Most checkers are handled by the server on upload to reduce complexity here.
     * Developer note: This has NOT been tested yet. Will do once higher-level code has been finished, like the file picker.
     * @param {object} file The chosen file to upload as a blob.
     * @returns The blob object data if the upload was successful. Will return null if not.
     */
    uploadBlob = async (file) => {

        try {

            if (this.authorization == null) throw new Error("Object instance is not authorized to post from any account!");

            const blobReader = new FileReader();
            var formattedBlob;

            blobReader.onload = () => {

                const blobData = blobReader.result;
                
                // Turn provided file into Uint8Array
                formattedBlob = new Uint8Array(blobData);
            };

            // Read Array Buffer from our file, will trigger above ^ once done
            reader.readAsArrayBuffer(file);

            const requestData = {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${await this.getAccessJwt()}`,
                    "Content-Type": file.type
                },
                body: formattedBlob
            }

            const postRequest = await fetch(`${this.pdsUrl}/xrpc/com.atproto.repo.uploadBlob`, requestData).then(r => r.json());

            if (!postRequest.blob) {

                if (postRequest.error && postRequest.message) {

                    throw new Error(`${postRequest.error}: ${postRequest.message}`);
                } else {

                    throw new Error("There was an error uploading the blob!");
                }
            }

            return postRequest;
        } catch (e) {

            console.error(e);
            return null;
        }
    }

    /**
     * Creates a new record from an authorized user on the specified PDS.
     * @param {object} recordObject Mostly complete app.bsky.feed.post data, or Post object.
     * @returns Confirmation URI / CID data, null if record creation was not successful.
     */
    newRecord = async (recordObject) => {

        try {

            if (this.authorization == null) throw new Error("Object instance is not authorized to post from any account!");

            // Dev note for future: Use OR conditionals for other types, if they are used.
            if (recordObject instanceof Post) {

                const postJson = recordObject.toJson();

                if (postJson.success == true) {

                    recordObject = postJson.data;
                } else {

                    throw new Error("Could not obtain valid post JSON from provided instance of Post!");
                }
            }

            recordObject.repo = this.authorization.handle;
            recordObject.record.createdAt = new Date().toISOString();

            const requestData = {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${await this.getAccessJwt()}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(recordObject)
            };

            const postRequest = await fetch(`${this.pdsUrl}/xrpc/com.atproto.repo.createRecord`, requestData).then(r => r.json());

            return postRequest;
        } catch (e) {

            console.error(e);
            return null;
        }
    }
}