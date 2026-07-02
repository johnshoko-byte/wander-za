import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(CustomEase, SplitText, ScrollTrigger);
document.documentElement.classList.add("js-ready");

CustomEase.create("hop", "0.8, 0, 0.2, 1");
CustomEase.create("hop2", "0.9, 0, 0.1, 1");

const prefersReducedMotion = false;
const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchQuery");
const searchButton = document.querySelector(".search-icon-btn");
const preloader = document.querySelector(".preloader");
const destinationCards = document.querySelector("#destinationCards");
const nextDestinationBtn = document.querySelector(".destination-arrow.next");
const prevDestinationBtn = document.querySelector(".destination-arrow.prev");
const mapMarker = document.querySelector(".map-marker");
const activeDestinationName = document.querySelector("#activeDestinationName");
const tripForm = document.querySelector("#tripForm");
const formStatus = document.querySelector("#formStatus");
const searchResults = document.querySelector("#searchResults");

const splitText = (selector, type, className, mask = true) => {
    const element = document.querySelector(selector);

    if (!element) return null;

    return SplitText.create(selector, {
        type,
        [`${type}Class`]: className,
        ...(mask && { mask: type }),
    });
};

function lockPage() {
    document.body.classList.add("is-loading");
}

function unlockPage() {
    document.body.classList.remove("is-loading");
}

function finishPreloader() {
    if (preloader) {
        gsap.set(preloader, { display: "none" });
    }

    unlockPage();
}

function setupIntroAnimation() {
    lockPage();

    const preloaderHeaderSplit = splitText(".preloader-header h1", "chars", "char");
    const navSplit = splitText("nav a", "words", "word");
    const headingSplit = splitText(".sandwich-text", "chars", "char", false);

    gsap.set(".preloader-header h1, .preloader-counter p", {
        autoAlpha: 1,
    });

    gsap.set(".preloader-header .char, .sandwich-text .char, nav a .word", {
        display: "inline-block",
    });

    gsap.set(".preloader-header .char", { yPercent: 100 });
    gsap.set(".preloader-counter p", { yPercent: 100 });
    gsap.set("nav a .word", { yPercent: 100 });
    gsap.set(".sandwich-text .char", { yPercent: 100 });

    gsap.set(".sandwich-logo", {
        autoAlpha: 0,
        scale: 0.92,
    });

    gsap.set(".sandwich-front-text", {
        autoAlpha: 0,
        y: 20,
    });

    const preloaderImgInitRotation = [7.5, -2.5, -10, 12.5, -5, 5];

    gsap.set(".preloader-img", {
        xPercent: -50,
        yPercent: -50,
        scale: 0.001,
        autoAlpha: 1,
        clipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)",
        rotate: (i) => preloaderImgInitRotation[i],
        transformOrigin: "50% 50%",
        force3D: true,
    });

    gsap.set(".preloader-img img", {
        scale: 1.04,
        transformOrigin: "50% 50%",
        force3D: true,
    });

    if (prefersReducedMotion) {
        gsap.set(".sandwich-text .char, nav a .word", { yPercent: 0 });
        gsap.set(".sandwich-logo, .sandwich-front-text", { autoAlpha: 1, scale: 1, y: 0 });
        finishPreloader();
        preloaderHeaderSplit?.revert?.();
        navSplit?.revert?.();
        headingSplit?.revert?.();
        return;
    }

    // Main timeline
    const tl = gsap.timeline({
        paused: true,
        delay: 0.15,
        defaults: {
            overwrite: "auto",
        },
    });

    // Images appear
    tl.to(".preloader-img", {
        scale: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.8,
        ease: "hop",
        stagger: 0.11,
    });

    tl.to(
        ".preloader-img img",
        {
            scale: 1,
            duration: 0.8,
            ease: "hop",
            stagger: 0.11,
        },
        "<"
    );

    // Preloader title appears
    tl.to(
        ".preloader-header .char",
        {
            yPercent: 0,
            duration: 0.8,
            ease: "hop2",
            stagger: {
                each: 0.075,
                from: "random",
            },
        },
        0.25
    );

    // Counter appears and counts up
    tl.to(
        ".preloader-counter p",
        {
            yPercent: 0,
            duration: 0.6,
            ease: "hop2",
            onStart: () => {
                const counterEl = document.querySelector(".preloader-counter p");
                const counter = { value: 0 };

                gsap.to(counter, {
                    value: 100,
                    duration: 1.45,
                    ease: "power2.out",
                    onUpdate: () => {
                        counterEl.textContent = String(Math.round(counter.value)).padStart(3, "0");
                    },
                });
            },
        },
        0.25
    );

    // Counter leaves
    tl.to(
        ".preloader-counter p",
        {
            yPercent: -100,
            duration: 0.5,
            ease: "hop2",
        },
        1.75
    );

    // Preloader title leaves
    tl.to(
        ".preloader-header .char",
        {
            yPercent: -100,
            duration: 0.6,
            ease: "hop2",
            stagger: {
                each: 0.055,
                from: "random",
            },
        },
        1.75
    );

    // Images leave
    tl.to(
        ".preloader-img",
        {
            scale: 0.001,
            clipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)",
            duration: 0.65,
            ease: "hop2",
            stagger: -0.055,
        },
        2.0
    );

    tl.to(
        ".preloader-img img",
        {
            scale: 1.04,
            duration: 0.65,
            ease: "hop2",
            stagger: -0.055,
        },
        "<"
    );

    // Preloader exits
    tl.to(
        ".preloader",
        {
            yPercent: -100,
            duration: 0.7,
            ease: "hop2",
            onComplete: () => {
                document.documentElement.classList.add("site-ready");

                gsap.set(".preloader", {
                    display: "none",
                });

                document.body.classList.remove("is-loading");
            },
        },
        2.7
    );

    // Hero title appears after preloader is mostly gone
    tl.to(
        ".sandwich-text .char",
        {
            yPercent: 0,
            duration: 1,
            ease: "hop2",
            stagger: {
                each: 0.065,
                from: "random",
            },
        },
        3.15
    );

    tl.to(
        ".sandwich-logo",
        {
            autoAlpha: 1,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
        },
        3.3
    );

    tl.to(
        ".sandwich-front-text",
        {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
        },
        3.45
    );

    tl.to(
        "nav a .word",
        {
            yPercent: 0,
            duration: 0.85,
            ease: "hop",
            stagger: 0.055,
        },
        3.15
    );

    if (document.readyState === "complete" || document.readyState === "interactive") {
        tl.play();
    } else {
        document.addEventListener("DOMContentLoaded", () => tl.play(), { once: true });
    }
}

