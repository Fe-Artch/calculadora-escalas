"use strict";

const eemSections = [
  {
    id: "appearance",
    title: "1 — Aparência geral, autocuidado e atitude",
    fullTitle: "Aparência/atitude",
    groups: [
      {
        id: "appearanceCare",
        title: "Aparência / autocuidado",
        type: "checkbox",
        options: [
          "Adequada ao contexto",
          "Descuidada",
          "Higiene prejudicada",
          "Vestimentas chamativas/extravagantes",
          "Vestimentas bizarras/incongruentes",
          "Vestimentas muito largas/escuras"
        ],
        other: true
      },
      {
        id: "attitudeContact",
        title: "Atitude / contato",
        type: "checkbox",
        options: [
          "Cooperativo/colaborativo",
          "Reservado/distante",
          "Pouco colaborativo",
          "Hostil/beligerante",
          "Desconfiado/suspicaz",
          "Evasivo",
          "Dissimulador",
          "Negativismo ativo",
          "Negativismo passivo",
          "Postura sedutora",
          "Postura instrumental/controladora"
        ],
        other: true
      }
    ]
  },
  {
    id: "psychomotricity",
    title: "2 — Comportamento e psicomotricidade",
    fullTitle: "Comportamento/psicomotricidade",
    groups: [
      {
        id: "psychomotricity",
        title: "Psicomotricidade",
        type: "checkbox",
        options: [
          "Psicomotricidade sem alterações evidentes",
          "Inquietude psicomotora",
          "Agitação psicomotora",
          "Lentificação psicomotora",
          "Estupor",
          "Catalepsia/flexibilidade cerácea",
          "Estereotipias",
          "Maneirismos",
          "Tiques",
          "Tremores",
          "Discinesias/movimentos involuntários"
        ],
        other: true
      },
      {
        id: "willPragmatism",
        title: "Volição/pragmatismo",
        type: "checkbox",
        options: [
          "Volição preservada",
          "Hiperbulia",
          "Hipobulia",
          "Abulia",
          "Pragmatismo preservado",
          "Pragmatismo comprometido"
        ]
      }
    ]
  },
  {
    id: "consciousnessAttentionOrientation",
    title: "3 — Consciência, atenção e orientação",
    fullTitle: "Consciência/atenção/orientação",
    groups: [
      { id: "consciousnessLevel", title: "Nível de consciência", type: "radio", options: ["Vigil/lúcido", "Obnubilação/sonolência leve", "Torpor", "Sopor", "Coma"] },
      { id: "consciousnessField", title: "Campo da consciência", type: "checkbox", options: ["Preservado", "Estreitamento do campo da consciência", "Dissociação", "Transe"] },
      { id: "tenacity", title: "Atenção - tenacidade", type: "radio", options: ["Preservada", "Hipotenacidade", "Hipertenacidade"] },
      { id: "vigilance", title: "Atenção - vigilância", type: "radio", options: ["Preservada", "Hipovigilância", "Hipervigilância"] },
      { id: "attentionChanges", title: "Alterações", type: "checkbox", options: ["Aprosexia", "Distratibilidade"] },
      { id: "selfOrientation", title: "Orientação autopsíquica", type: "radio", options: ["Orientado", "Desorientado"] },
      { id: "timeOrientation", title: "Orientação temporal", type: "radio", options: ["Orientado", "Desorientado"] },
      { id: "spaceOrientation", title: "Orientação espacial", type: "radio", options: ["Orientado", "Desorientado"] }
    ]
  },
  {
    id: "speechLanguage",
    title: "4 — Fala e linguagem",
    fullTitle: "Fala/linguagem",
    groups: [
      {
        id: "speech",
        title: "Fala",
        type: "checkbox",
        options: [
          "Normofônica/normoprosódica",
          "Logorreia",
          "Pressão de fala",
          "Mutismo",
          "Latência de resposta aumentada",
          "Bradilalia",
          "Hipofonia",
          "Hipertonia vocal/voz elevada",
          "Ecolalia",
          "Verbigeração",
          "Disartria",
          "Afasia ou dificuldade de nomeação/compreensão"
        ],
        other: true
      }
    ]
  },
  {
    id: "moodAffect",
    title: "5 — Humor e afeto",
    fullTitle: "Humor/afeto",
    groups: [
      { id: "mood", title: "Humor relatado/observado", type: "checkbox", options: ["Eutímico", "Hipotímico/deprimido", "Hipertímico/eufórico", "Disfórico/irritável", "Ansioso", "Apático", "Lábil"], other: true },
      { id: "affectTone", title: "Afeto - sintonia", type: "radio", options: ["Congruente", "Incongruente/paratímico"] },
      { id: "affectMobility", title: "Afeto - mobilidade", type: "radio", options: ["Reativo/modulável", "Lábil", "Restrito"] },
      { id: "affectIntensity", title: "Afeto - intensidade", type: "radio", options: ["Normal", "Hipomodulado", "Embotado", "Plano", "Exaltado/intenso"] }
    ]
  },
  {
    id: "thought",
    title: "6 — Pensamento",
    fullTitle: "Pensamento",
    groups: [
      { id: "thoughtCourse", title: "Curso/velocidade", type: "checkbox", options: ["Curso normal", "Taquipsiquismo", "Bradipsiquismo", "Bloqueio/interrupção", "Pobreza do pensamento", "Perseveração"] },
      { id: "thoughtForm", title: "Forma/estrutura", type: "checkbox", options: ["Agregado, lógico e coerente", "Fuga de ideias", "Afrouxamento de associações", "Descarrilamento", "Desagregação/incoerência", "Prolixidade/circunstancialidade", "Tangencialidade", "Concretismo", "Pensamento mágico", "Neologismos", "Salada de palavras"] },
      { id: "thoughtContent", title: "Conteúdo", type: "checkbox", options: ["Sem alterações de conteúdo evidentes", "Ideação suicida", "Ideação homicida", "Ideias de morte", "Ideias de culpa", "Ideias de ruína", "Ideias hipocondríacas", "Ideias persecutórias/paranoides", "Ideias de grandeza", "Ideias místicas/religiosas", "Ideias obsessivas intrusivas e egodistônicas", "Delírios sistematizados", "Delírios não sistematizados"], other: true }
    ]
  },
  {
    id: "perception",
    title: "7 — Sensopercepção",
    fullTitle: "Sensopercepção",
    groups: [
      { id: "perception", title: "Sensopercepção", type: "checkbox", options: ["Sem alterações sensoperceptivas evidentes", "Ilusões", "Alucinações auditivas", "Alucinações visuais", "Alucinações táteis", "Alucinações olfativas", "Alucinações gustativas", "Alucinações cenestésicas", "Alucinações de comando", "Alucinose, com crítica preservada", "Despersonalização", "Desrealização"], other: true },
      { id: "perceptionCriticism", title: "Crítica sobre a experiência", type: "radio", options: ["Preservada", "Parcial", "Ausente", "Não avaliada"] }
    ]
  },
  {
    id: "cognition",
    title: "8 — Cognição e memória",
    fullTitle: "Cognição/memória",
    groups: [
      { id: "memory", title: "Memória", type: "checkbox", options: ["Memória sem déficits grosseiros", "Déficit de memória imediata/trabalho", "Déficit de memória recente/fixação", "Déficit de memória remota/evocação", "Ilusões mnêmicas", "Alucinações mnêmicas", "Confabulação"] },
      { id: "cognition", title: "Cognição", type: "checkbox", options: ["Cálculo preservado", "Cálculo prejudicado", "Abstração preservada", "Abstração prejudicada/concretismo", "Funções executivas sem alteração grosseira", "Funções executivas prejudicadas", "Nível intelectual estimado dentro da média clínica", "Suspeita de rebaixamento cognitivo"], other: true }
    ]
  },
  {
    id: "insightJudgment",
    title: "9 — Insight, juízo crítico e julgamento",
    fullTitle: "Insight/juízo",
    groups: [
      { id: "realityTesting", title: "Juízo de realidade", type: "radio", options: ["Preservado", "Parcialmente comprometido", "Comprometido"] },
      { id: "judgment", title: "Julgamento crítico", type: "radio", options: ["Preservado", "Parcialmente prejudicado", "Prejudicado"] },
      { id: "insight", title: "Insight/autopatognose", type: "radio", options: ["Bom", "Parcial", "Prejudicado", "Ausente"] }
    ]
  },
  {
    id: "risk",
    title: "10 — Risco",
    fullTitle: "Risco",
    alwaysInclude: true,
    groups: [
      { id: "suicideRisk", title: "Risco suicida", type: "checkbox", options: ["Nega ideação suicida atual", "Ideação suicida passiva", "Ideação suicida ativa", "Plano suicida", "Intenção suicida", "Acesso a meios", "Tentativa prévia relatada", "Autoagressão recente"] },
      { id: "thirdPartyRisk", title: "Risco a terceiros", type: "checkbox", options: ["Nega ideação homicida/heteroagressiva atual", "Ideação homicida", "Ameaças a terceiros", "Comportamento heteroagressivo recente"] },
      { id: "otherRisks", title: "Outros riscos", type: "checkbox", options: ["Impulsividade importante", "Negligência grave de autocuidado", "Vulnerabilidade social", "Uso de substâncias associado a risco", "Sintomas psicóticos com possível risco", "Fatores protetores presentes", "Rede de apoio presente"], other: true },
      { id: "riskLevel", title: "Nível de risco estimado pelo clínico", type: "radio", options: ["Não estimado", "Baixo", "Moderado", "Alto", "Iminente"] }
    ],
    noteLabel: "Conduta/observação de risco"
  },
  {
    id: "psychophysiological",
    title: "11 — Funções psicofisiológicas",
    fullTitle: "Funções psicofisiológicas",
    groups: [
      { id: "sleep", title: "Sono", type: "checkbox", options: ["Preservado", "Insônia inicial", "Insônia intermediária", "Insônia terminal", "Hipersonia", "Necessidade reduzida de sono", "Sono fragmentado"], other: true },
      { id: "appetite", title: "Apetite", type: "checkbox", options: ["Preservado", "Hiporexia", "Hiperfagia", "Seletividade/restrição alimentar"], other: true },
      { id: "sexuality", title: "Sexualidade", type: "checkbox", options: ["Não avaliada", "Sem queixas", "Diminuída", "Aumentada", "Comportamento sexual de risco"], other: true }
    ]
  },
  {
    id: "reliability",
    title: "12 — Confiabilidade da entrevista",
    fullTitle: "Confiabilidade",
    groups: [
      { id: "reliability", title: "Confiabilidade", type: "radio", options: ["Boa", "Parcial", "Prejudicada", "Não avaliada"] },
      { id: "reasons", title: "Motivos, se aplicável", type: "checkbox", options: ["Baixa colaboração", "Evasividade", "Desorganização", "Rebaixamento de consciência", "Déficit cognitivo", "Intoxicação/abstinência suspeita", "Sintomas psicóticos", "Possível dissimulação", "Possível simulação"], other: true }
    ]
  }
];

