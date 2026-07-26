"use strict";

const SUPABASE_URL = "https://kstpsvgpmphqcliedjud.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_FNJLSzI1u8A4pgpQk5M3wQ_9nPjwdvj";
const DEFAULT_CONTACT_GROUPS = [
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
const contactsWorkspace = document.querySelector("#contacts-workspace");
const contactsSelectTab = document.querySelector("#contacts-select-tab");
const contactsAddTab = document.querySelector("#contacts-add-tab");
const contactsSelectPanel = document.querySelector("#contacts-select-panel");
const contactsSelectionView = document.querySelector("#contacts-selection-view");
const contactEditor = document.querySelector("#contact-editor");
const contactEditorTitle = document.querySelector("#contact-editor-title");
const contactForm = document.querySelector("#contact-form");
const contactName = document.querySelector("#contact-name");
const contactPhone = document.querySelector("#contact-phone");
const contactGroup = document.querySelector("#contact-group");
const newGroupButton = document.querySelector("#new-group-button");
const newGroupControls = document.querySelector("#new-group-controls");
const newGroupName = document.querySelector("#new-group-name");
const addGroupButton = document.querySelector("#add-group-button");
const cancelGroupButton = document.querySelector("#cancel-group-button");
const newGroupFeedback = document.querySelector("#new-group-feedback");
const contactDetails = document.querySelector("#contact-details");
const cancelContactButton = document.querySelector("#cancel-contact-button");
const saveContactButton = document.querySelector("#save-contact-button");
const addFirstContactButton = document.querySelector("#add-first-contact-button");
const contactSearch = document.querySelector("#contact-search");
const showSelectedOnlyInput = document.querySelector("#show-selected-only");
const contactsList = document.querySelector("#contacts-list");
const selectedCount = document.querySelector("#selected-count");
const clearSelectionButton = document.querySelector("#clear-selection-button");
const generateSelectedButton = document.querySelector("#generate-selected-button");
const patientListPreview = document.querySelector("#patient-list-preview");
const patientListText = document.querySelector("#patient-list-text");
const patientPrintContent = document.querySelector("#patient-print-content");
const copyPatientListButton = document.querySelector("#copy-patient-list-button");
const printPatientListButton = document.querySelector("#print-patient-list-button");
const backToSelectionButton = document.querySelector("#back-to-selection-button");
const patientListFeedback = document.querySelector("#patient-list-feedback");
const messageArea = document.querySelector("#message-area");

let currentUser = null;
let currentMode = "select";
let contacts = [];
let selectedContactIds = new Set();
let editingContactId = null;
let searchTerm = "";
let showSelectedOnly = false;
let generatedText = "";
let highlightedContactId = null;
const expandedContactIds = new Set();
const sessionGroups = new Set();

function showMessage(message, type = "info") {
  messageArea.textContent = message;
  messageArea.className = `message-area${type ? ` ${type}` : ""}`;
}

function clearMessage() {
  showMessage("");
}

function normalizeSearch(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function formatLegacyList(value) {
  if (Array.isArray(value)) {
    return value.map(cleanString).filter(Boolean).join(", ");
  }

  return cleanString(value);
}

function firstNonEmpty(...values) {
  return values.map(cleanString).find(Boolean) || "";
}

function buildLegacyDetails(record) {
  const lines = [];
  const seenValues = new Set();
  const append = (label, value) => {
    const text = formatLegacyList(value);
    const normalized = normalizeSearch(text);

    if (!text || seenValues.has(normalized)) {
      return;
    }

    seenValues.add(normalized);
    lines.push(`${label}: ${text}`);
  };
  const location = [
    firstNonEmpty(record.location, record.localizacao),
    firstNonEmpty(record.neighborhood, record.bairro),
    firstNonEmpty(record.city, record.cidade),
    firstNonEmpty(record.region, record.regiao)
  ]
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index)
    .join(", ");

  append("Especialidades", record.specialties || record.especialidades);
  append("Modalidade", record.modality || record.modalidade);
  append("Público atendido", record.audience || record.publico);
  append("Localização", location);
  append("Preço/convênio", record.price_note || record.preco_convenio || record.price);
  append("E-mail", record.email);
  append("Instagram", record.instagram);
  append("Site", record.site || record.website);
  append("Tags", record.tags);
  append("Descrição", record.description || record.descricao);
  append("Observações", record.private_notes || record.notes || record.observacoes);
  append("Texto de indicação", record.indication_text || record.texto_indicacao);

  return lines.join("\n");
}

function normalizeContactRecord(record) {
  const details = cleanString(record.details) || buildLegacyDetails(record);

  return {
    id: String(record.id || ""),
    user_id: String(record.user_id || ""),
    name: firstNonEmpty(record.name, record.nome, record.contact_name) || "Contato sem nome",
    phone:
      firstNonEmpty(record.phone, record.telefone, record.telephone, record.whatsapp) ||
      "Não informado",
    group_name:
      firstNonEmpty(
        record.group_name,
        record.custom_group,
        record.group_custom,
        record.contact_group,
        record.group,
        record.grupo,
        record.category
      ) || "Outros",
    details,
    created_at: record.created_at || null,
    updated_at: record.updated_at || null
  };
}

function compareText(first, second) {
  return String(first || "").localeCompare(String(second || ""), "pt-BR", {
    sensitivity: "base",
    numeric: true
  });
}

function isOtherGroup(groupName) {
  return normalizeSearch(groupName) === "outros";
}

function compareGroups(first, second) {
  if (isOtherGroup(first) !== isOtherGroup(second)) {
    return isOtherGroup(first) ? 1 : -1;
  }

  return compareText(first, second);
}

function getAvailableGroups() {
  return Array.from(
    new Set([
      ...DEFAULT_CONTACT_GROUPS,
      ...contacts.map((contact) => contact.group_name).filter(Boolean),
      ...sessionGroups
    ])
  ).sort(compareGroups);
}

function createOption(value, label = value) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  return option;
}

