"use strict";

const SUPABASE_URL = "https://kstpsvgpmphqcliedjud.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_FNJLSzI1u8A4pgpQk5M3wQ_9nPjwdvj";
const CONTACT_GROUPS = [
  "Psicólogos",
  "Neuropsicólogos",
  "Psiquiatras",
  "Neurologistas",
  "Nutricionistas",
  "Terapia ocupacional",
  "Fonoaudiologia",
  "Serviços / clínicas",
  "Outros"
];
const CONTACT_STATUS_OPTIONS = ["active", "inactive", "check", "do_not_recommend"];

const contactsSupabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
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
const contactEditor = document.querySelector("#contact-editor");
const contactEditorTitle = document.querySelector("#contact-editor-title");
const contactForm = document.querySelector("#contact-form");
const cancelEditButton = document.querySelector("#cancel-edit-button");
const clearContactButton = document.querySelector("#clear-contact-button");
const saveContactButton = document.querySelector("#save-contact-button");
const contactsPanel = document.querySelector("#contacts-panel");
const contactsList = document.querySelector("#contacts-list");
const exportJsonButton = document.querySelector("#export-json-button");
const exportJsonlButton = document.querySelector("#export-jsonl-button");
const selectedCount = document.querySelector("#selected-count");
const selectVisibleButton = document.querySelector("#select-visible-button");
const clearSelectionButton = document.querySelector("#clear-selection-button");
const generateSelectedButton = document.querySelector("#generate-selected-button");
const selectedContactsResult = document.querySelector("#selected-contacts-result");
const selectedContactsOutput = document.querySelector("#selected-contacts-output");
const copySelectedButton = document.querySelector("#copy-selected-button");
const messageArea = document.querySelector("#message-area");

const contactName = document.querySelector("#contact-name");
const contactGroup = document.querySelector("#contact-group");
const contactGroupCustom = document.querySelector("#contact-group-custom");
const contactPhone = document.querySelector("#contact-phone");
const contactEmail = document.querySelector("#contact-email");
const contactInstagram = document.querySelector("#contact-instagram");
const contactSite = document.querySelector("#contact-site");
const contactLocation = document.querySelector("#contact-location");
const contactStatus = document.querySelector("#contact-status");
const contactSpecialties = document.querySelector("#contact-specialties");
const contactTags = document.querySelector("#contact-tags");
const contactPriceNote = document.querySelector("#contact-price-note");
const contactDescription = document.querySelector("#contact-description");
const contactPrivateNotes = document.querySelector("#contact-private-notes");
const contactIndicationText = document.querySelector("#contact-indication-text");
const contactFavorite = document.querySelector("#contact-favorite");
const contactLastVerified = document.querySelector("#contact-last-verified");

const contactSearch = document.querySelector("#contact-search");
const groupFilter = document.querySelector("#group-filter");
const statusFilter = document.querySelector("#status-filter");
const tagFilter = document.querySelector("#tag-filter");
const favoritesFilter = document.querySelector("#favorites-filter");

let currentUser = null;
let contacts = [];
let editingContactId = null;
const expandedContactIds = new Set();
const selectedContactIds = new Set();

function showMessage(message, type = "info") {
  messageArea.textContent = message;
  messageArea.className = `message-area ${type}`;
}

function clearMessage() {
  showMessage("");
}

function parseList(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatList(value) {
  return Array.isArray(value) ? value.join(", ") : "";
}

function getCheckedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
}

function setCheckedValues(name, values) {
  const selectedValues = Array.isArray(values) ? values : [];
  document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
    input.checked = selectedValues.includes(input.value);
  });
}

function normalizeSearch(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function createOption(value, label = value) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  return option;
}

function populateStaticSelects() {
  contactGroup.innerHTML = "";
  groupFilter.innerHTML = "";
  groupFilter.appendChild(createOption("all", "todos"));

  CONTACT_GROUPS.forEach((group) => {
    contactGroup.appendChild(createOption(group));
    groupFilter.appendChild(createOption(group));
  });
}

