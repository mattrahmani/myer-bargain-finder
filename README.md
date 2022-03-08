# MyerBargainFinder

This Robot is able to find bargains in Myer store and take screenshots of discounted products.

Steps to run the project on your local.
1) Get the project into your local machine.
2) Make sure you have node.js installed.
3) Install and open VScode or any Editor of your choice and open the project in it.
4) Now run npm install in your console and it will download all the packages.
5) wdio.conf.js in the project is the main config file. 
6) To run the project, just type "npm run myer" in terminal and run it. 
7) The results of the project are displayed as screenshots stored in the screenshots folder.
8) You can change the default discount percentage for all categories by using "DISCOUNT=<discount> npm run myer" (e.g "DISCOUNT=50 npm run myer").
9) You can run the bot in one category by using "npm run <category>" or "DISCOUNT=<discount> npm run <category>.
    categories: women, men, home, entertainment, kids, toys and beauty.
