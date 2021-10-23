var config = new Config();

function Config() {
    this._allowedScreen = [ 0 ];
    this._csdClients = [ ];
    this._evalClients = [ ];
    this._excludedClients = [ "google-chrome" ];
}

workspace.clientRemoved.connect(function(client) {
    config.unregister(client);
    config.rem(client);
});

workspace.clientMaximizeSet.connect(function(client, horizontalMaximized, verticalMaximized) {
    if (horizontalMaximized && verticalMaximized) {
        if (!config.isEval(client) && !config.isCSD(client) && !config.isExcluded(client)) {
            if (config.screenAllowed(client))
                client.noBorder = true;
        }
    } else {
        if (!config.isEval(client) && !config.isCSD(client) && !config.isExcluded(client))
            client.noBorder = false;
    }
});

workspace.clientAdded.connect(function(client) {
    var area = workspace.clientArea(KWin.MaximizeArea, client);
    if (client.width >= area.width && client.height >= area.height) 
        config.add(client);            
    else {
        if (config.isCSD(client))
            config.register(client);
    }
});

Config.prototype.screenAllowed = function(client) {
   return (this._allowedScreen.indexOf(client.screen) >= 0);
};

Config.prototype.register = function(client) {
    if (this._csdClients.indexOf(client.windowId.toString()) < 0)
        this._csdClients.push(client.windowId.toString());
};
Config.prototype.unregister = function(client) {
    var winIdIndex = this._csdClients.indexOf(client.windowId.toString());
    if (winIdIndex >= 0)
        this._csdClients.splice(winIdIndex, 1);
};

Config.prototype.add = function(client) {
    if (this._csdClients.indexOf(client.windowId.toString()) < 0)
        if (!config.isEval(client))
            this._evalClients.push(client.windowId.toString());
};
Config.prototype.rem = function(client) {
    var winIdIndex = this._evalClients.indexOf(client.windowId.toString());
    if (winIdIndex >= 0)
        this._evalClients.splice(winIdIndex, 1);
};

Config.prototype.isEval = function(client) {
    return (this._evalClients.indexOf(client.windowId.toString()) >= 0);
};

Config.prototype.isExcluded = function(client) {
    return (this._excludedClients.indexOf(client.resourceClass.toString()) >= 0);
};

Config.prototype.isCSD = function(client) {
    if (this._csdClients.indexOf(client.windowId.toString()) >= 0) return true;
    var fSize = client.frameGeometry;
    var bSize = client.bufferGeometry;
    if (bSize.width == fSize.width && bSize.height == fSize.height) return false;
    return true;
};

