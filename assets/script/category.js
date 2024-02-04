// Simplify touch event handling
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event, divNumber) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe(divNumber);
    document.body.style.overflowX = 'auto';
}

function handleSwipe(divNumber) {
    const swipeDistance = touchEndX - touchStartX;
    if (swipeDistance > 50) {
        closeDiv(divNumber);
    }
}

function toggleDisplay(divNumber) {
    const hiddenDiv = document.getElementById('hiddenDiv' + divNumber);
    const disabledContent = document.getElementById('header');

    document.body.style.overflow = 'hidden'; // Disables both horizontal and vertical overflow
    hiddenDiv.style.display = 'flex';
    hiddenDiv.style.animation = 'slideIn 0.5s forwards';
    disabledContent.classList.add('disabled-content');

    // Attach touch event listeners
    hiddenDiv.addEventListener('touchstart', handleTouchStart);
    hiddenDiv.addEventListener('touchend', event => handleTouchEnd(event, divNumber));
}

function closeDiv(divNumber) {
    const hiddenDiv = document.getElementById('hiddenDiv' + divNumber);
    const disabledContent = document.getElementById('header');

    hiddenDiv.style.animation = 'slideOut 0.5s forwards';
    setTimeout(() => {
        hiddenDiv.style.display = 'none';
        document.body.style.overflow = 'auto';
        disabledContent.classList.remove('disabled-content');
    }, 500);

    // Remove touch event listeners after closing
    hiddenDiv.removeEventListener('touchstart', handleTouchStart);
    hiddenDiv.removeEventListener('touchend', event => handleTouchEnd(event, divNumber));
}

// Handle scroll events to show/hide the close button
let lastScrollTop = 0;

function handleScroll() {
    const scrollTop = this.scrollTop;

    if (scrollTop > lastScrollTop) {
        document.querySelector('.close-category').classList.add('fade-out');
        document.querySelector('.close-category').classList.remove('fade-in');
    } else {
        document.querySelector('.close-category').classList.add('fade-in');
        document.querySelector('.close-category').classList.remove('fade-out');
    }

    lastScrollTop = scrollTop;
}

document.getElementById('hiddenDiv1').addEventListener('scroll', handleScroll);

// Additional scroll event handling
const closeButton = document.getElementById('closeButton');
document.getElementById('hiddenDiv1').addEventListener('scroll', () => {
    const scrollTop = this.scrollTop;

    closeButton.classList.toggle('fade-out', scrollTop > lastScrollTop);
    lastScrollTop = scrollTop;
});

function searchItems() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const items = document.getElementsByClassName('event-hidden-div-item');
    let foundItems = false; // Flag to check if any items are found

    // Reset animation properties and display all items
    for (const item of items) {
        item.style.animation = 'none';
        item.style.display = 'block';
    }

    for (const item of items) {
        const itemId = item.getAttribute('id');
        const itemText = item.getElementsByTagName('p')[0].textContent.toLowerCase();

        console.log('Item ID:', itemId);
        console.log('Item Text:', itemText);

        if (itemText.includes(input) || itemId.includes(input)) {
            item.style.animation = 'slideInRightToLeft 0.5s ease-in-out 200ms forwards';
            foundItems = true; // Set the flag to true if at least one item is found
        } else {
            item.style.display = 'none';
        }
    }

    // Display a message if no items are found
    const noItemsMessage = document.getElementById('noItemsMessage');
    if (!foundItems) {
        noItemsMessage.style.display = 'block';
    } else {
        noItemsMessage.style.display = 'none';
    }
}