function populateGroupOptions(selectedValue = contactGroup.value) {
  const groups = getAvailableGroups();
  contactGroup.replaceChildren(createOption("", "Selecione um grupo"));
  groups.forEach((group) => contactGroup.appendChild(createOption(group)));
  contactGroup.value = groups.includes(selectedValue) ? selectedValue : "";
}

function getFormValues() {
  return {
    name: contactName.value.trim(),
    phone: contactPhone.value.trim(),
    group_name: contactGroup.value.trim(),
    details: contactDetails.value.trim()
  };
}

function isContactFormDirty() {
  const values = getFormValues();
  return Boolean(
    editingContactId ||
      values.name ||
      values.phone ||
      values.group_name ||
      values.details ||
      newGroupName.value.trim()
  );
}

function resetContactForm() {
  editingContactId = null;
  contactForm.reset();
  newGroupName.value = "";
  newGroupControls.classList.add("hidden");
  newGroupFeedback.textContent = "";
  contactEditorTitle.textContent = "Adicionar contato";
  saveContactButton.textContent = "Salvar contato";
  cancelContactButton.textContent = "Cancelar";
  [contactName, contactPhone, contactGroup, contactDetails].forEach((field) => {
    field.removeAttribute("aria-invalid");
  });
  populateGroupOptions("");
}

function setContactsMode(mode, options = {}) {
  currentMode = mode === "add" ? "add" : "select";
  const selecting = currentMode === "select";

  contactsSelectTab.classList.toggle("active", selecting);
  contactsSelectTab.setAttribute("aria-selected", String(selecting));
  contactsSelectTab.tabIndex = selecting ? 0 : -1;
  contactsAddTab.classList.toggle("active", !selecting);
  contactsAddTab.setAttribute("aria-selected", String(!selecting));
  contactsAddTab.tabIndex = selecting ? -1 : 0;
  contactsSelectPanel.classList.toggle("hidden", !selecting);
  contactEditor.classList.toggle("hidden", selecting);

  if (selecting && !options.keepPreview) {
    showContactsSelection();
  }
}

