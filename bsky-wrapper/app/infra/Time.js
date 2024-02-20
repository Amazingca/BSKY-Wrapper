export default class Time {

    static relative = (timestamp) => {

        //const original = new Date(timestamp);

        const second = "s";
        const minute = "m";
        const hour = "h";
        const day = "d";
        const month = " month"
        const year = " year";

        //const currentDate = new Date();

        const offset = Math.floor((new Date() - new Date(timestamp)) / 1000);

        var relativeTimestamp = "";

        if (offset > 0) {

            relativeTimestamp = offset + second;

            if (offset / 60 >= 1) {

                relativeTimestamp = Math.floor(offset / 60) + minute;

                if (offset / 3600 >= 1) {

                    relativeTimestamp = Math.floor(offset / 3600) + hour;

                    if (offset / 86400 >= 1) {

                        relativeTimestamp = Math.floor(offset / 86400) + day;

                        if (offset / 2592000 >= 1) {

                            const months = Math.floor(offset / 2592000);

                            relativeTimestamp = months + month + ((months > 1) ? "s" : "");

                            if (offset / 31556736 >= 1) {

                                const years = Math.floor(offset / 31556736);

                                relativeTimestamp = years + year + ((years > 1) ? "s" : "");
                            }
                        }
                    }
                }
            }
        }

        return relativeTimestamp + " ago";
    }
}