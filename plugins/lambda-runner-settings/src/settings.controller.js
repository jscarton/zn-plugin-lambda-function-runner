plugin.controller('wgnSettingsCtrl', ['$scope', 'wgnConfigSettings', 'wgnWebhook', 'znPluginData', '$routeParams','$location', ($scope, Config, webhook,znPluginData,$routeParams,$location) => {
        $scope.config = new Config('AWS Lambda Runner Settings')
            .multi(true)
            .toggle(true)
            .help('Here you can configure some settings for this plugin.')
            .icon('amazon')
            .page('Button Settings')
            .field({
                id: 'btnLabel',
                name: 'Label for the button',
                help: 'text for the button.',
                type: 'text'
            })
            .field({
                id: 'btnIcon',
                name: 'Icon for the button',
                help: 'Icon classes for the button.',
                type: 'text'
            })
            .field({
                id: 'lambdaFunctionName',
                name: 'Lambda Function Name',
                help: 'Lambda Function to execute.',
                type: 'text'
            })
            .page('Target Form')
            .field({
                id: 'targetFormId',
                name: 'Target Form',
                help: 'The form which contains the data to check.',
                type: 'form'
            })
            .field({
                id: 'btnType',
                name: 'Select the button location',
                type: 'dropdown',
                options: [
                    {
                        value: 'record',
                        label: 'Record'
                    },
                    {
                        value: 'form',
                        label: 'Form'
                    },
                ]
            });
}]);
