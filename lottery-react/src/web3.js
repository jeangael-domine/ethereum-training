import Web3 from 'web3';

// Overwrites the web3 instance that Metamask automatically injects
const web3 = new Web3(window.web3.currentProvider);

export default web3;