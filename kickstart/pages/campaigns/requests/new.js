import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';

class CreateRequest extends Component {

    state = {
        description: '',
        amount: '',
        recipient: '',
        loading: false,
        errorMessage: ''
    };

    onSubmit = async () => {
        const campaign = Campaign(this.props.campaignAddress);

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();

            await campaign.methods
                .createRequest(
                    this.state.description,
                    web3.utils.toWei(this.state.amount, 'ether'),
                    this.state.recipient
                ).send({
                    from: accounts[0]
                })
        } catch (err) {
            this.setState({errorMessage: err.message });
        }

        this.setState({ loading: false, amount: '' });
    };

    render() {
        return (
            <Layout>
                <h3>Create a Request</h3>
                <Form onSubmit={ this.onSubmit } error={ !!this.setState.errorMessage }>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={ this.state.description }
                            onChange={ event => this.state.setState({ description : event.target.value })}
                            />
                    </Form.Field>
                    <Form.Field>
                        <label>Amount in ether</label>
                        <Input
                            label="ether"
                            labelPosition="right"
                            value={this.state.amount }
                            onChange={ event => this.state.setState({ amount : event.target.value })}
                            />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient }
                            onChange={ event => this.state.setState({ recipient : event.target.value })}
                        />
                    </Form.Field>
                    <Message 
                        error 
                        header="Oops!"
                        content={ this.state.errorMessage }
                    />
                    <Button type="Submit" loading={ this.state.loading }>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default CreateRequest;