function requestContactsMode(mode) {
  if (mode === currentMode) {
    return;
  }

  if (
    currentMode === "add" &&
    isContactFormDirty() &&
    !window.confirm("Descartar as alterações deste contato?")
  ) {
    return;
  }

  if (mode === "select") {
    resetContactForm();
  } else {
    openContactEditor();
    return;
  }

  setContactsMode(mode);
}

function showContactsSelection() {
  generatedText = "";
  patientListPreview.classList.add("hidden");
  contactsSelectionView.classList.remove("hidden");
  patientListText.textContent = "";
  patientPrintContent.replaceChildren();
  patientListFeedback.textContent = "";
}

function openContactEditor(contact = null) {
  resetContactForm();

  if (contact) {
    editingContactId = contact.id;
    populateGroupOptions(contact.group_name);
    contactName.value = contact.name;
    contactPhone.value = contact.phone;
    contactGroup.value = contact.group_name;
    contactDetails.value = contact.details;
    contactEditorTitle.textContent = "Editar contato";
    saveContactButton.textContent = "Salvar alterações";
    cancelContactButton.textContent = "Cancelar edição";
  }

  setContactsMode("add");
  window.setTimeout(() => contactName.focus(), 0);
}

function setAuthenticatedState(user) {
  currentUser = user;
  const authenticated = Boolean(user);

  loginForm.classList.toggle("hidden", authenticated);
  userPanel.classList.toggle("hidden", !authenticated);
  contactsWorkspace.classList.toggle("hidden", !authenticated);
  userEmail.textContent = user ? `Logado como ${user.email}` : "";

  if (authenticated) {
    resetContactForm();
    setContactsMode("select");
  }
}

function getSearchableContactText(contact) {
  return [contact.name, contact.phone, contact.group_name, contact.details].join(" ");
}

function getVisibleContacts() {
  return contacts
    .filter((contact) => {
      const matchesSearch =
        !searchTerm || normalizeSearch(getSearchableContactText(contact)).includes(searchTerm);
      const matchesSelection = !showSelectedOnly || selectedContactIds.has(contact.id);
      return matchesSearch && matchesSelection;
    })
    .sort((first, second) => {
      const groupComparison = compareGroups(first.group_name, second.group_name);
      return groupComparison || compareText(first.name, second.name);
    });
}

function getGroupedContacts(contactList) {
  const groups = new Map();

  contactList.forEach((contact) => {
    const groupName = contact.group_name || "Outros";
    if (!groups.has(groupName)) {
      groups.set(groupName, []);
    }
    groups.get(groupName).push(contact);
  });

  return Array.from(groups.entries()).sort(([first], [second]) => compareGroups(first, second));
}

function updateSelectionSummary() {
  const validIds = new Set(contacts.map((contact) => contact.id));
  selectedContactIds = new Set(
    Array.from(selectedContactIds).filter((contactId) => validIds.has(contactId))
  );
  const count = selectedContactIds.size;
  selectedCount.textContent = `Selecionados: ${count}`;
  clearSelectionButton.disabled = count === 0;
  generateSelectedButton.disabled = count === 0;
}

function createEmptyContactsState() {
  const wrapper = document.createElement("div");
  wrapper.className = "contacts-empty-state";
  const title = document.createElement("h3");
  title.className = "contacts-empty-title";
  const description = document.createElement("p");

  if (!contacts.length) {
    title.textContent = "Nenhum contato cadastrado.";
    description.textContent = "Adicione seu primeiro contato para começar.";
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.action = "add-empty";
    button.textContent = "Adicionar contato";
    wrapper.append(title, description, button);
    return wrapper;
  }

  if (showSelectedOnly && selectedContactIds.size === 0) {
    title.textContent = "Nenhum contato selecionado.";
    description.textContent = "Desative o filtro ou selecione contatos na lista.";
  } else {
    title.textContent = "Nenhum contato encontrado para esta busca.";
    description.textContent = "Tente outro nome, telefone, grupo ou detalhe.";
  }

  wrapper.append(title, description);
  return wrapper;
}

