# Design Document

## 1. Profile Baseline Declaration
- **Profile**: `profiles/strategic.md`
- **Rationale**: This is a technical architecture presentation for an AI-powered ATS system, targeting technical stakeholders and development teams. Strategic profile fits best for its data-driven, professional approach.
- **Referenced dimensions**: Design philosophy (grand vision, data persuasiveness), information density (medium-high), color guidance (steady, premium), font guidance (sans-serif bold titles), content expression (big numbers, timelines, tables)

## 2. Style Baseline Declaration
- **Style anchor**: McKinsey/BCG consulting report style + Stripe developer documentation aesthetic
- **Referenced dimensions**: Clean grid layouts, restrained color palette, data-forward presentation, sharp-cornered containers, premium tech feel

## 3. Style Details

### Color Design
- **Overall tendency**: Conservative & steady with tech-modern accents
- **Temperature**: Cool-neutral with warm accent
- **Primary**: #1B2A4A (deep navy - authority, tech)
- **Secondary**: #475569 (slate gray - supporting text)
- **Accent**: #D97706 (amber - highlights, key metrics)
- **Background**: #F8FAFC (cool off-white)
- **Text**: #0F172A (near-black)
- **Light**: #E2E8F0 (borders, dividers)
- **Dark bg**: #0F172A (for emphasis pages)

### Font Usage
- **Titles**: Liter Bold, 32-44px
- **Body**: Liter Regular, 18-20px
- **Big numbers**: Liter Bold, 48-56px
- **Annotations**: Liter Regular, 14-16px

### Container Styles
- Sharp-cornered rectangles (no rounded corners)
- Whitespace-driven hierarchy
- Thin borders (#E2E8F0) for cards
- No shadows, minimal decoration

### Image Style
- Icons: Outline style, Font Awesome
- Tables: Minimal three-line style with header emphasis
- Charts: Clean flat style with primary/accent colors

## 4. Layout System
- **Page size**: 1280x720 (16:9)
- **Margins**: 60px all sides
- **Content pages**: Title at top (y=40), content area (y=100 to y=680)
- **Grid**: 12-column grid, consistent alignment

### Special Pages
- **Cover**: Dark background (#0F172A) + centered large title + subtitle
- **Chapter**: Dark background + large chapter number + chapter title
- **Final**: Dark background + centered closing message

## 5. Style Usage Rules
- `$title` for page titles
- `$subtitle` for subtitles and section headers
- `$body` for main content text
- `$caption` for annotations and sources
- `$bignum` for large metric displays

## 6. Risk Prohibitions
- No rounded rectangles
- No blue/cyan as primary (use deep navy)
- No gradient backgrounds
- Body text never below 18px
- No more than 6-7 points per page

## 7. Theme Definition

```yaml
theme:
  colors:
    primary: "#1B2A4A"
    secondary: "#475569"
    accent: "#D97706"
    background: "#F8FAFC"
    text: "#0F172A"
    light: "#E2E8F0"
    dark: "#0F172A"
    white: "#FFFFFF"
  textStyles:
    title:
      fontSize: 32
      color: "$primary"
      fontFamily: "Liter"
      lineHeight: 1.2
    subtitle:
      fontSize: 20
      color: "$secondary"
      fontFamily: "Liter"
      lineHeight: 1.3
    body:
      fontSize: 18
      color: "$text"
      fontFamily: "Liter"
      lineHeight: 1.5
    caption:
      fontSize: 14
      color: "$secondary"
      fontFamily: "Liter"
      lineHeight: 1.4
    bignum:
      fontSize: 48
      color: "$accent"
      fontFamily: "Liter"
      lineHeight: 1.1
  tableStyles:
    default:
      fontSize: 16
      fontFamily: "Liter"
      headerFill: "$primary"
      headerColor: "$white"
      headerBold: true
      bodyFill: ["$white", "$background"]
      bodyColor: "$text"
      border:
        style: solid
        width: 1
        color: "$light"
```
