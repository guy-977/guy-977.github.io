
// typing animation
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["a coder", "a front-end developer", "a designer", "ahmed"];
const typingDelay = 200;
const erasingDelay = 50;
const newTextDelay = 1000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    }
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    }
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () { // On DOM Load initiate the effect
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// *** typing animation ***//


// slide animations
// Slider(all Slides in a container)
const slider = document.querySelector(".slider")
// All trails 
const trail = document.querySelector(".trail").querySelectorAll("div")

// Transform value
let value = 0
// trail index number
let trailValue = 0
// interval (Duration)
let interval = 16000

// Function to slide forward
const slide = (condition) => {
    // CLear interval
    clearInterval(start)
    // update value and trailValue
    condition === "increase" ? initiateINC() : initiateDEC()
    // move slide
    move(value, trailValue)
    // Restart Animation
    animate()
    // start interal for slides back 
    start = setInterval(() => slide("increase"), interval);
}

// function for increase(forward, next) configuration
const initiateINC = () => {
    // Remove active from all trails
    trail.forEach(cur => cur.classList.remove("active"))
    // increase transform value
    value === 75 ? value = 0 : value += 25
    // update trailValue based on value
    trailUpdate()
}

// function for decrease(backward, previous) configuration
const initiateDEC = () => {
     // Remove active from all trails
    trail.forEach(cur => cur.classList.remove("active"))
    // decrease transform value
    value === 0 ? value = 75 : value -= 25
     // update trailValue based on value
    trailUpdate()
}

// function to transform slide 
const move = (S, T) => {
    // transform slider
    slider.style.transform = `translateX(-${S}%)`
    //add active class to the current trail
    trail[T].classList.add("active")
}

const tl = gsap.timeline({defaults: {duration: 0.6, ease: "power2.inOut"}})
tl.from(".bg", {x: "-100%", opacity: 0})
  .from(".p-animate", {opacity: 0}, "-=0.3")
  .from(".h1-animate", {opacity: 0, y: "30px"}, "-=0.3")
  .from(".button-animate", {opacity: 0, y: "-40px"}, "-=0.3")

// function to restart animation
const animate = () => tl.restart()

// function to update trailValue based on slide value
const trailUpdate = () => {
    if (value === 0) {
        trailValue = 0
    } else if (value === 25) {
        trailValue = 1
    } else if (value === 50){
        trailValue = 2
    } else {
        trailValue = 3
    }
}   

// Start interval for slides
let start = setInterval(() => slide("increase"), interval)

// Next  and  Previous button function (SVG icon with different classes)
document.querySelectorAll("svg").forEach(cur => {
    // Assign function based on the class Name("next" and "prev")
    cur.addEventListener("click", () => cur.classList.contains("next") ? slide("increase") : slide("decrease"))
})

// function to slide when trail is clicked
const clickCheck = (e) => {
    // CLear interval
    clearInterval(start)
    // remove active class from all trails
    trail.forEach(cur => cur.classList.remove("active"))
    // Get selected trail
    const check = e.target
    // add active class
    check.classList.add("active")

    // Update slide value based on the selected trail
    if(check.classList.contains("box1")) {
        value = 0
    } else if (check.classList.contains("box2")) {
        value = 25
    } else if (check.classList.contains('box3')) {
        value = 50
    } else {
        value = 75
    }
    // update trail based on value
    trailUpdate()
    // transfrom slide
    move(value, trailValue)
    // start animation
    animate()
    // start interval
    start = setInterval(() => slide("increase"), interval)
}

// Add function to all trails
trail.forEach(cur => cur.addEventListener("click", (ev) => clickCheck(ev)))

// Mobile touch Slide Section
const touchSlide = (() => {
    let start, move, change, sliderWidth

    // Do this on initial touch on screen
    slider.addEventListener("touchstart", (e) => {
        // get the touche position of X on the screen
        start = e.touches[0].clientX
        // (each slide with) the width of the slider container divided by the number of slides
        sliderWidth = slider.clientWidth/trail.length
    })
    
    // Do this on touchDrag on screen
    slider.addEventListener("touchmove", (e) => {
        // prevent default function
        e.preventDefault()
        // get the touche position of X on the screen when dragging stops
        move = e.touches[0].clientX
        // Subtract initial position from end position and save to change variabla
        change = start - move
    })

    const mobile = (e) => {
        // if change is greater than a quarter of sliderWidth, next else Do NOTHING
        change > (sliderWidth/4)  ? slide("increase") : null;
        // if change * -1 is greater than a quarter of sliderWidth, prev else Do NOTHING
        (change * -1) > (sliderWidth/4) ? slide("decrease") : null;
        // reset all variable to 0
        [start, move, change, sliderWidth] = [0,0,0,0]
    }
    // call mobile on touch end
    slider.addEventListener("touchend", mobile)
})()


// download cv
const cvButton = document.querySelector('.cv-link')
const contactButton = document.querySelector('.contact-link')

cvButton.addEventListener('click' , ()=> {
    const cvLink = document.createElement('a')
    cvLink.href = 'https://drive.google.com/file/d/13YtJ2ybuX01hqfrMgHe31JA5QugtYLil/view?usp=sharing'
    cvLink.target = '_blank'
    cvLink.click()
})

contactButton.addEventListener('click', () => {
    const contactLink = document.createElement('a')
    contactLink.href = 'contact.html'
    contactLink.click()
})