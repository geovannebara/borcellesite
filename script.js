const produtos = [
  { nome: "Bolo No Pote", preco: 10.0, imagem: "https://minhasreceitinhas.com.br/wp-content/uploads/2023/10/Bolo-no-pote-pra-vender.jpeg" },
  { nome: "Mousse", preco: 4.0, imagem: "https://www.sabornamesa.com.br/media/k2/items/cache/98a603e1940a8f9204f68a90703d47ea_XL.jpg" },
  { nome: "Copo Da Felicidade", preco: 13.0, imagem: "https://supliutech.nyc3.cdn.digitaloceanspaces.com/catalogoapp-aws/2023-05-31/52967a74-cab9-4b74-a346-d7d992cf263f.jpeg" },
  { nome: "Trufas", preco: 2.0, imagens: ["https://i.imgur.com/gppLUXm.jpeg", "https://i.imgur.com/DGTNT5d.jpeg", "https://i.imgur.com/bPqUd3F.jpeg", "https://i.imgur.com/alR4ug4.jpeg"] },
  { nome: "Bolo Vulcão", preco: 10.0, imagem: "https://i.imgur.com/CwTI6Tx.jpeg" },
  { nome: "Mini Pudim", preco: 4.0, imagem: "https://i.imgur.com/wG7LQFr.jpeg" },
  { nome: "CupCake", preco: 3.0, imagem: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

let carrinho = [];

const produtosContainer = document.getElementById("produtos");
const carrinhoLista = document.getElementById("itens-carrinho");
const totalSpan = document.getElementById("total");

produtos.forEach((produto, index) => {
  const div = document.createElement("div");
  div.className = "produto";
  div.innerHTML = `
    ${produto.imagens ? produto.imagens.map(img => `<img src="${img}" alt="${produto.nome}" style="width:45%;border-radius:8px;margin:2px;">`).join("") : `<img src="${produto.imagem}" alt="${produto.nome}">`}
    <h3>${produto.nome}</h3>
    <p>R$ ${produto.preco.toFixed(2)}</p>
    <button onclick="adicionarCarrinho(${index})">Adicionar</button>
  `;
  produtosContainer.appendChild(div);
});

function adicionarCarrinho(index) {
  carrinho.push(produtos[index]);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  carrinhoLista.innerHTML = "";
  let total = 0;
  carrinho.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    carrinhoLista.appendChild(li);
    total += item.preco;
  });
  totalSpan.textContent = total.toFixed(2);
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
  const itensTexto = carrinho.map(item => `• ${item.nome} - R$ ${item.preco.toFixed(2)}`).join('%0A');

  const formHTML = `
    <html>
      <head>
        <title>Pagamento Pix</title>
        <style>
          body { font-family: Arial; text-align: center; padding: 20px; background: #fff0f5; color: #333; }
          input, button, textarea { width: 90%; padding: 10px; margin: 10px 0; border-radius: 8px; border: 1px solid #ccc; font-size: 14px; }
          img { width: 250px; margin: 20px 0; border-radius: 12px; }
        </style>
      </head>
      <body>
        <h2>Preencha seus dados</h2>
        <input type="text" id="nome" placeholder="Seu nome" required />
        <input type="email" id="email" placeholder="Seu e-mail" required />
        <input type="tel" id="tel" placeholder="Seu telefone" required />
        <h3>Pagamento via Pix</h3>
        <p>Escaneie o QR Code abaixo com seu app bancário:</p>
        <img src="qrcodepix.png" alt="QR Code Pix" />
        <p><strong>Copia e Cola:</strong></p>
        <textarea id="pixCode" readonly style="width:100%;height:80px;">
00020126580014BR.GOV.BCB.PIX013692e69b27-7d97-4d3b-bb33-d6a121a761545204000053039865802BR5925Geovanne de Andrade Barro6009SAO PAULO62140510ckwvfR61Gm63041ECD
</textarea>
<button onclick="copiarPix()">Copiar código Pix</button>
        <button onclick="enviarWhatsApp()">Enviar dados para WhatsApp</button>

        <script>
          function enviarWhatsApp() {
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const tel = document.getElementById('tel').value.trim();
            if (!nome || !email || !tel) return alert('Preencha todos os campos!');

            const mensagem = 
\`🧁 Nova compra - Doce Sonho

👤 Nome: \${nome}
📧 E-mail: \${email}
📱 Telefone: \${tel}

🛒 Itens do pedido:
${itensTexto}

💰 Total: R$ ${total.toFixed(2)}\`;

            const link = "https://wa.me/558192813129?text=" + encodeURIComponent(mensagem);
            window.open(link, '_blank');
          }
        </script>
      </body>
    </html>
  `;

  const popup = window.open("", "Pix + WhatsApp", "width=400,height=700");
  popup.document.write(formHTML);
}
