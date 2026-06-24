"use strict";

const diagnosticCategories = [
  "Todos",
  "Neurodesenvolvimento",
  "Humor",
  "Ansiedade",
  "Psicóticos",
  "Obsessivo-compulsivos",
  "Trauma/estresse",
  "Uso de substâncias",
  "Alimentares",
  "Personalidade",
  "Sono",
  "Outros"
];

function symptomItem(id, label, shortText) {
  return {
    id,
    label,
    shortText,
    officialText: "",
    answerType: "present_absent_unknown",
    notesEnabled: true
  };
}

function requiredCriterion(id, title, label, type = "required-binary") {
  return {
    id,
    title,
    type,
    items: [symptomItem(id, label, label)]
  };
}

function symptomGroup(id, title, items, thresholdAdult, thresholdChild) {
  return {
    id,
    title,
    type: "symptom-count",
    thresholdAdult,
    thresholdChild,
    items
  };
}

const adhdInattention = [
  ["A1", "Erros por descuido ou dificuldade com detalhes"],
  ["A2", "Dificuldade de manter atenção"],
  ["A3", "Parece não escutar"],
  ["A4", "Não termina tarefas ou instruções"],
  ["A5", "Dificuldade de organização"],
  ["A6", "Evita esforço mental sustentado"],
  ["A7", "Perde objetos necessários"],
  ["A8", "Distrai-se facilmente"],
  ["A9", "Esquecimento em atividades diárias"]
].map(([id, label]) => symptomItem(id, label, label));

const adhdHyper = [
  ["HI1", "Remexe mãos/pés ou se contorce"],
  ["HI2", "Levanta-se quando deveria permanecer sentado"],
  ["HI3", "Inquietação ou corre/sobe em situações inadequadas"],
  ["HI4", "Dificuldade em lazer silencioso"],
  ["HI5", "Age como se estivesse a mil ou ligado a motor"],
  ["HI6", "Fala excessivamente"],
  ["HI7", "Responde antes da pergunta terminar"],
  ["HI8", "Dificuldade de esperar a vez"],
  ["HI9", "Interrompe ou se intromete"]
].map(([id, label]) => symptomItem(id, label, label));

