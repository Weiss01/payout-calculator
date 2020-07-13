class State {
    #stateName = "";
    #leaderslist = [];
    constructor(stateName){
        this.#stateName = stateName;
    }

    build(jsonstate, stateRelation, promoterRelation) {
        this.#stateName = jsonstate.stateName;
        var list = [];
        jsonstate.leaderslist.forEach((item) => {
            var temp;
            if (item.type === "Leader") {
                temp = new Leader();
                temp.build(item, stateRelation, promoterRelation);
            } else if (item.type === "CasualPromoter") {
                temp = new CasualPromoter();
                temp.build(item, promoterRelation);
            }
            list.push(temp);
        });
        this.#leaderslist = list;
    }

    setStateName(stateName) {
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
        leader.setState(this);
    }

    removeLeader(leader) {
        const index = this.#leaderslist.indexOf(leader);
        if (index > -1) {
            this.#leaderslist.splice(index, 1);
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
                State.getBranchFromParent(promoterList, item);
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

    setSales(sales) {
        this.#sales = sales;
    }

    setChildList(childList) {
        this.#childList = childList;
    }

    setPromoterName(promoterName) {
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
            this.#childList.splice(index, 1);
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

    build(jsonpromoter, promoterRelation) {
        super.setPromoterName(jsonpromoter.promoterName);
        var lst = []
        if (jsonpromoter.childList.length !== 0) {
            jsonpromoter.childList.forEach((item, i) => {
                var temp = new CasualPromoter();
                temp.build(item, promoterRelation);
                lst.push(temp);
            });
        }
        super.setChildList(lst);
        super.setSales(jsonpromoter.sales);
        this.#parent = promoterRelation.relation[jsonpromoter.promoterName];
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
    #state;
    constructor(promoterName) {
        super(promoterName);
    }

    build(jsonpromoter, stateRelation, promoterRelation) {
        super.setPromoterName(jsonpromoter.promoterName);
        var lst = []
        if (jsonpromoter.childList.length !== 0) {
            jsonpromoter.childList.forEach((item, i) => {
                var temp = new CasualPromoter();
                temp.build(item, promoterRelation)
                lst.push(temp);
            });
        }
        super.setChildList(lst);
        super.setSales(jsonpromoter.sales);
        this.#state = stateRelation.relation[jsonpromoter.promoterName];
    }

    setState(state) {
        this.#state = state;
    }
    getState() {
        return this.#state;
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
        this.#totalEarnings = this.#salesEarnings + this.#commision;
    }

    getMonth() {
        return this.#month;
    }

    getPromoter() {
        return this.#promoter;
    }

    getNumberOfSales() {
        return this.#numberOfSales;
    }

    getSalesEarnings() {
        return this.#salesEarnings;
    }

    getCommision() {
        return this.#commision;
    }

    getTotalEarning() {
        return this.#totalEarnings;
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
    #tableData = [];
    constructor(payout) {
        var res = [];
        payout.getState().getLeadersList().forEach((item, i) => {
            res.push(Table.generateTable(res, item, 0, []));
        });
        var maxlength = 1;
        res.forEach((item, i) => {
            if (item !== undefined) {
                if (item.length > maxlength){
                    maxlength = item.length;
                }
                this.#tableData.push(item);
            }
        });
        var numbers = [];
        var reclist = payout.getRecordList();
        this.#tableData.forEach((item, i) => {
            for (var i = 0; i < reclist.length; i++) {
                if (reclist[i].getPromoter().getPromoterName() === item[item.length-1]) {
                    numbers.push([reclist[i].getNumberOfSales(), reclist[i].getSalesEarnings(), reclist[i].getCommision(), reclist[i].getTotalEarning()]);
                    break;
                }
            }
        });
        this.#tableData.forEach((item, i) => {
            while(item.length != maxlength) {
                item.push('');
            }
        });
        for(var i = 0; i < this.#tableData.length; i++) {
            numbers[i].forEach((item) => {
                this.#tableData[i].push(item);
            });
        }
    }

    getTableData() {
        return this.#tableData;
    }

    static generateTable(res, parent, tier, temp) {
        const children = parent.getChildList();
        if (temp.length === 0) {
            res.push([parent.getPromoterName()]);
        } else {
            temp.push(parent.getPromoterName());
            res.push(temp);
        }
        if (children.length === 0){
            return;
        } else {
            tier++;
            children.forEach((item, i) => {
                var temp = [];
                for (var i = 0; i < tier; i++) {
                    temp.push('');
                }
                Table.generateTable(res, item, tier, temp);
            });
        }
    }
}

class Payout {
    #state;
    #month;
    #recordList = [];
    constructor(mode, state, month) {
        this.#state = state;
        this.#month = month;
        if (mode === 'convertion') {
            this.#state = '';
        } else {
            state.getLeadersList().forEach((item, i) => {
                Payout.generateRecords(month, this.#recordList, item);
            })
        }
    }

    build(jsonpayout, stateRelation, promoterRelation) {
        var state = new State();
        state.build(jsonpayout.state, stateRelation, promoterRelation);
        this.#state = state;
        this.#month = jsonpayout.month;
        state.getLeadersList().forEach((item, i) => {
            Payout.generateRecords(jsonpayout.month, this.#recordList, item);
        })
    }

    getState() {
        return this.#state;
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
                Payout.generateRecords(month, recordList, item);
            });
        }
    }
}