function createContactCard(contact) {
  const article = document.createElement("article");
  article.className = `contact-card${selectedContactIds.has(contact.id) ? " selected" : ""}${
    highlightedContactId === contact.id ? " newly-saved" : ""
  }`;
  article.dataset.id = contact.id;

  const main = document.createElement("label");
  main.className = "contact-card-main";
  main.setAttribute("for", `contact-checkbox-${contact.id}`);
  const checkbox = document.createElement("input");
  checkbox.id = `contact-checkbox-${contact.id}`;
  checkbox.type = "checkbox";
  checkbox.checked = selectedContactIds.has(contact.id);
  checkbox.dataset.action = "select-contact";
  checkbox.setAttribute("aria-label", `Selecionar ${contact.name}`);

  const identity = document.createElement("span");
  identity.className = "contact-card-identity";
  const name = document.createElement("strong");
  name.textContent = contact.name || "Sem nome";
  const phone = document.createElement("span");
  phone.textContent = contact.phone || "Sem telefone";
  identity.append(name, phone);
  main.append(checkbox, identity);

  const actions = document.createElement("div");
  actions.className = "contact-card-actions";

  if (contact.details) {
    const detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.className = "secondary contact-action-button";
    detailsButton.dataset.action = "details";
    detailsButton.setAttribute("aria-expanded", String(expandedContactIds.has(contact.id)));
    detailsButton.setAttribute("aria-controls", `contact-details-${contact.id}`);
    detailsButton.textContent = expandedContactIds.has(contact.id) ? "Ocultar detalhes" : "Ver detalhes";
    actions.appendChild(detailsButton);
  }

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "secondary contact-action-button";
  editButton.dataset.action = "edit";
  editButton.textContent = "Editar";

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "secondary contact-action-button contact-delete-button";
  deleteButton.dataset.action = "delete";
  deleteButton.textContent = "Excluir";
  actions.append(editButton, deleteButton);
  article.append(main, actions);

  if (contact.details && expandedContactIds.has(contact.id)) {
    const details = document.createElement("div");
    details.className = "contact-details";
    details.id = `contact-details-${contact.id}`;
    const label = document.createElement("strong");
    label.textContent = "Detalhes internos";
    const text = document.createElement("p");
    text.textContent = contact.details;
    details.append(label, text);
    article.appendChild(details);
  }

  return article;
}

function renderContactGroups(visibleContacts) {
  getGroupedContacts(visibleContacts).forEach(([groupName, groupContacts]) => {
    const section = document.createElement("section");
    section.className = "contact-group-section";
    const header = document.createElement("div");
    header.className = "contact-group-header";
    const headingBlock = document.createElement("div");
    const heading = document.createElement("h3");
    heading.textContent = groupName;
    const selectedInGroup = groupContacts.filter((contact) =>
      selectedContactIds.has(contact.id)
    ).length;
    const counter = document.createElement("p");
    counter.textContent = selectedInGroup
      ? `${selectedInGroup} selecionado${selectedInGroup === 1 ? "" : "s"} de ${groupContacts.length}`
      : `${groupContacts.length} contato${groupContacts.length === 1 ? "" : "s"}`;
    headingBlock.append(heading, counter);

    const allSelected = groupContacts.every((contact) => selectedContactIds.has(contact.id));
    const selectGroupButton = document.createElement("button");
    selectGroupButton.type = "button";
    selectGroupButton.className = "secondary contact-group-button";
    selectGroupButton.dataset.action = "select-group";
    selectGroupButton.dataset.group = groupName;
    selectGroupButton.textContent = allSelected ? "Desmarcar grupo" : "Selecionar grupo";
    header.append(headingBlock, selectGroupButton);
    section.appendChild(header);

    const cards = document.createElement("div");
    cards.className = "contact-group-cards";
    groupContacts.forEach((contact) => cards.appendChild(createContactCard(contact)));
    section.appendChild(cards);
    contactsList.appendChild(section);
  });
}