const diagnosticCriteriaData = [
  {
    id: "adhd_dsm5",
    name: "TDAH",
    category: "Neurodesenvolvimento",
    sourceLabel: "DSM-5/DSM-5-TR",
    description: "Critérios diagnósticos para Transtorno de Déficit de Atenção/Hiperatividade.",
    disclaimer: "Use como apoio. Confirmar no manual oficial e no contexto clínico.",
    needsAgeGroup: true,
    criteriaGroups: [
      { id: "A", title: "Critério A — Sintomas", type: "domain-count", domains: [
        symptomGroup("inattention", "Desatenção", adhdInattention, 5, 6),
        symptomGroup("hyperimpulsive", "Hiperatividade/Impulsividade", adhdHyper, 5, 6)
      ] },
      requiredCriterion("B", "Critério B — Início", "Vários sintomas presentes antes dos 12 anos."),
      requiredCriterion("C", "Critério C — Contextos", "Sintomas presentes em dois ou mais contextos."),
      requiredCriterion("D", "Critério D — Prejuízo", "Evidência de prejuízo funcional clinicamente significativo."),
      requiredCriterion("E", "Critério E — Exclusão/diferencial", "Sintomas não são melhor explicados por outro transtorno/condição.", "required-negative")
    ],
    evaluator: "evaluateAdhd"
  },
  {
    id: "mde",
    name: "Episódio Depressivo Maior",
    category: "Humor",
    sourceLabel: "DSM-5/DSM-5-TR",
    description: "Checklist resumido para episódio depressivo maior.",
    disclaimer: "Rótulos curtos/parafraseados. Conferir manual oficial.",
    criteriaGroups: [
      { id: "A", title: "Critério A — Sintomas", type: "symptom-count", thresholdAdult: 5, items: [
        symptomItem("MDE1", "Humor deprimido", "Humor deprimido relatado ou observado."),
        symptomItem("MDE2", "Perda de interesse/prazer", "Anedonia ou redução importante de interesse."),
        symptomItem("MDE3", "Alteração de peso/apetite", "Alteração relevante de peso ou apetite."),
        symptomItem("MDE4", "Insônia ou hipersonia", "Alteração de sono."),
        symptomItem("MDE5", "Agitação ou retardo psicomotor", "Alteração psicomotora observável."),
        symptomItem("MDE6", "Fadiga ou perda de energia", "Energia reduzida."),
        symptomItem("MDE7", "Culpa ou desvalia", "Culpa excessiva ou sentimento de desvalia."),
        symptomItem("MDE8", "Concentração/decisão prejudicada", "Dificuldade de pensar, concentrar ou decidir."),
        symptomItem("MDE9", "Morte ou suicídio", "Ideias de morte, ideação ou comportamento suicida.")
      ], gatewayItems: ["MDE1", "MDE2"] },
      requiredCriterion("DUR", "Duração", "Sintomas por pelo menos 2 semanas.", "duration"),
      requiredCriterion("IMP", "Prejuízo/sofrimento", "Sofrimento clinicamente significativo ou prejuízo funcional.", "impairment"),
      requiredCriterion("SUB", "Exclusão clínica/substâncias", "Não atribuível a substância ou condição médica.", "exclusion"),
      requiredCriterion("PSY", "Diferencial psicótico", "Não melhor explicado por transtorno do espectro psicótico.", "exclusion"),
      { id: "MANIA", title: "História maníaca/hipomaníaca", type: "optional", items: [symptomItem("MANIA", "História de mania/hipomania", "Opcional: revisar para transtorno depressivo maior.")] }
    ],
    evaluator: "evaluateMajorDepressiveEpisode"
  },
  {
    id: "mania",
    name: "Episódio Maníaco",
    category: "Humor",
    sourceLabel: "DSM-5/DSM-5-TR",
    description: "Checklist resumido para episódio maníaco.",
    disclaimer: "Rótulos curtos/parafraseados. Conferir manual oficial.",
    criteriaGroups: [
      requiredCriterion("MOOD", "Humor/energia", "Período distinto de humor elevado/expansivo/irritável e energia aumentada."),
      { id: "IRR", title: "Qualificador de humor", type: "optional", items: [
        symptomItem("MAN_IRR", "Humor apenas irritável", "Opcional: marque se o humor está apenas irritável, sem elevação/expansividade.")
      ] },
      requiredCriterion("DUR", "Duração", "Duração aproximada de 1 semana ou qualquer duração se hospitalização necessária.", "duration"),
      { id: "SYM", title: "Sintomas associados", type: "symptom-count", thresholdAdult: 3, items: [
        symptomItem("MAN1", "Autoestima elevada/grandiosidade", "Autoestima inflada ou grandiosidade."),
        symptomItem("MAN2", "Menor necessidade de sono", "Redução da necessidade de sono."),
        symptomItem("MAN3", "Mais falante/pressão de fala", "Fala aumentada ou pressionada."),
        symptomItem("MAN4", "Fuga de ideias", "Pensamentos acelerados ou fuga de ideias."),
        symptomItem("MAN5", "Distratibilidade", "Atenção facilmente desviada."),
        symptomItem("MAN6", "Aumento de atividade/agitação", "Atividade dirigida a objetivos ou agitação."),
        symptomItem("MAN7", "Atividades de risco", "Envolvimento em atividades com alto potencial de consequências.")
      ] },
      { id: "SEV", title: "Gravidade", type: "any-of", items: [
        symptomItem("MARKED", "Prejuízo marcado", "Prejuízo social/ocupacional marcado."),
        symptomItem("HOSP", "Hospitalização", "Hospitalização necessária."),
        symptomItem("PSYCH", "Psicose", "Características psicóticas presentes.")
      ] },
      requiredCriterion("SUB", "Exclusão clínica/substâncias", "Não atribuível a substância ou condição médica.", "exclusion")
    ],
    evaluator: "evaluateMania"
  },
  {
    id: "hypomania",
    name: "Episódio Hipomaníaco",
    category: "Humor",
    sourceLabel: "DSM-5/DSM-5-TR",
    description: "Checklist resumido para episódio hipomaníaco.",
    disclaimer: "Rótulos curtos/parafraseados. Conferir manual oficial.",
    criteriaGroups: [
      requiredCriterion("MOOD", "Humor/energia", "Humor elevado/expansivo/irritável e energia aumentada."),
      { id: "IRR", title: "Qualificador de humor", type: "optional", items: [
        symptomItem("HYP_IRR", "Humor apenas irritável", "Opcional: marque se o humor está apenas irritável, sem elevação/expansividade.")
      ] },
      requiredCriterion("DUR", "Duração", "Duração aproximada de 4 dias.", "duration"),
      { id: "SYM", title: "Sintomas associados", type: "symptom-count", thresholdAdult: 3, items: [
        symptomItem("HYP1", "Autoestima elevada/grandiosidade", "Autoestima inflada ou grandiosidade."),
        symptomItem("HYP2", "Menor necessidade de sono", "Redução da necessidade de sono."),
        symptomItem("HYP3", "Mais falante/pressão de fala", "Fala aumentada ou pressionada."),
        symptomItem("HYP4", "Fuga de ideias", "Pensamentos acelerados ou fuga de ideias."),
        symptomItem("HYP5", "Distratibilidade", "Atenção facilmente desviada."),
        symptomItem("HYP6", "Aumento de atividade/agitação", "Atividade dirigida a objetivos ou agitação."),
        symptomItem("HYP7", "Atividades de risco", "Envolvimento em atividades de risco.")
      ] },
      requiredCriterion("OBS", "Mudança observável", "Mudança clara e observável no funcionamento."),
      requiredCriterion("NOSEV", "Sem gravidade maníaca", "Não há prejuízo marcado, hospitalização ou psicose.", "exclusion"),
      requiredCriterion("SUB", "Exclusão clínica/substâncias", "Não atribuível a substância ou condição médica.", "exclusion")
    ],
    evaluator: "evaluateHypomania"
  },
  {
    id: "gad",
    name: "Transtorno de Ansiedade Generalizada",
    category: "Ansiedade",
    sourceLabel: "DSM-5/DSM-5-TR",
    description: "Checklist resumido para TAG.",
    disclaimer: "Rótulos curtos/parafraseados. Conferir manual oficial.",
    needsAgeGroup: true,
    criteriaGroups: [
      requiredCriterion("WORRY", "Ansiedade/preocupação", "Ansiedade e preocupação excessivas na maior parte dos dias."),
      requiredCriterion("DUR", "Duração", "Duração de pelo menos 6 meses.", "duration"),
      requiredCriterion("CONTROL", "Controle", "Dificuldade de controlar a preocupação."),
      { id: "SYM", title: "Sintomas associados", type: "symptom-count", thresholdAdult: 3, thresholdChild: 1, items: [
        symptomItem("GAD1", "Inquietação", "Inquietação ou sensação de estar no limite."),
        symptomItem("GAD2", "Fadiga", "Cansaço fácil."),
        symptomItem("GAD3", "Concentração", "Dificuldade de concentração ou branco mental."),
        symptomItem("GAD4", "Irritabilidade", "Irritabilidade."),
        symptomItem("GAD5", "Tensão muscular", "Tensão muscular."),
        symptomItem("GAD6", "Sono", "Alteração de sono.")
      ] },
      requiredCriterion("IMP", "Prejuízo/sofrimento", "Sofrimento clinicamente significativo ou prejuízo.", "impairment"),
      requiredCriterion("SUB", "Exclusão clínica/substâncias", "Não atribuível a substância ou condição médica.", "exclusion"),
      requiredCriterion("DIFF", "Diferencial", "Não melhor explicado por outro transtorno.", "exclusion")
    ],
    evaluator: "evaluateGad"
  },
  {
    id: "panic",
    name: "Transtorno de Pânico",
    category: "Ansiedade",
    sourceLabel: "DSM-5/DSM-5-TR",
    description: "Checklist resumido para transtorno de pânico.",
    disclaimer: "Rótulos curtos/parafraseados. Conferir manual oficial.",
    criteriaGroups: [
      requiredCriterion("ATTACKS", "Ataques inesperados", "Ataques de pânico recorrentes e inesperados."),
      { id: "PANICSYM", title: "Sintomas de ataque de pânico", type: "symptom-count", thresholdAdult: 4, items: [
        symptomItem("PAN1", "Palpitações", "Palpitações ou taquicardia."),
        symptomItem("PAN2", "Sudorese", "Sudorese."),
        symptomItem("PAN3", "Tremores", "Tremores."),
        symptomItem("PAN4", "Falta de ar", "Sensação de falta de ar."),
        symptomItem("PAN5", "Asfixia", "Sensação de asfixia."),
        symptomItem("PAN6", "Dor/desconforto torácico", "Desconforto no peito."),
        symptomItem("PAN7", "Náusea/desconforto abdominal", "Náusea ou desconforto abdominal."),
        symptomItem("PAN8", "Tontura", "Tontura ou instabilidade."),
        symptomItem("PAN9", "Calafrios/calor", "Calafrios ou ondas de calor."),
        symptomItem("PAN10", "Parestesias", "Dormência ou formigamento."),
        symptomItem("PAN11", "Desrealização/despersonalização", "Sensação de irrealidade ou distanciamento."),
        symptomItem("PAN12", "Medo de perder controle", "Medo de perder controle ou enlouquecer."),
        symptomItem("PAN13", "Medo de morrer", "Medo de morrer.")
      ] },
      { id: "FOLLOW", title: "Seguimento por 1 mês", type: "any-of", items: [
        symptomItem("CONCERN", "Preocupação persistente", "Preocupação persistente com novos ataques/consequências."),
        symptomItem("MALADAPT", "Mudança comportamental", "Mudança mal-adaptativa relacionada aos ataques.")
      ] },
      requiredCriterion("SUB", "Exclusão clínica/substâncias", "Não atribuível a substância ou condição médica.", "exclusion"),
      requiredCriterion("DIFF", "Diferencial", "Não melhor explicado por outro transtorno.", "exclusion")
    ],
    evaluator: "evaluatePanicDisorder"
  },
  {
    id: "ocd",
    name: "TOC",
    category: "Obsessivo-compulsivos",
    sourceLabel: "DSM-5/DSM-5-TR",
    description: "Checklist resumido para transtorno obsessivo-compulsivo.",
    disclaimer: "Rótulos curtos/parafraseados. Conferir manual oficial.",
    criteriaGroups: [
      { id: "OC", title: "Obsessões/compulsões", type: "any-of", items: [
        symptomItem("OBS", "Obsessões", "Pensamentos, impulsos ou imagens intrusivos e indesejados."),
        symptomItem("COMP", "Compulsões", "Comportamentos ou atos mentais repetitivos.")
      ] },
      requiredCriterion("TIME", "Tempo/prejuízo", "Consome tempo ou causa sofrimento/prejuízo clinicamente significativo.", "impairment"),
      requiredCriterion("SUB", "Exclusão clínica/substâncias", "Não atribuível a substância ou condição médica.", "exclusion"),
      requiredCriterion("DIFF", "Diferencial", "Não melhor explicado por outro transtorno.", "exclusion"),
      { id: "INSIGHT", title: "Insight", type: "optional", items: [
        symptomItem("GOOD", "Insight bom/razoável", "Opcional."),
        symptomItem("POOR", "Insight pobre", "Opcional."),
        symptomItem("ABSENT", "Insight ausente/delirante", "Opcional.")
      ] }
    ],
    evaluator: "evaluateOcd"
  },
  {
    id: "ptsd",
    name: "TEPT",
    category: "Trauma/estresse",
    sourceLabel: "DSM-5/DSM-5-TR",
    description: "Checklist resumido para transtorno de estresse pós-traumático.",
    disclaimer: "Rótulos curtos/parafraseados. Conferir manual oficial.",
    criteriaGroups: [
      requiredCriterion("TRAUMA", "Exposição a trauma", "Exposição a evento traumático relevante."),
      { id: "INTRUSION", title: "Intrusão", type: "symptom-count", thresholdAdult: 1, items: [
        symptomItem("PTSD1", "Memórias intrusivas", "Recordações intrusivas."),
        symptomItem("PTSD2", "Pesadelos", "Sonhos angustiantes relacionados."),
        symptomItem("PTSD3", "Reações dissociativas", "Flashbacks ou reações dissociativas."),
        symptomItem("PTSD4", "Sofrimento por pistas", "Sofrimento intenso diante de pistas."),
        symptomItem("PTSD5", "Reatividade fisiológica", "Reação fisiológica a pistas.")
      ] },
      { id: "AVOID", title: "Evitação", type: "symptom-count", thresholdAdult: 1, items: [
        symptomItem("PTSD6", "Evita memórias/sentimentos", "Evitação interna."),
        symptomItem("PTSD7", "Evita pistas externas", "Evitação de pessoas, locais ou situações.")
      ] },
      { id: "NEGATIVE", title: "Cognição/humor negativos", type: "symptom-count", thresholdAdult: 2, items: [
        symptomItem("PTSD8", "Amnésia dissociativa", "Lacunas de memória relacionadas."),
        symptomItem("PTSD9", "Crenças negativas", "Crenças negativas persistentes."),
        symptomItem("PTSD10", "Culpa distorcida", "Culpa persistente sobre causa/consequências."),
        symptomItem("PTSD11", "Estado emocional negativo", "Medo, culpa, vergonha ou raiva persistente."),
        symptomItem("PTSD12", "Interesse reduzido", "Interesse diminuído."),
        symptomItem("PTSD13", "Distanciamento", "Distanciamento dos outros."),
        symptomItem("PTSD14", "Afeto positivo reduzido", "Dificuldade de sentir emoções positivas.")
      ] },
      { id: "AROUSAL", title: "Excitação/reatividade", type: "symptom-count", thresholdAdult: 2, items: [
        symptomItem("PTSD15", "Irritabilidade/agressividade", "Irritabilidade ou explosões."),
        symptomItem("PTSD16", "Comportamento de risco", "Comportamento imprudente ou autodestrutivo."),
        symptomItem("PTSD17", "Hipervigilância", "Hipervigilância."),
        symptomItem("PTSD18", "Sobressalto", "Resposta de sobressalto exagerada."),
        symptomItem("PTSD19", "Concentração", "Problemas de concentração."),
        symptomItem("PTSD20", "Sono", "Alteração de sono.")
      ] },
      requiredCriterion("DUR", "Duração", "Duração superior a 1 mês.", "duration"),
      requiredCriterion("IMP", "Prejuízo/sofrimento", "Sofrimento clinicamente significativo ou prejuízo.", "impairment"),
      requiredCriterion("SUB", "Exclusão clínica/substâncias", "Não atribuível a substância ou condição médica.", "exclusion")
    ],
    evaluator: "evaluatePtsd"
  },
  {
    id: "schizophrenia",
    name: "Esquizofrenia",
    category: "Psicóticos",
    sourceLabel: "DSM-5/DSM-5-TR",
    description: "Checklist resumido para esquizofrenia.",
    disclaimer: "Rótulos curtos/parafraseados. Conferir manual oficial.",
    criteriaGroups: [
      { id: "A", title: "Critério A — Sintomas psicóticos", type: "symptom-count", thresholdAdult: 2, items: [
        symptomItem("DEL", "Delírios", "Delírios."),
        symptomItem("HAL", "Alucinações", "Alucinações."),
        symptomItem("DISORG_SPEECH", "Discurso desorganizado", "Discurso desorganizado."),
        symptomItem("DISORG_BEHAV", "Comportamento desorganizado/catatônico", "Comportamento grosseiramente desorganizado ou catatônico."),
        symptomItem("NEG", "Sintomas negativos", "Sintomas negativos.")
      ], firstThreeRequired: true },
      requiredCriterion("FUNC", "Funcionamento", "Declínio ou prejuízo funcional relevante.", "impairment"),
      requiredCriterion("ACTIVE", "Duração ativa", "Fase ativa com duração aproximada de 1 mês, salvo tratamento.", "duration"),
      requiredCriterion("CONT", "Duração contínua", "Sinais contínuos por aproximadamente 6 meses.", "duration"),
      requiredCriterion("MOOD_EXCL", "Exclusão humor/esquizoafetivo", "Não melhor explicado por transtorno de humor com sintomas psicóticos ou esquizoafetivo.", "exclusion"),
      requiredCriterion("SUB", "Exclusão clínica/substâncias", "Não atribuível a substância ou condição médica.", "exclusion"),
      requiredCriterion("ASD", "História de TEA/comunicação", "Se houver TEA/comunicação, há delírios ou alucinações proeminentes.", "exclusion")
    ],
    evaluator: "evaluateSchizophrenia"
  },
  {
    id: "substance_use",
    name: "Transtorno por Uso de Substâncias",
    category: "Uso de substâncias",
    sourceLabel: "DSM-5/DSM-5-TR",
    description: "Checklist resumido para transtorno por uso de substâncias.",
    disclaimer: "Rótulos curtos/parafraseados. Conferir manual oficial.",
    extraFields: [{ id: "substanceName", label: "Substância avaliada" }],
    criteriaGroups: [
      { id: "SUD", title: "Critérios em 12 meses", type: "symptom-count", thresholdAdult: 2, items: [
        symptomItem("SUD1", "Uso em maior quantidade/tempo", "Uso maior ou por mais tempo que o pretendido."),
        symptomItem("SUD2", "Desejo/tentativas de reduzir", "Desejo persistente ou tentativas malsucedidas de reduzir."),
        symptomItem("SUD3", "Muito tempo gasto", "Muito tempo para obter, usar ou recuperar-se."),
        symptomItem("SUD4", "Fissura", "Craving ou forte desejo."),
        symptomItem("SUD5", "Falha em papéis", "Falha em obrigações importantes."),
        symptomItem("SUD6", "Uso apesar de problemas sociais", "Continua apesar de problemas interpessoais."),
        symptomItem("SUD7", "Atividades reduzidas", "Abandono/redução de atividades."),
        symptomItem("SUD8", "Uso em situações de risco", "Uso recorrente em situações perigosas."),
        symptomItem("SUD9", "Uso apesar de problema físico/psíquico", "Continua apesar de problema relacionado."),
        symptomItem("SUD10", "Tolerância", "Tolerância."),
        symptomItem("SUD11", "Abstinência", "Abstinência.")
      ] }
    ],
    evaluator: "evaluateSubstanceUseDisorder"
  }
];

