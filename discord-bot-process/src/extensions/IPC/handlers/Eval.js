const EventEmitter = require("eventemitter3");

class EvalHandler extends EventEmitter {
    /**
     * new EvalHandler
     * @param {Object} cluster Cluster object
     * @param {Object} ipc IPC object
     * @param {Number} clusterID ID of cluster making the request
     * @param {String} responseID String of the response ID
     * @param {String} evalString String to eval
     */
    constructor(cluster, ipc, clusterID, responseID, evalString) {
        super();
        this.self = cluster
        this.ipc = ipc;
        this.clusterID = clusterID;
        this.responseID = responseID;
        this.evalString = evalString;

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

    /**
     * Process the requst
     */
    _process() {
        this._eval(this.evalString).then(res => {
                this.return({ isError: false, data: res}).then(() => {
                    this.emit('returned');
                })
            }).catch(e => {
                this.return({isError: true, data: e}).then(() => {
                    this.emit('failed', e)
                })
            })
    }

    /**
     * Do the eval
     * @param {String} str string of the eval
     */
    _eval(str) {
        return new Promise(async (resolve, reject) => {
            let bot = this.self.bot;
            try {
                let res = await eval(str)
                resolve(res)
            } catch (e) {
                reject(e)
            }
        })


    }
}

module.exports = EvalHandler