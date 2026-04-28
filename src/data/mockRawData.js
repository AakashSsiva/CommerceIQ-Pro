export const generateMockRawData = () => {
  const regions = ['North', 'South', 'East', 'West', 'International'];
  const channels = ['Website', 'Mobile App', 'Marketplace', 'Retail Partner'];
  const categories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Accessories'];
  const genders = ['Male', 'Female', 'Other'];
  
  const products = {
    'Electronics': ['Wireless Headphones', 'Smart Watch Series 7', 'Mechanical Keyboard'],
    'Fashion': ['Cotton T-Shirt', 'Denim Jacket', 'Running Shoes'],
    'Home': ['Ergonomic Chair', 'Desk Lamp', 'Coffee Maker'],
    'Beauty': ['Face Serum', 'Organic Shampoo'],
    'Accessories': ['Leather Wallet', 'Sunglasses']
  };

  const data = [];
  const now = new Date();
  
  for (let i = 1; i <= 300; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const product = products[category][Math.floor(Math.random() * products[category].length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    const channel = channels[Math.floor(Math.random() * channels.length)];
    const gender = genders[Math.floor(Math.random() * genders.length)];
    
    // Generate date within last 6 months
    const date = new Date(now.getTime() - Math.floor(Math.random() * 180 * 24 * 60 * 60 * 1000));
    
    // Delivery Status logic
    const deliveryDays = Math.floor(Math.random() * 7) + 1;
    let deliveryStatus = 'On Time';
    if (deliveryDays > 4) deliveryStatus = 'Delayed';
    if (deliveryDays > 6) deliveryStatus = 'Critical Delay';

    data.push({
      Order_ID: `ORD-${1000 + i}`,
      Date: date.toISOString().split('T')[0],
      Customer_ID: `CUST-${Math.floor(Math.random() * 1000)}`,
      Gender: gender,
      Region: region,
      Product: product,
      Category: category,
      Quantity: Math.floor(Math.random() * 3) + 1,
      Price: Math.floor(Math.random() * 200) + 20,
      Rating: Math.floor(Math.random() * 5) + 1,
      Delivery_Days: deliveryDays,
      Delivery_Status: deliveryStatus,
      Channel: channel
    });
  }
  
  return data.sort((a, b) => new Date(a.Date) - new Date(b.Date));
};

export const defaultRawData = generateMockRawData();