function replaceDisorderData(id, updates) {
  const disorder = diagnosticCriteriaData.find((item) => item.id === id);
  if (!disorder) return;
  Object.assign(disorder, updates);
}

function refineInitialDiagnosticData() {
  replaceDisorderData("adhd_dsm5", {
    sourceLabel: "DSM-5 / DSM-5-TR",
    ageGroupOptions: [
      ["adult", "Adulto, 17 anos ou mais"],
      ["child_adolescent", "Criança/adolescente, até 16 anos"]
    ],
    criteriaGroups: [
      {
        id: "ADHD_A",
        title: "Critério A — Sintomas",
        type: "domain-count",
        domains: [
          symptomGroup("inattention", "A. Desatenção", [
            symptomItem("A1", "Erros por descuido/detalhes", "Erros por descuido ou dificuldade com detalhes."),
            symptomItem("A2", "Dificuldade de manter atenção", "Dificuldade de manter atenção em tarefas ou atividades."),
            symptomItem("A3", "Parece não ouvir", "Parece não ouvir quando lhe dirigem a palavra."),
            symptomItem("A4", "Não segue instruções ou não termina tarefas", "Não segue instruções ou não conclui tarefas/obrigações."),
            symptomItem("A5", "Dificuldade de organização", "Dificuldade de organizar tarefas e atividades."),
            symptomItem("A6", "Evita esforço mental sustentado", "Evita ou reluta em tarefas com esforço mental sustentado."),
            symptomItem("A7", "Perde objetos necessários", "Perde objetos necessários para tarefas ou atividades."),
            symptomItem("A8", "Distrai-se facilmente", "Distrai-se facilmente por estímulos externos ou pensamentos."),
            symptomItem("A9", "Esquecimento em atividades diárias", "Esquecimento em atividades cotidianas.")
          ], 5, 6),
          symptomGroup("hyperimpulsive", "B. Hiperatividade/Impulsividade", [
            symptomItem("HI1", "Remexe mãos/pés ou se contorce", "Remexe mãos/pés ou se contorce no assento."),
            symptomItem("HI2", "Levanta-se quando deveria permanecer sentado", "Levanta-se em situações em que deveria permanecer sentado."),
            symptomItem("HI3", "Corre/sobe ou inquietude interna", "Corre/sobe em situações inadequadas ou sente inquietude interna."),
            symptomItem("HI4", "Dificuldade em fazer atividades silenciosamente", "Dificuldade em brincar ou fazer lazer silenciosamente."),
            symptomItem("HI5", "A mil ou ligado a um motor", "Age como se estivesse a mil ou ligado a um motor."),
            symptomItem("HI6", "Fala excessivamente", "Fala excessivamente."),
            symptomItem("HI7", "Responde antes de a pergunta terminar", "Responde antes que a pergunta seja concluída."),
            symptomItem("HI8", "Dificuldade de esperar a vez", "Dificuldade de esperar sua vez."),
            symptomItem("HI9", "Interrompe ou se intromete", "Interrompe ou se intromete em conversas/atividades.")
          ], 5, 6)
        ]
      },
      requiredCriterion("ADHD_B", "Critério B — Início", "Vários sintomas presentes antes dos 12 anos."),
      requiredCriterion("ADHD_C", "Critério C — Contextos", "Sintomas presentes em 2 ou mais contextos."),
      requiredCriterion("ADHD_D", "Critério D — Prejuízo", "Evidência de prejuízo funcional ou redução da qualidade do funcionamento."),
      requiredCriterion("ADHD_E", "Critério E — Exclusão/diferencial", "Sintomas não ocorrem exclusivamente durante transtorno psicótico e não são melhor explicados por outro transtorno/condição.", "required-negative")
    ]
  });

  replaceDisorderData("mde", {
    id: "major_depressive_episode_dsm5",
    sourceLabel: "DSM-5 / DSM-5-TR",
    description: "Checklist resumido para episódio depressivo maior. Avalia episódio, não conclui automaticamente transtorno depressivo maior.",
    severityOptions: ["Não informada", "Leve", "Moderada", "Grave", "Com características psicóticas"],
    criteriaGroups: [
      { id: "DEP_SYM", title: "Sintomas — 9", type: "symptom-count", thresholdAdult: 5, items: [
        symptomItem("D1", "Humor deprimido", "Humor deprimido na maior parte do período avaliado."),
        symptomItem("D2", "Perda de interesse ou prazer / anedonia", "Perda de interesse ou prazer."),
        symptomItem("D3", "Alteração significativa de peso ou apetite", "Alteração significativa de peso ou apetite."),
        symptomItem("D4", "Insônia ou hipersonia", "Insônia ou hipersonia."),
        symptomItem("D5", "Agitação ou lentificação psicomotora observável", "Agitação ou lentificação psicomotora observável."),
        symptomItem("D6", "Fadiga ou perda de energia", "Fadiga ou perda de energia."),
        symptomItem("D7", "Inutilidade ou culpa excessiva/inapropriada", "Sentimentos de inutilidade ou culpa excessiva/inapropriada."),
        symptomItem("D8", "Diminuição da concentração ou indecisão", "Diminuição da concentração ou indecisão."),
        symptomItem("D9", "Pensamentos de morte, ideação suicida ou tentativa", "Pensamentos de morte, ideação suicida ou tentativa.")
      ], gatewayItems: ["D1", "D2"] },
      requiredCriterion("DEP_A", "Critério A — Duração/mudança", "5 ou mais sintomas no mesmo período de 2 semanas, com mudança em relação ao funcionamento prévio.", "duration"),
      requiredCriterion("DEP_C", "Critério C — Prejuízo", "Sofrimento clinicamente significativo ou prejuízo funcional.", "impairment"),
      requiredCriterion("DEP_D", "Critério D — Substância/condição médica", "Não atribuível a substância ou condição médica.", "exclusion"),
      requiredCriterion("DEP_E", "Critério E — Diferencial psicótico", "Não melhor explicado por transtornos psicóticos primários.", "exclusion"),
      { id: "DEP_F", title: "Critério F — História maníaca/hipomaníaca", type: "optional", items: [
        symptomItem("DEP_F", "História de episódio maníaco ou hipomaníaco", "Opcional: se presente, revisar hipótese de espectro bipolar.")
      ] }
    ],
    evaluator: "evaluateMajorDepressiveEpisode"
  });

  replaceDisorderData("mania", {
    id: "manic_episode_dsm5",
    sourceLabel: "DSM-5 / DSM-5-TR",
    extraFields: [{ id: "moodType", label: "Tipo de humor", type: "select", options: ["Elevado/expansivo", "Irritável apenas", "Misto/elevado e irritável", "Não informado"] }],
    criteriaGroups: [
      { id: "MAN_CORE", title: "Critério A — Humor, energia e duração", type: "all-of", items: [
        symptomItem("MAN_A1", "Humor elevado, expansivo ou irritável", "Humor anormal e persistentemente elevado, expansivo ou irritável."),
        symptomItem("MAN_A2", "Energia ou atividade aumentada", "Aumento anormal e persistente de energia ou atividade dirigida a objetivos."),
        symptomItem("MAN_A3", "Duração de pelo menos 1 semana", "Presente a maior parte do dia, quase todos os dias, por pelo menos 1 semana."),
        symptomItem("MAN_A4", "Hospitalização em qualquer duração", "Qualquer duração se hospitalização foi necessária.")
      ] },
      { id: "MAN_SYM", title: "Sintomas B — 7", type: "symptom-count", thresholdAdult: 3, items: [
        symptomItem("M1", "Autoestima inflada ou grandiosidade", "Autoestima inflada ou grandiosidade."),
        symptomItem("M2", "Necessidade reduzida de sono", "Necessidade reduzida de sono."),
        symptomItem("M3", "Mais falante ou pressão para falar", "Mais falante que o habitual ou pressão para falar."),
        symptomItem("M4", "Fuga de ideias ou pensamentos acelerados", "Fuga de ideias ou pensamentos acelerados."),
        symptomItem("M5", "Distratibilidade", "Distratibilidade."),
        symptomItem("M6", "Aumento de atividade ou agitação", "Aumento de atividade dirigida a objetivos ou agitação psicomotora."),
        symptomItem("M7", "Atividades de risco", "Envolvimento excessivo em atividades de risco.")
      ] },
      { id: "MAN_C", title: "Critério C — Gravidade", type: "any-of", items: [
        symptomItem("MAN_C1", "Prejuízo funcional marcado", "Prejuízo funcional marcado."),
        symptomItem("MAN_C2", "Hospitalização necessária", "Hospitalização necessária."),
        symptomItem("MAN_C3", "Sintomas psicóticos", "Sintomas psicóticos.")
      ] },
      requiredCriterion("MAN_D", "Critério D — Exclusão", "Não atribuível a substância, medicação ou condição médica.", "exclusion")
    ],
    evaluator: "evaluateManicEpisode"
  });

  replaceDisorderData("hypomania", {
    id: "hypomanic_episode_dsm5",
    sourceLabel: "DSM-5 / DSM-5-TR",
    extraFields: [{ id: "moodType", label: "Tipo de humor", type: "select", options: ["Elevado/expansivo", "Irritável apenas", "Misto/elevado e irritável", "Não informado"] }],
    criteriaGroups: [
      { id: "HYP_CORE", title: "Critério A — Humor, energia e duração", type: "all-of", items: [
        symptomItem("H1", "Humor elevado, expansivo ou irritável", "Humor anormal e persistentemente elevado, expansivo ou irritável."),
        symptomItem("H2", "Energia ou atividade aumentada", "Aumento anormal e persistente de energia ou atividade."),
        symptomItem("H3", "Duração de pelo menos 4 dias", "Duração de pelo menos 4 dias consecutivos, a maior parte do dia.")
      ] },
      { id: "HYP_SYM", title: "Sintomas B — 7", type: "symptom-count", thresholdAdult: 3, items: [
        symptomItem("HM1", "Autoestima inflada ou grandiosidade", "Autoestima inflada ou grandiosidade."),
        symptomItem("HM2", "Necessidade reduzida de sono", "Necessidade reduzida de sono."),
        symptomItem("HM3", "Mais falante ou pressão para falar", "Mais falante que o habitual ou pressão para falar."),
        symptomItem("HM4", "Fuga de ideias ou pensamentos acelerados", "Fuga de ideias ou pensamentos acelerados."),
        symptomItem("HM5", "Distratibilidade", "Distratibilidade."),
        symptomItem("HM6", "Aumento de atividade ou agitação", "Aumento de atividade dirigida a objetivos ou agitação psicomotora."),
        symptomItem("HM7", "Atividades de risco", "Envolvimento excessivo em atividades de risco.")
      ] },
      requiredCriterion("HYP_C", "Critério C — Mudança no funcionamento", "Mudança inequívoca no funcionamento, diferente do habitual."),
      requiredCriterion("HYP_D", "Critério D — Observável por terceiros", "Alteração observável por terceiros."),
      requiredCriterion("HYP_E", "Critério E — Sem prejuízo marcado", "Não há prejuízo funcional marcado.", "exclusion"),
      requiredCriterion("HYP_F", "Critério F — Sem hospitalização", "Não houve necessidade de hospitalização.", "exclusion"),
      requiredCriterion("HYP_G", "Critério G — Sem psicose", "Não há sintomas psicóticos.", "exclusion"),
      requiredCriterion("HYP_H", "Critério H — Exclusão", "Não atribuível a substância, medicação ou condição médica.", "exclusion")
    ],
    evaluator: "evaluateHypomanicEpisode"
  });

  replaceDisorderData("gad", {
    id: "gad_dsm5",
    sourceLabel: "DSM-5 / DSM-5-TR",
    ageGroupOptions: [
      ["adult", "Adulto"],
      ["child_adolescent", "Criança/adolescente"]
    ],
    criteriaGroups: [
      requiredCriterion("GAD_A", "Critério A — Preocupação", "Ansiedade e preocupação excessivas, na maioria dos dias, por pelo menos 6 meses, sobre diversos eventos ou atividades.", "duration"),
      requiredCriterion("GAD_B", "Critério B — Controle", "Dificuldade em controlar a preocupação."),
      { id: "GAD_C", title: "Critério C — Sintomas associados", type: "symptom-count", thresholdAdult: 3, thresholdChild: 1, items: [
        symptomItem("GAD_C1", "Inquietação ou sensação de estar no limite", "Inquietação ou sensação de estar no limite."),
        symptomItem("GAD_C2", "Fadiga fácil", "Fadiga fácil."),
        symptomItem("GAD_C3", "Dificuldade de concentração ou branco", "Dificuldade de concentração ou branco mental."),
        symptomItem("GAD_C4", "Irritabilidade", "Irritabilidade."),
        symptomItem("GAD_C5", "Tensão muscular", "Tensão muscular."),
        symptomItem("GAD_C6", "Alteração do sono", "Alteração do sono.")
      ] },
      requiredCriterion("GAD_D", "Critério D — Prejuízo", "Sofrimento clinicamente significativo ou prejuízo funcional.", "impairment"),
      requiredCriterion("GAD_E", "Critério E — Substância/condição médica", "Não atribuível a substância, medicação ou condição médica.", "exclusion"),
      requiredCriterion("GAD_F", "Critério F — Diferencial", "Não melhor explicado por outro transtorno mental.", "exclusion")
    ],
    evaluator: "evaluateGad"
  });
}

