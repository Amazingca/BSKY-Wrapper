export default class Labeler {

    locale = null;

    constructor (locale) {

        this.locale = locale;
    }

    queryActiveLabels = ({lables}) => {

        // TODO: Uses auth basis in locale and state to retreive labels and compile the ones that are active.
    }

    assertLabel = (item, labels) => {

        // TODO: Assert returns boolean based on whether item is detected and enabled within labels.
    }
}