function renderContacts() {
  const visibleContacts = getVisibleContacts();
  contactsList.replaceChildren();

  if (!visibleContacts.length) {
    contactsList.appendChild(createEmptyContactsState());
  } else {
    renderContactGroups(visibleContacts);
  }

  updateSelectionSummary();
}

function toggleContactSelection(contactId, selected) {
  if (selected) {
    selectedContactIds.add(contactId);
  } else {
    selectedContactIds.delete(contactId);
  }
  renderContacts();
}

function selectVisibleGroup(groupName) {
  const groupContacts = getVisibleContacts().filter(
    (contact) => contact.group_name === groupName
  );
  const allSelected = groupContacts.every((contact) => selectedContactIds.has(contact.id));

  groupContacts.forEach((contact) => {
    if (allSelected) {
      selectedContactIds.delete(contact.id);
    } else {
      selectedContactIds.add(contact.id);
    }
  });
  renderContacts();
}

function clearContactSelection() {
  selectedContactIds.clear();
  generatedText = "";
  renderContacts();
}

function getSelectedContacts() {
  return contacts
    .filter((contact) => selectedContactIds.has(contact.id))
    .sort((first, second) => {
      const groupComparison = compareGroups(first.group_name, second.group_name);
      return groupComparison || compareText(first.name, second.name);
    });
}

function generatePatientContactText(selectedContacts = getSelectedContacts()) {
  const lines = ["CONTATOS INDICADOS"];

  getGroupedContacts(selectedContacts).forEach(([groupName, groupContacts]) => {
    lines.push("", "", groupName.toLocaleUpperCase("pt-BR"));
    groupContacts.forEach((contact) => {
      lines.push("", contact.name, `Telefone/WhatsApp: ${contact.phone}`);
    });
  });

  return lines.join("\n").trimEnd();
}

function renderPrintablePatientList(selectedContacts) {
  patientPrintContent.replaceChildren();
  const title = document.createElement("h1");
  title.textContent = "CONTATOS INDICADOS";
  patientPrintContent.appendChild(title);

  getGroupedContacts(selectedContacts).forEach(([groupName, groupContacts]) => {
    const section = document.createElement("section");
    section.className = "patient-print-group";
    const heading = document.createElement("h2");
    heading.textContent = groupName.toLocaleUpperCase("pt-BR");
    section.appendChild(heading);

    groupContacts.forEach((contact) => {
      const block = document.createElement("div");
      block.className = "patient-print-contact";
      const name = document.createElement("strong");
      name.textContent = contact.name;
      const phone = document.createElement("p");
      phone.textContent = `Telefone/WhatsApp: ${contact.phone}`;
      block.append(name, phone);
      section.appendChild(block);
    });

    patientPrintContent.appendChild(section);
  });
}

function showGeneratedPreview() {
  const selectedContacts = getSelectedContacts();

  if (!selectedContacts.length) {
    showMessage("Selecione ao menos um contato.", "error");
    return;
  }

  generatedText = generatePatientContactText(selectedContacts);
  patientListText.textContent = generatedText;
  renderPrintablePatientList(selectedContacts);
  contactsSelectionView.classList.add("hidden");
  patientListPreview.classList.remove("hidden");
  patientListFeedback.textContent = "";
  clearMessage();
  patientListPreview.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.readOnly = true;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}

async function copyGeneratedText() {
  if (!generatedText) {
    patientListFeedback.textContent = "Selecione ao menos um contato.";
    return;
  }

  try {
    const copied = await copyText(generatedText);
    patientListFeedback.textContent = copied ? "Texto copiado." : "Não foi possível copiar o texto.";
  } catch (error) {
    console.error("Falha ao copiar lista de contatos.", error);
    patientListFeedback.textContent = "Não foi possível copiar o texto.";
  }
}

