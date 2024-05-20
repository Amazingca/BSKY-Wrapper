export default class Locale {

    constructor() {

        this.locale = {};

        if ((typeof document != "undefined") && localStorage.getItem("locale")) this.locale = this.#getData();
    }

    pull = () => {

        this.locale = this.#getData();
    }

    push = () => {

        this.#setData(this.locale);
    }

    getServer = () => {

        if (this.locale.server == undefined) this.locale.server = "https://bsky.social";

        return this.locale.server;
    }

    setServer = (server) => {

        this.locale.server = server;
        this.push();
    }

    getPreferNativeView = () => {

        return (this.locale.nativeView) ? this.locale.nativeView : false;
    }

    setPreferNativeView = (nativeView) => {

        this.locale.nativeView = nativeView;
        this.push();
    }

    getTheme = () => {

        return this.locale.theme;
    }

    saveTheme = (theme) => {

        this.locale.theme = theme;
        this.push();
    }

    getUsers = () => {

        return (this.locale.users) ? this.locale.users : [];
    }

    getPrimaryUser = () => {

        return (this.locale.users) ? this.locale.users[this.locale.users.length - 1] : {};
    }

    updatePrimaryUser = (accessJwt, refreshJwt) => {

        this.locale.users[this.locale.users.length - 1].accessJwt = accessJwt;
        this.locale.users[this.locale.users.length - 1].refreshJwt = refreshJwt;

        this.push();
    }

    switchPrimaryUser = (authorizationObject) => {

        var found = false;

        if (this.locale.users.length == 0) return found;

        for (var i = 0; i < this.locale.users.length; i++) {

            if (this.locale.users[i].accessJwt == authorizationObject.accessJwt && this.locale.users[i].refreshJwt == authorizationObject.refreshJwt) {

                const match = this.locale.users[i];

                if (i + 1 < this.locale.users.length) {

                    found = true;

                    this.locale.users[i] = this.locale.users[i + 1];
                    this.locale.users[i + 1] = match;
                }
            }
        }

        this.push();

        return found;
    }

    addUser = (authorizationObject) => {

        if (this.locale.users == undefined) {
            
            this.locale.users = [authorizationObject];
        } else {

            this.locale.users.push(authorizationObject);
        }
        
        this.push();
    }

    removeUser = (authorizationObject) => {

        this.locale.users = this.locale.users.filter(user => user.accessJwt != authorizationObject.accessJwt && user.refreshJwt != authorizationObject.refreshJwt);

        if (this.locale.users.length == 0) delete this.locale.users;

        this.push();
    }

    #getData = () => {

        if (typeof document != "undefined") return JSON.parse(localStorage.getItem("locale"));
    }

    #setData = (locale) => {

        if (typeof document != "undefined") localStorage.setItem("locale", JSON.stringify(locale));
    }
}