function updateGroupFilterOptions() {
  const currentValue = groupFilter.value;
  const groups = Array.from(new Set([...CONTACT_GROUPS, ...contacts.map((contact) => contact.group_name).filter(Boolean)])).sort((a, b) =>
    a.localeCompare(b, "pt-BR")
  );

  groupFilter.innerHTML = "";
  groupFilter.appendChild(createOption("all", "todos"));
  groups.forEach((group) => groupFilter.appendChild(createOption(group)));
  groupFilter.value = groups.includes(currentValue) ? currentValue : "all";
}

function setAuthenticatedState(user) {
  currentUser = user;
  const isAuthenticated = Boolean(user);

  loginForm.classList.toggle("hidden", isAuthenticated);
  userPanel.classList.toggle("hidden", !isAuthenticated);
  contactEditor.classList.toggle("hidden", !isAuthenticated);
  contactsPanel.classList.toggle("hidden", !isAuthenticated);
  userEmail.textContent = user ? `Logado como ${user.email}` : "";
}

function getContactPayload() {
  const customGroup = contactGroupCustom.value.trim();

  return {
    user_id: currentUser.id,
    name: contactName.value.trim(),
    group_name: customGroup || contactGroup.value,
    phone: contactPhone.value.trim(),
    email: contactEmail.value.trim() || null,
    instagram: contactInstagram.value.trim() || null,
    site: contactSite.value.trim() || null,
    location: contactLocation.value.trim() || null,
    modality: getCheckedValues("contact-modality"),
    audience: getCheckedValues("contact-audience"),
    specialties: parseList(contactSpecialties.value),
    tags: parseList(contactTags.value),
    price_note: contactPriceNote.value.trim() || null,
    description: contactDescription.value.trim() || null,
    private_notes: contactPrivateNotes.value.trim() || null,
    indication_text: contactIndicationText.value.trim() || null,
    status: contactStatus.value,
    favorite: contactFavorite.checked,
    last_verified_at: contactLastVerified.value || null,
    updated_at: new Date().toISOString()
  };
}

function resetContactForm() {
  contactForm.reset();
  contactGroup.value = CONTACT_GROUPS[0];
  contactGroupCustom.value = "";
  contactStatus.value = "active";
  setCheckedValues("contact-modality", []);
  setCheckedValues("contact-audience", []);
  editingContactId = null;
  contactEditorTitle.textContent = "Novo contato";
  saveContactButton.textContent = "Salvar contato";
  cancelEditButton.classList.add("hidden");
}

