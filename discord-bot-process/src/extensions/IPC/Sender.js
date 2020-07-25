const EventEmitter = require("eventemitter3");

class Sender extends EventEmitter {
    /**
     * 
     * @param {Object} cluster Cluster Object
     * @param {Number} returnID Cluster ID to have res
     * @param {String} globalType Type of request being made (eval)
     * @param {String} broadcastString String of the data
     * @param {Number} expectedReturns Number or expected returns
     */
    constructor(cluster, returnID, globalType, broadcastString, expectedReturns) {
        super();
        this.self = cluster;
        this.clusterID = this.self.clusterID;
        this.returnID = returnID;
        this.globalType = globalType;
        this.broadcastString = broadcastString;
        this.expectedReturns = expectedReturns;

        this.responses = [];

        this._setup();
        
    }

    /**
     * Setup for listening for responses and sending the request
     */
    _setup() {
        this.self.ipc.register(this.returnID, data => {
            this._handleResponse(data)
        });

        let data = {}

            data.globalType = this.globalType;
            data.clusterID = this.clusterID;
            data.responseID = this.returnID;
            data.data = this.broadcastString

        this.self.ipc.broadcast('advancedIPCListen', data);


        this.timeout = setTimeout(() => {
            if (this.responses.length < this.expectedReturns) {
                return this.emit('failed', 'Timeout waiting for all responses.');
            }
        }, 30000);
    }

    /**
     * Unregister from listening
     */
    _unregister() {
        this.self.ipc.unregister(this.returnID);
    }

    /**
     * Handle the responses from request
     * @param {Object} dataRes Data Returned by each cluster
     */
    _handleResponse(dataRes) {
        let data = dataRes.msg;
        if (data.isError) {
            this._unregister();
            clearTimeout(this.timeout)
            return this.emit('failed', data.data);
        }

        this.responses.push(data.data);

        if (this.responses.length >= this.expectedReturns) {
            this._unregister();
            clearTimeout(this.timeout)
            return this.emit('success', this.responses);
        }
        
    }
}

module.exports = Sender