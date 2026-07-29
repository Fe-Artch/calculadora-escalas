"use strict";

const SUPABASE_URL = "https://kstpsvgpmphqcliedjud.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_FNJLSzI1u8A4pgpQk5M3wQ_9nPjwdvj";
const CONSULTATION_COLOR = "#2e7d32";
const COMMITMENT_COLOR = "#7e57c2";
const HOUR_ROW_HEIGHT = 52;
const WEEKDAY_NAMES = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
];

const agendaSupabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
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
const agendaWorkspace = document.querySelector("#agenda-workspace");
const messageArea = document.querySelector("#message-area");

const monthTitle = document.querySelector("#month-title");
const calendarGrid = document.querySelector("#calendar-grid");
const previousMonthButton = document.querySelector("#previous-month-button");
const nextMonthButton = document.querySelector("#next-month-button");
const todayButton = document.querySelector("#today-button");
const newEventButton = document.querySelector("#new-event-button");
const newRoutineButton = document.querySelector("#new-routine-button");
const addEventToDayButton = document.querySelector("#add-event-to-day-button");
const addRoutineButton = document.querySelector("#add-routine-button");

const selectedDayTitle = document.querySelector("#selected-day-title");
const selectedDaySummary = document.querySelector("#selected-day-summary");
const dayEmptyMessage = document.querySelector("#day-empty-message");
const dayTimeline = document.querySelector("#day-timeline");
const dayHourLabels = document.querySelector("#day-hour-labels");
const dayHourLines = document.querySelector("#day-hour-lines");
const dayEventLayer = document.querySelector("#day-event-layer");
const routinesList = document.querySelector("#routines-list");

const eventDialog = document.querySelector("#event-dialog");
const eventForm = document.querySelector("#event-form");
const eventDialogTitle = document.querySelector("#event-dialog-title");
const eventTitleLabel = document.querySelector("#event-title-label");
const eventTitle = document.querySelector("#event-title");
const eventPhoneField = document.querySelector("#event-phone-field");
const eventPhone = document.querySelector("#event-phone");
const eventDate = document.querySelector("#event-date");
const eventStartTime = document.querySelector("#event-start-time");
const eventEndTime = document.querySelector("#event-end-time");
const eventLocation = document.querySelector("#event-location");
const eventNotes = document.querySelector("#event-notes");
const eventColor = document.querySelector("#event-color");
const eventColorName = document.querySelector("#event-color-name");
const eventFormFeedback = document.querySelector("#event-form-feedback");
const deleteEventButton = document.querySelector("#delete-event-button");
const saveEventButton = document.querySelector("#save-event-button");

const routineDialog = document.querySelector("#routine-dialog");
const routineForm = document.querySelector("#routine-form");
const routineDialogTitle = document.querySelector("#routine-dialog-title");
const routineTitle = document.querySelector("#routine-title");
const routineWeekday = document.querySelector("#routine-weekday");
const routineStartTime = document.querySelector("#routine-start-time");
const routineEndTime = document.querySelector("#routine-end-time");
const routineLocation = document.querySelector("#routine-location");
const routineNotes = document.querySelector("#routine-notes");
const routineColor = document.querySelector("#routine-color");
const routineColorPalette = document.querySelector("#routine-color-palette");
const routineActive = document.querySelector("#routine-active");
const routineFormFeedback = document.querySelector("#routine-form-feedback");
const deleteRoutineButton = document.querySelector("#delete-routine-button");
const saveRoutineButton = document.querySelector("#save-routine-button");

let currentUser = null;
let events = [];
let routines = [];
let selectedDate = startOfLocalDay(new Date());
let viewedMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1, 12);
let loadedRangeStart = "";
let loadedRangeEnd = "";
let editingEventId = null;
let editingRoutineId = null;
let eventEndManuallyEdited = false;
let routineEndManuallyEdited = false;
let eventColorCustomized = false;
let routineColorChosen = false;

function showMessage(message, type = "info") {
  messageArea.textContent = message;
  messageArea.className = `message-area${type ? ` ${type}` : ""}`;
}

