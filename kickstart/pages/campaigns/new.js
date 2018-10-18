import react, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes'

class CampaignNew extends Component {

    state = {
        minimumContributions: '',
        errorMessage: '',
        loading: false
    };

    // We use this syntax to ensure the this object is set up correctly
    onSubmit = async (event) => {
        // Prevent the submission by the browser
        event.preventDefault();

        this.setState({ errorMessage: '' });
        this.setState({ loading: true });
        
        try {
            const accounts = await web3.eth.getAccounts();
            
            await factory.methods.createCampaign(this.state.minimumContributions)
            .send({
                from: accounts[0]
            });
            
            // Redirects the user to the index.js page
            Router.pushRoute('/');
        } catch(err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });

    };

    render () {
        return (
            <Layout>
                <h3>Create a campaign</h3>
                 {/* The first ! flips the value to the opposite value as its boolean form and then the second one will flip it back
                    It's just a way of converting a string to boolean
                 */}
                <Form onSubmit={ this.onSubmit } error={ !!this.state.errorMessage }>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            label='wei'
                            labelPosition='right'
                            value={ this.state.minimumContributions }
                            onChange={ event => this.setState({ minimumContributions: event.target.value })}
                        />
                        <Message 
                            error
                            header='Oops!'
                            content={ this.state.errorMessage }
                        />

                    </Form.Field>

                    <Button type='Submit' primary loading={ this.state.loading }>Create!</Button>
                </Form>
            </Layout>
        );
    }
}

// !"truthy value" => false
// !!"truthy value" => true
// !!"" => false

export default CampaignNew;