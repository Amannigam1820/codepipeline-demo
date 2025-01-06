// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");


import {GoogleGenerativeAI} from "@google/generative-ai"


const apiKey = "AIzaSyBVUJQ7L3xbW-Yyj42ggl5ecVG_4RXIQl8"//import.meta.env.VITE_AI_API_KEY
//console.log(apiKey);
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 0.8,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "generate travel plan for location: pune for 3 days for couple with cheap budget give me hotel option list with hotel name, hotel address price hotel image url, geo cordinates rating description and suggest itinery with placename, place deatils place image url, geo cordinates, ticketpricing time to travel each of the loaction for 3 days with each day plan with best time to visit in json format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "travel_plan": {\n    "location": "Pune",\n    "duration": "3 days",\n    "budget": "cheap",\n    "travelers": "couple",\n    "hotels": [\n      {\n        "name": "Hotel Vaibhav",\n        "address": "145/1, Sadashiv Peth, Pune, Maharashtra 411002",\n        "price": "₹1,500 - ₹2,500",\n        "image_url": "https://images.trvl-media.com/media/hotels/1000000/900000/899000/898800/898770/898770_126_b.jpg",\n        "geo_coordinates": "18.5266° N, 73.8476° E",\n        "rating": "3.5",\n        "description": "A budget-friendly hotel in the heart of Pune, offering basic amenities and comfortable rooms."\n      },\n      {\n        "name": "Hotel Raj",\n        "address": "130, MG Road, Pune, Maharashtra 411001",\n        "price": "₹1,000 - ₹2,000",\n        "image_url": "https://www.oyorooms.com/hotels/pune/oyo-townhouse-026-pune-fc-road-4753/images/96620.jpg",\n        "geo_coordinates": "18.5212° N, 73.8564° E",\n        "rating": "3.0",\n        "description": "A simple and affordable hotel in a convenient location near the city center."\n      },\n      {\n        "name": "Hotel The Corinthians",\n        "address": "Koregaon Park, Pune, Maharashtra 411001",\n        "price": "₹2,000 - ₹3,000",\n        "image_url": "https://images.trvl-media.com/media/hotels/1000000/900000/899000/898800/898760/898760_126_b.jpg",\n        "geo_coordinates": "18.5304° N, 73.8661° E",\n        "rating": "4.0",\n        "description": "A comfortable and well-maintained hotel in the popular Koregaon Park area."\n      }\n    ],\n    "itinerary": [\n      {\n        "day": "Day 1",\n        "plan": [\n          {\n            "place": "Shaniwar Wada",\n            "details": "A historical fort built by the Peshwa rulers, offering a glimpse into Pune\'s rich past.",\n            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Shaniwar_Wada_Pune_India.jpg/1280px-Shaniwar_Wada_Pune_India.jpg",\n            "geo_coordinates": "18.5198° N, 73.8532° E",\n            "ticket_pricing": "₹20 per person",\n            "time_to_travel": "1-2 hours",\n            "best_time_to_visit": "Morning or evening"\n          },\n          {\n            "place": "Aga Khan Palace",\n            "details": "A historic palace that served as Mahatma Gandhi\'s residence during his imprisonment.",\n            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Aga_Khan_Palace_Pune%2C_India.jpg/1280px-Aga_Khan_Palace_Pune%2C_India.jpg",\n            "geo_coordinates": "18.5222° N, 73.8575° E",\n            "ticket_pricing": "₹20 per person",\n            "time_to_travel": "1-2 hours",\n            "best_time_to_visit": "Morning or evening"\n          },\n          {\n            "place": "Parvati Hill",\n            "details": "A hilltop temple offering panoramic views of Pune.",\n            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Parvati_temple_pune.jpg/1280px-Parvati_temple_pune.jpg",\n            "geo_coordinates": "18.5307° N, 73.8641° E",\n            "ticket_pricing": "Free",\n            "time_to_travel": "1-2 hours",\n            "best_time_to_visit": "Morning or evening"\n          }\n        ]\n      },\n      {\n        "day": "Day 2",\n        "plan": [\n          {\n            "place": "Sinhagad Fort",\n            "details": "A historical fort offering stunning views and a chance to explore the surrounding hills.",\n            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sinhagad_fort.jpg/1280px-Sinhagad_fort.jpg",\n            "geo_coordinates": "18.4675° N, 73.8869° E",\n            "ticket_pricing": "₹10 per person",\n            "time_to_travel": "2-3 hours",\n            "best_time_to_visit": "Morning or evening"\n          },\n          {\n            "place": "Pashan Lake",\n            "details": "A picturesque lake surrounded by hills, ideal for a relaxing evening stroll.",\n            "image_url": "https://www.holidify.com/images/cmsuploads/pashan-lake-pune-20220825121320.jpg",\n            "geo_coordinates": "18.5142° N, 73.8238° E",\n            "ticket_pricing": "Free",\n            "time_to_travel": "1-2 hours",\n            "best_time_to_visit": "Evening"\n          }\n        ]\n      },\n      {\n        "day": "Day 3",\n        "plan": [\n          {\n            "place": "National War Museum",\n            "details": "A museum dedicated to India\'s military history, offering insights into the country\'s armed forces.",\n            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/National_War_Museum_%28Pune%29.jpg/1280px-National_War_Museum_%28Pune%29.jpg",\n            "geo_coordinates": "18.5146° N, 73.8516° E",\n            "ticket_pricing": "₹20 per person",\n            "time_to_travel": "1-2 hours",\n            "best_time_to_visit": "Morning or afternoon"\n          },\n          {\n            "place": "Bund Garden",\n            "details": "A sprawling garden with a lake, offering a relaxing and scenic spot to spend an afternoon.",\n            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Bund_Garden_Pune_India.jpg/1280px-Bund_Garden_Pune_India.jpg",\n            "geo_coordinates": "18.5163° N, 73.8608° E",\n            "ticket_pricing": "Free",\n            "time_to_travel": "1-2 hours",\n            "best_time_to_visit": "Afternoon or evening"\n          }\n        ]\n      }\n    ]\n  }\n}\n```\n\n**Please note:**\n\n* Hotel prices are approximate and may vary depending on season and availability.\n* This itinerary is a suggestion and can be customized based on your interests and preferences.\n* Consider using public transportation or walking to save on costs.\n* Check for updated timings and ticket prices before visiting any attraction.\n* Be sure to dress comfortably and carry water bottles, especially during the summer months.\n\nThis itinerary offers a mix of historical, cultural, and scenic attractions for a budget-friendly couple\'s trip to Pune. \n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