function clearMessage() {
  showMessage("");
}

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function formatSupabaseError(error) {
  if (!error) {
    return "O banco não retornou detalhes adicionais.";
  }

  const code = cleanString(error.code);
  const parts = [error.message, error.details, error.hint]
    .map(cleanString)
    .filter((value, index, values) => value && values.indexOf(value) === index);
  return `${code ? `[${code}] ` : ""}${parts.join(" ") || "Erro desconhecido do Supabase."}`;
}

function startOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
}

function addDays(date, amount) {
  const result = startOfLocalDay(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey) {
  const [year, month, day] = String(dateKey).split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

function getCalendarRange(monthDate = viewedMonth) {
  const firstOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1, 12);
  const firstVisibleDay = addDays(firstOfMonth, -firstOfMonth.getDay());
  const lastVisibleDay = addDays(firstVisibleDay, 41);
  return { firstVisibleDay, lastVisibleDay };
}

function timeToMinutes(value) {
  const [hours, minutes] = String(value || "").slice(0, 5).split(":").map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return null;
  }
  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes) {
  const safeMinutes = Math.max(0, Math.min(1439, totalMinutes));
  const hours = Math.floor(safeMinutes / 60);
  const minutes = safeMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function normalizeTime(value) {
  return cleanString(value).slice(0, 5);
}

function setAutomaticEndTime(startInput, endInput, manuallyEdited) {
  const startMinutes = timeToMinutes(startInput.value);
  if (startMinutes === null || manuallyEdited) {
    return;
  }
  endInput.value = minutesToTime(Math.min(startMinutes + 60, 1439));
}

function adjustTimeInput(input, deltaMinutes) {
  const currentMinutes = timeToMinutes(input.value);
  const baseMinutes = currentMinutes === null ? 8 * 60 : currentMinutes;
  input.value = minutesToTime(baseMinutes + deltaMinutes);
}

function formatLongDate(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
}

function capitalizeFirst(value) {
  return value ? `${value.charAt(0).toLocaleUpperCase("pt-BR")}${value.slice(1)}` : "";
}

function getContrastingTextColor(hexColor) {
  const normalized = cleanString(hexColor).replace("#", "");
  if (!/^[0-9a-f]{6}$/iu.test(normalized)) {
    return "#ffffff";
  }
  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
  return luminance > 0.62 ? "#202124" : "#ffffff";
}

function normalizeEvent(record) {
  return {
    id: String(record.id || ""),
    user_id: String(record.user_id || ""),
    event_type: record.event_type === "commitment" ? "commitment" : "consultation",
    title: cleanString(record.title) || "Evento sem título",
    phone: cleanString(record.phone),
    event_date: cleanString(record.event_date),
    start_time: normalizeTime(record.start_time),
    end_time: normalizeTime(record.end_time),
    location: cleanString(record.location),
    notes: cleanString(record.notes),
    color: cleanString(record.color) || CONSULTATION_COLOR
  };
}

function normalizeRoutine(record) {
  return {
    id: String(record.id || ""),
    user_id: String(record.user_id || ""),
    title: cleanString(record.title) || "Rotina sem título",
    weekday: Number(record.weekday),
    start_time: normalizeTime(record.start_time),
    end_time: normalizeTime(record.end_time),
    location: cleanString(record.location),
    notes: cleanString(record.notes),
    color: cleanString(record.color) || "#2563eb",
    is_active: Boolean(record.is_active)
  };
}

function eventToCalendarItem(event) {
  return {
    id: `event-${event.id}`,
    sourceId: event.id,
    sourceType: "event",
    eventType: event.event_type,
    title: event.title,
    startTime: event.start_time,
    endTime: event.end_time,
    location: event.location,
    notes: event.notes,
    color: event.color
  };
}

function routineToCalendarItem(routine) {
  return {
    id: `routine-${routine.id}`,
    sourceId: routine.id,
    sourceType: "routine",
    eventType: "routine",
    title: routine.title,
    startTime: routine.start_time,
    endTime: routine.end_time,
    location: routine.location,
    notes: routine.notes,
    color: routine.color
  };
}

function getItemsForDate(date) {
  const dateKey = toDateKey(date);
  const eventItems = events
    .filter((event) => event.event_date === dateKey)
    .map(eventToCalendarItem);
  const routineItems = routines
    .filter((routine) => routine.is_active && routine.weekday === date.getDay())
    .map(routineToCalendarItem);

  return [...eventItems, ...routineItems].sort((first, second) => {
    const timeComparison = first.startTime.localeCompare(second.startTime);
    return timeComparison || first.title.localeCompare(second.title, "pt-BR", { sensitivity: "base" });
  });
}

function getItemTypeLabel(item) {
  if (item.sourceType === "routine") {
    return "Rotina";
  }
  return item.eventType === "commitment" ? "Compromisso" : "Consulta";
}

function getDayItemText(item) {
  const location = item.location ? ` · ${item.location}` : "";
  return `${item.startTime} - ${item.endTime}: ${getItemTypeLabel(item)} ${item.title}${location}`;
}

function getMonthItemText(item) {
  return `${item.startTime} ${item.title}`;
}

function createCalendarChip(item, date) {
  const chip = document.createElement("button");
  chip.type = "button";
  chip.className = "agenda-calendar-chip";
  chip.style.backgroundColor = item.color;
  chip.style.color = getContrastingTextColor(item.color);
  chip.textContent = getMonthItemText(item);
  chip.title = getDayItemText(item);
  chip.addEventListener("click", (event) => {
    event.stopPropagation();
    selectDate(date, true);
  });
  return chip;
}

function renderCalendar() {
  const { firstVisibleDay } = getCalendarRange();
  const todayKey = toDateKey(new Date());
  const selectedKey = toDateKey(selectedDate);

  monthTitle.textContent = capitalizeFirst(
    new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(viewedMonth)
  );
  calendarGrid.replaceChildren();

  for (let index = 0; index < 42; index += 1) {
    const date = addDays(firstVisibleDay, index);
    const dateKey = toDateKey(date);
    const cell = document.createElement("div");
    cell.className = "agenda-calendar-day";
    cell.setAttribute("role", "gridcell");
    cell.classList.toggle("outside-month", date.getMonth() !== viewedMonth.getMonth());
    cell.classList.toggle("today", dateKey === todayKey);
    cell.classList.toggle("selected", dateKey === selectedKey);

    const dayButton = document.createElement("button");
    dayButton.type = "button";
    dayButton.className = "agenda-day-number";
    dayButton.textContent = String(date.getDate());
    dayButton.setAttribute("aria-label", formatLongDate(date));
    dayButton.addEventListener("click", () => selectDate(date, true));
    cell.appendChild(dayButton);

    const chips = document.createElement("div");
    chips.className = "agenda-calendar-chips";
    getItemsForDate(date).forEach((item) => chips.appendChild(createCalendarChip(item, date)));
    cell.appendChild(chips);
    calendarGrid.appendChild(cell);
  }
}

function buildHourGrid() {
  dayHourLabels.replaceChildren();
  dayHourLines.replaceChildren();
  for (let hour = 0; hour < 24; hour += 1) {
    const label = document.createElement("div");
    label.className = "agenda-hour-label";
    label.textContent = `${String(hour).padStart(2, "0")}:00`;
    dayHourLabels.appendChild(label);

    const line = document.createElement("div");
    line.className = "agenda-hour-line";
    dayHourLines.appendChild(line);
  }
}

function layoutOverlappingItems(items) {
  const prepared = items
    .map((item) => ({
      ...item,
      startMinutes: timeToMinutes(item.startTime),
      endMinutes: timeToMinutes(item.endTime)
    }))
    .filter(
      (item) =>
        item.startMinutes !== null &&
        item.endMinutes !== null &&
        item.endMinutes > item.startMinutes
    )
    .sort((first, second) => first.startMinutes - second.startMinutes || first.endMinutes - second.endMinutes);

  const groups = [];
  let currentGroup = [];
  let groupEnd = -1;

  const finishGroup = () => {
    if (!currentGroup.length) {
      return;
    }
    const columnEnds = [];
    currentGroup.forEach((item) => {
      let column = columnEnds.findIndex((endMinutes) => endMinutes <= item.startMinutes);
      if (column < 0) {
        column = columnEnds.length;
        columnEnds.push(item.endMinutes);
      } else {
        columnEnds[column] = item.endMinutes;
      }
      item.column = column;
    });
    const columnCount = Math.max(columnEnds.length, 1);
    currentGroup.forEach((item) => {
      item.columnCount = columnCount;
    });
    groups.push(...currentGroup);
    currentGroup = [];
    groupEnd = -1;
  };

  prepared.forEach((item) => {
    if (currentGroup.length && item.startMinutes >= groupEnd) {
      finishGroup();
    }
    currentGroup.push(item);
    groupEnd = Math.max(groupEnd, item.endMinutes);
  });
  finishGroup();
  return groups;
}

function openItemEditor(item) {
  if (item.sourceType === "routine") {
    const routine = routines.find((savedRoutine) => savedRoutine.id === item.sourceId);
    if (routine) {
      openRoutineDialog(routine);
    }
    return;
  }

  const event = events.find((savedEvent) => savedEvent.id === item.sourceId);
  if (event) {
    openEventDialog(event);
  }
}

function renderDayTimeline() {
  const items = getItemsForDate(selectedDate);
  selectedDayTitle.textContent = capitalizeFirst(formatLongDate(selectedDate));
  selectedDaySummary.textContent = `${items.length} ${items.length === 1 ? "item" : "itens"} na agenda`;
  dayEmptyMessage.classList.toggle("hidden", items.length > 0);
  dayTimeline.classList.remove("hidden");
  dayEventLayer.replaceChildren();

  layoutOverlappingItems(items).forEach((item) => {
    const block = document.createElement("button");
    const top = (item.startMinutes / 60) * HOUR_ROW_HEIGHT;
    const height = ((item.endMinutes - item.startMinutes) / 60) * HOUR_ROW_HEIGHT;
    block.type = "button";
    block.className = "agenda-day-event";
    block.classList.toggle("compact", height < 32);
    block.style.top = `${top}px`;
    block.style.height = `${height}px`;
    block.style.backgroundColor = item.color;
    block.style.color = getContrastingTextColor(item.color);
    block.style.setProperty("--event-column", String(item.column));
    block.style.setProperty("--event-column-count", String(item.columnCount));
    block.textContent = getDayItemText(item);
    block.title = `${getDayItemText(item)}${item.notes ? `\n${item.notes}` : ""}`;
    block.addEventListener("click", () => openItemEditor(item));
    dayEventLayer.appendChild(block);
  });
}

function createRoutineRow(routine) {
  const row = document.createElement("article");
  row.className = `agenda-routine-row${routine.is_active ? "" : " inactive"}`;

  const color = document.createElement("span");
  color.className = "agenda-routine-color";
  color.style.backgroundColor = routine.color;
  color.setAttribute("aria-hidden", "true");

  const details = document.createElement("div");
  details.className = "agenda-routine-details";
  const title = document.createElement("strong");
  title.textContent = routine.title;
  const schedule = document.createElement("span");
  schedule.textContent = `${WEEKDAY_NAMES[routine.weekday]} · ${routine.start_time} - ${routine.end_time}${
    routine.location ? ` · ${routine.location}` : ""
  }`;
  details.append(title, schedule);

  const toggleLabel = document.createElement("label");
  toggleLabel.className = "agenda-routine-toggle";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = routine.is_active;
  checkbox.setAttribute("aria-label", `${routine.is_active ? "Desativar" : "Ativar"} ${routine.title}`);
  checkbox.addEventListener("change", () => toggleRoutineActive(routine, checkbox));
  const toggleText = document.createElement("span");
  toggleText.textContent = routine.is_active ? "Ativa" : "Inativa";
  toggleLabel.append(checkbox, toggleText);

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "secondary";
  editButton.textContent = "Editar";
  editButton.addEventListener("click", () => openRoutineDialog(routine));

  row.append(color, details, toggleLabel, editButton);
  return row;
}

function renderRoutines() {
  routinesList.replaceChildren();
  const sortedRoutines = [...routines].sort(
    (first, second) =>
      first.weekday - second.weekday ||
      first.start_time.localeCompare(second.start_time) ||
      first.title.localeCompare(second.title, "pt-BR", { sensitivity: "base" })
  );

  if (!sortedRoutines.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Nenhuma rotina cadastrada.";
    routinesList.appendChild(empty);
    return;
  }

  sortedRoutines.forEach((routine) => routinesList.appendChild(createRoutineRow(routine)));
}

function renderAgenda() {
  renderCalendar();
  renderDayTimeline();
  renderRoutines();
}

async function loadAgendaData() {
  if (!currentUser) {
    return;
  }

  clearMessage();
  const { firstVisibleDay, lastVisibleDay } = getCalendarRange();
  loadedRangeStart = toDateKey(firstVisibleDay);
  loadedRangeEnd = toDateKey(lastVisibleDay);

  const [eventsResult, routinesResult] = await Promise.all([
    agendaSupabaseClient
      .from("calendar_events")
      .select("*")
      .eq("user_id", currentUser.id)
      .gte("event_date", loadedRangeStart)
      .lte("event_date", loadedRangeEnd)
      .order("event_date")
      .order("start_time"),
    agendaSupabaseClient
      .from("weekly_routines")
      .select("*")
      .eq("user_id", currentUser.id)
      .order("weekday")
      .order("start_time")
  ]);

  if (eventsResult.error || routinesResult.error) {
    const error = eventsResult.error || routinesResult.error;
    events = [];
    routines = [];
    renderAgenda();
    showMessage(`Não foi possível carregar a agenda. ${formatSupabaseError(error)}`, "error");
    return;
  }

  events = (eventsResult.data || []).map(normalizeEvent);
  routines = (routinesResult.data || []).map(normalizeRoutine);
  renderAgenda();
}

function selectDate(date, scrollToDay = false) {
  selectedDate = startOfLocalDay(date);
  if (
    selectedDate.getFullYear() !== viewedMonth.getFullYear() ||
    selectedDate.getMonth() !== viewedMonth.getMonth()
  ) {
    viewedMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1, 12);
    loadAgendaData();
  } else {
    renderCalendar();
    renderDayTimeline();
  }

  if (scrollToDay) {
    document.querySelector("#day-panel").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function moveMonth(amount) {
  viewedMonth = new Date(viewedMonth.getFullYear(), viewedMonth.getMonth() + amount, 1, 12);
  selectedDate = new Date(viewedMonth.getFullYear(), viewedMonth.getMonth(), 1, 12);
  loadAgendaData();
}

function setAuthenticatedState(user) {
  currentUser = user;
  const authenticated = Boolean(user);
  loginForm.classList.toggle("hidden", authenticated);
  userPanel.classList.toggle("hidden", !authenticated);
  agendaWorkspace.classList.toggle("hidden", !authenticated);
  userEmail.textContent = user ? `Logado como ${user.email}` : "";
}

async function refreshSession() {
  const { data, error } = await agendaSupabaseClient.auth.getSession();
  if (error) {
    setAuthenticatedState(null);
    showMessage(`Não foi possível verificar a sessão. ${formatSupabaseError(error)}`, "error");
    return;
  }

  const user = data.session ? data.session.user : null;
  setAuthenticatedState(user);
  if (user) {
    await loadAgendaData();
  }
}

function updateEventTypeFields(forceDefaultColor = false) {
  const type = eventForm.elements["event-type"].value;
  const consultation = type === "consultation";
  eventTitleLabel.textContent = consultation ? "Nome" : "Título do compromisso";
  eventPhoneField.classList.toggle("hidden", !consultation);
  eventPhone.required = consultation;

  if (forceDefaultColor || !eventColorCustomized) {
    eventColor.value = consultation ? CONSULTATION_COLOR : COMMITMENT_COLOR;
    eventColorName.textContent = consultation ? "Verde de consulta" : "Roxo de compromisso";
  } else {
    eventColorName.textContent = "Cor personalizada";
  }
}

function openEventDialog(event = null, date = selectedDate) {
  eventForm.reset();
  editingEventId = event ? event.id : null;
  eventEndManuallyEdited = Boolean(event);
  eventColorCustomized = Boolean(event);
  eventFormFeedback.textContent = "";
  deleteEventButton.classList.toggle("hidden", !event);
  eventDialogTitle.textContent = event ? "Editar evento" : "Novo evento";
  saveEventButton.textContent = event ? "Salvar alterações" : "Salvar evento";

  if (event) {
    eventForm.elements["event-type"].value = event.event_type;
    eventTitle.value = event.title;
    eventPhone.value = event.phone;
    eventDate.value = event.event_date;
    eventStartTime.value = event.start_time;
    eventEndTime.value = event.end_time;
    eventLocation.value = event.location;
    eventNotes.value = event.notes;
    eventColor.value = event.color;
  } else {
    eventForm.elements["event-type"].value = "consultation";
    eventDate.value = toDateKey(date);
    eventColor.value = CONSULTATION_COLOR;
  }

  updateEventTypeFields(!event);
  eventDialog.showModal();
  window.setTimeout(() => eventTitle.focus(), 0);
}

function closeEventDialog() {
  if (eventDialog.open) {
    eventDialog.close();
  }
}

function validateEventForm() {
  const eventType = eventForm.elements["event-type"].value;
  const startMinutes = timeToMinutes(eventStartTime.value);
  const endMinutes = timeToMinutes(eventEndTime.value);

  if (!eventTitle.value.trim()) {
    eventFormFeedback.textContent = eventType === "consultation" ? "Informe o nome." : "Informe o compromisso.";
    eventTitle.focus();
    return false;
  }
  if (eventType === "consultation" && !eventPhone.value.trim()) {
    eventFormFeedback.textContent = "Informe o telefone.";
    eventPhone.focus();
    return false;
  }
  if (!eventDate.value || startMinutes === null || endMinutes === null) {
    eventFormFeedback.textContent = "Informe data, início e final.";
    return false;
  }
  if (endMinutes <= startMinutes) {
    eventFormFeedback.textContent = "O horário final precisa ser posterior ao inicial.";
    eventEndTime.focus();
    return false;
  }
  eventFormFeedback.textContent = "";
  return true;
}

async function saveEvent() {
  if (!validateEventForm()) {
    return;
  }

  const payload = {
    user_id: currentUser.id,
    event_type: eventForm.elements["event-type"].value,
    title: eventTitle.value.trim(),
    phone: eventForm.elements["event-type"].value === "consultation" ? eventPhone.value.trim() : "",
    event_date: eventDate.value,
    start_time: eventStartTime.value,
    end_time: eventEndTime.value,
    location: eventLocation.value.trim(),
    notes: eventNotes.value.trim(),
    color: eventColor.value
  };

  saveEventButton.disabled = true;
  const query = editingEventId
    ? agendaSupabaseClient
        .from("calendar_events")
        .update(payload)
        .eq("id", editingEventId)
        .eq("user_id", currentUser.id)
    : agendaSupabaseClient.from("calendar_events").insert(payload);
  const { error } = await query;
  saveEventButton.disabled = false;

  if (error) {
    eventFormFeedback.textContent = formatSupabaseError(error);
    return;
  }

  selectedDate = parseDateKey(payload.event_date);
  viewedMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1, 12);
  closeEventDialog();
  await loadAgendaData();
  showMessage(editingEventId ? "Evento atualizado." : "Evento salvo.", "success");
}

async function deleteEvent() {
  const event = events.find((savedEvent) => savedEvent.id === editingEventId);
  if (!event || !window.confirm(`Excluir “${event.title}”?`)) {
    return;
  }

  deleteEventButton.disabled = true;
  const { error } = await agendaSupabaseClient
    .from("calendar_events")
    .delete()
    .eq("id", event.id)
    .eq("user_id", currentUser.id);
  deleteEventButton.disabled = false;

  if (error) {
    eventFormFeedback.textContent = formatSupabaseError(error);
    return;
  }

  closeEventDialog();
  await loadAgendaData();
  showMessage("Evento excluído.", "success");
}

function selectRoutineColor(color) {
  routineColor.value = color;
  routineColorChosen = true;
  routineColorPalette.querySelectorAll("[data-color]").forEach((button) => {
    button.classList.toggle("selected", button.dataset.color.toLowerCase() === color.toLowerCase());
  });
}

function openRoutineDialog(routine = null) {
  routineForm.reset();
  editingRoutineId = routine ? routine.id : null;
  routineEndManuallyEdited = Boolean(routine);
  routineColorChosen = Boolean(routine);
  routineFormFeedback.textContent = "";
  deleteRoutineButton.classList.toggle("hidden", !routine);
  routineDialogTitle.textContent = routine ? "Editar rotina" : "Nova rotina";
  saveRoutineButton.textContent = routine ? "Salvar alterações" : "Salvar rotina";
  routineWeekday.value = String(selectedDate.getDay());
  routineActive.checked = true;
  routineColorPalette.querySelectorAll("[data-color]").forEach((button) => button.classList.remove("selected"));

  if (routine) {
    routineTitle.value = routine.title;
    routineWeekday.value = String(routine.weekday);
    routineStartTime.value = routine.start_time;
    routineEndTime.value = routine.end_time;
    routineLocation.value = routine.location;
    routineNotes.value = routine.notes;
    routineActive.checked = routine.is_active;
    selectRoutineColor(routine.color);
  }

  routineDialog.showModal();
  window.setTimeout(() => routineTitle.focus(), 0);
}

function closeRoutineDialog() {
  if (routineDialog.open) {
    routineDialog.close();
  }
}

function validateRoutineForm() {
  const startMinutes = timeToMinutes(routineStartTime.value);
  const endMinutes = timeToMinutes(routineEndTime.value);

  if (!routineTitle.value.trim()) {
    routineFormFeedback.textContent = "Informe o nome da rotina.";
    routineTitle.focus();
    return false;
  }
  if (startMinutes === null || endMinutes === null) {
    routineFormFeedback.textContent = "Informe o início e o final.";
    return false;
  }
  if (endMinutes <= startMinutes) {
    routineFormFeedback.textContent = "O horário final precisa ser posterior ao inicial.";
    routineEndTime.focus();
    return false;
  }
  if (!routineColorChosen) {
    routineFormFeedback.textContent = "Escolha uma cor para a rotina.";
    routineColorPalette.querySelector("[data-color]").focus();
    return false;
  }
  routineFormFeedback.textContent = "";
  return true;
}

async function saveRoutine() {
  if (!validateRoutineForm()) {
    return;
  }

  const payload = {
    user_id: currentUser.id,
    title: routineTitle.value.trim(),
    weekday: Number(routineWeekday.value),
    start_time: routineStartTime.value,
    end_time: routineEndTime.value,
    location: routineLocation.value.trim(),
    notes: routineNotes.value.trim(),
    color: routineColor.value,
    is_active: routineActive.checked
  };

  saveRoutineButton.disabled = true;
  const query = editingRoutineId
    ? agendaSupabaseClient
        .from("weekly_routines")
        .update(payload)
        .eq("id", editingRoutineId)
        .eq("user_id", currentUser.id)
    : agendaSupabaseClient.from("weekly_routines").insert(payload);
  const { error } = await query;
  saveRoutineButton.disabled = false;

  if (error) {
    routineFormFeedback.textContent = formatSupabaseError(error);
    return;
  }

  closeRoutineDialog();
  await loadAgendaData();
  showMessage(editingRoutineId ? "Rotina atualizada." : "Rotina salva.", "success");
}

async function deleteRoutine() {
  const routine = routines.find((savedRoutine) => savedRoutine.id === editingRoutineId);
  if (!routine || !window.confirm(`Excluir a rotina “${routine.title}”?`)) {
    return;
  }

  deleteRoutineButton.disabled = true;
  const { error } = await agendaSupabaseClient
    .from("weekly_routines")
    .delete()
    .eq("id", routine.id)
    .eq("user_id", currentUser.id);
  deleteRoutineButton.disabled = false;

  if (error) {
    routineFormFeedback.textContent = formatSupabaseError(error);
    return;
  }

  closeRoutineDialog();
  await loadAgendaData();
  showMessage("Rotina excluída.", "success");
}

async function toggleRoutineActive(routine, checkbox) {
  checkbox.disabled = true;
  const { error } = await agendaSupabaseClient
    .from("weekly_routines")
    .update({ is_active: checkbox.checked })
    .eq("id", routine.id)
    .eq("user_id", currentUser.id);
  checkbox.disabled = false;

  if (error) {
    checkbox.checked = !checkbox.checked;
    showMessage(`Não foi possível alterar a rotina. ${formatSupabaseError(error)}`, "error");
    return;
  }

  routine.is_active = checkbox.checked;
  renderAgenda();
  showMessage(checkbox.checked ? "Rotina ativada." : "Rotina desativada.", "success");
}

document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = document.querySelector(`#${button.dataset.closeDialog}`);
    if (dialog && dialog.open) {
      dialog.close();
    }
  });
});

