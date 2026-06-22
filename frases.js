"use strict";

const SUPABASE_URL = "https://kstpsvgpmphqcliedjud.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_FNJLSzI1u8A4pgpQk5M3wQ_9nPjwdvj";
const STATUS_OPTIONS = ["new", "imported", "archived"];

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    detectSessionInUrl: false
  }
});

const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const signupButton = document.querySelector("#signup-button");
const userPanel = document.querySelector("#user-panel");
const userEmail = document.querySelector("#user-email");
const logoutButton = document.querySelector("#logout-button");
const phraseEditor = document.querySelector("#phrase-editor");
const phrasesPanel = document.querySelector("#phrases-panel");
const phraseForm = document.querySelector("#phrase-form");
const phraseText = document.querySelector("#phrase-text");
const phraseTags = document.querySelector("#phrase-tags");
const phraseStatus = document.querySelector("#phrase-status");
const statusFilter = document.querySelector("#status-filter");
const phrasesList = document.querySelector("#phrases-list");
const exportButton = document.querySelector("#export-button");
const messageArea = document.querySelector("#message-area");

let currentUser = null;
let phrases = [];
let editingId = null;

function showMessage(message, type = "info") {
  messageArea.textContent = message;
  messageArea.className = `message-area ${type}`;
}

function clearMessage() {
  showMessage("");
}

function parseTags(value) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function getVisiblePhrases() {
  const selectedStatus = statusFilter.value;

  if (selectedStatus === "all") {
    return phrases;
  }

  return phrases.filter((phrase) => phrase.status === selectedStatus);
}

function setAuthenticatedState(user) {
  currentUser = user;
  const isAuthenticated = Boolean(user);

  loginForm.classList.toggle("hidden", isAuthenticated);
  userPanel.classList.toggle("hidden", !isAuthenticated);
  phraseEditor.classList.toggle("hidden", !isAuthenticated);
  phrasesPanel.classList.toggle("hidden", !isAuthenticated);
  userEmail.textContent = user ? `Logado como ${user.email}` : "";
}

function renderPhraseView(phrase) {
  const article = document.createElement("article");
  article.className = "phrase-item";
  article.dataset.id = phrase.id;

  const text = document.createElement("p");
  text.className = "phrase-text";
  text.textContent = phrase.text;

  const meta = document.createElement("p");
  meta.className = "phrase-meta";
  const tags = Array.isArray(phrase.tags) && phrase.tags.length ? phrase.tags.join(", ") : "sem tags";
  meta.textContent = `${phrase.status} | ${tags}`;

  const actions = document.createElement("div");
  actions.className = "actions compact-actions";

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "secondary";
  editButton.dataset.action = "edit";
  editButton.textContent = "Editar";

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "danger";
  deleteButton.dataset.action = "delete";
  deleteButton.textContent = "Deletar";

  actions.append(editButton, deleteButton);
  article.append(text, meta, actions);
  return article;
}

function renderPhraseEdit(phrase) {
  const article = document.createElement("article");
  article.className = "phrase-item";
  article.dataset.id = phrase.id;

  const textLabel = document.createElement("label");
  textLabel.className = "field-label";
  textLabel.setAttribute("for", `edit-text-${phrase.id}`);
  textLabel.textContent = "Frase";

  const textArea = document.createElement("textarea");
  textArea.id = `edit-text-${phrase.id}`;
  textArea.dataset.field = "text";
  textArea.rows = 4;
  textArea.value = phrase.text;

  const grid = document.createElement("div");
  grid.className = "form-grid";

  const tagsWrapper = document.createElement("div");
  const tagsLabel = document.createElement("label");
  tagsLabel.className = "field-label";
  tagsLabel.setAttribute("for", `edit-tags-${phrase.id}`);
  tagsLabel.textContent = "Tags";
  const tagsInput = document.createElement("input");
  tagsInput.id = `edit-tags-${phrase.id}`;
  tagsInput.dataset.field = "tags";
  tagsInput.type = "text";
  tagsInput.value = Array.isArray(phrase.tags) ? phrase.tags.join(", ") : "";
  tagsWrapper.append(tagsLabel, tagsInput);

  const statusWrapper = document.createElement("div");
  const statusLabel = document.createElement("label");
  statusLabel.className = "field-label";
  statusLabel.setAttribute("for", `edit-status-${phrase.id}`);
  statusLabel.textContent = "Status";
  const statusSelect = document.createElement("select");
  statusSelect.id = `edit-status-${phrase.id}`;
  statusSelect.dataset.field = "status";
  STATUS_OPTIONS.forEach((status) => {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status;
    option.selected = phrase.status === status;
    statusSelect.appendChild(option);
  });
  statusWrapper.append(statusLabel, statusSelect);
  grid.append(tagsWrapper, statusWrapper);

  const actions = document.createElement("div");
  actions.className = "actions compact-actions";

  const saveButton = document.createElement("button");
  saveButton.type = "button";
  saveButton.dataset.action = "save";
  saveButton.textContent = "Salvar edição";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.className = "secondary";
  cancelButton.dataset.action = "cancel";
  cancelButton.textContent = "Cancelar";

  actions.append(saveButton, cancelButton);
  article.append(textLabel, textArea, grid, actions);
  return article;
}

