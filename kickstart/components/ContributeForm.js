import React, { Component } from 'react';
import { Form, Input, Button, Message } from "semantic-ui-react";
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {

    state = {
        amount: '',
        loading: false,
        errorMessage: ''
    }

    onSubmit= async (event) => {
        // Prevent the submission by the browser
        event.preventDefault();

        this.setState({ errorMessage: '' });
        this.setState({ loading: true });
        
        const campaign = Campaign(this.props.campaignAddress);
        
        try {
            const accounts = await web3.eth.getAccounts();

            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.amount, 'ether')
            });

            Router.replaceRoute(`/campaigns/${this.props.campaignAddress}`);
        } catch(err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false, amount: '' });
    }

    render() {
        return (
            <Form onSubmit={ this.onSubmit } error={ !!this.state.errorMessage }>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        label="ether"
                        labelPosition="right"
                        value={ this.state.amount }
                        onChange={ event => this.setState({ amount: event.target.value })}
                    />
                </Form.Field>
                <Message 
                    error
                    header='Oops!'
                    content={ this.state.errorMessage }
                />
                <Button type='Submit' primary loading={ this.state.loading }>
                    Contribute!
                </Button>
            </Form>
        )
    }
}

export default ContributeForm;
