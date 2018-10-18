import web3 from './web3';
import compiledCampaign from './build/Campaign.json';

export default (address) => {
    // The second argument is the address of the deployed Campaign contract
    return new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        address
    );
};