const eemForm = document.querySelector("#eem-form");
const eemDate = document.querySelector("#eem-date");
const eemSectionsArea = document.querySelector("#eem-sections");
const eemClearButton = document.querySelector("#eem-clear-button");
const eemResultArea = document.querySelector("#eem-result-area");
const eemSummaryOutput = document.querySelector("#eem-summary-output");
const eemFullOutput = document.querySelector("#eem-full-output");
const eemCopyFeedback = document.querySelector("#eem-copy-feedback");

let eemState = createEemState();

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function createEemState() {
  const sections = {};
  const notes = {};

  eemSections.forEach((section) => {
    sections[section.id] = {};
    notes[section.id] = "";

    section.groups.forEach((group) => {
      sections[section.id][group.id] = group.type === "checkbox" ? [] : "";

      if (group.other) {
        sections[section.id][`${group.id}Other`] = "";
      }
    });
  });

  return {
    date: todayISO(),
    sections,
    notes
  };
}

function formatDateBR(isoDate) {
  if (!isoDate) {
    return "";
  }

  const [year, month, day] = isoDate.split("-");
  return day && month && year ? `${day}/${month}/${year}` : "";
}

function renderEemPage() {
  eemDate.value = eemState.date;
  eemSectionsArea.innerHTML = "";
  eemSections.forEach((section) => eemSectionsArea.appendChild(renderEemSection(section)));
}

