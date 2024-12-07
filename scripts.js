document.addEventListener("DOMContentLoaded", () => {
    const animatedText = document.querySelectorAll(".text-slide");
    let current = 0;
  
    // Animated text cycle effect
    setInterval(() => {
        animatedText[current].classList.remove("active");
        current = (current + 1) % animatedText.length;
        animatedText[current].classList.add("active");
    }, 3000);
})

// JavaScript to handle the hamburger menu toggle
$(document).ready(function() {
    $('#hamburger').click(function() {
        $('#menuItems').toggleClass('active');
    });
});
    
$(document).ready(function () {
    $(window).scroll(function () {
        // checks if window is scrolled more than 500px, adds/removes solid class
        if ($(this).scrollTop() > 550) {
            $('.navbar').addClass('solid');
            $('.back-to-top').addClass('visible');
        } else {
            $('.navbar').removeClass('solid');
            $('.back-to-top').removeClass('visible');
        }

    });
});


$(document).ready(function () {
    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});

// Select all certificate images
const certificates = document.querySelectorAll('.certificate');

// Get the modal elements
const popup = document.querySelector('.certificate-popup');
const popupImage = document.getElementById('enlargedCertificate');
const close = document.querySelector('.close');

// Add click event listener to each certificate
certificates.forEach(cert => {
    cert.addEventListener('click', function() {
        popup.style.display = 'flex'; // Show the modal
        popupImage.src = this.src; // Display clicked certificate in full-screen popup
        document.body.classList.add('no-scroll'); // Lock background scrolling
    });
});

// Close the popup when the close button is clicked
close.addEventListener('click', function() {
    popup.style.display = 'none'; // Hide the modal
    document.body.classList.remove('no-scroll'); // Enable background scrolling
});

// Close the popup when clicking outside the image
popup.addEventListener('click', function(e) {
    if (e.target !== popupImage) {
        popup.style.display = 'none'; // Hide the modal
        document.body.classList.remove('no-scroll'); // Enable background scrolling
    }
});

console.clear();

const TAIL_LENGTH = 20;

const cursor = document.getElementById('cursor');

let mouseX = 0;
let mouseY = 0;

let cursorCircles;
let cursorHistory = Array(TAIL_LENGTH).fill({x: 0, y: 0});

function onMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function initCursor() {
  for (let i = 0; i < TAIL_LENGTH; i++) {
    let div = document.createElement('div');
    div.classList.add('cursor-circle') ;
    cursor.append(div);
  }
  cursorCircles = Array.from(document.querySelectorAll('.cursor-circle'));
}

function updateCursor() {  
  cursorHistory.shift();
  cursorHistory.push({ x: mouseX, y: mouseY });
    
  for (let i = 0; i < TAIL_LENGTH; i++) {
    let current = cursorHistory[i];
    let next = cursorHistory[i + 1] || cursorHistory[TAIL_LENGTH - 1];
    
    let xDiff = next.x - current.x;
    let yDiff = next.y - current.y;
    
    current.x += xDiff * 0.35;
    current.y += yDiff * 0.35;
    cursorCircles[i].style.transform = `translate(${current.x}px, ${current.y}px) scale(${i/TAIL_LENGTH})`;  
  }
  requestAnimationFrame(updateCursor)
}

document.addEventListener('mousemove', onMouseMove, false);

initCursor();
updateCursor();