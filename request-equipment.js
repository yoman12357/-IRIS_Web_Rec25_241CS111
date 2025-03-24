const requestForm = document.getElementById('requestForm');
const requestList = document.getElementById('studentRequests');

let requests = JSON.parse(localStorage.getItem('equipmentRequests')) || [];

function displayRequests() {
    requestList.innerHTML = "";

    if (requests.length === 0) {
        requestList.innerHTML = "<p>No requests found.</p>";
        return;
    }

    requests.forEach((request, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${request.equipment} - Qty: ${request.quantity} - ${request.duration} 
        <span class="status ${request.status.toLowerCase()}">${request.status}</span>`;
        requestList.appendChild(li);
    });
}

requestForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const equipment = document.getElementById('equipmentRequest').value;
    const quantity = document.getElementById('requestQuantity').value;
    const duration = document.getElementById('requestDuration').value;

    if (!equipment || quantity <= 0 || !duration) {
        alert("Please fill all fields correctly.");
        return;
    }

    const newRequest = {
        equipment,
        quantity,
        duration,
        status: "Pending"
    };

    requests.push(newRequest);
    localStorage.setItem('equipmentRequests', JSON.stringify(requests));

    alert("Request submitted successfully! Waiting for admin approval.");
    displayRequests();
});

displayRequests();
