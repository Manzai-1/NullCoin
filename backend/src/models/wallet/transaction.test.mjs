import { beforeEach, describe, expect, it } from 'vitest';
import Transaction from './Transaction.mjs';
import { MINING_REWARD, REWARD_ADDRESS } from '../../utilities/config.mjs';
import { INITIAL_BALANCE } from '../../config.mjs';
import { createHash } from '../../utilities/hash.mjs';
import { generateId } from '../../utilities/uuid.mjs';

describe('Transaction', () => {
  let transaction, sender, address, balance, recipient, amount;

  beforeEach(() => {
    address = "Mansoor";
    balance = INITIAL_BALANCE;
    sender = {address, balance};

    recipient = 'Emelie';
    amount = 20;

    transaction = new Transaction({ sender, recipient, amount });
  });

  it('should have an id property', () => {
    expect(transaction).toHaveProperty('id');
  });

  describe('outputMap', () => {
    it('should should have an outputMap property', () => {
      expect(transaction).toHaveProperty('outputMap');
    });

    it('should display the amount to the recipient', () => {
      expect(transaction.outputMap[recipient]).toEqual(amount);
    });

    it('should display the balance for the senders wallet', () => {
      expect(transaction.outputMap[sender.address]).toEqual(
        sender.balance - amount
      );
    });
  });

  describe('input', () => {
    it('should should have an input property', () => {
      expect(transaction).toHaveProperty('input');
    });

    it('should have a timestamp property', () => {
      expect(transaction.input).toHaveProperty('timestamp');
    });

    it('should have an amount property', () => {
      expect(transaction.input).toHaveProperty('amount');
    });

    it('should have an address property', () => {
      expect(transaction.input).toHaveProperty('address');
    });

    it('should have a signature property', () => {
      expect(transaction.input).toHaveProperty('signature');
    });

    it('should set the amount to the senders balance', () => {
      expect(transaction.input.amount).toEqual(sender.balance);
    });

    it('should set the address to the senders public key', () => {
      expect(transaction.input.address).toEqual(sender.address);
    });
  });

  describe('Validate a transaction', () => {
    describe('when it is valid', () => {
      it('should return true', () => {
        expect(Transaction.validate(transaction)).toBeTruthy();
      });
    });

    describe('when it is not valid', () => {
      describe('and the transaction outputMaps value is invalid', () => {
        it('should return false', () => {
          transaction.outputMap[sender.address] = 960;
          expect(Transaction.validate(transaction)).toBeFalsy();
        });
      });

      describe('and the transaction input signature is invalid', () => {
        it('should return false', () => {
          transaction.input.signature = createHash(
            'You have been hacked!'
          );
          expect(Transaction.validate(transaction)).toBeFalsy();
        });
      });
    });
  });

  describe('Transaction reward', () => {
    let transactionReward, minerAddress;

    beforeEach(() => {
      minerAddress = generateId();
      transactionReward = Transaction.transactionReward(minerAddress);
    });

    it('should create a reward transaction with the miners address', () => {
      expect(transactionReward.input).toEqual(REWARD_ADDRESS);
    });

    it('should create only one transaction with the MINING_REWARD', () => {
      expect(transactionReward.outputMap[minerAddress]).toEqual(
        MINING_REWARD
      );
    });
  });
});
