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
    featured: true
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
    featured: true
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
    featured: true
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
    featured: false
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
    featured: false
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
    featured: false
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
    featured: false
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
    featured: true
  }
];

export const featuredProducts = products.filter(p => p.featured);
