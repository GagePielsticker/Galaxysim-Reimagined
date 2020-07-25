const EventEmitter = require("eventemitter3");

class FindUser extends EventEmitter {
    /**
     * new EvalHandler
     * @param {Object} cluster Cluster object
     * @param {Object} ipc IPC object
     * @param {Number} clusterID ID of cluster making the request
     * @param {String} responseID String of the response ID
     * @param {String} userID ID of user to find
     */
    constructor(cluster, ipc, clusterID, responseID, userID) {
        super();
        this.self = cluster
        this.ipc = ipc;
        this.clusterID = clusterID;
        this.responseID = responseID;
        this.userID = userID;

        this._process();
    }

    /**
     * Return data to sender
     * @param {Object} response Response to return back to the sender
     */
    return(response) {
        return new Promise(async (resolve, reject) => {
            this.ipc.sendTo(this.clusterID, this.responseID, response)
            resolve()
        })
        
    }

    _process() {
        let user = this.self.bot.users.find(u => u.id == this.userID)

        if (!user) {
            this.return({ isError: false, data: null}).then(() => {
                this.emit('returned');
            })
            return;
        }

        const userObj = {
            username: user.username,
            discriminator: user.discriminator,
            id: user.id,
            bot: user.bot,
            system: user.system,
            avatarURL: user.avatarURL,
            publicFlags: user.publicFlags
        }

        this.return({ isError: false, data: userObj}).then(() => {
            this.emit('returned');
        })
    }

}

module.exports = FindUser