function fillContactForm(contact) {
  editingContactId = contact.id;
  contactName.value = contact.name || "";
  if (CONTACT_GROUPS.includes(contact.group_name)) {
    contactGroup.value = contact.group_name;
    contactGroupCustom.value = "";
  } else {
    contactGroup.value = "Outros";
    contactGroupCustom.value = contact.group_name || "";
  }
  contactPhone.value = contact.phone || "";
  contactEmail.value = contact.email || "";
  contactInstagram.value = contact.instagram || "";
  contactSite.value = contact.site || "";
  contactLocation.value = contact.location || "";
  contactStatus.value = CONTACT_STATUS_OPTIONS.includes(contact.status) ? contact.status : "active";
  setCheckedValues("contact-modality", contact.modality);
  setCheckedValues("contact-audience", contact.audience);
  contactSpecialties.value = formatList(contact.specialties);
  contactTags.value = formatList(contact.tags);
  contactPriceNote.value = contact.price_note || "";
  contactDescription.value = contact.description || "";
  contactPrivateNotes.value = contact.private_notes || "";
  contactIndicationText.value = contact.indication_text || "";
  contactFavorite.checked = Boolean(contact.favorite);
  contactLastVerified.value = contact.last_verified_at || "";
  contactEditorTitle.textContent = "Editar contato";
  saveContactButton.textContent = "Salvar edição";
  cancelEditButton.classList.remove("hidden");
  contactEditor.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getSearchableText(contact) {
  return [
    contact.name,
    contact.group_name,
    contact.phone,
    contact.email,
    contact.instagram,
    contact.site,
    contact.location,
    contact.price_note,
    contact.description,
    contact.private_notes,
    contact.indication_text,
    ...(contact.modality || []),
    ...(contact.audience || []),
    ...(contact.specialties || []),
    ...(contact.tags || [])
  ].join(" ");
}

function getVisibleContacts() {
  const search = normalizeSearch(contactSearch.value);
  const selectedGroup = groupFilter.value;
  const selectedStatus = statusFilter.value;
  const selectedTag = tagFilter.value;
  const onlyFavorites = favoritesFilter.checked;

  return contacts.filter((contact) => {
    const matchesSearch = !search || normalizeSearch(getSearchableText(contact)).includes(search);
    const matchesGroup = selectedGroup === "all" || contact.group_name === selectedGroup;
    const matchesStatus = selectedStatus === "all" || contact.status === selectedStatus;
    const matchesTag = selectedTag === "all" || (Array.isArray(contact.tags) && contact.tags.includes(selectedTag));
    const matchesFavorite = !onlyFavorites || Boolean(contact.favorite);
    return matchesSearch && matchesGroup && matchesStatus && matchesTag && matchesFavorite;
  });
}

function updateSelectedCount() {
  const count = selectedContactIds.size;
  selectedCount.textContent = `${count} ${count === 1 ? "contato selecionado" : "contatos selecionados"}`;
}

function updateTagFilterOptions() {
  const currentValue = tagFilter.value;
  const tags = Array.from(new Set(contacts.flatMap((contact) => (Array.isArray(contact.tags) ? contact.tags : [])))).sort((a, b) =>
    a.localeCompare(b, "pt-BR")
  );

  tagFilter.innerHTML = "";
  tagFilter.appendChild(createOption("all", "todas"));
  tags.forEach((tag) => tagFilter.appendChild(createOption(tag)));
  tagFilter.value = tags.includes(currentValue) ? currentValue : "all";
}

function appendMeta(container, label, value) {
  if (!value || (Array.isArray(value) && !value.length)) {
    return;
  }

  const row = document.createElement("p");
  row.className = "contact-detail-row";
  const strong = document.createElement("strong");
  strong.textContent = `${label}: `;
  row.appendChild(strong);
  row.append(Array.isArray(value) ? value.join(", ") : value);
  container.appendChild(row);
}

function renderContactCard(contact) {
  const article = document.createElement("article");
  article.className = `contact-card${selectedContactIds.has(contact.id) ? " selected" : ""}`;
  article.dataset.id = contact.id;

  const header = document.createElement("div");
  header.className = "contact-card-header";

  const selectionLabel = document.createElement("label");
  selectionLabel.className = "contact-select";
  selectionLabel.setAttribute("for", `contact-select-${contact.id}`);
  const selectionInput = document.createElement("input");
  selectionInput.id = `contact-select-${contact.id}`;
  selectionInput.type = "checkbox";
  selectionInput.checked = selectedContactIds.has(contact.id);
  selectionInput.dataset.action = "select-contact";
  selectionInput.setAttribute("aria-label", `Selecionar ${contact.name}`);
  selectionLabel.append(selectionInput, "Selecionar");

  const titleWrap = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = `${contact.favorite ? "★ " : ""}${contact.name}`;
  const meta = document.createElement("p");
  meta.className = "phrase-meta";
  meta.textContent = [contact.status, contact.phone, contact.location].filter(Boolean).join(" | ");
  titleWrap.append(title, meta);

  const expandButton = document.createElement("button");
  expandButton.type = "button";
  expandButton.className = "secondary";
  expandButton.dataset.action = "toggle";
  expandButton.textContent = expandedContactIds.has(contact.id) ? "Recolher" : "Detalhes";

  header.append(selectionLabel, titleWrap, expandButton);

  const summary = document.createElement("p");
  summary.className = "contact-summary";
  summary.textContent = contact.description || "Sem descrição.";

  const chips = document.createElement("div");
  chips.className = "contact-chip-row";
  [...(contact.specialties || []), ...(contact.tags || [])].slice(0, 8).forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "contact-chip";
    chip.textContent = item;
    chips.appendChild(chip);
  });

  const actions = document.createElement("div");
  actions.className = "actions compact-actions";

  [
    ["edit", "Editar", "secondary"],
    ["delete", "Remover", "danger"],
    ["copy-phone", "Copiar telefone", "secondary"],
    ["copy-indication", "Copiar indicação", "secondary"]
  ].forEach(([action, label, className]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.action = action;
    button.className = className;
    button.textContent = label;
    actions.appendChild(button);
  });

  article.append(header, summary);
  if (chips.children.length) {
    article.appendChild(chips);
  }

  if (expandedContactIds.has(contact.id)) {
    const details = document.createElement("div");
    details.className = "contact-details";
    appendMeta(details, "Grupo", contact.group_name);
    appendMeta(details, "E-mail", contact.email);
    appendMeta(details, "Instagram", contact.instagram);
    appendMeta(details, "Site", contact.site);
    appendMeta(details, "Modalidade", contact.modality);
    appendMeta(details, "Público", contact.audience);
    appendMeta(details, "Especialidades", contact.specialties);
    appendMeta(details, "Tags", contact.tags);
    appendMeta(details, "Preço/convênio", contact.price_note);
    appendMeta(details, "Última confirmação", contact.last_verified_at);
    appendMeta(details, "Observações internas", contact.private_notes);
    appendMeta(details, "Texto de indicação", contact.indication_text);
    article.appendChild(details);
  }

  article.appendChild(actions);
  return article;
}

