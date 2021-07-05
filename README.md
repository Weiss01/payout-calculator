# payout-calculator
Fully functional static website to create payouts in tables. Attempted to create a relational database system without a server. This website is hosted on github pages. To make this website functional on github pages which supports only static websites, the data in each session is able to be exported as an encoded JSON file. The file can then be imported in a future session to reinitialise all the variables and their values from the previous session.

hosted at: https://weiss01.github.io/payout-calculator/

# How to use
- Create a state
- Create a leader for said state
- Create Casual Promoters
- Assign Casual Promoters eaither as direct subordinates of leaders or other Casual Promoters
- Create Payout for said state
- Assign number of sales for each promoters in state
- Generate payout
- View formatted table of payout with commisions and stuff for each promoter in said state.
- Export data of current session for future use

# Concept
The concept of this entire website is based on object-oriented programming. 

2 sets of classes were created in javascript. One set that keeps track of the relationship between objects and for the actual calculations of the payout and another set specifically for the conversion into a JSON file. This is because the first set of objects has infinite links (e.g Leader A has Promoter B as child, Promoter B has Leader A as parent, Leader A has Promoter B as child...) that cannot be stringified into a JSON string and the second set of classes is a workaround to that, essentially storing the parent/child relationships in a single seperate object.

Recursion algorithms were used to get the entire tree of leader/promoters for various calculations.

Another algorithm was designed to create a 2D array of the payout table which can be directly processed by the generateTableHTML function in payout.js to directly generate a table in HTML.

Note: One of my first ever freelance projects made for the project SETEL management team :D
