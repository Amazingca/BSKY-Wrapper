import Post from "./Post.mjs"

export default class Api {

    // How many seconds have passed once a generated accessJwt expires.
    tokenRefresh = 7200;

    // Default non-authenticated feed.
    defaultFeedUri = "at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot";

    // Public Bluesky API node.
    publicBlueskyApi = "https://api.bsky.app";

    // Limit for valid blob (in bytes) to upload to a repo. Any file must be under this limit to be included within a record.
    static blobSizeLimit = 976560;

    // Supported embed inheritance of app.bsky.embed.*
    // NOTE: Audio and video types are not referenced in the ATP lexicon, though are still valid blob types when uploading.
    //       They are included for when they are likely supported in future versions of the ATP.
    static supportedEmbedTypes = ["app.bsky.embed.record", "app.bsky.embed.images", "app.bsky.embed.audio", "app.bsky.embed.video", "app.bsky.embed.external"];

    // Supported facet types for an app.bsky.feed.post record.
    // NOTE: Naming schemas under "dev.amazingca.blue.facets" are NOT currently supported by Bluesky.
    //       However, they are still usable within the ATP which is why they are here. These are intended for text bolding & italicizing.
    static supportedFacetTypes = ["app.bsky.richtext.facet#mention", "app.bsky.richtext.facet#link", "app.bsky.richtext.facet#tag", "dev.amazingca.blue.facet#bolden", "dev.amazingca.blue.facet#italicize"];

    // Supported threadgate types for an ATP thread; app.bsky.feed.threadgate#*
    // Note: The allRules type is exclusive to this library and not supported by the ATP.
    //       It is included for the intention of making threadgates easier to work with.
    static supportedThreadgates = ["app.bsky.feed.threadgate#mentionRule", "app.bsky.feed.threadgate#followingRule", "app.bsky.feed.threadgate#listRule", "app.bsky.feed.threadgate#allRules"];

    /**
     * Creates an Api object responsible for communicating with the PDS. One can create an Api object with or without authorization.
     * @constructor
     * @param {string} pdsUrl The url of the PDS that the class will communicate with. This will be overridden by any localized PDS designated by an authorized user's DID doc.
     * @param {object} param1 The object that contains the authorization data. Pass an empty object if you are not authenticating a user.
     * @param {integer} recordLimit Optional parameter which sets a universal record return limit (useful for machines that can't handle as much data). Maximum can be 100.
     */
    constructor ({pdsUrl, authorization=null, locale=null, recordLimit=50}) {

        this.plcRouting = "https://plc.directory";
        this.pdsUrl = (pdsUrl.includes("https://")) ? pdsUrl : "https://" + pdsUrl;
        this.authorization = authorization;
        this.locale = locale;
        this.recordLimit = recordLimit;
        this.doSanitize = true;
    }

