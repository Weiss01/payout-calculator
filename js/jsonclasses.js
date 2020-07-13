class JsonState {
    stateName;
    leaderslist = [];

    constructor(state) {
        this.stateName = state.getStateName();
        state.getLeadersList().forEach((item) => {
            var temp = new JsonPromoter(item)
            this.leaderslist.push(temp);
        });
    }
}

class JsonStateRelation {
    relation = {};

    expand(state) {
        var jsonstate = new JsonState(state);
        state.getLeadersList().forEach((item, i) => {
            this.relation[item.getPromoterName()] = jsonstate;
        });
    }
}

class JsonPromoter {
    type;
    promoterName;
    childList = [];
    sales;

    constructor(promoter) {
        this.type = promoter.constructor.name;
        this.promoterName = promoter.getPromoterName();
        promoter.getChildList().forEach((item) => {
            var temp = new JsonPromoter(item)
            this.childList.push(temp);
        });
        this.sales = promoter.getSales()
    }
}

class JsonPromoterRelation {
    relation = {};

    expand(promoter) {
        var parent = new JsonPromoter(promoter);
        if (promoter.getChildList().length !== 0) {
            promoter.getChildList().forEach((item) => {
                if (!(item.getPromoterName() in this.relation)) {
                    var child = new JsonPromoter(item);
                    this.relation[child.promoterName] = parent;
                }
            });
        }
    }
}

class JsonPayout {
    state;
    month;

    constructor(payout) {
        this.state = new JsonState(payout.getState());
        this.month = payout.getMonth();
    }
}