function renderEemSection(section) {
  const details = document.createElement("details");
  details.className = "eem-section";
  details.open = true;
  details.dataset.eemSection = section.id;

  const summary = document.createElement("summary");
  summary.className = "eem-section-header";
  summary.textContent = section.title;
  details.appendChild(summary);

  section.groups.forEach((group) => {
    const block = document.createElement("div");
    block.className = "eem-group";

    const title = document.createElement("h3");
    title.textContent = group.title;
    block.appendChild(title);

    const options = document.createElement("div");
    options.className = "eem-options-grid";

    group.options.forEach((option) => {
      const label = document.createElement("label");
      label.className = "eem-option";
      const input = document.createElement("input");
      input.type = group.type === "radio" ? "radio" : "checkbox";
      input.name = group.type === "radio" ? `${section.id}-${group.id}` : `${section.id}-${group.id}-${option}`;
      input.value = option;
      input.dataset.eemSection = section.id;
      input.dataset.eemField = group.id;
      input.dataset.eemOption = option;

      const value = eemState.sections[section.id][group.id];
      input.checked = Array.isArray(value) ? value.includes(option) : value === option;
      label.append(input, document.createTextNode(option));
      options.appendChild(label);
    });

    block.appendChild(options);

    if (group.other) {
      const otherLabel = document.createElement("label");
      otherLabel.className = "field-label eem-other";
      otherLabel.textContent = "Outro";
      const other = document.createElement("input");
      other.type = "text";
      other.value = eemState.sections[section.id][`${group.id}Other`];
      other.dataset.eemSection = section.id;
      other.dataset.eemField = `${group.id}Other`;
      otherLabel.appendChild(other);
      block.appendChild(otherLabel);
    }

    details.appendChild(block);
  });

  const noteLabel = document.createElement("label");
  noteLabel.className = "field-label eem-note";
  noteLabel.textContent = section.noteLabel || "Nota opcional da seção";
  const note = document.createElement("textarea");
  note.value = eemState.notes[section.id];
  note.dataset.eemSection = section.id;
  note.dataset.eemField = "note";
  noteLabel.appendChild(note);
  details.appendChild(noteLabel);

  return details;
}

