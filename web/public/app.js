$('#navbar').load('navbar.html');
$('#footer').load('footer.html');
const users = JSON.parse(localStorage.getItem('users')) || [];
localStorage.setItem('users', JSON.stringify(users));
const devices = JSON.parse(localStorage.getItem('devices')) || [];
localStorage.setItem('devices', JSON.stringify(devices));

devices.forEach(function(device) {
    $('#devices tbody').append(`
        <tr>
            <td>${device.user}</td>
            <td>${device.name}</td>
        </tr>`
    );
});

$('#add-device').on('click', function() {
    const user = $('#user').val();
    const name = $('#name').val();
    devices.push({ user, name });
    location.href = '/';
});

$('#send-command').on('click', function() {
    const command = $('#command').val();
    console.log(`command is: ${command}`);
});

$('#register').on('click', function() {
    const username = $('#username').val();
    const password = $('#password').val();
    const confirm = $('#confirm').val();
    const exists = users.find((user) => {
        return user.name === username;
    });
    if (typeof exists === "undefined") {
        $("message").empty();
        $("message").append("<p>Given username has already been used.</p>");
    } else {
        if (password === confirm) {
            users.push({ username, password });
            location.href = '/login';
        } else {
            $("message").empty();
            $("message").append("<p>Password and Confirm inputs are different.</p>");
        }
    }
});

$('#login').on('click', function() {
    const username = $('#username').val();
    const password = $('#password').val();
    const exists = users.find((user) => {
        return user.name === username;
    });
    if (typeof exists === "undefined") {
        $("message").empty();
        $("message").append("<p>Given username was not found.</p>");
    } else {
        if (exists.password === password) {
            localStorage.setItem('isAuthenticated', true);
            location.href = '/';
        } else {
            $("message").empty();
            $("message").append("<p>Given password was incorrect.</p>");
        }
    }
});

const logout = () => {
    localStorage.removeItem('isAuthenticated');
    location.href = '/login';
}