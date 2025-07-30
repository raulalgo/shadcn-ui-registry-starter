const fs = require("fs");

// Campaign data arrays for realistic generation
const advertisers = [
  "Coca-Cola",
  "PepsiCo",
  "Nike",
  "Adidas",
  "Apple",
  "Samsung",
  "Google",
  "Microsoft",
  "Amazon",
  "Netflix",
  "Disney",
  "McDonald's",
  "Burger King",
  "KFC",
  "Subway",
  "Starbucks",
  "Dunkin'",
  "Walmart",
  "Target",
  "Costco",
  "Home Depot",
  "Lowe's",
  "IKEA",
  "H&M",
  "Zara",
  "Uniqlo",
  "Gap",
  "Old Navy",
  "Forever 21",
  "Victoria's Secret",
  "L'Oréal",
  "Estée Lauder",
  "MAC",
  "Sephora",
  "Ulta",
  "Procter & Gamble",
  "Unilever",
  "Johnson & Johnson",
  "Colgate-Palmolive",
  "Kraft Heinz",
  "General Mills",
  "Kellogg's",
  "Nestlé",
  "Mars",
  "Hershey's",
  "Ferrero",
  "Mondelez",
  "Campbell's",
  "Conagra",
  "Tyson Foods",
  "Ford",
  "General Motors",
  "Toyota",
  "Honda",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Volkswagen",
  "Tesla",
  "Hyundai",
  "Verizon",
  "AT&T",
  "T-Mobile",
  "Sprint",
  "Comcast",
  "Charter",
  "Dish Network",
  "DirecTV",
  "Spotify",
  "Pandora",
  "Uber",
  "Lyft",
  "Airbnb",
  "Booking.com",
  "Expedia",
  "TripAdvisor",
  "Marriott",
  "Hilton",
  "Hyatt",
  "IHG",
  "American Express",
  "Visa",
  "Mastercard",
  "Discover",
  "PayPal",
  "Square",
  "Stripe",
  "Shopify",
  "Etsy",
  "eBay",
  "Facebook",
  "Instagram",
  "Twitter",
  "LinkedIn",
  "TikTok",
  "Snapchat",
  "YouTube",
  "Twitch",
  "Reddit",
  "Pinterest",
];

const brands = [
  "Coca-Cola",
  "Pepsi",
  "Sprite",
  "Fanta",
  "Mountain Dew",
  "Gatorade",
  "Powerade",
  "Vitamin Water",
  "Smart Water",
  "Dasani",
  "Nike Air",
  "Nike Zoom",
  "Nike Free",
  "Adidas Originals",
  "Adidas Boost",
  "Adidas Ultraboost",
  "Puma",
  "Under Armour",
  "New Balance",
  "Converse",
  "iPhone",
  "iPad",
  "MacBook",
  "iMac",
  "Apple Watch",
  "AirPods",
  "Samsung Galaxy",
  "Samsung Note",
  "Google Pixel",
  "OnePlus",
  "Netflix Original",
  "Disney+",
  "Hulu",
  "HBO Max",
  "Amazon Prime",
  "Apple TV+",
  "Peacock",
  "Paramount+",
  "Discovery+",
  "Crunchyroll",
  "Big Mac",
  "Whopper",
  "Original Recipe",
  "Subway Fresh",
  "Starbucks Reserve",
  "Dunkin' Donuts",
  "KFC Famous Bowl",
  "Taco Bell",
  "Pizza Hut",
  "Domino's",
  "L'Oréal Paris",
  "Maybelline",
  "Garnier",
  "Estée Lauder",
  "MAC",
  "Clinique",
  "Bobbi Brown",
  "Urban Decay",
  "Too Faced",
  "Benefit",
  "Tide",
  "Ariel",
  "Persil",
  "Gain",
  "Cheer",
  "Bold",
  "Surf",
  "Comfort",
  "Fairy",
  "Dawn",
  "Ford F-150",
  "Ford Mustang",
  "Chevrolet Silverado",
  "Chevrolet Camaro",
  "Toyota Camry",
  "Toyota Corolla",
  "Honda Civic",
  "Honda Accord",
  "BMW 3 Series",
  "Mercedes C-Class",
  "Verizon 5G",
  "AT&T Unlimited",
  "T-Mobile Magenta",
  "Sprint Unlimited",
  "Xfinity",
  "Spectrum",
  "Optimum",
  "Frontier",
  "CenturyLink",
  "Windstream",
  "UberX",
  "Uber Black",
  "Uber Eats",
  "Lyft",
  "Lyft XL",
  "Airbnb Plus",
  "Booking.com",
  "Expedia",
  "Hotels.com",
  "Vrbo",
  "American Express Platinum",
  "Visa Signature",
  "Mastercard World",
  "Discover It",
  "PayPal",
  "Venmo",
  "Cash App",
  "Zelle",
  "Apple Pay",
  "Google Pay",
  "Facebook",
  "Instagram",
  "WhatsApp",
  "Messenger",
  "Twitter",
  "LinkedIn",
  "TikTok",
  "Snapchat",
  "YouTube",
  "Twitch",
];