function updateEemState(event) {
  const target = event.target;

  if (!target.dataset.eemField) {
    return;
  }

  if (target.dataset.eemField === "date") {
    eemState.date = target.value;
    return;
  }

  const sectionId = target.dataset.eemSection;
  const field = target.dataset.eemField;

  if (field === "note") {
    eemState.notes[sectionId] = target.value;
    return;
  }

  if (target.type === "checkbox") {
    const values = eemState.sections[sectionId][field];

    if (target.checked && !values.includes(target.value)) {
      values.push(target.value);
    }

    if (!target.checked) {
      eemState.sections[sectionId][field] = values.filter((value) => value !== target.value);
    }

    return;
  }

  eemState.sections[sectionId][field] = target.value;
}

function selectedValues(sectionId, groupId) {
  const value = eemState.sections[sectionId][groupId];
  return Array.isArray(value) ? value : value ? [value] : [];
}

function groupText(sectionId, group) {
  const values = selectedValues(sectionId, group.id);
  const other = group.other ? eemState.sections[sectionId][`${group.id}Other`].trim() : "";
  const parts = [...values];

  if (other) {
    parts.push(other);
  }

  return parts;
}

function sectionFindings(section) {
  const findings = [];

  section.groups.forEach((group) => {
    const parts = groupText(section.id, group);

    if (parts.length) {
      findings.push(`${group.title}: ${parts.join(", ")}`);
    }
  });

  const note = eemState.notes[section.id].trim();
  if (note) {
    findings.push(`${section.noteLabel || "Nota"}: ${note}`);
  }

  return findings;
}

