# HubSpot Custom CRM Card UI Extension Tutorial
 This is an example on using HubSpot CRM custom card feature to extend the UI using Serverless functionality.
 
## Use Case Example & Sample Output
Help sales rep to easily get access to additional data insights about deals on a specific record with the Serverless functionality, this use can be used for both B2C and B2B industries. This turotial starts by using the default boilerplate that HubSpot provides so we can then customize it to fit the needs of this use case.

<img width="1440" alt="Screenshot 2022-07-29 at 10 30 51" src="https://user-images.githubusercontent.com/15332386/181730203-9861933f-c2bf-44e2-a2c2-8d9aab86c700.png">

<img width="1440" alt="Screenshot 2022-07-29 at 10 31 33" src="https://user-images.githubusercontent.com/15332386/181730274-057974f9-79c3-408f-9d20-1ca4464f8a0b.png">

## Tutorial Steps

### 1. Prerequisite - Setup Local Environment

**1.1.** Install [Node.js](https://nodejs.org/en/download/) which enables HubSpot’s local development tools. </br></br>
**1.2.** Install any code editor like [Visual Studio](https://visualstudio.microsoft.com/vs/mac/). </br></br>
**1.3.** Install the HubSpot CLI by running `npm install -g @hubspot/cli@next` in the terminal. </br></br>
**1.4.** In the terminal navigate to the directory where you'll be working. </br></br>
**1.5.** Run the command `hs init`. </br></br>
**1.6.** Press **Enter** to open the personal access key page in your browser. </br></br>

<img width="563" alt="Screenshot 2022-07-28 at 10 14 03" src="https://user-images.githubusercontent.com/15332386/181572390-12deaa7e-0885-4597-a2df-b072203f2b7b.png">

**1.7.** Select the **account** that you want to deploy to, then click **Continue** with this account. You’ll then be redirected to the personal access key page of the account. </br></br>
**1.8.** Make sure to select the **sandbox** option. </br></br>

<img width="1438" alt="Screenshot 2022-07-28 at 10 30 16" src="https://user-images.githubusercontent.com/15332386/181570839-888a1d61-6b20-4dc9-9985-d23fa55714a4.png">

**1.9.** Click **Show** to reveal your key. Then click **Copy** to copy it to your clipboard. </br></br>

<img width="1440" alt="Screenshot 2022-07-28 at 10 42 46" src="https://user-images.githubusercontent.com/15332386/181571676-f1a5093b-9c18-4f51-8728-8da02f3cf44b.png">

**1.10.** Paste the copied key into terminal, then press **Enter**. </br></br>
**1.11.** Enter a unique name for the account, which is only used when running CLI commands. Then, press **Enter**. </br></br>

<img width="1435" alt="Screenshot 2022-07-28 at 10 44 30" src="https://user-images.githubusercontent.com/15332386/181572787-e4b0da50-7757-4b6b-bc4f-2df31472b8ef.png">

  
### 2) Create and Upload a Local Project
**2.1.** Make sure you are in the environment in which you ran the `hs init command` during the previous phase. </br></br>
**2.2.** Create a folder like "MyProjects" and navigate to it in the terminal. </br></br>
**2.3.** In the terminal run `hs project create`. </br></br>
**2.4.** Enter a **name** for the project, then press **Enter**. </br></br>
**2.5.** Set the location for the project: Leave it as it, the default one so just press **Enter**. </br></br>
**2.6.** Select whether to start the project from scratch or from the **Getting Started** template. </br></br>

<img width="742" alt="Screenshot 2022-07-28 at 11 08 42" src="https://user-images.githubusercontent.com/15332386/181574115-96e9152b-1d6a-4d23-870f-fa0e5a5ff793.png">

**2.7.** In the terminal, run `hs project upload`. </br></br>

<img width="815" alt="Screenshot 2022-07-28 at 11 10 45" src="https://user-images.githubusercontent.com/15332386/181574425-b906cf25-ce82-4bb5-9fd1-3de098b073b1.png">

**2.8.** Go to: HubSpot Account > Developer Tab > Private Apps. You'll the see app there. </br></br>

<img width="1440" alt="Screenshot 2022-07-28 at 11 11 29" src="https://user-images.githubusercontent.com/15332386/181574748-88be0fc0-05ec-4872-9e02-f9b8b7f3fdbf.png">

**2.9.** Click on any **Contact** record and you'll see the custom CRM card on the right side. </br></br>

<img width="366" alt="Screenshot 2022-07-28 at 11 12 29" src="https://user-images.githubusercontent.com/15332386/181576081-68dbd233-b691-4df1-87c8-5c8bcbcad329.png">

### 3) Convert CRM card to Custom Tab Card
#### Update Card Configuration
**3.1.** Go to **app.json** file and include `"version":2`.
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

**3.2.**  Go to **crm-card.json** file and replace the code with the following:

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
#### Update CRM Card Function
**3.3.**  Go to **crm-card.js** and replace the code with the followng:
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
**3.4.**  Save all the changes *-make sure to click on Save All-* and run `hs project upload`. </br></br>
**3.5.**  Go back to the **Contact** record in your portal and click on the **Custom** tab. </br></br>

<img width="1079" alt="Screenshot 2022-07-28 at 11 35 50" src="https://user-images.githubusercontent.com/15332386/181576724-0f9e300b-561e-42bb-8a1a-9a1cdf88f3df.png">

### 4) Create a More Advanced Custom CRM Card
**4.1.**  Go to  **app.json** and add `"crm.objects.deals.read"` and `"crm.objects.deals.write"` in `scopes` (for this example we will mainly be focusing on the deal object but feel free to and any additional scopes). You can copy & paste the [app.json](https://github.com/kif01/HubSpot-UI-Extension-Demo/blob/main/src/app/app.json) file that exist in this repo.
```javascript
"scopes": [
    "crm.objects.contacts.read",
    "crm.objects.contacts.write",
    "crm.objects.deals.read",
    "crm.objects.deals.write",
  ]
```
**4.2.** Go to **crm-card.json** and add `hs_object_id` in `propertiesToSend` under `objectTypes`. This would make the content of our CRM card dynamic: every time we click on a contact record the crm card will get its ID so we can use it later on in API requests to fetch deals for this coressponding contact. You can copy & paste the [crm-card.json](https://github.com/kif01/HubSpot-UI-Extension-Demo/blob/main/src/app/crm-card.json) file that exist in this repo.
```javascript
"objectTypes": [
        {
          "name": "contacts",
          "propertiesToSend": ["hs_object_id"],
          "actions":[]
        }
      ]
```

**4.3.** Grab the code from this [crm-card.js](https://github.com/kif01/HubSpot-UI-Extension-Demo/blob/main/src/app/app.functions/crm-card.js) in this repo and paste it in your **crm-card.js**. </br></br>
**4.4.** Go to: HubSpot Account > Developer Tab > Private Apps and click on **View access token** to get the token of this private app. </br></br>

<img width="1440" alt="Screenshot 2022-07-28 at 13 43 18" src="https://user-images.githubusercontent.com/15332386/181576920-ffe59ea2-f2e8-4b3a-bd11-1bb69952af32.png">

**4.5.** Paste the token in the code where it says `"INSERT TOKEN HERE"`. </br></br>

<img width="637" alt="Screenshot 2022-07-28 at 16 29 07" src="https://user-images.githubusercontent.com/15332386/181577671-29a099b1-73b1-4b83-ab57-323c5b58f69e.png">

**4.6.** Save all the changes *-make sure to click on Save All-* and run `hs project upload`. 

## Additional Resources
- [Projects overview](https://developers.hubspot.com/docs/platform/build-and-deploy-using-hubspot-projects)
- [Projects setup guide](https://developers.hubspot.com/docs/platform/developer-projects-setup)
- [Projects quickstart guide](https://developers.hubspot.com/docs/platform/projects-quick-start-guide)
- [Create private apps with projects](https://developers.hubspot.com/docs/platform/create-private-apps-with-projects)
- [Include serverless functions with projects](https://developers.hubspot.com/docs/platform/serverless-functions)
- [Create custom automation actions with projects](https://developers.hubspot.com/docs/platform/custom-automation-actions-projects)
- [Include asset definition files in a project](https://developers.hubspot.com/docs/platform/include-asset-definition-files-in-projects)
- [CLI reference guide for projects](https://developers.hubspot.com/docs/platform/project-cli-commands)