[eventDialog, routineDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});

document.querySelectorAll(".agenda-time-step").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.querySelector(`#${button.dataset.timeTarget}`);
    adjustTimeInput(input, Number(button.dataset.timeDelta));

    if (input === eventStartTime) {
      setAutomaticEndTime(eventStartTime, eventEndTime, eventEndManuallyEdited);
    }
    if (input === eventEndTime) {
      eventEndManuallyEdited = true;
    }
    if (input === routineStartTime) {
      setAutomaticEndTime(routineStartTime, routineEndTime, routineEndManuallyEdited);
    }
    if (input === routineEndTime) {
      routineEndManuallyEdited = true;
    }
  });
});

eventStartTime.addEventListener("input", () => {
  setAutomaticEndTime(eventStartTime, eventEndTime, eventEndManuallyEdited);
});
eventEndTime.addEventListener("input", () => {
  eventEndManuallyEdited = true;
});
routineStartTime.addEventListener("input", () => {
  setAutomaticEndTime(routineStartTime, routineEndTime, routineEndManuallyEdited);
});
routineEndTime.addEventListener("input", () => {
  routineEndManuallyEdited = true;
});

eventForm.querySelectorAll('input[name="event-type"]').forEach((input) => {
  input.addEventListener("change", () => updateEventTypeFields(false));
});
eventColor.addEventListener("input", () => {
  eventColorCustomized = true;
  eventColorName.textContent = "Cor personalizada";
});
routineColorPalette.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-color]");
  if (button) {
    selectRoutineColor(button.dataset.color);
  }
});
routineColor.addEventListener("input", () => selectRoutineColor(routineColor.value));

eventForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveEvent();
});
routineForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveRoutine();
});
deleteEventButton.addEventListener("click", deleteEvent);
deleteRoutineButton.addEventListener("click", deleteRoutine);

newEventButton.addEventListener("click", () => openEventDialog());
addEventToDayButton.addEventListener("click", () => openEventDialog(null, selectedDate));
newRoutineButton.addEventListener("click", () => openRoutineDialog());
addRoutineButton.addEventListener("click", () => openRoutineDialog());
previousMonthButton.addEventListener("click", () => moveMonth(-1));
nextMonthButton.addEventListener("click", () => moveMonth(1));
todayButton.addEventListener("click", () => {
  const today = startOfLocalDay(new Date());
  viewedMonth = new Date(today.getFullYear(), today.getMonth(), 1, 12);
  selectedDate = today;
  loadAgendaData();
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessage();
  const { error } = await agendaSupabaseClient.auth.signInWithPassword({
    email: emailInput.value.trim(),
    password: passwordInput.value
  });

  if (error) {
    showMessage(`Não foi possível entrar. ${formatSupabaseError(error)}`, "error");
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

  const { data, error } = await agendaSupabaseClient.auth.signUp({ email, password });
  if (error) {
    showMessage(`Não foi possível criar a conta. ${formatSupabaseError(error)}`, "error");
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
  const { error } = await agendaSupabaseClient.auth.signOut();
  if (error) {
    showMessage(`Não foi possível sair. ${formatSupabaseError(error)}`, "error");
    return;
  }
  events = [];
  routines = [];
  setAuthenticatedState(null);
  renderAgenda();
});

agendaSupabaseClient.auth.onAuthStateChange((_event, session) => {
  const user = session ? session.user : null;
  if (user && (!currentUser || currentUser.id !== user.id)) {
    setAuthenticatedState(user);
    loadAgendaData();
    return;
  }
  if (!user) {
    events = [];
    routines = [];
    setAuthenticatedState(null);
    renderAgenda();
  }
});

buildHourGrid();
renderAgenda();
refreshSession();
