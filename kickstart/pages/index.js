import react, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {

    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
    
        // return { campaigns: campaigns}
        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>,
                        {/* // Take the entire width of the container */}
                    </Link>
                ),
                fluid: true
            };
        })

        return <Card.Group items={ items } />
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Opened campaigns</h3>

                    {/* The <a> is way of having the hover effect */}
                    <Link route="/campaigns/new">
                        <a>
                            <Button
                                floated="right"
                                content='Create Campaign'
                                icon='add circle'
                                primary
                                />
                        </a>
                    </Link>
                    { this.renderCampaigns() }
                </div>
            </Layout>
        )
    }
}

export default CampaignIndex;