export const PHONE_BRANDS = [
  "Vivo",
  "Samsung",
  "Redmi",
  "Realme",
  "OnePlus",
  "OPPO",
  "Motorola",
  "iQOO",
  "Apple",
  "POCO",
  "Nothing",
  "Infinix",
  "Tecno"
];

export const PHONE_DATABASE = {
  "Vivo": [
    {
      model: "V40 5G",
      name: "Vivo V40 5G",
      price: "34999",
      description: "Vivo V40 5G features co-engineered ZEISS optics with a 50MP OIS main camera and 50MP ultra-wide sensor. Powered by Snapdragon 7 Gen 3 with a 5500mAh BlueVolt battery and 80W FlashCharge in an ultra-slim 7.58mm 3D curved design with IP68 water resistance.",
      specs: [
        { label: "Display", value: "6.78-inch 1.5K 120Hz 3D Curved AMOLED, 4500 nits peak brightness" },
        { label: "Processor", value: "Qualcomm Snapdragon 7 Gen 3 (4nm)" },
        { label: "Rear Camera", value: "50MP ZEISS OIS (f/1.88) + 50MP ZEISS Ultra Wide-Angle (f/2.0)" },
        { label: "Front Camera", value: "50MP ZEISS Group Selfie Camera (f/2.0)" },
        { label: "Battery & Charging", value: "5500 mAh BlueVolt Battery with 80W FlashCharge" },
        { label: "Operating System", value: "Funtouch OS 14 based on Android 14" },
        { label: "Durability", value: "IP68 Dust and Water Resistance" },
        { label: "Network & SIM", value: "5G Dual SIM, Wi-Fi 6, Bluetooth 5.4" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "34999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "36999", label: "8 GB RAM · 256 GB Storage" },
        { ram: "12 GB", storage: "512 GB", price: "41999", label: "12 GB RAM · 512 GB Storage" }
      ]
    },
    {
      model: "V40 Pro 5G",
      name: "Vivo V40 Pro 5G",
      price: "49999",
      description: "Vivo V40 Pro 5G delivers flagship photography with triple 50MP ZEISS cameras including a dedicated 50MP telephoto portrait sensor. Equipped with MediaTek Dimensity 9200+, a 5500mAh battery, 80W FlashCharge, and IP68 protection.",
      specs: [
        { label: "Display", value: "6.78-inch 1.5K 120Hz Curved AMOLED, 4500 nits peak" },
        { label: "Processor", value: "MediaTek Dimensity 9200+ Flagship 4nm Processor" },
        { label: "Rear Camera", value: "50MP Sony IMX921 OIS + 50MP Telephoto OIS + 50MP Ultra-Wide" },
        { label: "Front Camera", value: "50MP ZEISS Autofocus Selfie Camera" },
        { label: "Battery & Charging", value: "5500 mAh Battery, 80W FlashCharge" },
        { label: "Operating System", value: "Funtouch OS 14 (Android 14)" },
        { label: "Build", value: "IP68 Water & Dust Resistant, 3D Curved Glass" }
      ],
      variants: [
        { ram: "8 GB", storage: "256 GB", price: "49999", label: "8 GB RAM · 256 GB Storage" },
        { ram: "12 GB", storage: "512 GB", price: "55999", label: "12 GB RAM · 512 GB Storage" }
      ]
    },
    {
      model: "T3 Pro 5G",
      name: "Vivo T3 Pro 5G",
      price: "24999",
      description: "Vivo T3 Pro 5G comes with a 120Hz 3D curved AMOLED display, Snapdragon 7 Gen 3 processor, 50MP Sony IMX882 OIS camera, and a massive 5500mAh battery with 80W fast charging in an elegant vegan leather finish.",
      specs: [
        { label: "Display", value: "6.77-inch 3D Curved 120Hz AMOLED, 4500 nits local peak" },
        { label: "Processor", value: "Qualcomm Snapdragon 7 Gen 3" },
        { label: "Rear Camera", value: "50MP Sony IMX882 OIS + 8MP Ultra-Wide" },
        { label: "Front Camera", value: "16MP HD Selfie Camera" },
        { label: "Battery & Charging", value: "5500 mAh Battery with 80W FlashCharge" },
        { label: "Audio", value: "Dual Stereo Speakers with 300% Ultra Volume" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "24999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "26999", label: "8 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "T3 5G",
      name: "Vivo T3 5G",
      price: "19999",
      description: "Vivo T3 5G brings segment-leading speed with MediaTek Dimensity 7200 processor, 50MP Sony OIS anti-shake camera with 4K recording, 120Hz AMOLED screen, and 44W FlashCharge.",
      specs: [
        { label: "Display", value: "6.67-inch FHD+ 120Hz AMOLED, 1800 nits brightness" },
        { label: "Processor", value: "MediaTek Dimensity 7200 (4nm)" },
        { label: "Rear Camera", value: "50MP Sony IMX882 with OIS + 2MP Bokeh" },
        { label: "Front Camera", value: "16MP Selfie Camera" },
        { label: "Battery & Charging", value: "5000 mAh Battery with 44W FlashCharge" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "19999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "21999", label: "8 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "T3x 5G",
      name: "Vivo T3x 5G",
      price: "13499",
      description: "Vivo T3x 5G is a power-packed 5G phone featuring Qualcomm Snapdragon 6 Gen 1, an enormous 6000mAh battery with 44W fast charging, 120Hz Ultra Vision display, and Dual Stereo Speakers.",
      specs: [
        { label: "Display", value: "6.72-inch FHD+ 120Hz Ultra Vision Display" },
        { label: "Processor", value: "Qualcomm Snapdragon 6 Gen 1 (4nm)" },
        { label: "Rear Camera", value: "50MP HD Main Camera + 2MP Bokeh" },
        { label: "Front Camera", value: "8MP Selfie Camera" },
        { label: "Battery & Charging", value: "6000 mAh Battery with 44W FlashCharge" },
        { label: "Durability", value: "IP64 Dust and Splash Resistance" }
      ],
      variants: [
        { ram: "4 GB", storage: "128 GB", price: "13499", label: "4 GB RAM · 128 GB Storage" },
        { ram: "6 GB", storage: "128 GB", price: "14999", label: "6 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "128 GB", price: "16499", label: "8 GB RAM · 128 GB Storage" }
      ]
    },
    {
      model: "Y200 5G",
      name: "Vivo Y200 5G",
      price: "21999",
      description: "Vivo Y200 5G showcases a stylish slim body with Smart Aura Light portrait lighting, 64MP OIS anti-shake camera, 120Hz Ultra Vision AMOLED display, and 44W FlashCharge.",
      specs: [
        { label: "Display", value: "6.67-inch FHD+ 120Hz AMOLED Display" },
        { label: "Processor", value: "Qualcomm Snapdragon 4 Gen 1" },
        { label: "Rear Camera", value: "64MP OIS Camera with Smart Aura Light" },
        { label: "Front Camera", value: "16MP Portrait Selfie Camera" },
        { label: "Battery & Charging", value: "4800 mAh with 44W FlashCharge" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "21999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "23999", label: "8 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "Y28 5G",
      name: "Vivo Y28 5G",
      price: "13999",
      description: "Vivo Y28 5G offers reliable 5G connectivity with MediaTek Dimensity 6020, 50MP crystal-clear camera, dual-tone crystal acrylic design, and a long-lasting 5000mAh battery.",
      specs: [
        { label: "Display", value: "6.56-inch 90Hz High Brightness Display" },
        { label: "Processor", value: "MediaTek Dimensity 6020 5G" },
        { label: "Rear Camera", value: "50MP Main + 2MP Bokeh" },
        { label: "Battery & Charging", value: "5000 mAh Battery, 15W Fast Charge" }
      ],
      variants: [
        { ram: "4 GB", storage: "128 GB", price: "13999", label: "4 GB RAM · 128 GB Storage" },
        { ram: "6 GB", storage: "128 GB", price: "15499", label: "6 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "128 GB", price: "16999", label: "8 GB RAM · 128 GB Storage" }
      ]
    }
  ],

  "Samsung": [
    {
      model: "Galaxy S24 5G",
      name: "Samsung Galaxy S24 5G",
      price: "64999",
      description: "Samsung Galaxy S24 5G introduces revolutionary Galaxy AI features including Circle to Search, Live Translate, and Generative Edit. Built with an Armor Aluminum frame, Dynamic AMOLED 2X 120Hz display, and 50MP triple camera system.",
      specs: [
        { label: "Display", value: "6.2-inch FHD+ Dynamic AMOLED 2X, 1-120Hz Adaptive, 2600 nits" },
        { label: "Processor", value: "Samsung Exynos 2400 Deca-Core / Snapdragon 8 Gen 3" },
        { label: "Rear Camera", value: "50MP OIS Wide + 12MP Ultra-Wide + 10MP 3X Telephoto OIS" },
        { label: "Front Camera", value: "12MP Dual Pixel AF Selfie Camera" },
        { label: "Battery & Charging", value: "4000 mAh Battery with Fast Wireless & 25W Wired Charging" },
        { label: "Durability", value: "IP68 Water & Dust Resistant, Armor Aluminum 2.0" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "64999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "69999", label: "8 GB RAM · 256 GB Storage" },
        { ram: "8 GB", storage: "512 GB", price: "79999", label: "8 GB RAM · 512 GB Storage" }
      ]
    },
    {
      model: "Galaxy A55 5G",
      name: "Samsung Galaxy A55 5G",
      price: "39999",
      description: "Samsung Galaxy A55 5G delivers premium metal frame design with Gorilla Glass Victus+, brilliant 6.6-inch Super AMOLED 120Hz display, 50MP OIS camera with Nightography, and Samsung Knox Vault security.",
      specs: [
        { label: "Display", value: "6.6-inch FHD+ Super AMOLED, 120Hz Refresh Rate, Vision Booster" },
        { label: "Processor", value: "Samsung Exynos 1480 (4nm) with AMD Xclipse GPU" },
        { label: "Rear Camera", value: "50MP OIS Main + 12MP Ultra-Wide + 5MP Macro" },
        { label: "Front Camera", value: "32MP High Resolution Selfie Camera" },
        { label: "Battery & Charging", value: "5000 mAh Battery with 25W Fast Charging" },
        { label: "Build & Security", value: "IP67 Water & Dust Resistance, Metal Frame, Knox Vault" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "39999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "42999", label: "8 GB RAM · 256 GB Storage" },
        { ram: "12 GB", storage: "256 GB", price: "45999", label: "12 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "Galaxy A35 5G",
      name: "Samsung Galaxy A35 5G",
      price: "27999",
      description: "Samsung Galaxy A35 5G features a premium glass back, bright 120Hz Super AMOLED screen, 50MP OIS camera with 4K video recording, Exynos 1380 chipset, and 5000mAh battery with IP67 water resistance.",
      specs: [
        { label: "Display", value: "6.6-inch Super AMOLED, 120Hz, 1000 nits HBM" },
        { label: "Processor", value: "Samsung Exynos 1380 (5nm)" },
        { label: "Rear Camera", value: "50MP OIS Main + 8MP Ultra-Wide + 5MP Macro" },
        { label: "Front Camera", value: "13MP Selfie Camera" },
        { label: "Battery & Charging", value: "5000 mAh with 25W Fast Charging" },
        { label: "Protection", value: "Corning Gorilla Glass Victus+, IP67 Rating" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "27999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "30999", label: "8 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "Galaxy M35 5G",
      name: "Samsung Galaxy M35 5G",
      price: "19999",
      description: "Samsung Galaxy M35 5G packs a monstrous 6000mAh battery, 120Hz sAMOLED display, 50MP No Shake Cam (OIS), Vapor Cooling Chamber, and Samsung Knox security with 4 OS upgrades guaranteed.",
      specs: [
        { label: "Display", value: "6.6-inch FHD+ 120Hz Super AMOLED, 1000 nits" },
        { label: "Processor", value: "Samsung Exynos 1380 with Vapor Cooling Chamber" },
        { label: "Rear Camera", value: "50MP OIS Triple Camera Setup + 8MP Ultra-Wide" },
        { label: "Battery & Charging", value: "6000 mAh Mega Battery with 25W Fast Charging" },
        { label: "Software Support", value: "4 Android OS upgrades + 5 years Security Updates" }
      ],
      variants: [
        { ram: "6 GB", storage: "128 GB", price: "19999", label: "6 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "128 GB", price: "21499", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "24499", label: "8 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "Galaxy A15 5G",
      name: "Samsung Galaxy A15 5G",
      price: "16499",
      description: "Samsung Galaxy A15 5G brings vivid Super AMOLED 90Hz display to the budget tier with a 50MP triple camera, MediaTek Dimensity 6100+ processor, and reliable 5000mAh battery life.",
      specs: [
        { label: "Display", value: "6.5-inch FHD+ Super AMOLED 90Hz Display" },
        { label: "Processor", value: "MediaTek Dimensity 6100+ (6nm)" },
        { label: "Rear Camera", value: "50MP Main + 5MP Ultra-Wide + 2MP Macro" },
        { label: "Battery & Charging", value: "5000 mAh with 25W Fast Charging" }
      ],
      variants: [
        { ram: "6 GB", storage: "128 GB", price: "16499", label: "6 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "128 GB", price: "17999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "20499", label: "8 GB RAM · 256 GB Storage" }
      ]
    }
  ],

  "Redmi": [
    {
      model: "Note 13 Pro+ 5G",
      name: "Redmi Note 13 Pro+ 5G",
      price: "29999",
      description: "Redmi Note 13 Pro+ 5G boasts an industry-leading 200MP OIS camera with 4X lossless zoom, 3D curved 1.5K 120Hz AMOLED display, 120W HyperCharge (100% in 19 mins), IP68 water resistance, and MediaTek Dimensity 7200-Ultra.",
      specs: [
        { label: "Display", value: "6.67-inch 1.5K 3D Curved 120Hz AMOLED, Dolby Vision" },
        { label: "Processor", value: "MediaTek Dimensity 7200-Ultra (4nm)" },
        { label: "Rear Camera", value: "200MP Samsung ISOCELL HP3 OIS + 8MP Ultra-Wide + 2MP Macro" },
        { label: "Front Camera", value: "16MP In-display Selfie Camera" },
        { label: "Battery & Charging", value: "5000 mAh Battery with 120W HyperCharge" },
        { label: "Build & Durability", value: "IP68 Water & Dust Resistant, Gorilla Glass Victus" }
      ],
      variants: [
        { ram: "8 GB", storage: "256 GB", price: "29999", label: "8 GB RAM · 256 GB Storage" },
        { ram: "12 GB", storage: "256 GB", price: "31999", label: "12 GB RAM · 256 GB Storage" },
        { ram: "12 GB", storage: "512 GB", price: "33999", label: "12 GB RAM · 512 GB Storage" }
      ]
    },
    {
      model: "Note 13 Pro 5G",
      name: "Redmi Note 13 Pro 5G",
      price: "24999",
      description: "Redmi Note 13 Pro 5G features a flagship 200MP camera with OIS, brilliant 1.5K AMOLED 120Hz screen with ultra-narrow bezels, Qualcomm Snapdragon 7s Gen 2, 5100mAh battery, and 67W Turbo Charge.",
      specs: [
        { label: "Display", value: "6.67-inch 1.5K 120Hz AMOLED, 1800 nits peak, Dolby Vision" },
        { label: "Processor", value: "Qualcomm Snapdragon 7s Gen 2 (4nm)" },
        { label: "Rear Camera", value: "200MP OIS Main + 8MP Ultra-Wide + 2MP Macro" },
        { label: "Battery & Charging", value: "5100 mAh Battery with 67W Turbo Charging" },
        { label: "Protection", value: "Corning Gorilla Glass Victus" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "24999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "26999", label: "8 GB RAM · 256 GB Storage" },
        { ram: "12 GB", storage: "256 GB", price: "28999", label: "12 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "Note 13 5G",
      name: "Redmi Note 13 5G",
      price: "16999",
      description: "Redmi Note 13 5G is the slimmest Note ever at 7.6mm, offering a 108MP 3X in-sensor zoom camera, super-smooth 120Hz AMOLED display, MediaTek Dimensity 6080, and 33W fast charging.",
      specs: [
        { label: "Display", value: "6.67-inch FHD+ 120Hz AMOLED, Ultra-slim Bezels" },
        { label: "Processor", value: "MediaTek Dimensity 6080 5G" },
        { label: "Rear Camera", value: "108MP 3X Zoom AI Triple Camera" },
        { label: "Battery & Charging", value: "5000 mAh Battery with 33W Fast Charging" }
      ],
      variants: [
        { ram: "6 GB", storage: "128 GB", price: "16999", label: "6 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "18999", label: "8 GB RAM · 256 GB Storage" },
        { ram: "12 GB", storage: "256 GB", price: "20999", label: "12 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "13C 5G",
      name: "Redmi 13C 5G",
      price: "10499",
      description: "Redmi 13C 5G brings high-speed 5G to everyone with MediaTek Dimensity 6100+, star trail design, 50MP AI dual camera, 90Hz display, and 5000mAh battery.",
      specs: [
        { label: "Display", value: "6.74-inch 90Hz Display with Corning Gorilla Glass" },
        { label: "Processor", value: "MediaTek Dimensity 6100+ 5G" },
        { label: "Rear Camera", value: "50MP AI Dual Camera" },
        { label: "Battery & Charging", value: "5000 mAh with 18W Fast Charging" }
      ],
      variants: [
        { ram: "4 GB", storage: "128 GB", price: "10499", label: "4 GB RAM · 128 GB Storage" },
        { ram: "6 GB", storage: "128 GB", price: "11999", label: "6 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "13999", label: "8 GB RAM · 256 GB Storage" }
      ]
    }
  ],

  "Realme": [
    {
      model: "13 Pro+ 5G",
      name: "Realme 13 Pro+ 5G",
      price: "31999",
      description: "Realme 13 Pro+ 5G features the world's first Sony LYT-701 OIS camera and 50MP Periscope telephoto camera with Monet-inspired luxury design, Snapdragon 7s Gen 2, and 80W SUPERVOOC charge.",
      specs: [
        { label: "Display", value: "6.7-inch 120Hz Curved AMOLED, Pro-XDR, 2000 nits" },
        { label: "Processor", value: "Qualcomm Snapdragon 7s Gen 2 (4nm)" },
        { label: "Rear Camera", value: "50MP Sony LYT-701 OIS + 50MP Sony LYT-600 3X Periscope + 8MP Ultra-Wide" },
        { label: "Front Camera", value: "32MP Sony Ultra-Clear Selfie" },
        { label: "Battery & Charging", value: "5200 mAh with 80W SUPERVOOC Charge" }
      ],
      variants: [
        { ram: "8 GB", storage: "256 GB", price: "31999", label: "8 GB RAM · 256 GB Storage" },
        { ram: "12 GB", storage: "256 GB", price: "33999", label: "12 GB RAM · 256 GB Storage" },
        { ram: "12 GB", storage: "512 GB", price: "36999", label: "12 GB RAM · 512 GB Storage" }
      ]
    },
    {
      model: "P1 Pro 5G",
      name: "Realme P1 Pro 5G",
      price: "19999",
      description: "Realme P1 Pro 5G stands out with a 120Hz Curved AMOLED display, Snapdragon 6 Gen 1 5G processor, 50MP Sony LYT-600 OIS camera, 3D VC cooling system, and 45W SUPERVOOC charging.",
      specs: [
        { label: "Display", value: "6.7-inch 120Hz Curved Vision AMOLED, 950 nits" },
        { label: "Processor", value: "Qualcomm Snapdragon 6 Gen 1 (4nm)" },
        { label: "Rear Camera", value: "50MP Sony LYT-600 OIS + 8MP Ultra-Wide" },
        { label: "Battery & Charging", value: "5000 mAh with 45W SUPERVOOC Charging" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "19999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "20999", label: "8 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "P1 5G",
      name: "Realme P1 5G",
      price: "15999",
      description: "Realme P1 5G offers high performance with MediaTek Dimensity 7050, bright 120Hz AMOLED display with Rainwater Smart Touch, 50MP AI camera, and 45W fast charging.",
      specs: [
        { label: "Display", value: "6.67-inch 120Hz FHD+ AMOLED, 2000 nits peak" },
        { label: "Processor", value: "MediaTek Dimensity 7050 5G" },
        { label: "Rear Camera", value: "50MP AI Primary Camera" },
        { label: "Battery & Charging", value: "5000 mAh with 45W SUPERVOOC" }
      ],
      variants: [
        { ram: "6 GB", storage: "128 GB", price: "15999", label: "6 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "128 GB", price: "16999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "18999", label: "8 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "C65 5G",
      name: "Realme C65 5G",
      price: "10499",
      description: "Realme C65 5G delivers fast 5G speed in the budget segment with MediaTek Dimensity 6300, 120Hz Eye Comfort display, 50MP AI camera, and IP54 dust and water resistance.",
      specs: [
        { label: "Display", value: "6.67-inch 120Hz Dynamic Display" },
        { label: "Processor", value: "MediaTek Dimensity 6300 5G" },
        { label: "Rear Camera", value: "50MP AI Camera" },
        { label: "Battery & Charging", value: "5000 mAh with 15W Quick Charge" }
      ],
      variants: [
        { ram: "4 GB", storage: "64 GB", price: "10499", label: "4 GB RAM · 64 GB Storage" },
        { ram: "4 GB", storage: "128 GB", price: "11499", label: "4 GB RAM · 128 GB Storage" },
        { ram: "6 GB", storage: "128 GB", price: "12499", label: "6 GB RAM · 128 GB Storage" }
      ]
    }
  ],

  "OnePlus": [
    {
      model: "12 5G",
      name: "OnePlus 12 5G",
      price: "64999",
      description: "OnePlus 12 5G is a true flagship powered by Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera system with 64MP periscope telephoto, 2K 120Hz ProXDR display, 5400mAh battery, 100W SUPERVOOC and 50W wireless AIRVOOC.",
      specs: [
        { label: "Display", value: "6.82-inch 2K 120Hz ProXDR LTPO AMOLED, 4500 nits peak" },
        { label: "Processor", value: "Qualcomm Snapdragon 8 Gen 3 (4nm)" },
        { label: "Rear Camera", value: "50MP Sony LYT-808 OIS + 64MP 3X Periscope OIS + 48MP Ultra-Wide" },
        { label: "Front Camera", value: "32MP Sony IMX615 Selfie Camera" },
        { label: "Battery & Charging", value: "5400 mAh Battery with 100W SUPERVOOC & 50W AIRVOOC" },
        { label: "Audio & Cooling", value: "Dual Turbo Cryo-velocity VC, Dolby Atmos Stereo Speakers" }
      ],
      variants: [
        { ram: "12 GB", storage: "256 GB", price: "64999", label: "12 GB RAM · 256 GB Storage" },
        { ram: "16 GB", storage: "512 GB", price: "69999", label: "16 GB RAM · 512 GB Storage" }
      ]
    },
    {
      model: "12R 5G",
      name: "OnePlus 12R 5G",
      price: "39999",
      description: "OnePlus 12R 5G delivers flagship gaming performance with Qualcomm Snapdragon 8 Gen 2, 4th Gen LTPO 120Hz ProXDR AMOLED screen, 5500mAh massive battery, and blazing-fast 100W SUPERVOOC charging.",
      specs: [
        { label: "Display", value: "6.78-inch 1.5K 120Hz LTPO4 ProXDR AMOLED, 4500 nits peak" },
        { label: "Processor", value: "Qualcomm Snapdragon 8 Gen 2 (4nm)" },
        { label: "Rear Camera", value: "50MP Sony IMX890 OIS + 8MP Ultra-Wide + 2MP Macro" },
        { label: "Battery & Charging", value: "5500 mAh Battery with 100W SUPERVOOC" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "39999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "16 GB", storage: "256 GB", price: "45999", label: "16 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "Nord 4 5G",
      name: "OnePlus Nord 4 5G",
      price: "29999",
      description: "OnePlus Nord 4 5G is the only 5G metal unibody smartphone in its class. Featuring Snapdragon 7+ Gen 3, 50MP Sony LYT-600 OIS camera, 5500mAh battery with 100W charging, and 4 years of Android updates.",
      specs: [
        { label: "Display", value: "6.74-inch 1.5K 120Hz AMOLED, 2150 nits peak brightness" },
        { label: "Processor", value: "Qualcomm Snapdragon 7+ Gen 3 (4nm)" },
        { label: "Rear Camera", value: "50MP Sony LYT-600 OIS + 8MP Ultra-Wide" },
        { label: "Front Camera", value: "16MP Selfie Camera" },
        { label: "Battery & Charging", value: "5500 mAh with 100W SUPERVOOC" },
        { label: "Build", value: "All-Metal Unibody Design, Alert Slider" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "29999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "32999", label: "8 GB RAM · 256 GB Storage" },
        { ram: "12 GB", storage: "256 GB", price: "35999", label: "12 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "Nord CE4 5G",
      name: "OnePlus Nord CE4 5G",
      price: "24999",
      description: "OnePlus Nord CE4 5G offers raw speed with Qualcomm Snapdragon 7 Gen 3, flagship-grade 100W SUPERVOOC charging (1-100% in 29 mins), 5500mAh battery, and 50MP Sony LYT-600 camera with OIS.",
      specs: [
        { label: "Display", value: "6.7-inch FHD+ 120Hz Fluid AMOLED, HDR10+" },
        { label: "Processor", value: "Qualcomm Snapdragon 7 Gen 3" },
        { label: "Rear Camera", value: "50MP Sony LYT-600 OIS + 8MP Ultra-Wide" },
        { label: "Battery & Charging", value: "5500 mAh Battery with 100W SUPERVOOC" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "24999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "26999", label: "8 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "Nord CE4 Lite 5G",
      name: "OnePlus Nord CE4 Lite 5G",
      price: "19999",
      description: "OnePlus Nord CE4 Lite 5G features a 120Hz AMOLED display with 2100 nits peak brightness, 50MP Sony LYT-600 OIS camera, 5500mAh battery, and 80W SUPERVOOC charging with 300% Ultra Volume speakers.",
      specs: [
        { label: "Display", value: "6.67-inch FHD+ 120Hz AMOLED, 2100 nits peak" },
        { label: "Processor", value: "Qualcomm Snapdragon 695 5G" },
        { label: "Rear Camera", value: "50MP Sony LYT-600 OIS + 2MP Depth" },
        { label: "Battery & Charging", value: "5500 mAh with 80W SUPERVOOC" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "19999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "22999", label: "8 GB RAM · 256 GB Storage" }
      ]
    }
  ],

  "OPPO": [
    {
      model: "Reno 12 Pro 5G",
      name: "OPPO Reno 12 Pro 5G",
      price: "36999",
      description: "OPPO Reno 12 Pro 5G brings breakthrough GenAI tools like AI Eraser 2.0 and AI Best Face, combined with MediaTek Dimensity 7300-Energy, triple 50MP portrait camera with 2X telephoto, and IP65 armor body.",
      specs: [
        { label: "Display", value: "6.7-inch Quad-Curved 120Hz AMOLED, Gorilla Glass Victus 2" },
        { label: "Processor", value: "MediaTek Dimensity 7300-Energy (4nm)" },
        { label: "Rear Camera", value: "50MP Sony LYT-600 OIS + 50MP Telephoto 2X + 8MP Ultra-Wide" },
        { label: "Front Camera", value: "50MP Autofocus Selfie Camera" },
        { label: "Battery & Charging", value: "5000 mAh with 80W SUPERVOOC" }
      ],
      variants: [
        { ram: "12 GB", storage: "256 GB", price: "36999", label: "12 GB RAM · 256 GB Storage" },
        { ram: "12 GB", storage: "512 GB", price: "40999", label: "12 GB RAM · 512 GB Storage" }
      ]
    },
    {
      model: "F27 Pro+ 5G",
      name: "OPPO F27 Pro+ 5G",
      price: "27999",
      description: "India's first IP69/IP68/IP66 waterproof smartphone with 360-degree Armour Body, 3D curved 120Hz AMOLED screen, 64MP AI camera, and 67W SUPERVOOC charging in a premium vegan leather finish.",
      specs: [
        { label: "Display", value: "6.7-inch 3D Curved 120Hz AMOLED, Gorilla Glass Victus 2" },
        { label: "Processor", value: "MediaTek Dimensity 7050 5G" },
        { label: "Rear Camera", value: "64MP Ultra-Clear + 2MP Portrait" },
        { label: "Battery & Charging", value: "5000 mAh with 67W SUPERVOOC" },
        { label: "Durability", value: "IP69 + IP68 + IP66 Waterproof, Swiss SGS 5-star Drop Resistance" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "27999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "29999", label: "8 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "A3 Pro 5G",
      name: "OPPO A3 Pro 5G",
      price: "17999",
      description: "OPPO A3 Pro 5G is built tough with 360-degree drop protection, 120Hz Ultra Bright Display, MediaTek Dimensity 6300, 5100mAh battery, and 45W SUPERVOOC fast charge.",
      specs: [
        { label: "Display", value: "6.67-inch 120Hz Sunlight Display, 1000 nits" },
        { label: "Processor", value: "MediaTek Dimensity 6300 (6nm)" },
        { label: "Rear Camera", value: "50MP AI Dual Camera" },
        { label: "Battery & Charging", value: "5100 mAh with 45W SUPERVOOC" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "17999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "19999", label: "8 GB RAM · 256 GB Storage" }
      ]
    }
  ],

  "iQOO": [
    {
      model: "Neo 9 Pro 5G",
      name: "iQOO Neo 9 Pro 5G",
      price: "35999",
      description: "iQOO Neo 9 Pro 5G is a flagship gaming beast with Qualcomm Snapdragon 8 Gen 2, Supercomputing Chip Q1, 144Hz LTPO AMOLED display, 50MP Sony IMX920 OIS camera, and 120W FlashCharge.",
      specs: [
        { label: "Display", value: "6.78-inch 1.5K 144Hz LTPO AMOLED, 3000 nits peak" },
        { label: "Processor", value: "Qualcomm Snapdragon 8 Gen 2 + Supercomputing Chip Q1" },
        { label: "Rear Camera", value: "50MP Sony IMX920 OIS + 8MP Ultra-Wide" },
        { label: "Battery & Charging", value: "5160 mAh with 120W FlashCharge" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "35999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "37999", label: "8 GB RAM · 256 GB Storage" },
        { ram: "12 GB", storage: "256 GB", price: "39999", label: "12 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "Z9s Pro 5G",
      name: "iQOO Z9s Pro 5G",
      price: "24999",
      description: "iQOO Z9s Pro 5G features a 120Hz 3D curved AMOLED screen with 4500 nits brightness, Snapdragon 7 Gen 3 chipset, 50MP Sony IMX882 OIS camera with 4K recording, and 5500mAh battery with 80W charging.",
      specs: [
        { label: "Display", value: "6.77-inch 3D Curved 120Hz AMOLED, 4500 nits local peak" },
        { label: "Processor", value: "Qualcomm Snapdragon 7 Gen 3" },
        { label: "Rear Camera", value: "50MP Sony IMX882 OIS + 8MP Ultra-Wide" },
        { label: "Battery & Charging", value: "5500 mAh with 80W FlashCharge" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "24999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "26999", label: "8 GB RAM · 256 GB Storage" },
        { ram: "12 GB", storage: "256 GB", price: "28999", label: "12 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "Z9x 5G",
      name: "iQOO Z9x 5G",
      price: "12999",
      description: "iQOO Z9x 5G is the slimmest 6000mAh 5G phone in India, equipped with Snapdragon 6 Gen 1, 44W FlashCharge, 120Hz display, and 300% audio boost stereo speakers.",
      specs: [
        { label: "Display", value: "6.72-inch 120Hz Adaptive Display" },
        { label: "Processor", value: "Qualcomm Snapdragon 6 Gen 1 (4nm)" },
        { label: "Rear Camera", value: "50MP AI HD Camera" },
        { label: "Battery & Charging", value: "6000 mAh with 44W FlashCharge" }
      ],
      variants: [
        { ram: "4 GB", storage: "128 GB", price: "12999", label: "4 GB RAM · 128 GB Storage" },
        { ram: "6 GB", storage: "128 GB", price: "14499", label: "6 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "128 GB", price: "15999", label: "8 GB RAM · 128 GB Storage" }
      ]
    }
  ],

  "Motorola": [
    {
      model: "Edge 50 Pro 5G",
      name: "Motorola Edge 50 Pro 5G",
      price: "31999",
      description: "Motorola Edge 50 Pro 5G features a Pantone-validated 1.5K 144Hz 3D curved pOLED display, Snapdragon 7 Gen 3, 50MP AI camera with 3X telephoto, 125W TurboPower charging, and IP68 waterproof design.",
      specs: [
        { label: "Display", value: "6.7-inch 1.5K 144Hz 3D Curved pOLED, Pantone Validated" },
        { label: "Processor", value: "Qualcomm Snapdragon 7 Gen 3" },
        { label: "Rear Camera", value: "50MP OIS (f/1.4) + 10MP 3X Telephoto OIS + 13MP Ultra-Wide" },
        { label: "Front Camera", value: "50MP Autofocus Selfie Camera" },
        { label: "Battery & Charging", value: "4500 mAh with 125W TurboPower & 50W Wireless" }
      ],
      variants: [
        { ram: "8 GB", storage: "256 GB", price: "31999", label: "8 GB RAM · 256 GB Storage" },
        { ram: "12 GB", storage: "256 GB", price: "35999", label: "12 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "Edge 50 Fusion 5G",
      name: "Motorola Edge 50 Fusion 5G",
      price: "22999",
      description: "Motorola Edge 50 Fusion 5G boasts an endless edge 144Hz 3D curved pOLED display, Sony LYT-700C OIS sensor, Snapdragon 7s Gen 2, IP68 underwater protection, and 68W TurboPower charging.",
      specs: [
        { label: "Display", value: "6.7-inch 144Hz Endless Edge pOLED, 1600 nits peak" },
        { label: "Processor", value: "Qualcomm Snapdragon 7s Gen 2" },
        { label: "Rear Camera", value: "50MP Sony LYT-700C OIS + 13MP Ultra-Wide Macro" },
        { label: "Battery & Charging", value: "5000 mAh with 68W TurboPower" },
        { label: "Protection", value: "IP68 Underwater Protection, Gorilla Glass 5" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "22999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "12 GB", storage: "256 GB", price: "24999", label: "12 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "Moto G85 5G",
      name: "Motorola Moto G85 5G",
      price: "17999",
      description: "Moto G85 5G brings an infinite 3D curved 120Hz pOLED display to the under-20K segment, powered by Snapdragon 6s Gen 3, 50MP Sony LYT-600 OIS camera, and premium vegan leather design.",
      specs: [
        { label: "Display", value: "6.67-inch 120Hz 3D Curved pOLED, 1600 nits" },
        { label: "Processor", value: "Qualcomm Snapdragon 6s Gen 3" },
        { label: "Rear Camera", value: "50MP Sony LYT-600 OIS + 8MP Ultra-Wide" },
        { label: "Battery & Charging", value: "5000 mAh with 33W TurboPower" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "17999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "12 GB", storage: "256 GB", price: "19999", label: "12 GB RAM · 256 GB Storage" }
      ]
    }
  ],

  "Apple": [
    {
      model: "iPhone 16",
      name: "Apple iPhone 16",
      price: "79900",
      description: "Apple iPhone 16 is built for Apple Intelligence, powered by the A18 chip. Highlights include Camera Control, 48MP Fusion camera with 2x optical-quality telephoto, Action button, and longer battery life.",
      specs: [
        { label: "Display", value: "6.1-inch Super Retina XDR OLED, Dynamic Island, 2000 nits peak" },
        { label: "Processor", value: "Apple A18 Bionic Chip with 6-core CPU & 5-core GPU" },
        { label: "Rear Camera", value: "48MP Fusion OIS + 12MP Ultra-Wide with Macro" },
        { label: "Front Camera", value: "12MP TrueDepth Camera with Autofocus" },
        { label: "Controls", value: "Camera Control Button + Action Button" },
        { label: "Durability", value: "IP68 Water Resistance, Ceramic Shield front" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "79900", label: "128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "89900", label: "256 GB Storage" },
        { ram: "8 GB", storage: "512 GB", price: "109900", label: "512 GB Storage" }
      ]
    },
    {
      model: "iPhone 15",
      name: "Apple iPhone 15",
      price: "69900",
      description: "Apple iPhone 15 features the Dynamic Island, 48MP main camera with 2x telephoto, durable color-infused glass and aluminum design, A16 Bionic chip, and universal USB-C connectivity.",
      specs: [
        { label: "Display", value: "6.1-inch Super Retina XDR OLED, Dynamic Island" },
        { label: "Processor", value: "Apple A16 Bionic Chip" },
        { label: "Rear Camera", value: "48MP Main with sensor-shift OIS + 12MP Ultra-Wide" },
        { label: "Charging & Port", value: "USB-C Port, MagSafe Wireless Charging" }
      ],
      variants: [
        { ram: "6 GB", storage: "128 GB", price: "69900", label: "128 GB Storage" },
        { ram: "6 GB", storage: "256 GB", price: "79900", label: "256 GB Storage" },
        { ram: "6 GB", storage: "512 GB", price: "99900", label: "512 GB Storage" }
      ]
    },
    {
      model: "iPhone 13",
      name: "Apple iPhone 13",
      price: "49900",
      description: "Apple iPhone 13 offers proven reliability with A15 Bionic chip, dual 12MP camera with Cinematic mode, bright Super Retina XDR display, and all-day battery life.",
      specs: [
        { label: "Display", value: "6.1-inch Super Retina XDR OLED Display" },
        { label: "Processor", value: "Apple A15 Bionic Chip" },
        { label: "Rear Camera", value: "12MP Wide with Sensor-shift OIS + 12MP Ultra-Wide" },
        { label: "Battery", value: "Up to 19 hours video playback" }
      ],
      variants: [
        { ram: "4 GB", storage: "128 GB", price: "49900", label: "128 GB Storage" },
        { ram: "4 GB", storage: "256 GB", price: "59900", label: "256 GB Storage" }
      ]
    }
  ],

  "POCO": [
    {
      model: "X6 Pro 5G",
      name: "POCO X6 Pro 5G",
      price: "25999",
      description: "POCO X6 Pro 5G is a raw speed flagship killer with MediaTek Dimensity 8300-Ultra, 1.5K 120Hz Flow AMOLED screen, 64MP OIS camera, and 67W Turbo Charge with Xiaomi HyperOS.",
      specs: [
        { label: "Display", value: "6.67-inch 1.5K 120Hz Flow AMOLED, 1800 nits peak" },
        { label: "Processor", value: "MediaTek Dimensity 8300-Ultra (4nm)" },
        { label: "Rear Camera", value: "64MP OIS Main + 8MP Ultra-Wide + 2MP Macro" },
        { label: "Battery & Charging", value: "5000 mAh Battery with 67W Turbo Charging" }
      ],
      variants: [
        { ram: "8 GB", storage: "256 GB", price: "25999", label: "8 GB RAM · 256 GB Storage" },
        { ram: "12 GB", storage: "512 GB", price: "27999", label: "12 GB RAM · 512 GB Storage" }
      ]
    },
    {
      model: "M6 Plus 5G",
      name: "POCO M6 Plus 5G",
      price: "12999",
      description: "POCO M6 Plus 5G sports a dual-sided glass design, 108MP 3x in-sensor zoom camera, Snapdragon 4 Gen 2 AE processor, 120Hz display, and 5030mAh battery with 33W charging.",
      specs: [
        { label: "Display", value: "6.79-inch FHD+ 120Hz Adaptive Display" },
        { label: "Processor", value: "Qualcomm Snapdragon 4 Gen 2 AE (4nm)" },
        { label: "Rear Camera", value: "108MP 3X Zoom AI Camera" },
        { label: "Battery & Charging", value: "5030 mAh with 33W Fast Charging" }
      ],
      variants: [
        { ram: "6 GB", storage: "128 GB", price: "12999", label: "6 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "128 GB", price: "14499", label: "8 GB RAM · 128 GB Storage" }
      ]
    }
  ],

  "Nothing": [
    {
      model: "Phone (2a) Plus",
      name: "Nothing Phone (2a) Plus",
      price: "27999",
      description: "Nothing Phone (2a) Plus showcases iconic metallic finish with Glyph Interface, MediaTek Dimensity 7350 Pro 5G, dual 50MP rear cameras, 50MP selfie camera, and 120Hz flexible AMOLED.",
      specs: [
        { label: "Display", value: "6.7-inch Flexible 120Hz AMOLED, 1300 nits peak" },
        { label: "Processor", value: "MediaTek Dimensity 7350 Pro 5G (4nm)" },
        { label: "Rear Camera", value: "50MP OIS Main + 50MP Ultra-Wide" },
        { label: "Front Camera", value: "50MP 4K Selfie Camera" },
        { label: "Battery & Charging", value: "5000 mAh with 50W Fast Charging" },
        { label: "Interface", value: "Iconic Glyph Interface with Light Animations" }
      ],
      variants: [
        { ram: "8 GB", storage: "256 GB", price: "27999", label: "8 GB RAM · 256 GB Storage" },
        { ram: "12 GB", storage: "256 GB", price: "29999", label: "12 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "Phone (2a)",
      name: "Nothing Phone (2a)",
      price: "23999",
      description: "Nothing Phone (2a) delivers transparent design aesthetics with Glyph light patterns, Dimensity 7200 Pro processor, 50MP dual camera with OIS, and Nothing OS 2.5.",
      specs: [
        { label: "Display", value: "6.7-inch 120Hz AMOLED, 1300 nits peak" },
        { label: "Processor", value: "MediaTek Dimensity 7200 Pro" },
        { label: "Rear Camera", value: "50MP OIS + 50MP Ultra-Wide" },
        { label: "Battery & Charging", value: "5000 mAh with 45W Fast Charging" }
      ],
      variants: [
        { ram: "8 GB", storage: "128 GB", price: "23999", label: "8 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "256 GB", price: "25999", label: "8 GB RAM · 256 GB Storage" },
        { ram: "12 GB", storage: "256 GB", price: "27999", label: "12 GB RAM · 256 GB Storage" }
      ]
    },
    {
      model: "CMF Phone 1",
      name: "CMF Phone 1 by Nothing",
      price: "15999",
      description: "CMF Phone 1 by Nothing introduces modular smartphone design with interchangeable back covers and accessory points, MediaTek Dimensity 7300 5G, and 50MP Sony camera.",
      specs: [
        { label: "Display", value: "6.67-inch 120Hz Super AMOLED Display, 2000 nits" },
        { label: "Processor", value: "MediaTek Dimensity 7300 5G" },
        { label: "Rear Camera", value: "50MP Sony Sensor Camera" },
        { label: "Battery & Charging", value: "5000 mAh with 33W Fast Charging" }
      ],
      variants: [
        { ram: "6 GB", storage: "128 GB", price: "15999", label: "6 GB RAM · 128 GB Storage" },
        { ram: "8 GB", storage: "128 GB", price: "17999", label: "8 GB RAM · 128 GB Storage" }
      ]
    }
  ],

  "Infinix": [
    {
      model: "Note 40 Pro 5G",
      name: "Infinix Note 40 Pro 5G",
      price: "21999",
      description: "Infinix Note 40 Pro 5G brings 20W Wireless MagCharge, 45W All-Round FastCharge 2.0, 108MP OIS camera, 3D Curved 120Hz AMOLED screen, and Halo AI Lighting.",
      specs: [
        { label: "Display", value: "6.78-inch 3D Curved 120Hz AMOLED, Corning Gorilla Glass" },
        { label: "Processor", value: "MediaTek Dimensity 7020 5G" },
        { label: "Rear Camera", value: "108MP OIS Triple Camera + 3x Superzoom" },
        { label: "Battery & Charging", value: "5000 mAh with 45W FastCharge & 20W Wireless MagCharge" }
      ],
      variants: [
        { ram: "8 GB", storage: "256 GB", price: "21999", label: "8 GB RAM · 256 GB Storage" }
      ]
    }
  ],

  "Tecno": [
    {
      model: "Pova 6 Pro 5G",
      name: "Tecno Pova 6 Pro 5G",
      price: "19999",
      description: "Tecno Pova 6 Pro 5G features futuristic dynamic light design with 210 MiniLEDs, an enormous 6000mAh battery with 70W Ultra Charge, 108MP camera, and 120Hz AMOLED.",
      specs: [
        { label: "Display", value: "6.78-inch 120Hz FHD+ AMOLED, 1300 nits" },
        { label: "Processor", value: "MediaTek Dimensity 6080 5G" },
        { label: "Rear Camera", value: "108MP Ultra-sensing Main Camera" },
        { label: "Battery & Charging", value: "6000 mAh with 70W Ultra Charge" }
      ],
      variants: [
        { ram: "8 GB", storage: "256 GB", price: "19999", label: "8 GB RAM · 256 GB Storage" },
        { ram: "12 GB", storage: "256 GB", price: "21999", label: "12 GB RAM · 256 GB Storage" }
      ]
    }
  ]
};
