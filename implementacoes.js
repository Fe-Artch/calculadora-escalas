"use strict";

const SUPABASE_URL = "https://kstpsvgpmphqcliedjud.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_FNJLSzI1u8A4pgpQk5M3wQ_9nPjwdvj";
const implementationSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { detectSessionInUrl: false }
});

const STATUS_LABELS = {
  idea: "Ideia",
  preparing: "A preparar",
  ready: "Prompt pronto",
  sent: "Enviado ao Codex",
  testing: "Em teste",
  implemented: "Implementado",
  discarded: "Descartado"
};
const TYPE_LABELS = { project: "Projeto", group: "Versão / grupo", implementation: "Implementação" };
const PRIORITY_LABELS = { low: "Baixa", normal: "Normal", high: "Alta" };

const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const signupButton = document.querySelector("#signup-button");
const userPanel = document.querySelector("#user-panel");
const userEmail = document.querySelector("#user-email");
const logoutButton = document.querySelector("#logout-button");
const workspace = document.querySelector("#implementation-workspace");
const messageArea = document.querySelector("#message-area");
const quickCaptureForm = document.querySelector("#quick-capture-form");
const quickTitle = document.querySelector("#quick-title");
const tree = document.querySelector("#implementation-tree");
const emptyState = document.querySelector("#implementation-empty");
const countArea = document.querySelector("#implementation-count");
const searchInput = document.querySelector("#implementation-search");
const statusFilter = document.querySelector("#implementation-status-filter");
const pendingOnly = document.querySelector("#implementation-pending-only");
const expandAllButton = document.querySelector("#expand-all-button");
const collapseAllButton = document.querySelector("#collapse-all-button");
const copyReadyButton = document.querySelector("#copy-ready-button");
const newItemButton = document.querySelector("#new-item-button");
const editor = document.querySelector("#implementation-editor");
const closeEditorButton = document.querySelector("#close-editor-button");
const editorTitle = document.querySelector("#editor-title");
const form = document.querySelector("#implementation-form");
const idInput = document.querySelector("#implementation-id");
const typeInput = document.querySelector("#implementation-type");
const parentInput = document.querySelector("#implementation-parent");
const titleInput = document.querySelector("#implementation-title");
const statusInput = document.querySelector("#implementation-status");
const priorityInput = document.querySelector("#implementation-priority");
const completedInput = document.querySelector("#implementation-completed");
const promptFields = document.querySelector("#prompt-fields");
const promptInput = document.querySelector("#implementation-prompt");
const notesInput = document.querySelector("#implementation-notes");
const feedback = document.querySelector("#implementation-form-feedback");
const deleteButton = document.querySelector("#delete-item-button");
const duplicateButton = document.querySelector("#duplicate-item-button");
const copyPromptButton = document.querySelector("#copy-prompt-button");
const promptEditTab = document.querySelector("#prompt-edit-tab");
const promptPreviewTab = document.querySelector("#prompt-preview-tab");
const promptEditorPanel = document.querySelector("#prompt-editor-panel");
const promptPreviewPanel = document.querySelector("#prompt-preview-panel");

let currentUser = null;
let items = [];
let expandedIds = new Set();

