const devices = [];

devices.push({ user: "Mary", name: "Mary's iPhone" });
devices.push({ user: "Alex", name: "Alex's Surface Pro" });
devices.push({ user: "Mary", name: "Mary's MacBook" });

devices.forEach(function(device) {
    const table = document.querySelector('#devices');
    const row = document.createElement('tr');

    const user = document.createElement('td');
    const userText = document.createTextNode(device.user);
    user.appendChild(nameText);

    const name = document.createElement('td');
    const nameText = document.createTextNode(device.name);
    name.appendChild(nameText);

    row.appendChild(user);
    row.appendChild(name);

    table.appendChild(row);
});