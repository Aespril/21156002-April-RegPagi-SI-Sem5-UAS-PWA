// Inisialisasi IndexedDB
var db;
var request = indexedDB.open('komentarDB', 1);

request.onerror = function(event) {
    console.log("Error saat membuka database: " + event.target.errorCode);
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("komentar", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("email", "email", {unique: false});
    objectStore.createIndex("subject", "subject", { unique: false });
    objectStore.createIndex("message", "message", { unique: false });
};

request.onsuccess = function(event) {
    db = event.target.result;
    // showComments();
};

// Menambahkan komentar ke dalam IndexedDB
document.getElementById('komentar').addEventListener('submit', function(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    var transaction = db.transaction(['komentar'], 'readwrite');
    var objectStore = transaction.objectStore('komentar');
    var comment = { name: name, email : email, subject: subject, message: message };
    objectStore.add(comment);

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value;
    document.getElementById('message').value = '';

    transaction.oncomplete = function() {
        console.log("Komentar telah disimpan.");
        document.getElementById("komentar").reset();
        // tampilkanKomentar();
    };

    transaction.onerror = function(event) {
        console.error("Kesalahan saat menyimpan komentar: " + event.target.error);
    };
    

    // showComments();
});