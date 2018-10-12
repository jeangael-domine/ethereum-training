const assert = require('assert');
const ganache = require('ganache-cli');
// Capital letter because we are calling the Constructor
const Web3 = require('web3');
// Low letter because it is an instance
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let lottery;

beforeEach(async () => {
    // Get a list of all accounts
     accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Lottery Contract', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('can enter', async () => {
        const message = await lottery.methods.enter().send({ from: accounts[0], gas: '1000000' });

        const players = await lottery.methods.getPlayers().call();

        assert.equal(players.length,1);
    });
});