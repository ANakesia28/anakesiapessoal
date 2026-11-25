
const WHATSAPP = "5527988994135";
const PIX_KEY = "15421078736";

// Data do evento
const EVENT_DATE = new Date("2027-03-20T19:00:00");

// Lista de presentes
const gifts = [
    {
        name: "♡ Cozinha",
        items: [
            "Jogo de panelas",
            "Jogo de pratos",
            "Jogo de copos",
            "Jogo de talheres",
            "Conjunto de xícaras",
            "Liquidificador",
            "Air fryer",
            "Escorredor de louça"
        ]
    },
    {
        name: "♡ Quarto",
        items: [
            "Jogo de cama casal",
            "Edredom",
            "Travesseiros",
            "Cobertor"
        ]
    },
    {
        name: "♡ Banheiro",
        items: [
            "Jogo de toalhas",
            "Tapete de banheiro",
            "Kit de banheiro",
            "Cesto de roupa"
        ]
    },
    {
        name: "♡ Sala",
        items: [
            "Almofadas",
            "Tapete para sala",
            "Cortina",
            "Quadro decorativo",
            "Luminária"
        ]
    },
    {
        name: "♡ Lavanderia",
        items: [
            "Varal de chão",
            "Balde",
            "Vassoura",
            "Rodo",
            "Ferro de passar"
        ]
    },
    {
        name: "♡ Eletrodomésticos",
        items: [
            "Micro-ondas",
            "Cafeteira",
            "Sanduicheira",
            "Ventilador"
        ]
    },
    {
        name: "♡ Organização",
        items: [
            "Potes organizadores",
            "Cabides",
            "Caixas organizadoras"
        ]
    },
    {
        name: "♡ Limpeza",
        items: [
            "Mop",
            "Kit de limpeza",
            "Lixeira"
        ]
    },
    {
        name: "♡ Decoração",
        items: [
            "Vasos decorativos",
            "Espelho",
            "Porta-retratos"
        ]
    },
    {
        name: "♡ Ferramentas",
        items: [
            "Kit de ferramentas",
            "Furadeira"
        ]
    }
];

// Presentes escolhidos
const selectedGifts = [];

const giftContainer = document.getElementById("gift-list");
const giftCount = document.getElementById("gift-count");
const giftSummary = document.getElementById("gift-summary");
const sendGiftsButton = document.getElementById("send-gifts");

// Mostrar presentes na página
function renderGifts() {
    if (!giftContainer) {
        console.error("Não foi encontrado o elemento #gift-list no HTML.");
        return;
    }

    giftContainer.innerHTML = "";

    gifts.forEach(category => {
        const categoryElement = document.createElement("div");
        categoryElement.className = "gift-category";

        const title = document.createElement("h3");
        title.textContent = category.name;
        categoryElement.appendChild(title);

        category.items.forEach(gift => {
            const label = document.createElement("label");
            label.className = "gift-option";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = gift;

            const name = document.createElement("span");
            name.textContent = gift;

            const heart = document.createElement("span");
            heart.className = "gift-heart";
            heart.textContent = "♡";

            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    selectedGifts.push(gift);
                } else {
                    const index = selectedGifts.indexOf(gift);
                    if (index !== -1) {
                        selectedGifts.splice(index, 1);
                    }
                }

                updateGiftSummary();
            });

            label.append(checkbox, name, heart);
            categoryElement.appendChild(label);
        });

        giftContainer.appendChild(categoryElement);
    });

    updateGiftSummary();
}

// Atualizar resumo
function updateGiftSummary() {
    if (giftCount) {
        giftCount.textContent = selectedGifts.length;
    }

    if (giftSummary) {
        giftSummary.textContent = selectedGifts.length
            ? selectedGifts.join(", ")
            : "Você ainda não escolheu seus presentes.";
    }

    if (sendGiftsButton) {
        sendGiftsButton.disabled = selectedGifts.length === 0;
    }
}

// Enviar presentes para WhatsApp
if (sendGiftsButton) {
    sendGiftsButton.addEventListener("click", () => {
        if (selectedGifts.length === 0) return;

        const message = `Olá, Ana Késia e Maykon! 💙

Escolhi estes presentes para o chá de casa nova:

${selectedGifts.map(gift => "♡ " + gift).join("\n")}

Com carinho!`;

        window.open(
            `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
            "_blank"
        );
    });
}

// Confirmar presença
const rsvpForm = document.getElementById("rsvp-form");

if (rsvpForm) {
    rsvpForm.addEventListener("submit", event => {
        event.preventDefault();

        const name = document.getElementById("guest-name").value.trim();
        const guests = document.getElementById("guest-count").value;

        if (!name || !guests) {
            alert("Preencha todos os campos.");
            return;
        }

        const message = `Olá, Ana Késia e Maykon! 💙

Gostaria de confirmar minha presença no chá de casa nova!

Nome: ${name}
Quantidade: ${guests}

Até lá! ♡`;

        window.open(
            `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
            "_blank"
        );
    });
}

// Copiar Pix
const copyPixButton = document.getElementById("copy-pix");

if (copyPixButton) {
    copyPixButton.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(PIX_KEY);
            copyPixButton.textContent = "Pix copiado! ♡";

            setTimeout(() => {
                copyPixButton.textContent = "Copiar chave Pix";
            }, 2500);
        } catch (error) {
            alert("Copie sua chave Pix: " + PIX_KEY);
        }
    });
}

// Contagem regressiva
function updateCountdown() {
    const difference = EVENT_DATE.getTime() - Date.now();

    const elements = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds")
    };

    if (difference <= 0) {
        Object.values(elements).forEach(element => {
            if (element) element.textContent = "00";
        });
        return;
    }

    const values = {
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference / 3600000) % 24),
        minutes: Math.floor((difference / 60000) % 60),
        seconds: Math.floor((difference / 1000) % 60)
    };

    Object.keys(values).forEach(key => {
        if (elements[key]) {
            elements[key].textContent = String(values[key]).padStart(2, "0");
        }
    });
}

// Iniciar funções
renderGifts();
updateCountdown();
setInterval(updateCountdown, 1000);
