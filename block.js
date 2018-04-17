const sha256 = require('crypto-js/sha256');

class Block {

    constructor(data, previousHash, timestamp, index,
                currentHash, nouce) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = new Date().getTime();
        this.data = data;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    /**
     * Calculating hash of the block based on the contents of the block
     * @returns {*}
     */
    calculateHash() {
        return sha256(this.index + this.previousHash + this.timestamp  +
            JSON.stringify(this.data)+ this.nonce).toString();
    }

    /**
     * Mining the block based on the difficulty. If the condition is satisfied, then
     * nonce is incremented and hash is calculated again.
     * @param difficulty
     * @returns {*}
     */
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Mining Block", this.hash);

        return this.hash;

    }
}

module.exports = Block;