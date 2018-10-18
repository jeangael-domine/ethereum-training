import React, { Component } from 'react';
import { Form, Input, Button, Message } from "semantic-ui-react";
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class ContributeForm extends Component {

    state = {
        amount: '',
        loading: false
    }

    onSubmit= async (event) => {
        // Prevent the submission by the browser
        event.preventDefault();

        this.setState({ loading: true });
        
        const campaign = Campaign(this.props.campaignAddress);
        
        try {
            const accounts = await web3.eth.getAccounts();

            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.amount, 'ether')
            });
        } catch(err) {

        }

        this.setState({ loading: false });
    }

    render() {
        return (
            <Form onSubmit={ this.onSubmit }>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        label="ether"
                        labelPosition="right"
                        value={ this.state.amount }
                        onChange={ event => this.setState({ amount: event.target.value })}
                    />
                </Form.Field>
                <Button type='Submit' primary loading={ this.state.loading }>
                    Contribute!
                </Button>
            </Form>
        )
    }
}

export default ContributeForm;
