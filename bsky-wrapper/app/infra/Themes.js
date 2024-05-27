import { useEffect } from "react";

export default class Themes {
    
    constructor(localData, theme, setTheme, colorway, setColorway) {

        this.localData = localData;
        this.theme = theme;
        this.setTheme = setTheme;
        this.colorway = colorway;
        this.setColorway = setColorway;

        useEffect(() => {
            
            this.sync();
        }, []);
    }

    // Startup theme coordinator to match with user preferences in local data
    sync = () => {

        if (this.localData.getTheme()) {

            if (this.localData.getTheme() == "light") this.setTheme("light");
            if (this.localData.getTheme() == "dark") this.setTheme("dark");
            if (this.localData.getTheme() == "auto") this.auto(true);
        } else {

            this.auto(true);
        }

        if (this.localData.getColorway()) {

            this.setColorway(this.localData.getColorway());
        }
    }

    // Automatically sets theme based on system preferences
    auto = (action) => {

        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {

            if (action) {
                
                this.setTheme("dark");
            } else {
                
                return "dark";
            }
        } else {

            if (action) {

                this.setTheme("light");
            } else {

                return "light";
            }
        }
    }

    toAuto = () => {
        
        if (typeof document != "undefined") return (window.matchMedia("(prefers-color-scheme: dark)").matches == (((this.theme == "light") ? "dark" : "light") == "dark"));
    }

    // Toggles the theme back and forth, switches between "auto" depending on whether we are going back to default.
    toggle = () => {

        const newTheme = (this.theme == "light") ? "dark" : "light";

        this.setTheme(newTheme);
        
        const toAuto = (window.matchMedia("(prefers-color-scheme: dark)").matches == (newTheme == "dark"));

        this.#saveTheme((toAuto) ? "auto" : newTheme);
    }

    #saveTheme = (newTheme) => {

        this.localData.saveTheme(newTheme);
    }

    updateColorway = (newColorway) => {

        this.setColorway(newColorway);
        this.localData.saveColorway(newColorway);
    }
}