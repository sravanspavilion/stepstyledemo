import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'classic-minimalist',
    sku: 'STS-SNEAK-01W',
    title: 'Classic Minimalist Leather Sneaker',
    subtitle: 'Full-Grain Italian Nappa Leather with Ortho-Cushion Sole',
    category: 'Low-Top',
    gender: 'Men',
    silhouette: 'Sneakers',
    material: 'Italian Calfskin',
    price: 2499,
    originalPrice: 3499,
    discountBadge: '28% OFF',
    badge: 'BESTSELLER',
    rating: 4.9,
    reviewsCount: 420,
    inStock: true,
    stockNote: 'Ready for dispatch today',
    description: 'Sourced from family-run tanneries in Arzignano. Ultra-soft full grain temper that conforms to natural foot kinetics over time without deep creasing.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6IbIJVz-ECgn3JVAN8mYzu3sDiA_1ttQJXi0PU4cdGSyrX4cAy3sO9FZmrHmN2tuTLmRuF8ld8mnj1LfMdnSGFdHXJQKX_2Omq_jyq7FgePxplyRhtsuuG8SkNKBWzxH-lvFcax3-M0Voxax5_e3ly4uhsfSTFhR6X22r0sxUqjx7IuNMAk2ZF-3k_0WgZYsWUhtdhh5m9c423m4ZAeZ0_NhwDhyz4ZqT2BCjaWCBlLeL1BdY8Bo3lA',
    galleryImages: [
      {
        label: 'Lateral',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1cmHVkswPvVR140ie_5VdhHjQAdSvDP0MzmXe_uNP3F1l38vm14GRsgoCexE7qz3AODd6i3EneLhalzTimU4eRtJrwuqzu-06rnvD-jtoxuY6xAWOwtkcKl5UOmtO8RWLAm2zpTN4GGFjIqeLKXAEts3JVKp_-bZC-jmoMJhW6iOfcFrkeVj1WAvJQKhjWxVHvkHBPgCtSaWgL4WANCf9iG-ppKj3JeeFxleF7nQEQK1GNQl_iRF6kw',
        alt: 'Lateral profile studio shot of minimalist chalk white sneaker with gum sole on neutral backdrop'
      },
      {
        label: 'Top-Down',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXrgmp_LTGANrbgV-2wv1LLbd2UrEb6KP8AWFuO2TmXaDCTeNqGdEvftE9kr3DPeyOhxswTkUGkR9CdNoAxU28iwLuWIDxoTVRf-En9jRji-BYnSUkS_6hrSk-Mnf4tCgt87g1-CMnaqvLB6DFS0yKz6S_D-dvxLIaA4TQW8mevhX4Gcwux_L3ijc946Pe9jKIOOyxR2FB9BIFv-JeRfsQaWsfoIuuA9cCGqfbFs9tvD9EO1VGeh0PBQ',
        alt: 'Top down overhead flat lay view of pair of clean white minimalist sneakers with custom waxed cotton laces'
      },
      {
        label: 'Cupsole',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwUkmkd9vn8z6LPa4C0fDm05xc386gP3K2ZjS2tYz84hi461S_wDHRtvm3Tzl9XSxNBofFQ9dqL9KKWk8RxDG8h5MVrzbJQS531ZOxAc70FOKAuQ9mHXb-G8lTQ_9g-xAjd398NQSz8HWVpiM-Pz6GKMkKE-P_7c78WM3NJFhCRxps8wGkjgE8lMRReJxGbRqdUzO0-C7DKlnQ_GQN8i_XN3CaLINYLBVrT0ilQV7xP4xb5oTfjFg3Cw',
        alt: 'Extreme close-up macro detail of Italian vulcanized gum rubber cupsole and reinforced heel counter stitching'
      },
      {
        label: 'On-Foot',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFks3ABtvcwGoKSQQXFI7Xy8jswcn40R-04aDwId2IhyvAcSC7Z6JaUqG6pJVotU-bbqHjjLZ870QpVRgHBzHq6lf-3YiV3mLHcDxeNjIZggyasG2uApRxxu8tad2XTDFMSXa4dzJxpRJ0d1vaEQww_zGltzP01FqTE_xvgwBvaLjzKobjU7v7LTrvXFQUulsc4t24hJvPdvSIe32Fkbl3CBCgVccH2EzRmxnpLIe6KN6onxfXs7Tqwg',
        alt: 'Artistic on-foot street editorial photograph paired with tailored olive green relaxed trousers'
      },
      {
        label: 'Traction',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt_VaFiz_z4DvgNUF1OmH3pZOWSbZZ0JI667E9F9fG0VF8hvTlfrZvu7VY3OFeyXtxeMFf_tlnIrCeGLYSeojsWUwSYoc3yf6CBVrLz2BLhBB1Z7AwskBbv2MionHq_WTOOK9xE4PNZEJNX0fiJFPN74mvsyIxAk-TdbfkxW5GDZW8HLhgm29X75mlbvjz3zsJkzjhlHyGAl608zT52uiNMslrBMH2LKC7Q_yd8pH-ieUXkeHy7QoDDw',
        alt: 'Bottom outsole shot showing geometric herringbone grip pattern carved into honey-colored translucent rubber sole'
      }
    ],
    colors: [
      { name: 'Chalk White / Natural Gum', hex: '#F6F5F0', subHex: '#B8860B' },
      { name: 'Jet Black / Monochrome', hex: '#1C1B1B' },
      { name: 'Earth Taupe Suede', hex: '#A39382' },
      { name: 'Slate Blue Nappa', hex: '#4A5D6E' }
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    outOfStockSizes: ['UK 12'],
    featured: true,
    trending: true,
    isBestSeller: true
  },
  {
    id: 'aeroglide-running',
    sku: 'STS-AERO-02B',
    title: 'AeroGlide Daily Running Shoe',
    subtitle: 'Aerodynamic Engineered Knit with Dual-Density Rebound Foam',
    category: 'Running',
    gender: 'Men',
    silhouette: 'Running Trainers',
    material: 'Breathable Supima Mesh',
    price: 2999,
    originalPrice: 3999,
    discountBadge: '25% OFF',
    badge: 'NEW',
    rating: 4.8,
    reviewsCount: 180,
    inStock: true,
    stockNote: 'New Season Capsule',
    description: 'Technical runner sneaker in jet black engineered knit with sharp electric cobalt accents. Crafted for daily commute performance and high-mileage responsiveness.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR7vE__VGZlru2kH1KwE-rVhYZ46CfqXxzBsVXkfv-MwbXPdundNA64JTj7vRDyXbGnWANEMjfwtHrqeI2GlDD4quM9-noSv5K4UOAB9UPFVVY0Wbot0zUoMCQE6ckO7qOmgwjSOFS4y79lF0neKqNWWD4IYayFMsEoYJVRRZFkWPxYHyOauZUuIMvjhs8ADJys7ZwdAST_FIL6BN8AinOVCIaZE2wbc7RFhorZhKm_QjhQCjGYoBUGQ',
    galleryImages: [
      {
        label: 'Lateral',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR7vE__VGZlru2kH1KwE-rVhYZ46CfqXxzBsVXkfv-MwbXPdundNA64JTj7vRDyXbGnWANEMjfwtHrqeI2GlDD4quM9-noSv5K4UOAB9UPFVVY0Wbot0zUoMCQE6ckO7qOmgwjSOFS4y79lF0neKqNWWD4IYayFMsEoYJVRRZFkWPxYHyOauZUuIMvjhs8ADJys7ZwdAST_FIL6BN8AinOVCIaZE2wbc7RFhorZhKm_QjhQCjGYoBUGQ',
        alt: 'Performance running sneaker with aerodynamic mesh upper in jet black and sharp electric cobalt accents'
      },
      {
        label: 'Angle',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgWMfe_Md9VHaU3sknW0fYhXq5knoQBtIo7tFq8igcnr99TnXEi0u8uldzgD2VjOlY_xlrGODmhYbwjr8FMAjn-adWiPr5h_vsuILWZL-M7dFT_DgwjprPfDxMjdndDIIWkogW2tKMfmHi-uDAWM_pL1PTqGW3ylve9lGy5-Hp80CcpVQhLLq1h_5T3kGkjMCdIcG_109IXcPqaim7nsaheuECImdzk_W0n3z6P_3YCmC5j76P2tENEA',
        alt: 'Technical runner sneaker in jet black engineered knit studio photo'
      }
    ],
    colors: [
      { name: 'Jet Black / Cobalt Pulse', hex: '#111111', subHex: '#1b2b48' },
      { name: 'Electric Cobalt', hex: '#1b2b48' },
      { name: 'Cloud Grey', hex: '#dadada' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    featured: true,
    trending: true
  },
  {
    id: 'milano-suede-loafer',
    sku: 'STS-LOAF-03T',
    title: 'Milano Suede Penny Loafer',
    subtitle: 'Hand-Finished Earth Taupe Italian Suede with Reinforced Welt',
    category: 'Loafers',
    gender: 'Men',
    silhouette: 'Penny Loafers',
    material: 'Italian Calfskin',
    price: 3499,
    originalPrice: 4999,
    discountBadge: '30% OFF',
    badge: 'LIMITED',
    rating: 4.9,
    reviewsCount: 95,
    inStock: true,
    stockNote: 'Limited Batch: Only 40 pairs crafted',
    description: 'Refined Italian suede penny loafer in rich earth taupe colorway. Hand-finished moc-toe stitching, supple leather footbed, and understated luxury silhouette.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6EnYolHt_1KZLH0Bdn0hPWtkO5zKNcPxcVSqVlqGTKwtIVF87HtISWk19mAx24a848ykNrymIMVUZwnUdMpVb5d6k4PoCkE4i5s_I0MRZ4htkBwck284a7kE17lLmaRIMU4zfCddVqTci2D1vEG3POM5tJaeUEmVbg0RgntgZRIEf2FqJR5RpPp0mY4DglUqm_fxyg504rolmka8wWo7LWs_uiRxkSkKfKLspHYSW47PqCkW9in1Fnw',
    galleryImages: [
      {
        label: 'Perspective',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6EnYolHt_1KZLH0Bdn0hPWtkO5zKNcPxcVSqVlqGTKwtIVF87HtISWk19mAx24a848ykNrymIMVUZwnUdMpVb5d6k4PoCkE4i5s_I0MRZ4htkBwck284a7kE17lLmaRIMU4zfCddVqTci2D1vEG3POM5tJaeUEmVbg0RgntgZRIEf2FqJR5RpPp0mY4DglUqm_fxyg504rolmka8wWo7LWs_uiRxkSkKfKLspHYSW47PqCkW9in1Fnw',
        alt: 'Refined Italian suede penny loafer in rich earth taupe color'
      },
      {
        label: 'Studio',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3Ue99ofona3yZ_xRwfbFycmoyOtG6oyPP9LA4d-9cWjEE5jW3W8tvMuS2CWbfIn7FOc6pz59Gcw-YDzgI1OZIyxnUs7VS2AXW4El4mXQxH0S887F5QfMGyHme9LJMrHS1K_-aj5iHkAvd2K9a8iI2PZ0M4bMFTCU5OdwUuKW09Vl_Hu8TZEqSHMJalq4JmZj3E_qjZXf8ijqZO1a64ewPZNI9ktMi6omhlIOCll9Q9STN4DvNnTHbQw',
        alt: 'Refined earth taupe suede penny loafers on sculpted warm stone pedestal'
      }
    ],
    colors: [
      { name: 'Earth Taupe Hand-Finished', hex: '#a38c7b' },
      { name: 'Espresso Noir', hex: '#3d2f25' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    featured: true,
    trending: true
  },
  {
    id: 'urban-drift-slide',
    sku: 'STS-SLID-04G',
    title: 'Urban Drift Foam Slide',
    subtitle: 'Ergonomic Architectural Recovery Slide with High-Resilience EVA',
    category: 'Slides',
    gender: 'Unisex Standard',
    silhouette: 'Everyday Slides',
    material: 'High-Rebound EVA Foam',
    price: 1299,
    originalPrice: 1799,
    discountBadge: '27% OFF',
    badge: 'HOT',
    rating: 4.7,
    reviewsCount: 310,
    inStock: true,
    stockNote: 'In high demand',
    description: 'Sculptural monochromatic slip-on slide in matte slate grey high-rebound injection foam. Architectural organic curves, deep heel cup, and cloud recovery geometry.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXM2R9fw810mFq5jn4F6SWDiFOdTOMSCAk4qwUcBGhzak9oPLwztqaarFRCfvRKmENkjq2EpX64ogbac6mAj01lITSkajqObcN51KeeBgTqy0EtULuYFUQCVgUgAt5e4dOuu6Nxar8_5kOTweycASnPgOjy8mfdwVhFXBogN-D5d7MVqP-Q2fLV8Qe1VO_o11z6WM920ayVw_PPvqymOdTR9_oHyuC0d0lja57YQ1ukFO_lSYIKdTTTA',
    galleryImages: [
      {
        label: 'Hero',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXM2R9fw810mFq5jn4F6SWDiFOdTOMSCAk4qwUcBGhzak9oPLwztqaarFRCfvRKmENkjq2EpX64ogbac6mAj01lITSkajqObcN51KeeBgTqy0EtULuYFUQCVgUgAt5e4dOuu6Nxar8_5kOTweycASnPgOjy8mfdwVhFXBogN-D5d7MVqP-Q2fLV8Qe1VO_o11z6WM920ayVw_PPvqymOdTR9_oHyuC0d0lja57YQ1ukFO_lSYIKdTTTA',
        alt: 'Sculptural monochromatic slip-on slide in matte slate grey'
      },
      {
        label: 'Profile',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGeirKmt_atfP93PHSZCRRSYnz7QVXZeik3DLUcAXQI-kMguFdpXi7Uk_ziI6rZElIBSPC4LSXxBtSUscHYHTV8QXIKlX_kgvIRdzFYNnDMo3C-XRPzfYkJaewXoMwwl07fPxTirlXMH48biCQgcwt2-Qgi1fVhr5FRJQxATv17AfKYXBbuWotKq358ggEc7uSmssLHkRotoCx2IhRJeouNubae5MCobi6f2o0AmxVRGd6N1gLb0bMqw',
        alt: 'Ergonomic architectural slide sandal in matte slate grey'
      }
    ],
    colors: [
      { name: 'Slate Grey Cloud Recovery', hex: '#585f6c' },
      { name: 'Bone Ivory', hex: '#f3f3f3' },
      { name: 'Stealth Black', hex: '#111111' },
      { name: 'Warm Clay', hex: '#c9bfae' }
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    featured: true,
    trending: true
  },
  {
    id: 'monochrome-heritage',
    sku: 'STS-HERI-05W',
    title: 'Monochrome Heritage Low Runner',
    subtitle: 'Vintage-Inspired Court Trainer in Off-White Nappa Calfskin',
    category: 'Low-Top',
    gender: 'Men',
    silhouette: 'Sneakers',
    material: 'Italian Calfskin',
    price: 2799,
    originalPrice: 3699,
    discountBadge: '24% OFF',
    badge: '#1 FOOTWEAR',
    rating: 4.95,
    reviewsCount: 630,
    inStock: true,
    stockNote: 'Community Favorite',
    description: 'Arch-support insole wrapped in breathable nappa calfskin. Vintage-inspired low-top court sneaker in off-white nappa leather and cream beige suede overlays.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-dh4CVIU4rGHb83BrokMKAVnD9VPg2RAhnZYn4nGivJzz4JVI1to1E_C1rZWsHyqfcv-NJM3Vpo-zBcf5rcFLd1B0NXOMMPHtHg_VCnfrm_EQAQLEJpKE6PJm1M1AdhD9Yptf7Xy7iN9XSv4P8OOHGSH-TtX3OqdEJzlaF6AqAEstntWVJL2HtlxF0cI4qnkFZa5cYq-YSbo_65GMeQRcY-AiGRj39MtNSvkSSqi9PQ-b0ASxnioo6w',
    galleryImages: [
      {
        label: 'Hero',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-dh4CVIU4rGHb83BrokMKAVnD9VPg2RAhnZYn4nGivJzz4JVI1to1E_C1rZWsHyqfcv-NJM3Vpo-zBcf5rcFLd1B0NXOMMPHtHg_VCnfrm_EQAQLEJpKE6PJm1M1AdhD9Yptf7Xy7iN9XSv4P8OOHGSH-TtX3OqdEJzlaF6AqAEstntWVJL2HtlxF0cI4qnkFZa5cYq-YSbo_65GMeQRcY-AiGRj39MtNSvkSSqi9PQ-b0ASxnioo6w',
        alt: 'Vintage-inspired low-top court sneaker in off-white nappa leather'
      },
      {
        label: 'Detail',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVMB7SDmg3N13zpljqsMVqRSQQYudN21UYtXkxb8wCCBKTGbKeKyJ4u-OLx1uN0WYZSYEi-7YloNPOYB2yYecNHwZDNeS9yndxxFWk8icXF_kpavQqeH4Hr4OycAZCaniPaCJA0P01YxL7uWFUN_ZAOKwQh9weTEbbHIiVmKeIR2VNDiMHwZLR2VbQzm219iBPWIW0kjMtXsOe72_dV-ND0-Hkn-Tx7AkWLgMezehp0kQybPTEMhYOkQ',
        alt: 'Side angle shot of a clean white leather retro trainer sneaker'
      }
    ],
    colors: [
      { name: 'Off-White / Cream Nappa', hex: '#f4f2ee' },
      { name: 'Desert Sand', hex: '#dfdcd5' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    featured: true,
    isBestSeller: true
  },
  {
    id: 'strata-slip-on',
    sku: 'STS-STRA-06S',
    title: 'Strata Perforated Slip-On',
    subtitle: 'Elasticated Italian Suede Collar with Memory Air Cushioning',
    category: 'Loafers',
    gender: 'Men',
    silhouette: 'Everyday Slides',
    material: 'Italian Calfskin',
    price: 2899,
    originalPrice: 3999,
    discountBadge: '27% OFF',
    badge: 'ALL DAY FIT',
    rating: 4.79,
    reviewsCount: 240,
    inStock: true,
    stockNote: 'Perfect all-day transit shoe',
    description: 'Warm sand beige perforated casual slip-on shoe with elastic gussets and clean vulcanized cupsole. Luxury summer lifestyle atmosphere with memory cushioning.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPrtsbbXTuxuxFZVjgnpiDoI-PXhuKtmqkD_jvHtHMgtlRVc7I-OeU6NJQSYRBzBOtz25j2Wh0gI65EP09rXs98IvRSHBpBLid8h8zf4jHwOmZCy1jGQza0wF2mpyT6GM_D3ldc1L8zsNLzPJJyBJGWck4LVTttaqtC4eB5pb9ZOy2ddaSFs48vwKxwtbtoZRC8qstI8Ip-9PAJyBGnKUnBz0sWyMP_pKXJGDkeYMqg6KuBTEsKXtqQg',
    galleryImages: [
      {
        label: 'Hero',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPrtsbbXTuxuxFZVjgnpiDoI-PXhuKtmqkD_jvHtHMgtlRVc7I-OeU6NJQSYRBzBOtz25j2Wh0gI65EP09rXs98IvRSHBpBLid8h8zf4jHwOmZCy1jGQza0wF2mpyT6GM_D3ldc1L8zsNLzPJJyBJGWck4LVTttaqtC4eB5pb9ZOy2ddaSFs48vwKxwtbtoZRC8qstI8Ip-9PAJyBGnKUnBz0sWyMP_pKXJGDkeYMqg6KuBTEsKXtqQg',
        alt: 'Warm sand beige perforated casual slip-on shoe'
      },
      {
        label: 'Angle',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4TXsBnMO_UWTHJ5NulZFiDTf6isA74MtmVj6QdVOOG1BjJXDblwRBFSRWQNNQxIs21HacIzOcvA_5NZh7TZxMgKYBRqHdy7rDNiJWeXhYgu5fmQGGn9ZebKYFkQMf-I2HDx525c5VoV-tG7Tx9ZEZQcEFJ2gWaTs0GJqioq4xJDj7_OiGeOpGXvlnGDu2Es9rokBbcu_m2V4Oj0leo_CGHLWsOLvY0awLl3m_6wg2wVD3UgxyCkn1Ww',
        alt: 'Minimalist sand taupe slip-on sneaker crafted from perforated Italian suede'
      }
    ],
    colors: [
      { name: 'Warm Sand / Cloud White', hex: '#d6ccbe' },
      { name: 'Onyx Black', hex: '#1c1b1b' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    featured: true,
    isBestSeller: true
  },
  {
    id: 'veloce-carbon-knit',
    sku: 'STS-VELO-07C',
    title: 'Veloce Carbon Knit Trainer',
    subtitle: 'Stealth Carbon Fiber Knit with Responsive Neon Micro Accents',
    category: 'Running',
    gender: 'Men',
    silhouette: 'Running Trainers',
    material: 'Breathable Supima Mesh',
    price: 3299,
    originalPrice: 4499,
    discountBadge: '26% OFF',
    badge: 'NEW DROP',
    rating: 4.85,
    reviewsCount: 145,
    inStock: true,
    stockNote: 'Ultra lightweight 220g',
    description: 'Technical black carbon knit runner shoe with vivid acid-lime micro accents on the pull tab and outsole. Ultra sharp industrial sportswear fashion design.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnWKLqyo5wR-oKySH4MAg6AAIqsI35QbZHRy27MYkWPL-4jh-48KJTqkJMqcXYz2U_TbPR5c5F5W-dXNWV5sfDy7HovZoJd_lixOx-a_XeXhL0NFXL3CvIMwQSQhaELDqKOExjd22WbQZSzmQGbRQeYAOody0Wn-Ql8khTFdI3bH6IhknCe0C_YCkAqVUpzW4fbUzhvzz_xlDU6aqRw72JGICEBwSV142Hz8Cmg-c8arWWk5Q8gO9w1g',
    galleryImages: [
      {
        label: 'Hero',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnWKLqyo5wR-oKySH4MAg6AAIqsI35QbZHRy27MYkWPL-4jh-48KJTqkJMqcXYz2U_TbPR5c5F5W-dXNWV5sfDy7HovZoJd_lixOx-a_XeXhL0NFXL3CvIMwQSQhaELDqKOExjd22WbQZSzmQGbRQeYAOody0Wn-Ql8khTFdI3bH6IhknCe0C_YCkAqVUpzW4fbUzhvzz_xlDU6aqRw72JGICEBwSV142Hz8Cmg-c8arWWk5Q8gO9w1g',
        alt: 'Technical black carbon knit runner shoe with vivid acid-lime micro accents'
      }
    ],
    colors: [
      { name: 'Stealth Carbon / Acid Accent', hex: '#1b1c1d' },
      { name: 'Granite Slate', hex: '#404754' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
  },
  {
    id: 'architect-chelsea',
    sku: 'STS-CHEL-08B',
    title: 'Architect Chelsea Boot',
    subtitle: 'Deep Oiled Charcoal Nubuck with Heavy-Duty Elastic Crepe Welt',
    category: 'High-Top',
    gender: 'Men',
    silhouette: 'Chelsea Boots',
    material: 'Italian Calfskin',
    price: 4199,
    originalPrice: 5999,
    discountBadge: '30% OFF',
    badge: 'PREMIUM',
    rating: 4.92,
    reviewsCount: 88,
    inStock: true,
    stockNote: 'Arzignano Waxed Nubuck',
    description: 'Architectural chelsea boot in deep oiled charcoal nubuck leather. Sleek streamlined profile with robust black crepe sole, high-end editorial product presentation.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3aK1OAJgxWZcP_pKOTBFD0tR92Ix5BlItRVUUZ__jBsd_aFHlP3fG1wnmjFaPXV2JAPmImGaWWJ83bkYaE3ztETntzjJrUcf6HlMogCx_gu_X-XK421e0FOlFpQAJR4NfybUvK4XQIeGJHDbzpuAfCK6WdyLyh5WMQpvpmeM3Xjv98u7Vk_fYDaQcVQC-NB6IQ7HCZPWUxlpx2qb81lb4rnZgC2OiqwYqdTh7J2zJnIjyq5Iwp8744A',
    galleryImages: [
      {
        label: 'Hero',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3aK1OAJgxWZcP_pKOTBFD0tR92Ix5BlItRVUUZ__jBsd_aFHlP3fG1wnmjFaPXV2JAPmImGaWWJ83bkYaE3ztETntzjJrUcf6HlMogCx_gu_X-XK421e0FOlFpQAJR4NfybUvK4XQIeGJHDbzpuAfCK6WdyLyh5WMQpvpmeM3Xjv98u7Vk_fYDaQcVQC-NB6IQ7HCZPWUxlpx2qb81lb4rnZgC2OiqwYqdTh7J2zJnIjyq5Iwp8744A',
        alt: 'Architectural chelsea boot in deep oiled charcoal nubuck leather'
      }
    ],
    colors: [
      { name: 'Oiled Charcoal Nubuck', hex: '#2a2c30' },
      { name: 'Tuscan Walnut', hex: '#52443c' }
    ],
    sizes: ['UK 8', 'UK 9', 'UK 10', 'UK 11']
  }
];

export const APPAREL_ITEMS = [
  {
    id: 'heavy-linen-field-overshirt',
    title: 'Heavy Linen Field Overshirt',
    color: 'Olive Moss',
    size: 'L (Regular Fit)',
    price: 2199,
    originalPrice: 2899,
    savedAmount: 700,
    inStock: true,
    stockNote: 'Low Stock • Only 3 pieces left in UK Warehouse',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMBvVjHbbaaPkqNLAeietRXIHCss7wRkGKFPBjrCryBxjXW-jPhlyI7DDpEnWtZ0gMRQCjDMcAzylmMJ2gApkXfMxwvc5W1fpLBm-5-orIvshMJnvkULLeo9TAwWHwZ0IPez2ilFIcxFT4D1StGrlY85pidot-t0aL7Fg3nrvUXS5jNkEYyGf9vTBVKfs6JrOS4iEbGVGD-mAy0Zoyqe6nIhr4SbyEHoUXM4KvYVEK0YrY3pqrQ0sB5w'
  },
  {
    id: 'crisp-oxford-supima-shirt',
    title: 'Crisp Oxford Supima Shirt',
    color: 'Eggshell White',
    size: 'Relaxed Fit',
    price: 1899,
    originalPrice: 2499,
    savedAmount: 600,
    inStock: true,
    stockNote: '100% Long-Staple Supima',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACn-_cap6CNqMtrW2bkqBp9d1tyKSCGeiJ2qnZFbLW5vTZe1k9oOinS1YdjlOsTWa03UNqlwemZLWMoMRVgWeVHriFf57VpCj6fBRGqZER00agSoJcsqd6Z5Co2WzTMWciXpvVRKyVXbXW86qGOZppspj8V6r8i14TeoU-e3jZmfkCQ1YRQsT5G7jSk3zapYcdC0fmn-y-PK6bHuv9gwyNWea5TepTFjYYCKdx8PvrzU_xmiI2vkGW6A'
  },
  {
    id: 'architect-tapered-chinos',
    title: 'Architect Tapered Chinos',
    color: 'Muted Olive',
    size: 'Waist: 32 / Length: 30',
    price: 2199,
    bundlePrice: 1599,
    originalPrice: 2699,
    savedAmount: 500,
    inStock: true,
    stockNote: '4-Way Stretch Twill',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp9I2SJbMff2ZCzJAtFPf9nlqHvuN_VnaTEY__--ev3BjL84p7BwrCjJRrINr7ALJPH2wj47VDsTBdF4DzdjRJKjkwedA13UcBEr74xv0JJwjjoMIo-k5wPSGMDEmoGtZkue68m069szF1k1h96mjyQLhLRjUD71knW9w776Qh_QWpgWcwUJ4PUyOGvPE94gToeWNkr-CI9MzYb6N5IahYnxA9gkMvC3b_WGOpfQHiF9rTlNjljAC-ww'
  }
];

export const CARE_KIT_ITEMS = [
  {
    id: 'shoe-protector-spray',
    title: 'Shoe Protector Spray',
    category: 'Shoe Care',
    description: 'Nano hydrophobic shield (200ml)',
    price: 499,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQBZn3D0AdQXlO5lGge7B4xyq9k5vMdCTb-h4p8WeXq3mKj6NEbgXYrfalNU6R2Pczb1JXWeAiHdm1dWEBNm2vbeugwFYfvo0yDsi1Kd5P5K8-WPBqYdxlMvQEYZQjt-4a9wYXTJLpjZ2tv_wgKQBslMFJcf14MIhNagO3dSH-nNtlrXPeziQiz_lDyhgSLsEDSbz8RbiH76STpbpILZA6zk1BmNB9zomOJxiICUbLDsm5bIaUlNfIew'
  },
  {
    id: 'organic-cotton-socks',
    title: 'Organic Cotton Socks (3-Pack)',
    category: 'Essentials',
    description: 'Chalk, Charcoal & Sand Taupe',
    price: 599,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsTgXGZi9K53kP0_KdqUevO-27ckiBMlQsa8WgK-uMlsVmrGjyKpx3BahlfmMXKc67iqsUKpxJ4NHpTZ13chMTGh09gVU_4rwuA4m-npocxmKclNNYfPz_9cAPRVYAZ7x8Y9C45xE0Cn5rEoz7W60-5swWxSwO_E9n97AD6zo2SSBXXMH0HANvVdvUxfMcMt2XF1imXg_rqS0V7vOd82YfScFnEhliTDiphp5LgW3AwlCD7Yu1ro52sg'
  },
  {
    id: 'suede-leather-brush',
    title: 'Suede & Leather Brush',
    category: 'Shoe Care',
    description: 'Crafted natural horsehair bristles',
    price: 299,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7boSMOs-xUEdEgfimZl0PMMdNjLHcVcv5HMYqtNQqoNPJ3zyBJ9Qz1dSX0myAVUzy-Nim7g3z4tKPYui41WDWnflBU8G9kpM6AIE2pd4w00GSDzvKhWiVouQSDIemAKD1q1zZYkU4VhH5mhT-hJ4MMfGvxIDb1NvBa3Jzy0LV29OWCtV84680KGDrb4Z4C0f6ssAyoeo937kijEhNNOLLWo3o5SUW_iLW47aDfPBAfn2d0IY1rMP_5A'
  }
];

export const RECENTLY_EXPLORED = [
  {
    id: 'rec-1',
    category: 'Footwear',
    title: 'Blackout Stealth Nappa Low',
    price: 2699,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSJtKlA8gs1VZRPIjhvs0SD9t9ONHdMpau8jo6RhiieeyVA61DhNgYjcTBOSRmUcqGKj6a9VW9BxjkNExRSE3sqKb-mzoz_qeupEcDcF9rAlSU8tsa-GDnLp5q0L6B_5gQnEbXJ0bmvUZkLWqwDj7vfPas3ns1_jwBPs259kdtQYZK-h-adbcO1MmxNsLUHIVcPpZMTbTAHnrxBGvJ3t-o_RJCGYVRWIt3pstf30Eezr5tCCwY0H2GNg'
  },
  {
    id: 'rec-2',
    category: 'Footwear',
    title: 'Desert Taupe Suede Trainer',
    price: 2799,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHEi2DGeYLT5G1kAwftO6YXymET4BSk_iLsRJohkHagx-A9qMn2TUWP57tPeleK6RKCEwoJB-dWwigtsvaPEsdPXkoZe8_EyIzqTSeGE7PBrLdCkKsrlZ6TP1rHFm6uLrcMkSXSoX71Dj9nN3RDWmcNPbseB-2qE-s_5C4ZHA-8RSqwrPGMMCczlCNwe5d2JTAO20jFw36ANKg6BDlHnbBwX8vQBcxjuAV_MTRc7-nCQuTM6VBWCeFyw'
  },
  {
    id: 'rec-3',
    category: 'Footwear',
    title: 'Court Minimalist - Navy Tab',
    price: 2499,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFkXD5ptrVuYWhyusc4a-dSWZ-vgy3o72IZdZ3EqEIxzpcTJH_bhGJsqDqK7HqpMkVOiFQhnTMMmiuLAcAxa9KxOq00gnptNxzO03DTkxv8jycHMTQs7i4-b7vgXwWDbMWB_NSm_XafVl7eUkYD_lplNkwbrM1S_1DPVdNwaY64dN4mnMm2Yge9rhhY39KYKUZbjJMrsuqylpPnrAcbBzsCfmmH6YD3-rVvBXq4uFEbVFMY06-umWjkA'
  },
  {
    id: 'rec-4',
    category: 'Apparel',
    title: '450GSM Organic Loopback Crew',
    price: 1799,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQcVr7L4S8611THJEI0zQKG51y11NCmLRKYerj4go_Ex-HUIM1wpC1ri-sleXWwAGgsVrtTQsdJvO2VxI1-A0ltuB8P_f_KelbWDkanJGFRD4m7xavgvMNlhmpqL44U-zCcRvXz6EZme_ZG4kcg3xahCJg8K7zoaiitwHCafwjVDT_SkkNLi-DuWviODo3HYpG7V58Xy8isFh_iK67K6rTnNlzBrKyWRrkBrvDXF27BklfGlB4_6g-vw'
  }
];

export const BRAND_LOGO = 'https://lh3.googleusercontent.com/aida/AEtjO1U6dKHNIlHlQVAfMK4oBdsy6UK6S6EHAGZ0zvwnFx8AvFCvG2wLz8abNqTLbK2clvjEa-UlVT7fGpyIbBXFNcPzqjNew1DjZaWyPQCg9kEtNHpJJWIZxTNRT16Bl4Ph-UnOmsmID05gRBGgkTsxKGy4W7KFv3O3mcfsjHl0b8IgUZi6Vm729N3LnANPsHOi3dK4MeTnB2Ns6fIH73u92b6tdszd-Nii_Rf3EuoKqxvKesgkNWkfrD6OxTA';

export const HERO_BG_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk240ymvNeVL43D9cT2r9Yp7bd7CVyoZ9eRcupKipOTKP53Lx2plc6-cyP1DRFLSxr83VO43zSdmMzL8SQWNT1_N7M8WZYxtb8OwMWuq1qGOMzNXrE5whoVY-g2du1iMR5f9ezibIECryU-uP21wOHile16G63h5MeIHQlT7NVx2kYbcarIgyPlvdm1DFTTcj9KOMtH5ow1pEHQyXuDD3s8g27u5DARNtRIqDqcP3iR0nj9S3n6NepAg';
