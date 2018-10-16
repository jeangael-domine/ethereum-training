const assert = require('assert');
const ganache = require('ganache-cli');
// Capital letter because we are calling the Constructor
const Web3 = require('web3');
// Low letter because it is an instance
const web3 = new Web3(ganache.provider());
const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    // Deploys a new version of a contract
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data: compiledFactory.bytecode})
        .send({ from: accounts[0], gas: '1000000' });
    
    await factory.methods.createCampaign('100')
        .send({ from: accounts[0], gas: '1000000' });

    // Destructuring of an array: it takes the first element and puts it inside campaignAddress
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

    // Creates a contract object from an already deployed one
    campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress);
})

describe('Campaigns', async () => {
    it('Deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    })

    it('marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();

        assert.equal(manager, accounts[0]);
    })

    it('allows people to contribute money and marks them as approvers ', async () => {
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        })

        const isApprover = await campaign.methods.approvers(accounts[1]).call();

        // Fails if a falsy value is passed to assert
        assert(isApprover);
    })

    it('requires a minimum contribution', async () => {
        try{
            var unexpectedError = `Expected an error and didn't get one!`;

            await campaign.methods.contribute().send({
                value: '50',
                from: accounts[1]
            })
            throw new Error(unexpectedError);
        } catch(err) {
            assert.notEqual(err.message, unexpectedError)
        }
    });

    it('allows the manager to create a payment request', async () => {
        await campaign.methods.createRequest(
            'Buy batteries',
            '100',
            accounts[1]
        ).send({
            from: accounts[0],
            gas: '1000000'
        });

        const request = await campaign.methods.requests(0).call();

        assert.equal(request.description, 'Buy batteries');
    });

    it('processes requests', async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        await campaign.methods.createRequest(
            'A',
            web3.utils.toWei('5', 'ether'),
            accounts[1]
        ).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        let beforeBalance = await web3.eth.getBalance(accounts[1]);
        beforeBalance = web3.utils.fromWei(beforeBalance, 'ether');
        // parseFloat is included by default
        beforeBalance = parseFloat(beforeBalance);

        await campaign.methods.finalize(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        // Balance in wei as a String
        let afterBalance = await web3.eth.getBalance(accounts[1]);
        afterBalance = web3.utils.fromWei(afterBalance, 'ether');
        // parseFloat is included by default
        afterBalance = parseFloat(afterBalance);

        //console.log(`${afterBalance} > ${beforeBalance}`);
        assert(afterBalance > beforeBalance);
    })
});
