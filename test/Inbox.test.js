const assert = require('assert');
const ganache = require('ganache-cli');
// Capital letter because we are calling the Constructor
const Web3 = require('web3');
// Low letter because it is an instance
const web3 = new Web3(ganache.provider());

beforeEach(() => {
    // Get a list of all accounts
     web3.eth.getAccounts().then(fetchedAccounts => {
         console.log(fetchedAccounts);
     })

    // Use one of those accounts to deploy the contract
});

describe('Inbox', () => {
    it('deploys a contract', () => {

    });
});

