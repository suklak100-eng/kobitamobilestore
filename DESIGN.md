# Design direction

## Bithari tech editorial

**Purpose:** help a nearby customer browse the shop’s verified brand relationships, understand its service promises, see real shop photos, and take a direct phone or directions action.

**Tone:** local, assured, contemporary. The design uses editorial hierarchy and a restrained storefront palette rather than a generic electronics marketplace template.

**Recognition anchor:** a genuine shop photo breaks out of a deep ink field, paired with the original square Kabita logo and narrow, high-contrast display type. Orange and blue cues echo the supplied logo. Bengali copy sits beside English navigation and service information.

## DFII

| Aesthetic impact | Context fit | Feasibility | Performance safety | Consistency risk | Score |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 5 | 5 | 4 | 4 | 3 | **15** |

`5 + 5 + 4 + 4 − 3 = 15`

## Design system

- **Display:** Barlow Condensed, 500–700, for short headlines and navigation labels.
- **Body:** DM Sans, 400–700, for readable English UI and paragraphs.
- **Bengali:** Noto Sans Bengali, 400–700, for the existing post and Bengali service copy.
- **Palette:** ink `#14191d`, warm paper `#f5f2ea`, balanced orange `#ed8646`, orange contrast `#9b4b22`, electric blue `#1674bd`, and a restrained neutral scale. Visitors can also switch between coordinated light and dark themes.
- **Composition:** an offset 12-column editorial grid, oversized type, a portrait photo that overlaps a colored panel, narrow utility strip, and distinct photo-led sections. Cards are used for the gallery and enquiry examples only.
- **Motion:** short hero entrance, lightly staggered scroll reveals, and a small perspective tilt on desktop phone cards. There is no continuous 3D scene or parallax. All motion respects `prefers-reduced-motion` and is removed for reduced-motion users.
- **Accessibility and speed:** semantic landmarks, skip link, clear focus, labelled controls, keyboard-operable gallery, local fonts and photos, explicit image dimensions, lazy loading below the fold, and no third-party scripts.

The product catalogue starts as a labelled layout demonstration. When the owner adds actual phones in the protected admin panel, it switches to an enquiry catalogue with owner-entered prices and up to three photos per phone. The admin saves website content and uploads on the Node server; no checkout, payment or live stock sync is connected.