function hasAny(sectionId, groupId, options) {
  const values = selectedValues(sectionId, groupId);
  return options.some((option) => values.includes(option));
}

function firstSelected(sectionId, groupId) {
  return selectedValues(sectionId, groupId)[0] || "";
}

function lowerFirst(text) {
  return text ? text.charAt(0).toLowerCase() + text.slice(1) : "";
}

function appendIf(parts, value) {
  if (value) {
    parts.push(value);
  }
}

function generateEemSummary() {
  const parts = [];

  appendIf(parts, lowerFirst(firstSelected("consciousnessAttentionOrientation", "consciousnessLevel")));

  const self = firstSelected("consciousnessAttentionOrientation", "selfOrientation");
  const time = firstSelected("consciousnessAttentionOrientation", "timeOrientation");
  const space = firstSelected("consciousnessAttentionOrientation", "spaceOrientation");
  if (self === "Orientado" && time === "Orientado" && space === "Orientado") {
    parts.push("orientado auto e alopsiquicamente");
  } else {
    if (self) parts.push(`${lowerFirst(self)} quanto à orientação autopsíquica`);
    if (time) parts.push(`${lowerFirst(time)} no tempo`);
    if (space) parts.push(`${lowerFirst(space)} no espaço`);
  }

  appendIf(parts, lowerFirst(firstSelected("appearance", "appearanceCare")));
  appendIf(parts, lowerFirst(firstSelected("appearance", "attitudeContact")));

  const attention = [
    lowerFirst(firstSelected("consciousnessAttentionOrientation", "tenacity")),
    lowerFirst(firstSelected("consciousnessAttentionOrientation", "vigilance")),
    ...selectedValues("consciousnessAttentionOrientation", "attentionChanges").map(lowerFirst)
  ].filter(Boolean);
  if (attention.length) parts.push(attention.join(" e "));

  appendIf(parts, lowerFirst(firstSelected("psychomotricity", "psychomotricity")));
  appendIf(parts, lowerFirst(firstSelected("speechLanguage", "speech")));
  const mood = lowerFirst(firstSelected("moodAffect", "mood"));
  if (mood) {
    parts.push(`humor ${mood}`);
  }

  const affect = [
    lowerFirst(firstSelected("moodAffect", "affectTone")),
    lowerFirst(firstSelected("moodAffect", "affectMobility")),
    lowerFirst(firstSelected("moodAffect", "affectIntensity"))
  ].filter(Boolean);
  if (affect.length) parts.push(`afeto ${affect.join(" e ")}`);

  appendIf(parts, lowerFirst(firstSelected("thought", "thoughtCourse")));
  appendIf(parts, lowerFirst(firstSelected("thought", "thoughtForm")));
  appendIf(parts, selectedValues("thought", "thoughtContent").map(lowerFirst).join(", "));
  appendIf(parts, selectedValues("perception", "perception").map(lowerFirst).join(", "));
  appendIf(parts, selectedValues("cognition", "memory").map(lowerFirst).join(", "));

  const reality = firstSelected("insightJudgment", "realityTesting");
  const judgment = firstSelected("insightJudgment", "judgment");
  const insight = firstSelected("insightJudgment", "insight");
  if (reality) parts.push(`juízo de realidade ${lowerFirst(reality)}`);
  if (judgment) parts.push(`julgamento crítico ${lowerFirst(judgment)}`);
  if (insight) parts.push(`insight ${lowerFirst(insight)}`);

  const riskParts = buildRiskPhrase();
  if (riskParts.summary) parts.push(riskParts.summary);

  if (!parts.length) {
    parts.push("sem achados selecionados para resumo");
  }

  return `EEM em ${formatDateBR(eemState.date)}: paciente ${parts.join(", ")}.`;
}