const productCategories = [
  "Beverages",
  "Snacks",
  "Athletic Apparel",
  "Footwear",
  "Smartphones",
  "Laptops",
  "Streaming Services",
  "Fast Food",
  "Coffee",
  "Retail",
  "Beauty Products",
  "Personal Care",
  "Household Products",
  "Automotive",
  "Telecommunications",
  "Financial Services",
  "Travel",
  "Technology",
  "Entertainment",
  "Fashion",
  "Home & Garden",
  "Electronics",
  "Food & Beverage",
  "Health & Wellness",
  "Sports & Fitness",
  "Education",
  "Real Estate",
  "Insurance",
  "Energy",
  "Transportation",
  "Gaming",
  "Social Media",
  "E-commerce",
  "Professional Services",
  "Consulting",
  "Manufacturing",
  "Construction",
  "Healthcare",
  "Pharmaceuticals",
  "Biotechnology",
];

const agencies = [
  "Publicis Groupe",
  "Omnicom Media Group",
  "WPP",
  "Interpublic Group",
  "Dentsu",
  "Havas Media",
  "MDC Partners",
  "Stagwell",
  "S4 Capital",
  "Accenture",
  "Deloitte Digital",
  "PwC Digital",
  "EY Digital",
  "KPMG Digital",
  "McKinsey Digital",
  "BCG Digital Ventures",
  "Bain Digital",
  "Strategy&",
  "Roland Berger",
  "Oliver Wyman",
  "BBDO",
  "DDB",
  "TBWA",
  "Saatchi & Saatchi",
  "Leo Burnett",
  "FCB",
  "Ogilvy",
  "McCann",
  "JWT",
  "Y&R",
  "Mindshare",
  "MediaCom",
  "Wavemaker",
  "Essence",
  "mSix&Partners",
  "PHD",
  "OMD",
  "Carat",
  "iProspect",
  "Amplifi",
  "Vizeum",
  "Posterscope",
  "Kinetic",
  "Talon",
  "Outdoor Media Group",
  "Clear Channel",
  "JCDecaux",
  "Lamar",
  "Adams Outdoor",
  "Fairway",
];

const people = [
  "John Smith",
  "Jane Doe",
  "Michael Johnson",
  "Sarah Williams",
  "David Brown",
  "Emily Davis",
  "Robert Wilson",
  "Lisa Anderson",
  "James Taylor",
  "Maria Garcia",
  "Christopher Martinez",
  "Jennifer Rodriguez",
  "Daniel Thompson",
  "Amanda White",
  "Matthew Lee",
  "Nicole Clark",
  "Joshua Lewis",
  "Stephanie Hall",
  "Andrew Young",
  "Rebecca Allen",
  "Kevin King",
  "Laura Wright",
  "Brian Scott",
  "Michelle Green",
  "Steven Baker",
  "Ashley Adams",
  "Timothy Nelson",
  "Kimberly Carter",
  "Jeffrey Mitchell",
  "Samantha Perez",
  "Ryan Roberts",
  "Heather Turner",
  "Gary Phillips",
  "Melissa Campbell",
  "Larry Parker",
  "Tiffany Evans",
  "Frank Edwards",
  "Crystal Collins",
  "Raymond Stewart",
  "Vanessa Morris",
  "Ralph Rogers",
  "Deborah Reed",
  "Eugene Cook",
  "Sharon Morgan",
  "Russell Bell",
  "Diane Murphy",
  "Bobby Bailey",
  "Rachel Cooper",
  "Johnny Richardson",
  "Cynthia Cox",
];

