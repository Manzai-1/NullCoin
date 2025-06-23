import { MINING_REWARD, REWARD_ADDRESS } from '../../utilities/config.mjs';
import { createHash } from '../../utilities/hash.mjs';
import { generateId } from '../../utilities/uuid.mjs';

export default class Transaction {
  constructor({ sender, recipient, amount, input, outputMap }) {
    this.id = generateId();
    this.outputMap = outputMap || this.createOutputMap({ sender, recipient, amount });
    this.input = input || this.createInput({ sender, outputMap: this.outputMap });
  }

  static validate(transaction) {
    const { input: { amount, signature }, outputMap } = transaction;

    const total = Object.values(outputMap).reduce(
      (sum, amount) => +sum + amount
    );

    if (amount !== total) return false;

    if(createHash(outputMap) !== signature) return false;

    return true;
  }

  static transactionReward({miner}) {
    return new this({
      input: REWARD_ADDRESS,
      outputMap: { [miner]: MINING_REWARD },
    });
  }

  createOutputMap({ sender, recipient, amount }) {
    const map = {};
    map[recipient] = amount;
    map[sender.address] = sender.balance - amount;
    return map;
  }

  createInput({ sender, outputMap }) {
    return {
      timestamp: Date.now(),
      amount: sender.balance,
      address: sender.address,
      signature: createHash(outputMap),
    };
  }
}