refineInitialDiagnosticData();

const diagnosticDate = document.querySelector("#diagnostic-date");
const diagnosticSearch = document.querySelector("#diagnostic-search");
const diagnosticCategory = document.querySelector("#diagnostic-category");
const diagnosticDisorder = document.querySelector("#diagnostic-disorder");
const diagnosticForm = document.querySelector("#diagnostic-form");
const diagnosticSelectedHeader = document.querySelector("#diagnostic-selected-header");
const diagnosticCriteriaArea = document.querySelector("#diagnostic-criteria-area");
const diagnosticProgress = document.querySelector("#diagnostic-progress");
const diagnosticClinicalNotes = document.querySelector("#diagnostic-clinical-notes");
const diagnosticClearButton = document.querySelector("#diagnostic-clear-button");
const diagnosticResultArea = document.querySelector("#diagnostic-result-area");
const diagnosticResultList = document.querySelector("#diagnostic-result-list");
const diagnosticLineOutput = document.querySelector("#diagnostic-line-output");
const diagnosticFullOutput = document.querySelector("#diagnostic-full-output");
const diagnosticCopyFeedback = document.querySelector("#diagnostic-copy-feedback");

let diagnosticCriteriaState = createDiagnosticCriteriaState();
let diagnosticMissingKeys = new Set();

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function createDiagnosticCriteriaState(selectedDisorderId = null) {
  return {
    selectedDisorderId,
    date: todayISO(),
    ageGroup: "adult",
    answers: {},
    specifiers: {},
    severity: null,
    clinicalNotes: ""
  };
}

function formatDateBR(isoDate) {
  const [year, month, day] = String(isoDate || "").split("-");
  return day && month && year ? `${day}/${month}/${year}` : "";
}

function getSelectedDisorder() {
  return diagnosticCriteriaData.find((disorder) => disorder.id === diagnosticCriteriaState.selectedDisorderId) || null;
}

function getAnswer(itemId) {
  if (!diagnosticCriteriaState.answers[itemId]) {
    diagnosticCriteriaState.answers[itemId] = { status: null, note: "" };
  }
  return diagnosticCriteriaState.answers[itemId];
}

function getAllItems(disorder) {
  const items = [];
  disorder.criteriaGroups.forEach((group) => {
    if (group.type === "domain-count") {
      group.domains.forEach((domain) => items.push(...domain.items));
      return;
    }
    items.push(...(group.items || []));
  });
  return items;
}

function getRequiredItems(disorder) {
  const items = [];
  disorder.criteriaGroups.forEach((group) => {
    if (group.type === "optional") {
      return;
    }
    if (group.type === "domain-count") {
      group.domains.forEach((domain) => items.push(...domain.items));
      return;
    }
    items.push(...(group.items || []));
  });
  return items;
}

function renderDisorderList() {
  const search = diagnosticSearch.value.trim().toLowerCase();
  const category = diagnosticCategory.value;
  const current = diagnosticCriteriaState.selectedDisorderId;
  diagnosticDisorder.innerHTML = '<option value="">Selecione um transtorno</option>';

  diagnosticCriteriaData
    .filter((disorder) => category === "Todos" || disorder.category === category)
    .filter((disorder) => !search || disorder.name.toLowerCase().includes(search))
    .forEach((disorder) => {
      const option = document.createElement("option");
      option.value = disorder.id;
      option.textContent = `${disorder.name} (${disorder.category})`;
      option.selected = disorder.id === current;
      diagnosticDisorder.appendChild(option);
    });
}

function initDiagnosticCriteriaPage() {
  diagnosticDate.value = diagnosticCriteriaState.date;
  renderDisorderList();

  diagnosticSearch.addEventListener("input", renderDisorderList);
  diagnosticCategory.addEventListener("change", renderDisorderList);
  diagnosticDate.addEventListener("change", (event) => {
    diagnosticCriteriaState.date = event.target.value;
  });

  diagnosticDisorder.addEventListener("change", () => {
    diagnosticCriteriaState = createDiagnosticCriteriaState(diagnosticDisorder.value || null);
    diagnosticCriteriaState.date = diagnosticDate.value || todayISO();
    diagnosticMissingKeys.clear();
    diagnosticResultArea.classList.add("hidden");
    renderDiagnosticCriteriaPage();
  });

  diagnosticForm.addEventListener("change", updateDiagnosticAnswer);
  diagnosticForm.addEventListener("input", updateDiagnosticAnswer);
  diagnosticForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = evaluateSelectedDisorder();
    renderDiagnosticResult(result);
  });

  diagnosticClearButton.addEventListener("click", clearDiagnosticCriteriaState);
  diagnosticResultArea.addEventListener("click", handleDiagnosticCopy);
}

function renderDiagnosticCriteriaPage() {
  const disorder = getSelectedDisorder();
  diagnosticDate.value = diagnosticCriteriaState.date;
  diagnosticDisorder.value = diagnosticCriteriaState.selectedDisorderId || "";

  if (!disorder) {
    diagnosticForm.classList.add("hidden");
    diagnosticCriteriaArea.innerHTML = "";
    diagnosticSelectedHeader.innerHTML = "";
    return;
  }

  diagnosticForm.classList.remove("hidden");
  diagnosticSelectedHeader.innerHTML = "";
  diagnosticCriteriaArea.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = disorder.name;
  const meta = document.createElement("p");
  meta.className = "diagnostic-meta";
  meta.textContent = `${disorder.sourceLabel} — ${disorder.description}`;
  const disclaimer = document.createElement("p");
  disclaimer.className = "diagnostic-warning";
  disclaimer.textContent = disorder.disclaimer;
  diagnosticSelectedHeader.append(title, meta, disclaimer);

  if (disorder.needsAgeGroup) {
    diagnosticSelectedHeader.appendChild(renderAgeGroupSelector());
  }

  if (disorder.extraFields) {
    disorder.extraFields.forEach((field) => diagnosticSelectedHeader.appendChild(renderExtraField(field)));
  }

  if (disorder.severityOptions) {
    diagnosticSelectedHeader.appendChild(
      renderExtraField({ id: "severity", label: "Gravidade selecionada pelo clínico", type: "select", options: disorder.severityOptions })
    );
  }

  disorder.criteriaGroups.forEach((group) => diagnosticCriteriaArea.appendChild(renderCriteriaGroup(group)));
  diagnosticClinicalNotes.value = diagnosticCriteriaState.clinicalNotes;
  updateDiagnosticProgress();
}

function renderAgeGroupSelector() {
  const disorder = getSelectedDisorder();
  const label = document.createElement("label");
  label.className = "field-label diagnostic-age-row";
  label.textContent = "Faixa etária para pontos de corte";
  const select = document.createElement("select");
  select.dataset.diagnosticField = "ageGroup";
  const options = disorder.ageGroupOptions || [
    ["adult", "Adulto"],
    ["child_adolescent", "Criança/adolescente"],
    ["unspecified", "Não especificada"]
  ];
  options.forEach(([value, text]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    option.selected = diagnosticCriteriaState.ageGroup === value;
    select.appendChild(option);
  });
  label.appendChild(select);
  return label;
}

function renderExtraField(field) {
  if (field.type === "select") {
    const label = document.createElement("label");
    label.className = "field-label diagnostic-extra-field";
    label.textContent = field.label;
    const select = document.createElement("select");
    const currentValue = field.id === "severity" ? diagnosticCriteriaState.severity : diagnosticCriteriaState.specifiers[field.id];
    if (!currentValue && field.options && field.options.length) {
      if (field.id === "severity") {
        diagnosticCriteriaState.severity = field.options[0];
      }
    }
    if (!diagnosticCriteriaState.specifiers[field.id] && field.id !== "severity" && field.options && field.options.length) {
      diagnosticCriteriaState.specifiers[field.id] = field.options[0];
    }
    (field.options || []).forEach((optionText) => {
      const option = document.createElement("option");
      option.value = optionText;
      option.textContent = optionText;
      option.selected = (field.id === "severity" ? diagnosticCriteriaState.severity : diagnosticCriteriaState.specifiers[field.id]) === optionText;
      select.appendChild(option);
    });
    select.dataset.diagnosticField = "specifier";
    select.dataset.specifierId = field.id;
    label.appendChild(select);
    return label;
  }

  const label = document.createElement("label");
  label.className = "field-label diagnostic-extra-field";
  label.textContent = field.label;
  const input = document.createElement("input");
  input.type = "text";
  input.value = diagnosticCriteriaState.specifiers[field.id] || "";
  input.dataset.diagnosticField = "specifier";
  input.dataset.specifierId = field.id;
  label.appendChild(input);
  return label;
}

function renderCriteriaGroup(group) {
  const details = document.createElement("details");
  details.className = `diagnostic-criteria-group${diagnosticMissingKeys.has(group.id) ? " diagnostic-incomplete" : ""}`;
  details.open = true;
  details.dataset.groupId = group.id;

  const summary = document.createElement("summary");
  summary.textContent = group.title;
  details.appendChild(summary);

  if (group.type === "domain-count") {
    group.domains.forEach((domain) => details.appendChild(renderSymptomDomain(group, domain)));
  } else {
    if (group.type === "symptom-count") {
      details.appendChild(renderLiveCount(group, group.items));
    }
    (group.items || []).forEach((item) => details.appendChild(renderCriterionItem(item, group)));
  }

  return details;
}

