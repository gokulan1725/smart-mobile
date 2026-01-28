import { Product } from '@/types/product';
import onePlus12 from '@/assets/phones/oneplus-12.png';
import iPhone15Pro from '@/assets/phones/iphone-15-pro.png';
import samsungS24Ultra from '@/assets/phones/samsung-s24-ultra.png';
import pixel8Pro from '@/assets/phones/pixel-8-pro.png';
import xiaomi14Ultra from '@/assets/phones/xiaomi-14-ultra.png';
import nothingPhone2 from '@/assets/phones/nothing-phone-2.png';
import realmeGT5Pro from '@/assets/phones/realme-gt5-pro.png';
import vivoX100Pro from '@/assets/phones/vivo-x100-pro.png';

export const products: Product[] = [
  // FLAGSHIP PHONES
  {
    id: 'phone_001',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    price: 45999,
    originalPrice: 52999,
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      battery: '5400mAh',
      camera: '50MP Triple',
      display: '6.82" AMOLED 120Hz'
    },
    images: [onePlus12],
    inStock: true,
    stockCount: 15,
    rating: 4.7,
    reviewCount: 2341,
    description: 'Experience flagship performance with the OnePlus 12. Featuring the latest Snapdragon processor and stunning display.',
    colors: ['Flowy Emerald', 'Silky Black'],
    featured: true,
    isNew: false
  },
  {
    id: 'phone_002',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 159900,
    specs: {
      processor: 'A17 Pro',
      ram: '8GB',
      storage: '256GB',
      battery: '4422mAh',
      camera: '48MP Triple',
      display: '6.7" Super Retina XDR'
    },
    images: [iPhone15Pro],
    inStock: true,
    stockCount: 8,
    rating: 4.9,
    reviewCount: 5672,
    description: 'The most powerful iPhone ever. Titanium design, A17 Pro chip, and the most advanced camera system.',
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    featured: true,
    isNew: false
  },
  {
    id: 'phone_003',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 134999,
    originalPrice: 144999,
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '512GB',
      battery: '5000mAh',
      camera: '200MP Quad',
      display: '6.8" Dynamic AMOLED 2X'
    },
    images: [samsungS24Ultra],
    inStock: true,
    stockCount: 12,
    rating: 4.8,
    reviewCount: 3891,
    description: 'Galaxy AI is here. The ultimate Ultra experience with built-in S Pen and revolutionary AI features.',
    colors: ['Titanium Gray', 'Titanium Black', 'Titanium Violet', 'Titanium Yellow'],
    featured: true,
    isNew: false
  },
  {
    id: 'phone_004',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    price: 106999,
    specs: {
      processor: 'Google Tensor G3',
      ram: '12GB',
      storage: '256GB',
      battery: '5050mAh',
      camera: '50MP Triple',
      display: '6.7" LTPO OLED 120Hz'
    },
    images: [pixel8Pro],
    inStock: true,
    stockCount: 20,
    rating: 4.6,
    reviewCount: 1823,
    description: 'The best of Google AI in a phone. Stunning photos, powerful features, and 7 years of updates.',
    colors: ['Obsidian', 'Porcelain', 'Bay'],
    featured: false,
    isNew: false
  },
  {
    id: 'phone_005',
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    price: 99999,
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      ram: '16GB',
      storage: '512GB',
      battery: '5300mAh',
      camera: '50MP Leica Quad',
      display: '6.73" AMOLED 120Hz'
    },
    images: [xiaomi14Ultra],
    inStock: false,
    stockCount: 0,
    rating: 4.5,
    reviewCount: 892,
    description: 'Photography excellence with Leica optics. Professional-grade camera system in your pocket.',
    colors: ['Black', 'White'],
    featured: false,
    isNew: false
  },
  {
    id: 'phone_006',
    name: 'Nothing Phone (2)',
    brand: 'Nothing',
    price: 44999,
    originalPrice: 49999,
    specs: {
      processor: 'Snapdragon 8+ Gen 1',
      ram: '12GB',
      storage: '256GB',
      battery: '4700mAh',
      camera: '50MP Dual',
      display: '6.7" OLED 120Hz'
    },
    images: [nothingPhone2],
    inStock: true,
    stockCount: 25,
    rating: 4.4,
    reviewCount: 1456,
    description: 'Unique Glyph interface. Stand out with a phone that lights up your life.',
    colors: ['White', 'Dark Grey'],
    featured: false,
    isNew: false
  },
  {
    id: 'phone_007',
    name: 'Realme GT 5 Pro',
    brand: 'Realme',
    price: 35999,
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      battery: '5400mAh',
      camera: '50MP Triple',
      display: '6.78" AMOLED 144Hz'
    },
    images: [realmeGT5Pro],
    inStock: true,
    stockCount: 30,
    rating: 4.3,
    reviewCount: 678,
    description: 'Flagship killer with top-tier performance at an unbeatable price.',
    colors: ['Pioneer Green', 'Mars White'],
    featured: false,
    isNew: false
  },
  {
    id: 'phone_008',
    name: 'Vivo X100 Pro',
    brand: 'Vivo',
    price: 89999,
    specs: {
      processor: 'Dimensity 9300',
      ram: '16GB',
      storage: '512GB',
      battery: '5400mAh',
      camera: '50MP Zeiss Triple',
      display: '6.78" AMOLED 120Hz'
    },
    images: [vivoX100Pro],
    inStock: true,
    stockCount: 18,
    rating: 4.6,
    reviewCount: 1234,
    description: 'Zeiss optics perfection. Capture professional-quality portraits and landscapes.',
    colors: ['Asteroid Black', 'Stardust Blue'],
    featured: true,
    isNew: false
  },
  // NEW 2024/2025 FLAGSHIPS
  {
    id: 'phone_009',
    name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    price: 179900,
    specs: {
      processor: 'A18 Pro',
      ram: '8GB',
      storage: '256GB',
      battery: '4685mAh',
      camera: '48MP Quad',
      display: '6.9" Super Retina XDR'
    },
    images: [iPhone15Pro],
    inStock: true,
    stockCount: 5,
    rating: 4.9,
    reviewCount: 234,
    description: 'The biggest display ever on iPhone. A18 Pro chip with groundbreaking Apple Intelligence.',
    colors: ['Desert Titanium', 'Natural Titanium', 'White Titanium', 'Black Titanium'],
    featured: true,
    isNew: true
  },
  {
    id: 'phone_010',
    name: 'Samsung Galaxy S25 Ultra',
    brand: 'Samsung',
    price: 149999,
    specs: {
      processor: 'Snapdragon 8 Elite',
      ram: '16GB',
      storage: '512GB',
      battery: '5000mAh',
      camera: '200MP Quad',
      display: '6.9" Dynamic AMOLED 2X'
    },
    images: [samsungS24Ultra],
    inStock: true,
    stockCount: 10,
    rating: 4.8,
    reviewCount: 156,
    description: 'Next-gen Galaxy AI with the most powerful Snapdragon ever. Titanium design, S Pen included.',
    colors: ['Titanium Silver', 'Titanium Black', 'Titanium Blue', 'Titanium Pink'],
    featured: true,
    isNew: true
  },
  {
    id: 'phone_011',
    name: 'Google Pixel 9 Pro XL',
    brand: 'Google',
    price: 124999,
    specs: {
      processor: 'Google Tensor G4',
      ram: '16GB',
      storage: '256GB',
      battery: '5060mAh',
      camera: '50MP Triple',
      display: '6.8" LTPO OLED 120Hz'
    },
    images: [pixel8Pro],
    inStock: true,
    stockCount: 15,
    rating: 4.7,
    reviewCount: 445,
    description: 'AI-first smartphone with Gemini built-in. Best-in-class computational photography.',
    colors: ['Obsidian', 'Porcelain', 'Hazel', 'Rose Quartz'],
    featured: false,
    isNew: true
  },
  {
    id: 'phone_012',
    name: 'OnePlus 13',
    brand: 'OnePlus',
    price: 59999,
    specs: {
      processor: 'Snapdragon 8 Elite',
      ram: '16GB',
      storage: '256GB',
      battery: '6000mAh',
      camera: '50MP Hasselblad Triple',
      display: '6.82" AMOLED 120Hz'
    },
    images: [onePlus12],
    inStock: true,
    stockCount: 20,
    rating: 4.8,
    reviewCount: 189,
    description: 'Never Settle. 100W SUPERVOOC charging and 6000mAh battery for all-day power.',
    colors: ['Midnight Ocean', 'Arctic Dawn', 'Black Eclipse'],
    featured: true,
    isNew: true
  },
  // GAMING PHONES
  {
    id: 'phone_013',
    name: 'ASUS ROG Phone 8 Pro',
    brand: 'ASUS',
    price: 89999,
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      ram: '24GB',
      storage: '1TB',
      battery: '5500mAh',
      camera: '50MP Triple',
      display: '6.78" AMOLED 165Hz'
    },
    images: [realmeGT5Pro],
    inStock: true,
    stockCount: 8,
    rating: 4.7,
    reviewCount: 567,
    description: 'Ultimate gaming powerhouse with AirTriggers, vapor chamber cooling, and 165Hz display.',
    colors: ['Phantom Black', 'Rebel Grey'],
    featured: false,
    isNew: true
  },
  {
    id: 'phone_014',
    name: 'RedMagic 9 Pro',
    brand: 'RedMagic',
    price: 64999,
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      ram: '16GB',
      storage: '512GB',
      battery: '6500mAh',
      camera: '50MP Triple',
      display: '6.8" AMOLED 120Hz'
    },
    images: [nothingPhone2],
    inStock: true,
    stockCount: 12,
    rating: 4.5,
    reviewCount: 342,
    description: 'ICE 13.5 multi-dimensional cooling for sustained peak performance in gaming.',
    colors: ['Matte Black', 'Transparent'],
    featured: false,
    isNew: true
  },
  {
    id: 'phone_015',
    name: 'Lenovo Legion Phone 3 Pro',
    brand: 'Lenovo',
    price: 74999,
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      ram: '18GB',
      storage: '512GB',
      battery: '6000mAh',
      camera: '50MP Dual',
      display: '6.78" AMOLED 165Hz'
    },
    images: [vivoX100Pro],
    inStock: true,
    stockCount: 6,
    rating: 4.4,
    reviewCount: 234,
    description: 'Dual cooling fans and ultrasonic shoulder triggers for pro-level mobile gaming.',
    colors: ['Storm Black', 'Ultimate White'],
    featured: false,
    isNew: true
  },
  // MID-RANGE PHONES
  {
    id: 'phone_016',
    name: 'Samsung Galaxy A55',
    brand: 'Samsung',
    price: 39999,
    originalPrice: 44999,
    specs: {
      processor: 'Exynos 1480',
      ram: '8GB',
      storage: '256GB',
      battery: '5000mAh',
      camera: '50MP Triple',
      display: '6.6" Super AMOLED 120Hz'
    },
    images: [samsungS24Ultra],
    inStock: true,
    stockCount: 35,
    rating: 4.4,
    reviewCount: 1234,
    description: 'Premium Galaxy experience at a mid-range price. IP67 water resistance included.',
    colors: ['Awesome Ice Blue', 'Awesome Lilac', 'Awesome Navy'],
    featured: false,
    isNew: false
  },
  {
    id: 'phone_017',
    name: 'Xiaomi Redmi Note 13 Pro+',
    brand: 'Xiaomi',
    price: 29999,
    originalPrice: 34999,
    specs: {
      processor: 'Dimensity 7200',
      ram: '12GB',
      storage: '256GB',
      battery: '5000mAh',
      camera: '200MP Triple',
      display: '6.67" AMOLED 120Hz'
    },
    images: [xiaomi14Ultra],
    inStock: true,
    stockCount: 50,
    rating: 4.5,
    reviewCount: 2156,
    description: '200MP camera on a budget! 120W HyperCharge for ultra-fast charging.',
    colors: ['Midnight Black', 'Moonlight White', 'Aurora Purple'],
    featured: false,
    isNew: false
  },
  {
    id: 'phone_018',
    name: 'Motorola Edge 50 Pro',
    brand: 'Motorola',
    price: 34999,
    specs: {
      processor: 'Snapdragon 7 Gen 3',
      ram: '12GB',
      storage: '256GB',
      battery: '4500mAh',
      camera: '50MP Triple',
      display: '6.7" pOLED 144Hz'
    },
    images: [nothingPhone2],
    inStock: true,
    stockCount: 22,
    rating: 4.3,
    reviewCount: 567,
    description: 'Iconic Motorola design with 144Hz display and 125W TurboPower charging.',
    colors: ['Luxe Lavender', 'Moonlight Pearl', 'Black Beauty'],
    featured: false,
    isNew: true
  },
  {
    id: 'phone_019',
    name: 'iQOO 12',
    brand: 'iQOO',
    price: 52999,
    originalPrice: 59999,
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      battery: '5000mAh',
      camera: '50MP Triple',
      display: '6.78" AMOLED 144Hz'
    },
    images: [vivoX100Pro],
    inStock: true,
    stockCount: 18,
    rating: 4.6,
    reviewCount: 892,
    description: 'Flagship performance at mid-range pricing. 120W FlashCharge included.',
    colors: ['Legend', 'Alpha'],
    featured: false,
    isNew: false
  },
  {
    id: 'phone_020',
    name: 'Poco F6 Pro',
    brand: 'Poco',
    price: 29999,
    specs: {
      processor: 'Snapdragon 8 Gen 2',
      ram: '12GB',
      storage: '256GB',
      battery: '5000mAh',
      camera: '50MP Triple',
      display: '6.67" AMOLED 120Hz'
    },
    images: [xiaomi14Ultra],
    inStock: true,
    stockCount: 40,
    rating: 4.5,
    reviewCount: 1567,
    description: 'Everything you need, nothing you dont. Flagship specs at Poco prices.',
    colors: ['Black', 'White'],
    featured: false,
    isNew: true
  },
  // BUDGET PHONES
  {
    id: 'phone_021',
    name: 'Redmi 13C',
    brand: 'Xiaomi',
    price: 9999,
    specs: {
      processor: 'MediaTek Helio G85',
      ram: '6GB',
      storage: '128GB',
      battery: '5000mAh',
      camera: '50MP Dual',
      display: '6.74" IPS LCD 90Hz'
    },
    images: [xiaomi14Ultra],
    inStock: true,
    stockCount: 100,
    rating: 4.1,
    reviewCount: 3456,
    description: 'Best budget phone with massive battery and capable camera.',
    colors: ['Starfrost White', 'Startrail Green', 'Startrail Blue'],
    featured: false,
    isNew: false
  },
  {
    id: 'phone_022',
    name: 'Realme Narzo 70x',
    brand: 'Realme',
    price: 12999,
    specs: {
      processor: 'MediaTek Dimensity 6100+',
      ram: '6GB',
      storage: '128GB',
      battery: '5000mAh',
      camera: '50MP Dual',
      display: '6.72" IPS LCD 120Hz'
    },
    images: [realmeGT5Pro],
    inStock: true,
    stockCount: 60,
    rating: 4.2,
    reviewCount: 1234,
    description: '5G at an unbeatable price. 120Hz display for smooth scrolling.',
    colors: ['Ice Blue', 'Forest Green'],
    featured: false,
    isNew: true
  },
  {
    id: 'phone_023',
    name: 'Samsung Galaxy M35',
    brand: 'Samsung',
    price: 17999,
    specs: {
      processor: 'Exynos 1380',
      ram: '6GB',
      storage: '128GB',
      battery: '6000mAh',
      camera: '50MP Triple',
      display: '6.6" Super AMOLED 120Hz'
    },
    images: [samsungS24Ultra],
    inStock: true,
    stockCount: 45,
    rating: 4.3,
    reviewCount: 987,
    description: 'Monster battery with 6000mAh. Samsung quality at an affordable price.',
    colors: ['Moonlight Blue', 'Thunder Grey'],
    featured: false,
    isNew: true
  }
];

export const featuredProducts = products.filter(p => p.featured);
export const newArrivals = products.filter(p => p.isNew);
export const dealsProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price);