function buildRiskPhrase() {
  const suicide = selectedValues("risk", "suicideRisk");
  const thirdParty = selectedValues("risk", "thirdPartyRisk");
  const riskLevel = firstSelected("risk", "riskLevel");
  const warningItems = ["Ideação suicida passiva", "Ideação suicida ativa", "Plano suicida", "Intenção suicida", "Acesso a meios"];
  const hasSuicideWarning = warningItems.some((item) => suicide.includes(item));
  const summaryParts = [];
  const fullParts = [];

  if (suicide.includes("Nega ideação suicida atual")) {
    summaryParts.push("nega ideação suicida atual");
  }

  suicide
    .filter((item) => item !== "Nega ideação suicida atual")
    .forEach((item) => summaryParts.push(lowerFirst(item)));

  if (thirdParty.includes("Nega ideação homicida/heteroagressiva atual")) {
    summaryParts.push("nega ideação homicida/heteroagressiva atual");
  }

  thirdParty
    .filter((item) => item !== "Nega ideação homicida/heteroagressiva atual")
    .forEach((item) => summaryParts.push(lowerFirst(item)));

  fullParts.push(...sectionFindings(eemSections.find((section) => section.id === "risk")));

  if (riskLevel && riskLevel !== "Não estimado") {
    fullParts.push(`Nível de risco estimado pelo clínico: ${riskLevel.toLowerCase()}`);
  }

  if (hasSuicideWarning) {
    const warning = "requer avaliação clínica de risco e conduta conforme contexto";
    summaryParts.push(warning);
    fullParts.push(warning);
  }

  if (!summaryParts.length) {
    summaryParts.push("risco não documentado pelos campos estruturados");
  }

  return {
    summary: summaryParts.join(", "),
    full: fullParts.length ? fullParts.join("; ") : "Risco: sem campos estruturados selecionados."
  };
}

function generateEemFullText() {
  const lines = [`Exame do Estado Mental em ${formatDateBR(eemState.date)}`];

  eemSections.forEach((section) => {
    if (section.id === "risk") {
      lines.push(`${section.fullTitle}: ${buildRiskPhrase().full}`);
      return;
    }

    const findings = sectionFindings(section);
    if (findings.length || section.alwaysInclude) {
      lines.push(`${section.fullTitle}: ${findings.length ? findings.join("; ") : "sem achados selecionados."}`);
    }
  });

  return lines.join("\n");
}

function generateEemOutputs() {
  const summary = generateEemSummary();
  const full = generateEemFullText();

  eemSummaryOutput.textContent = summary;
  eemFullOutput.textContent = full;
  eemResultArea.classList.remove("hidden");
  eemCopyFeedback.textContent = "";
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "16px";
  textarea.style.left = "16px";
  textarea.style.zIndex = "9999";
  textarea.style.width = "min(720px, calc(100% - 32px))";
  textarea.style.height = "180px";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  const copied = document.execCommand("copy");
  if (copied) {
    textarea.remove();
    return;
  }

  throw new Error("Texto selecionado para cópia manual.");
}

function clearEemState() {
  eemState = createEemState();
  eemResultArea.classList.add("hidden");
  eemSummaryOutput.textContent = "";
  eemFullOutput.textContent = "";
  eemCopyFeedback.textContent = "";
  renderEemPage();
}

function initEemPage() {
  renderEemPage();

  eemForm.addEventListener("change", updateEemState);
  eemForm.addEventListener("input", updateEemState);
  eemForm.addEventListener("submit", (event) => {
    event.preventDefault();
    generateEemOutputs();
  });

  eemClearButton.addEventListener("click", clearEemState);

  eemResultArea.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-output-type]");
    if (!button) {
      return;
    }

    const text = button.dataset.outputType === "summary" ? eemSummaryOutput.textContent : eemFullOutput.textContent;
    if (!text) {
      return;
    }

    try {
      await copyTextToClipboard(text);
      eemCopyFeedback.textContent = "Copiado.";
      window.setTimeout(() => {
        eemCopyFeedback.textContent = "";
      }, 2000);
    } catch (error) {
      eemCopyFeedback.textContent =
        error.message === "Texto selecionado para cópia manual."
          ? "Texto selecionado para cópia manual."
          : "Não foi possível copiar.";
    }
  });
}

initEemPage();
