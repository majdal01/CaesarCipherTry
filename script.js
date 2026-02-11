const inputText = document.getElementById("textFelt");
const alertTekst = document.getElementById("alert-tekst");
const skift = document.getElementById("skiftInput");
const alertSkift = document.getElementById("alert-skift");
const krypterBtn = document.getElementById("krypterBtn");
const dekrypterBtn = document.getElementById("dekrypterBtn");
const alertDekrypter = document.getElementById("alert-dekrypter");
const resultat = document.getElementById("output");
const resetBtn = document.getElementById("resetknap");

inputText.addEventListener("input", () => {
    alertTekst.classList.add("hidden");
    alertDekrypter.classList.add("hidden");
});
skift.addEventListener("input", () => {
    alertSkift.classList.add("hidden");
    alertDekrypter.classList.add("hidden");
});

function caesarCipher(tekst, skift) {
    return tekst.split("").map(char => {
        if (char.match(/[a-z]/i)) {
            const base = char <= "Z" ? 65 : 97;

            return String.fromCharCode(
                ((char.charCodeAt(0) - base + skift + 26) % 26) + base
            );
        }

        return char;
    }).join("");
}

krypterBtn.addEventListener("click" , () => {
    if (inputText.value === "") {
        alertTekst.classList.remove("hidden");
        alertTekst.textContent = "Indtast venligst en tekst for at kryptere.";
    } else if (skift.value === "" || isNaN(skift.value)) {
        alertSkift.classList.remove("hidden");
        alertSkift.textContent = "Indtast venligst et gyldigt tal for skift.";
    } else {
        alertTekst.classList.add("hidden");
        alertSkift.classList.add("hidden");
        alertDekrypter.classList.add("hidden");
        const shiftValue = parseInt(skift.value);
        const krypteretTekst = caesarCipher(inputText.value, shiftValue);
        resultat.textContent = krypteretTekst;
    }
});

dekrypterBtn.addEventListener("click", () => {
    if (resultat.textContent === "") {
        alertDekrypter.classList.remove("hidden");
        alertDekrypter.textContent = "Der er ingen krypteret tekst at dekryptere.";
    } else {
        alertTekst.classList.add("hidden");
        alertSkift.classList.add("hidden");
        const shiftValue = parseInt(skift.value);
        const dekrypteretTekst = caesarCipher(resultat.textContent, -shiftValue);
        resultat.textContent = dekrypteretTekst;
    }
});


resetBtn.addEventListener("click", () => {
    inputText.value = "";
    skift.value = "";
    resultat.textContent = "";
    alertTekst.classList.add("hidden");
    alertSkift.classList.add("hidden");
    alertDekrypter.classList.add("hidden");
});