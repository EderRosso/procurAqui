// Main Logic for procurAqui (Backend Integration)

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('procuracaoForm');
    const generateBtn = document.getElementById('generateBtn');

    // Check if jspdf is loaded
    if (typeof window.jspdf === 'undefined') {
        console.error("jsPDF not loaded");
        // We will mock it or alert, but for now just log.
    }

    // Check for Payment Return (from Backend/MP)
    checkPaymentStatus();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Format date
        const now = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        data.data = now.toLocaleDateString('pt-BR', options);

        // Uppercase name for signature
        data.nomeupper = data.nome.toUpperCase();

        // Get Selected Template
        const templateType = document.getElementById('tipo').value;
        const template = window.templates[templateType];

        if (!template) {
            alert("Selecione um tipo de procuração válido.");
            return;
        }

        // Generate PDF (Client side for Free, or call backend for Premium if implemented that way)
        // Note: In this Secure Backend Demo, we still generate "Free" on client.
        // Premium users can either get a key to unlock client-side or download from server.
        await generatePDF(data, template);
    });
});

let isPremium = false;

function checkPaymentStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('collection_status') || urlParams.get('status');

    if (status === 'approved' || status === 'paid') {
        isPremium = true;
        activatePremiumUI();
    }
}

function activatePremiumUI() {
    const premiumSection = document.getElementById('premium');
    const btn = document.getElementById('generateBtn');

    // Update Button
    btn.textContent = "BAIXAR PDF PREMIUM (SEM MARCA)";
    btn.style.background = "#10b981";
    btn.innerHTML += " ✨";

    if (premiumSection) {
        premiumSection.innerHTML = `
            <div class="container" style="text-align:center; padding: 4rem 0;">
                <div style="font-size: 4rem;">🎉</div>
                <h2 style="color: #fff;">Premium Ativado!</h2>
                <p style="color: #ccc;">Seus documentos agora são gerados sem marca d'água.</p>
            </div>
        `;
    }
}

async function generatePDF(data, template) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Config
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - (margin * 2);

    // Process text
    let text = template.text;

    // Replace placeholders
    for (const [key, value] of Object.entries(data)) {
        const regex = new RegExp(`{${key}}`, 'g');
        text = text.replace(regex, value || '________________');
    }

    // Watermark Logic
    if (!isPremium) {
        doc.setTextColor(230, 230, 230);
        doc.setFontSize(50);
        doc.text("procurAqui - Grátis", pageWidth / 2, 120, { align: 'center', angle: 45 });
        doc.text("procurAqui - Grátis", pageWidth / 2, 220, { align: 'center', angle: 45 });

        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("Crie o seu grátis em www.procuraqui.com.br", pageWidth / 2, 285, { align: "center" });
    } else {
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
    }

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(template.title, pageWidth / 2, 40, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(lines, margin, 60);

    const fileName = `procuracao_${data.nome.split(' ')[0].toLowerCase()}${isPremium ? '_premium' : ''}.pdf`;
    doc.save(fileName);
}

// REAL BACKEND CALL
async function buyPremium() {
    const btn = document.querySelector('button[onclick="buyPremium()"]');
    const originalText = btn.textContent;
    btn.textContent = "Processando...";
    btn.disabled = true;

    try {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                templateType: document.getElementById('tipo').value || 'geral',
                customerName: document.querySelector('input[name="nome"]').value || 'Cliente'
            })
        });

        const data = await response.json();

        if (data.init_point) {
            window.location.href = data.init_point;
        } else {
            console.error(data);
            console.error(data);
            alert('Erro: Link de pagamento não encontrado. Detalhes: ' + JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error(error);
        alert('Erro de conexão com o servidor. (Você rodou `npm start` ou `vercel dev`?)');
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}
