# Wander.za — Curated South African Travel Landing Page

Wander.za is a responsive travel landing page concept for discovering curated South African destinations. The project combines a polished animated hero, an interactive destination carousel, a map marker system, scroll reveals, reviews, and a front-end trip enquiry form.

This project was built to demonstrate front-end UI development, responsive layout skills, animation timing, DOM interaction, accessibility awareness, and clean project presentation.

## Live Demo

Add your deployed link here:

```txt
https://your-live-demo-url.com
```

## Preview

<img src="img/showcase.png" alt="Wander.za landing page showcase" width="100%">

## Features

- Animated GSAP preloader with image reveal, counter animation, and brand title animation
- Layered hero section with foreground subject cutout, large typography, and clear calls to action
- Responsive navigation with a working mobile menu
- Destination carousel with previous/next controls
- South Africa map marker that updates based on the active destination
- Search interaction that jumps to matching destinations
- Scroll-triggered section reveals using GSAP ScrollTrigger
- Feature/stat cards explaining the product value
- Three-step “How it works” section
- Traveler review cards
- Front-end trip enquiry form with validation-ready structure
- Accessible skip link, focus states, aria labels, and reduced-motion support
- Responsive layouts for desktop, tablet, and mobile

## Built With

- HTML5
- CSS3
- JavaScript ES Modules
- GSAP
- GSAP ScrollTrigger
- GSAP SplitText
- Vite or any modern local dev server

## What I Focused On

### UI and Visual Design

The page uses large expressive typography, soft card layouts, rounded sections, and a travel-focused color palette. The goal was to create a landing page that feels modern, premium, and easy to scan.

### Animation and Interaction

The project uses GSAP for the preloader, page reveal, scroll reveals, and destination card transitions. I paid attention to sequencing so the preloader does not hide the hero animation and so the page feels smooth instead of jumpy.

### Responsive Design

Each major section adapts for smaller screens. The desktop layout uses split panels and staggered cards, while mobile layouts simplify into stacked cards for readability.

### Accessibility

The project includes:

- Semantic sections
- Descriptive alt text where useful
- Decorative images hidden from assistive technology where appropriate
- Keyboard focus styles
- A skip-to-content link
- aria labels for icon buttons
- Reduced-motion support for users who prefer less animation

### JavaScript Structure

The JavaScript is organized around clear responsibilities:

- Intro/preloader animation
- Mobile menu
- Search behavior
- Scroll reveal animations
- Destination carousel and map marker updates
- Front-end form handling

## Getting Started

Clone the repository:

```bash
git clone https://github.com/johnshoko-byte/wander-za.git
cd wander-za
```

Install dependencies:

```bash
npm install
```

Install GSAP if it is not already in the project:

```bash
npm install gsap
```

Run the project locally:

```bash
npm run dev
```

Open the local URL shown in your terminal.

## Important Note

This project uses JavaScript module imports like:

```js
import gsap from "gsap";
```

Because of that, the project should be run through a local development server such as Vite. Opening the HTML file directly in the browser may cause module import errors.

## Folder Structure

```txt
wander-za/
├── index.html
├── style.css
├── script.js
├── img/
│   ├── background.png
│   ├── subject.png
│   ├── south-africa-map.png
│   ├── cape-town.jpg
│   ├── garden-route.jpg
│   ├── durban.jpg
│   ├── drakensberg.jpg
│   ├── kruger.jpg
│   ├── johannesburg.jpg
|   └── showcase.png
└── README.md
```

## Destination Map System

Each destination has `mapX` and `mapY` values:

```js
{
    name: "Cape Town",
    mapX: 18.6,
    mapY: 94.6,
}
```

These values represent percentages from the left and top of the map image. The marker is positioned inside the same wrapper as the map, so it stays accurate across screen sizes.

## Future Improvements

- Connect the trip enquiry form to a backend service such as Supabase, Firebase, or Formspree
- Add a review submission system with moderation
- Add real booking data and destination filtering
- Add route pages for each destination
- Add a weather API for destination-specific travel conditions
- Optimize images further with WebP/AVIF formats
- Add automated Lighthouse checks before deployment

## What This Project Demonstrates

This project demonstrates the ability to build a complete front-end experience rather than only a static page. It includes layout design, animation, responsive behavior, state-driven UI updates, accessibility improvements, and code organization suitable for a portfolio project.

## Author

Built by John Lincoln Shoko.

