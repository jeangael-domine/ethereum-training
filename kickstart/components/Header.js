import React from 'react';
import { Menu, MenuItem } from 'semantic-ui-react';

export default () => {
    return (
        // First bracket is for indicating that we are going to write some JS expression
        // The second one is the actual object literal that we are creating
        <Menu style={{ marginTop: '10px' }}>
            <MenuItem>
                CrowdCoin
            </MenuItem>

            <Menu.Menu position="right">
                <MenuItem>
                    Campaigns
                </MenuItem>
                <MenuItem>
                    +
                </MenuItem>
            </Menu.Menu>
        </Menu>
    );
};