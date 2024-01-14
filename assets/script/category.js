var touchStartX = 0;
var touchEndX = 0;

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event, divNumber) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe(divNumber);
document.body.style.overfl}

function handleSwipe(divNumber) {
    var swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > 50) {
        closeDiv(divNumber);
    }
}

function toggleDisplay(divNumber) {
    var hiddenDiv = document.getElementById('hiddenDiv' + divNumber);
    var disabledContent = document.getElementById('header'); // Update this ID based on your structure

    overflow = 'hidden'; // Disable scrolling on the background
    hiddenDiv.style.display = 'flex';
    hiddenDiv.style.animation = 'slideIn 0.5s forwards';
    disabledContent.classList.add('disabled-content');

    // Attach touch event listeners
    hiddenDiv.addEventListener('touchstart', handleTouchStart);
    hiddenDiv.addEventListener('touchend', function(event) {
        handleTouchEnd(event, divNumber);
    });
}

function closeDiv(divNumber) {
  var hiddenDiv = document.getElementById('hiddenDiv' + divNumber);
  var disabledContent = document.getElementById('header'); // Update this ID based on your structure

  hiddenDiv.style.animation = 'slideOut 0.5s forwards';
  setTimeout(function () {
      hiddenDiv.style.display = 'none';
      document.body.style.overflow = 'auto'; // Enable scrolling on the background
      disabledContent.classList.remove('disabled-content');
  }, 500); // Adjust the time to match the transition duration

  // Remove touch event listeners after closing
  hiddenDiv.removeEventListener('touchstart', handleTouchStart);
  hiddenDiv.removeEventListener('touchend', handleTouchEnd);
}

// Handle scroll events to show/hide the close button
var lastScrollTop = 0;

document.getElementById('hiddenDiv1').addEventListener('scroll', function () {
    var scrollTop = this.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        document.querySelector('.close-category').classList.add('fade-out');
        document.querySelector('.close-category').classList.remove('fade-in');
    } else {
        // Scrolling up
        document.querySelector('.close-category').classList.add('fade-in');
        document.querySelector('.close-category').classList.remove('fade-out');
    }

    lastScrollTop = scrollTop;
});

// JavaScript for handling scroll events
var lastScrollTop = 0;
var closeButton = document.getElementById('closeButton');

document.getElementById('hiddenDiv1').addEventListener('scroll', function () {
    var scrollTop = this.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        closeButton.classList.add('fade-out');
    } else {
        // Scrolling up
        closeButton.classList.remove('fade-out');
    }

    lastScrollTop = scrollTop;
});
function searchItems() {
    var input = document.getElementById('searchInput').value.toLowerCase();
    var items = document.getElementsByClassName('history-hidden-div-item');

    // Reset animation properties
    for (var i = 0; i < items.length; i++) {
        items[i].style.animation = 'none';
    }

    for (var i = 0; i < items.length; i++) {
        var itemId = items[i].getAttribute('id');
        var itemText = items[i].getElementsByTagName('p')[0].textContent.toLowerCase();

        console.log('Item ID:', itemId); // Log the item ID for debugging
        console.log('Item Text:', itemText); // Log the item text for debugging

        if (itemText.includes(input) || itemId.includes(input)) {
            items[i].style.display = 'block';

            // Apply animation for visible items
            items[i].style.animation = 'slideInRightToLeft 0.5s ease-in-out 200ms forwards';
        } else {
            items[i].style.display = 'none';
        }
    }
}
