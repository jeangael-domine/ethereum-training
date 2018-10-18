import web3 from './web3';
import compiledFactory from './build/CampaignFactory.json';

// The second argument is the address of the deployed CampaignFactory contract
const instance = new web3.eth.Contract(
    JSON.parse(compiledFactory.interface),
    '0x241C480432D50FE12104f0F8E2B27F6726765AE4'
);

export default instance;