function renderSymptomDomain(group, domain) {
  const section = document.createElement("section");
  section.className = "diagnostic-domain";
  section.dataset.domainId = domain.id;
  const title = document.createElement("h3");
  title.textContent = domain.title;
  section.appendChild(title);
  section.appendChild(renderLiveCount(domain, domain.items));
  domain.items.forEach((item) => section.appendChild(renderCriterionItem(item, group)));
  return section;
}

function renderLiveCount(groupOrDomain, items) {
  const present = items.filter((item) => getAnswer(item.id).status === "present").length;
  const threshold = getThreshold(groupOrDomain);
  const counter = document.createElement("p");
  counter.className = "diagnostic-live-count";
  counter.textContent = `Presentes ${present}/${items.length}${threshold ? ` — Necessários: ${threshold}` : ""}`;
  return counter;
}

function renderCriterionItem(item, group) {
  const article = document.createElement("article");
  const missing = diagnosticMissingKeys.has(item.id);
  article.className = `diagnostic-criterion-item${missing ? " diagnostic-incomplete" : ""}`;
  article.dataset.itemId = item.id;

  const header = document.createElement("div");
  header.className = "diagnostic-item-header";
  const code = document.createElement("span");
  code.className = "diagnostic-code";
  code.textContent = item.id;
  const title = document.createElement("strong");
  title.textContent = item.label;
  header.append(code, title);

  const text = document.createElement("p");
  text.textContent = item.shortText || item.label;

  const options = document.createElement("div");
  options.className = "diagnostic-status-options";
  [
    ["present", "Presente"],
    ["absent", "Ausente"],
    ["not_evaluated", "Não avaliado"]
  ].forEach(([value, labelText]) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = `criterion-${item.id}`;
    input.value = value;
    input.checked = getAnswer(item.id).status === value;
    input.dataset.diagnosticField = "answerStatus";
    input.dataset.itemId = item.id;
    input.dataset.groupId = group.id;
    label.append(input, document.createTextNode(labelText));
    options.appendChild(label);
  });

  const noteLabel = document.createElement("label");
  noteLabel.className = "field-label diagnostic-item-note";
  noteLabel.textContent = "Nota opcional";
  const note = document.createElement("textarea");
  note.value = getAnswer(item.id).note;
  note.dataset.diagnosticField = "answerNote";
  note.dataset.itemId = item.id;
  noteLabel.appendChild(note);

  article.append(header, text, options, noteLabel);
  return article;
}

function updateDiagnosticAnswer(event) {
  const target = event.target;
  const field = target.dataset.diagnosticField;
  if (!field) return;

  if (field === "ageGroup") {
    diagnosticCriteriaState.ageGroup = target.value;
    renderDiagnosticCriteriaPage();
    return;
  }

  if (field === "specifier") {
    if (target.dataset.specifierId === "severity") {
      diagnosticCriteriaState.severity = target.value;
    } else {
      diagnosticCriteriaState.specifiers[target.dataset.specifierId] = target.value;
    }
    return;
  }

  if (field === "clinicalNotes") {
    diagnosticCriteriaState.clinicalNotes = target.value;
    return;
  }

  const answer = getAnswer(target.dataset.itemId);
  if (field === "answerStatus") {
    answer.status = target.value;
    diagnosticMissingKeys.delete(target.dataset.itemId);
    diagnosticMissingKeys.delete(target.dataset.groupId);
    updateDiagnosticProgress();
    return;
  }

  if (field === "answerNote") {
    answer.note = target.value;
  }
}

function getThreshold(groupOrDomain) {
  if ((groupOrDomain.id === "MAN_SYM" || groupOrDomain.id === "HYP_SYM") && diagnosticCriteriaState.specifiers.moodType === "Irritável apenas") {
    return 4;
  }
  if (diagnosticCriteriaState.ageGroup === "child_adolescent" && groupOrDomain.thresholdChild) {
    return groupOrDomain.thresholdChild;
  }
  return groupOrDomain.thresholdAdult || groupOrDomain.thresholdChild || 0;
}

function evaluateSelectedDisorder() {
  const disorder = getSelectedDisorder();
  if (!disorder) return null;
  const evaluator = diagnosticEvaluators[disorder.evaluator] || evaluateGenericDisorder;
  const result = evaluator(disorder, diagnosticCriteriaState);
  diagnosticMissingKeys = new Set([...result.missingItemIds, ...result.missingGroupIds]);
  renderDiagnosticCriteriaPage();
  result.line = buildDiagnosticProntuarioLine(result);
  result.fullSummary = buildDiagnosticFullSummary(result);
  return result;
}

function evaluateGenericDisorder(disorder) {
  const result = createBaseResult(disorder);
  disorder.criteriaGroups.forEach((group) => evaluateGroup(group, result));
  finalizeResult(result);
  return result;
}

function createBaseResult(disorder) {
  return {
    disorder,
    status: "Critérios não preenchidos",
    met: [],
    missing: [],
    missingItemIds: [],
    missingGroupIds: [],
    counts: [],
    warnings: [
      "Resultado depende de exclusão de causas clínicas, substâncias e diagnóstico diferencial.",
      "Ferramenta de apoio; confirmar com avaliação clínica."
    ],
    specifier: "",
    severity: "",
    presentation: ""
  };
}

function itemStatus(itemId) {
  return getAnswer(itemId).status;
}

function getCriterionStatus(id) {
  return itemStatus(id);
}

function isPresent(id) {
  return getCriterionStatus(id) === "present";
}

function isAbsent(id) {
  return getCriterionStatus(id) === "absent";
}

function isNotEvaluated(id) {
  const status = getCriterionStatus(id);
  return status === null || status === "not_evaluated";
}

function countPresent(ids) {
  return ids.filter((id) => isPresent(id)).length;
}

function hasAnyNotEvaluated(ids) {
  return ids.some((id) => isNotEvaluated(id));
}

function formatYesNoUnknown(value) {
  if (value === true || value === "present") return "sim";
  if (value === false || value === "absent") return "não";
  return "não avaliado";
}

function statusToLabel(status) {
  if (status === "fulfilled") return "Critérios preenchidos";
  if (status === "insufficient") return "Avaliação insuficiente";
  return "Critérios não preenchidos";
}

function createStandardResult(disorder) {
  return {
    disorder,
    disorderId: disorder.id,
    disorderName: disorder.name,
    date: diagnosticCriteriaState.date,
    status: "not_fulfilled",
    statusLabel: "Critérios não preenchidos",
    counts: {},
    thresholds: {},
    metCriteria: [],
    missingCriteria: [],
    notEvaluatedCriteria: [],
    warnings: [
      "Resultado depende de exclusão de causas clínicas, substâncias e diagnóstico diferencial.",
      "Ferramenta de apoio; confirmar com avaliação clínica."
    ],
    specifiers: {},
    severity: diagnosticCriteriaState.severity || "",
    presentation: "",
    missingItemIds: [],
    missingGroupIds: [],
    met: [],
    missing: []
  };
}

function syncStandardResultAliases(result) {
  result.statusLabel = statusToLabel(result.status);
  result.met = result.metCriteria;
  result.missing = [...result.missingCriteria, ...result.notEvaluatedCriteria.map((item) => `${item}: não avaliado`)];
  return result;
}

function setStandardStatus(result, fulfilled, mandatoryIds) {
  const anyUnknown = hasAnyNotEvaluated(mandatoryIds);
  mandatoryIds.forEach((id) => {
    if (isNotEvaluated(id) && !result.notEvaluatedCriteria.includes(id)) {
      result.notEvaluatedCriteria.push(id);
      result.missingItemIds.push(id);
    }
  });
  if (anyUnknown) {
    result.status = "insufficient";
    result.warnings.unshift("Há critérios não avaliados.");
  } else {
    result.status = fulfilled ? "fulfilled" : "not_fulfilled";
  }
  return syncStandardResultAliases(result);
}

function addRequirement(result, id, label, passes) {
  if (isNotEvaluated(id)) {
    result.notEvaluatedCriteria.push(label);
    result.missingItemIds.push(id);
    return;
  }
  if (passes) {
    result.metCriteria.push(label);
    return;
  }
  result.missingCriteria.push(label);
  result.missingItemIds.push(id);
}

function evaluateGroup(group, result) {
  if (group.type === "optional") {
    return { pass: true, unknown: false };
  }
  if (group.type === "domain-count") {
    const domainResults = group.domains.map((domain) => evaluateSymptomCount(domain, result));
    const pass = domainResults.some((domainResult) => domainResult.pass);
    const unknownCouldPass = domainResults.some((domainResult) => domainResult.unknownCouldPass);
    if (pass) {
      result.met.push(group.title);
      return { pass: true, unknown: false };
    }
    result.missing.push(`${group.title}: ponto de corte não atingido`);
    result.missingGroupIds.push(group.id);
    return { pass: false, unknown: unknownCouldPass };
  }
  if (group.type === "symptom-count") {
    const groupResult = evaluateSymptomCount(group, result);
    if (groupResult.pass) result.met.push(group.title);
    else {
      result.missing.push(`${group.title}: ponto de corte não atingido`);
      result.missingGroupIds.push(group.id);
    }
    return { pass: groupResult.pass, unknown: groupResult.unknownCouldPass };
  }
  if (group.type === "any-of") {
    const statuses = group.items.map((item) => itemStatus(item.id));
    const pass = statuses.includes("present");
    const unknown = statuses.some((status) => status === null || status === "not_evaluated");
    if (pass) result.met.push(group.title);
    else {
      result.missing.push(`${group.title}: nenhum item presente`);
      result.missingGroupIds.push(group.id);
    }
    return { pass, unknown };
  }
  const item = group.items[0];
  const status = itemStatus(item.id);
  const pass = status === "present";
  const unknown = status === null || status === "not_evaluated";
  if (pass) result.met.push(group.title);
  else {
    result.missing.push(`${group.title}: ${unknown ? "não avaliado" : "ausente"}`);
    result.missingItemIds.push(item.id);
    result.missingGroupIds.push(group.id);
  }
  return { pass, unknown };
}

function evaluateSymptomCount(groupOrDomain, result) {
  const items = groupOrDomain.items || [];
  const present = items.filter((item) => itemStatus(item.id) === "present").length;
  const unknown = items.filter((item) => {
    const status = itemStatus(item.id);
    return status === null || status === "not_evaluated";
  }).length;
  const threshold = getThreshold(groupOrDomain);
  const pass = present >= threshold;
  const unknownCouldPass = !pass && present + unknown >= threshold;
  result.counts.push(`${groupOrDomain.title}: ${present}/${items.length}; necessários ${threshold}`);
  return { present, unknown, threshold, pass, unknownCouldPass };
}

