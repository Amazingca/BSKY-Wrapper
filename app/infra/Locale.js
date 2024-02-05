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

    getTheme = () => {

        return this.locale.theme;
    }

    saveTheme = (theme) => {

        this.locale.theme = theme;
        this.push();
    }

    #getData = () => {

        if (typeof document != "undefined") return JSON.parse(localStorage.getItem("locale"));
    }

    #setData = (locale) => {

        if (typeof document != "undefined") localStorage.setItem("locale", JSON.stringify(locale));
    }
}