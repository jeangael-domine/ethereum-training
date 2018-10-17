import Web3 from 'web3';

// Overwrites the web3 instance that Metamask automatically injects because the Metamask's version is clearly too old (0.20.3 instead of 1.0)
// But we retrieve Metamask's provider to get access to the Rinkeby network
const web3 = new Web3(window.web3.currentProvider);

export default web3;