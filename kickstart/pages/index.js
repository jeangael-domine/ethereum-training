import react, { Component } from 'react';
import factory from '../ethereum/factory';

class CampaignIndex extends Component {

    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
    
        // return { campaigns: campaigns}
        return { campaigns };
    }

    render() {
        return <div>Campaigns Index { this.props.campaigns[0] }</div>
    }
}

export default CampaignIndex;