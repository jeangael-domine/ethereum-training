const assert = require('assert');
const ganache = require('ganache-cli');
// Capital letter because we are calling the Constructor
const Web3 = require('web3');
// Low letter because it is an instance
const web3 = new Web3(ganache.provider());

class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}

let car;

beforeEach('Setup', () => {
    car = new Car();
});

describe('Car', () => {
    it('can park', () => {
        assert.equal(car.park(), 'stopped');
    });

    it('can drive', () => {
        assert.equal(car.drive(), 'vroom');
    });
})