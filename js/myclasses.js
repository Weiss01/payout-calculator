class State {
    #stateName = "";
    #leaderslist = [];
    constructor(stateName){
        this.#stateName = stateName;
    }

    getStateName() {
        return this.#stateName;
    }

    getLeadersList() {
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
    static getListofPromoters(state, leaderList) {
        var res = [];
        Array.from(leaderList).forEach((item, i) => {
            State.getBranchFromParent(res, item);
        })
        return res;
    }

    static getBranchFromParent(promoterList, parent) {
        const children = parent.getChildList();
        if (parent.constructor.name === "Leader"){
            promoterList.push(parent);
        }
        if (children.length === 0){
            return;
        } else {
            children.forEach((item, i) => {
                promoterList.push(item);
                State.getListofPromoters(promoterList, item);
            });
        }
    }
}

class Promoter {
    #promoterName = "";
    #childList = [];
    #sales = {};
    constructor(promoterName) {
        this.#promoterName = promoterName;
    }

    getPromoterName() {
        return this.#promoterName;
    }

    getChildList() {
        return this.#childList;
    }

    getSales() {
        return this.#sales;
    }

    setNumberOfSales(month, numberOfSales) {
        this.#sales[month] = numberOfSales;
    }

    addChild(child) {
        this.#childList.push(child);
        child.addParent(this); // check
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
    constructor(promoterName) {
        super(promoterName);
    }
    getParent() {
        return this.#parent;
    }
    addParent(parent) {
        this.#parent = parent;
    }
    removeParent(parent) {
        this.#parent = 0;
    }
}

class Leader extends Promoter {
    constructor(promoterName) {
        super(promoterName);
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
        this.#salesEarnings = Record.calculateSalesEarnings(this.#numberOfSales);
        this.#commision = Record.calculateCommision(month, promoter);
    }

    static calculateSalesEarnings(numberOfSales) {
        return numberOfSales * 4;
    }

    static calculateCommision(month, promoter){
        const children = promoter.getChildList();
        var sum = 0;
        children.forEach((item, i) => {
            sum = sum + Record.calculateSalesEarnings(item.getSales()[month]);
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
        state.getLeadersList().forEach((item, i) => {
            Table.generateRecords(month, this.#recordList, item);
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
        if (parent.constructor.name === "Leader"){
            const temp1 = new Record(month, parent);
            recordList.push(temp1);
        }
        if (children.length === 0){
            return;
        } else {
            children.forEach((item, i) => {
                const temp2 = new Record(month, item);
                recordList.push(temp2);
                Table.generateRecords(month, recordList, item);
            });
        }
    }
}
