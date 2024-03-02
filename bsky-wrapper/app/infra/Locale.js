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

    getTheme = () => {

        return this.locale.theme;
    }

    saveTheme = (theme) => {

        this.locale.theme = theme;
        this.push();
    }

    getPrimaryUser = () => {

        return (this.locale.users) ? this.locale.users[0] : {};
    }

    addUser = (authorizationObject) => {

        if (this.locale.users == undefined) {
            
            this.locale.users = [authorizationObject];
        } else {

            this.locale.users.push(authorizationObject);
        }
        
        this.push();
    }

    #getData = () => {

        if (typeof document != "undefined") return JSON.parse(localStorage.getItem("locale"));
    }

    #setData = (locale) => {

        if (typeof document != "undefined") localStorage.setItem("locale", JSON.stringify(locale));
    }
}