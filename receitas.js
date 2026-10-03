"use strict";

const HEADER_STORAGE_KEY = "receita_cabecalho";
const INITIAL_FONT_SIZE = 11;
const MINIMUM_FONT_SIZE = 9;
const FONT_SIZE_STEP = 0.5;
const COPY_LABELS = [
  "1ª VIA — FARMÁCIA",
  "2ª VIA — PACIENTE (Não fornecer medicação com essa via)"
];

const form = document.querySelector("#prescription-form");
const headerField = document.querySelector("#prescription-header");
const prescriptionField = document.querySelector("#prescription-text");
const includeDateField = document.querySelector("#include-date");
const updatePreviewButton = document.querySelector("#update-preview");
const printPage = document.querySelector("#print-page");
const preview = document.querySelector("#print-preview");
const previewStage = document.querySelector("#preview-stage");
const copyTemplate = document.querySelector("#prescription-copy-template");
const message = document.querySelector("#prescription-message");
const fontSizeStatus = document.querySelector("#font-size-status");

function formatPrescriptionDate(date = new Date()) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
}

function nextPaint() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

function setMessage(text = "", type = "") {
  message.textContent = text;
  message.className = `prescription-message${type ? ` ${type}` : ""}`;
}

function getPrescriptionData() {
  return {
    header: headerField.value,
    prescription: prescriptionField.value,
    includeDate: includeDateField.checked
  };
}

function buildPrescriptionCopy(label, data) {
  const fragment = copyTemplate.content.cloneNode(true);
  fragment.querySelector(".copy-label").textContent = label;
  fragment.querySelector(".copy-header").textContent = data.header;
  fragment.querySelector(".copy-body").textContent = data.prescription;
  fragment.querySelector(".prescription-date").textContent = data.includeDate
    ? formatPrescriptionDate()
    : "";
  return fragment;
}

function renderPrescription(data) {
  printPage.replaceChildren(
    ...COPY_LABELS.map((label) => buildPrescriptionCopy(label, data))
  );
  printPage.style.fontSize = `${INITIAL_FONT_SIZE}pt`;
}

function hasOverflow() {
  return [...printPage.querySelectorAll(".prescription-copy")].some((copy) => {
    const body = copy.querySelector(".copy-body");
    return copy.scrollHeight > copy.clientHeight + 1 || body.scrollHeight > body.clientHeight + 1;
  });
}

async function fitPrescription() {
  let fontSize = INITIAL_FONT_SIZE;
  printPage.style.fontSize = `${fontSize}pt`;
  await nextPaint();

  while (hasOverflow() && fontSize > MINIMUM_FONT_SIZE) {
    fontSize = Math.max(MINIMUM_FONT_SIZE, fontSize - FONT_SIZE_STEP);
    printPage.style.fontSize = `${fontSize}pt`;
    await nextPaint();
  }

  const fits = !hasOverflow();
  fontSizeStatus.textContent = fits ? `Fonte da receita: ${fontSize} pt` : "Conteúdo excede uma folha";
  return fits;
}

function resizePreview() {
  const pageWidth = printPage.offsetWidth;
  if (!pageWidth) return;
  const scale = Math.min(1, preview.clientWidth / pageWidth);
  printPage.style.transform = `scale(${scale})`;
  previewStage.style.width = `${pageWidth * scale}px`;
  previewStage.style.height = `${printPage.offsetHeight * scale}px`;
}

async function generatePrescription(data) {
  renderPrescription(data);
  const fits = await fitPrescription();
  resizePreview();
  return fits;
}

async function updatePreview() {
  setMessage();
  const fits = await generatePrescription(getPrescriptionData());
  if (!fits) {
    setMessage("O conteúdo da receita é grande demais para caber em uma única folha. Reduza o texto antes de imprimir.", "error");
  } else {
    setMessage("Preview atualizado. A receita cabe em uma folha.", "success");
  }
  return fits;
}

function loadSavedHeader() {
  try {
    headerField.value = localStorage.getItem(HEADER_STORAGE_KEY) || "";
  } catch (_error) {
    // O gerador continua funcionando caso o navegador bloqueie o armazenamento local.
  }
}

function saveHeader() {
  try {
    localStorage.setItem(HEADER_STORAGE_KEY, headerField.value);
  } catch (_error) {
    setMessage("Não foi possível salvar o cabeçalho neste navegador.", "error");
  }
}

headerField.addEventListener("input", saveHeader);
updatePreviewButton.addEventListener("click", updatePreview);
window.addEventListener("resize", resizePreview);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMessage();

  if (!prescriptionField.value.trim()) {
    prescriptionField.focus();
    setMessage("Digite o conteúdo da receita antes de gerar.", "error");
    return;
  }

  const fits = await generatePrescription(getPrescriptionData());
  if (!fits) {
    setMessage("O conteúdo da receita é grande demais para caber em uma única folha. Reduza o texto antes de imprimir.", "error");
    return;
  }

  if (form.elements.output.value === "pdf") {
    setMessage('Na janela que será aberta, selecione “Salvar como PDF”.', "success");
  }
  window.print();
});

loadSavedHeader();
generatePrescription(getPrescriptionData()).then(resizePreview);
