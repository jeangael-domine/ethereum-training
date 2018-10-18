import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';
import { Router, Link } from '../../../routes';

class CreateRequest extends Component {

    state = {
        description: '',
        amount: '',
        recipient: '',
        loading: false,
        errorMessage: ''
    };

    static getInitialProps(props) {
        return { campaignAddress: props.query.campaignAddress }
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const campaign = Campaign(this.props.campaignAddress);
        const {description, amount, recipient} = this.state;

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();

            await campaign.methods.createRequest(
                        description,
                        web3.utils.toWei(amount, 'ether'),
                        recipient
                    )
                .send({
                    from: accounts[0]
                });

                Router.pushRoute(`/campaigns/${ this.props.campaignAddress }/requests`);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    };

    render() {
        return (
            <Layout>
                <Link route={ `/campaigns/${ this.props.campaignAddress }/requests` }>
                    <a>Back</a>
                </Link>
                <h3>Create a Request</h3>
                <Form onSubmit={ this.onSubmit } error={ !!this.state.errorMessage }>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={ this.state.description }
                            onChange={ event => this.setState({ description : event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Amount in ether</label>
                        <Input
                            label="ether"
                            labelPosition="right"
                            value={this.state.amount }
                            onChange={ event => this.setState({ amount : event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient }
                            onChange={ event => this.setState({ recipient : event.target.value })}
                        />
                    </Form.Field>
                    <Message 
                        error 
                        header="Oops!"
                        content={ this.state.errorMessage }
                    />
                    <Button primary loading={ this.state.loading }>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default CreateRequest;