// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
    GoogleGenAI,
  } from '@google/genai';
  

    // const ai = new GoogleGenAI({
    //   apiKey: process.env.AIzaSyA33u17I8wxYINBqe_yqYzBOJ_WCtr-WKk,
    // });
    // const config = {
    //   thinkingConfig: {
    //     thinkingBudget: 0,
    //   },
    //   responseMimeType: 'application/json',
    // };
    // const model = 'gemini-2.0-flash';
    export const contents = [
      {
        role: 'user',
        parts: [
          {
            text: `Generate Travel Plan for Location: Las Vegas, for for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, tickef Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `Okay, here's a JSON formatted travel plan for Las Vegas for a couple on a budget for 3 days.  I've focused on free or low-cost activities and affordable hotels.  Remember that Las Vegas prices can fluctuate wildly, especially on weekends and during conventions.  **Double-check pricing and availability before booking anything!**
  
  \`\`\`json
  {
    "tripName": "Las Vegas Budget Getaway for Couples",
    "duration": "3 Days",
    "budget": "Cheap/Budget-Friendly",
    "travelers": "Couple",
    "location": "Las Vegas, Nevada",
    "hotelOptions": [
      {
        "hotelName": "Circus Circus Hotel, Casino & Theme Park",
        "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",
        "price": "$30 - $80/night (estimated, check for deals)",
        "hotelImageUrl": "https://www.circuscircus.com/wp-content/uploads/2024/04/Exterior-Overview-copy.jpg",
        "geoCoordinates": {
          "latitude": 36.1243,
          "longitude": -115.1663
        },
        "rating": 3.5,
        "description": "A classic Vegas option with affordable rooms, a casino, and the Adventuredome theme park. It's a bit older but offers good value, especially during the week.  It is located on the north end of the Strip."
      },
      {
        "hotelName": "Excalibur Hotel & Casino",
        "hotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",
        "price": "$40 - $90/night (estimated, check for deals)",
        "hotelImageUrl": "https://www.mgmresorts.com/content/dam/MGM/excalibur/hotel/overview/excalibur-hotel-overview-hero-1400x600.jpg",
        "geoCoordinates": {
          "latitude": 36.0984,
          "longitude": -115.1743
        },
        "rating": 4.0,
        "description": "Themed hotel with a medieval vibe.  Rooms are generally budget-friendly, and it's well-located at the south end of the Strip. Good for families and couples alike."
      },
        {
          "hotelName": "Luxor Hotel & Casino",
          "hotelAddress": "3900 S Las Vegas Blvd, Las Vegas, NV 89119",
          "price": "$45-$100/night (estimated, check for deals)",
          "hotelImageUrl": "https://www.vegas.com/wp/wp-content/uploads/2023/04/luxor-hotel-and-casino-las-vegas-exterior.jpg",
          "geoCoordinates": {
            "latitude": 36.0956,
            "longitude": -115.1759
          },
          "rating": 4.1,
          "description": "Iconic pyramid-shaped hotel.  Offers affordable rooms and is connected to Mandalay Bay and Excalibur.  Good selection of dining and entertainment options."
        }
    ],
    "itinerary": {
      "day1": {
        "theme": "Exploring the Strip (South End) & Free Attractions",
        "bestTimeToVisit": "Morning & Evening (to avoid midday heat)",
        "locations": [
          {
            "placeName": "Welcome to Las Vegas Sign",
            "placeDetails": "Iconic sign for a photo opportunity. It's a must-do!",
            "placeImageUrl": "https://www.lasvegasadvisor.com/wp-content/uploads/2016/10/welcome-to-las-vegas-sign.jpg",
            "geoCoordinates": {
              "latitude": 36.0829,
              "longitude": -115.1735
            },
            "ticketPricing": "Free",
            "rating": 4.5,
            "travelTimeFromHotel": "Depends on hotel location; allow 15-30 minutes by bus/car from most Strip hotels."
          },
          {
            "placeName": "Bellagio Conservatory & Botanical Garden",
            "placeDetails": "Stunning free floral displays that change seasonally.",
            "placeImageUrl": "https://www.bellagio.com/content/dam/MGM/bellagio/entertainment/conservatory-botanical-garden/bellagio-conservatory-garden-chinese-new-year-dragon-800x450.jpg",
            "geoCoordinates": {
              "latitude": 36.1127,
              "longitude": -115.1763
            },
            "ticketPricing": "Free",
            "rating": 4.8,
            "travelTimeFromHotel": "Depends on hotel location; allow 10-25 minutes by bus/car from most Strip hotels."
          },
          {
            "placeName": "Bellagio Fountains",
            "placeDetails": "Spectacular free water show choreographed to music and light.",
            "placeImageUrl": "https://www.wheretraveler.com/sites/default/files/images/Bellagio_Fountains_at_Night.jpg",
            "geoCoordinates": {
              "latitude": 36.1129,
              "longitude": -115.1746
            },
            "ticketPricing": "Free",
            "rating": 4.9,
            "travelTimeFromHotel": "Adjacent to the Conservatory; walking distance.",
            "timeToVisit": "Evenings (for the light show)"
          },
          {
            "placeName": "Walk the Strip (South End)",
            "placeDetails": "Explore the casinos (Excalibur, Luxor, Mandalay Bay), people-watch, and enjoy the atmosphere.",
            "placeImageUrl": "https://media.cntraveler.com/photos/5b23669583b73a1b7ff806f6/16:9/w_1920,c_limit/GettyImages-530474605.jpg",
            "geoCoordinates": {
              "latitude": 36.09,
              "longitude": -115.17
            },
            "ticketPricing": "Free (except for any food, drinks, or gambling)",
            "rating": 4.0,
            "travelTimeFromHotel": "Walking distance between the casinos.",
            "timeToVisit": "Afternoon/Evening"
          }
        ]
      },
      "day2": {
        "theme": "Downtown Las Vegas (Fremont Street Experience) & Budget Entertainment",
        "bestTimeToVisit": "Afternoon/Evening (for the light shows and vibrant atmosphere)",
        "locations": [
          {
            "placeName": "Fremont Street Experience",
            "placeDetails": "A pedestrian mall covered by a giant LED canopy that shows dazzling light shows.  Free live music and street performers.",
            "placeImageUrl": "https://vegasexperience.com/wp-content/uploads/2023/08/fremont-street-experience-at-night-header.jpg",
            "geoCoordinates": {
              "latitude": 36.1703,
              "longitude": -115.1426
            },
            "ticketPricing": "Free (except for any food, drinks, or attractions)",
            "rating": 4.6,
            "travelTimeFromHotel": "30-45 minutes by bus (Deuce) or ride-sharing service from the Strip. Consider taking the bus for budget reasons.",
            "timeToVisit": "Evening (for the light shows)"
          },
          {
            "placeName": "Downtown Container Park",
            "placeDetails": "Unique open-air shopping and entertainment area made from shipping containers.  Live music, restaurants, and a playground.",
            "placeImageUrl": "https://downtowncontainerpark.com/wp-content/uploads/2018/07/dtcp-slider-1.jpg",
            "geoCoordinates": {
              "latitude": 36.1685,
              "longitude": -115.1403
            },
            "ticketPricing": "Free to enter (costs for food/drinks/activities)",
            "rating": 4.3,
            "travelTimeFromFremont": "5-minute walk from Fremont Street.",
            "timeToVisit": "Afternoon/Evening"
          },
          {
            "placeName": "Free Live Music on Fremont Street",
            "placeDetails": "Many stages offer free live music throughout the day and evening.",
            "placeImageUrl": "https://s.abcnews.com/images/Travel/fremont-street-lights-ap-jt-160920_16x9_992.jpg",
            "geoCoordinates": {
              "latitude": 36.1703,
              "longitude": -115.1426
            },
            "ticketPricing": "Free",
            "rating": 4.4,
            "travelTimeFromHotel": "Located on Fremont Street.",
            "timeToVisit": "Evening"
          }
        ]
      },
      "day3": {
        "theme": "High Roller Observation Wheel & Departure",
        "bestTimeToVisit": "Afternoon (for views before departure)",
        "locations": [
          {
            "placeName": "LINQ Promenade",
            "placeDetails": "Outdoor shopping, dining, and entertainment district.",
            "placeImageUrl": "https://caesars.com/linq/things-to-do/-/media/linq-redesign/things-to-do/linq-promenade-hero-updated.jpg",
            "geoCoordinates": {
              "latitude": 36.1166,
              "longitude": -115.1692
            },
            "ticketPricing": "Free to walk around (costs for shopping/dining)",
            "rating": 4.2,
            "travelTimeFromHotel": "Depends on hotel location, can be reached by bus or walking."
          },
          {
            "placeName": "High Roller Observation Wheel (Optional, Budget Permitting)",
            "placeDetails": "Giant Ferris wheel offering panoramic views of the Las Vegas Strip and surrounding area.",
            "placeImageUrl": "https://caesars.com/content/dam/linq/things-to-do/high-roller/high-roller-observation-wheel-linq-promenade-hero-1400x600.jpg",
            "geoCoordinates": {
              "latitude": 36.1165,
              "longitude": -115.1686
            },
            "ticketPricing": "$25 - $40 (check for online discounts)",
            "rating": 4.5,
            "travelTimeFromLINQ": "Located at the end of the LINQ Promenade.",
            "timeToVisit": "Afternoon/Evening (for sunset views, if budget allows)",
            "notes": "If the High Roller is too expensive, skip it and enjoy walking around the LINQ Promenade and people-watching."
          },
          {
            "placeName": "Departure",
            "placeDetails": "Head to the airport for your flight home.",
            "placeImageUrl": null,
            "geoCoordinates": null,
            "ticketPricing": null,
            "rating": null,
            "travelTimeFromLINQ": "Allow ample time to get to the airport (30-60 minutes depending on traffic)."
          }
        ]
      }
    },
    "budgetTips": [
      "Take advantage of free attractions.",
      "Use public transportation (the Deuce bus) or ride-sharing services, but compare prices.",
      "Eat at affordable restaurants or fast-food places.",
      "Take advantage of free drinks while gambling (but gamble responsibly!).",
      "Look for happy hour deals.",
      "Bring your own water and snacks to avoid buying them on the Strip.",
      "Compare hotel prices and book in advance, especially for weekdays.",
      "Consider staying slightly off the Strip for cheaper hotel rates."
    ],
    "importantNotes": [
      "Prices and availability are subject to change.  Always confirm before booking.",
      "Las Vegas can be very hot, especially in the summer.  Stay hydrated and wear sunscreen.",
      "Be aware of your surroundings and keep your belongings safe.",
      "Tip appropriately for services.",
      "Have fun!"
    ]
  }
  \`\`\`
  
  **Key Considerations & Explanations:**
  
  *   **Hotel Choices:** I've listed hotels that are generally considered budget-friendly.  Prices are estimates and can change dramatically. Check directly with the hotels or reputable booking sites for the best deals.  Consider staying mid-week, as weekend prices are much higher.
  *   **Transportation:** The Deuce bus is the most economical way to get around the Strip and Downtown.  Ride-sharing services (Uber/Lyft) are another option, but prices can surge during peak times. Walking is great, but distances can be deceiving.
  *   **Free Activities:** This itinerary emphasizes free attractions.
  *   **Flexibility:** This is just a suggestion.  Adjust the itinerary based on your interests and energy levels.
  *   **Safety:** Be aware of your surroundings, especially at night. Stay in well-lit areas.
  *   **Hydration:**  Las Vegas is in the desert. Drink plenty of water.
  *   **Tipping:**  Be prepared to tip for services like restaurants, taxis, and hotel staff.
  
  **How to Use This Plan:**
  
  1.  **Book Your Hotel:** Secure your accommodation first.  Compare prices and read reviews.
  2.  **Review the Itinerary:** Adjust the daily plan to fit your preferences. Research any activities that sound interesting to you.
  3.  **Check Transportation:** Plan your transportation options for each day. Download the Deuce bus schedule if you plan to use it.
  4.  **Enjoy!** Remember to be flexible and have fun! Las Vegas can be overwhelming, so pace yourself and don't try to do everything.
  5.  **Double check the price of the activities**
  
  This comprehensive plan provides a solid foundation for a memorable and affordable Las Vegas getaway. Enjoy!
  `,
          },
        ],
      },
     
    ];
  
    // const response =  ai.models.generateContentStream({
    //   model,
    //   config,
    //   contents,
    // });
    // for await (const chunk of response) {
    //   console.log(chunk.text);
    // }
  
  

  