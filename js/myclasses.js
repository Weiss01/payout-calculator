class State {
    #stateName = "";
    #leaderslist = [];
    constructor(stateName){
        this.#stateName = stateName;
    }

    getStateName() {
        return this.#stateName;
    }

    getLeaderslist() {
        return this.#leaderslist;
    }

    addLeader(leader) {
        this.#leaderslist.push(leader);
    }

    removeLeader(leader) {
        const index = this.#leaderslist.indexOf(leader);
        if (index > -1) {
            array.splice(index, 1);
            console.log(leader + " removed from " + this.#stateName);
        } else {
            console.log(leader + " not found in " + this.#stateName);
        }
    }
}

class Promoter {
    #promoterName = "";
    #childList = [];
    #sales = {};
    constructor() {
        if (new.target === Abstract) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    getPromoterName() {
        return this.#promoterName;
    }

    getChildList() {
        return this.#childList;
    }

    getParent() {
        return this.#parent;
    }

    getSales() {
        return this.#sales;
    }

    setNumberOfSales(month, numberOfSales) {
        this.#sales[month] = numberOfSales;
    }

    addChild(child) {
        this.#childList.push(child);
    }

    removeChild(child) {
        const index = this.#childList.indexOf(child);
        if (index > -1) {
            array.splice(index, 1);
            console.log(this.#promoterName + " removed " + child);
        } else {
            console.log(child + " is not under " + this.#promoterName);
        }
    }
}

class CasualPromoter extends Promoter{
    #parent = 0;
    constructor(promoterName, parent) {
        this.#promoterName = promoterName;
        this.#parent = parent;
    }
    getParent() {
        return this.#parent;
    }
    removeParent(parent) {
        this.#parent = 0;
    }
}

class Leader extends Promoter {
    constructor(promoterName) {
        this.#promoterName = promoterName;
    }
}

class Record {
    #month;
    #promoter;
    #numberOfSales;
    #salesEarnings;
    #commision;
    #totalEarnings;
    constructor(month, promoter) {
        this.#month = month;
        this.#promoter = promoter;
        this.#numberOfSales = promoter.getSales()[month];
        this.#salesEarnings = calculateSalesEarnings(this.#numberOfSales);
        this.#commision = calculateCommision(month, promoter);
    }

    static calculateSalesEarnings(numberOfSales) {
        return numberOfSales * 4;
    }

    static calculateCommision(month, promoter){
        const children = promoter.getChildList();
        var sum = 0;
        children.forEach((item, i) => {
            sum = sum + calculateSalesEarnings(item.getSales()[month]);
        });
        return sum * 0.05;
    }
}

class Table {
    #state;
    #month;
    #recordList = [];
    constructor(state, month) {
        this.#state = state;
        this.#month = month;
        state.getLeaderslist().forEach((item, i) => {
            generateRecords(month, this.#recordList, item);
        })
    }

    getStateName() {
        return this.#state.getStateName();
    }

    getMonth() {
        return this.#month;
    }

    getRecordList() {
        return this.#recordList;
    }

    static generateRecords(month, recordList, parent) {
        const children = parent.getChildList();
        if (children.length === 0){
            return;
        } else {
            children.forEach((item, i) => {
                const temp = new Record(month, item);
                recordList.push(temp);
                generateRecords(month, recordList, item);
            });
        }
    }
}
