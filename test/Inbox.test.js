const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, bytecode } = require('../compile');
// 
// wss://rinkeby.infura.io/ws/v3/5b30aaa9296b48209425475d736395a6
let accounts;
let inbox;
const defaultMessage = 'Hi!';
beforeEach(async () => {
    // Get all accounts;
    accounts = await web3.eth.getAccounts();
    // Get one and deploy contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({data: bytecode, arguments: [defaultMessage]})
        .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, defaultMessage);
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('Bye').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.notEqual(message, defaultMessage);
    });
});