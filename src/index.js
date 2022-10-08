import { ready } from './utils';

const initialize = (settings, options) => {
    console.log('fedx-cli-sdk-template::initialize');

    return {};
};

const initSDK = () => {
    window.bmt = {
        initialize: initialize,
    };
};

ready(function () {
    initSDK();
});
