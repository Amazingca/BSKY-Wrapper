import { useEffect } from "react";

export default class Themes {
    
    constructor(localData, theme, setTheme) {

        this.localData = localData;
        this.theme = theme;
        this.setTheme = setTheme;

        useEffect(() => {
            
            this.sync();
        }, []);
    }

    sync = () => {

        if (this.localData.getTheme()) {

            if (this.localData.getTheme() == "light") this.setTheme("light");
            if (this.localData.getTheme() == "dark") this.setTheme("dark");
            if (this.localData.getTheme() == "auto") this.auto();
        } else {

            this.auto();
        }
    }

    auto = () => {

        if (window.matchMedia("(prefers-color-scheme: dark)")) {

            this.setTheme("dark");
        } else {

            this.setTheme("light");
        }
    }

    toggle = () => {

        const newTheme = (this.theme == "light") ? "dark" : "light";

        this.setTheme(newTheme);
        this.saveTheme(newTheme);
    }

    saveTheme = (newTheme) => {

        this.localData.saveTheme(newTheme);
    }
}