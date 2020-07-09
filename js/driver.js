/*
1. Create State.
2a. Create Leaders.
2b. Add Leaders to State.
3a. Create Casual Promoters.
3b. Add Casual Promoters under Leaders.
4. Add Casual Promoters under other Casual Promoters.
5. Set Number of Sales of all Promoters for <February>.
6. Create Table.
*/
var listOfStates = [];
var listOfTables = [];
var listOfPromoters = []; // for easy access to get salesNumber
//////////////////////////////////////

const sp = new State("Sungai Petani");

const l1 = new Leader("Choi Kah Yee");
const l2 = new Leader("Tan Choon How");

sp.addLeader(l1);
sp.addLeader(l2);

const cp1 = new CasualPromoter("Ng Lye Peng");
const cp2 = new CasualPromoter("Ooi Inn Nee");
const cp3 = new CasualPromoter("Koo Ah See");

const cp4 = new CasualPromoter("Teow Chien Sing");
const cp5 = new CasualPromoter("TLC Northern");
const cp6 = new CasualPromoter("Hor Tian Meng");

l1.addChild(cp1);
l1.addChild(cp2);
l1.addChild(cp3);

l2.addChild(cp4);
l2.addChild(cp5);
l2.addChild(cp6);

const cp11 = new CasualPromoter("Chew Lean Chee");
const cp12 = new CasualPromoter("Chau Keng Hong");
const cp13 = new CasualPromoter("Boi Yeow Har");

const cp21 = new CasualPromoter("Lee Tha Watchae");
const cp22 = new CasualPromoter("Mohamad Johan");
const cp23 = new CasualPromoter("Mohamad Akmal");

const cp51 = new CasualPromoter("Khoo Kean Chern");
const cp52 = new CasualPromoter("Yap Chin Hong");

const cp61 = new CasualPromoter("Lai Chiew Leng");
const cp62 = new CasualPromoter("Ooi Kai Lian");

cp1.addChild(cp11);
cp1.addChild(cp12);
cp1.addChild(cp13);

cp2.addChild(cp21);
cp2.addChild(cp22);
cp2.addChild(cp23);

cp5.addChild(cp51);
cp5.addChild(cp52);

cp6.addChild(cp61);
cp6.addChild(cp62);

l1.setNumberOfSales("February", 1);
cp1.setNumberOfSales("February", 0);
cp11.setNumberOfSales("February", 0);
cp12.setNumberOfSales("February", 0);
cp13.setNumberOfSales("February", 3);
cp2.setNumberOfSales("February", 69);
cp21.setNumberOfSales("February", 0);
cp22.setNumberOfSales("February", 12);
cp23.setNumberOfSales("February", 40);
cp3.setNumberOfSales("February", 0);
l2.setNumberOfSales("February", 4);
cp4.setNumberOfSales("February", 0);
cp5.setNumberOfSales("February", 81);
cp51.setNumberOfSales("February", 0);
cp52.setNumberOfSales("February", 0);
cp6.setNumberOfSales("February", 8);
cp61.setNumberOfSales("February", 1);
cp62.setNumberOfSales("February", 0);

const table1 = new Table(sp, "February");