    /**
     * This method is responsible for verifying the authorzation object passed to the constructor. If successful, if will build the authorization object, containing accessJwt, refreshJwt, handle, and DID.
     * @param {string} authType Type of authorization. This could be a new authorization, using an identifier and password, or by using a refreshJwt.
     * @param {object} authorizationObject The object passing the authorization, either an identifier and password, or refreshJwt.
     * @returns Boolean on whether authorization was successful.
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

                if (this.locale.getPrimaryUser().did && this.locale.getPrimaryUser().did == this.authorization.did) this.locale.updatePrimaryUser(this.authorization.accessJwt, this.authorization.refreshJwt);

                this.authorization["expirationDate"] = Math.round(Date.now() / 1000) + this.tokenRefresh;

                const pdsUrl = await this.queryLocalizedPDS();

                if (pdsUrl) {

                    this.pdsUrl = pdsUrl;
                }

                return true;
            } else {

                throw new Error("Login was not successful.");
            }
        } catch (e) {

            console.warn(e);

            return false;
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

                if (this.locale.getPrimaryUser().did && this.locale.getPrimaryUser().did == this.authorization.did) this.locale.updatePrimaryUser(this.authorization.accessJwt, this.authorization.refreshJwt);

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
     * Deletes the session currently associated with the object instance, if one exists.
     * @returns Boolean on whether session deletion was successful. If there is no session currently associated with the instance, a vacuous truth is returned.
     */
    deleteSession = async () => {

        if (this.authorization == null) return true;

        try {

            const requestData = {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.authorization.refreshJwt}`
                }
            }

            const deleteSession = await fetch(`${this.getPreferredDataServer()}/xrpc/com.atproto.server.deleteSession`, requestData);

            if (deleteSession.status == 200) {
                
                return true;
            } else {

                throw new Error("Could not delete the session! ~> ", deleteSession);
            }
        } catch (e) {

            console.warn(e);

            return false;
        }
    }

    /**
     * Getter to retrieve the authorization object.
     * @returns Authorization object, null if one does not exist.
     */
    getAuthorization = () => {

        return this.authorization;
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
     * This method returns a localized PDS url that is associated with a user's DID doc, if one exists, or through the authorized user data.
     * @param {string} did DID associated with an authorized user, null if authorized.
     * @returns The user's localized PDS url. Null in all other cases.
     */
    queryLocalizedPDS = async (did=null) => {

        if ((did == null) && (this.authorization)) return this.authorization.didDoc.service.filter(item => item.type == "AtprotoPersonalDataServer")[0].serviceEndpoint;

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
     * Getter for retrieving best place to get hydrated items. Uses authorization bases for this.
     * @returns Preferred data server based on current authorization.
     */
    getPreferredDataServer = () => {

        // TODO: Add synchronization fixes to allow for personal PDS syncing across all component branches; root works fine.
        return (this.authorization != null) ? this.pdsUrl : this.publicBlueskyApi;
    }

    /**
     * Optional setter that lets you choose whether to disable sanitization on returned data. True by default.
     * @param {boolean} doSanitize Whether to sanitize returned data.
     */
    setSanitize = (doSanitize) => {

        this.doSanitize = doSanitize;
    }

    /**
     * Resolves the DID for a given user handle.
     * @param {string} userHandle The handle of the user.
     * @returns The DID for the user, if it exists. Null if it doesn't.
     */
    getUserDid = async (userHandle) => {

        try {

            const userDid = await fetch(`${this.pdsUrl}/xrpc/com.atproto.identity.resolveHandle?handle=${userHandle}`).then(r => r.json());

            if (userDid.did) {

                return userDid.did;
            } else {

                throw new Error("Error fetching user DID! =>", userDid);
            }
        } catch (e) {

            console.warn(e);
            return null;
        }
    }

    /**
     * Retrieves a user's hydrated profile object.
     * @param {string} user User reference, either by handle or DID.
     * @returns User profile object if one exists, empty if not.
     */
    getProfile = async (user) => {
        
        if (this.authorization == null) {

            if ((this.locale) && this.locale.getPreferNativeView() == true) {

                const profile = await this.listRecords("app.bsky.actor.profile", user);
                
                return {
                    did: profile.records[0].uri.split("/")[2],
                    handle: user,
                    displayName: profile.records[0].value.displayName,
                    description: profile.records[0].value.description,
                    labels: (profile.records[0].value.labels) ? profile.records[0].value.labels.values.map(value => value.val) : []
                }
            }

            if (await this.isHidden(user)) return {};
        }

        var requestData = {
            method: "GET",
            headers: {}
        }

        if (this.authorization) {

            requestData.headers["Authorization"] = `Bearer ${await this.getAccessJwt()}`;
        }

        try {

            const userProfileObj = await fetch(`${this.getPreferredDataServer()}/xrpc/app.bsky.actor.getProfile?actor=${user}`, requestData).then(r => r.json());

            if (!userProfileObj.error) {

                return userProfileObj;
            } else {

                throw new Error(userProfileObj);
            }
        } catch (e) {

            console.warn("There was an error fetching the profile! =>", e);
            return {};
        }
    }

    /**
     * Returns an author's feed.
     * @param {object} options The user pointer and an optional cursor. 
     * @returns The author's feed.
     */
    getProfileFeed = async ({user, cursor=null}) => {

        if (this.authorization == null) {

            if ((this.locale) && this.locale.getPreferNativeView() == true) {

                const postsAt = await this.listRecords("app.bsky.feed.post", user, cursor);

                var formattedPostsAt = {
                    cursor: postsAt.cursor,
                    feed: []
                }

                for (const post of postsAt.records) {

                    formattedPostsAt.feed.push({
                        post: {
                            uri: post.uri,
                            cid: post.cid,
                            author: {
                                handle: user,
                                labels: []
                            },
                            record: post.value
                        },
                        replies: []
                    });
                }

                return formattedPostsAt;
            }

            if (await this.isHidden(user)) return {};
        }

        var requestData = {
            method: "GET",
            headers: {}
        }

        if (this.authorization) {

            requestData.headers["Authorization"] = `Bearer ${await this.getAccessJwt()}`;
        }

        try {

            const userProfileFeedObj = await fetch(`${this.getPreferredDataServer()}/xrpc/app.bsky.feed.getAuthorFeed?actor=${user}${(cursor) ? "&cursor=" + cursor : ""}`, requestData).then(r => r.json());

            if (!userProfileFeedObj.error) {

                return userProfileFeedObj;
            } else {

                throw new Error(userProfileFeedObj);
            }
        } catch (e) {

            console.warn("There was an error fetching the user's feed! =>", e);
            return {};
        }
    }

    /**
     * Resolves a hydrated post thread.
     * @param {object} user Reference for a user. Can be either a handle or DID, assigned with "ref", and the type provided under "type".
     * @param {string} postId Reference key for a post record.
     * @returns Object with post thread, otherwise empty.
     */
    getPostThread = async (user, postId) => {

        if (this.authorization == null) {

            if ((this.locale) && this.locale.getPreferNativeView() == true) {

                var postThread = {
                    thread: {}
                }

                const getParent = async (user, postId) => {

                    const parent = await this.getRecord("app.bsky.feed.post", user, postId);
                    const author = await this.getProfile(user);

                    var postParent = {
                        post: {
                            uri: parent.uri,
                            cid: parent.cid,
                            author: author,
                            record: parent.value
                        },
                        replies: []
                    }

                    if (parent.value.reply) postParent.parent = await getParent(parent.value.reply.parent.uri.split("/")[2], parent.value.reply.parent.uri.split("/")[4]);

                    return postParent;
                }

                postThread.thread = await getParent(user.ref, postId);

                return postThread;
            }

            if (await this.isHidden(user.ref)) return {};
        }

        var requestData = {
            method: "GET",
            headers: {}
        }

        if (this.authorization) {

            requestData.headers["Authorization"] = `Bearer ${await this.getAccessJwt()}`;
        }

        try {

            const hydratedPostThreadObj = await fetch(`${this.getPreferredDataServer()}/xrpc/app.bsky.feed.getPostThread?uri=at://${(user.type == "did") ? user.ref : await this.getUserDid(user.ref)}/app.bsky.feed.post/${postId}`, requestData).then(r => r.json());

            if (!hydratedPostThreadObj.error) {

                return this.sanitize(hydratedPostThreadObj);
            } else {

                throw new Error("Error retrieving post thread! =>", hydratedPostThreadObj);
            }
        } catch (e) {

            console.warn(e);
            return {};
        }
    }