function showMessage(message, type = "info") {
  messageArea.textContent = message;
  messageArea.className = `message-area${type ? ` ${type}` : ""}`;
}
function showFeedback(message, type = "info") {
  feedback.textContent = message;
  feedback.className = `message-area${type ? ` ${type}` : ""}`;
}
function clean(value) { return typeof value === "string" ? value.trim() : ""; }
function normalize(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase().trim();
}
function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}
function markdownToHtml(markdown) {
  const escaped = escapeHtml(markdown);
  const lines = escaped.split("\n");
  let inCode = false;
  let inList = false;
  const output = [];
  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (inList) { output.push("</ul>"); inList = false; }
      output.push(inCode ? "</code></pre>" : "<pre><code>");
      inCode = !inCode;
      continue;
    }
    if (inCode) { output.push(`${line}\n`); continue; }
    if (/^###\s+/.test(line)) { if (inList) { output.push("</ul>"); inList = false; } output.push(`<h4>${line.replace(/^###\s+/, "")}</h4>`); continue; }
    if (/^##\s+/.test(line)) { if (inList) { output.push("</ul>"); inList = false; } output.push(`<h3>${line.replace(/^##\s+/, "")}</h3>`); continue; }
    if (/^#\s+/.test(line)) { if (inList) { output.push("</ul>"); inList = false; } output.push(`<h2>${line.replace(/^#\s+/, "")}</h2>`); continue; }
    if (/^[-*]\s+/.test(line)) {
      if (!inList) { output.push("<ul>"); inList = true; }
      output.push(`<li>${line.replace(/^[-*]\s+/, "")}</li>`);
      continue;
    }
    if (inList) { output.push("</ul>"); inList = false; }
    if (!line.trim()) output.push("<br>");
    else output.push(`<p>${line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/`(.+?)`/g, "<code>$1</code>")}</p>`);
  }
  if (inList) output.push("</ul>");
  if (inCode) output.push("</code></pre>");
  return output.join("");
}
function setAuthenticatedState(user) {
  currentUser = user;
  const authenticated = Boolean(user);
  loginForm.classList.toggle("hidden", authenticated);
  userPanel.classList.toggle("hidden", !authenticated);
  workspace.classList.toggle("hidden", !authenticated);
  userEmail.textContent = authenticated ? `Logado como ${user.email}` : "";
  if (!authenticated) { items = []; renderTree(); }
}
function childrenOf(parentId) {
  return items.filter(item => (item.parent_id || null) === (parentId || null)).sort((a, b) => a.position - b.position || a.created_at.localeCompare(b.created_at));
}
function descendantsOf(id) {
  const result = [];
  const visit = parentId => childrenOf(parentId).forEach(child => { result.push(child.id); visit(child.id); });
  visit(id);
  return result;
}
function itemPath(item) {
  const parts = [item.title];
  let parent = items.find(candidate => candidate.id === item.parent_id);
  while (parent) { parts.unshift(parent.title); parent = items.find(candidate => candidate.id === parent.parent_id); }
  return parts.join(" › ");
}
function matchesFilters(item) {
  const query = normalize(searchInput.value);
  const status = statusFilter.value;
  const matchesQuery = !query || normalize(`${item.title} ${item.prompt} ${item.notes}`).includes(query);
  const matchesStatus = status === "all" || item.status === status;
  const matchesPending = !pendingOnly.checked || !item.is_completed;
  return matchesQuery && matchesStatus && matchesPending;
}
function visibleBySearch(item) {
  if (matchesFilters(item)) return true;
  return descendantsOf(item.id).some(id => {
    const child = items.find(candidate => candidate.id === id);
    return child && matchesFilters(child);
  });
}
function createTreeNode(item, depth) {
  const hasChildren = childrenOf(item.id).length > 0;
  const expanded = expandedIds.has(item.id);
  const wrapper = document.createElement("div");
  wrapper.className = `implementation-node type-${item.item_type}${item.is_completed ? " is-completed" : ""}`;
  wrapper.dataset.id = item.id;

  const row = document.createElement("div");
  row.className = "implementation-node-row";
  row.style.setProperty("--implementation-depth", depth);

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "implementation-toggle";
  toggle.dataset.action = "toggle";
  toggle.setAttribute("aria-label", expanded ? "Recolher" : "Expandir");
  toggle.textContent = hasChildren ? (expanded ? "▾" : "▸") : "·";
  toggle.disabled = !hasChildren;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.is_completed;
  checkbox.dataset.action = "complete";
  checkbox.setAttribute("aria-label", `Marcar ${item.title} como implementado`);

  const main = document.createElement("button");
  main.type = "button";
  main.className = "implementation-node-main";
  main.dataset.action = "edit";
  const title = document.createElement("span");
  title.className = "implementation-node-title";
  title.textContent = item.title;
  const meta = document.createElement("span");
  meta.className = "implementation-node-meta";
  meta.textContent = `${TYPE_LABELS[item.item_type]} · ${STATUS_LABELS[item.status]}${item.priority === "high" ? " · Alta" : ""}`;
  main.append(title, meta);

  const actions = document.createElement("div");
  actions.className = "implementation-node-actions";
  if (item.item_type === "implementation" && clean(item.prompt)) {
    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "secondary implementation-mini-button";
    copy.dataset.action = "copy";
    copy.textContent = "Copiar";
    actions.append(copy);
  }
  const add = document.createElement("button");
  add.type = "button";
  add.className = "secondary implementation-mini-button";
  add.dataset.action = "add-child";
  add.textContent = "+";
  add.setAttribute("aria-label", `Adicionar item dentro de ${item.title}`);
  actions.append(add);

  row.append(toggle, checkbox, main, actions);
  wrapper.append(row);

  if (hasChildren && expanded) {
    const childrenContainer = document.createElement("div");
    childrenContainer.className = "implementation-children";
    childrenOf(item.id).filter(visibleBySearch).forEach(child => childrenContainer.append(createTreeNode(child, depth + 1)));
    wrapper.append(childrenContainer);
  }
  return wrapper;
}
function renderTree() {
  tree.innerHTML = "";
  const roots = childrenOf(null).filter(visibleBySearch);
  roots.forEach(item => tree.append(createTreeNode(item, 0)));
  emptyState.classList.toggle("hidden", roots.length > 0);
  const completed = items.filter(item => item.is_completed).length;
  countArea.textContent = `${items.length} item(ns) · ${completed} implementado(s) · ${items.length - completed} pendente(s)`;
  populateParentOptions(idInput.value || "");
}
function populateParentOptions(excludedId = "") {
  const current = parentInput.value;
  parentInput.innerHTML = '<option value="">Sem item pai</option>';
  const excluded = new Set(excludedId ? [excludedId, ...descendantsOf(excludedId)] : []);
  const addOptions = (parentId, depth) => {
    childrenOf(parentId).forEach(item => {
      if (!excluded.has(item.id)) {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = `${"— ".repeat(depth)}${item.title}`;
        parentInput.append(option);
        addOptions(item.id, depth + 1);
      }
    });
  };
  addOptions(null, 0);
  if ([...parentInput.options].some(option => option.value === current)) parentInput.value = current;
}
function resetForm(parentId = "") {
  form.reset();
  idInput.value = "";
  typeInput.value = parentId ? "implementation" : "project";
  parentInput.value = parentId;
  statusInput.value = "idea";
  priorityInput.value = "normal";
  completedInput.checked = false;
  editorTitle.textContent = "Novo item";
  deleteButton.classList.add("hidden");
  duplicateButton.classList.add("hidden");
  copyPromptButton.classList.add("hidden");
  showFeedback("");
  populateParentOptions("");
  parentInput.value = parentId;
  updatePromptVisibility();
  showPromptEdit();
  titleInput.focus();
  editor.scrollIntoView({ behavior: "smooth", block: "start" });
}
function editItem(item) {
  idInput.value = item.id;
  typeInput.value = item.item_type;
  populateParentOptions(item.id);
  parentInput.value = item.parent_id || "";
  titleInput.value = item.title;
  statusInput.value = item.status;
  priorityInput.value = item.priority;
  completedInput.checked = item.is_completed;
  promptInput.value = item.prompt || "";
  notesInput.value = item.notes || "";
  editorTitle.textContent = item.title;
  deleteButton.classList.remove("hidden");
  duplicateButton.classList.remove("hidden");
  copyPromptButton.classList.toggle("hidden", !clean(item.prompt));
  showFeedback("");
  updatePromptVisibility();
  showPromptEdit();
  editor.scrollIntoView({ behavior: "smooth", block: "start" });
}
function updatePromptVisibility() {
  promptFields.classList.toggle("hidden", typeInput.value !== "implementation");
}
function showPromptEdit() {
  promptEditorPanel.classList.remove("hidden");
  promptPreviewPanel.classList.add("hidden");
  promptEditTab.classList.add("active");
  promptPreviewTab.classList.remove("active");
  promptEditTab.setAttribute("aria-selected", "true");
  promptPreviewTab.setAttribute("aria-selected", "false");
}
function showPromptPreview() {
  promptPreviewPanel.innerHTML = markdownToHtml(promptInput.value) || '<p class="muted-text">O prompt está vazio.</p>';
  promptEditorPanel.classList.add("hidden");
  promptPreviewPanel.classList.remove("hidden");
  promptEditTab.classList.remove("active");
  promptPreviewTab.classList.add("active");
  promptEditTab.setAttribute("aria-selected", "false");
  promptPreviewTab.setAttribute("aria-selected", "true");
}
async function loadItems() {
  if (!currentUser) return;
  const { data, error } = await implementationSupabase.from("implementation_items").select("*").order("position").order("created_at");
  if (error) { showMessage(`Não foi possível carregar a fila: ${error.message}`, "error"); return; }
  items = data || [];
  if (expandedIds.size === 0) items.filter(item => item.item_type === "project").forEach(item => expandedIds.add(item.id));
  renderTree();
}
async function saveItem(event) {
  event.preventDefault();
  if (!currentUser) return;
  const title = clean(titleInput.value);
  if (!title) { showFeedback("Informe um nome.", "error"); return; }
  const isImplementation = typeInput.value === "implementation";
  const completed = completedInput.checked;
  const payload = {
    user_id: currentUser.id,
    parent_id: parentInput.value || null,
    item_type: typeInput.value,
    title,
    prompt: isImplementation ? promptInput.value.trim() : "",
    notes: isImplementation ? notesInput.value.trim() : "",
    status: completed ? "implemented" : statusInput.value,
    priority: priorityInput.value,
    is_completed: completed,
    position: Number.MAX_SAFE_INTEGER
  };
  const id = idInput.value;
  let error;
  if (id) ({ error } = await implementationSupabase.from("implementation_items").update(payload).eq("id", id));
  else ({ error } = await implementationSupabase.from("implementation_items").insert(payload));
  if (error) { showFeedback(`Não foi possível salvar: ${error.message}`, "error"); return; }
  showMessage(id ? "Item atualizado." : "Item criado.", "success");
  await loadItems();
  if (id) {
    const updated = items.find(item => item.id === id);
    if (updated) editItem(updated);
  } else resetForm(payload.parent_id || "");
}
async function quickCapture(event) {
  event.preventDefault();
  const title = clean(quickTitle.value);
  if (!title || !currentUser) return;
  const { error } = await implementationSupabase.from("implementation_items").insert({
    user_id: currentUser.id, parent_id: null, item_type: "implementation", title,
    prompt: "", notes: "", status: "idea", priority: "normal", is_completed: false, position: Number.MAX_SAFE_INTEGER
  });
  if (error) { showMessage(`Não foi possível adicionar: ${error.message}`, "error"); return; }
  quickTitle.value = "";
  showMessage("Ideia adicionada à fila.", "success");
  await loadItems();
}
async function toggleComplete(item, checked) {
  const { error } = await implementationSupabase.from("implementation_items").update({
    is_completed: checked,
    status: checked ? "implemented" : (item.status === "implemented" ? "testing" : item.status)
  }).eq("id", item.id);
  if (error) { showMessage(`Não foi possível atualizar: ${error.message}`, "error"); return; }
  await loadItems();
}
async function deleteCurrent() {
  const id = idInput.value;
  if (!id) return;
  const item = items.find(candidate => candidate.id === id);
  if (!item || !confirm(`Excluir "${item.title}" e todos os itens dentro dele?`)) return;
  const { error } = await implementationSupabase.from("implementation_items").delete().eq("id", id);
  if (error) { showFeedback(`Não foi possível excluir: ${error.message}`, "error"); return; }
  resetForm();
  showMessage("Item excluído.", "success");
  await loadItems();
}
async function duplicateCurrent() {
  const item = items.find(candidate => candidate.id === idInput.value);
  if (!item || !currentUser) return;
  const { id, created_at, updated_at, completed_at, ...copy } = item;
  copy.title = `${item.title} — cópia`;
  copy.is_completed = false;
  copy.status = item.status === "implemented" ? "testing" : item.status;
  copy.user_id = currentUser.id;
  copy.position = Number.MAX_SAFE_INTEGER;
  const { error } = await implementationSupabase.from("implementation_items").insert(copy);
  if (error) { showFeedback(`Não foi possível duplicar: ${error.message}`, "error"); return; }
  showMessage("Item duplicado.", "success");
  await loadItems();
}
async function copyText(text, successMessage) {
  if (!clean(text)) { showMessage("Não há prompt para copiar.", "error"); return; }
  try { await navigator.clipboard.writeText(text); showMessage(successMessage, "success"); }
  catch { showMessage("O navegador não permitiu copiar automaticamente.", "error"); }
}
function formattedPrompt(item) {
  return `# Projeto / caminho\n${itemPath(item)}\n\n# Implementação\n${item.title}\n\n# Prompt para o Codex\n${item.prompt}`;
}

loginForm.addEventListener("submit", async event => {
  event.preventDefault(); showMessage("Entrando...");
  const { error } = await implementationSupabase.auth.signInWithPassword({ email: emailInput.value.trim(), password: passwordInput.value });
  if (error) showMessage(`Não foi possível entrar: ${error.message}`, "error");
});
signupButton.addEventListener("click", async () => {
  const email = emailInput.value.trim(); const password = passwordInput.value;
  if (!email || !password) { showMessage("Informe e-mail e senha para criar a conta.", "error"); return; }
  const { error } = await implementationSupabase.auth.signUp({ email, password });
  showMessage(error ? `Não foi possível criar a conta: ${error.message}` : "Conta criada. Verifique seu e-mail se a confirmação estiver habilitada.", error ? "error" : "success");
});
logoutButton.addEventListener("click", () => implementationSupabase.auth.signOut());
quickCaptureForm.addEventListener("submit", quickCapture);
form.addEventListener("submit", saveItem);
newItemButton.addEventListener("click", () => resetForm());
closeEditorButton.addEventListener("click", () => resetForm());
typeInput.addEventListener("change", updatePromptVisibility);
completedInput.addEventListener("change", () => { if (completedInput.checked) statusInput.value = "implemented"; });
statusInput.addEventListener("change", () => { completedInput.checked = statusInput.value === "implemented"; });
searchInput.addEventListener("input", renderTree);
statusFilter.addEventListener("change", renderTree);
pendingOnly.addEventListener("change", renderTree);
expandAllButton.addEventListener("click", () => { items.forEach(item => expandedIds.add(item.id)); renderTree(); });
collapseAllButton.addEventListener("click", () => { expandedIds.clear(); renderTree(); });
promptEditTab.addEventListener("click", showPromptEdit);
promptPreviewTab.addEventListener("click", showPromptPreview);
deleteButton.addEventListener("click", deleteCurrent);
duplicateButton.addEventListener("click", duplicateCurrent);
copyPromptButton.addEventListener("click", () => {
  const item = items.find(candidate => candidate.id === idInput.value);
  if (item) copyText(formattedPrompt(item), "Prompt copiado.");
});
copyReadyButton.addEventListener("click", () => {
  const ready = items.filter(item => item.item_type === "implementation" && item.status === "ready" && clean(item.prompt));
  copyText(ready.map(formattedPrompt).join("\n\n---\n\n"), `${ready.length} prompt(s) copiado(s).`);
});
tree.addEventListener("click", async event => {
  const row = event.target.closest(".implementation-node-row");
  if (!row) return;
  const item = items.find(candidate => candidate.id === row.parentElement.dataset.id);
  if (!item) return;
  const action = event.target.dataset.action || event.target.closest("[data-action]")?.dataset.action;
  if (action === "toggle") { expandedIds.has(item.id) ? expandedIds.delete(item.id) : expandedIds.add(item.id); renderTree(); }
  else if (action === "edit") editItem(item);
  else if (action === "add-child") { expandedIds.add(item.id); resetForm(item.id); }
  else if (action === "copy") copyText(formattedPrompt(item), "Prompt copiado.");
});
tree.addEventListener("change", event => {
  if (event.target.dataset.action !== "complete") return;
  const node = event.target.closest(".implementation-node");
  const item = items.find(candidate => candidate.id === node.dataset.id);
  if (item) toggleComplete(item, event.target.checked);
});

implementationSupabase.auth.onAuthStateChange((_event, session) => {
  setAuthenticatedState(session?.user || null);
  if (session?.user) loadItems();
});
implementationSupabase.auth.getSession().then(({ data }) => {
  setAuthenticatedState(data.session?.user || null);
  if (data.session?.user) loadItems();
});
resetForm();
