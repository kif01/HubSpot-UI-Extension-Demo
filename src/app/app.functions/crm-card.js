// For external API calls
const axios = require('axios');
// For HubSpot API calls (HubSpot node API client)
const hubspot = require('@hubspot/api-client');

exports.main = async (context = {}, sendResponse) => {

  const {
    propertiesToSend: {
      hs_object_id
    }
  } = context;

  const hubspotClient = new hubspot.Client({ accessToken: "<INSETRT TOKEN HERE>" });

  let deals = []
  //const contactId = "101";
  const toObjectType = "deal";
  const after = undefined;
  const limit = 500;
  let variantType = "default";
  let tagText = "Regular Customer";
  const properties = undefined;
  const propertiesWithHistory = undefined;
  const associations = undefined;
  const archived = false;
  const idProperty = undefined;

  let totalClosedWonAmount = 0;
  let totalClosedWonCount = 0;
  let totalActiveDeals = 0;
  let img = "https://assets.greentechmedia.com/assets/content/cache/made/assets/content/cache/remote/https_assets.greentechmedia.com/content/images/articles/small_business_XL_721_420_80_s_c1.jpg";
  try {

    // const { data } = await axios.get("https://zenquotes.io/api/random");

    const apiResponse = await hubspotClient.crm.contacts.associationsApi.getAll(hs_object_id, toObjectType, after, limit);
    const deals_list_size = apiResponse.results.length;

    for (let i = 0; i < deals_list_size; i++) {

      dealId = apiResponse.results[i].id;
      const apiResponse2 = await hubspotClient.crm.deals.basicApi.getById(dealId, properties, propertiesWithHistory, associations, archived, idProperty);

      const dealInfo = { amount: apiResponse2.properties.amount, stage: apiResponse2.properties.dealstage };
      deals.push(dealInfo);
    }

    for (let i = 0; i < deals.length; i++) {
      if (deals[i].stage == "closedwon") {
        totalClosedWonAmount += parseInt(deals[i].amount);
        totalClosedWonCount += 1;
      }

      if (deals[i].stage != "closedwon" && deals[i].stage != "closedlost") {
        totalActiveDeals += 1;
      }

    }

    if (totalClosedWonAmount > 400) {
      variantType = "success";
      tagText = "High Value Customer";
      img = "https://img.freepik.com/premium-vector/vip-card-celebrity-persons-lifestyle-concept-luxury-characters-with-gold-cards-get-premium-service-woman-with-dog-enter-limousine-waiter-carry-star-tray-cartoon-people-vector-illustration_87771-14379.jpg?w=720"
    }

    let n = totalClosedWonCount / deals_list_size * 100;
    let wonPercentage = n.toFixed(2);


    sendResponse({
      sections: [

        {
          "type": "text",
          "format": "markdown",
          "text": "An example on extending the UI of a CRM record with the Serverless functionailty to show additional data insights on a custom CRM card."


        },

        {
          "type": "tag",
          "text": tagText,
          "variant": variantType
        },

        {
          "type": "image",
          "src": img,
          "alt": "image"
        },

        {
          "type": "divider",
          "distance": "medium"
        },



        {
          "type": "statistics",
          "items": [

            {
              "label": "Closed Won Total Amount this year",
              "number": `$${totalClosedWonAmount}`,
              "description": {
                "type": "trend",
                "value": "23.36%",
                "direction": "increase"
              }
            },

            {
              "label": "Number of Closed Won Deals/Renewals",
              "number": `${totalClosedWonCount}`,
              "description": {
                "type": "text",
                "text": `${wonPercentage}%`,
              
                
              }
            },

            {
              "label": "Number of Total Active Deals/Renewals",
              "number": `${totalActiveDeals}`,
              "description": {
                "type": "text",
                "variant": "microcopy",
                "text": `There is currently ${totalActiveDeals} active deal ongoing`

              }
            }


          ]
        },

        {
          "type": "divider",
          "distance": "medium"
        },

        {
          "type": "crm::table",
          "objectTypeId": "deals",
          "properties": [
            "dealname",
            "amount",
            "dealstage",
            "hubspot_owner_id"
          ],
          "pageSize": 3
        }
      ]
    });


  } catch (error) {
    throw new Error(`There was an error fetching the quote': ${error.message}`);
  }
};





