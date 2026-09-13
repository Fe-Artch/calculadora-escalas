"use strict";

const SUPABASE_URL = "https://kstpsvgpmphqcliedjud.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_FNJLSzI1u8A4pgpQk5M3wQ_9nPjwdvj";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, { auth: { detectSessionInUrl: false } });

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const els = {
  authPanel: $("#auth-panel"), loginForm: $("#login-form"), email: $("#email-input"), password: $("#password-input"), signup: $("#signup-button"),
  userPanel: $("#user-panel"), userEmail: $("#user-email"), logout: $("#logout-button"), workspace: $("#medication-workspace"), message: $("#message-area"),
  mapSelect: $("#map-select"), attributeSelect: $("#attribute-select"), library: $("#entity-library"), search: $("#entity-search"),
  selectedEntities: $("#selected-entities"), values: $("#attribute-values"), board: $("#relation-board"), empty: $("#map-empty"), lines: $("#relation-lines"), svg: $("#relation-svg"),
  mapTitle: $("#map-title"), mapSubtitle: $("#map-subtitle"), valueHeading: $("#value-heading"),
  entityDialog: $("#entity-dialog"), entityForm: $("#entity-form"), entityId: $("#entity-id"), entityName: $("#entity-name"), entityType: $("#entity-type"), entityColor: $("#entity-color"), entityParents: $("#entity-parents"), parentField: $("#parent-class-field"), deleteEntity: $("#delete-entity-button"),
  attributeDialog: $("#attribute-dialog"), attributeForm: $("#attribute-form"), attributeId: $("#attribute-id"), attributeName: $("#attribute-name"), attributeType: $("#attribute-type"), deleteAttribute: $("#delete-attribute-button"),
  valueDialog: $("#value-dialog"), valueForm: $("#value-form"), valueId: $("#value-id"), valueLabel: $("#value-label"), valueNote: $("#value-note"), deleteValue: $("#delete-value-button"), mapDialog: $("#map-dialog"), mapForm: $("#map-form"), mapName: $("#map-name")
};

let user = null, entities = [], attributes = [], values = [], relations = [], memberships = [], maps = [];
let currentMap = { id: null, name: "Novo mapa", attribute_id: null, entity_ids: [] };
let activeFilter = "all", pendingEntityId = null;

