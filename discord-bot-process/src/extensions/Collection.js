class Collection extends Map {
    constructor(iterable) {
        super(iterable);
    }

    first() {
        return this.values().next().value;
    }

    clone() {
        return new this.constructor(this);
    }

    map(func) {
        if (!(func instanceof Function)) throw new Error('Cannot map values without a function');
        return this.toValueArray().map(func.bind(this));
    }

    filter(func) {
        if (!(func instanceof Function)) throw new Error('Cannot filter values without a function');
        return this.toValueArray().filter(func.bind(this));
    }

    find(key, toFind) {
        for (const v of this.values()) {
            if (v[key] === toFind) return v;
        }
    }

    toKeyArray() {
        return [...this.keys()];
    }

    toValueArray() {
        return [...this.values()];
    }

    randomKey() {
        const keyArr = this.toKeyArray();
        return keyArr[Math.floor(Math.random() * keyArr.length)];
    }

    randomValue() {
        const valueArr = this.toValueArray();
        return valueArr[Math.floor(Math.random() * valueArr.length)];
    }
}

module.exports = Collection;