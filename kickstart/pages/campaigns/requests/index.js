import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import { Table, Button } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.campaignAddress);
        
        const requestsCount = await campaign.methods.getRequestsCount().call();
        
        const requests = await Promise.all(
            Array(parseInt(requestsCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call()
            })
        );

        const approversCount = await campaign.methods.approversCount().call();

        // FYI destructuring syntax
        // const { address } = props.query;
        // return { address };
        /*        string description;
        uint value;
        address recipient;
        bool complete;
        mapping(address => bool) approvals;
        uint approvalCount; */
        return { campaignAddress: props.query.campaignAddress, requests, requestsCount, approversCount }
    }

    renderPendingRequests() {
        return this.props.requests.map( (request, index) => {
            return <RequestRow
                key={ index }
                id={ index }
                request={ request }
                campaignAddress={ this.props.campaignAddress }
                approversCount = { this.props.approversCount }
            />
        });
    }
            
    render() {
        const { Header, Row, HeaderCell, Body } = Table;
    
        return (
            <Layout>
                <h3> Pending requests</h3>
                <Link route={ `/campaigns/${ this.props.campaignAddress }/requests/new` }>
                    <a>
                        <Button primary floated="right" style={{ marginBottom: 10 }}>Create request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        { this.renderPendingRequests() }
                    </Body>
                </Table>
                <div>Found { this.props. requestsCount } </div>
            </Layout>
        );
    }
}

export default RequestIndex;