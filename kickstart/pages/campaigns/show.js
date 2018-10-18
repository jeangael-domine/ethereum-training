import React, { Component } from 'react';
import Layout from '../../components/Layout';
import web3 from '../../ethereum/web3';
import compiledCampaign from '../../ethereum/build/Campaign.json';

class CampaignShow extends Component {

    static async getInitialProps(props) {
        const campaign = new web3.eth.Contract(
            JSON.parse(compiledCampaign.interface),
            props.query.address
        );

        const campaignDetails = await campaign.methods.getSummary().call();

        return { campaignDetails };
    }

    render() {
        return (
            <Layout>
                <h3>Campaign details {this.props.minimumContribution}</h3>
            </Layout>
        )
    }
}

export default CampaignShow;