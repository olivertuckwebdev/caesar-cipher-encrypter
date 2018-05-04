// Store the alphabet in the alphabetString variable
var alphabetString = "abcdefghijklmnopqrstuvwxyz";
var encryptionKey;
var userInput;
var letterIndexes;
var letterEncryptedIndexes;
var encryptedOutput;
var decryptedOutput;

// Trigger the encryptMessage function upon clicking the encrypt button using an event listener
document.getElementById("encrypt-btn").addEventListener("click", encryptMessage);

// Encryption function
function encryptMessage() {
  encryptionKey = eval(document.getElementById("encryption-key-select").value);
  userInput = document.getElementById("encrypter-input").value.toLowerCase();
  letterIndexes = [];
  letterEncryptedIndexes = [];
  encryptedOutput = [];
  for (var i = 0; i < userInput.length; i++) {
    letterIndexes[i] = alphabetString.indexOf(userInput[i]);
    if (letterIndexes[i] === -1) {
      encryptedOutput[i] = userInput[i];
    } else if (letterIndexes[i] > -1 && letterIndexes[i] < alphabetString.length - encryptionKey) {
      letterEncryptedIndexes[i] = letterIndexes[i] + encryptionKey;
      encryptedOutput[i] = alphabetString[letterEncryptedIndexes[i]];
    } else {
      letterEncryptedIndexes[i] = letterIndexes[i] - alphabetString.length + encryptionKey;
      encryptedOutput[i] = alphabetString[letterEncryptedIndexes[i]];
    }
  }
  document.getElementById("encrypter-input").value = encryptedOutput.join("");
}

// Trigger the copy to clipboard function upon clicking the copy to clipboard button using an event listener
document.getElementById("copy-to-clipboard-btn").addEventListener("click", copyToClipboard);

function copyToClipboard() {
  var copyText = document.getElementById("encrypter-input");
  copyText.select();
  document.execCommand("Copy");
  if (!document.getElementById("copyAlert")) {
    var alert = document.createElement("div");
    alert.setAttribute("class", "alert alert-success");
    alert.setAttribute("id", "copyAlert");
    alert.setAttribute("role", "alert");
    var alertText = document.createTextNode("Message copied to clipboard.");
    alert.appendChild(alertText);
    var encrypterBody = document.getElementById("encrypter-body");
    encrypterBody.insertBefore(alert, encrypterBody.childNodes[0]);
  }
}

// Trigger the decryptMessage function upon clicking the decrypt button using an event listener
document.getElementById("decrypt-btn").addEventListener("click", decryptMessage);

// Decryption Function
function decryptMessage() {
  encryptionKey = eval(document.getElementById("encryption-key-select").value);
  userInput = document.getElementById("decrypter-input").value;
  letterEncryptedIndexes = [];
  letterIndexes = [];
  decryptedOutput = [];
  for (var i = 0; i < userInput.length; i++) {
    letterEncryptedIndexes[i] = alphabetString.indexOf(userInput[i]);
    if (letterEncryptedIndexes[i] === -1) {
      decryptedOutput[i] = userInput[i];
    } else if (letterEncryptedIndexes[i] > -1 && letterEncryptedIndexes[i] < encryptionKey)  {
      letterIndexes[i] = letterEncryptedIndexes[i] + alphabetString.length - encryptionKey;
      decryptedOutput[i] = alphabetString[letterIndexes[i]];
    } else {
      letterIndexes[i] = letterEncryptedIndexes[i] - encryptionKey;
      decryptedOutput[i] = alphabetString[letterIndexes[i]];
    }
  }
  document.getElementById("decrypter-input").value = decryptedOutput.join("");
}
