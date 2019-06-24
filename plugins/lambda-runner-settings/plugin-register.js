plugin.register('wgn', {
    route: '{replace-route}',
    title: 'AWS Lambda Function Runner',
    icon: 'icon-amazon',
    interfaces: [
        {
            controller: 'wgnMainCtrl',
            template: 'wgn-main',
            type: 'inline',
            location: 'zn-plugin-data-subheader',
            order: 300,
            topNav: true,
            routes: [
                '/:page'
            ]
        },
        {
            controller: 'wgnRecordCtrl',
            template: 'wgn-record',
            type: 'inline',
            location: 'zn-plugin-form-top',
            routes: [
                '/:page'
            ]
        },
        {
            controller: 'wgnSettingsCtrl',
            template: 'wgn-settings',
            type: 'settings'
        },
        {
            controller: 'wgnRunnerCtrl',
            template: 'wgn-runner',
            type: 'fullPage',
            topNav: false,
            routes: [
                '/:page'
            ]
        },
    ]
});
