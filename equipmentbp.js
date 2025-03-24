const equipmentList = document.getElementById('equipmentItems');
const equipmentForm = document.getElementById('equipmentForm');

let equipmentData = []; // Store available equipment

equipmentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('equipmentName').value;
    const category = document.getElementById('equipmentCategory').value;
    const quantity = document.getElementById('equipmentQuantity').value;
    const availability = document.getElementById('equipmentAvailability').value;
    const condition = document.getElementById('equipmentCondition').value;

    let existingItem = equipmentData.find(item => item.name.toLowerCase() === name.toLowerCase());

    if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.availability = availability;
        existingItem.condition = condition;
        alert("Equipment details updated successfully!");
    } else {
        let newItem = {
            name,
            category,
            quantity,
            availability,
            condition
        };

        equipmentData.push(newItem);
        const li = document.createElement('li');
        li.textContent = `${name} - ${category} - Qty: ${quantity} - ${availability} - Condition: ${condition}`;
        equipmentList.appendChild(li);
        alert("New equipment added successfully!");
    }

    // Store data in localStorage so the request page can access it
    localStorage.setItem('equipmentData', JSON.stringify(equipmentData));

    // Reset form
    equipmentForm.reset();
});
