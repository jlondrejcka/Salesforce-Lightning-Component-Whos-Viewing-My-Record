# Salesforce Lightning Component: Whos Viewing My Record
Have you had issues saving records in Salesforce, because while you where editing a record, another user made/saved edits to the same record? Whos Viewing My Record is here to help! This component will notify you when another user is also viewing the same record as you, to help reduce conflict when saving records. 

## Dev, Build and Test
Install from the [AppExchange as a Labs App here](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000FKAhhUAH).

Install via SFDX by downloading this repo:
```
git clone https://github.com/jlondrejcka/Salesforce-Lightning-Component-Whos-Viewing-My-Record
cd Salesforce-Lightning-Component-Whos-Viewing-My-Record
sfdx force:org:create -s -f config/project-scratch-def.json -a "default scratch org"
sfdx force:org:open
sfdx force:source:push
```

Once Installed into your Org:
1. Open the Who's Viewing App to test out.

Add the Component to an Existing App
1. Setup > App Manager.
2. Click Edit next to the Lightning App you would like to add the component too. 
3. Go to Utiltiy Bar settings.
4. Click "Add" next to Utlity Bar Items.
5. Select "whosViewing" under Custom Component.
6. Click "Save".


## Resources
Inspired by the following resources:
* https://github.com/afawcett/streamingcomponent
* https://andyinthecloud.com/2018/02/25/user-notifications-with-utility-bar-api/ 


## Requirements
* Lightning Experience
* Platform Events
* Utility Bar