function renderContacts() {
  updateGroupFilterOptions();
  updateTagFilterOptions();
  updateSelectedCount();
  refreshSelectedContactsResultIfVisible();
  const visibleContacts = getVisibleContacts();
  contactsList.innerHTML = "";

  if (!visibleContacts.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Nenhum contato encontrado.";
    contactsList.appendChild(empty);
    return;
  }

  const grouped = visibleContacts.reduce((groups, contact) => {
    const groupName = contact.group_name || "Outros";
    if (!groups.has(groupName)) {
      groups.set(groupName, []);
    }
    groups.get(groupName).push(contact);
    return groups;
  }, new Map());

  grouped.forEach((groupContacts, groupName) => {
    const section = document.createElement("section");
    section.className = "contact-group-section";
    const heading = document.createElement("h3");
    heading.textContent = `${groupName} (${groupContacts.length})`;
    section.appendChild(heading);
    groupContacts.forEach((contact) => section.appendChild(renderContactCard(contact)));
    contactsList.appendChild(section);
  });
}

function getSelectedContacts() {
  return contacts
    .filter((contact) => selectedContactIds.has(contact.id))
    .sort((a, b) => {
      const groupCompare = String(a.group_name || "Outros").localeCompare(String(b.group_name || "Outros"), "pt-BR");
      if (groupCompare !== 0) {
        return groupCompare;
      }
      return String(a.name || "").localeCompare(String(b.name || ""), "pt-BR");
    });
}

function getContactLocationLine(contact) {
  const parts = [];
  if (contact.location) {
    parts.push(contact.location);
  }
  if (Array.isArray(contact.modality) && contact.modality.length) {
    parts.push(contact.modality.join(", "));
  }
  return parts.join(" / ");
}

function getContactObservationLine(contact) {
  return [contact.description, contact.indication_text].filter(Boolean).join(" ");
}

function generateSelectedContactsText() {
  const selectedContacts = getSelectedContacts();

  if (!selectedContacts.length) {
    return "";
  }

  const lines = ["Contatos selecionados"];
  let currentGroup = "";

  selectedContacts.forEach((contact) => {
    const groupName = contact.group_name || "Outros";
    if (groupName !== currentGroup) {
      currentGroup = groupName;
      lines.push("", groupName);
    }

    lines.push("", `Nome: ${contact.name || ""}`);

    if (contact.phone) {
      lines.push(`Telefone/WhatsApp: ${contact.phone}`);
    }

    const locationLine = getContactLocationLine(contact);
    if (locationLine) {
      lines.push(`Local: ${locationLine}`);
    }

    if (contact.price_note) {
      lines.push(`Preço: ${contact.price_note}`);
    }

    const observationLine = getContactObservationLine(contact);
    if (observationLine) {
      lines.push(`Observação: ${observationLine}`);
    }
  });

  return lines.join("\n");
}