function finalizeResult(result, anyUnknown = null, allPass = null) {
  const hasUnknown =
    anyUnknown !== null
      ? anyUnknown
      : result.missing.some((item) => item.includes("não avaliado")) || result.missingGroupIds.length > 0 && result.counts.length > 0;
  const pass = allPass !== null ? allPass : result.missing.length === 0;
  if (hasUnknown && !pass) {
    result.status = "Avaliação insuficiente";
    result.warnings.unshift("Há critérios não avaliados.");
    return;
  }
  result.status = pass ? "Critérios preenchidos" : "Critérios não preenchidos";
}

function evaluateAllGroups(disorder, result) {
  let allPass = true;
  let anyUnknown = false;
  disorder.criteriaGroups.forEach((group) => {
    const groupResult = evaluateGroup(group, result);
    if (!groupResult.pass && group.type !== "optional") allPass = false;
    if (groupResult.unknown) anyUnknown = true;
  });
  return { allPass, anyUnknown };
}

function evaluateAdhd(disorder) {
  const result = createBaseResult(disorder);
  const symptomGroupData = disorder.criteriaGroups[0];
  const domainResults = symptomGroupData.domains.map((domain) => evaluateSymptomCount(domain, result));
  const inattention = domainResults[0];
  const hyper = domainResults[1];
  const symptomPass = inattention.pass || hyper.pass;
  let allPass = symptomPass;
  let anyUnknown = domainResults.some((domainResult) => domainResult.unknownCouldPass);
  if (symptomPass) result.met.push("Critério A — Sintomas");
  else {
    result.missing.push("Critério A — sintomas abaixo do ponto de corte");
    result.missingGroupIds.push("A");
  }
  disorder.criteriaGroups.slice(1).forEach((group) => {
    const groupResult = evaluateGroup(group, result);
    if (!groupResult.pass) allPass = false;
    if (groupResult.unknown) anyUnknown = true;
  });
  if (allPass) {
    if (inattention.pass && hyper.pass) result.presentation = "apresentação combinada";
    else if (inattention.pass) result.presentation = "apresentação predominantemente desatenta";
    else result.presentation = "apresentação predominantemente hiperativa/impulsiva";
  }
  finalizeResult(result, anyUnknown, allPass);
  return result;
}

function evaluateMajorDepressiveEpisode(disorder) {
  const result = createBaseResult(disorder);
  const symptomGroupData = disorder.criteriaGroups[0];
  const count = evaluateSymptomCount(symptomGroupData, result);
  const gateway = symptomGroupData.gatewayItems.some((id) => itemStatus(id) === "present");
  let allPass = count.pass && gateway;
  let anyUnknown = count.unknownCouldPass || symptomGroupData.gatewayItems.some((id) => itemStatus(id) === null || itemStatus(id) === "not_evaluated");
  if (count.pass && gateway) result.met.push("Critério A — sintomas e gateway");
  else result.missing.push("Critério A: requer 5 sintomas e humor deprimido ou anedonia");
  disorder.criteriaGroups.slice(1).forEach((group) => {
    const groupResult = evaluateGroup(group, result);
    if (!groupResult.pass && group.type !== "optional") allPass = false;
    if (groupResult.unknown) anyUnknown = true;
  });
  finalizeResult(result, anyUnknown, allPass);
  return result;
}

function evaluateMania(disorder) {
  return evaluateMoodElevationEpisode(disorder, "MAN_IRR", (result) => {
    if (itemStatus("PSYCH") === "present") result.specifier = "com características psicóticas";
    if (itemStatus("HOSP") === "present") result.specifier = result.specifier ? `${result.specifier}; hospitalização` : "hospitalização";
  });
}

function evaluateHypomania(disorder) {
  return evaluateMoodElevationEpisode(disorder, "HYP_IRR");
}

function evaluateMoodElevationEpisode(disorder, irritableOnlyId, afterEvaluate) {
  const symptomGroupData = disorder.criteriaGroups.find((group) => group.id === "SYM");
  const originalThreshold = symptomGroupData.thresholdAdult;
  symptomGroupData.thresholdAdult = itemStatus(irritableOnlyId) === "present" ? 4 : 3;
  const result = evaluateGenericWithSpecifier(disorder, afterEvaluate);
  symptomGroupData.thresholdAdult = originalThreshold;
  return result;
}

function evaluateGad(disorder) {
  return evaluateGenericWithSpecifier(disorder);
}

function evaluatePanicDisorder(disorder) {
  return evaluateGenericWithSpecifier(disorder);
}

function evaluateOcd(disorder) {
  return evaluateGenericWithSpecifier(disorder, (result) => {
    ["GOOD", "POOR", "ABSENT"].forEach((id) => {
      if (itemStatus(id) === "present") result.specifier = getAnswerLabel(disorder, id);
    });
  });
}

function evaluatePtsd(disorder) {
  return evaluateGenericWithSpecifier(disorder);
}

function evaluateSchizophrenia(disorder) {
  const result = createBaseResult(disorder);
  const criterionA = disorder.criteriaGroups[0];
  const count = evaluateSymptomCount(criterionA, result);
  const firstThree = ["DEL", "HAL", "DISORG_SPEECH"].some((id) => itemStatus(id) === "present");
  let allPass = count.pass && firstThree;
  let anyUnknown = count.unknownCouldPass || ["DEL", "HAL", "DISORG_SPEECH"].some((id) => itemStatus(id) === null || itemStatus(id) === "not_evaluated");
  if (allPass) result.met.push("Critério A — sintomas psicóticos");
  else result.missing.push("Critério A: requer 2 sintomas e pelo menos um dos três primeiros");
  disorder.criteriaGroups.slice(1).forEach((group) => {
    const groupResult = evaluateGroup(group, result);
    if (!groupResult.pass) allPass = false;
    if (groupResult.unknown) anyUnknown = true;
  });
  finalizeResult(result, anyUnknown, allPass);
  return result;
}

function evaluateSubstanceUseDisorder(disorder) {
  const result = createBaseResult(disorder);
  const groupResult = evaluateSymptomCount(disorder.criteriaGroups[0], result);
  const count = groupResult.present;
  const allPass = count >= 2;
  if (allPass) result.met.push("Critérios em 12 meses");
  else result.missing.push("Menos de 2 critérios em 12 meses");
  if (count >= 6) result.severity = "grave";
  else if (count >= 4) result.severity = "moderado";
  else if (count >= 2) result.severity = "leve";
  finalizeResult(result, groupResult.unknownCouldPass, allPass);
  return result;
}

function evaluateGenericWithSpecifier(disorder, afterEvaluate) {
  const result = createBaseResult(disorder);
  const status = evaluateAllGroups(disorder, result);
  if (afterEvaluate) afterEvaluate(result);
  finalizeResult(result, status.anyUnknown, status.allPass);
  return result;
}

function evaluateAdhd(disorder) {
  const result = createStandardResult(disorder);
  const threshold = diagnosticCriteriaState.ageGroup === "child_adolescent" ? 6 : 5;
  const inattentionIds = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"];
  const hyperIds = ["HI1", "HI2", "HI3", "HI4", "HI5", "HI6", "HI7", "HI8", "HI9"];
  const mandatoryIds = [...inattentionIds, ...hyperIds, "ADHD_B", "ADHD_C", "ADHD_D", "ADHD_E"];
  const inattentionCount = countPresent(inattentionIds);
  const hyperImpulsiveCount = countPresent(hyperIds);
  const inattentionPositive = inattentionCount >= threshold;
  const hyperImpulsivePositive = hyperImpulsiveCount >= threshold;
  const symptomCriterionPositive = inattentionPositive || hyperImpulsivePositive;
  const fulfilled =
    symptomCriterionPositive && isPresent("ADHD_B") && isPresent("ADHD_C") && isPresent("ADHD_D") && isPresent("ADHD_E");

  result.counts = { inattention: `${inattentionCount}/9`, hyperImpulsive: `${hyperImpulsiveCount}/9` };
  result.thresholds = { inattention: threshold, hyperImpulsive: threshold };
  if (symptomCriterionPositive) result.metCriteria.push("Critério A — sintomas atuais suficientes");
  else result.missingCriteria.push("Critério A — sintomas abaixo do limiar");
  addRequirement(result, "ADHD_B", "Início antes dos 12 anos", isPresent("ADHD_B"));
  addRequirement(result, "ADHD_C", "Presença em 2 ou mais contextos", isPresent("ADHD_C"));
  addRequirement(result, "ADHD_D", "Prejuízo funcional", isPresent("ADHD_D"));
  addRequirement(result, "ADHD_E", "Diferencial/exclusão", isPresent("ADHD_E"));

  if (fulfilled && inattentionPositive && hyperImpulsivePositive) result.presentation = "Apresentação combinada";
  else if (fulfilled && inattentionPositive) result.presentation = "Apresentação predominantemente desatenta";
  else if (fulfilled && hyperImpulsivePositive) result.presentation = "Apresentação predominantemente hiperativa/impulsiva";
  else result.presentation = "Não aplicável";

  if (symptomCriterionPositive && isAbsent("ADHD_B")) result.warnings.push("Sintomas atuais suficientes, mas início antes dos 12 anos não confirmado.");
  if (symptomCriterionPositive && isAbsent("ADHD_C")) result.warnings.push("Sintomas atuais suficientes, mas presença em múltiplos contextos não confirmada.");
  if (isAbsent("ADHD_E")) result.warnings.push("Sintomas podem ser melhor explicados por outro transtorno/condição.");
  return setStandardStatus(result, fulfilled, mandatoryIds);
}

function evaluateMajorDepressiveEpisode(disorder) {
  const result = createStandardResult(disorder);
  const symptomIds = ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"];
  const mandatoryIds = [...symptomIds, "DEP_A", "DEP_C", "DEP_D", "DEP_E"];
  const symptomCount = countPresent(symptomIds);
  const gatewayPositive = isPresent("D1") || isPresent("D2");
  const fulfilled =
    symptomCount >= 5 && gatewayPositive && isPresent("DEP_A") && isPresent("DEP_C") && isPresent("DEP_D") && isPresent("DEP_E");

  result.counts = { symptoms: `${symptomCount}/9` };
  result.thresholds = { symptoms: 5 };
  if (symptomCount >= 5) result.metCriteria.push("5 ou mais sintomas depressivos");
  else result.missingCriteria.push("Menos de 5 sintomas depressivos");
  if (gatewayPositive) result.metCriteria.push("Humor deprimido ou anedonia");
  else result.missingCriteria.push("Humor deprimido ou anedonia");
  addRequirement(result, "DEP_A", "Duração de 2 semanas/mudança funcional", isPresent("DEP_A"));
  addRequirement(result, "DEP_C", "Prejuízo/sofrimento clinicamente significativo", isPresent("DEP_C"));
  addRequirement(result, "DEP_D", "Exclusão de substância/condição médica", isPresent("DEP_D"));
  addRequirement(result, "DEP_E", "Diferencial psicótico", isPresent("DEP_E"));
  result.severity = diagnosticCriteriaState.severity || "Não informada";
  result.warnings.push("Se houver história de episódio maníaco ou hipomaníaco, considerar transtorno bipolar em vez de transtorno depressivo maior.");
  if (isPresent("D9")) result.warnings.push("Avaliar risco suicida: plano, intenção, acesso a meios, tentativas prévias, fatores protetores e necessidade de conduta imediata.");
  if (isPresent("DEP_F")) result.warnings.push("Episódio depressivo maior pode estar presente, mas história de mania/hipomania sugere espectro bipolar; não concluir transtorno depressivo maior sem revisão.");
  return setStandardStatus(result, fulfilled, mandatoryIds);
}

