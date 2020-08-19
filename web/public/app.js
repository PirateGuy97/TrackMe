$('#navbar').load('navbar.html');
$('#footer').load('footer.html');
const API_URL = 'http://localhost:5000/api';
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://defaultUser:defaultPassword@cluster0.e0ode.mongodb.net', {useNewUrlParser: true, useUnifiedTopology: true });
const users = JSON.parse(localStorage.getItem('users')) || [];
localStorage.setItem('users', JSON.stringify(users));
const devices = JSON.parse(localStorage.getItem('devices')) || [];
const response = $.get(`${API_URL}/devices`).then(response => {
    response.forEach(device => {
        $('#devices tbody').append(`
        <tr>
            <td>${device.user}</td>
            <td>${device.name}</td>
        </tr>`
        );
    });
}).catch(error => {
    console.error(`Error: ${error}`);
});


$('#add-device').on('click', () => {
    const user = $('#user').val();
    const name = $('#name').val();
    const sensorData = [];

    const body = {
        name,
        user,
        sensorData
    };

    $.post(`${API_URL}/devices`, body).then(response => {
        location.href = '/';
    }).catch(error => {
        console.error(`Error: ${error}`);
    });
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