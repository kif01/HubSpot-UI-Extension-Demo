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
        ]```