function renderSelectedContactsResult() {
  clearMessage();
  const text = generateSelectedContactsText();

  if (!text) {
    selectedContactsResult.classList.add("hidden");
    selectedContactsOutput.textContent = "";
    showMessage("Selecione ao menos um contato.", "info");
    return;
  }

  selectedContactsOutput.textContent = text;
  selectedContactsResult.classList.remove("hidden");
  selectedContactsResult.scrollIntoView({ behavior: "smooth", block: "start" });
}

function refreshSelectedContactsResultIfVisible() {
  if (selectedContactsResult.classList.contains("hidden")) {
    return;
  }

  const text = generateSelectedContactsText();
  if (!text) {
    selectedContactsResult.classList.add("hidden");
    selectedContactsOutput.textContent = "";
    return;
  }

  selectedContactsOutput.textContent = text;
}

async function loadContacts() {
  if (!currentUser) {
    return;
  }

  const { data, error } = await contactsSupabaseClient
    .from("contacts")
    .select(
      "id,user_id,name,group_name,phone,email,instagram,site,location,modality,audience,specialties,tags,price_note,description,private_notes,indication_text,status,favorite,last_verified_at,created_at,updated_at"
    )
    .eq("user_id", currentUser.id)
    .order("favorite", { ascending: false })
    .order("group_name", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    showMessage(`Erro ao carregar contatos: ${error.message}`, "error");
    return;
  }

  contacts = data || [];
  const validIds = new Set(contacts.map((contact) => contact.id));
  Array.from(selectedContactIds).forEach((id) => {
    if (!validIds.has(id)) {
      selectedContactIds.delete(id);
    }
  });
  renderContacts();
}

async function refreshSession() {
  const { data, error } = await contactsSupabaseClient.auth.getSession();

  if (error || !data.session || !data.session.user) {
    setAuthenticatedState(null);
    contacts = [];
    selectedContactIds.clear();
    selectedContactsResult.classList.add("hidden");
    selectedContactsOutput.textContent = "";
    renderContacts();
    return;
  }

  setAuthenticatedState(data.session.user);
  await loadContacts();
}

