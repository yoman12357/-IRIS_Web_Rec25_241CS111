const adminRequests = document.getElementById('adminRequests');

let requests = JSON.parse(localStorage.getItem('equipmentRequests')) || [];

function displayRequests() {
    adminRequests.innerHTML = "";

    if (requests.length === 0) {
        adminRequests.innerHTML = "<p>No equipment requests found.</p>";
        return;
    }

    requests.forEach((request, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${request.equipment} - Qty: ${request.quantity} - ${request.duration} 
        <span class="status ${request.status.toLowerCase()}">${request.status}</span>`;

        if (request.status === "Pending") {
            const approveButton = document.createElement("button");
            approveButton.textContent = "Approve";
            approveButton.classList.add("approve");
            approveButton.onclick = function () {
                approveRequest(index);
            };

            const rejectButton = document.createElement("button");
            rejectButton.textContent = "Reject";
            rejectButton.classList.add("reject");
            rejectButton.onclick = function () {
                rejectRequest(index);
            };

            li.appendChild(approveButton);
            li.appendChild(rejectButton);
        }

        adminRequests.appendChild(li);
    });
}

function approveRequest(index) {
    requests[index].status = "Approved";
    localStorage.setItem('equipmentRequests', JSON.stringify(requests));
    displayRequests();
}

function rejectRequest(index) {
    let reason = prompt("Enter reason for rejection:");
    requests[index].status = `Rejected (${reason})`;
    localStorage.setItem('equipmentRequests', JSON.stringify(requests));
    displayRequests();
}

displayRequests();