const campaignTypes = ["Direct", "Guaranteed", "Non-Guaranteed"];

const statuses = ["Draft", "Pending", "Booked", "Live", "Ended", "Cancelled"];

// Helper functions
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function generateCampaignId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let id = "CAM-";

  for (let i = 0; i < 8; i++) {
    if (i < 4) {
      id += letters[Math.floor(Math.random() * letters.length)];
    } else {
      id += numbers[Math.floor(Math.random() * numbers.length)];
    }
  }

  return id;
}

function generateCampaignName(advertiser, brand, year, month, suffix) {
  const suffixes = ["A1", "B2", "C3", "D4", "E5", "F6", "G7", "H8", "I9", "J0"];
  return `${advertiser}_${brand}_${year}${month}_${suffix}`;
}

function generateDateTime() {
  const year = 2023;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  const second = Math.floor(Math.random() * 60);

  return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
}

// Generate 300 campaigns
const campaigns = [];

for (let i = 0; i < 300; i++) {
  const advertiser = getRandomElement(advertisers);
  const brand = getRandomElement(brands);
  const typeOfCampaign = getRandomElement(campaignTypes);
  const status = getRandomElement(statuses);

  // Generate realistic dates
  const startDate = getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31));
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 365) + 30); // 30-395 days duration

  const creationDate = new Date(startDate);
  creationDate.setDate(
    creationDate.getDate() - Math.floor(Math.random() * 90) - 30,
  ); // 30-120 days before start

  const dropDate = new Date(startDate);
  dropDate.setDate(dropDate.getDate() - Math.floor(Math.random() * 30) - 7); // 7-37 days before start

  const year = startDate.getFullYear();
  const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
  const suffix = getRandomElement([
    "A1",
    "B2",
    "C3",
    "D4",
    "E5",
    "F6",
    "G7",
    "H8",
    "I9",
    "J0",
  ]);

  // Generate realistic revenue based on campaign type
  let baseRevenue;
  if (typeOfCampaign === "Guaranteed") {
    baseRevenue = getRandomNumber(50000, 200000);
  } else if (typeOfCampaign === "Non-Guaranteed") {
    baseRevenue = getRandomNumber(20000, 100000);
  } else {
    baseRevenue = getRandomNumber(10000, 80000);
  }

  // Generate fill rate and CPM based on campaign type and status
  let fillRate, cpm;
  if (typeOfCampaign === "Guaranteed") {
    fillRate = getRandomNumber(95, 100);
    cpm = getRandomNumber(30, 50);
  } else if (typeOfCampaign === "Non-Guaranteed") {
    fillRate = getRandomNumber(80, 95);
    cpm = getRandomNumber(20, 40);
  } else {
    fillRate = null;
    cpm = null;
  }

  // Adjust fill rate and CPM based on status
  if (status === "Draft" || status === "Pending") {
    fillRate = null;
    cpm = null;
  } else if (status === "Cancelled") {
    fillRate = null;
    cpm = null;
  }

  const campaign = {
    campaignName: generateCampaignName(advertiser, brand, year, month, suffix),
    campaignId: generateCampaignId(),
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    typeOfCampaign: typeOfCampaign,
    advertiser: advertiser,
    brand: brand,
    productCategory: getRandomElement(productCategories),
    agency: getRandomElement(agencies),
    userOfLastStatusUpdate: getRandomElement(people),
    dateTimeOfLastStatusUpdate: generateDateTime(),
    createdBy: getRandomElement(people),
    creationDate: formatDate(creationDate),
    dropDate: formatDate(dropDate),
    adminPerson: getRandomElement(people),
    salesPerson: getRandomElement(people),
    totalRevenue: Math.round(baseRevenue * 100) / 100,
    fillRate: fillRate ? Math.round(fillRate * 10) / 10 : null,
    cpm: cpm ? Math.round(cpm * 10) / 10 : null,
    status: status,
  };

  campaigns.push(campaign);
}

// Write to file
fs.writeFileSync("campaigns.json", JSON.stringify(campaigns, null, 2));
console.log(
  `Generated ${campaigns.length} campaigns and saved to campaigns.json`,
);
