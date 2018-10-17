import web3 from './web3';
import compiledFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(compiledFactory.interface),
    '0x6AF2e1659EaEA21F818dF2B8F4ec31F6E2024950'
);

export default instance;