function renderPhrases() {
  const visiblePhrases = getVisiblePhrases();
  phrasesList.innerHTML = "";

  if (!visiblePhrases.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Nenhuma frase encontrada.";
    phrasesList.appendChild(empty);
    return;
  }

  visiblePhrases.forEach((phrase) => {
    phrasesList.appendChild(phrase.id === editingId ? renderPhraseEdit(phrase) : renderPhraseView(phrase));
  });
}

async function loadPhrases() {
  if (!currentUser) {
    return;
  }

  const { data, error } = await supabaseClient
    .from("phrases")
    .select("id,user_id,text,tags,status,source,created_at,updated_at,imported_at")
    .eq("user_id", currentUser.id)
    .order("created_at", { ascending: false });

  if (error) {
    showMessage(`Erro ao carregar frases: ${error.message}`, "error");
    return;
  }

  phrases = data || [];
  renderPhrases();
}

async function refreshSession() {
  const { data, error } = await supabaseClient.auth.getSession();

  if (error || !data.session || !data.session.user) {
    setAuthenticatedState(null);
    phrases = [];
    renderPhrases();
    return;
  }

  setAuthenticatedState(data.session.user);
  await loadPhrases();
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessage();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    showMessage(`Erro ao entrar: ${error.message}`, "error");
    return;
  }

  showMessage("Login realizado.", "success");
  loginForm.reset();
});

signupButton.addEventListener("click", async () => {
  clearMessage();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showMessage("Informe e-mail e senha para criar a conta.", "error");
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  });

  if (error) {
    showMessage(`Erro ao criar conta: ${error.message}`, "error");
    return;
  }

  if (data.session && data.user) {
    showMessage("Conta criada e login realizado.", "success");
    loginForm.reset();
    return;
  }

  showMessage("Conta criada. Verifique o e-mail se a confirmação estiver habilitada.", "success");
  loginForm.reset();
});

logoutButton.addEventListener("click", async () => {
  clearMessage();
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    showMessage(`Erro ao sair: ${error.message}`, "error");
    return;
  }

  editingId = null;
  phrases = [];
  setAuthenticatedState(null);
  renderPhrases();
});

phraseForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessage();

  const text = phraseText.value.trim();

  if (!text) {
    showMessage("Informe a frase antes de salvar.", "error");
    return;
  }

  const { error } = await supabaseClient.from("phrases").insert({
    user_id: currentUser.id,
    text,
    tags: parseTags(phraseTags.value),
    status: phraseStatus.value,
    source: "web"
  });

  if (error) {
    showMessage(`Erro ao salvar frase: ${error.message}`, "error");
    return;
  }

  phraseForm.reset();
  phraseStatus.value = "new";
  showMessage("Frase salva.", "success");
  await loadPhrases();
});

phrasesList.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  const item = button.closest(".phrase-item");
  const id = item ? item.dataset.id : "";
  const action = button.dataset.action;

  if (action === "edit") {
    editingId = id;
    renderPhrases();
    return;
  }

  if (action === "cancel") {
    editingId = null;
    renderPhrases();
    return;
  }

  if (action === "delete") {
    clearMessage();
    const { error } = await supabaseClient.from("phrases").delete().eq("id", id).eq("user_id", currentUser.id);

    if (error) {
      showMessage(`Erro ao deletar frase: ${error.message}`, "error");
      return;
    }

    showMessage("Frase deletada.", "success");
    await loadPhrases();
    return;
  }

  if (action === "save") {
    clearMessage();
    const text = item.querySelector('[data-field="text"]').value.trim();
    const tags = parseTags(item.querySelector('[data-field="tags"]').value);
    const status = item.querySelector('[data-field="status"]').value;

    if (!text) {
      showMessage("A frase editada não pode ficar vazia.", "error");
      return;
    }

    const { error } = await supabaseClient
      .from("phrases")
      .update({
        text,
        tags,
        status,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .eq("user_id", currentUser.id);

    if (error) {
      showMessage(`Erro ao salvar edição: ${error.message}`, "error");
      return;
    }

    editingId = null;
    showMessage("Edição salva.", "success");
    await loadPhrases();
  }
});

statusFilter.addEventListener("change", () => {
  editingId = null;
  renderPhrases();
});

exportButton.addEventListener("click", () => {
  clearMessage();
  const jsonl = getVisiblePhrases().map((phrase) => JSON.stringify(phrase)).join("\n");

  if (!jsonl) {
    showMessage("Não há frases visíveis para exportar.", "error");
    return;
  }

  const blob = new Blob([`${jsonl}\n`], { type: "application/jsonl;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "frases.jsonl";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});

supabaseClient.auth.onAuthStateChange((_event, session) => {
  if (session && session.user) {
    setAuthenticatedState(session.user);
    loadPhrases();
    return;
  }

  editingId = null;
  phrases = [];
  setAuthenticatedState(null);
  renderPhrases();
});

refreshSession();