function evaluateManicEpisode(disorder) {
  const result = createStandardResult(disorder);
  const symptomIds = ["M1", "M2", "M3", "M4", "M5", "M6", "M7"];
  const mandatoryIds = ["MAN_A1", "MAN_A2", "MAN_A3", "MAN_A4", ...symptomIds, "MAN_C1", "MAN_C2", "MAN_C3", "MAN_D"];
  const moodType = diagnosticCriteriaState.specifiers.moodType || "Não informado";
  const threshold = moodType === "Irritável apenas" ? 4 : 3;
  const symptomCount = countPresent(symptomIds);
  const coreMoodEnergyPositive = isPresent("MAN_A1") && isPresent("MAN_A2");
  const durationPositive = isPresent("MAN_A3") || isPresent("MAN_A4");
  const symptomsPositive = symptomCount >= threshold;
  const severityCriterionPositive = isPresent("MAN_C1") || isPresent("MAN_C2") || isPresent("MAN_C3");
  const fulfilled = coreMoodEnergyPositive && durationPositive && symptomsPositive && severityCriterionPositive && isPresent("MAN_D");

  result.counts = { symptomsB: `${symptomCount}/7` };
  result.thresholds = { symptomsB: threshold };
  result.specifiers.moodType = moodType;
  if (coreMoodEnergyPositive) result.metCriteria.push("Humor e energia/atividade aumentados");
  else result.missingCriteria.push("Humor e energia/atividade aumentados");
  if (durationPositive) result.metCriteria.push("Duração ≥1 semana ou hospitalização");
  else result.missingCriteria.push("Duração ≥1 semana ou hospitalização");
  if (symptomsPositive) result.metCriteria.push("Sintomas B suficientes");
  else result.missingCriteria.push("Sintomas B abaixo do limiar");
  if (severityCriterionPositive) result.metCriteria.push("Prejuízo marcado/hospitalização/psicose");
  else result.missingCriteria.push("Prejuízo marcado/hospitalização/psicose");
  addRequirement(result, "MAN_D", "Exclusão de substância/condição médica", isPresent("MAN_D"));
  if (isPresent("MAN_C3")) result.warnings.push("Psicose durante episódio de elevação/irritabilidade do humor favorece episódio maníaco, não hipomaníaco.");
  return setStandardStatus(result, fulfilled, mandatoryIds);
}

function evaluateHypomanicEpisode(disorder) {
  const result = createStandardResult(disorder);
  const symptomIds = ["HM1", "HM2", "HM3", "HM4", "HM5", "HM6", "HM7"];
  const mandatoryIds = ["H1", "H2", "H3", ...symptomIds, "HYP_C", "HYP_D", "HYP_E", "HYP_F", "HYP_G", "HYP_H"];
  const moodType = diagnosticCriteriaState.specifiers.moodType || "Não informado";
  const threshold = moodType === "Irritável apenas" ? 4 : 3;
  const symptomCount = countPresent(symptomIds);
  const fulfilled =
    isPresent("H1") &&
    isPresent("H2") &&
    isPresent("H3") &&
    symptomCount >= threshold &&
    isPresent("HYP_C") &&
    isPresent("HYP_D") &&
    isPresent("HYP_E") &&
    isPresent("HYP_F") &&
    isPresent("HYP_G") &&
    isPresent("HYP_H");

  result.counts = { symptomsB: `${symptomCount}/7` };
  result.thresholds = { symptomsB: threshold };
  result.specifiers.moodType = moodType;
  if (isPresent("H1") && isPresent("H2")) result.metCriteria.push("Humor e energia/atividade aumentados");
  else result.missingCriteria.push("Humor e energia/atividade aumentados");
  if (isPresent("H3")) result.metCriteria.push("Duração ≥4 dias");
  else result.missingCriteria.push("Duração ≥4 dias");
  if (symptomCount >= threshold) result.metCriteria.push("Sintomas B suficientes");
  else result.missingCriteria.push("Sintomas B abaixo do limiar");
  addRequirement(result, "HYP_C", "Mudança inequívoca no funcionamento", isPresent("HYP_C"));
  addRequirement(result, "HYP_D", "Alteração observável por terceiros", isPresent("HYP_D"));
  addRequirement(result, "HYP_E", "Sem prejuízo funcional marcado", isPresent("HYP_E"));
  addRequirement(result, "HYP_F", "Sem hospitalização", isPresent("HYP_F"));
  addRequirement(result, "HYP_G", "Sem psicose", isPresent("HYP_G"));
  addRequirement(result, "HYP_H", "Exclusão de substância/condição médica", isPresent("HYP_H"));
  if (isAbsent("HYP_G")) result.warnings.push("Presença de sintomas psicóticos exclui hipomania; avaliar episódio maníaco.");
  if (isAbsent("HYP_F")) result.warnings.push("Necessidade de hospitalização exclui hipomania; avaliar episódio maníaco.");
  if (isAbsent("HYP_E")) result.warnings.push("Prejuízo funcional marcado sugere mania em vez de hipomania.");
  return setStandardStatus(result, fulfilled, mandatoryIds);
}

function evaluateGad(disorder) {
  const result = createStandardResult(disorder);
  const symptomIds = ["GAD_C1", "GAD_C2", "GAD_C3", "GAD_C4", "GAD_C5", "GAD_C6"];
  const mandatoryIds = ["GAD_A", "GAD_B", ...symptomIds, "GAD_D", "GAD_E", "GAD_F"];
  const threshold = diagnosticCriteriaState.ageGroup === "child_adolescent" ? 1 : 3;
  const associatedCount = countPresent(symptomIds);
  const fulfilled =
    isPresent("GAD_A") && isPresent("GAD_B") && associatedCount >= threshold && isPresent("GAD_D") && isPresent("GAD_E") && isPresent("GAD_F");

  result.counts = { associatedSymptoms: `${associatedCount}/6` };
  result.thresholds = { associatedSymptoms: threshold };
  if (isPresent("GAD_A") && isPresent("GAD_B")) result.metCriteria.push("Preocupação excessiva ≥6 meses e difícil controle");
  else result.missingCriteria.push("Critérios centrais de preocupação/controle");
  if (associatedCount >= threshold) result.metCriteria.push("Sintomas associados suficientes");
  else result.missingCriteria.push("Sintomas associados abaixo do limiar");
  addRequirement(result, "GAD_D", "Prejuízo/sofrimento", isPresent("GAD_D"));
  addRequirement(result, "GAD_E", "Exclusão de substância/condição médica", isPresent("GAD_E"));
  addRequirement(result, "GAD_F", "Diferencial", isPresent("GAD_F"));
  if (isAbsent("GAD_A")) result.warnings.push("Duração/frequência da preocupação não compatível com TAG.");
  if (isAbsent("GAD_B")) result.warnings.push("Preocupação excessiva sem dificuldade de controle não preenche critério central de TAG.");
  if (isAbsent("GAD_F")) result.warnings.push("Sintomas podem ser melhor explicados por outro transtorno; revisar diferencial.");
  return setStandardStatus(result, fulfilled, mandatoryIds);
}

const diagnosticEvaluators = {
  evaluateAdhd,
  evaluateMajorDepressiveEpisode,
  evaluateMania,
  evaluateHypomania,
  evaluateManicEpisode,
  evaluateHypomanicEpisode,
  evaluateGad,
  evaluatePanicDisorder,
  evaluateOcd,
  evaluatePtsd,
  evaluateSchizophrenia,
  evaluateSubstanceUseDisorder
};

function getAnswerLabel(disorder, itemId) {
  const item = getAllItems(disorder).find((candidate) => candidate.id === itemId);
  return item ? item.label : itemId;
}

function normalizeStatus(status) {
  return status.toLowerCase();
}

function buildDiagnosticProntuarioLine(result) {
  if (result.statusLabel) {
    return buildRefinedDiagnosticProntuarioLine(result);
  }
  const disorder = result.disorder;
  const date = formatDateBR(diagnosticCriteriaState.date);
  const missing = result.missing.length ? result.missing.slice(0, 3).join("; ") : "nenhum critério obrigatório ausente";
  const spec = [result.presentation, result.specifier, result.severity ? `gravidade ${result.severity}` : ""]
    .filter(Boolean)
    .join("; ");
  const counts = result.counts.length ? result.counts.join("; ") : "sem contagens aplicáveis";
  const substance = diagnosticCriteriaState.specifiers.substanceName ? ` (${diagnosticCriteriaState.specifiers.substanceName})` : "";
  return `Critérios diagnósticos ${date} — ${disorder.name}${substance}: resultado ${normalizeStatus(result.status)}; critérios principais: ${result.met.length ? result.met.join(", ") : "não preenchidos"}; contagens: ${counts}; critérios ausentes/não avaliados: ${missing}${spec ? `; especificador/apresentação/gravidade: ${spec}` : ""}.`;
}

function countText(result) {
  if (Array.isArray(result.counts)) {
    return result.counts.length ? result.counts.join("; ") : "sem contagens aplicáveis";
  }
  const entries = Object.keys(result.counts || {}).map((key) => {
    const threshold = result.thresholds && result.thresholds[key] ? `, limiar ${result.thresholds[key]}` : "";
    return `${key}: ${result.counts[key]}${threshold}`;
  });
  return entries.length ? entries.join("; ") : "sem contagens aplicáveis";
}

