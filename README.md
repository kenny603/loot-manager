# loot-manager
Roll20 LootManager

## What is this?
I got tired of running games in Roll20 and not being able to present loot to the party battle after battle. There's the Compendium, but you need to purchase that and it doesn't work for items that aren't in the Compendium. I needed a better way.

That's where LootManager comes in. It lets the GM create items on a character sheet that can then be moved into the LootManager, and from there the players can interact with the LootManager to claim what they want and have it go into their character sheet automatically.

## Installation
First off, Roll20 requires a Pro subscription in order to add API scripts to your game.

Once you have the Pro subscription, you can click on the link to get into the game you want to add the LootManager to. In there, you'll see a button titled "Settings". Click on that brings up a menu. In that menu is an entry titled "API Scripts". Clicking on that will bring you into the API scripts for your game.

You'll need to create two new scripts to enable LootManager.

Click on New Script, set the name to LootManager, and in the large text box below that copy the LootManager.js code. Save the script using the Save Script button at the bottom of the text box.

After that, click on New Script again, set the name to LootManagerPlugin, and in the large text box below copy the LootManagerPlugin code for whichever game system you are using. Save the script.

## Usage
For all the commands below, you need to select the token of the character you're interacting with, either to move items from their inventory to the LootManager, or to move items from the LootManager to their inventory.

### Player and GM commands

<b>!loot-manager show available</b>
This command shows all the available items currently in the LootManager queue for the selected token.

<b>!loot-manager show item</b>
This command needs to be followed by an offer ID (which is listed in the LootManager output for each item in the queue). This will display information about the item being offered (generally the stats of the item, if it happens to be a weapon, armor, etc).

<b>!loot-manager make offer item</b>
This command needs to be followed by the name of the item exactly as it appears in the character sheet inventory. This command will remove the item from the character's inventory and put it into the LootManager offer queue. This command can also be provided with "--price \"X Y\"" to set a price on the claim, where X is the quantity of the currency and Y is the name of the currency (such as "--price \"50 sp\"").

<b>!loot-manager make offer currency</b>
This command needs to be followed by "--quantity X" where X is the amount of currency and name of the currency being offered ("--quantity 50 gp", "--quantity 10 credits", etc). This command will remove that amount of currency from the character's inventory and put it into the LootManager offer queue.

<b>!loot-manager claim item</b>
This command needs to be followed by an offer ID (which is listed in the LootManager output for the item in the queue). This command will remove the offered item from the queue and place it in the character's inventory.

<b>!loot-manager claim currency</b>
This command needs to be followed by "--quantity X" where X is the amount of currency to take as well as an offer ID (which is listed in the LootManager output for the item in the queue). This command will remove the amount of currency from the offer in the queue and add it to the same currency already in the character's inventory.

<b>!loot-manager recall</b>
This command needs to be followed by an offer ID (which is listed in the LootManager output for the item in the queue). It will remove the offer from the queue and return it to the character sheet of the character that made the initial offer (assuming the player running the command owns the character that made the offer).

### GM-only commands

<b>!loot-manager make offer --all --npc</b>
This command will make an offer for each item in the character's inventory as well as an offer for each type of currency in the character's inventory. It will do all this without removing the items from the character's inventory (in case you need to loot multiple of the same NPC).

<b>!loot-manager drop</b>
This command needs to be followed by an offer ID (which is listed in the LootManager output for the item in the queue). It will drop the specified offer from the queue so it will no longer be available to claim.

<b>!loot-manager clear offers</b>
This command will clear all the current offers from the queue (not drop them). This means that all the current offers will be gone, they won't even be in the history. This will result in all those offers being lost. Therefore, you need to provide --force along with this command to ensure you know the risk.

<b>!loot-manager clear previous</b>
This command will clear all the previous offers from the queue (not drop them). This means that all the previous offers will be gone. This will result in all those offers being lost. Therefore, you need to provide --force along with this command to ensure you know the risk.

<b>!loot-manager config convert-currrency</b>
If provided with "yes" then assuming the plugin knows how to convert various forms of currency, then it will do so when claiming an offer with a price associated with it. If provided with "no" then the plugin will only allow a claim of an offer with a price associated with it if the character has "exact change".
