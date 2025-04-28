export const SelectTravelesList=[
    {
        id:1,
        title:'just Me',
        desc:'A sole traveles in exploration',
        icon:'🛫',
        people:'1'
    },
    {
        id:2,
        title:'A couple',
        desc:'two  traveles in tandem',
        icon:'🥂',
        people:'2 people'
    },
    {
        id:3,
        title:'family',
        desc:'A group of fun loving adv',
        icon:'🏡',
        people:'3 to 5 people'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thril-seekes ',
        icon:'🚁',
        people:'5 to 10 People'
    },

]
export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵',
    },
    {
        id:2,
        title:'moderate',
        desc:'keep cost on the average side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸',
    },        
]
 export const AI_PROMPT= "Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinarary with placeName, Place details, Place Image Url, Geo Coordinates, ticket pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format."