function buildRefinedDiagnosticProntuarioLine(result) {
  const date = formatDateBR(result.date);
  const status = result.statusLabel.toLowerCase();
  const yn = (id) => formatYesNoUnknown(getCriterionStatus(id));

  if (result.disorderId === "adhd_dsm5") {
    return `Critérios diagnósticos ${date} — TDAH: ${status}; sintomas: desatenção ${result.counts.inattention}, hiperatividade/impulsividade ${result.counts.hyperImpulsive}; início antes dos 12 anos: ${yn("ADHD_B")}; 2+ contextos: ${yn("ADHD_C")}; prejuízo funcional: ${yn("ADHD_D")}; diferencial: não melhor explicado por outro transtorno [${yn("ADHD_E")}]; apresentação: ${result.presentation}.`;
  }

  if (result.disorderId === "major_depressive_episode_dsm5") {
    const gateway = isPresent("D1") || isPresent("D2") ? "sim" : "não";
    const bipolarAlert = isPresent("DEP_F") ? "sim" : "não";
    return `Critérios diagnósticos ${date} — Episódio Depressivo Maior: ${status}; sintomas ${result.counts.symptoms} por ≥2 semanas: ${yn("DEP_A")}; humor deprimido/anedonia: ${gateway}; prejuízo: ${yn("DEP_C")}; substância/condição médica excluída: ${yn("DEP_D")}; diferencial psicótico: ${isPresent("DEP_E") ? "ok" : isAbsent("DEP_E") ? "não ok" : "não avaliado"}; gravidade: ${result.severity || "Não informada"}; alerta bipolar: ${bipolarAlert}.`;
  }

  if (result.disorderId === "manic_episode_dsm5") {
    const duration = isPresent("MAN_A3") || isPresent("MAN_A4") ? "sim" : hasAnyNotEvaluated(["MAN_A3", "MAN_A4"]) ? "não avaliado" : "não";
    const severity = isPresent("MAN_C1") || isPresent("MAN_C2") || isPresent("MAN_C3") ? "sim" : hasAnyNotEvaluated(["MAN_C1", "MAN_C2", "MAN_C3"]) ? "não avaliado" : "não";
    return `Critérios diagnósticos ${date} — Episódio Maníaco: ${status}; humor/energia aumentados: ${isPresent("MAN_A1") && isPresent("MAN_A2") ? "sim" : hasAnyNotEvaluated(["MAN_A1", "MAN_A2"]) ? "não avaliado" : "não"}; duração ≥1 semana ou hospitalização: ${duration}; sintomas B: ${result.counts.symptomsB}, limiar ${result.thresholds.symptomsB}; prejuízo marcado/hospitalização/psicose: ${severity}; exclusão substância/condição médica: ${isPresent("MAN_D") ? "ok" : isAbsent("MAN_D") ? "não ok" : "não avaliado"}.`;
  }

  if (result.disorderId === "hypomanic_episode_dsm5") {
    const noSevere = isPresent("HYP_E") && isPresent("HYP_F") && isPresent("HYP_G") ? "sim" : hasAnyNotEvaluated(["HYP_E", "HYP_F", "HYP_G"]) ? "não avaliado" : "não";
    return `Critérios diagnósticos ${date} — Episódio Hipomaníaco: ${status}; humor/energia aumentados: ${isPresent("H1") && isPresent("H2") ? "sim" : hasAnyNotEvaluated(["H1", "H2"]) ? "não avaliado" : "não"}; duração ≥4 dias: ${yn("H3")}; sintomas B: ${result.counts.symptomsB}, limiar ${result.thresholds.symptomsB}; mudança observável: ${isPresent("HYP_C") && isPresent("HYP_D") ? "sim" : hasAnyNotEvaluated(["HYP_C", "HYP_D"]) ? "não avaliado" : "não"}; sem psicose/hospitalização/prejuízo marcado: ${noSevere}; exclusão substância/condição médica: ${isPresent("HYP_H") ? "ok" : isAbsent("HYP_H") ? "não ok" : "não avaliado"}.`;
  }

  if (result.disorderId === "gad_dsm5") {
    const exclusions = isPresent("GAD_E") && isPresent("GAD_F") ? "ok" : hasAnyNotEvaluated(["GAD_E", "GAD_F"]) ? "não avaliado" : "não ok";
    return `Critérios diagnósticos ${date} — TAG: ${status}; preocupação excessiva ≥6 meses: ${yn("GAD_A")}; dificuldade de controle: ${yn("GAD_B")}; sintomas associados: ${result.counts.associatedSymptoms}, limiar ${result.thresholds.associatedSymptoms}; prejuízo: ${yn("GAD_D")}; exclusões/diferencial: ${exclusions}.`;
  }

  const missing = result.missingCriteria.length || result.notEvaluatedCriteria.length ? [...result.missingCriteria, ...result.notEvaluatedCriteria].join("; ") : "nenhum";
  return `Critérios diagnósticos ${date} — ${result.disorderName}: ${status}; contagens: ${countText(result)}; critérios ausentes/não avaliados: ${missing}.`;
}

function buildDiagnosticFullSummary(result) {
  if (result.statusLabel) {
    const notes = Object.keys(diagnosticCriteriaState.answers)
      .filter((itemId) => diagnosticCriteriaState.answers[itemId].note.trim())
      .map((itemId) => `${itemId}: ${diagnosticCriteriaState.answers[itemId].note.trim()}`);
    return [
      `Critérios Diagnósticos — ${result.disorderName}`,
      `Data: ${formatDateBR(result.date)}`,
      `Fonte de referência: ${result.disorder.sourceLabel}`,
      `Resultado: ${result.statusLabel}`,
      `Contagens e limiares: ${countText(result)}`,
      `Critérios preenchidos: ${result.metCriteria.length ? result.metCriteria.join("; ") : "Nenhum"}`,
      `Critérios ausentes: ${result.missingCriteria.length ? result.missingCriteria.join("; ") : "Nenhum"}`,
      `Critérios não avaliados: ${result.notEvaluatedCriteria.length ? result.notEvaluatedCriteria.join("; ") : "Nenhum"}`,
      `Avisos: ${result.warnings.join(" ")}`,
      `Especificadores: ${[result.presentation, result.severity, Object.values(result.specifiers || {}).join("; ")].filter(Boolean).join("; ") || "Não aplicável"}`,
      diagnosticCriteriaState.clinicalNotes.trim() ? `Notas clínicas: ${diagnosticCriteriaState.clinicalNotes.trim()}` : "",
      notes.length ? `Notas por critério:\n${notes.join("\n")}` : ""
    ].filter(Boolean).join("\n");
  }
  const lines = [
    `Critérios Diagnósticos — ${result.disorder.name}`,
    `Data: ${formatDateBR(diagnosticCriteriaState.date)}`,
    `Fonte de referência: ${result.disorder.sourceLabel}`,
    `Resultado: ${result.status}`,
    `Critérios preenchidos: ${result.met.length ? result.met.join("; ") : "Nenhum"}`,
    `Critérios ausentes ou não avaliados: ${result.missing.length ? result.missing.join("; ") : "Nenhum"}`,
    `Contagens: ${result.counts.length ? result.counts.join("; ") : "Não aplicável"}`,
    `Especificador/apresentação/gravidade: ${[result.presentation, result.specifier, result.severity].filter(Boolean).join("; ") || "Não aplicável"}`,
    `Avisos: ${result.warnings.join(" ")}`
  ];

  if (diagnosticCriteriaState.clinicalNotes.trim()) {
    lines.push(`Notas clínicas: ${diagnosticCriteriaState.clinicalNotes.trim()}`);
  }

  const answeredNotes = Object.keys(diagnosticCriteriaState.answers)
    .filter((itemId) => diagnosticCriteriaState.answers[itemId].note.trim())
    .map((itemId) => `${itemId}: ${diagnosticCriteriaState.answers[itemId].note.trim()}`);
  if (answeredNotes.length) {
    lines.push(`Notas por critério:\n${answeredNotes.join("\n")}`);
  }

  return lines.join("\n");
}

function renderDiagnosticResult(result) {
  if (result.statusLabel) {
    diagnosticResultList.innerHTML = "";
    appendResultRow("Resultado", result.statusLabel, result.status === "fulfilled" ? "result-highlight" : result.status === "insufficient" ? "result-alert" : "");
    appendResultRow("Critérios preenchidos", result.metCriteria.length ? result.metCriteria.join("\n") : "Nenhum");
    appendResultRow("Critérios ausentes", result.missingCriteria.length ? result.missingCriteria.join("\n") : "Nenhum");
    appendResultRow("Critérios não avaliados", result.notEvaluatedCriteria.length ? result.notEvaluatedCriteria.join("\n") : "Nenhum");
    appendResultRow("Contagens", countText(result));
    appendResultRow("Avisos", result.warnings.join("\n"), "result-alert");
    if (result.presentation || result.severity || Object.keys(result.specifiers || {}).length) {
      appendResultRow(
        "Especificadores/apresentação/gravidade",
        [result.presentation, result.severity, Object.values(result.specifiers || {}).join("\n")].filter(Boolean).join("\n")
      );
    }
    diagnosticLineOutput.textContent = result.line;
    diagnosticFullOutput.textContent = result.fullSummary;
    diagnosticCopyFeedback.textContent = "";
    diagnosticResultArea.classList.remove("hidden");
    return;
  }

  diagnosticResultList.innerHTML = "";
  appendResultRow("Resultado", result.status, result.status === "Critérios preenchidos" ? "result-highlight" : result.status === "Avaliação insuficiente" ? "result-alert" : "");
  appendResultRow("Critérios preenchidos", result.met.length ? result.met.join("\n") : "Nenhum");
  appendResultRow("Critérios ausentes ou não avaliados", result.missing.length ? result.missing.join("\n") : "Nenhum");
  appendResultRow("Contagens", result.counts.length ? result.counts.join("\n") : "Não aplicável");
  if (result.presentation || result.specifier || result.severity) {
    appendResultRow("Especificador/apresentação/gravidade", [result.presentation, result.specifier, result.severity].filter(Boolean).join("\n"));
  }
  appendResultRow("Avisos", result.warnings.join("\n"), "result-alert");
  diagnosticLineOutput.textContent = result.line;
  diagnosticFullOutput.textContent = result.fullSummary;
  diagnosticCopyFeedback.textContent = "";
  diagnosticResultArea.classList.remove("hidden");
}

function appendResultRow(label, value, className = "") {
  const row = document.createElement("div");
  if (className) row.className = className;
  const term = document.createElement("dt");
  const detail = document.createElement("dd");
  term.textContent = label;
  detail.textContent = value;
  row.append(term, detail);
  diagnosticResultList.appendChild(row);
}

function updateDiagnosticProgress() {
  const disorder = getSelectedDisorder();
  if (!disorder) return;
  const items = getRequiredItems(disorder);
  const answered = items.filter((item) => {
    const status = getAnswer(item.id).status;
    return status !== null && status !== "not_evaluated";
  }).length;
  diagnosticProgress.textContent = `Avaliados ${answered} / ${items.length} critérios obrigatórios`;

  diagnosticCriteriaArea.querySelectorAll(".diagnostic-live-count").forEach((node) => node.remove());
  disorder.criteriaGroups.forEach((group) => {
    if (group.type === "symptom-count") {
      const element = diagnosticCriteriaArea.querySelector(`[data-group-id="${group.id}"]`);
      if (element) element.insertBefore(renderLiveCount(group, group.items), element.children[1] || null);
    }
    if (group.type === "domain-count") {
      group.domains.forEach((domain) => {
        const element = diagnosticCriteriaArea.querySelector(`[data-domain-id="${domain.id}"]`);
        if (element) element.insertBefore(renderLiveCount(domain, domain.items), element.children[1] || null);
      });
    }
  });
}

function clearDiagnosticCriteriaState() {
  const selected = diagnosticCriteriaState.selectedDisorderId;
  diagnosticCriteriaState = createDiagnosticCriteriaState(selected);
  diagnosticMissingKeys.clear();
  diagnosticDate.value = diagnosticCriteriaState.date;
  diagnosticResultArea.classList.add("hidden");
  diagnosticLineOutput.textContent = "";
  diagnosticFullOutput.textContent = "";
  diagnosticCopyFeedback.textContent = "";
  renderDiagnosticCriteriaPage();
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

async function handleDiagnosticCopy(event) {
  const button = event.target.closest("[data-diagnostic-copy]");
  if (!button) return;
  const text = button.dataset.diagnosticCopy === "line" ? diagnosticLineOutput.textContent : diagnosticFullOutput.textContent;
  if (!text) return;
  try {
    await copyTextToClipboard(text);
    diagnosticCopyFeedback.textContent = "Copiado.";
    window.setTimeout(() => {
      diagnosticCopyFeedback.textContent = "";
    }, 2000);
  } catch (error) {
    diagnosticCopyFeedback.textContent =
      error.message === "Texto selecionado para cópia manual."
        ? "Texto selecionado para cópia manual."
        : "Não foi possível copiar.";
  }
}

initDiagnosticCriteriaPage();
