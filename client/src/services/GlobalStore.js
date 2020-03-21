class GlobalStore {

    static instance;

    static subscribers;
    static lastValues;

    constructor() {
        this.subscribers = {}
        this.lastValues = {}
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new GlobalStore();
        }
        return this.instance;
    }

    static subscribe(eventName, callback, getLastValue = false) {
        let ins = GlobalStore.getInstance();

        if (ins.subscribers[eventName] == null) {
            ins.subscribers[eventName] = []
        }
        let subs = new GlobalStateSubscription(eventName, callback)
        ins.subscribers[eventName].push(subs)

        if (getLastValue && ins.lastValues.hasOwnProperty(eventName)) {
            subs.callback(ins.lastValues[eventName])
        }
        return subs;
    }

    static lookAt(eventName){
        let ins = GlobalStore.getInstance();
        return ins.lastValues[eventName];
    }

    static publish(eventName, value) {
        let ins = GlobalStore.getInstance();

        ins.lastValues[eventName] = value;

        if (ins.subscribers[eventName]) {
            ins.subscribers[eventName].forEach(subs => {
                try {
                    subs.callback(ins.lastValues[eventName])
                } catch (error) {
                    console.error(error)
                }
            });
        }
    }

    static unsubscribe(subs) {
        let ins = GlobalStore.getInstance();
        if (ins.subscribers[subs.eventName]) {
            ins.subscribers = ins.subscribers[subs.eventName].filter(x => x.unique === subs.unique);
        }
    }
}

class GlobalStateSubscription {
    constructor(eventName, callback) {
        this.eventName = eventName;
        this.callback = callback
        this.unique = Math.round(Math.random() * 1000000000)
    }

    unsubscribe() {
        GlobalStore.unsubscribe(this)
    }

}

export { GlobalStore, GlobalStateSubscription };