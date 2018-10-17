import Web3 from 'web3';

let web3;

// Are we running in the browser? If yes, then window won't be undefined
// Has the user installed Metamask? If yes, the window.web3 won't be undefined
if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // Overwrites the web3 instance that Metamask automatically injects because the Metamask's version is clearly too old (0.20.3 instead of 1.0)
    // But we retrieve Metamask's provider to get access to the Rinkeby network
    web3 = new Web3(window.web3.currentProvider);
} else {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/7697444efe2e4751bc2f20f7f4549c36'
    );

    web3 = new Web3(provider);
}

export default web3;