    /**
     * Retrieves a record that is contained within a user's repository.
     * @param {string} collection Collection that the record is in
     * @param {string} userId User associated with the bucket
     * @param {string} rkey Key associated with the record
     * @returns Collection record
     */
    getRecord = async (collection, userId, rkey) => {

        const supportedCollections = ["app.bsky.actor.profile", "app.bsky.feed.generator", "app.bsky.feed.like", "app.bsky.feed.post", "app.bsky.feed.repost", "app.bsky.feed.threadgate", "app.bsky.graph.follow"];
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

            const xrpcRequest = "com.atproto.repo.getRecord";

            const record = await fetch(`${this.pdsUrl}/xrpc/${xrpcRequest}?repo=${userId}&collection=${collection}&rkey=${rkey}&limit=${this.recordLimit}`).then(r => r.json());

            if (record.uri) {

                return this.sanitize(record);
            } else {

                return null;
            }
        } catch (e) {

            console.warn(e);
            return null;
        }
    }

    /**
     * This is a low-level method which is responsible for all non-authenticated record retrievals.
     * It will return all records (in consideration with the record retrieval limit) inside the provided collection.
     * Before making an XRPC request, the method will perform a check beforehand to ensure that the provided collection exists within the supportedCollections array.
     * @param {string} collection The given collection to retrieve records from.
     * @param {string} userId The optionally-provided user repository to retrieve those records from. Default is the authenticated user, if one exists.
     * @returns The collection records associated with the provided user.
     */
    listRecords = async (collection, userId=(this.authorization) && this.authorization.did, cursor=null) => {

        if (userId == null) return null;

        const supportedCollections = ["app.bsky.actor.profile", "app.bsky.feed.generator", "app.bsky.feed.like", "app.bsky.feed.post", "app.bsky.feed.repost", "app.bsky.feed.threadgate", "app.bsky.graph.follow"];
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

            const recordList = await fetch(`${this.pdsUrl}/xrpc/${xrpcRequest}?repo=${userId}&collection=${collection}&limit=${this.recordLimit}${(cursor) ? "&cursor=" + cursor : ""}`).then(r => r.json());

            if (recordList.records.length > 0) {

                return this.sanitize(recordList);
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
     * Checker method that determines whether the supplied user, or user that is authenticated, has elected to have their account not shown publicly.
     * @param {object} userObj Optional parameter that is the chosen user to check. The default is the authorized user, if it exists.
     * @returns True if a "!no-unauthenticated" flag has been detected in public-facing flag record. False in all other conditions.
     */
    isHiddenHydrated = (userObj) => {

        if (userObj.labels.length == 0) return false;

        for (const label of userObj.labels) {

            if (label == "!no-authenticated") {

                return true;
            }
        }
    }

    /**
     * This method is responsible for returning a feed, based on authentication and what is passed as a feed URI.
     * There are four main branches that we can find ourselves in, being that a boolean of whether we are authenticated and whether we have a given feed URI yields four combinations.
     * We will authenticate requests for a feed that can be authenticated, while using a different url to make public API requests.
     * The default unauthenticated return is the "What's Hot" feed, made by Bluesky.
     * The default authenticated return is the user's timeline.
     * @param {object} options Optional URI that points to a feed on the ATP and the position within that feed (cursor).
     * @returns A hydrated feed object.
     */
    getFeed = async ({uri=null, cursor=null}) => {

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

            const hydratedFeedObj = await fetch(`${this.getPreferredDataServer()}/xrpc/${xrpcRequest}${(feedUri) ? "?feed=" + feedUri + "&" : "?"}limit=${this.recordLimit}${(cursor) ? "&cursor=" + cursor : ""}`, requestData).then(r => r.json());

            if (hydratedFeedObj) {

                return this.sanitize(hydratedFeedObj);
            } else {

                throw new Error("Not retrievable.");
            }
        } catch (e) {

            console.warn(e);
            return null;
        }
    }

    /**
     * Returns a list of hydrated post records based on the term that is provided.
     * @param {object} options The term to search posts for and the optional cursor.
     * @returns Hydrated post records that include provided term, if one exists.
     */
    queryPosts = async ({term, cursor=null}) => {

        var xrpcRequest = "app.bsky.feed.searchPosts";
        var requestData = {
            method: "GET",
            headers: {}
        }

        if (this.authorization) requestData.headers["Authorization"] = `Bearer ${await this.getAccessJwt()}`;

        try {

            const queryResults = await fetch(`${this.getPreferredDataServer()}/xrpc/${xrpcRequest}?q=${(term.split("")[0] == "#") ? "%23" + term.slice(1) : term}&limit=${this.recordLimit}${(cursor) ? "&cursor=" + cursor : ""}`, requestData).then(r => r.json());

            if (queryResults) {

                return this.sanitize(queryResults);
            } else {

                throw new Error("Unable to query posts with the specified term! =>", term, queryResults);
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
    uploadBlob = async (file, callback) => {

        try {

            if (this.authorization == null) throw new Error("Object instance is not authorized to post from any account!");

            const blobReader = new FileReader();
            var formattedBlob;

            blobReader.onload = async () => {

                const blobData = blobReader.result;
                
                // Turn provided file into Uint8Array
                formattedBlob = new Uint8Array(blobData);
                
                const requestData = {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${await this.getAccessJwt()}`,
                        "Content-Type": file.type
                    },
                    body: formattedBlob
                }

                const postRequest = await fetch(`${this.getPreferredDataServer()}/xrpc/com.atproto.repo.uploadBlob`, requestData).then(r => r.json());

                if (!postRequest.blob) {

                    if (postRequest.error && postRequest.message) {

                        throw new Error(`${postRequest.error}: ${postRequest.message}`);
                    } else {

                        throw new Error("There was an error uploading the blob!");
                    }
                }

                callback(postRequest);
            };

            // Read Array Buffer from our file, will trigger above ^ once done
            blobReader.readAsArrayBuffer(file);
        } catch (e) {

            console.error(e);
            callback(null);
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

            var threadgate = {};
            if (recordObject.record.threadgate) {

                threadgate = recordObject.record.threadgate;
                delete recordObject.record.threadgate;
            }

            const requestData = {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${await this.getAccessJwt()}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(recordObject)
            };

            const postRequest = await fetch(`${this.pdsUrl}/xrpc/com.atproto.repo.createRecord`, requestData).then(r => r.json());

            if (postRequest.uri == null) {

                throw new Error(JSON.stringify(postRequest));
            }

            if (Object.keys(threadgate).length == 0) {

                return [postRequest];
            } else {

                threadgate.rkey = postRequest.uri.split("/app.bsky.feed.post/")[1];
                threadgate.record.post = postRequest.uri;

                return [postRequest, await this.newRecord(threadgate)];
            }
        } catch (e) {

            console.error(e);
            return null;
        }
    }

    /**
     * Getter for the current unread notifications for a user.
     * @returns Notifications count for the user.
     */
    getNotificationCount = async () => {

        try {

            if (this.authorization == null) throw new Error("Object instance is not authorized with any account!");

            const requestData = {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${await this.getAccessJwt()}`
                }
            };

            const postRequest = await fetch(`${this.pdsUrl}/xrpc/app.bsky.notification.getUnreadCount`, requestData).then(r => r.json());

            if (typeof postRequest.count != "undefined") {

                return postRequest.count;
            } else {

                throw new Error("Error retrieving unread notification count! =>", postRequest);
            }
        } catch (e) {

            console.error(e);
            return null;
        }
    }

    /**
     * Returns the authorized user's notifications feed.
     * @param {string} cursor Optional cursor for location pointing.
     * @returns The notifications feed.
     */
    getNotifications = async (cursor=null) => {

        try {

            if (this.authorization == null) throw new Error("Object instance is not authorized with any account!");

            const requestData = {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${await this.getAccessJwt()}`
                }
            };

            const postRequest = await fetch(`${this.pdsUrl}/xrpc/app.bsky.notification.listNotifications?limit=${this.recordLimit}${(cursor) ? "&cursor=" + cursor : ""}`, requestData).then(r => r.json());

            if (postRequest.notifications) {

                return postRequest;
            } else {

                throw new Error("Error retrieving notification feed! =>", postRequest);
            }
        } catch (e) {

            console.error(e);
            return null;
        }
    }

    /**
     * Updates the seenAt field for a specified account upon a provided ISO date.
     * @param {string} date ISO date that you want notifications to be "seen" at
     * @returns Updates with the given ISO date or the current date if none is given
     */
    markNotificationsAsRead = async (date) => {

        try {

            if (this.authorization == null) throw new Error("Object instance is not authorized with any account!");

            const requestData = {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${await this.getAccessJwt()}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    seenAt: (date) ? date : new Date().toISOString()
                })
            };

            const postRequest = await fetch(`${this.pdsUrl}/xrpc/app.bsky.notification.updateSeen`, requestData);

            if (postRequest.status == 200) return true;
        } catch (e) {

            console.warn(e);
            return false;
        }
    }

    /**
     * Addresses XSS vulnerabilities when data from Api.js is displayed through a web interface.
     * @param {object} data Valid JSON data.
     * @returns Replacement of "<", ">", and quote instances with their codified forms to avoid XSS injection.
     */
    sanitize = (data) => {

        return (this.doSanitize == true) ? JSON.parse(JSON.stringify(data).replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\\\"", "&quot;")) : data;
    }
}