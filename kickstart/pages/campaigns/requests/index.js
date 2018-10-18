import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import { Button } from 'semantic-ui-react';

class RequestIndex extends Component {

    render() {
        return (
            <Layout>
                <h3> Requests list </h3>
                <Link route={ `/campaigns/${ this.props.campaignAddress }/requests/new` }>
                    <a>
                        <Button primary>Create request</Button>
                    </a>
                </Link>
            </Layout>
        );
    }
}

export default RequestIndex;