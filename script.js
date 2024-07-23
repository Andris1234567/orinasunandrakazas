document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector(".header");
    const text = document.getElementById("animateText");
    const sentences = text.innerHTML.split('<br>');
    text.innerHTML = '';

    // Pievieno katru teikumu atsevišķi ar div elementiem
    sentences.forEach(sentence => {
        const sentenceDiv = document.createElement('div');
        sentenceDiv.classList.add('sentence');

        // Pievieno katru vārdu atsevišķi ar span elementiem
        sentence.trim().split(' ').forEach(word => {
            const wordSpan = document.createElement('span');
            wordSpan.classList.add('word');

            // Pievieno katru burtu atsevišķi ar span elementiem
            word.split('').forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.classList.add('letter');
                wordSpan.appendChild(charSpan);
            });

            sentenceDiv.appendChild(wordSpan);
        });

        text.appendChild(sentenceDiv);
    });

    const sentencesDiv = document.querySelectorAll('.sentence');
    const letters = document.querySelectorAll('.letter');

    // Pievieno animācijas klasi header elementam pēc 1 sekundes
    setTimeout(() => {
        header.classList.add('animated');
    }, 1000);

    // Pievieno animācijas klasi katram teikumam ar aizkavi
    sentencesDiv.forEach((sentence, index) => {
        setTimeout(() => {
            sentence.classList.add('animated');
        }, 2000 + index * 1000);
    });

    // Pievieno animācijas klasi katram burtam ar aizkavi
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.classList.add('animated');
        }, 3000 + index * 50);
    });
});

function emailSend() {
    var vards = document.getElementById('name').value;
    var ierasanas = document.getElementById('attendance').value;
    var dzeriens = document.getElementById('drink').value;
    var nakts = document.getElementById('overnight').value;
    var dieta = document.getElementById('diet').value;

    var messageBody = "name: " + encodeHTML(vards) +
    "<br/> Ieradīsies: " + encodeHTML(ierasanas) +
    "<br/> Dzērieni: " + encodeHTML(dzeriens) +
    "<br/> Paliks pa nakti: " + encodeHTML(nakts) +
    "<br/> Alerģijas: " + encodeHTML(dieta);

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "andrisbulis98@gmail.com",
        Password : "7636A0AC13B8BF7498A84D2C47916CEA9563",
        To : 'andrisbulis98@gmail.com',
        From : "andrisbulis98@gmail.com",
        Subject : "Kāzu reģistrācija",
        Body : messageBody
    }).then(
      message => {
        if(message === 'OK'){
            swal("Atbildi saņēmām!", "You clicked the button!", "success");
        } else {
            swal("Nesaņēmām :(", "Error: " + message, "error");
        }
      }
    ).catch(error => {
        swal("Nesaņēmām :(", "Network or server error: " + error.message, "error");
    });
}

function encodeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}