function setupMobileMenu() {
    if (!menuToggle || !header) return;

    menuToggle.addEventListener("click", () => {
        const isOpen = header.classList.toggle("is-menu-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    document.querySelectorAll("#primary-navigation a").forEach((link) => {
        link.addEventListener("click", () => {
            header.classList.remove("is-menu-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open menu");
        });
    });
}

function setupSearch() {
    if (!searchForm || !searchInput) return;

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        const matchIndex = destinations.findIndex((destination) => {
            return [destination.name, destination.province, destination.type]
                .join(" ")
                .toLowerCase()
                .includes(query);
        });

        if (matchIndex >= 0) {
            currentDestinationIndex = matchIndex;
            renderDestinations("next");
            document.querySelector("#destinations")?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            searchInput.setCustomValidity("No matching destination yet. Try Cape Town, Durban, Kruger, or Garden Route.");
            searchInput.reportValidity();
            window.setTimeout(() => searchInput.setCustomValidity(""), 1800);
        }
    });

    searchButton?.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            searchForm.classList.toggle("is-open");
            searchInput.focus();
            return;
        }

        searchForm.requestSubmit();
    });
}

function getDestinationMatches(query) {
    const cleanQuery = query.trim().toLowerCase();

    if (!cleanQuery) return [];

    return destinations.filter((destination) => {
        return (
            destination.name.toLowerCase().includes(cleanQuery) ||
            destination.province.toLowerCase().includes(cleanQuery) ||
            destination.type.toLowerCase().includes(cleanQuery) ||
            destination.description.toLowerCase().includes(cleanQuery)
        );
    });
}

function selectDestination(destinationName) {
    const foundIndex = destinations.findIndex((destination) => {
        return destination.name === destinationName;
    });

    if (foundIndex === -1) return;

    currentDestinationIndex = foundIndex;
    renderDestinations();

    document.querySelector("#destinations").scrollIntoView({
        behavior: "smooth",
        block: "start",
    });

    searchInput.value = "";
    searchResults.classList.remove("is-open");
    searchResults.innerHTML = "";
}

function renderSearchResults() {
    const query = searchInput.value;
    const matches = getDestinationMatches(query).slice(0, 4);

    if (!query.trim()) {
        searchResults.classList.remove("is-open");
        searchResults.innerHTML = "";
        return;
    }

    searchResults.classList.add("is-open");

    if (matches.length === 0) {
        searchResults.innerHTML = `
            <div class="search-empty">
                No destination found. Try “Cape Town”, “Safari”, or “Coast”.
            </div>
        `;
        return;
    }

    searchResults.innerHTML = matches
        .map((destination) => {
            return `
                <button class="search-result-btn" type="button" data-destination="${destination.name}">
                    ${destination.name}
                    <small>${destination.province} · ${destination.type}</small>
                </button>
            `;
        })
        .join("");
}

searchInput.addEventListener("input", renderSearchResults);

searchResults.addEventListener("click", (event) => {
    const button = event.target.closest(".search-result-btn");

    if (!button) return;

    selectDestination(button.dataset.destination);
});

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const matches = getDestinationMatches(searchInput.value);

    if (matches.length > 0) {
        selectDestination(matches[0].name);
    }
});

document.addEventListener("click", (event) => {
    const clickedInsideSearch = event.target.closest(".search-area");

    if (!clickedInsideSearch) {
        searchResults.classList.remove("is-open");
    }
});