function validateContactPayload(payload) {
  [contactName, contactPhone, contactGroup, contactDetails].forEach((field) => {
    field.removeAttribute("aria-invalid");
  });

  const missingFields = [];
  if (!payload.name) {
    missingFields.push(contactName);
  }
  if (!payload.phone) {
    missingFields.push(contactPhone);
  }
  if (!payload.group_name) {
    missingFields.push(contactGroup);
  }

  if (missingFields.length) {
    missingFields.forEach((field) => field.setAttribute("aria-invalid", "true"));
    missingFields[0].focus();
    showMessage("Preencha nome, telefone e grupo.", "error");
    return false;
  }

  if (
    payload.name.length > 150 ||
    payload.phone.length > 80 ||
    payload.group_name.length > 100 ||
    payload.details.length > 2000
  ) {
    showMessage("Revise o tamanho dos campos antes de salvar.", "error");
    return false;
  }

  return true;
}

function isMissingDetailsColumn(error) {
  const text = normalizeSearch(`${error && error.code ? error.code : ""} ${error && error.message ? error.message : ""}`);
  return text.includes("pgrst204") || text.includes("42703") || text.includes("details");
}

async function executeContactSave(payload, contactId = null, legacyFallback = false) {
  const databasePayload = legacyFallback
    ? {
        user_id: payload.user_id,
        name: payload.name,
        phone: payload.phone,
        group_name: payload.group_name,
        description: payload.details || null
      }
    : payload;
  let query = contactId
    ? contactsSupabaseClient
        .from("contacts")
        .update(databasePayload)
        .eq("id", contactId)
        .eq("user_id", currentUser.id)
    : contactsSupabaseClient.from("contacts").insert(databasePayload);

  query = query.select("*").single();
  return query;
}

