let db;
let dbReq = indexedDB.open('db', 1);
dbReq.onupgradeneeded = function(event) {
    db = event.target.result;
    let users = db.createObjectStore('users', {autoIncrement: true});
}
dbReq.onsuccess = function(event) {
    db = event.target.result;
}
dbReq.onerror = function(event) {
    alert('error opening database ' + event.target.errorCode);
}

function createUser(db, email, password) {
    let transaction = db.transaction(['users'], 'readwrite');
    let objectStore = transaction.objectStore('users');
    let user = {email: email, password: password};
    objectStore.add(user.password, email);
    transaction.oncomplete = function() { console.log('User created!') }
    transaction.onerror = function(event) {
        alert('error creating user ' + event.target.errorCode);
    }
}

function registerUser() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirm_password = document.getElementById('password-confirm');
    createUser(db, email.value, password.value);
    window.location.href = "login.html";
    email.value = '';
    password.value = '';
    confirm_password = '';
}

function getUser() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value
    var transaction = db.transaction(['users'], 'readonly');
    var objectStore = transaction.objectStore("users");
    var request = objectStore.openCursor();
    request.onerror = function(event) {
        console.err("error fetching data");
    };
    request.onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
            let key = cursor.primaryKey;
            let value = cursor.value;
            if(key == email) {
                if(password != value) {
                    alert("Could not log you in");
                    return;
                }
                window.location.href = "package.html";
                email = '';
                password = '';
            }
        }
        else {
            alert("No user found, please register first.");
        }
    };
}