plugin.controller('wgnRunnerCtrl', ['$scope', '$routeParams', 'znMessage', 'wgnConfigSrv', 'znPluginData','$location', ($scope, $routeParams, znMessage, wgnConfigSrv, znPluginData,$location) => {
    const workspaceId = $routeParams.workspace_id;
    var $authValues = $location.hash().split("&");
    $scope.processing = true;
    $scope.runningAWSFunction = false;
    $scope.success = false;
    $scope.error = false;    
    var record = false;
    var state = false;
    var token = false;
    if ($authValues.length > 1) {
        for (var i = 0; i < $authValues.length; i++) {
            var parts = $authValues[i].split("=");
            if (parts[0] === "state") {
                if (parts[1].split("+").length < 2) {
                    state = parts[1];
                } else {
                    let stparts = parts[1].split("+");
                    state = stparts[0];
                    record = stparts[1];
                }
            }

            if (parts[0] === "access_token") {
                token = parts[1];
            }
        }

        if (token && state) {
        $scope.runningAWSFunction = true;
        znPluginData('wgn').post("/runner?config="+state,{workspaceId:$routeParams.workspace_id},{token, record})
        .then((results)=>{
            console.log(results);
            $scope.runningAWSFunction = false;
            $scope.success = true;
            $scope.processing = false;
            znMessage('Evaluated '+results.payload.Data.evaluated+' records', 'saved', 5000);
            var url ="https://platform.zenginehq.com/workspaces/"+workspaceId+"/data/"+results.targetFormId; 
            if (results.targetRecordId) {
                url+="?record="+results.targetFormId+"."+results.targetRecordId
            }
            location.href = url;
        })
        .catch(err => {
            $scope.error = true;
            $scope.runningAWSFunction = false;
            $scope.processing = false;
            console.log(err);
            znMessage('An Error Occurred, please try again.', 'error', 5000);
        });
        } else {
            $scope.error = false;
            $scope.runningAWSFunction = false;
            $scope.processing = false;
            console.error("Bad Auth!!!!");
            znMessage('An Error Occurred, please try again.', 'error', 5000);
        }
    } else {
        $scope.error = false;
            $scope.runningAWSFunction = false;
            $scope.processing = false;
            console.error("Bad Auth!!!!");
            znMessage('An Error Occurred, please try again.', 'error', 5000);
    }
}]);
