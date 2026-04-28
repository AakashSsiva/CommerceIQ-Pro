export const generateMockData = (count = 250) => {
  const regions   = ['North', 'South', 'East', 'West'];
  const channels  = ['Website', 'Mobile App', 'Marketplace', 'Retail Partner'];
  const categories= ['Electronics', 'Fashion', 'Home', 'Beauty', 'Accessories'];
  const genders   = ['Male', 'Female', 'Other'];
  const products  = {
    Electronics:  ['Wireless Headphones', 'Smart Watch', 'Laptop Stand', 'Bluetooth Speaker', 'USB-C Hub'],
    Fashion:      ['Running Sneakers', 'Leather Wallet', 'Sunglasses', 'Denim Jacket', 'Sports Tee'],
    Home:         ['Ergonomic Chair', 'Desk Lamp', 'Air Purifier', 'Coffee Maker', 'Wall Clock'],
    Beauty:       ['Face Serum', 'Lip Gloss', 'Moisturizer SPF', 'Eye Cream', 'Vitamin C Gel'],
    Accessories:  ['Laptop Bag', 'Phone Case', 'Cable Organizer', 'Travel Pillow', 'Wireless Charger'],
  };

  const data = [];
  const now  = new Date();

  for (let i = 1; i <= count; i++) {
    const cat  = categories[Math.floor(Math.random() * categories.length)];
    const prod = products[cat][Math.floor(Math.random() * products[cat].length)];
    // Spread dates evenly over the last 12 months so all months are populated
    const monthOffset = Math.floor((i / count) * 365);
    const date = new Date(now.getTime() - monthOffset * 24 * 60 * 60 * 1000);
    const qty  = Math.floor(Math.random() * 4) + 1;
    const price = Math.floor(Math.random() * 250) + 20;

    data.push({
      Order_ID:      `INV-${100000 + i}`,
      Date:          date.toISOString().split('T')[0],
      Region:        regions[Math.floor(Math.random() * regions.length)],
      Channel:       channels[Math.floor(Math.random() * channels.length)],
      Category:      cat,
      Gender:        genders[Math.floor(Math.random() * genders.length)],
      Product:       prod,
      Price:         price,
      Quantity:      qty,
      Revenue:       price * qty,
      Rating:        Math.floor(Math.random() * 5) + 1,
      Delivery_Days: Math.floor(Math.random() * 6) + 1,
    });
  }

  // Inject two realistic-looking duplicates for duplicate detection demo
  data.push({ ...data[47], Order_ID: data[47].Order_ID });
  data.push({ ...data[112], Order_ID: data[112].Order_ID });

  return data;
};

export const defaultMockData = generateMockData();
