const adminBookingList = document.getElementById('adminBookingList');

// Load existing bookings
let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

function displayBookings() {
    adminBookingList.innerHTML = "";
    
    if (bookings.length === 0) {
        adminBookingList.innerHTML = "<p>No booking requests found.</p>";
        return;
    }

    bookings.forEach((booking, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${booking.facility} - ${booking.date} - ${booking.slot} 
        <span class="status ${booking.status.toLowerCase()}">${booking.status}</span>`;
        
        if (booking.status === "Pending" || booking.status === "Cancellation Requested") {
            const approveButton = document.createElement("button");
            approveButton.textContent = "Approve";
            approveButton.classList.add("approve");
            approveButton.onclick = function () {
                approveBooking(index);
            };

            const rejectButton = document.createElement("button");
            rejectButton.textContent = "Reject";
            rejectButton.classList.add("reject");
            rejectButton.onclick = function () {
                rejectBooking(index);
            };

            li.appendChild(approveButton);
            li.appendChild(rejectButton);
        }

        adminBookingList.appendChild(li);
    });
}

function approveBooking(index) {
    bookings[index].status = "Approved";
    localStorage.setItem('bookings', JSON.stringify(bookings));
    displayBookings();
}

function rejectBooking(index) {
    let reason = prompt("Enter reason for rejection:");
    bookings[index].status = `Rejected (${reason})`;
    localStorage.setItem('bookings', JSON.stringify(bookings));
    displayBookings();
}

displayBookings();
