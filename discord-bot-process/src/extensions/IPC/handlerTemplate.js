const EventEmitter = require("eventemitter3");

class HANDLERNAME extends EventEmitter {
    /**
     * new EvalHandler
     * @param {Object} cluster Cluster object
     * @param {Object} ipc IPC object
     * @param {Number} clusterID ID of cluster making the request
     * @param {String} responseID String of the response ID
     * @param {String} data Any data needed to process the request
     */
    constructor(cluster, ipc, clusterID, responseID, data) {
        super();
        this.self = cluster
        this.ipc = ipc;
        this.clusterID = clusterID;
        this.responseID = responseID;
        this.data = data;

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
        // PROCESS THING


        this.return(data) // return data to the requesting cluster    
        this.emit('returned'); // emit success

        this.emit('failed', error) // emit fail with the error
    }

}

module.exports = HANDLERNAME