async function saveContact() {
  clearMessage();
  const formValues = getFormValues();
  const payload = {
    user_id: currentUser.id,
    name: formValues.name,
    phone: formValues.phone,
    group_name: formValues.group_name,
    details: formValues.details
  };

  if (!validateContactPayload(payload)) {
    return;
  }

  saveContactButton.disabled = true;
  const savedEditingId = editingContactId;
  let result = await executeContactSave(payload, savedEditingId);

  if (result.error && isMissingDetailsColumn(result.error)) {
    console.info("Coluna details ainda não disponível; usando compatibilidade com o esquema antigo.");
    result = await executeContactSave(payload, savedEditingId, true);
  }

  saveContactButton.disabled = false;

  if (result.error || !result.data) {
    console.error("Falha técnica ao salvar contato.", result.error);
    showMessage("Não foi possível salvar o contato.", "error");
    return;
  }

  const savedContact = normalizeContactRecord(result.data);
  const existingIndex = contacts.findIndex((contact) => contact.id === savedContact.id);

  if (existingIndex >= 0) {
    contacts[existingIndex] = savedContact;
  } else {
    contacts.push(savedContact);
  }

  highlightedContactId = savedContact.id;
  resetContactForm();
  setContactsMode("select");
  renderContacts();
  showMessage(savedEditingId ? "Alterações salvas." : "Contato salvo com sucesso.", "success");

  window.setTimeout(() => {
    const savedCard = contactsList.querySelector(`[data-id="${savedContact.id}"]`);
    if (savedCard) {
      savedCard.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 0);
  window.setTimeout(() => {
    highlightedContactId = null;
    const savedCard = contactsList.querySelector(`[data-id="${savedContact.id}"]`);
    if (savedCard) {
      savedCard.classList.remove("newly-saved");
    }
  }, 2400);
}

async function deleteContact(contact) {
  const confirmed = window.confirm(
    `Excluir “${contact.name}”?\n\nEssa ação removerá o contato do banco de dados.`
  );

  if (!confirmed) {
    return;
  }

  clearMessage();
  const { error } = await contactsSupabaseClient
    .from("contacts")
    .delete()
    .eq("id", contact.id)
    .eq("user_id", currentUser.id);

  if (error) {
    console.error("Falha técnica ao excluir contato.", error);
    showMessage("Não foi possível excluir o contato.", "error");
    return;
  }

  contacts = contacts.filter((savedContact) => savedContact.id !== contact.id);
  selectedContactIds.delete(contact.id);
  expandedContactIds.delete(contact.id);
  renderContacts();
  showMessage("Contato excluído.", "success");
}

async function loadContacts() {
  clearMessage();
  const { data, error } = await contactsSupabaseClient.from("contacts").select("*");

  if (error) {
    console.error("Falha técnica ao carregar contatos.", error);
    contacts = [];
    selectedContactIds.clear();
    renderContacts();
    showMessage("Não foi possível carregar os contatos.", "error");
    return;
  }

  contacts = (data || []).map(normalizeContactRecord);
  const validIds = new Set(contacts.map((contact) => contact.id));
  selectedContactIds = new Set(
    Array.from(selectedContactIds).filter((contactId) => validIds.has(contactId))
  );
  populateGroupOptions();
  renderContacts();
}

async function refreshSession() {
  const { data, error } = await contactsSupabaseClient.auth.getSession();

  if (error) {
    console.error("Falha técnica ao recuperar sessão.", error);
    setAuthenticatedState(null);
    showMessage("Não foi possível verificar a sessão.", "error");
    return;
  }

  const user = data.session ? data.session.user : null;
  setAuthenticatedState(user);

  if (user) {
    await loadContacts();
  } else {
    renderContacts();
  }
}

function addNewGroup() {
  const groupName = newGroupName.value.trim();

  if (!groupName) {
    newGroupFeedback.textContent = "Informe o nome do grupo.";
    newGroupName.focus();
    return;
  }

  const existingGroup = getAvailableGroups().find(
    (group) => normalizeSearch(group) === normalizeSearch(groupName)
  );

  if (existingGroup) {
    populateGroupOptions(existingGroup);
    contactGroup.value = existingGroup;
    newGroupFeedback.textContent = "Esse grupo já existia e foi selecionado.";
  } else {
    sessionGroups.add(groupName);
    populateGroupOptions(groupName);
    contactGroup.value = groupName;
    newGroupFeedback.textContent = "Grupo adicionado e selecionado.";
  }

  newGroupName.value = "";
  window.setTimeout(() => {
    newGroupControls.classList.add("hidden");
    newGroupFeedback.textContent = "";
    contactGroup.focus();
  }, 700);
}

contactsSelectTab.addEventListener("click", () => requestContactsMode("select"));
contactsAddTab.addEventListener("click", () => requestContactsMode("add"));
document.querySelector(".contacts-mode-tabs").addEventListener("keydown", (event) => {
  const tabs = [contactsSelectTab, contactsAddTab];
  const currentIndex = tabs.indexOf(document.activeElement);

  if (currentIndex < 0 || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
    return;
  }

  event.preventDefault();
  let nextIndex = currentIndex;
  if (event.key === "ArrowLeft") {
    nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
  }
  if (event.key === "ArrowRight") {
    nextIndex = (currentIndex + 1) % tabs.length;
  }
  if (event.key === "Home") {
    nextIndex = 0;
  }
  if (event.key === "End") {
    nextIndex = tabs.length - 1;
  }
  tabs[nextIndex].focus();
  requestContactsMode(tabs[nextIndex].dataset.contactsMode);
});

addFirstContactButton.addEventListener("click", () => openContactEditor());
newGroupButton.addEventListener("click", () => {
  newGroupControls.classList.remove("hidden");
  newGroupFeedback.textContent = "";
  newGroupName.focus();
});
cancelGroupButton.addEventListener("click", () => {
  newGroupName.value = "";
  newGroupFeedback.textContent = "";
  newGroupControls.classList.add("hidden");
  contactGroup.focus();
});
addGroupButton.addEventListener("click", addNewGroup);
newGroupName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addNewGroup();
  }
});

