// ================= WHATSAPP =================

function escolher(presente) {

    const numero = "SEU_NUMERO_AQUI";

    const mensagem =
        `Oi, Kethel e Maykon! 💙\n\n` +
        `Escolhi um presente para o Chá de Casa Nova! 🏠🎁\n\n` +
        `Presente: ${presente}\n\n` +
        `Com muito carinho! 🤍`;

    const link =
        `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank");
}


// ================= PIX =================

function mostrarPix() {

    const caixa = document.getElementById("caixaPix");

    caixa.classList.toggle("ativo");

}


function copiarPix() {

    const chave = document.getElementById("chavePix").innerText;

    navigator.clipboard.writeText(chave);

    document.getElementById("mensagemPix").innerText =
        "✓ Chave PIX copiada! 💙";

}