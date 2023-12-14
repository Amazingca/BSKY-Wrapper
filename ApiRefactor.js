class Api {

    /**
     * Creates an Api object responsible for communicating with the PDS. One can create an Api object with or without authorization.
     * @param {*} pdsUrl The url of the PDS that the class will communicate with.
     * @param {*} param1 The object that contains the authorization data.
     */
    constructor (pdsUrl, {authType, optionalAuthorization}) {

        this.pdsUrl = pdsUrl;
        this.authorization = (authType != null) ? authorize(authType, optionalAuthorization) : null;
    }

    /**
     * This method is responsible for verifying the authorzation object passed to the constructor. If successful, if will return the authorization object, or it will return null.
     * @param {*} authType Type of authorization. This could be a new authorization, using an identifier and password, or by using a refreshJwt.
     * @param {*} authorizationObject The object passing the authorization, either an identifier and password, or refreshJwt.
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

            const authorizationObject = await fetch(`${pdsUrl}/${xrpcRequest}`, requestData).then(r => r.json());

            if (authorizationObject.accessJwt) {

                return authorizationObject;
            } else {

                return null;
            }
        } catch (e) {

            console.log(e);
            return null;
        }
    }
}