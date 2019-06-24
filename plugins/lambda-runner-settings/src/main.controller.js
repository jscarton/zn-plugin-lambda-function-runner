plugin.controller('wgnMainCtrl', ['$scope', '$routeParams', 'znMessage', 'wgnConfigSrv',
    ($scope, $routeParams, znMessage, configService) => {
        $scope.loading = true;
        $scope.loadIt = false;

        // Keep this out of the $scope to avoid polluting it.
        const workspaceId = $routeParams.workspace_id;
        const formId = parseInt($routeParams.form_id);

        // Init plugin.
        init().then(() => $scope.loading = false);

        /**
         * Boostraps the plugin.
         *
         * @private
         */
        function init() {
            // Load settings if nusing multi config.
            return configService.load(workspaceId).then(configs => {
                // Find any applicable config.
                for (cfgId in configs.settings) {
                    if (configs.settings[cfgId].targetFormId === formId && configs.settings[cfgId].btnType === "form"){
                        $scope.configId = cfgId;
                        $scope.settings = configs.settings[cfgId];
                        $scope.loadIt = true;
                        $scope.btnIcon = $scope.settings.btnIcon;
                        $scope.btnLabel = $scope.settings.btnLabel;
                    }
                }
                
            }).catch(err => {
                znMessage(err, 'error');
            });
        }

        $scope.runIt = function () {
            var url ="https://auth.zenginehq.com/oauth2/v1/authorize?client_id=d5d7ecd483eaf947349c7b34a139e3a087ca&response_type=token&redirect_uri=https://platform.zenginehq.com/workspaces/"+workspaceId+"/plugin/jsawslambdarunner&state="+$scope.configId; 
            location.href = url;
        };
    }]);
