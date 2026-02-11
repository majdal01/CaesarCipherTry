const form = document.getElementById("wrapper");
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

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const shiftValue = parseInt(skift.value, 10);
    const isKrypter = event.submitter && event.submitter.id === "krypterBtn";
    const isDekrypter = event.submitter && event.submitter.id === "dekrypterBtn";

    if (inputText.value === "") {
        inputText.setAttribute("aria-invalid", "true");
        alertTekst.classList.remove("hidden");
        alertTekst.textContent = isKrypter ? "Indtast venligst en tekst for at kryptere." : "Indtast venligst en tekst for at dekryptere.";
        inputText.focus();
        return;
    }

    if (isNaN(shiftValue)) {
        alertSkift.classList.remove("hidden");
        alertSkift.textContent = "Indtast venligst et gyldigt tal for skift.";
        skift.focus();
        return;
    }

    inputText.removeAttribute("aria-invalid");
    alertTekst.classList.add("hidden");
    alertSkift.classList.add("hidden");
    alertDekrypter.classList.add("hidden");

    if (isKrypter) {
        const krypteretTekst = caesarCipher(inputText.value, shiftValue);
        resultat.textContent = krypteretTekst;
    } else if (isDekrypter) {
        if (resultat.textContent === "") {
            alertDekrypter.classList.remove("hidden");
            alertDekrypter.textContent = "Der er ingen krypteret tekst at dekryptere.";
            return;
        }
        const dekrypteretTekst = caesarCipher(resultat.textContent, -shiftValue);
        resultat.textContent = dekrypteretTekst;
    }
});