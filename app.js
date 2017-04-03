const update = require('util/js/update');
App({
    onLaunch: function (e) {
        update.checkUpdate();
    }
})