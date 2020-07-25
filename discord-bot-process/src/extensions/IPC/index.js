const Sender = require('./Sender')

const fs = require('fs');
const path = require('path');

//HANDLERS

const handlers = {}


fs.readdirSync(path.join(__dirname, `/handlers/`), { withFileTypes: true })
    .filter((file) => file.isFile())
    .forEach(async (file) => {
        handlers[file.name.replace('.js', '').toLowerCase()] = require(`./handlers/${file.name}`)
    })


class IPCManager {
    /**
     * new IPCManager
     * @param {Object} cluster Cluster object
     * @param {Number} clusterCount Total numbers of clusters expected
     */
    constructor(cluster, clusterCount) {
        this.self = cluster;
        this.bot = cluster.bot;
        this.clusterCount = clusterCount

        this.self.ipc.register('advancedIPCListen', data => {
            this._handleNewRequest(data)
        })

    }

    /**
     * Make a unique ID
     */
    get makeID() {
        let result = '', characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 30; i++) {
            result += characters.charAt(Math.floor(Math.random() * 62));
        }
        return result;
    }

    /**
     * Handler for dealing with a new request
     * @param {Object} dataRes Data sent by the sended
     */
    _handleNewRequest(dataRes) {
        let data = dataRes.msg

        let response = new handlers[data.globalType.toLowerCase()](this.self, this.self.ipc, data.clusterID, data.responseID, data.data)

        response.once('returned', () => {
            response = null;
        })

        response.once('failed', error => {
            console.error(error)
            response = null;
        })
    }

    /**
     * Check if all clusters are ready
     */
    async _checkClusters() {
        let stats = await this.self.ipc.getStats();

        if (stats.clusters.length < this.clusterCount) return false

        this.clustersCount = stats.clusters.length;
        
        return true
    }

    _sender(handlerName, data, resolve, reject, bypassCheck = false) {

        let returnID = this.makeID

        if (bypassCheck == true) {
            this._checkClusters();
        }

        let send = new Sender(this.self, returnID, handlerName, data, this.clustersCount)

            send.once('success', data => {
                resolve(data)
                send = null;
            })

            send.once('fail', data => {
                reject(data)

                send = null;
            })
    }

    /**
     * Run an eval on all clusters
     * @param {String} evalString String to eval - bot can used to access the bot object
     * @returns {Promise} Returns result on a error
     */
    globalEval(evalString) {
        return new Promise(async (resolve, reject) => {

            if (!this._checkClusters()) return reject('Not all clusters are ready');

            this._sender('eval', evalString, resolve, reject)
            
        })
        
    }

    /**
     * Custom cross cluster comms
     * @param {String} nameOfHandler Name of the handler
     * @param {String|Object} data Data to be sent to the handlers
     * @param {Boolean} bypassCheck If to run if not all clusters are ready
     */
    custom(nameOfHandler, data, bypassCheck = false) {
        return new Promise(async (resolve, reject) => {

            if (!this._checkClusters() && !bypassCheck) return reject('Not all clusters are ready');
            
            this._sender(nameOfHandler.toLowerCase(), data, resolve, reject)
        })
    }
    
}

module.exports = IPCManager;