async function copyText(text, successMessage) {
  clearMessage();

  if (!text) {
    showMessage("Não há texto para copiar.", "error");
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      showMessage(successMessage, "success");
      return;
    } catch (_error) {
      // Continua para o fallback manual abaixo.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  showMessage("Texto selecionado para cópia manual.", "success");
}

function downloadText(filename, text, type) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessage();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const { error } = await contactsSupabaseClient.auth.signInWithPassword({
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

  const { data, error } = await contactsSupabaseClient.auth.signUp({
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
  const { error } = await contactsSupabaseClient.auth.signOut();

  if (error) {
    showMessage(`Erro ao sair: ${error.message}`, "error");
    return;
  }

  contacts = [];
  expandedContactIds.clear();
  selectedContactIds.clear();
  selectedContactsResult.classList.add("hidden");
  selectedContactsOutput.textContent = "";
  resetContactForm();
  setAuthenticatedState(null);
  renderContacts();
});

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessage();

  const payload = getContactPayload();

  if (!payload.name || !payload.group_name || !payload.phone) {
    showMessage("Informe nome, grupo e telefone antes de salvar.", "error");
    return;
  }

  const query = editingContactId
    ? contactsSupabaseClient.from("contacts").update(payload).eq("id", editingContactId).eq("user_id", currentUser.id)
    : contactsSupabaseClient.from("contacts").insert(payload);

  const { error } = await query;

  if (error) {
    showMessage(`Erro ao salvar contato: ${error.message}`, "error");
    return;
  }

  showMessage(editingContactId ? "Edição salva." : "Contato salvo.", "success");
  resetContactForm();
  await loadContacts();
});

clearContactButton.addEventListener("click", () => {
  clearMessage();
  resetContactForm();
});

cancelEditButton.addEventListener("click", () => {
  clearMessage();
  resetContactForm();
});

contactsList.addEventListener("change", (event) => {
  const input = event.target.closest('input[data-action="select-contact"]');

  if (!input) {
    return;
  }

  const item = input.closest(".contact-card");
  const id = item ? item.dataset.id : "";

  if (!id) {
    return;
  }

  if (input.checked) {
    selectedContactIds.add(id);
  } else {
    selectedContactIds.delete(id);
  }

  renderContacts();
});

contactsList.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  const item = button.closest(".contact-card");
  const id = item ? item.dataset.id : "";
  const contact = contacts.find((savedContact) => savedContact.id === id);

  if (!contact) {
    return;
  }

  const action = button.dataset.action;

  if (action === "toggle") {
    if (expandedContactIds.has(id)) {
      expandedContactIds.delete(id);
    } else {
      expandedContactIds.add(id);
    }
    renderContacts();
    return;
  }

  if (action === "edit") {
    clearMessage();
    fillContactForm(contact);
    return;
  }

  if (action === "delete") {
    clearMessage();
    const confirmed = window.confirm(`Remover o contato "${contact.name}"?`);

    if (!confirmed) {
      return;
    }

    const { error } = await contactsSupabaseClient.from("contacts").delete().eq("id", id).eq("user_id", currentUser.id);

    if (error) {
      showMessage(`Erro ao remover contato: ${error.message}`, "error");
      return;
    }

    showMessage("Contato removido.", "success");
    expandedContactIds.delete(id);
    selectedContactIds.delete(id);
    await loadContacts();
    return;
  }

  if (action === "copy-phone") {
    await copyText(contact.phone, "Telefone copiado.");
    return;
  }

  if (action === "copy-indication") {
    const indicationText =
      contact.indication_text ||
      [contact.name, contact.phone, contact.description, contact.location].filter(Boolean).join("\n");
    await copyText(indicationText, "Texto de indicação copiado.");
  }
});

[contactSearch, groupFilter, statusFilter, tagFilter, favoritesFilter].forEach((control) => {
  control.addEventListener("input", renderContacts);
  control.addEventListener("change", renderContacts);
});

selectVisibleButton.addEventListener("click", () => {
  getVisibleContacts().forEach((contact) => selectedContactIds.add(contact.id));
  renderContacts();
});

clearSelectionButton.addEventListener("click", () => {
  selectedContactIds.clear();
  selectedContactsResult.classList.add("hidden");
  selectedContactsOutput.textContent = "";
  renderContacts();
});

generateSelectedButton.addEventListener("click", renderSelectedContactsResult);

copySelectedButton.addEventListener("click", async () => {
  await copyText(selectedContactsOutput.textContent, "Lista copiada.");
});

exportJsonButton.addEventListener("click", () => {
  clearMessage();
  const visibleContacts = getVisibleContacts();

  if (!visibleContacts.length) {
    showMessage("Não há contatos visíveis para exportar.", "error");
    return;
  }

  downloadText("contatos.json", `${JSON.stringify(visibleContacts, null, 2)}\n`, "application/json;charset=utf-8");
});

exportJsonlButton.addEventListener("click", () => {
  clearMessage();
  const jsonl = getVisibleContacts().map((contact) => JSON.stringify(contact)).join("\n");

  if (!jsonl) {
    showMessage("Não há contatos visíveis para exportar.", "error");
    return;
  }

  downloadText("contatos.jsonl", `${jsonl}\n`, "application/jsonl;charset=utf-8");
});

contactsSupabaseClient.auth.onAuthStateChange((_event, session) => {
  if (session && session.user) {
    setAuthenticatedState(session.user);
    loadContacts();
    return;
  }

  contacts = [];
  expandedContactIds.clear();
  selectedContactIds.clear();
  selectedContactsResult.classList.add("hidden");
  selectedContactsOutput.textContent = "";
  resetContactForm();
  setAuthenticatedState(null);
  renderContacts();
});

populateStaticSelects();
resetContactForm();
refreshSession();
