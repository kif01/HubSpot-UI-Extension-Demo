# HubSpot-UI-Extension-Demo
 This is an example on using HubSpot CRM custom card feature to extend the UI using Serverless functionality.
 
# Use Case Example
Help sales rep to easily get access to additional data insights about deals on a specific record with the Serverless functionality, this use can be used for both B2C and B2B industries.

<img width="1440" alt="Screenshot 2022-07-26 at 11 57 20" src="https://user-images.githubusercontent.com/15332386/181013096-25cfb084-861b-4eb9-a810-550c39bcbda5.png">

<img width="1440" alt="Screenshot 2022-07-26 at 14 16 12" src="https://user-images.githubusercontent.com/15332386/181015056-919b260b-ec0c-47b0-b70b-2367b6f101b3.png">

# Tutorial

## 1) Prerequisite - Setup Local Environment

- Install Node.js which enables HubSpot’s local development tools
- Install any code editor like Visual Studio
- Install the HubSpot CLI by running `npm install -g @hubspot/cli@next` in the terminal
- In the terminal navigate to the directory where you'll be working
- Run the command `hs init`
- Press **Enter** to open the personal access key page in your browser.
- Select the **account** that you want to deploy to, then click **Continue** with this account. You’ll then be redirected to the personal access key page of the account. **INSERT_IMAGE**
- Make sure to select the sandbox option **INSERT_IMAGE**
- Click **Show** to reveal your key. Then click Copy to copy it to your clipboard. **INSERT_IMAGE**
- Paste the copied key into terminal, then press **Enter**.
- Enter a unique name for the account, which is only used when running CLI commands. Then, press Enter. **INSERT_IMAGE**
  
## 2) Create and Upload a Local Project
- Make sure you are in the environment in which you ran the `hs init command` during the previous phase
- Create a folder like "MyProjects" and navigate to it in the terminal.
- In the terminal run `hs project create`
- Enter a **name** for the project, then press **Enter**
- Set the location for the project: Leave it as it, the default one so just press **Enter**
- Select whether to start the project from scratch or from the Getting Started template. **INSERT_IMAGE**
- In the terminal, run `hs project upload` **INSERT_IMAGE**
- Go to: HubSpot Account > Developer Tab > Private Apps. You'll the see app there. **INSERT_IMAGE**
- Click on any **Contact** record and you'll the a custom crm card on the right side **INSERT_IMAGE**

## 3) Convert CRM card to Custom Tab Card
### Update Card Configuration
- Go to **app.json** file and include `"version":2`
```javascript
"extensions": {
    "crm": {
        "cards": [
            {
              "file": "./crm-card.json",
              "version": 2
            }
        ]
     }
   }
```

- Go to **crm-card.json** file and replace the code with the following:

```javascript
// crm-card.json
{
  "type": "crm-card",
  "version": 2,
  "data": {
    "title": "Loom CRM Card",
    "fetch": {
      "targetFunction": "crm-card",
      "objectTypes": [
        {
          "name": "contacts",
          "propertiesToSend": [], 
          "actions":[]
        }
      ]
    },
    "display": {
      "properties": []
    },
    "actions": {
      "baseUrls": []
    }
  }
}
```
- Go to **crm-card.js** and replace the code with the followng:
```javascript
// crm-card.js
const axios = require("axios");

exports.main = async (context = {}, sendResponse) => {

  try {
    const { data } = await axios.get("https://zenquotes.io/api/random");
    sendResponse({
      sections: [
        {
          "type": "text",
          "format": "markdown",
          "text": "[Inspirational quotes provided by ZenQuotes API](https://zenquotes.io)" 
        },
        {
          "type": "text",
          "format": "markdown",
          "text": `**Quote**: ${data[0].q}` 
        },
        {
          "type": "text",
          "format": "markdown",
          "text": `**Author**: ${data[0].a}`
        },
        {
          "type": "button",
          "text": "Get Inspired",
          "onClick": {
            "type": "SERVERLESS_ACTION_HOOK",
             "serverlessFunction": "crm-card"
          } 
        },
    ],
    });
  } catch (error) {
    throw new Error(`There was an error fetching the quote': ${error.message}`);
  }
};
```
- Save all the changes (Make sure to click on **Save All**) and run `hs project upload`
- Go back to the **Contact** record in your portal and click on the **Custom** tab **INSERT_IMAGE**

## 4) Create a More Advanced Custom CRM Card
- Go to  **app.json** and add `"crm.objects.deals.read"` and `"crm.objects.deals.write"` in `scopes` (for this example we will mainly be focusing on the deal object but feel free to and any additional scopes). You can copy & paste the **app.json** file that exist in this repo.
```javascript
"scopes": [
    "crm.objects.contacts.read",
    "crm.objects.contacts.write",
    "crm.objects.deals.read",
    "crm.objects.deals.write",
  ]
```
- Go to **crm-card.json** and add `hs_object_id` in `propertiesToSend` under `objectTypes`. This would make the content of our CRM card dynamic: every time we click on a contact record the crm card will get its ID so we can use it later on in API requests to fetch deals for this coressponding contact. You can copy & paste the **crm-card.json** file that exist in this repo.
```javascript
"objectTypes": [
        {
          "name": "contacts",
          "propertiesToSend": ["hs_object_id"],
          "actions":[]
        }
      ]
```

- Grab the code from this [crm-card.js](https://github.com/kif01/HubSpot-UI-Extension-Demo/blob/main/src/app/app.functions/crm-card.js) in this repo and paste it in your **crm-card.js**. 
- Go to: HubSpot Account > Developer Tab > Private Apps and click on **View access token** to get the token of this private app. **INSERT_IMAGE**
- Paste the token in the code where it says `"INSERT TOKEN"`
- Save all the changes (make sure to click on **Save All**) and run `hs project upload`. 

