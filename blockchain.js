const Block = require('./block');

class Blockchain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    /**
     * Creates a genesis block. Genesis block is the first block of the blockchain.
     * @returns {Block}
     */
    createGenesisBlock() {
        return new Block("Genesis Block", "89eb0ac031a63d", null, 0);
    }

    /**
     * Fetches the last created block in the blockchain.
     * @returns {*}
     */
    fetchLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    /**
     * Creates and adds block to the blockchain based on difficulty.
     * @param newBlock
     */
    addNewBlock(newBlock) {
        newBlock.mineBlock(this.difficulty);
        newBlock.index = this.fetchLatestBlock().index + 1;
        newBlock.previousHash = this.fetchLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    /**
     * Validates the blocks of the blockchain. In any condition fails,
     * then chain is invalid. If the function returns true, then the chain is valid.
     * @returns {boolean}
     */
    isChainValid() {
        for ( let i=1 ; i < this.chain.length ; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.log("Hash is invalid.");
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash ) {
                console.log("Hash of previous block is invalid.");
                return false;
            }

            if (currentBlock.index !== previousBlock.index + 1){
                console.log("Index is invalid.");
                return false;
            }
        }
        return true;
    }

}

/**
 * Creating instance of the blockchain and adding new blocks to the
 * blockchain.
 * @type {Blockchain}
 */
let chainCoin = new Blockchain();
chainCoin.addNewBlock(new Block("{amount : 4}"));
chainCoin.addNewBlock(new Block("{amount : 10}"));

console.log(chainCoin);