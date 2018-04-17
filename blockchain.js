const Block = require('./block');
const BLOCK_GENERATION_INTERVAL = 6000;
const DIFFICULTY_ADJUSTMENT_INTERVAL = 2016;

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
        this.isChainValid();
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

    getDifficulty (blockchain) {
        console.log(blockchain.chain.length);
        const latestBlock = this.fetchLatestBlock();
        if (latestBlock.index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && latestBlock.index !== 0) {
            return this.getAdjustedDifficulty(latestBlock, this.chain);
        } else {
            return blockchain.difficulty;
        }
    };

    getAdjustedDifficulty(latestBlock, blockchain) {
        const prevAdjustmentBlock = blockchain[blockchain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
        const timeExpected = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;
        const timeTaken = latestBlock.timestamp - prevAdjustmentBlock.timestamp;

        if (timeTaken < timeExpected/2) {
            return this.difficulty + 1;
        } else if (timeTaken > timeExpected*2) {
            return this.difficulty - 1;
        } else {
            return this.difficulty;
        }
    }

}


/**
 * Creating instance of the blockchain and adding new blocks to the
 * blockchain.
 * @type {Blockchain}
 */
let chainCoin = new Blockchain();

for (let i=0 ; i<DIFFICULTY_ADJUSTMENT_INTERVAL; i++) {
    console.log("Block " + i);
    chainCoin.addNewBlock(new Block("{amount : "+ i + "}"));
}

const getDifficulty = chainCoin.getDifficulty(chainCoin);
chainCoin.difficulty = getDifficulty;

console.log(chainCoin);