cancelContactButton.addEventListener("click", () => {
  if (isContactFormDirty() && !window.confirm("Descartar as alterações deste contato?")) {
    return;
  }
  resetContactForm();
  setContactsMode("select");
});
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveContact();
});

contactSearch.addEventListener("input", () => {
  searchTerm = normalizeSearch(contactSearch.value);
  renderContacts();
});
showSelectedOnlyInput.addEventListener("change", () => {
  showSelectedOnly = showSelectedOnlyInput.checked;
  renderContacts();
});
clearSelectionButton.addEventListener("click", clearContactSelection);
generateSelectedButton.addEventListener("click", showGeneratedPreview);
backToSelectionButton.addEventListener("click", showContactsSelection);
copyPatientListButton.addEventListener("click", copyGeneratedText);
printPatientListButton.addEventListener("click", () => window.print());

contactsList.addEventListener("change", (event) => {
  const checkbox = event.target.closest('input[data-action="select-contact"]');
  if (!checkbox) {
    return;
  }
  const card = checkbox.closest(".contact-card");
  if (card) {
    toggleContactSelection(card.dataset.id, checkbox.checked);
  }
});

contactsList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  if (button.dataset.action === "add-empty") {
    openContactEditor();
    return;
  }

  if (button.dataset.action === "select-group") {
    selectVisibleGroup(button.dataset.group);
    return;
  }

  const card = button.closest(".contact-card");
  const contact = card
    ? contacts.find((savedContact) => savedContact.id === card.dataset.id)
    : null;

  if (!contact) {
    return;
  }

  if (button.dataset.action === "details") {
    if (expandedContactIds.has(contact.id)) {
      expandedContactIds.delete(contact.id);
    } else {
      expandedContactIds.add(contact.id);
    }
    renderContacts();
  }

  if (button.dataset.action === "edit") {
    openContactEditor(contact);
  }

  if (button.dataset.action === "delete") {
    deleteContact(contact);
  }
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessage();
  const { error } = await contactsSupabaseClient.auth.signInWithPassword({
    email: emailInput.value.trim(),
    password: passwordInput.value
  });

  if (error) {
    console.error("Falha técnica no login.", error);
    showMessage("Não foi possível entrar. Verifique e-mail e senha.", "error");
    return;
  }

  loginForm.reset();
  showMessage("Login realizado.", "success");
});

signupButton.addEventListener("click", async () => {
  clearMessage();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showMessage("Informe e-mail e senha para criar a conta.", "error");
    return;
  }

  const { data, error } = await contactsSupabaseClient.auth.signUp({ email, password });

  if (error) {
    console.error("Falha técnica ao criar conta.", error);
    showMessage("Não foi possível criar a conta.", "error");
    return;
  }

  loginForm.reset();
  showMessage(
    data.session
      ? "Conta criada e login realizado."
      : "Conta criada. Verifique o e-mail se a confirmação estiver habilitada.",
    "success"
  );
});

logoutButton.addEventListener("click", async () => {
  clearMessage();
  const { error } = await contactsSupabaseClient.auth.signOut();

  if (error) {
    console.error("Falha técnica ao sair.", error);
    showMessage("Não foi possível sair.", "error");
    return;
  }

  contacts = [];
  selectedContactIds.clear();
  expandedContactIds.clear();
  sessionGroups.clear();
  resetContactForm();
  showContactsSelection();
  setAuthenticatedState(null);
  renderContacts();
});

contactsSupabaseClient.auth.onAuthStateChange((_event, session) => {
  const user = session ? session.user : null;

  if (user && (!currentUser || currentUser.id !== user.id)) {
    setAuthenticatedState(user);
    loadContacts();
    return;
  }

  if (!user) {
    contacts = [];
    selectedContactIds.clear();
    expandedContactIds.clear();
    setAuthenticatedState(null);
    renderContacts();
  }
});

populateGroupOptions();
resetContactForm();
renderContacts();
refreshSession();
