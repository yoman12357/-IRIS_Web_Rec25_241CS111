const bookingForm = document.getElementById('bookingForm');
const bookingList = document.getElementById('bookingList');

let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

function displayBookings() {
    bookingList.innerHTML = "";
    bookings.forEach((booking, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${booking.facility} - ${booking.date} - ${booking.slot} 
        <span class="status ${booking.status.toLowerCase()}">${booking.status}</span>`;

        if (booking.status === "Pending") {
            const cancelButton = document.createElement("button");
            cancelButton.textContent = "Cancel Request";
            cancelButton.classList.add("cancel");
            cancelButton.onclick = function () {
                cancelBooking(index);
            };
            li.appendChild(cancelButton);
        }

        bookingList.appendChild(li);
    });
}

bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const facility = document.getElementById('facilityName').value;
    const date = document.getElementById('bookingDate').value;
    const slot = document.getElementById('bookingSlot').value;

    if (bookings.some(booking => booking.date === date)) {
        alert("You can only book one slot per day.");
        return;
    }

    const newBooking = {
        facility,
        date,
        slot,
        status: "Pending"
    };

    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    alert("Booking request submitted! Awaiting admin approval.");
    displayBookings();
});

function cancelBooking(index) {
    let confirmation = confirm("Are you sure you want to cancel this booking? This requires admin approval.");
    if (confirmation) {
        bookings[index].status = "Cancellation Requested";
        localStorage.setItem('bookings', JSON.stringify(bookings));
        displayBookings();
    }
}

displayBookings();
