import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { CardGroup, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const campaignDetails = await campaign.methods.getSummary().call();

        /* Even though we access the content of the details by using [], it is not an array but an object resembling this:
            {
                0: "100",
                1: "0",
                2: "0",
                3: "0",
                4: "0x49A4c345516178e7C90FaD1B7F1ecd812F5227d0"
            }
        */
        return { 
            campaignAddress: props.query.address,
            minimumContribution: campaignDetails[0],
            balance: campaignDetails[1],
            requestsCounts: campaignDetails[2],
            approversCount: campaignDetails[3],
            manager: campaignDetails[4],
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCounts,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests to withdraw money',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver'
            },
            {
                header:requestsCounts,
                meta: 'Number of requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers'
            },
            {
                header: approversCount,
                meta: 'Number of approvers',
                description: 'Number of people who have already donated to this campaign'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign balance (ether)',
                description: 'The balance is how much money this campaign has left to spend'
            }
        ];
        return <CardGroup items={ items } />
    }

    render() {
        return (
            <Layout>
                <h3>Campaign details</h3>
                <Grid>
                    <Grid.Column width={10}>
                        { this.renderCards() }
                        <Link route={ `/campaigns/${this.props.campaignAddress }/requests` }>
                            <a>
                                <Button primary>View requests</Button>
                            </a>
                        </Link>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm campaignAddress={ this.props.campaignAddress } />
                    </Grid.Column>
                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow;