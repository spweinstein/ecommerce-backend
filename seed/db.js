import dotenv from "dotenv";
import mongoose from "mongoose";
import Industry from "../models/industry.js";
import ProductCategory from "../models/productCategory.js";
import Shop from "../models/shop.js";
import Product from "../models/product.js";
import User from "../models/user.js";

dotenv.config();

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to database");

    // Find the "spencer" user
    const spencerUser = await User.findOne({ username: "spencer" });
    if (!spencerUser) {
      console.error("User 'spencer' not found. Please create the user first.");
      process.exit(1);
    }
    console.log("Found user: spencer");

    // Clear existing data
    await Industry.deleteMany({});
    await ProductCategory.deleteMany({});
    await Shop.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared existing data");

    // Create Industries
    const electronics = await Industry.create({
      name: "Electronics",
      description: "Electronic devices and gadgets",
    });

    const homeAppliance = await Industry.create({
      name: "Home & Appliance",
      description: "Home appliances and household items",
    });

    const clothing = await Industry.create({
      name: "Clothing",
      description: "Apparel and fashion items",
    });

    const groceries = await Industry.create({
      name: "Groceries",
      description: "Food and grocery items",
    });

    console.log("Industries created");

    // Create Product Categories for Electronics
    const smartphones = await ProductCategory.create({
      name: "Smartphones",
      industry: electronics._id,
    });
    const laptops = await ProductCategory.create({
      name: "Laptops",
      industry: electronics._id,
    });
    const televisions = await ProductCategory.create({
      name: "Televisions",
      industry: electronics._id,
    });
    await ProductCategory.insertMany([
      { name: "Headphones", industry: electronics._id },
      { name: "Cameras", industry: electronics._id },
    ]);

    // Create Product Categories for Home & Appliance
    const refrigerators = await ProductCategory.create({
      name: "Refrigerators",
      industry: homeAppliance._id,
    });
    const washingMachines = await ProductCategory.create({
      name: "Washing Machines",
      industry: homeAppliance._id,
    });
    const furniture = await ProductCategory.create({
      name: "Furniture",
      industry: homeAppliance._id,
    });
    await ProductCategory.insertMany([
      { name: "Microwaves", industry: homeAppliance._id },
      { name: "Air Conditioners", industry: homeAppliance._id },
    ]);

    // Create Product Categories for Clothing
    const outerwear = await ProductCategory.create({
      name: "Outerwear",
      industry: clothing._id,
    });
    const shirts = await ProductCategory.create({
      name: "Shirts",
      industry: clothing._id,
    });
    const pants = await ProductCategory.create({
      name: "Pants",
      industry: clothing._id,
    });
    await ProductCategory.insertMany([
      { name: "Kids' Clothing", industry: clothing._id },
      { name: "Shoes", industry: clothing._id },
      { name: "Accessories", industry: clothing._id },
    ]);

    // Create Product Categories for Groceries
    const fruitsVegetables = await ProductCategory.create({
      name: "Fruits & Vegetables",
      industry: groceries._id,
    });
    const dairyProducts = await ProductCategory.create({
      name: "Dairy Products",
      industry: groceries._id,
    });
    const beverages = await ProductCategory.create({
      name: "Beverages",
      industry: groceries._id,
    });
    await ProductCategory.insertMany([
      { name: "Bakery", industry: groceries._id },
      { name: "Snacks", industry: groceries._id },
    ]);

    console.log("Product categories created");

    // Create Shops for Electronics
    const techGalaxy = await Shop.create({
      user: spencerUser._id,
      name: "Tech Galaxy",
      description: "Your one-stop shop for all electronics",
      address: {
        address1: "123 Tech Street",
        city: "San Francisco",
        region: "CA",
        postalCode: "94102",
        country: "USA",
      },
      industry: electronics._id,
    });

    const gadgetWorld = await Shop.create({
      user: spencerUser._id,
      name: "Gadget World",
      description: "Latest gadgets and electronics",
      address: {
        address1: "456 Innovation Ave",
        city: "Seattle",
        region: "WA",
        postalCode: "98101",
        country: "USA",
      },
      industry: electronics._id,
    });

    // Create Shops for Home & Appliance
    const homeComfort = await Shop.create({
      user: spencerUser._id,
      name: "Home Comfort",
      description: "Quality appliances for your home",
      address: {
        address1: "789 Appliance Blvd",
        city: "Chicago",
        region: "IL",
        postalCode: "60601",
        country: "USA",
      },
      industry: homeAppliance._id,
    });

    const cozyCasa = await Shop.create({
      user: spencerUser._id,
      name: "Cozy Casa",
      description: "Furniture and home essentials",
      address: {
        address1: "321 Home Lane",
        city: "Austin",
        region: "TX",
        postalCode: "73301",
        country: "USA",
      },
      industry: homeAppliance._id,
    });

    // Create Shops for Clothing
    const fashionHub = await Shop.create({
      user: spencerUser._id,
      name: "Fashion Hub",
      description: "Trendy clothing for everyone",
      address: {
        address1: "555 Fashion Ave",
        city: "New York",
        region: "NY",
        postalCode: "10001",
        country: "USA",
      },
      industry: clothing._id,
    });

    const urbanStyles = await Shop.create({
      user: spencerUser._id,
      name: "Urban Styles",
      description: "Modern apparel and accessories",
      address: {
        address1: "888 Style Street",
        city: "Los Angeles",
        region: "CA",
        postalCode: "90001",
        country: "USA",
      },
      industry: clothing._id,
    });

    // Create Shops for Groceries
    const freshMart = await Shop.create({
      user: spencerUser._id,
      name: "Fresh Mart",
      description: "Fresh groceries daily",
      address: {
        address1: "101 Market Street",
        city: "Portland",
        region: "OR",
        postalCode: "97201",
        country: "USA",
      },
      industry: groceries._id,
    });

    const greenGrocer = await Shop.create({
      user: spencerUser._id,
      name: "Green Grocer",
      description: "Organic and fresh produce",
      address: {
        address1: "202 Organic Way",
        city: "Denver",
        region: "CO",
        postalCode: "80201",
        country: "USA",
      },
      industry: groceries._id,
    });

    console.log("Shops created");

    // Create Products for Electronics
    await Product.insertMany([
      // Tech Galaxy - Smartphones
      {
        name: "iPhone 15 Pro",
        description: "Latest Apple flagship smartphone",
        price: 999.99,
        brand: "Apple",
        sku: "IPHONE15PRO-001",
        imgURL: "https://example.com/iphone15pro.jpg",
        category: smartphones._id,
        shop: techGalaxy._id,
        user: spencerUser._id,
      },
      {
        name: "Samsung Galaxy S24",
        description: "Premium Android smartphone",
        price: 899.99,
        brand: "Samsung",
        sku: "GALAXY-S24-001",
        imgURL: "https://example.com/galaxys24.jpg",
        category: smartphones._id,
        shop: techGalaxy._id,
        user: spencerUser._id,
      },
      // Gadget World - Laptops
      {
        name: "MacBook Air M3",
        description: "Lightweight and powerful laptop",
        price: 1299.99,
        brand: "Apple",
        sku: "MACBOOKAIR-M3-001",
        imgURL: "https://example.com/macbookair.jpg",
        category: laptops._id,
        shop: gadgetWorld._id,
        user: spencerUser._id,
      },
      {
        name: "Dell XPS 15",
        description: "High-performance Windows laptop",
        price: 1499.99,
        brand: "Dell",
        sku: "XPS15-001",
        imgURL:
          "data:image/jpeg;base64,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",
        category: laptops._id,
        shop: gadgetWorld._id,
        user: spencerUser._id,
      },
      // Tech Galaxy - Televisions
      {
        name: 'Samsung 65" QLED TV',
        description: "4K Smart TV with vibrant colors",
        price: 1799.99,
        brand: "Samsung",
        sku: "QLED65-001",
        imgURL: "https://example.com/samsungtv.jpg",
        category: televisions._id,
        shop: techGalaxy._id,
        user: spencerUser._id,
      },
    ]);

    // Create Products for Home & Appliance
    await Product.insertMany([
      // Home Comfort - Refrigerators
      {
        name: "LG French Door Refrigerator",
        description: "Large capacity smart refrigerator",
        price: 2499.99,
        brand: "LG",
        sku: "LG-FRIDGE-001",
        imgURL: "https://example.com/lgfridge.jpg",
        category: refrigerators._id,
        shop: homeComfort._id,
        user: spencerUser._id,
      },
      {
        name: "Whirlpool Side-by-Side Refrigerator",
        description: "Energy efficient refrigerator",
        price: 1899.99,
        brand: "Whirlpool",
        sku: "WP-FRIDGE-001",
        imgURL: "https://example.com/whirlpoolfridge.jpg",
        category: refrigerators._id,
        shop: homeComfort._id,
        user: spencerUser._id,
      },
      // Home Comfort - Washing Machines
      {
        name: "Samsung Front Load Washer",
        description: "High efficiency washing machine",
        price: 899.99,
        brand: "Samsung",
        sku: "SAMSUNG-WASH-001",
        imgURL: "https://example.com/samsungwasher.jpg",
        category: washingMachines._id,
        shop: homeComfort._id,
        user: spencerUser._id,
      },
      // Cozy Casa - Furniture
      {
        name: "Modern Sectional Sofa",
        description: "Comfortable L-shaped sofa",
        price: 1299.99,
        brand: "Cozy Living",
        sku: "SOFA-SEC-001",
        imgURL: "https://example.com/sectional.jpg",
        category: furniture._id,
        shop: cozyCasa._id,
        user: spencerUser._id,
      },
      {
        name: "Oak Dining Table Set",
        description: "6-seater solid wood dining set",
        price: 799.99,
        brand: "Woodland",
        sku: "DINING-OAK-001",
        imgURL: "https://example.com/diningtable.jpg",
        category: furniture._id,
        shop: cozyCasa._id,
        user: spencerUser._id,
      },
    ]);

    // Create Products for Clothing
    await Product.insertMany([
      // Fashion Hub - Outerwear
      {
        name: "Winter Parka Jacket",
        description: "Warm insulated winter coat",
        price: 189.99,
        brand: "North Peak",
        sku: "PARKA-WIN-001",
        imgURL: "https://example.com/parka.jpg",
        category: outerwear._id,
        shop: fashionHub._id,
        user: spencerUser._id,
      },
      {
        name: "Leather Bomber Jacket",
        description: "Classic leather jacket",
        price: 249.99,
        brand: "Urban Rider",
        sku: "BOMBER-LEATH-001",
        imgURL: "https://example.com/bomber.jpg",
        category: outerwear._id,
        shop: fashionHub._id,
        user: spencerUser._id,
      },
      // Urban Styles - Shirts
      {
        name: "Cotton Oxford Shirt",
        description: "Classic button-down shirt",
        price: 49.99,
        brand: "Classic Fit",
        sku: "SHIRT-OXF-001",
        imgURL: "https://example.com/oxford.jpg",
        category: shirts._id,
        shop: urbanStyles._id,
        user: spencerUser._id,
      },
      {
        name: "Flannel Check Shirt",
        description: "Comfortable flannel shirt",
        price: 39.99,
        brand: "Outdoor Life",
        sku: "SHIRT-FLAN-001",
        imgURL: "https://example.com/flannel.jpg",
        category: shirts._id,
        shop: urbanStyles._id,
        user: spencerUser._id,
      },
      // Fashion Hub - Pants
      {
        name: "Slim Fit Chinos",
        description: "Modern fit casual pants",
        price: 59.99,
        brand: "Modern Wear",
        sku: "CHINO-SLIM-001",
        imgURL: "https://example.com/chinos.jpg",
        category: pants._id,
        shop: fashionHub._id,
        user: spencerUser._id,
      },
      {
        name: "Classic Denim Jeans",
        description: "Timeless blue jeans",
        price: 69.99,
        brand: "Denim Co",
        sku: "JEANS-BLUE-001",
        imgURL: "https://example.com/jeans.jpg",
        category: pants._id,
        shop: fashionHub._id,
        user: spencerUser._id,
      },
    ]);

    // Create Products for Groceries
    await Product.insertMany([
      // Fresh Mart - Fruits & Vegetables
      {
        name: "Organic Apples",
        description: "Fresh organic Gala apples, 3 lb bag",
        price: 5.99,
        brand: "Fresh Farms",
        sku: "APPLE-ORG-001",
        imgURL: "https://example.com/apples.jpg",
        weight: 3,
        category: fruitsVegetables._id,
        shop: freshMart._id,
        user: spencerUser._id,
      },
      {
        name: "Mixed Salad Greens",
        description: "Organic mixed lettuce, 1 lb",
        price: 3.99,
        brand: "Green Valley",
        sku: "SALAD-MIX-001",
        imgURL: "https://example.com/salad.jpg",
        weight: 1,
        category: fruitsVegetables._id,
        shop: freshMart._id,
        user: spencerUser._id,
      },
      // Green Grocer - Dairy Products
      {
        name: "Organic Whole Milk",
        description: "Fresh organic whole milk, 1 gallon",
        price: 6.99,
        brand: "Happy Cow",
        sku: "MILK-ORG-001",
        imgURL: "https://example.com/milk.jpg",
        category: dairyProducts._id,
        shop: greenGrocer._id,
        user: spencerUser._id,
      },
      {
        name: "Greek Yogurt",
        description: "Plain Greek yogurt, 32 oz",
        price: 5.49,
        brand: "Greek Fresh",
        sku: "YOGURT-GREEK-001",
        imgURL: "https://example.com/yogurt.jpg",
        category: dairyProducts._id,
        shop: greenGrocer._id,
        user: spencerUser._id,
      },
      // Fresh Mart - Beverages
      {
        name: "Organic Orange Juice",
        description: "Fresh squeezed orange juice, 64 oz",
        price: 7.99,
        brand: "Sunny Grove",
        sku: "OJ-ORG-001",
        imgURL: "https://example.com/oj.jpg",
        category: beverages._id,
        shop: freshMart._id,
        user: spencerUser._id,
      },
      {
        name: "Sparkling Water 12-Pack",
        description: "Assorted flavors sparkling water",
        price: 8.99,
        brand: "Bubbles",
        sku: "WATER-SPAR-001",
        imgURL: "https://example.com/sparklingwater.jpg",
        category: beverages._id,
        shop: freshMart._id,
        user: spencerUser._id,
      },
    ]);

    console.log("Products created");
    console.log("Database seeded successfully!");
    console.log(`Created:
  - 4 Industries
  - 20 Product Categories
  - 8 Shops (for user: spencer)
  - 26 Products`);

    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