searchButton.addEventListener("click", () => {
    searchInput.focus();
});
function setupScrollReveals() {
    if (prefersReducedMotion) return;

    const revealGroups = [
        {
            trigger: ".features-section",
            targets: ".features-section .info, .features-section .stat, .features-section .card",
        },
    ];

    revealGroups.forEach(({ trigger, targets }) => {
        if (!document.querySelector(trigger)) return;

        gsap.set(targets, { autoAlpha: 0, y: 36 });

        gsap.to(targets, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
                trigger,
                start: "top 76%",
                once: true,
            },
        });
    });
}

const destinations = [
    {
        name: "Cape Town",
        province: "Western Cape",
        description: "Coastlines, Table Mountain, food markets, and iconic city views.",
        image: "/img/cape-town.jpg",
        price: "From R4,999",
        type: "Coastal city",
        mapX: 18.6,
        mapY: 94.6,
    },
    {
        name: "Garden Route",
        province: "Western Cape",
        description: "Forests, lagoons, beaches, and one of South Africa’s best road trips.",
        image: "/img/garden-route.jpg",
        price: "From R4,299",
        type: "Road trip",
        mapX: 32.8,
        mapY: 93.7,
    },
    {
        name: "Durban",
        province: "KwaZulu-Natal",
        description: "Warm beaches, Indian Ocean views, and vibrant local culture.",
        image: "/img/durban.jpg",
        price: "From R3,299",
        type: "Beach city",
        mapX: 83.1,
        mapY: 61.6,
    },
    {
        name: "Drakensberg",
        province: "KwaZulu-Natal",
        description: "Mountain hikes, waterfalls, fresh air, and peaceful valleys.",
        image: "/img/drakensberg.jpg",
        price: "From R3,499",
        type: "Mountain escape",
        mapX: 79.9,
        mapY: 46.3,
    },
    {
        name: "Kruger National Park",
        province: "Mpumalanga",
        description: "Wildlife drives, bush lodges, and unforgettable safari routes.",
        image: "/img/kruger.jpg",
        price: "From R5,999",
        type: "Safari",
        mapX: 92.1,
        mapY: 18.4,
    },
    {
        name: "Johannesburg",
        province: "Gauteng",
        description: "Museums, nightlife, food spots, and urban South African culture.",
        image: "/img/johannesburg.jpg",
        price: "From R2,999",
        type: "City break",
        mapX: 69.2,
        mapY: 32.8,
    },
];

let currentDestinationIndex = 0;

function getVisibleDestinations() {
    const visible = [];

    for (let i = 0; i < 3; i += 1) {
        const index = (currentDestinationIndex + i) % destinations.length;
        visible.push(destinations[index]);
    }

    return visible;
}

function renderDestinations(direction = "next") {
    if (!destinationCards || !mapMarker || !activeDestinationName) return;

    const visibleDestinations = getVisibleDestinations();
    const activeDestination = visibleDestinations[0];

    activeDestinationName.textContent = activeDestination.name;
    mapMarker.style.left = `${activeDestination.mapX}%`;
    mapMarker.style.top = `${activeDestination.mapY}%`;

    destinationCards.innerHTML = visibleDestinations
        .map((destination) => {
            return `
                <article class="destination-card">
                    <img src="${destination.image}" alt="${destination.name}" loading="lazy" decoding="async">
                    <div class="destination-card-content">
                        <h3>${destination.name}</h3>
                        <p>${destination.description}</p>
                        <div class="destination-meta">
                            <span>${destination.province}</span>
                            <span>${destination.type}</span>
                            <span>${destination.price}</span>
                        </div>
                    </div>
                </article>
            `;
        })
        .join("");

    if (!prefersReducedMotion) {
        gsap.fromTo(
            ".destination-card",
            {
                autoAlpha: 0,
                x: direction === "next" ? 60 : -60,
            },
            {
                autoAlpha: 1,
                x: 0,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.12,
                clearProps: "transform",
            }
        );
    }
}

function setupDestinationControls() {
    nextDestinationBtn?.addEventListener("click", () => {
        currentDestinationIndex = (currentDestinationIndex + 1) % destinations.length;
        renderDestinations("next");
    });

    prevDestinationBtn?.addEventListener("click", () => {
        currentDestinationIndex = (currentDestinationIndex - 1 + destinations.length) % destinations.length;
        renderDestinations("prev");
    });
}

function setupTripForm() {
    if (!tripForm || !formStatus) return;

    tripForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(tripForm);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const destination = String(formData.get("destination") || "").trim();

        if (!name || !email || !destination) {
            formStatus.textContent = "Please complete your name, email, and destination.";
            formStatus.classList.add("is-error");
            return;
        }

        formStatus.classList.remove("is-error");
        formStatus.textContent = `Thanks, ${name}. We'll be in touch about your trip to ${destination}!`;
        tripForm.reset();
    });
}

setupIntroAnimation();
renderDestinations();
setupDestinationControls();
setupMobileMenu();
setupSearch();
setupScrollReveals();
setupTripForm();
