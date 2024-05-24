export default class Flags {

    constructor (enableAll=false) {

        this.enableAll = enableAll;
        this.gates = {};
    }

    register = (key, accessors) => {

        if (this.gates[key]) return false;

        this.gates[key] = accessors;

        return true;
    }

    getGate = (key) => {

        return (this.enableAll == false && this.gates[key]) ? this.gates[key][0] : true;
    }

    setGate = (key, value) => {

        if (!this.gates[key]) return false;

        this.gates[key][1](value);

        return true;
    }
}