function message(text, type = "") { els.message.textContent = text; els.message.className = `message-area ${type}`; }
function norm(text) { return String(text || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }
function byName(a, b) { return a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" }); }
function openDialog(dialog) { dialog.hidden = false; dialog.querySelector("input:not([type=hidden]), select")?.focus(); }
function closeDialogs() { $$(".med-dialog").forEach((dialog) => { dialog.hidden = true; }); }
function selectedAttribute() { return attributes.find((item) => item.id === currentMap.attribute_id) || null; }
function selectedValues() { return values.filter((item) => item.attribute_id === currentMap.attribute_id); }
function entityById(id) { return entities.find((item) => item.id === id); }

async function loadAll() {
  const [entityResult, attributeResult, valueResult, relationResult, membershipResult, mapResult] = await Promise.all([
    db.from("med_entities").select("*").order("name"), db.from("med_attributes").select("*").order("name"),
    db.from("med_attribute_values").select("*").order("label"), db.from("med_relations").select("*"),
    db.from("med_entity_classes").select("*"), db.from("med_maps").select("*").order("updated_at", { ascending: false })
  ]);
  const failed = [entityResult, attributeResult, valueResult, relationResult, membershipResult, mapResult].find((result) => result.error);
  if (failed) throw failed.error;
  entities = entityResult.data || []; attributes = attributeResult.data || []; values = valueResult.data || [];
  relations = relationResult.data || []; memberships = membershipResult.data || []; maps = mapResult.data || [];
  if (!attributes.length) {
    const defaults = [
      { user_id: user.id, name: "Efeito farmacológico", value_type: "term" },
      { user_id: user.id, name: "Indicações", value_type: "term" }
    ];
    const result = await db.from("med_attributes").insert(defaults).select();
    if (result.error) throw result.error;
    attributes = result.data || [];
  }
  if (maps.length) selectMap(maps[0].id, false); else currentMap.attribute_id = attributes[0]?.id || null;
  render();
}

function render() { renderSelectors(); renderLibrary(); renderBoard(); }

function renderSelectors() {
  els.mapSelect.replaceChildren();
  if (!maps.length) els.mapSelect.add(new Option("Novo mapa (não salvo)", ""));
  maps.forEach((map) => els.mapSelect.add(new Option(map.name, map.id)));
  els.mapSelect.value = currentMap.id || "";
  els.attributeSelect.replaceChildren(new Option(attributes.length ? "Selecione" : "Crie um atributo", ""));
  attributes.forEach((attribute) => els.attributeSelect.add(new Option(attribute.name, attribute.id)));
  els.attributeSelect.value = currentMap.attribute_id || "";
}

function renderLibrary() {
  const query = norm(els.search.value);
  const filtered = entities.filter((entity) => (activeFilter === "all" || entity.entity_type === activeFilter) && norm(entity.name).includes(query));
  els.library.replaceChildren();
  if (!filtered.length) { els.library.innerHTML = '<div class="empty-state compact-empty">Nenhum item encontrado.</div>'; return; }
  filtered.forEach((entity) => {
    const row = document.createElement("div"); row.className = "library-row";
    row.innerHTML = `<span class="color-dot" style="--entity-color:${entity.color}"></span><button type="button" class="library-name"><strong></strong><small>${entity.entity_type === "class" ? "Classe" : "Medicamento"}</small></button><button type="button" class="icon-button add-to-map" title="Adicionar ao mapa">+</button><button type="button" class="icon-button edit-entity" title="Editar">⋯</button>`;
    row.querySelector("strong").textContent = entity.name;
    row.querySelector(".add-to-map").addEventListener("click", () => addEntityToMap(entity.id));
    row.querySelector(".library-name").addEventListener("click", () => addEntityToMap(entity.id));
    row.querySelector(".edit-entity").addEventListener("click", () => editEntity(entity));
    els.library.appendChild(row);
  });
}

function effectiveRelations(entityId) {
  const direct = relations.filter((relation) => relation.entity_id === entityId && relation.attribute_id === currentMap.attribute_id).map((relation) => ({ ...relation, inherited: false }));
  const directValues = new Set(direct.map((relation) => relation.value_id));
  const classIds = memberships.filter((item) => item.entity_id === entityId).map((item) => item.class_id);
  const inherited = relations.filter((relation) => classIds.includes(relation.entity_id) && relation.attribute_id === currentMap.attribute_id && !directValues.has(relation.value_id)).map((relation) => ({ ...relation, source_entity_id: entityId, inherited: true }));
  return [...direct, ...inherited];
}

function renderBoard() {
  const chosen = currentMap.entity_ids.map(entityById).filter(Boolean);
  const attribute = selectedAttribute();
  els.mapTitle.textContent = currentMap.name;
  els.mapSubtitle.textContent = attribute ? `Exibindo: ${attribute.name}` : "Selecione ou crie um atributo.";
  els.valueHeading.textContent = attribute?.name || "Valores";
  els.empty.hidden = chosen.length > 0; els.board.hidden = chosen.length === 0;
  els.selectedEntities.replaceChildren(); els.values.replaceChildren();
  chosen.forEach((entity) => {
    const card = document.createElement("div"); card.className = `entity-card ${pendingEntityId === entity.id ? "pending" : ""}`;
    card.dataset.entityId = entity.id; card.style.setProperty("--entity-color", entity.color || "#4568dc");
    card.innerHTML = `<button class="entity-card-main" type="button"><strong></strong><small>${entity.entity_type === "class" ? "Classe" : "Medicamento"}</small></button><button class="remove-card" type="button" aria-label="Remover do mapa">×</button>`;
    card.querySelector("strong").textContent = entity.name;
    card.querySelector(".entity-card-main").addEventListener("click", () => { pendingEntityId = pendingEntityId === entity.id ? null : entity.id; renderBoard(); });
    card.querySelector(".remove-card").addEventListener("click", () => { currentMap.entity_ids = currentMap.entity_ids.filter((id) => id !== entity.id); if (pendingEntityId === entity.id) pendingEntityId = null; renderBoard(); });
    els.selectedEntities.appendChild(card);
  });
  if (!attribute) els.values.innerHTML = '<div class="empty-state compact-empty">Crie ou selecione um atributo.</div>';
  else if (!selectedValues().length) els.values.innerHTML = '<div class="empty-state compact-empty">Adicione o primeiro valor.</div>';
  else selectedValues().forEach((value) => {
    const row = document.createElement("div"); row.className = "value-row"; row.dataset.valueId = value.id;
    row.innerHTML = `<button type="button" class="value-card"><strong></strong>${value.note ? "<small></small>" : ""}</button><button type="button" class="icon-button edit-value" title="Editar valor">⋯</button>`;
    row.querySelector("strong").textContent = value.label; if (value.note) row.querySelector("small").textContent = value.note;
    row.querySelector(".value-card").addEventListener("click", () => pendingEntityId ? toggleRelation(pendingEntityId, value.id) : message("Primeiro clique em um medicamento ou classe à esquerda."));
    row.querySelector(".edit-value").addEventListener("click", () => editValue(value)); els.values.appendChild(row);
  });
  requestAnimationFrame(drawRelations);
}

function drawRelations() {
  els.lines.replaceChildren();
  const svgRect = els.svg.getBoundingClientRect();
  if (!svgRect.width || !currentMap.attribute_id) return;
  currentMap.entity_ids.forEach((entityId, entityIndex) => {
    const entity = entityById(entityId), startCard = els.selectedEntities.querySelector(`[data-entity-id="${entityId}"]`);
    if (!entity || !startCard) return;
    effectiveRelations(entityId).forEach((relation, relationIndex) => {
      const endCard = els.values.querySelector(`[data-value-id="${relation.value_id}"]`); if (!endCard) return;
      const a = startCard.getBoundingClientRect(), b = endCard.getBoundingClientRect();
      const x1 = a.right - svgRect.left, y1 = a.top + a.height / 2 - svgRect.top;
      const x2 = b.left - svgRect.left, y2 = b.top + b.height / 2 - svgRect.top;
      const lane = x1 + Math.max(30, (x2 - x1) * .46) + ((entityIndex + relationIndex) % 5) * 5;
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", `M ${x1} ${y1} H ${lane} V ${y2} H ${x2 - 9}`); path.setAttribute("stroke", entity.color || "#4568dc");
      path.setAttribute("class", relation.inherited ? "relation-path inherited" : "relation-path"); path.setAttribute("marker-end", "url(#arrowhead)");
      path.addEventListener("click", () => relation.inherited ? message("Esta ligação é herdada de uma classe. Edite a classe para removê-la.") : deleteRelation(relation.id));
      els.lines.appendChild(path);
    });
  });
}

function addEntityToMap(id) { if (!currentMap.entity_ids.includes(id)) currentMap.entity_ids.push(id); renderBoard(); }

async function toggleRelation(entityId, valueId) {
  const existing = relations.find((item) => item.entity_id === entityId && item.attribute_id === currentMap.attribute_id && item.value_id === valueId);
  try {
    if (existing) return deleteRelation(existing.id);
    const { data, error } = await db.from("med_relations").insert({ user_id: user.id, entity_id: entityId, attribute_id: currentMap.attribute_id, value_id: valueId }).select().single();
    if (error) throw error; relations.push(data); pendingEntityId = null; renderBoard(); message("Ligação criada.", "success");
  } catch (error) { message(error.message, "error"); }
}

async function deleteRelation(id) {
  try { const { error } = await db.from("med_relations").delete().eq("id", id); if (error) throw error; relations = relations.filter((item) => item.id !== id); renderBoard(); message("Ligação removida.", "success"); }
  catch (error) { message(error.message, "error"); }
}

function editEntity(entity = null) {
  els.entityForm.reset(); els.entityId.value = entity?.id || ""; els.entityName.value = entity?.name || ""; els.entityType.value = entity?.entity_type || "medication"; els.entityColor.value = entity?.color || "#4568dc";
  els.entityParents.replaceChildren(); entities.filter((item) => item.entity_type === "class" && item.id !== entity?.id).sort(byName).forEach((item) => els.entityParents.add(new Option(item.name, item.id)));
  const selectedParents = memberships.filter((item) => item.entity_id === entity?.id).map((item) => item.class_id); Array.from(els.entityParents.options).forEach((option) => { option.selected = selectedParents.includes(option.value); });
  els.parentField.hidden = els.entityType.value === "class"; els.deleteEntity.hidden = !entity; $("#entity-dialog-title").textContent = entity ? "Editar item" : "Novo medicamento ou classe"; openDialog(els.entityDialog);
}

async function saveEntity(event) {
  event.preventDefault(); const id = els.entityId.value; const payload = { user_id: user.id, name: els.entityName.value.trim(), entity_type: els.entityType.value, color: els.entityColor.value };
  try {
    const query = id ? db.from("med_entities").update(payload).eq("id", id) : db.from("med_entities").insert(payload); const { data, error } = await query.select().single(); if (error) throw error;
    entities = id ? entities.map((item) => item.id === id ? data : item) : [...entities, data];
    await db.from("med_entity_classes").delete().eq("entity_id", data.id);
    memberships = memberships.filter((item) => item.entity_id !== data.id);
    if (data.entity_type === "medication") {
      const rows = Array.from(els.entityParents.selectedOptions).map((option) => ({ user_id: user.id, entity_id: data.id, class_id: option.value }));
      if (rows.length) { const result = await db.from("med_entity_classes").insert(rows).select(); if (result.error) throw result.error; memberships.push(...result.data); }
    }
    closeDialogs(); render(); message("Item salvo.", "success");
  } catch (error) { message(error.message, "error"); }
}

async function removeEntity() {
  if (!confirm("Excluir este item e todas as suas ligações?")) return;
  const id = els.entityId.value; const { error } = await db.from("med_entities").delete().eq("id", id); if (error) return message(error.message, "error");
  entities = entities.filter((item) => item.id !== id); relations = relations.filter((item) => item.entity_id !== id); memberships = memberships.filter((item) => item.entity_id !== id && item.class_id !== id); currentMap.entity_ids = currentMap.entity_ids.filter((item) => item !== id); closeDialogs(); render();
}

function editAttribute(attribute = null) { els.attributeForm.reset(); els.attributeId.value = attribute?.id || ""; els.attributeName.value = attribute?.name || ""; els.attributeType.value = attribute?.value_type || "term"; els.deleteAttribute.hidden = !attribute; $("#attribute-dialog-title").textContent = attribute ? "Editar atributo" : "Novo atributo"; openDialog(els.attributeDialog); }
async function saveAttribute(event) {
  event.preventDefault(); const id = els.attributeId.value, payload = { user_id: user.id, name: els.attributeName.value.trim(), value_type: els.attributeType.value };
  try { const query = id ? db.from("med_attributes").update(payload).eq("id", id) : db.from("med_attributes").insert(payload); const { data, error } = await query.select().single(); if (error) throw error; attributes = id ? attributes.map((item) => item.id === id ? data : item) : [...attributes, data]; currentMap.attribute_id = data.id; closeDialogs(); render(); message("Atributo salvo.", "success"); } catch (error) { message(error.message, "error"); }
}
async function removeAttribute() { if (!confirm("Excluir o atributo, seus valores e todas as ligações?")) return; const id = els.attributeId.value; const { error } = await db.from("med_attributes").delete().eq("id", id); if (error) return message(error.message, "error"); attributes = attributes.filter((item) => item.id !== id); values = values.filter((item) => item.attribute_id !== id); relations = relations.filter((item) => item.attribute_id !== id); currentMap.attribute_id = attributes[0]?.id || null; closeDialogs(); render(); }

function editValue(value = null) { els.valueForm.reset(); els.valueId.value = value?.id || ""; els.valueLabel.value = value?.label || ""; els.valueNote.value = value?.note || ""; els.deleteValue.hidden = !value; $("#value-dialog-title").textContent = value ? "Editar valor" : "Novo valor"; openDialog(els.valueDialog); }
async function saveValue(event) { event.preventDefault(); if (!currentMap.attribute_id) return message("Selecione um atributo primeiro.", "error"); const id = els.valueId.value; const payload = { user_id: user.id, attribute_id: currentMap.attribute_id, label: els.valueLabel.value.trim(), note: els.valueNote.value.trim() }; const query = id ? db.from("med_attribute_values").update(payload).eq("id", id) : db.from("med_attribute_values").insert(payload); const { data, error } = await query.select().single(); if (error) return message(error.message, "error"); values = id ? values.map((item) => item.id === id ? data : item) : [...values, data]; closeDialogs(); renderBoard(); message("Valor salvo.", "success"); }
async function removeValue() { if (!confirm("Excluir este valor e todas as suas ligações?")) return; const id = els.valueId.value; const { error } = await db.from("med_attribute_values").delete().eq("id", id); if (error) return message(error.message, "error"); values = values.filter((item) => item.id !== id); relations = relations.filter((item) => item.value_id !== id); closeDialogs(); renderBoard(); message("Valor excluído.", "success"); }

function selectMap(id, rerender = true) { const map = maps.find((item) => item.id === id); if (!map) return; currentMap = { id: map.id, name: map.name, attribute_id: map.attribute_id, entity_ids: Array.isArray(map.entity_ids) ? [...map.entity_ids] : [] }; pendingEntityId = null; if (rerender) render(); }
async function saveMap() {
  if (!currentMap.name || currentMap.name === "Novo mapa") return openDialog(els.mapDialog);
  const payload = { user_id: user.id, name: currentMap.name, attribute_id: currentMap.attribute_id || null, entity_ids: currentMap.entity_ids };
  try { const query = currentMap.id ? db.from("med_maps").update(payload).eq("id", currentMap.id) : db.from("med_maps").insert(payload); const { data, error } = await query.select().single(); if (error) throw error; currentMap.id = data.id; maps = maps.filter((item) => item.id !== data.id); maps.unshift(data); renderSelectors(); message("Mapa salvo.", "success"); } catch (error) { message(error.message, "error"); }
}
async function createMap(event) { event.preventDefault(); currentMap = { id: null, name: els.mapName.value.trim(), attribute_id: attributes[0]?.id || null, entity_ids: [] }; closeDialogs(); await saveMap(); render(); }

function togglePresentation() { document.body.classList.toggle("med-presentation"); $("#presentation-button").textContent = document.body.classList.contains("med-presentation") ? "Sair da apresentação" : "Apresentação"; requestAnimationFrame(drawRelations); }

els.loginForm.addEventListener("submit", async (event) => { event.preventDefault(); const { error } = await db.auth.signInWithPassword({ email: els.email.value.trim(), password: els.password.value }); if (error) message(error.message, "error"); });
els.signup.addEventListener("click", async () => { const { error } = await db.auth.signUp({ email: els.email.value.trim(), password: els.password.value }); message(error ? error.message : "Conta criada. Confira seu e-mail se a confirmação estiver ativada.", error ? "error" : "success"); });
els.logout.addEventListener("click", () => db.auth.signOut());
db.auth.onAuthStateChange(async (_event, session) => { user = session?.user || null; els.authPanel.hidden = Boolean(user); els.workspace.hidden = !user; els.userPanel.hidden = !user; els.userEmail.textContent = user?.email || ""; if (user) { try { await loadAll(); } catch (error) { message(`Execute o arquivo supabase-medications.sql no Supabase. ${error.message}`, "error"); } } });

els.search.addEventListener("input", renderLibrary); $$(".med-filter-tabs button").forEach((button) => button.addEventListener("click", () => { activeFilter = button.dataset.filter; $$(".med-filter-tabs button").forEach((item) => item.classList.toggle("active", item === button)); renderLibrary(); }));
$("#new-entity-button").addEventListener("click", () => editEntity()); els.entityType.addEventListener("change", () => { els.parentField.hidden = els.entityType.value === "class"; }); els.entityForm.addEventListener("submit", saveEntity); els.deleteEntity.addEventListener("click", removeEntity);
$("#new-attribute-button").addEventListener("click", () => editAttribute()); $("#edit-attribute-button").addEventListener("click", () => selectedAttribute() ? editAttribute(selectedAttribute()) : message("Selecione um atributo primeiro.")); els.attributeSelect.addEventListener("change", () => { currentMap.attribute_id = els.attributeSelect.value || null; pendingEntityId = null; renderBoard(); }); els.attributeForm.addEventListener("submit", saveAttribute); els.deleteAttribute.addEventListener("click", removeAttribute);
$("#new-value-button").addEventListener("click", () => currentMap.attribute_id ? editValue() : message("Crie ou selecione um atributo primeiro.", "error")); els.valueForm.addEventListener("submit", saveValue); els.deleteValue.addEventListener("click", removeValue);
$("#new-map-button").addEventListener("click", () => { els.mapForm.reset(); openDialog(els.mapDialog); }); els.mapForm.addEventListener("submit", createMap); els.mapSelect.addEventListener("change", () => selectMap(els.mapSelect.value)); $("#save-map-button").addEventListener("click", saveMap);
$("#presentation-button").addEventListener("click", togglePresentation); $("#print-map-button").addEventListener("click", () => window.print()); $$(".dialog-close").forEach((button) => button.addEventListener("click", closeDialogs)); $$(".med-dialog").forEach((dialog) => dialog.addEventListener("click", (event) => { if (event.target === dialog) closeDialogs(); })); window.addEventListener("resize", drawRelations);

db.auth.getSession().then(({ data }) => { if (!data.session) { els.authPanel.hidden = false; els.workspace.hidden = true; } });
