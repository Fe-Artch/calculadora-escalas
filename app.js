"use strict";

const wursOptions = [
  { value: 0, label: "0 - Nada ou muito pouco", detail: "Not at all or very slightly" },
  { value: 1, label: "1 - Levemente", detail: "Mildly" },
  { value: 2, label: "2 - Moderadamente", detail: "Moderately" },
  { value: 3, label: "3 - Bastante", detail: "Quite a bit" },
  { value: 4, label: "4 - Muito", detail: "Very much" }
];

const asrsOptions = [
  { value: 0, label: "0 - Nunca", detail: "Never" },
  { value: 1, label: "1 - Raramente", detail: "Rarely" },
  { value: 2, label: "2 - Às vezes", detail: "Sometimes" },
  { value: 3, label: "3 - Frequentemente", detail: "Often" },
  { value: 4, label: "4 - Muito frequentemente", detail: "Very often" }
];

const snapOptions = [
  { value: 0, label: "0 - Nem um pouco" },
  { value: 1, label: "1 - Só um pouco" },
  { value: 2, label: "2 - Bastante" },
  { value: 3, label: "3 - Demais" }
];

const phq9Options = [
  { value: 0, label: "0 - Nenhuma vez", detail: "Not at all" },
  { value: 1, label: "1 - Vários dias", detail: "Several days" },
  { value: 2, label: "2 - Mais da metade dos dias", detail: "More than half the days" },
  { value: 3, label: "3 - Quase todos os dias", detail: "Nearly every day" }
];

const phq9ImpactOptions = [
  { value: 0, label: "0 - Não dificultou", detail: "Not difficult at all" },
  { value: 1, label: "1 - Dificultou um pouco", detail: "Somewhat difficult" },
  { value: 2, label: "2 - Dificultou muito", detail: "Very difficult" },
  { value: 3, label: "3 - Dificultou extremamente", detail: "Extremely difficult" }
];

const baiOptions = [
  { value: 0, label: "0 - Absolutamente não" },
  { value: 1, label: "1 - Levemente", detail: "Não me incomodou muito" },
  { value: 2, label: "2 - Moderadamente", detail: "Foi muito desagradável mas pude suportar" },
  { value: 3, label: "3 - Gravemente", detail: "Dificilmente pude suportar" }
];

const bdiOptions = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" }
];

const cgiSchOptions = [
  { value: 1, label: "1 - Normal/Ausente", detail: "Normal / ausente" },
  { value: 2, label: "2 - Limítrofe", detail: "Limítrofe" },
  { value: 3, label: "3 - Leve", detail: "Leve" },
  { value: 4, label: "4 - Moderado", detail: "Moderado" },
  { value: 5, label: "5 - Marcado", detail: "Marcado" },
  { value: 6, label: "6 - Grave", detail: "Grave" },
  { value: 7, label: "7 - Extremo", detail: "Entre os mais graves / extremamente grave" }
];

const panssOptions = [
  { value: 1, label: "1 Ausente", detail: "Ausente" },
  { value: 2, label: "2 Mínimo", detail: "Mínimo" },
  { value: 3, label: "3 Leve", detail: "Leve" },
  { value: 4, label: "4 Moderado", detail: "Moderado" },
  { value: 5, label: "5 Mod. grave", detail: "Moderadamente grave" },
  { value: 6, label: "6 Grave", detail: "Grave" },
  { value: 7, label: "7 Extremo", detail: "Extremo" }
];

function createBdiOptions(labels) {
  return labels.map((label, value) => ({ value, label: `${value} - ${label}` }));
}

const wursQuestions = [
  { pt: "Ativo, inquieto, sempre em movimento.", en: "Active, restless, always on the go" },
  { pt: "Medo de coisas.", en: "Afraid of things" },
  { pt: "Problemas de concentração, distrai-se facilmente.", en: "Concentration problems, easily distracted", adhdSubscore: true },
  { pt: "Ansioso, preocupado.", en: "Anxious, worrying", adhdSubscore: true },
  { pt: "Nervoso, agitado.", en: "Nervous, fidgety", adhdSubscore: true },
  { pt: "Desatento, sonhando acordado.", en: "Inattentive, daydreaming", adhdSubscore: true },
  { pt: "Irascível, pavio curto.", en: "Hot- or short-tempered, low boiling point", adhdSubscore: true },
  { pt: "Tímido, sensível.", en: "Shy, sensitive" },
  { pt: "Explosões de temperamento, acessos de raiva.", en: "Temper outbursts, tantrums", adhdSubscore: true },
  { pt: "Dificuldade em persistir, falha em terminar as coisas começadas.", en: "Trouble with stick-to-it-tiveness, failing to finish things started", adhdSubscore: true },
  { pt: "Teimoso, determinado.", en: "Stubborn, strong-willed", adhdSubscore: true },
  { pt: "Triste, deprimido ou infeliz.", en: "Sad or blue, depressed, unhappy", adhdSubscore: true },
  { pt: "Incauto, audacioso, envolvido em travessuras.", en: "Incautious, dare-devilish, involved in pranks" },
  { pt: "Não sente prazer nas coisas, insatisfeito com a vida.", en: "Not getting a kick out of things, dissatisfied with life" },
  { pt: "Desobediente com os pais, rebelde, respondão.", en: "Disobedient with parents, rebellious, sassy", adhdSubscore: true },
  { pt: "Baixa opinião de si mesmo.", en: "Low opinion of myself", adhdSubscore: true },
  { pt: "Irritável.", en: "Irritable", adhdSubscore: true },
  { pt: "Extrovertido, amigável, gostava da companhia de pessoas.", en: "Outgoing, friendly" },
  { pt: "Desleixado, desorganizado.", en: "Sloppy, disorganized" },
  { pt: "Instável, altos e baixos.", en: "Moody, ups and downs", adhdSubscore: true },
  { pt: "Zangado.", en: "Angry", adhdSubscore: true },
  { pt: "Amigos, popular.", en: "Friends, popular" },
  { pt: "Bem organizado, arrumado, limpo.", en: "Well-organized, tidy, neat" },
  { pt: "Age sem pensar, impulsivo.", en: "Acting without thinking, impulsive", adhdSubscore: true },
  { pt: "Tendência a ser imaturo.", en: "Tendency to be immature", adhdSubscore: true },
  { pt: "Sentimentos de culpa, arrependido.", en: "Guilty feelings, regretful", adhdSubscore: true },
  { pt: "Perder o controle de si mesmo.", en: "Losing control of myself", adhdSubscore: true },
  { pt: "Tendência a agir de forma irracional.", en: "Tendency to be or act irrational", adhdSubscore: true },
  { pt: "Impopular com outras crianças, não mantinha amizades.", en: "Unpopular with other children, didn't keep friends", adhdSubscore: true },
  { pt: "Mal coordenado, não participava de esportes.", en: "Poorly coordinated" },
  { pt: "Medo de perder o controle de si mesmo.", en: "Afraid of losing control of self" },
  { pt: "Bem coordenado, escolhido primeiro em jogos.", en: "Well-coordinated" },
  { pt: "Maria-rapaz (apenas para mulheres).", en: "Tomboyish - for women only" },
  { pt: "Fugir de casa.", en: "Running away from home" },
  { pt: "Meter-se em brigas.", en: "Getting into fights" },
  { pt: "Provocar outras crianças.", en: "Teasing other children" },
  { pt: "Líder, mandão.", en: "Leader, bossy" },
  { pt: "Dificuldade em acordar.", en: "Difficulty getting awake" },
  { pt: "Seguidor, deixava-se levar demais.", en: "Follower, led around too much" },
  { pt: "Dificuldade em ver o ponto de vista alheio.", en: "Trouble seeing things from someone else's point of view", adhdSubscore: true },
  { pt: "Problemas com autoridades, problemas na escola, visitas à diretoria.", en: "Trouble with authorities, school, visits to principal's office", adhdSubscore: true },
  { pt: "Problemas com a polícia.", en: "Trouble with police" },
  { pt: "Dores de cabeça.", en: "Headaches" },
  { pt: "Dores de estômago.", en: "Stomachaches" },
  { pt: "Prisão de ventre.", en: "Constipation" },
  { pt: "Diarreia.", en: "Diarrhea" },
  { pt: "Alergias alimentares.", en: "Food allergies" },
  { pt: "Outras alergias.", en: "Other allergies" },
  { pt: "Xixi na cama.", en: "Bedwetting" },
  { pt: "No geral, um bom aluno, rápido.", en: "Overall a good student, fast" },
  { pt: "No geral, um mau aluno, aprendizado lento.", en: "Overall a poor student, slow learner", adhdSubscore: true },
  { pt: "Lento para aprender a ler.", en: "Slow in learning to read" },
  { pt: "Leitor lento.", en: "Slow reader" },
  { pt: "Dificuldade em inverter letras.", en: "Trouble reversing letters" },
  { pt: "Problemas com ortografia.", en: "Problems with spelling" },
  { pt: "Problemas com matemática ou números.", en: "Trouble with mathematics or numbers", adhdSubscore: true },
  { pt: "Letra ruim.", en: "Bad handwriting" },
  { pt: "Capaz de ler bem, mas nunca gostou de ler.", en: "Able to read well but never enjoyed reading" },
  { pt: "Não atingia o seu potencial.", en: "Not achieving up to potential", adhdSubscore: true },
  { pt: "Repetir séries.", en: "Repeating grades" },
  { pt: "Suspenso ou expulso.", en: "Suspended or expelled" }
];

const wurs25Questions = [
  {
    factor: "inattentionSchool",
    en: "Concentration problems, easily distracted",
    pt: "Problemas de concentração, distrai-se facilmente."
  },
  {
    factor: "selfEsteemMood",
    en: "Anxious, worrying",
    pt: "Ansioso, preocupado."
  },
  {
    factor: "selfEsteemMood",
    en: "Nervous, fidgety",
    pt: "Nervoso, inquieto."
  },
  {
    factor: "inattentionSchool",
    en: "Inattentive, daydreaming",
    pt: "Desatento, sonhando acordado."
  },
  {
    factor: "impulsivityBehavior",
    en: "Hot- or short-tempered",
    pt: "Irascível, pavio curto."
  },
  {
    factor: "impulsivityBehavior",
    en: "Temper outbursts, tantrums",
    pt: "Explosões de temperamento, acessos de raiva."
  },
  {
    factor: "inattentionSchool",
    en: "Trouble with stick-to-it-tiveness, failing to finish things",
    pt: "Dificuldade em persistir nas tarefas."
  },
  {
    factor: "impulsivityBehavior",
    en: "Stubborn, strong-willed",
    pt: "Teimoso, determinado."
  },
  {
    factor: "selfEsteemMood",
    en: "Sad or blue, depressed, unhappy",
    pt: "Triste, deprimido ou infeliz."
  },
  {
    factor: "impulsivityBehavior",
    en: "Disobedient with parents, rebellious, sassy",
    pt: "Desobediente com os pais, rebelde."
  },
  {
    factor: "selfEsteemMood",
    en: "Low opinion of myself",
    pt: "Baixa opinião sobre si mesmo."
  },
  {
    factor: "impulsivityBehavior",
    en: "Irritable",
    pt: "Irritável."
  },
  {
    factor: "impulsivityBehavior",
    en: "Moody, ups and downs",
    pt: "Instável emocionalmente, altos e baixos."
  },
  {
    factor: "impulsivityBehavior",
    en: "Angry",
    pt: "Zangado."
  },
  {
    factor: "impulsivityBehavior",
    en: "Acting without thinking, impulsive",
    pt: "Agia sem pensar, impulsivo."
  },
  {
    factor: "inattentionSchool",
    en: "Tendency to be immature",
    pt: "Tendência a ser imaturo."
  },
  {
    factor: "selfEsteemMood",
    en: "Guilty feelings, regretful",
    pt: "Sentimentos de culpa, arrependimento."
  },
  {
    factor: "impulsivityBehavior",
    en: "Losing control of myself",
    pt: "Perder o controle de si mesmo."
  },
  {
    factor: "impulsivityBehavior",
    en: "Tendency to be or act irrational",
    pt: "Tendência a agir de forma irracional."
  },
  {
    factor: "impulsivityBehavior",
    en: "Unpopular with other children",
    pt: "Impopular com outras crianças."
  },
  {
    factor: "impulsivityBehavior",
    en: "Trouble seeing things from someone else's point of view",
    pt: "Dificuldade em ver o ponto de vista alheio."
  },
  {
    factor: "impulsivityBehavior",
    en: "Trouble with authorities, school, principal's office",
    pt: "Problemas com autoridades ou na escola."
  },
  {
    factor: "inattentionSchool",
    en: "Overall a poor student, slow learner",
    pt: "No geral, um mau aluno, aprendizado lento."
  },
  {
    factor: "inattentionSchool",
    en: "Trouble with mathematics or numbers",
    pt: "Problemas com matemática ou números."
  },
  {
    factor: "inattentionSchool",
    en: "Not achieving up to potential",
    pt: "Não atingia o seu potencial."
  }
];

const asrsQuestions = [
  {
    factor: "inattention",
    pt: "Com que frequência você comete erros por falta de atenção quando tem de trabalhar num projeto chato ou difícil?",
    en: "How often do you make careless mistakes when you have to work on a boring or difficult project?"
  },
  {
    factor: "inattention",
    pt: "Com que frequência você tem dificuldade para manter a atenção quando está fazendo algo chato ou repetitivo?",
    en: "How often do you have difficulty keeping your attention when you are doing boring or repetitive work?"
  },
  {
    factor: "inattention",
    pt: "Com que frequência você tem dificuldade para se concentrar no que as pessoas dizem, mesmo quando elas estão falando diretamente com você?",
    en: "How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?"
  },
  {
    factor: "inattention",
    pt: "Com que frequência você deixa um projeto pela metade depois de já ter feito as partes mais difíceis?",
    en: "How often do you have trouble finishing the fine points of a project, once the challenging parts have been done?"
  },
  {
    factor: "inattention",
    pt: "Com que frequência você tem dificuldade para fazer um trabalho que exige organização?",
    en: "How often do you have difficulty getting things in order when you have to do a task that requires organization?"
  },
  {
    factor: "inattention",
    pt: "Quando você precisa fazer algo que exige muita concentração, com que frequência você evita ou adia o início?",
    en: "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?"
  },
  {
    factor: "inattention",
    pt: "Com que frequência você coloca as coisas fora do lugar ou tem dificuldade de encontrar as coisas em casa ou no trabalho?",
    en: "How often do you misplace or have difficulty finding things at home or at work?"
  },
  {
    factor: "inattention",
    pt: "Com que frequência você se distrai com atividades ou barulhos à sua volta?",
    en: "How often are you distracted by activity or noise around you?"
  },
  {
    factor: "inattention",
    pt: "Com que frequência você tem dificuldade para lembrar de compromissos ou obrigações?",
    en: "How often do you have difficulty remembering appointments or obligations?"
  },
  {
    factor: "hyperactivityImpulsivity",
    pt: "Com que frequência você fica se mexendo na cadeira ou balançando as mãos ou os pés quando precisa ficar sentado(a) por muito tempo?",
    en: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?"
  },
  {
    factor: "hyperactivityImpulsivity",
    pt: "Com que frequência você se levanta da cadeira em reuniões ou em outras situações onde deveria ficar sentado(a)?",
    en: "How often do you leave your seat in meetings or other situations in which you are expected to remain seated?"
  },
  {
    factor: "hyperactivityImpulsivity",
    pt: "Com que frequência você se sente inquieto(a) ou agitado(a)?",
    en: "How often do you feel restless or fidgety?"
  },
  {
    factor: "hyperactivityImpulsivity",
    pt: "Com que frequência você tem dificuldades para sossegar e relaxar quando tem tempo livre para você?",
    en: "How often do you have difficulty unwinding and relaxing when you have time to yourself?"
  },
  {
    factor: "hyperactivityImpulsivity",
    pt: "Com que frequência você se sente ativo(a) demais e necessitando fazer coisas, como se estivesse com um motor ligado?",
    en: "How often do you feel overly active and compelled to do things, like you were driven by a motor?"
  },
  {
    factor: "hyperactivityImpulsivity",
    pt: "Com que frequência você se pega falando demais em situações sociais?",
    en: "How often do you find yourself talking too much when you are in social situations?"
  },
  {
    factor: "hyperactivityImpulsivity",
    pt: "Quando você está conversando, com que frequência você se pega terminando as frases das pessoas antes delas?",
    en: "When you're in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?"
  },
  {
    factor: "hyperactivityImpulsivity",
    pt: "Com que frequência você tem dificuldade para esperar nas situações onde cada um tem a sua vez?",
    en: "How often do you have difficulty waiting your turn in situations when turn taking is required?"
  },
  {
    factor: "hyperactivityImpulsivity",
    pt: "Com que frequência você interrompe os outros quando eles estão ocupados?",
    en: "How often do you interrupt others when they are busy?"
  }
];

const snapQuestions = [
  { factor: "inattention", pt: "Não consegue prestar muita atenção a detalhes ou comete erros por descuido nos trabalhos da escola ou tarefas." },
  { factor: "inattention", pt: "Tem dificuldade de manter a atenção em tarefas ou atividades de lazer." },
  { factor: "inattention", pt: "Parece não estar ouvindo quando se fala diretamente com ela." },
  { factor: "inattention", pt: "Não segue instruções até o fim e não termina deveres da escola, tarefas ou obrigações." },
  { factor: "inattention", pt: "Tem dificuldade para organizar tarefas e atividades." },
  { factor: "inattention", pt: "Evita, não gosta ou não se envolve em tarefas que exigem esforço mental prolongado." },
  { factor: "inattention", pt: "Perde coisas necessárias para atividades (ex: brinquedos, lápis, livros)." },
  { factor: "inattention", pt: "Distrai-se com estímulos externos." },
  { factor: "inattention", pt: "É esquecido em atividades do dia-a-dia." },
  { factor: "hyperactivityImpulsivity", pt: "Mexe com as mãos ou os pés ou se remexe na cadeira." },
  { factor: "hyperactivityImpulsivity", pt: "Sai do lugar na sala de aula ou em outras situações em que se espera que fique sentado." },
  { factor: "hyperactivityImpulsivity", pt: "Corre de um lado para outro ou sobe demais nas coisas em situações inapropriadas." },
  { factor: "hyperactivityImpulsivity", pt: "Tem dificuldade em brincar ou envolver-se em atividades de lazer de forma calma." },
  { factor: "hyperactivityImpulsivity", pt: "Não para ou frequentemente está a mil por hora." },
  { factor: "hyperactivityImpulsivity", pt: "Fala em excesso." },
  { factor: "hyperactivityImpulsivity", pt: "Responde as perguntas de forma precipitada antes delas terem sido terminadas." },
  { factor: "hyperactivityImpulsivity", pt: "Tem dificuldade de esperar sua vez." },
  { factor: "hyperactivityImpulsivity", pt: "Interrompe os outros ou se intromete (ex: mete-se nas conversas ou jogos)." },
  { factor: "odd", pt: "Descontrola-se." },
  { factor: "odd", pt: "Discute com adultos." },
  { factor: "odd", pt: "Desafia ativamente ou se recusa a atender pedidos ou regras de adultos." },
  { factor: "odd", pt: "Faz coisas de propósito que incomodam outras pessoas." },
  { factor: "odd", pt: "Culpa os outros pelos seus erros ou mau comportamento." },
  { factor: "odd", pt: "É irritável ou facilmente incomodado pelos outros." },
  { factor: "odd", pt: "É zangado e ressentido." },
  { factor: "odd", pt: "É maldoso ou vingativo." }
];

const phq9Questions = [
  {
    pt: "Pouco interesse ou pouco prazer em fazer as coisas.",
    en: "Little interest or pleasure in doing things."
  },
  {
    pt: "Sentir-se para baixo, deprimido(a) ou sem perspectiva.",
    en: "Feeling down, depressed, or hopeless."
  },
  {
    pt: "Dificuldade para pegar no sono ou permanecer dormindo, ou dormir mais do que de costume.",
    en: "Trouble falling or staying asleep, or sleeping too much."
  },
  {
    pt: "Sentir-se cansado(a) ou com pouca energia.",
    en: "Feeling tired or having little energy."
  },
  {
    pt: "Falta de apetite ou comer demais.",
    en: "Poor appetite or overeating."
  },
  {
    pt: "Sentir-se mal consigo mesmo(a), ou achar que você é um fracasso ou que decepcionou você mesmo(a) ou sua família.",
    en: "Feeling bad about yourself - or that you are a failure or have let yourself or your family down."
  },
  {
    pt: "Dificuldade para se concentrar nas coisas, como ler o jornal ou ver televisão.",
    en: "Trouble concentrating on things, such as reading the newspaper or watching television."
  },
  {
    pt: "Lentidão para se movimentar ou falar, a ponto de outras pessoas perceberem; ou o oposto, estar tão agitado(a) ou inquieto(a) que você fica andando de um lado para o outro mais do que de costume.",
    en: "Moving or speaking so slowly that other people could have noticed; or the opposite, being so fidgety or restless that you have been moving around a lot more than usual."
  },
  {
    pt: "Pensar que seria melhor estar morto(a), ou pensar em se ferir de alguma maneira.",
    en: "Thoughts that you would be better off dead, or of hurting yourself in some way."
  },
  {
    pt: "Se você marcou algum problema acima, o quanto esses problemas dificultaram seu trabalho, seus cuidados em casa ou sua relação com outras pessoas?",
    en: "If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
    scored: false,
    optional: true,
    options: phq9ImpactOptions
  }
];

// ATENÇÃO: textos oficiais protegidos por direitos autorais. Usar apenas com licença/autorização adequada. Evitar publicar este arquivo em repositório ou site público.
const baiQuestions = [
  { pt: "Dormência ou formigamento." },
  { pt: "Sensação de calor." },
  { pt: "Tremores nas pernas." },
  { pt: "Incapaz de relaxar." },
  { pt: "Medo que aconteça o pior." },
  { pt: "Atordoado ou tonto." },
  { pt: "Palpitação ou aceleração do coração." },
  { pt: "Sem equilíbrio." },
  { pt: "Aterrorizado." },
  { pt: "Nervoso." },
  { pt: "Sensação de sufocação." },
  { pt: "Tremores nas mãos." },
  { pt: "Trêmulo." },
  { pt: "Medo de perder o controle." },
  { pt: "Dificuldade de respirar." },
  { pt: "Medo de morrer." },
  { pt: "Assustado." },
  { pt: "Indigestão ou desconforto no abdômen." },
  { pt: "Sensação de desmaio." },
  { pt: "Rosto afogueado." },
  { pt: "Suor (não devido ao calor)." }
];

// ATENÇÃO: textos oficiais protegidos por direitos autorais. Usar apenas com licença/autorização adequada. Evitar publicar este arquivo em repositório ou site público.
const bdiQuestions = [
  {
    itemLabel: "1",
    pt: "Tristeza",
    options: createBdiOptions([
      "Não me sinto triste",
      "Eu me sinto triste",
      "Estou sempre triste e não consigo sair disto",
      "Estou tão triste ou infeliz que não consigo suportar"
    ])
  },
  {
    itemLabel: "2",
    pt: "Desânimo quanto ao futuro",
    options: createBdiOptions([
      "Não estou especialmente desanimado quanto ao futuro",
      "Eu me sinto desanimado quanto ao futuro",
      "Acho que nada tenho a esperar",
      "Acho o futuro sem esperanças e tenho a impressão de que as coisas não podem melhorar"
    ])
  },
  {
    itemLabel: "3",
    pt: "Fracasso",
    options: createBdiOptions([
      "Não me sinto um fracasso",
      "Acho que fracassei mais do que uma pessoa comum",
      "Quando olho pra trás, na minha vida, tudo o que posso ver é um monte de fracassos",
      "Acho que, como pessoa, sou um completo fracasso"
    ])
  },
  {
    itemLabel: "4",
    pt: "Prazer",
    options: createBdiOptions([
      "Tenho tanto prazer em tudo como antes",
      "Não sinto mais prazer nas coisas como antes",
      "Não encontro um prazer real em mais nada",
      "Estou insatisfeito ou aborrecido com tudo"
    ])
  },
  {
    itemLabel: "5",
    pt: "Culpa",
    options: createBdiOptions([
      "Não me sinto especialmente culpado",
      "Eu me sinto culpado grande parte do tempo",
      "Eu me sinto culpado na maior parte do tempo",
      "Eu me sinto sempre culpado"
    ])
  },
  {
    itemLabel: "6",
    pt: "Punição",
    options: createBdiOptions([
      "Não acho que esteja sendo punido",
      "Acho que posso ser punido",
      "Creio que vou ser punido",
      "Acho que estou sendo punido"
    ])
  },
  {
    itemLabel: "7",
    pt: "Decepção consigo mesmo",
    options: createBdiOptions([
      "Não me sinto decepcionado comigo mesmo",
      "Estou decepcionado comigo mesmo",
      "Estou enojado de mim",
      "Eu me odeio"
    ])
  },
  {
    itemLabel: "8",
    pt: "Autocrítica",
    options: createBdiOptions([
      "Não me sinto de qualquer modo pior que os outros",
      "Sou crítico em relação a mim por minhas fraquezas ou erros",
      "Eu me culpo sempre por minhas falhas",
      "Eu me culpo por tudo de mal que acontece"
    ])
  },
  {
    itemLabel: "9",
    pt: "Ideias de morte ou autoagressão",
    options: createBdiOptions([
      "Não tenho quaisquer idéias de me matar",
      "Tenho idéias de me matar, mas não as executaria",
      "Gostaria de me matar",
      "Eu me mataria se tivesse oportunidade"
    ])
  },
  {
    itemLabel: "10",
    pt: "Choro",
    options: createBdiOptions([
      "Não choro mais que o habitual",
      "Choro mais agora do que costumava",
      "Agora, choro o tempo todo",
      "Costumava ser capaz de chorar, mas agora não consigo, mesmo que o queira"
    ])
  },
  {
    itemLabel: "11",
    pt: "Irritabilidade",
    options: createBdiOptions([
      "Não sou mais irritado agora do que já fui",
      "Fico aborrecido ou irritado mais facilmente do que costumava",
      "Agora, eu me sinto irritado o tempo todo",
      "Não me irrito mais com coisas que costumavam me irritar"
    ])
  },
  {
    itemLabel: "12",
    pt: "Interesse por outras pessoas",
    options: createBdiOptions([
      "Não perdi o interesse pelas outras pessoas",
      "Estou menos interessado pelas outras pessoas do que costumava estar",
      "Perdi a maior parte do meu interesse pelas outras pessoas",
      "Perdi todo o interesse pelas outras pessoas"
    ])
  },
  {
    itemLabel: "13",
    pt: "Tomada de decisões",
    options: createBdiOptions([
      "Tomo decisões tão bem quanto antes",
      "Adio as tomadas de decisões mais do que costumava",
      "Tenho mais dificuldades de tomar decisões do que antes",
      "Absolutamente não consigo mais tomar decisões"
    ])
  },
  {
    itemLabel: "14",
    pt: "Aparência",
    options: createBdiOptions([
      "Não acho que de qualquer modo pareço pior do que antes",
      "Estou preocupado em estar parecendo velho ou sem atrativo",
      "Acho que há mudanças permanentes na minha aparência, que me fazem parecer sem atrativo",
      "Acredito que pareço feio"
    ])
  },
  {
    itemLabel: "15",
    pt: "Trabalho",
    options: createBdiOptions([
      "Posso trabalhar tão bem quanto antes",
      "É preciso algum esforço extra para fazer alguma coisa",
      "Tenho que me esforçar muito para fazer alguma coisa",
      "Não consigo mais fazer qualquer trabalho"
    ])
  },
  {
    itemLabel: "16",
    pt: "Sono",
    options: createBdiOptions([
      "Consigo dormir tão bem como o habitual",
      "Não durmo tão bem como costumava",
      "Acordo 1 a 2 horas mais cedo do que habitualmente e acho difícil voltar a dormir",
      "Acordo várias horas mais cedo do que costumava e não consigo voltar a dormir"
    ])
  },
  {
    itemLabel: "17",
    pt: "Cansaço",
    options: createBdiOptions([
      "Não fico mais cansado do que o habitual",
      "Fico cansado mais facilmente do que costumava",
      "Fico cansado em fazer qualquer coisa",
      "Estou cansado demais para fazer qualquer coisa"
    ])
  },
  {
    itemLabel: "18",
    pt: "Apetite",
    options: createBdiOptions([
      "O meu apetite não está pior do que o habitual",
      "Meu apetite não é tão bom como costumava ser",
      "Meu apetite é muito pior agora",
      "Absolutamente não tenho mais apetite"
    ])
  },
  {
    itemLabel: "19",
    pt: "Perda de peso",
    options: createBdiOptions([
      "Não tenho perdido muito peso se é que perdi algum recentemente",
      "Perdi mais do que 2 quilos e meio",
      "Perdi mais do que 5 quilos",
      "Perdi mais do que 7 quilos"
    ])
  },
  {
    itemLabel: "19a",
    pt: "Estou tentando perder peso de propósito, comendo menos?",
    scored: false,
    optional: true,
    options: [
      { value: 1, label: "Sim" },
      { value: 0, label: "Não" }
    ]
  },
  {
    itemLabel: "20",
    pt: "Preocupação com a saúde",
    options: createBdiOptions([
      "Não estou mais preocupado com a minha saúde do que o habitual",
      "Estou preocupado com problemas físicos, tais como dores, indisposição do estômago ou constipação",
      "Estou muito preocupado com problemas físicos e é difícil pensar em outra coisa",
      "Estou tão preocupado com meus problemas físicos que não consigo pensar em qualquer outra coisa"
    ])
  },
  {
    itemLabel: "21",
    pt: "Interesse por sexo",
    options: createBdiOptions([
      "Não notei qualquer mudança recente no meu interesse por sexo",
      "Estou menos interessado por sexo do que costumava",
      "Estou muito menos interessado por sexo agora",
      "Perdi completamente o interesse por sexo"
    ])
  }
];

const cgiSchInterpretations = {
  1: "Normal / ausente",
  2: "Limítrofe",
  3: "Leve",
  4: "Moderado",
  5: "Marcado",
  6: "Grave",
  7: "Entre os mais graves / extremamente grave"
};

const cgiSchQuestions = [
  { pt: "Sintomas positivos", domainType: "symptom" },
  { pt: "Sintomas negativos", domainType: "symptom" },
  { pt: "Sintomas depressivos", domainType: "symptom" },
  { pt: "Sintomas cognitivos", domainType: "symptom" },
  { pt: "Gravidade global da esquizofrenia", domainType: "global" }
];

const panssDomainLabels = {
  positive: "Escala Positiva",
  negative: "Escala Negativa",
  general: "Escala de Psicopatologia Geral"
};

const panssRatingLabels = {
  1: "Ausente",
  2: "Mínimo",
  3: "Leve",
  4: "Moderado",
  5: "Moderadamente grave",
  6: "Grave",
  7: "Extremo"
};

// ATENÇÃO: a PANSS é um instrumento protegido por direitos autorais/licenciamento. Esta implementação usa apenas os nomes breves dos itens e a estrutura de pontuação. Preencher descrições/âncoras oficiais apenas se possuir autorização/licença adequada. Evitar publicar este arquivo em repositório ou site público contendo material oficial.
const panssQuestions = [
  { code: "P1", pt: "Delírios", domain: "positive" },
  { code: "P2", pt: "Desorganização conceitual", domain: "positive" },
  { code: "P3", pt: "Comportamento alucinatório", domain: "positive" },
  { code: "P4", pt: "Excitação", domain: "positive" },
  { code: "P5", pt: "Grandiosidade", domain: "positive" },
  { code: "P6", pt: "Desconfiança e Perseguição", domain: "positive" },
  { code: "P7", pt: "Hostilidade", domain: "positive" },
  { code: "N1", pt: "Embotamento Afetivo", domain: "negative" },
  { code: "N2", pt: "Retraimento emocional", domain: "negative" },
  { code: "N3", pt: "Contato pobre", domain: "negative" },
  { code: "N4", pt: "Retraimento social passivo/apático", domain: "negative" },
  { code: "N5", pt: "Dificuldade pensamento abstrato", domain: "negative" },
  { code: "N6", pt: "Falta de espontaneidade e fluência", domain: "negative" },
  { code: "N7", pt: "Pensamento estereotipado", domain: "negative" },
  { code: "G1", pt: "Preocupação somática", domain: "general" },
  { code: "G2", pt: "Ansiedade", domain: "general" },
  { code: "G3", pt: "Culpa", domain: "general" },
  { code: "G4", pt: "Tensão", domain: "general" },
  { code: "G5", pt: "Maneirismo/postura", domain: "general" },
  { code: "G6", pt: "Depressão", domain: "general" },
  { code: "G7", pt: "Retardo motor", domain: "general" },
  { code: "G8", pt: "Falta de cooperação", domain: "general" },
  { code: "G9", pt: "Conteúdo incomum do pensamento", domain: "general" },
  { code: "G10", pt: "Desorientação", domain: "general" },
  { code: "G11", pt: "Déficit de atenção", domain: "general" },
  { code: "G12", pt: "Juízo e crítica", domain: "general" },
  { code: "G13", pt: "Distúrbio de volição", domain: "general" },
  { code: "G14", pt: "Mau controle de impulso", domain: "general" },
  { code: "G15", pt: "Preocupação", domain: "general" },
  { code: "G16", pt: "Esquiva social ativa", domain: "general" }
];

function formatDateBR(date = new Date()) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function formatDivaDate(isoDate) {
  if (!isoDate) {
    return formatDateBR();
  }

  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) {
    return formatDateBR();
  }

  return `${day}/${month}/${year}`;
}

function getDivaSeverityLabel(value) {
  const labels = {
    mild: "leve",
    moderate: "moderada",
    severe: "grave"
  };

  return labels[value] || "não informada";
}

function formatSignedNumber(value) {
  if (value > 0) {
    return `+${value}`;
  }

  return String(value);
}

function normalizeLinePart(text) {
  return String(text).trim().replace(/\.$/, "");
}

function lowerFirst(text) {
  const normalized = normalizeLinePart(text);
  return normalized.charAt(0).toLowerCase() + normalized.slice(1);
}

function formatDecimalBR(value, digits = 1) {
  return value.toFixed(digits).replace(".", ",");
}

function getPhq9ImpactLabel(value) {
  const impactOption = phq9ImpactOptions.find((option) => option.value === value);

  if (!impactOption) {
    return String(value);
  }

  return impactOption.label.replace(/^\d+\s*-\s*/, "").toLowerCase();
}

function getWurs25ShortInterpretation(total) {
  return total >= 36 ? "sugestivo de TDAH retrospectivo" : "abaixo do ponto de corte para TDAH retrospectivo";
}

function getWurs61ShortInterpretation(adhdSubscore) {
  return adhdSubscore >= 36
    ? "sugestivo de TDAH retrospectivo"
    : "abaixo do ponto de corte para TDAH retrospectivo";
}

function getAsrs18ShortInterpretation(highestSubscale) {
  return highestSubscale >= 21 ? "rastreio positivo para TDAH adulto" : "rastreio negativo para TDAH adulto";
}

function getAsrs6ShortInterpretation(scores) {
  return scores.total >= 14 || scores.positiveSymptoms >= 4
    ? "rastreio positivo para TDAH adulto"
    : "rastreio negativo para TDAH adulto";
}

function getStatusLabel(value, cutoff) {
  return value >= cutoff ? "positivo" : "negativo";
}

function buildProntuarioLine(scale, scores, interpretation, context = {}) {
  const date = formatDateBR();

  if (scale.id === "panss") {
    return `${date} — PANSS: Positiva ${scores.positiveScore}/49; Negativa ${scores.negativeScore}/49; Psicopatologia geral ${scores.generalScore}/112; Total ${scores.totalScore}/210; Índice composto P-N: ${formatSignedNumber(scores.compositeScore)}.`;
  }

  if (scale.id === "cgi-sch") {
    const domains = scores.domains.map((domain) => {
      return `${domain.label.toLowerCase()} ${domain.value}/${domain.interpretation.toLowerCase()}`;
    });

    return `${date} — CGI-SCH: ${domains.join("; ")}; gravidade global ${scores.globalRating.value}/${scores.globalRating.interpretation.toLowerCase()}; média sintomática ${formatDecimalBR(scores.descriptiveMean)}.`;
  }

  if (scale.id === "bdi") {
    const parts = [`${date} — BDI: ${scores.total}/63, ${lowerFirst(interpretation)}`];

    if (scores.item9 > 0) {
      parts.push("item 9 positivo");
    }

    if (scores.intentionalWeightLoss !== null) {
      parts.push(`perda de peso intencional: ${scores.intentionalWeightLoss === 1 ? "sim" : "não"}`);
    }

    return `${parts.join("; ")}.`;
  }

  if (scale.id === "bai") {
    return `${date} — BAI: ${scores.total}/63, ${lowerFirst(interpretation)}.`;
  }

  if (scale.id === "phq-9") {
    const parts = [
      `${date} — PHQ-9: ${scores.total}/27, ${lowerFirst(interpretation)}`,
      scores.total >= 10 ? "rastreio positivo" : "rastreio negativo"
    ];

    if (scores.item9 > 0) {
      parts.push("item 9 positivo");
    }

    if (scores.impact !== null) {
      parts.push(`impacto funcional: ${getPhq9ImpactLabel(scores.impact)}`);
    }

    return `${parts.join("; ")}.`;
  }

  if (scale.id === "wurs-25") {
    return `${date} — WURS-25: Total ${scores.total}/100; Fator 1 Impulsividade/Problemas comportamentais ${scores.impulsivityBehavior}/52; Fator 2 Desatenção/Problemas escolares ${scores.inattentionSchool}/28; Fator 3 Autoestima/Humor negativo ${scores.selfEsteemMood}/20; ${getWurs25ShortInterpretation(scores.total)}.`;
  }

  if (scale.id === "wurs-61") {
    return `${date} — WURS-61: Total ${scores.total}/244; Subescore TDAH WURS-25 ${scores.adhdSubscore}/100; ${getWurs61ShortInterpretation(scores.adhdSubscore)}.`;
  }

  if (scale.id === "asrs-18") {
    return `${date} — ASRS-18: Desatenção ${scores.inattention}/36; Hiperatividade-Impulsividade ${scores.hyperactivityImpulsivity}/36; maior escore ${scores.highestSubscale}/36; ${getAsrs18ShortInterpretation(scores.highestSubscale)}.`;
  }

  if (scale.id === "asrs-6") {
    return `${date} — ASRS-6: Soma ${scores.total}/24; sintomas positivos ${scores.positiveSymptoms}/6; ${getAsrs6ShortInterpretation(scores)}.`;
  }

  if (scale.id === "snap-iv-26") {
    const cutoffs = scale.cutoffs[context.profile];
    const selectedProfile = scale.profiles.find((profile) => profile.id === context.profile);

    return `${date} — SNAP-IV: perfil ${selectedProfile.label.toLowerCase()}; Desatenção ${scores.inattention}/9 ${getStatusLabel(scores.inattention, cutoffs.inattention)}; Hiperatividade/Impulsividade ${scores.hyperactivityImpulsivity}/9 ${getStatusLabel(scores.hyperactivityImpulsivity, cutoffs.hyperactivityImpulsivity)}; TOD ${scores.odd}/8 ${getStatusLabel(scores.odd, cutoffs.odd)}.`;
  }

  if (scale.id === "diva5") {
    const formatBool = (value) => (value ? "sim" : "não");
    const adultCodes = scores.adultPresentCodes.length ? scores.adultPresentCodes.join(", ") : "nenhum";
    const childhoodCodes = scores.childhoodPresentCodes.length ? scores.childhoodPresentCodes.join(", ") : "nenhum";

    return `DIVA-5 ${formatDivaDate(scores.interviewDate)}: sintomas atuais — desatenção ${scores.adultInattentionCount}/9, hiperatividade/impulsividade ${scores.adultHyperImpulsiveCount}/9; infância — desatenção ${scores.childhoodInattentionCount}/9, hiperatividade/impulsividade ${scores.childhoodHyperImpulsiveCount}/9; exemplos marcados — atual ${scores.exampleCounts.totalAdultExamplesChecked}, infância ${scores.exampleCounts.totalChildhoodExamplesChecked}, total ${scores.exampleCounts.totalExamplesChecked}; início antes dos 12 anos: ${formatBool(scores.childhoodSeveralSymptoms)}; prejuízo atual em 2+ contextos: ${formatBool(scores.adultImpairmentOk)}; prejuízo na infância em 2+ contextos: ${formatBool(scores.childhoodImpairmentOk)}; melhor explicado por outro transtorno: ${formatBool(scores.differentialValue === "yes")}; conclusão: ${scores.compatible ? "compatível" : "não compatível"} com TDAH pela DIVA-5/DSM-5; apresentação: ${scores.presentation}; gravidade: ${getDivaSeverityLabel(scores.severity)}; sintomas atuais identificados: ${adultCodes}; sintomas infantis identificados: ${childhoodCodes}.`;

    const parts = [
      `${date} — DIVA-5: sintomas atuais A ${scores.adultAttentionCount}/9, H/I ${scores.adultHyperImpCount}/9`,
      `infância A ${scores.childhoodAttentionCount}/9, H/I ${scores.childhoodHyperImpCount}/9`,
      `início antes dos 12 anos: ${scores.onsetCriteria ? "sim" : "não"}`,
      `prejuízo em ≥2 contextos: ${scores.impairmentCriteria ? "sim" : "não"}`,
      `diferencial: ${getDiva5DifferentialLine(scores)}`,
      `conclusão: ${getDiva5ShortConclusion(scores)}`,
      `apresentação: ${lowerFirst(scores.presentation)}`
    ];

    if (scores.severity && scores.severity !== "notDefined") {
      parts.push(`gravidade: ${getDiva5SeverityLabel(scores.severity)}`);
    }

    return `${parts.join("; ")}.`;
  }

  return "";
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

function renderProntuarioLine(line, fullSummary = "") {
  if (!line) {
    return null;
  }

  const section = document.createElement("section");
  section.className = "prontuario-line-box";
  section.setAttribute("aria-labelledby", "prontuario-line-title");

  const title = document.createElement("h3");
  title.id = "prontuario-line-title";
  title.textContent = "Linha para prontuário";

  const text = document.createElement("p");
  text.className = "prontuario-line-text";
  text.textContent = line;

  const actions = document.createElement("div");
  actions.className = "prontuario-line-actions";

  const button = document.createElement("button");
  button.type = "button";
  button.dataset.copyProntuario = "true";
  button.dataset.copyTarget = "line";
  button.textContent = "Copiar linha";

  const fullButton = document.createElement("button");
  fullButton.type = "button";
  fullButton.className = "secondary";
  fullButton.dataset.copyProntuario = "true";
  fullButton.dataset.copyTarget = "full";
  fullButton.textContent = "Copiar resumo completo";
  fullButton.hidden = !fullSummary;

  const fullText = document.createElement("textarea");
  fullText.className = "prontuario-full-summary";
  fullText.value = fullSummary;
  fullText.readOnly = true;
  fullText.hidden = true;

  const feedback = document.createElement("span");
  feedback.className = "copy-feedback";
  feedback.setAttribute("aria-live", "polite");

  actions.append(button, fullButton, feedback);
  section.append(title, text, fullText, actions);

  return section;
}

const diva5Items = [
  {
    code: "A1",
    domain: "attention",
    title: "Atenção a detalhes / erros por distração",
    question:
      "Você com frequência não presta atenção suficiente aos detalhes ou comete erros por distração, no trabalho ou em outras atividades? Como era durante sua infância, na escola ou durante outras atividades?",
    adultExamples: [
      "Comete erros por distração",
      "Tem que trabalhar devagar para evitar erros",
      "Não lê as instruções com atenção",
      "Não é bom em trabalhos detalhados",
      "Precisa de muito tempo para os detalhes",
      "Perde-se nos detalhes",
      "Trabalha muito rápido e, por isso, comete erros"
    ],
    childhoodExamples: [
      "Cometia erros por distração nos trabalhos escolares",
      "Cometia erros devido a uma leitura errada das perguntas",
      "Deixava perguntas sem responder, por não as ter lido corretamente",
      "Deixava sem responder as perguntas do verso da página nas provas",
      "Os outros comentavam sobre o seu trabalho desleixado",
      "Não revia as respostas dos trabalhos feitos em casa",
      "Precisava de muito tempo para os trabalhos detalhados"
    ]
  },
  {
    code: "A2",
    domain: "attention",
    title: "Manter concentração em tarefas",
    question:
      "Você com frequência tem dificuldade em manter-se concentrado durante as tarefas? E era durante sua infância, em jogos ou atividades?",
    adultExamples: [
      "Não consegue manter a atenção nas tarefas durante muito tempo",
      "Distrai-se facilmente com as próprias associações/pensamentos",
      "Tem dificuldade em ver um filme ou ler um livro até o fim",
      "Fica rapidamente entediado com os assuntos",
      "Faz perguntas sobre assuntos que já foram discutidos"
    ],
    childhoodExamples: [
      "Tinha dificuldade em prestar atenção nos trabalhos escolares",
      "Tinha dificuldade em manter-se atento aos jogos",
      "Distraía-se facilmente",
      "Tinha dificuldade em concentrar-se",
      "Precisava de um ambiente muito estruturado para não se distrair",
      "Ficava rapidamente entediado com os assuntos"
    ]
  },
  {
    code: "A3",
    domain: "attention",
    title: "Parece não ouvir quando lhe dirigem a palavra",
    question:
      "Você com frequência parece não estar ouvindo, quando alguém lhe dirige diretamente a palavra? Como era durante sua infância?",
    adultExamples: [
      "Divaga ou parece ausente",
      "Tem dificuldade de concentrar-se numa conversa",
      "Não sabe do que se falou depois de uma conversa",
      "Muda frequentemente o assunto de uma conversa",
      "Os outros dizem que está com a cabeça em outro lugar"
    ],
    childhoodExamples: [
      "Não se lembrava do que os pais/professores diziam",
      "Estava frequentemente sonhando ou ausente",
      "Ouvia apenas quando olhavam nos seus olhos ou levantavam a voz",
      "Com frequência precisava ser chamado mais de uma vez",
      "As perguntas precisavam ser repetidas"
    ]
  },
  {
    code: "A4",
    domain: "attention",
    title: "Não segue instruções / não termina tarefas",
    question:
      "Você com frequência não segue as instruções ou não consegue terminar as tarefas ou obrigações no trabalho? Como era durante sua infância, na escola?",
    adultExamples: [
      "Faz várias coisas ao mesmo tempo sem terminar nenhuma delas",
      "Tem dificuldade para finalizar as tarefas quando já não são mais novidade",
      "Necessita de prazos-limite para terminar as tarefas",
      "Tem dificuldade em terminar tarefas administrativas",
      "Tem dificuldade em seguir instruções de um manual"
    ],
    childhoodExamples: [
      "Tinha dificuldade em estar pronto na hora",
      "Quarto/mesa de trabalho ficavam desarrumados",
      "Tinha dificuldade de brincar sozinho",
      "Tinha dificuldade de planejar as tarefas ou o trabalho de casa",
      "Fazia várias coisas ao mesmo tempo",
      "Chegava com frequência atrasado",
      "Tinha pouca noção do tempo",
      "Tinha dificuldade em prestar atenção"
    ]
  },
  {
    code: "A5",
    domain: "attention",
    title: "Dificuldade para organizar tarefas e atividades",
    question:
      "Você com frequência tem dificuldade para organizar tarefas e atividades? Como era durante sua infância?",
    adultExamples: [
      "Dificuldade no planejamento de atividades da vida cotidiana",
      "Dificuldade em gerenciar tarefas sequenciais",
      "A casa e/ou o local de trabalho estão desorganizados",
      "Dificuldade em manter materiais e pertences em ordem",
      "Trabalha desarrumado e desorganizado",
      "Planeja muitas tarefas ao mesmo tempo ou faz planejamento ineficiente",
      "Regularmente reserva coisas que acontecerão ao mesmo tempo",
      "Chega atrasado",
      "Falha em cumprir prazos",
      "Não consegue usar uma agenda ou diário consistentemente",
      "Inflexível por causa da necessidade de manter os horários",
      "Má percepção e gestão do tempo",
      "Faz agendamentos, mas não os usa",
      "Precisa de outras pessoas para estruturar suas coisas"
    ],
    childhoodExamples: [
      "Dificilmente estava pronto a tempo",
      "Quarto/mesa de trabalho ficavam desarrumados",
      "Dificuldade em manter materiais e pertences em ordem",
      "Dificuldade para brincar sozinho",
      "Dificuldade em planejar tarefas ou lições de casa",
      "Falha para cumprir prazos",
      "Faz as coisas de um jeito confuso",
      "Chega atrasado",
      "Má percepção de tempo/horários",
      "Dificuldade em manter-se entretido"
    ]
  },
  {
    code: "A6",
    domain: "attention",
    title: "Evita tarefas que exigem esforço mental continuado",
    question:
      "Você com frequência evita, tem aversão ou reluta em envolver-se em tarefas que requeiram um esforço mental continuado? Como era durante sua infância?",
    adultExamples: [
      "Faz primeiro o que é mais fácil ou divertido",
      "Adia sucessivamente as tarefas entediantes ou árduas",
      "Adia as tarefas e, em consequência, não cumpre prazos",
      "Evita os trabalhos monótonos, como os de natureza administrativa",
      "Evita preparar relatórios, preencher formulários ou rever textos longos",
      "Não gosta de ler porque exige esforço mental",
      "Evita coisas que exigem muita concentração"
    ],
    childhoodExamples: [
      "Evitava ou detestava os trabalhos de casa",
      "Lia poucos livros ou não gostava de ler por isso exigir esforço mental",
      "Evitava coisas que exigiam muita concentração",
      "Detestava disciplinas que exigiam muita concentração",
      "Adiava sucessivamente tarefas entediantes ou árduas"
    ]
  },
  {
    code: "A7",
    domain: "attention",
    title: "Perde objetos necessários",
    question:
      "Você com frequência perde objetos necessários para as tarefas ou atividades? Como era durante sua infância?",
    adultExamples: [
      "Perde a carteira, as chaves ou a agenda",
      "Deixa frequentemente coisas para trás",
      "Perde papéis do trabalho",
      "Perde muito tempo procurando as coisas",
      "Entra em pânico quando os outros mudam as coisas de lugar",
      "Arruma coisas no lugar errado",
      "Perde listas, números de telefone, anotações"
    ],
    childhoodExamples: [
      "Perdia a agenda, as canetas, equipamentos de ginástica ou outras coisas",
      "Perdia roupa, brinquedos ou trabalhos de casa",
      "Perdia muito tempo procurando as coisas",
      "Entrava em pânico quando os outros mudavam as coisas de lugar",
      "Recebia comentários dos pais/professores sobre o fato de perder as coisas"
    ]
  },
  {
    code: "A8",
    domain: "attention",
    title: "Distrai-se facilmente com estímulos externos",
    question:
      "Você com frequência se distrai facilmente com estímulos externos? Como era durante sua infância?",
    adultExamples: [
      "Tem dificuldade em ignorar estímulos externos",
      "Depois de se distrair, tem dificuldade em voltar ao assunto",
      "Distrai-se facilmente com barulhos ou com o que acontece à sua volta",
      "Escuta as conversas dos outros",
      "Tem dificuldade em filtrar/selecionar informação"
    ],
    childhoodExamples: [
      "Durante as aulas olhava muitas vezes para fora da janela",
      "Distraía-se facilmente com barulhos ou com o que acontecia à sua volta",
      "Depois de se distrair, tinha dificuldade em voltar ao assunto"
    ]
  },
  {
    code: "A9",
    domain: "attention",
    title: "Esquece atividades do dia a dia",
    question:
      "Você com frequência se esquece das atividades do dia a dia? Como era durante sua infância?",
    adultExamples: [
      "Esquece de compromissos ou outras obrigações",
      "Esquece as chaves, a agenda etc.",
      "Precisa ser lembrado frequentemente de compromissos",
      "Esquece de pagar contas ou retornar chamadas telefônicas",
      "Precisa voltar a casa para buscar coisas esquecidas",
      "Uso rígido de listas ou rotinas para garantir que as coisas não serão esquecidas",
      "Esquece de manter a agenda diária ou olhá-la",
      "Esquece de fazer tarefas ou dar recados"
    ],
    childhoodExamples: [
      "Esquecia de compromissos ou instruções",
      "Esquecia de fazer tarefas ou dar recados",
      "Tinha que ser lembrado frequentemente de coisas",
      "A meio caminho de uma tarefa, esquecia o que deveria ser feito",
      "Esquecia de levar as coisas para a escola",
      "Esquecia as coisas na escola ou nas casas dos amigos"
    ]
  },
  {
    code: "HI1",
    domain: "hyperImp",
    title: "Mexe mãos/pés ou remexe-se na cadeira",
    question:
      "Você com frequência mexe de forma irrequieta as mãos e os pés ou remexe-se na cadeira quando está sentado? Como era durante sua infância?",
    adultExamples: [
      "Tem dificuldade em ficar quieto/a sentado/a",
      "Balança as pernas",
      "Bate com a caneta ou brinca com qualquer coisa",
      "Rói as unhas ou mexe no cabelo",
      "Consegue controlar a inquietação motora, mas isso faz com que fique ainda mais tenso/a"
    ],
    childhoodExamples: [
      "Os pais diziam muitas vezes para se sentar quieto/a ou algo parecido",
      "Balançava as pernas",
      "Batia com a caneta ou brincava com qualquer coisa",
      "Roía as unhas ou mexia no cabelo",
      "Não conseguia ficar sentado/a normalmente numa cadeira",
      "Conseguia controlar a inquietação motora, mas isso o/a fazia ficar ainda mais tenso/a"
    ]
  },
  {
    code: "HI2",
    domain: "hyperImp",
    title: "Levanta-se quando deveria permanecer sentado",
    question:
      "Você com frequência se levanta do lugar em situações em que é esperado que permaneça sentado? Como era durante sua infância?",
    adultExamples: [
      "Deixa frequentemente o seu lugar no escritório ou no ambiente de trabalho",
      "Evita simpósios, palestras, igreja etc.",
      "Prefere andar em vez de ficar sentado",
      "Nunca fica parado por muito tempo, sempre se movimentando",
      "Estressado devido à dificuldade de ficar quieto",
      "Usa desculpas para poder andar por aí"
    ],
    childhoodExamples: [
      "Muitas vezes se levantava enquanto comia ou deixava seu lugar na sala de aula",
      "Achava muito difícil permanecer sentado na escola ou durante refeições",
      "Era chamado a atenção para permanecer sentado",
      "Dava desculpas para andar por aí"
    ]
  },
  {
    code: "HI3",
    domain: "hyperImp",
    title: "Sente-se irrequieto / inquietação motora",
    question:
      "Você com frequência se sente irrequieto? Como era durante sua infância?",
    adultExamples: [
      "Sente-se irrequieto ou agitado por dentro",
      "Tem a sensação de precisar estar ocupado",
      "Tem dificuldade em relaxar"
    ],
    childhoodExamples: [
      "Estava sempre correndo",
      "Subia nos móveis ou saltava em cima dos bancos",
      "Subia nas árvores",
      "Sentia-se agitado por dentro"
    ]
  },
  {
    code: "HI4",
    domain: "hyperImp",
    title: "Dificuldade em fazer atividades de lazer sossegadamente",
    question:
      "Você com frequência tem dificuldade em dedicar-se sossegadamente a atividades de lazer? Como era durante sua infância nas atividades de lazer?",
    adultExamples: [
      "Fala durante atividades quando isto é inapropriado",
      "Em público tende a ser arrogante ou chamar atenção",
      "É barulhento em várias situações",
      "Tem dificuldade em fazer atividades sossegadamente",
      "Tem dificuldade em falar baixo"
    ],
    childhoodExamples: [
      "Era barulhento durante os jogos ou durante as aulas",
      "Não conseguia ver televisão ou filmes sossegadamente",
      "Era repreendido para ficar mais quieto/sossegado",
      "Em público tendia a destacar-se/chamar atenção"
    ]
  },
  {
    code: "HI5",
    domain: "hyperImp",
    title: "\"A mil por hora\" / \"ligado a um motor\"",
    question:
      "Você com frequência está a mil por hora ou age como se estivesse ligado a um motor? Como era durante sua infância?",
    adultExamples: [
      "Sempre ocupado fazendo algo",
      "É desconfortável permanecer parado por tempo prolongado, por exemplo em restaurantes ou reuniões",
      "Tem muita energia, sempre em movimento",
      "Os outros consideram você inquieto ou difícil de acompanhar",
      "Passa por cima dos próprios limites",
      "Acha difícil deixar as coisas, energia em excesso"
    ],
    childhoodExamples: [
      "Constantemente ocupado",
      "Os outros consideravam você inquieto ou difícil de acompanhar",
      "Era desconfortável permanecer parado por tempo prolongado",
      "Excesso de atividade na escola e em casa",
      "Tinha muita energia",
      "Sempre em movimento, energia em excesso"
    ]
  },
  {
    code: "HI6",
    domain: "hyperImp",
    title: "Fala excessivamente",
    question:
      "Você com frequência fala excessivamente? Como era durante sua infância?",
    adultExamples: [
      "Fala de maneira tão agitada que os outros o acham cansativo",
      "Tem fama de ser muito falador",
      "Tem dificuldade em parar de falar",
      "Tem a tendência de falar excessivamente",
      "Não deixa os outros falarem numa conversa",
      "Precisa de muitas palavras para dizer qualquer coisa"
    ],
    childhoodExamples: [
      "Tinha fama de ser tagarela",
      "Os professores e os pais mandavam-no frequentemente calar-se",
      "Nos relatórios da escola tinha comentários acerca de falar demais",
      "Era castigado por falar em demasia",
      "Distraía os outros com conversas, quando faziam os trabalhos escolares",
      "Não deixava os outros falarem durante as conversas"
    ]
  },
  {
    code: "HI7",
    domain: "hyperImp",
    title: "Responde antes da pergunta ser completada",
    question:
      "Você com frequência dá as respostas antes que as perguntas tenham sido completadas? Como era durante sua infância?",
    adultExamples: [
      "Fala impulsivamente, fala sem pensar",
      "Diz o que lhe vem à cabeça",
      "Responde sem deixar o outro acabar a frase",
      "Completa as frases das outras pessoas",
      "É indelicado, grosseiro, sem tato"
    ],
    childhoodExamples: [
      "Era um tagarela, dizia coisas sem pensar primeiro",
      "Queria ser o primeiro a responder a perguntas na escola",
      "Dizia a primeira resposta que lhe vinha à cabeça, mesmo que estivesse errada",
      "Interrompia os outros antes de acabarem de dizer a frase",
      "Dificuldade em esperar sua vez durante as conversas",
      "Era conhecido como sendo indelicado"
    ]
  },
  {
    code: "HI8",
    domain: "hyperImp",
    title: "Dificuldade em esperar a vez",
    question:
      "Você com frequência tem dificuldade em esperar pela sua vez? Como era durante sua infância?",
    adultExamples: [
      "Dificuldade em esperar em uma fila, furando a fila",
      "Dificuldade em esperar pacientemente no trânsito ou no engarrafamento",
      "É impaciente",
      "Inicia subitamente relacionamentos e/ou empregos, ou os deixa de repente, por impaciência"
    ],
    childhoodExamples: [
      "Dificuldade em esperar sua vez nas atividades de grupo",
      "Dificuldade em aguardar sua vez na sala de aula",
      "Queria ser sempre o primeiro a falar ou agir",
      "Tornava-se impaciente com facilidade",
      "Atravessava a rua sem olhar"
    ]
  },
  {
    code: "HI9",
    domain: "hyperImp",
    title: "Interrompe ou se intromete nas atividades dos outros",
    question:
      "Você com frequência interrompe ou se intromete nas atividades dos outros? Como era durante sua infância?",
    adultExamples: [
      "Intromete-se facilmente nos assuntos dos outros",
      "Interrompe os outros",
      "Interrompe as pessoas nas suas atividades sem pedir licença",
      "Os outros comentam sobre ser intrometido",
      "Tem dificuldade em respeitar os limites dos outros",
      "Tem uma opinião sobre tudo e a expressa imediatamente"
    ],
    childhoodExamples: [
      "Intrometia-se nos jogos dos outros",
      "Interrompia as conversas dos outros",
      "Reagia a tudo",
      "Não era capaz de esperar"
    ]
  }
];

const diva5ImpairmentAreas = {
  adult: [
    {
      id: "workEducation",
      label: "Trabalho / educação",
      examples: [
        "Não concluiu a educação/formação necessária para o trabalho",
        "Trabalha abaixo do nível de educação/formação",
        "Fica rapidamente farto de um cargo ou função no trabalho",
        "Padrão de muitos trabalhos de curta duração",
        "Dificuldade com o trabalho administrativo / planejamento",
        "Não consegue promoções",
        "Rende abaixo de sua capacidade de trabalho",
        "Sai do emprego ou é despedido por causa de uma discussão",
        "Encontra-se em afastamento médico prolongado devido às incapacidades provocadas pelos sintomas",
        "Prejuízo limitado por conseguir compensar com QI elevado",
        "Prejuízo limitado por conseguir compensar com apoio de estrutura externa"
      ]
    },
    {
      id: "relationshipsFamily",
      label: "Relacionamentos e/ou família",
      examples: [
        "Fica rapidamente aborrecido nos relacionamentos",
        "Impulsivamente começa/termina relacionamentos",
        "Relacionamentos desequilibrados devido aos sintomas",
        "Problemas de relacionamento, muitas discussões, falta de intimidade",
        "Divorciado devido aos sintomas",
        "Problemas com a sexualidade devido aos sintomas",
        "Dificuldade na educação dos filhos, resultante dos sintomas",
        "Dificuldade nas tarefas domésticas e/ou administrativas",
        "Problemas financeiros ou apostar em jogos de azar",
        "Medo de começar um relacionamento"
      ]
    },
    {
      id: "socialContacts",
      label: "Interação social",
      examples: [
        "Fica rapidamente entediado com os contatos sociais",
        "Dificuldade em manter contatos sociais",
        "Conflitos devido a problemas de comunicação",
        "Dificuldade em iniciar contatos sociais",
        "Comportamento pouco assertivo devido a experiências negativas",
        "Não é atencioso, esquece de mandar postal, enviar pêsames, telefonar etc."
      ]
    },
    {
      id: "leisureHobbies",
      label: "Tempo livre / hobbies",
      examples: [
        "Incapaz de relaxar adequadamente durante o tempo livre",
        "Tem que praticar esportes intensamente para relaxar",
        "Lesões resultantes da prática excessiva de esportes",
        "Não consegue ler um livro ou assistir a um filme até o fim",
        "Está sempre ativo e, por isso, sente-se exausto",
        "Perde interesse rapidamente pelos hobbies",
        "Acidentes ao dirigir e/ou perda da carteira de motorista como resultado de condução imprudente",
        "Busca de adrenalina e/ou assume muitos riscos",
        "Problemas com a polícia ou justiça",
        "Come compulsivamente"
      ]
    },
    {
      id: "selfConfidenceImage",
      label: "Autoconfiança / autoimagem",
      examples: [
        "É inseguro devido aos comentários negativos de outras pessoas",
        "Autoimagem negativa devido aos erros frequentes",
        "Medo de fracasso quando começa algo novo",
        "Reação exagerada a críticas",
        "Perfeccionismo",
        "Sente-se triste devido aos sintomas do TDAH"
      ]
    }
  ],
  childhood: [
    {
      id: "academicLife",
      label: "Vida acadêmica",
      examples: [
        "Nível educacional mais baixo do que seria de esperar pelo QI",
        "Repetições de ano devido a problemas de concentração",
        "Formação não concluída/desistiu da escola",
        "Precisou de muito mais tempo do que o normal para terminar a formação escolar",
        "Conseguiu uma formação compatível com o QI com muita dificuldade",
        "Tinha dificuldade em fazer as lições de casa",
        "Frequentou o ensino especial devido aos sintomas",
        "Recebia comentários dos professores sobre seu comportamento ou sua concentração",
        "Prejuízo limitado por conseguir compensar com um QI elevado",
        "Prejuízo limitado por conseguir compensar com apoio de estrutura externa"
      ]
    },
    {
      id: "familyLife",
      label: "Vida familiar",
      examples: [
        "Discutia frequentemente com os irmãos/irmãs",
        "Era frequentemente castigado ou apanhava",
        "Tinha pouco contato com a família devido a conflitos",
        "Precisou ter a vida organizada pelos pais durante mais tempo do que o que seria normal"
      ]
    },
    {
      id: "socialContacts",
      label: "Interação social",
      examples: [
        "Tinha dificuldade em manter contatos sociais",
        "Teve conflitos devido a problemas de comunicação",
        "Tinha dificuldades em iniciar contatos sociais",
        "Tinha comportamento pouco assertivo como resultado de experiências negativas",
        "Tinha poucos amigos",
        "Era importunado",
        "Era excluído ou não era admitido para fazer parte de grupos",
        "Foi bully, praticava bullying"
      ]
    },
    {
      id: "leisureHobbies",
      label: "Tempo livre / hobbies",
      examples: [
        "Não conseguia relaxar no tempo livre",
        "Precisava praticar muito esporte para conseguir relaxar",
        "Teve lesões resultantes da prática excessiva de esportes",
        "Não conseguia ver um filme ou ler um livro até o fim",
        "Estava sempre em ação e, por isso, andava exausto",
        "Perdia rapidamente interesse pelos hobbies",
        "Buscava sensações intensas/arriscava demais",
        "Problemas com a polícia ou a justiça",
        "Teve muitos acidentes"
      ]
    },
    {
      id: "selfConfidenceImage",
      label: "Autoconfiança / autoimagem",
      examples: [
        "Era inseguro devido aos comentários negativos que recebia dos outros",
        "Tinha baixa autoestima devido aos erros frequentes",
        "Tinha medo de falhar quando começava algo novo",
        "Reagia exageradamente a críticas",
        "Era perfeccionista"
      ]
    }
  ]
};

const diva5CollateralOptions = {
  notAvailable: "ND - não disponível",
  none: "0 - sem/pouca confirmação",
  some: "1 - alguma confirmação",
  clear: "2 - confirmação clara"
};

function createDiva5PeriodState() {
  return {
    present: null,
    checkedExamples: [],
    other: "",
    note: ""
  };
}

function createDiva5State() {
  const criteria = {};

  diva5Items.forEach((item) => {
    criteria[item.code] = {
      adult: createDiva5PeriodState(),
      childhood: createDiva5PeriodState()
    };
  });

  return {
    criteria,
    onset: {
      severalSymptomsBefore12: null,
      laterOnsetAge: ""
    },
    impairment: {
      adult: {
        workEducation: false,
        familyRelationships: false,
        socialContacts: false,
        freeTimeHobbies: false,
        selfConfidenceSelfImage: false,
        other: "",
        evidenceInTwoOrMoreContexts: null
      },
      childhood: {
        school: false,
        family: false,
        socialContacts: false,
        freeTimeHobbies: false,
        selfConfidenceSelfImage: false,
        other: "",
        evidenceInTwoOrMoreContexts: null
      }
    },
    differential: {
      betterExplainedByAnotherDisorder: null,
      explanation: ""
    },
    collateral: {
      family: "ND",
      parentsOrFamily: "notAvailable",
      partnerOrFriend: "ND",
      schoolReports: "ND",
      notes: ""
    },
    severity: null,
    interviewDate: new Date().toISOString().slice(0, 10)
  };
}

function getDiva5State() {
  if (!answers.diva5) {
    answers.diva5 = createDiva5State();
  }

  return answers.diva5;
}

function getDiva5Domain(item) {
  return item.domain === "attention" ? "inattention" : "hyperImpulsive";
}

function getDiva5DomainItems(domain) {
  return diva5Items.filter((item) => getDiva5Domain(item) === domain);
}

function isDivaYes(value) {
  return value === true || value === "yes";
}

function isDivaNo(value) {
  return value === false || value === "no";
}

function countDiva5Symptoms(state, domain, period) {
  return getDiva5DomainItems(domain).filter((item) => isDivaYes(state.criteria[item.code][period].present)).length;
}

function getDiva5PresentCodes(state, period) {
  return diva5Items
    .filter((item) => isDivaYes(state.criteria[item.code][period].present))
    .map((item) => item.code);
}

function countDiva5ImpairmentAreas(state, period) {
  return diva5ImpairmentAreas[period].filter((area) => {
    return state.impairment[period][area.id].present === "yes";
  }).length;
}

function getDiva5ImpairmentLabels(state, period) {
  return diva5ImpairmentAreas[period]
    .filter((area) => state.impairment[period][area.id].present === "yes")
    .map((area) => area.label);
}

function getDiva5Presentation(adultAttentionCount, adultHyperImpCount) {
  if (adultAttentionCount >= 5 && adultHyperImpCount >= 5) {
    return "Apresentação combinada";
  }

  if (adultAttentionCount >= 5) {
    return "Apresentação predominantemente desatenta";
  }

  if (adultHyperImpCount >= 5) {
    return "Apresentação predominantemente hiperativa/impulsiva";
  }

  return "Critérios sintomáticos atuais insuficientes para apresentação DSM-5";
}

function countCheckedDivaExamples(periodState) {
  return periodState.checkedExamples.length;
}

function getCheckedDivaExampleTexts(item, period, periodState) {
  const examples = period === "adult" ? item.adultExamples : item.childhoodExamples;
  return periodState.checkedExamples.map((index) => examples[Number(index)]).filter(Boolean);
}

function getDivaStructuredPresentation(adultInattentionCount, adultHyperImpulsiveCount, compatible) {
  if (!compatible) {
    return "não aplicável";
  }

  if (adultInattentionCount >= 5 && adultHyperImpulsiveCount >= 5) {
    return "Apresentação combinada";
  }

  if (adultInattentionCount >= 5) {
    return "Apresentação predominantemente desatenta";
  }

  if (adultHyperImpulsiveCount >= 5) {
    return "Apresentação predominantemente hiperativa/impulsiva";
  }

  return "não aplicável";
}

function getDivaExampleCounts(state) {
  const counts = {
    byCriterion: {},
    adultInattentionExamplesTotal: 0,
    childhoodInattentionExamplesTotal: 0,
    adultHyperImpulsiveExamplesTotal: 0,
    childhoodHyperImpulsiveExamplesTotal: 0,
    totalAdultExamplesChecked: 0,
    totalChildhoodExamplesChecked: 0,
    totalExamplesChecked: 0
  };

  diva5Items.forEach((item) => {
    const adultCount = countCheckedDivaExamples(state.criteria[item.code].adult);
    const childhoodCount = countCheckedDivaExamples(state.criteria[item.code].childhood);
    const domain = getDiva5Domain(item);

    counts.byCriterion[item.code] = {
      adultCheckedExampleCount: adultCount,
      childhoodCheckedExampleCount: childhoodCount,
      totalCheckedExampleCount: adultCount + childhoodCount
    };

    counts.totalAdultExamplesChecked += adultCount;
    counts.totalChildhoodExamplesChecked += childhoodCount;

    if (domain === "inattention") {
      counts.adultInattentionExamplesTotal += adultCount;
      counts.childhoodInattentionExamplesTotal += childhoodCount;
    } else {
      counts.adultHyperImpulsiveExamplesTotal += adultCount;
      counts.childhoodHyperImpulsiveExamplesTotal += childhoodCount;
    }
  });

  counts.totalExamplesChecked = counts.totalAdultExamplesChecked + counts.totalChildhoodExamplesChecked;
  return counts;
}

function getDivaIdentifiedSymptoms(state, period = null) {
  const symptoms = [];

  diva5Items.forEach((item) => {
    ["adult", "childhood"].forEach((currentPeriod) => {
      if (period && period !== currentPeriod) {
        return;
      }

      const periodState = state.criteria[item.code][currentPeriod];

      if (!isDivaYes(periodState.present)) {
        return;
      }

      symptoms.push({
        code: item.code,
        label: item.title,
        period: currentPeriod,
        exampleCount: countCheckedDivaExamples(periodState),
        checkedExamples: getCheckedDivaExampleTexts(item, currentPeriod, periodState),
        other: periodState.other.trim(),
        note: periodState.note.trim()
      });
    });
  });

  return symptoms;
}

function getDivaMarkedExamplesWithoutPresent(state) {
  const items = [];

  diva5Items.forEach((item) => {
    ["adult", "childhood"].forEach((period) => {
      const periodState = state.criteria[item.code][period];

      if (countCheckedDivaExamples(periodState) > 0 && isDivaNo(periodState.present)) {
        items.push({
          code: item.code,
          label: item.title,
          period,
          exampleCount: countCheckedDivaExamples(periodState),
          checkedExamples: getCheckedDivaExampleTexts(item, period, periodState)
        });
      }
    });
  });

  return items;
}

function calculateDiva5Legacy() {
  const state = getDiva5State();
  const adultAttentionCount = countDiva5Symptoms(state, "attention", "adult");
  const adultHyperImpCount = countDiva5Symptoms(state, "hyperImp", "adult");
  const childhoodAttentionCount = countDiva5Symptoms(state, "attention", "childhood");
  const childhoodHyperImpCount = countDiva5Symptoms(state, "hyperImp", "childhood");
  const adultImpairmentCount = countDiva5ImpairmentAreas(state, "adult");
  const childhoodImpairmentCount = countDiva5ImpairmentAreas(state, "childhood");
  const adultSymptomCriteria = adultAttentionCount >= 5 || adultHyperImpCount >= 5;
  const childhoodSymptomCriteria = childhoodAttentionCount >= 5 || childhoodHyperImpCount >= 5;
  const onsetCriteria = state.onset.severalBefore12 === "yes";
  const impairmentCriteria = adultImpairmentCount >= 2 || childhoodImpairmentCount >= 2;
  const differentialValue = state.differential.betterExplainedByAnotherDisorder;
  const differentialCriteria = differentialValue === "no";
  const differentialPending = differentialValue === "yes" || differentialValue === "uncertain";
  const presentation = getDiva5Presentation(adultAttentionCount, adultHyperImpCount);

  let compatibility = "Critérios não preenchidos pela DIVA-5";

  if (differentialPending) {
    compatibility = "Conclusão pendente por diagnóstico diferencial";
  } else if (
    adultSymptomCriteria &&
    childhoodSymptomCriteria &&
    onsetCriteria &&
    impairmentCriteria &&
    differentialCriteria
  ) {
    compatibility = "Critérios compatíveis com TDAH pela DIVA-5";
  }

  return {
    type: "diva5",
    adultAttentionCount,
    adultHyperImpCount,
    childhoodAttentionCount,
    childhoodHyperImpCount,
    adultAttentionCriteria: adultAttentionCount >= 5,
    adultHyperImpCriteria: adultHyperImpCount >= 5,
    childhoodAttentionCriteria: childhoodAttentionCount >= 5,
    childhoodHyperImpCriteria: childhoodHyperImpCount >= 5,
    adultSymptomCriteria,
    childhoodSymptomCriteria,
    onsetCriteria,
    autoSeveralBefore12: childhoodAttentionCount >= 3 || childhoodHyperImpCount >= 3,
    adultImpairmentCount,
    childhoodImpairmentCount,
    adultImpairmentCriteria: adultImpairmentCount >= 2,
    childhoodImpairmentCriteria: childhoodImpairmentCount >= 2,
    impairmentCriteria,
    differentialValue,
    differentialCriteria,
    differentialPending,
    presentation,
    compatibility,
    adultPresentCodes: getDiva5PresentCodes(state, "adult"),
    childhoodPresentCodes: getDiva5PresentCodes(state, "childhood"),
    adultImpairmentLabels: getDiva5ImpairmentLabels(state, "adult"),
    childhoodImpairmentLabels: getDiva5ImpairmentLabels(state, "childhood"),
    differentialExplanation: state.differential.explanation,
    collateral: state.collateral,
    severity: state.severity
  };
}

function interpretDiva5(scores) {
  return scores.conclusion;
}

function calculateDiva5() {
  const state = getDiva5State();
  const adultInattentionCount = countDiva5Symptoms(state, "inattention", "adult");
  const adultHyperImpulsiveCount = countDiva5Symptoms(state, "hyperImpulsive", "adult");
  const childhoodInattentionCount = countDiva5Symptoms(state, "inattention", "childhood");
  const childhoodHyperImpulsiveCount = countDiva5Symptoms(state, "hyperImpulsive", "childhood");
  const adultInattentionPositive = adultInattentionCount >= 5;
  const adultHyperImpulsivePositive = adultHyperImpulsiveCount >= 5;
  const adultAnyDomainPositive = adultInattentionPositive || adultHyperImpulsivePositive;
  const childhoodSeveralSymptoms = isDivaYes(state.onset.severalSymptomsBefore12);
  const adultImpairmentOk = isDivaYes(state.impairment.adult.evidenceInTwoOrMoreContexts);
  const childhoodImpairmentOk = isDivaYes(state.impairment.childhood.evidenceInTwoOrMoreContexts);
  const differentialOk = isDivaNo(state.differential.betterExplainedByAnotherDisorder);
  const compatible =
    adultAnyDomainPositive && childhoodSeveralSymptoms && adultImpairmentOk && childhoodImpairmentOk && differentialOk;
  const exampleCounts = getDivaExampleCounts(state);
  const adultIdentifiedSymptoms = getDivaIdentifiedSymptoms(state, "adult");
  const childhoodIdentifiedSymptoms = getDivaIdentifiedSymptoms(state, "childhood");
  const examplesWithoutPresent = getDivaMarkedExamplesWithoutPresent(state);
  const onsetConflict =
    isDivaNo(state.onset.severalSymptomsBefore12) &&
    (childhoodInattentionCount >= 3 || childhoodHyperImpulsiveCount >= 3);

  return {
    type: "diva5",
    adultInattentionCount,
    adultHyperImpulsiveCount,
    childhoodInattentionCount,
    childhoodHyperImpulsiveCount,
    adultInattentionPositive,
    adultHyperImpulsivePositive,
    adultAnyDomainPositive,
    childhoodSeveralSymptoms,
    differentialOk,
    adultImpairmentOk,
    childhoodImpairmentOk,
    compatible,
    conclusion: compatible ? "compatível com TDAH pela DIVA-5/DSM-5" : "não compatível com TDAH pela DIVA-5/DSM-5",
    presentation: getDivaStructuredPresentation(adultInattentionCount, adultHyperImpulsiveCount, compatible),
    adultPresentCodes: getDiva5PresentCodes(state, "adult"),
    childhoodPresentCodes: getDiva5PresentCodes(state, "childhood"),
    exampleCounts,
    adultIdentifiedSymptoms,
    childhoodIdentifiedSymptoms,
    examplesWithoutPresent,
    onsetConflict,
    differentialValue: state.differential.betterExplainedByAnotherDisorder,
    differentialExplanation: state.differential.explanation,
    collateral: state.collateral,
    severity: state.severity,
    interviewDate: state.interviewDate,
    state
  };
}

function buildDivaFullSummary(scores) {
  const formatSymptoms = (symptoms) => {
    if (!symptoms.length) {
      return "Nenhum";
    }

    return symptoms
      .map((symptom) => {
        const details = [
          `${symptom.code} - ${symptom.label}`,
          `Exemplos marcados: ${symptom.exampleCount}`
        ];

        if (symptom.checkedExamples.length) {
          details.push(`Exemplos: ${symptom.checkedExamples.join("; ")}`);
        }

        if (symptom.other) {
          details.push(`Outros exemplos: ${symptom.other}`);
        }

        if (symptom.note) {
          details.push(`Nota clínica: ${symptom.note}`);
        }

        return details.join("\n");
      })
      .join("\n\n");
  };

  return [
    `DIVA-5 ${formatDivaDate(scores.interviewDate)}`,
    `Conclusão: ${scores.conclusion}`,
    `Apresentação: ${scores.presentation}`,
    `Gravidade: ${getDivaSeverityLabel(scores.severity)}`,
    `Sintomas atuais: desatenção ${scores.adultInattentionCount}/9; hiperatividade/impulsividade ${scores.adultHyperImpulsiveCount}/9`,
    `Sintomas na infância: desatenção ${scores.childhoodInattentionCount}/9; hiperatividade/impulsividade ${scores.childhoodHyperImpulsiveCount}/9`,
    `Exemplos: atual ${scores.exampleCounts.totalAdultExamplesChecked}; infância ${scores.exampleCounts.totalChildhoodExamplesChecked}; total ${scores.exampleCounts.totalExamplesChecked}`,
    `Critérios adicionais: início antes dos 12 anos ${yesNo(scores.childhoodSeveralSymptoms)}; prejuízo atual em 2+ contextos ${yesNo(scores.adultImpairmentOk)}; prejuízo na infância em 2+ contextos ${yesNo(scores.childhoodImpairmentOk)}; melhor explicado por outro transtorno ${yesNo(scores.differentialValue)}`,
    `Sintomas atuais identificados:\n${formatSymptoms(scores.adultIdentifiedSymptoms)}`,
    `Sintomas infantis identificados:\n${formatSymptoms(scores.childhoodIdentifiedSymptoms)}`
  ].join("\n\n");
}

function yesNo(value) {
  if (value === true || value === "yes") {
    return "Sim";
  }

  if (value === false || value === "no") {
    return "Não";
  }

  if (value === "uncertain") {
    return "Incerto";
  }

  return "Não respondido";
}

function getDiva5SeverityLabel(value) {
  const labels = {
    mild: "leve",
    moderate: "moderada",
    severe: "grave",
    notDefined: "não definida"
  };

  return labels[value] || "não definida";
}

function getDiva5DifferentialLine(scores) {
  if (scores.differentialValue === "no") {
    return "não melhor explicado por outro transtorno";
  }

  return "pendente";
}

function getDiva5ShortConclusion(scores) {
  if (scores.differentialPending) {
    return "pendente";
  }

  if (!scores.adultSymptomCriteria) {
    return "critérios sintomáticos atuais insuficientes";
  }

  if (scores.compatibility === "Critérios compatíveis com TDAH pela DIVA-5") {
    return "compatível com TDAH";
  }

  return "não compatível";
}

function formatCodes(codes) {
  return codes.length ? codes.join(", ") : "Nenhum";
}

const scales = [
  {
    id: "diva5",
    name: "DIVA-5 - Entrevista Diagnóstica para TDAH em Adultos",
    type: "structuredInterview",
    renderer: "diva5",
    description:
      "Entrevista diagnóstica estruturada para TDAH em adultos, baseada nos critérios do DSM-5. Deve ser preenchida por julgamento clínico, usando os exemplos como apoio.",
    calculate: calculateDiva5,
    interpret: interpretDiva5,
    getResultRows(scores, interpretation) {
      {
      const symptomLine = (symptom) => {
        const periodLabel = symptom.period === "adult" ? "Atual" : "Infância";
        const parts = [
          `${symptom.code} - ${symptom.label}: ${periodLabel}; exemplos marcados ${symptom.exampleCount}`
        ];

        if (symptom.checkedExamples.length) {
          parts.push(`Exemplos: ${symptom.checkedExamples.join("; ")}`);
        }

        if (symptom.other) {
          parts.push(`Outros exemplos: ${symptom.other}`);
        }

        if (symptom.note) {
          parts.push(`Nota clínica: ${symptom.note}`);
        }

        return parts.join("\n");
      };
      const rows = [
        {
          label: "Resultado diagnóstico",
          value: scores.compatible
            ? "Compatível com TDAH pela DIVA-5/DSM-5."
            : "Não compatível com TDAH pela DIVA-5/DSM-5.",
          className: scores.compatible ? "result-highlight" : ""
        },
        { label: "Apresentação", value: scores.presentation },
        { label: "Gravidade", value: getDivaSeverityLabel(scores.severity) },
        {
          label: "Contagem de sintomas",
          value: [
            `Desatenção atual: ${scores.adultInattentionCount}/9`,
            `Hiperatividade/impulsividade atual: ${scores.adultHyperImpulsiveCount}/9`,
            `Desatenção na infância: ${scores.childhoodInattentionCount}/9`,
            `Hiperatividade/impulsividade na infância: ${scores.childhoodHyperImpulsiveCount}/9`
          ].join("\n")
        },
        {
          label: "Critérios adicionais",
          value: [
            `Vários sintomas antes dos 12 anos: ${yesNo(scores.childhoodSeveralSymptoms)}`,
            `Prejuízo atual em 2+ contextos: ${yesNo(scores.adultImpairmentOk)}`,
            `Prejuízo na infância em 2+ contextos: ${yesNo(scores.childhoodImpairmentOk)}`,
            `Melhor explicado por outro transtorno: ${yesNo(scores.differentialValue)}`
          ].join("\n")
        },
        {
          label: "Contagem de exemplos",
          value: [
            `Exemplos marcados na idade adulta: ${scores.exampleCounts.totalAdultExamplesChecked}`,
            `Exemplos marcados na infância: ${scores.exampleCounts.totalChildhoodExamplesChecked}`,
            `Exemplos marcados no total: ${scores.exampleCounts.totalExamplesChecked}`,
            `Desatenção atual: ${scores.exampleCounts.adultInattentionExamplesTotal}`,
            `Desatenção infância: ${scores.exampleCounts.childhoodInattentionExamplesTotal}`,
            `Hiperatividade/impulsividade atual: ${scores.exampleCounts.adultHyperImpulsiveExamplesTotal}`,
            `Hiperatividade/impulsividade infância: ${scores.exampleCounts.childhoodHyperImpulsiveExamplesTotal}`
          ].join("\n")
        },
        {
          label: "Sintomas atuais identificados",
          value: scores.adultIdentifiedSymptoms.length
            ? scores.adultIdentifiedSymptoms.map(symptomLine).join("\n\n")
            : "Nenhum"
        },
        {
          label: "Sintomas na infância identificados",
          value: scores.childhoodIdentifiedSymptoms.length
            ? scores.childhoodIdentifiedSymptoms.map(symptomLine).join("\n\n")
            : "Nenhum"
        }
      ];

      if (scores.examplesWithoutPresent.length) {
        rows.push({
          label: "Exemplos marcados sem sintoma presente",
          value: scores.examplesWithoutPresent
            .map((item) => {
              const periodLabel = item.period === "adult" ? "Atual" : "Infância";
              const examples = item.checkedExamples.length ? `\nExemplos: ${item.checkedExamples.join("; ")}` : "";
              return `${item.code} - ${item.label}: ${periodLabel}; exemplos marcados ${item.exampleCount}.${examples}`;
            })
            .join("\n\n"),
          className: "result-alert"
        });
      }

      if (scores.onsetConflict) {
        rows.push({
          label: "Alerta de início",
          value:
            "Há 3 ou mais sintomas infantis em pelo menos um domínio, mas o início antes dos 12 anos foi marcado como Não. Revise a entrevista.",
          className: "result-alert"
        });
      }

      rows.push({
        label: "Resumo completo para cópia",
        value: buildDivaFullSummary(scores),
        className: "diva-full-summary"
      });

      return rows;
      }

      const symptomSummary = [
        "Domínio | Idade adulta | Infância | Critério adulto >=5 | Critério infância >=5",
        `Déficit de Atenção | Adulto ${scores.adultAttentionCount}/9 | Infância ${scores.childhoodAttentionCount}/9 | ${yesNo(scores.adultAttentionCriteria)} | ${yesNo(scores.childhoodAttentionCriteria)}`,
        `Hiperatividade/Impulsividade | Adulto ${scores.adultHyperImpCount}/9 | Infância ${scores.childhoodHyperImpCount}/9 | ${yesNo(scores.adultHyperImpCriteria)} | ${yesNo(scores.childhoodHyperImpCriteria)}`
      ].join("\n");
      const diagnosticCriteria = [
        `Sintomas atuais suficientes: ${yesNo(scores.adultSymptomCriteria)}`,
        `Sintomas na infância suficientes: ${yesNo(scores.childhoodSymptomCriteria)}`,
        `Vários sintomas antes dos 12 anos: ${yesNo(scores.onsetCriteria)}`,
        `Sugestão automática pelo preenchimento para início antes dos 12 anos: ${yesNo(scores.autoSeveralBefore12)}`,
        `Prejuízo em 2 ou mais contextos: ${yesNo(scores.impairmentCriteria)}`,
        `Não melhor explicado por outro transtorno mental: ${
          scores.differentialValue === "no" ? "Sim" : scores.differentialValue === "uncertain" ? "Incerto" : "Não"
        }`,
        `Compatibilidade final: ${interpretation}`
      ].join("\n");
      const impairmentRows = [
        `Idade adulta: ${scores.adultImpairmentCount}/5 áreas com prejuízo`,
        `Infância/adolescência: ${scores.childhoodImpairmentCount}/5 áreas com prejuízo`,
        `Evidência em 2 ou mais contextos na idade adulta: ${yesNo(scores.adultImpairmentCriteria)}`,
        `Evidência em 2 ou mais contextos na infância: ${yesNo(scores.childhoodImpairmentCriteria)}`,
        `Áreas adultas marcadas: ${scores.adultImpairmentLabels.length ? scores.adultImpairmentLabels.join(", ") : "Nenhuma"}`,
        `Áreas infância/adolescência marcadas: ${
          scores.childhoodImpairmentLabels.length ? scores.childhoodImpairmentLabels.join(", ") : "Nenhuma"
        }`
      ].join("\n");
      const collateralEntries = [
        scores.collateral.parentsOrFamily !== "notAvailable"
          ? `Pais/irmão/familiar/outros: ${diva5CollateralOptions[scores.collateral.parentsOrFamily]}`
          : "",
        scores.collateral.partnerOrFriend !== "notAvailable"
          ? `Parceiro(a)/bom amigo/outros: ${diva5CollateralOptions[scores.collateral.partnerOrFriend]}`
          : "",
        scores.collateral.schoolReports !== "notAvailable"
          ? `Relatórios escolares: ${diva5CollateralOptions[scores.collateral.schoolReports]}`
          : "",
        scores.collateral.notes.trim() ? `Notas: ${scores.collateral.notes.trim()}` : ""
      ].filter(Boolean);
      const rows = [
        { label: "Resumo dos sintomas", value: symptomSummary, className: "result-highlight" },
        { label: "Critérios diagnósticos", value: diagnosticCriteria },
        { label: "Apresentação clínica atual", value: scores.presentation },
        {
          label: "Sintomas presentes",
          value: `Idade adulta: ${formatCodes(scores.adultPresentCodes)}.\nInfância: ${formatCodes(scores.childhoodPresentCodes)}.`
        },
        { label: "Prejuízos", value: impairmentRows },
        {
          label: "Diagnóstico diferencial",
          value:
            scores.differentialValue === "no"
              ? "Sintomas não são mais bem explicados por outro transtorno mental."
              : `Conclusão pendente/limitada por diagnóstico diferencial.${
                  scores.differentialExplanation.trim()
                    ? `\nHipótese/comorbidades relevantes: ${scores.differentialExplanation.trim()}`
                    : ""
                }`,
          className: scores.differentialPending ? "diva-warning" : ""
        },
        { label: "Gravidade", value: getDiva5SeverityLabel(scores.severity) },
        { label: "Observação clínica curta", value: this.clinicalNote }
      ];

      if (collateralEntries.length) {
        rows.splice(6, 0, { label: "Confirmação por informantes", value: collateralEntries.join("\n") });
      }

      return rows;
    },
    clinicalNote:
      "A DIVA-5 é uma entrevista diagnóstica estruturada baseada nos critérios do DSM-5. A conclusão final depende do julgamento clínico, da avaliação de prejuízo, curso longitudinal, informações colaterais e diagnóstico diferencial."
  },
  {
    id: "panss",
    name: "PANSS — Esquizofrenia",
    description:
      "Escala clínica para avaliação de sintomas positivos, sintomas negativos e psicopatologia geral na esquizofrenia. Deve ser preenchida pelo clínico com base na entrevista, exame do estado mental e informações disponíveis. O resultado não substitui avaliação clínica.",
    instruction:
      "Pontue cada item de 1 a 7 conforme a gravidade observada na avaliação clínica.",
    instructionEn:
      "Esta versão não salva dados. Anote os resultados no prontuário se desejar acompanhar evolução ao longo do tempo.",
    questions: panssQuestions,
    options: panssOptions,
    calculate(answers) {
      const scores = {
        type: "panss",
        positiveScore: 0,
        negativeScore: 0,
        generalScore: 0,
        totalScore: 0,
        compositeScore: 0,
        itemRatings: []
      };

      this.questions.forEach((question, index) => {
        const value = Number(answers[index]);
        const itemRating = {
          code: question.code,
          text: question.pt,
          domain: question.domain,
          value,
          label: panssRatingLabels[value]
        };

        scores.itemRatings.push(itemRating);

        if (question.domain === "positive") {
          scores.positiveScore += value;
        }

        if (question.domain === "negative") {
          scores.negativeScore += value;
        }

        if (question.domain === "general") {
          scores.generalScore += value;
        }
      });

      scores.totalScore = scores.positiveScore + scores.negativeScore + scores.generalScore;
      scores.compositeScore = scores.positiveScore - scores.negativeScore;

      return scores;
    },
    interpret() {
      return "A PANSS deve ser interpretada por subescalas e pelo padrão clínico dos itens, não apenas pelo total. Comparações longitudinais devem considerar o mesmo método de aplicação, treinamento do avaliador, adesão ao tratamento, risco, funcionamento, uso de substâncias e efeitos adversos.";
    },
    getResultRows(scores, interpretation, incompleteQuestions) {
      const itemSummary = scores.itemRatings
        .map((item) => `${item.code} | ${item.text} | ${item.value} | ${item.label}`)
        .join("\n");

      return [
        { label: "PANSS — Esquizofrenia", value: "Resultado por subescalas e itens." },
        { label: "Escore da Escala Positiva", value: `${scores.positiveScore} / 49` },
        { label: "Escore da Escala Negativa", value: `${scores.negativeScore} / 49` },
        { label: "Escore da Escala de Psicopatologia Geral", value: `${scores.generalScore} / 112` },
        { label: "Total PANSS", value: `${scores.totalScore} / 210`, className: "result-highlight" },
        { label: "Índice composto Positiva - Negativa", value: String(scores.compositeScore) },
        { label: "Resumo dos itens marcados", value: `Código | Item | Pontuação | Rótulo\n${itemSummary}` },
        { label: "Interpretação", value: interpretation },
        {
          label: "Respostas incompletas",
          value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma."
        }
      ];
    }
  },
  {
    id: "cgi-sch",
    name: "CGI-SCH — Esquizofrenia",
    description:
      "Escala de impressão clínica global específica para esquizofrenia. Avalia a gravidade atual dos sintomas positivos, negativos, depressivos, cognitivos e a gravidade global. Deve ser preenchida pelo clínico com base na entrevista, exame do estado mental, evolução e informações disponíveis. O resultado não substitui avaliação clínica.",
    instruction:
      "Classifique a gravidade atual do quadro em cada domínio, considerando sua impressão clínica global no momento da avaliação.",
    instructionEn:
      "Esta escala não salva dados. Anote os resultados no prontuário se desejar acompanhar evolução ao longo do tempo.",
    questions: cgiSchQuestions,
    options: cgiSchOptions,
    calculate(answers) {
      const domains = this.questions.slice(0, 4).map((question, index) => {
        const value = Number(answers[index]);

        return {
          label: question.pt,
          value,
          interpretation: cgiSchInterpretations[value]
        };
      });

      const globalValue = Number(answers[4]);
      const descriptiveMean =
        domains.reduce((total, domain) => total + domain.value, 0) / domains.length;

      return {
        type: "domainRatings",
        domains,
        globalRating: {
          label: "Gravidade global",
          value: globalValue,
          interpretation: cgiSchInterpretations[globalValue]
        },
        descriptiveMean
      };
    },
    interpret() {
      return "A média dos domínios é apenas descritiva. A CGI-SCH é uma escala de impressão clínica e deve ser interpretada clinicamente.";
    },
    getResultRows(scores, interpretation, incompleteQuestions) {
      const rows = [
        { label: "CGI-SCH — Esquizofrenia", value: "Resultado por domínios, sem soma total." }
      ];

      scores.domains.forEach((domain) => {
        rows.push({
          label: domain.label,
          value: `${domain.value} / 7 — ${domain.interpretation}`
        });
      });

      rows.push({
        label: scores.globalRating.label,
        value: `${scores.globalRating.value} / 7 — ${scores.globalRating.interpretation}`,
        className: "result-highlight"
      });

      rows.push({
        label: "Média descritiva dos domínios sintomáticos",
        value: `${scores.descriptiveMean.toFixed(1)} / 7`
      });

      rows.push({ label: "Interpretação", value: interpretation });
      rows.push({
        label: "Respostas incompletas",
        value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma."
      });
      rows.push({ label: "Observação clínica", value: this.clinicalNote });

      return rows;
    },
    clinicalNote:
      "A CGI-SCH é uma escala clínica de gravidade e acompanhamento em esquizofrenia. Interpretar junto com entrevista, exame do estado mental, funcionamento, risco, adesão, uso de substâncias e efeitos adversos."
  },
  {
    id: "bdi",
    name: "Inventário de Depressão de Beck (BDI)",
    description:
      "Inventário para avaliação da intensidade de sintomas depressivos na última semana, incluindo hoje. Usar conforme material/licença adquirida. O resultado não substitui avaliação clínica.",
    instruction:
      "Este questionário consiste em 21 grupos de afirmações. Depois de ler cuidadosamente cada grupo, escolha a afirmação que descreve melhor a maneira como você tem se sentido na última semana, incluindo hoje. Tome cuidado de ler todas as afirmações de cada grupo antes de fazer sua escolha.",
    instructionEn:
      "No instrumento original, se várias afirmações parecerem se aplicar igualmente bem, o paciente pode marcar mais de uma. Para esta versão digital simples, escolha a alternativa de maior pontuação entre as que se aplicam.",
    questions: bdiQuestions,
    options: bdiOptions,
    calculate(answers) {
      return answers.reduce(
        (scores, answer, index) => {
          const question = this.questions[index];

          if (question.scored === false) {
            scores.intentionalWeightLoss = answer;
            return scores;
          }

          scores.total += Number(answer);

          if (question.itemLabel === "9") {
            scores.item9 = Number(answer);
          }

          return scores;
        },
        {
          total: 0,
          item9: 0,
          intentionalWeightLoss: null
        }
      );
    },
    interpret(scores) {
      if (scores.total <= 9) {
        return "Ausência de depressão ou sintomas depressivos mínimos.";
      }

      if (scores.total <= 18) {
        return "Depressão leve a moderada.";
      }

      if (scores.total <= 29) {
        return "Depressão moderada a severa.";
      }

      return "Depressão severa.";
    },
    getResultRows(scores, interpretation, incompleteQuestions) {
      const rows = [
        { label: "Pontuação total BDI", value: `${scores.total} / 63` },
        { label: "Classificação de gravidade", value: interpretation },
        { label: "Respostas incompletas", value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma." }
      ];

      if (scores.item9 > 0) {
        rows.push({
          label: "Aviso do item 9",
          value:
            "Item 9 positivo: avaliar risco suicida, presença de plano, intenção, acesso a meios, fatores de proteção e necessidade de conduta imediata.",
          className: "result-alert"
        });
      }

      if (scores.intentionalWeightLoss !== null) {
        rows.push({
          label: "Perda de peso intencional",
          value: scores.intentionalWeightLoss === 1 ? "Sim" : "Não"
        });
      }

      rows.push({ label: "Observação clínica curta", value: this.clinicalNote });

      return rows;
    },
    clinicalNote:
      "O BDI é um instrumento padronizado. Interpretar conforme manual/licença utilizada e contexto clínico. O resultado não substitui avaliação clínica."
  },
  {
    id: "bai",
    name: "Beck Anxiety Inventory (BAI) - Ansiedade",
    description:
      "Inventário para avaliação da intensidade de sintomas ansiosos durante a última semana, incluindo hoje. Usar conforme material/licença adquirida. O resultado não substitui avaliação clínica.",
    instruction:
      "Abaixo está uma lista de sintomas comuns de ansiedade. Por favor, leia cuidadosamente cada item da lista. Identifique o quanto você tem sido incomodado por cada sintoma durante a última semana, incluindo hoje.",
    questions: baiQuestions,
    options: baiOptions,
    calculate(answers) {
      return answers.reduce(
        (scores, answer) => {
          scores.total += Number(answer);
          return scores;
        },
        { total: 0 }
      );
    },
    interpret(scores) {
      if (scores.total <= 7) {
        return "Ansiedade mínima.";
      }

      if (scores.total <= 15) {
        return "Ansiedade leve.";
      }

      if (scores.total <= 25) {
        return "Ansiedade moderada.";
      }

      return "Ansiedade grave.";
    },
    getResultRows(scores, interpretation, incompleteQuestions) {
      return [
        { label: "Pontuação total BAI", value: `${scores.total} / 63` },
        { label: "Classificação de gravidade", value: interpretation },
        { label: "Respostas incompletas", value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma." },
        { label: "Observação clínica curta", value: this.clinicalNote }
      ];
    },
    clinicalNote:
      "O BAI é um instrumento padronizado. Interpretar conforme manual/licença utilizada e contexto clínico. O resultado não substitui avaliação clínica."
  },
  {
    id: "phq-9",
    name: "Patient Health Questionnaire-9 (PHQ-9) - Depressão",
    description:
      "Escala breve de rastreio e acompanhamento de sintomas depressivos nas últimas 2 semanas.",
    instruction:
      "Durante as últimas 2 semanas, com que frequência você foi incomodado(a) por algum dos seguintes problemas?",
    instructionEn:
      "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
    questions: phq9Questions,
    options: phq9Options,
    calculate(answers) {
      return answers.reduce(
        (scores, answer, index) => {
          const question = this.questions[index];

          if (question.scored === false) {
            scores.impact = answer;
            return scores;
          }

          scores.total += Number(answer);

          if (index === 8) {
            scores.item9 = Number(answer);
          }

          return scores;
        },
        {
          total: 0,
          item9: 0,
          impact: null
        }
      );
    },
    interpret(scores) {
      if (scores.total <= 4) {
        return "Sintomas depressivos mínimos ou ausentes.";
      }

      if (scores.total <= 9) {
        return "Sintomas depressivos leves.";
      }

      if (scores.total <= 14) {
        return "Sintomas depressivos moderados.";
      }

      if (scores.total <= 19) {
        return "Sintomas depressivos moderadamente graves.";
      }

      return "Sintomas depressivos graves.";
    },
    getResultRows(scores, interpretation, incompleteQuestions) {
      const screeningMessage =
        scores.total >= 10
          ? "Resultado acima do ponto de corte usual para rastreio positivo de depressão. Correlacionar com avaliação clínica."
          : "Resultado abaixo do ponto de corte usual para rastreio positivo, mas não exclui depressão se houver suspeita clínica.";

      const rows = [
        { label: "Pontuação total PHQ-9", value: `${scores.total} / 27` },
        { label: "Gravidade", value: interpretation },
        { label: "Rastreio", value: screeningMessage },
        { label: "Respostas incompletas", value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma." }
      ];

      if (scores.item9 > 0) {
        rows.push({
          label: "Aviso do item 9",
          value:
            "Item 9 positivo: avaliar risco suicida, presença de plano, intenção, acesso a meios, fatores de proteção e necessidade de conduta imediata.",
          className: "result-alert"
        });
      }

      if (scores.impact !== null) {
        const impactOption = phq9ImpactOptions.find((option) => option.value === scores.impact);
        rows.push({ label: "Impacto funcional", value: impactOption ? impactOption.label : String(scores.impact) });
      }

      rows.push({ label: "Observação clínica curta", value: this.clinicalNote });

      return rows;
    },
    clinicalNote:
      "O PHQ-9 é instrumento de rastreio e acompanhamento. O diagnóstico final é clínico."
  },
  {
    id: "wurs-25",
    name: "Wender Utah Rating Scale-25 (WURS-25)",
    description:
      "Como eu era quando criança. Avalie retrospectivamente o comportamento na infância, idealmente até os 7-12 anos.",
    questions: wurs25Questions,
    options: wursOptions,
    calculate(answers) {
      return answers.reduce(
        (scores, answer, index) => {
          const factor = this.questions[index].factor;

          scores.total += answer;
          scores[factor] += answer;

          return scores;
        },
        {
          total: 0,
          impulsivityBehavior: 0,
          inattentionSchool: 0,
          selfEsteemMood: 0
        }
      );
    },
    interpret(scores) {
      const messages = [];

      if (scores.total >= 46) {
        messages.push("Total >= 46: alta probabilidade de TDAH, com alta especificidade de 99%, minimizando falso-positivos.");
      }

      if (scores.total >= 39) {
        messages.push(
          "Total >= 39: ponto de corte ideal para distinguir TDAH de outros transtornos com sintomas similares, como bipolaridade ou borderline."
        );
      }

      if (scores.total >= 36) {
        messages.push("Total >= 36: sugestivo de TDAH, com alta sensibilidade de 96% no estudo original de Ward et al.");
      }

      if (messages.length === 0) {
        messages.push("Total < 36: abaixo dos pontos de corte informados para triagem retrospectiva de TDAH.");
      }

      return messages.join(" ");
    },
    getResultRows(scores, interpretation, incompleteQuestions) {
      return [
        { label: "Pontuação total", value: `${scores.total} de 100` },
        {
          label: "Fator 1 - Impulsividade / Problemas Comportamentais",
          value: `${scores.impulsivityBehavior} de 52`
        },
        {
          label: "Fator 2 - Desatenção / Problemas Escolares",
          value: `${scores.inattentionSchool} de 28`
        },
        {
          label: "Fator 3 - Autoestima / Humor Negativo",
          value: `${scores.selfEsteemMood} de 20`
        },
        { label: "Interpretação", value: interpretation },
        { label: "Respostas incompletas", value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma." },
        { label: "Observação clínica curta", value: this.clinicalNote }
      ];
    },
    clinicalNote:
      "Esta escala é uma ferramenta de triagem retrospectiva e não substitui o diagnóstico médico clínico."
  },
  {
    id: "wurs-61",
    name: "Wender Utah Rating Scale - versão completa (WURS-61)",
    description:
      "Avalia retrospectivamente características da infância. Responda pensando em como o paciente se comportava quando criança.",
    questions: wursQuestions,
    options: wursOptions,
    calculate(answers) {
      return answers.reduce(
        (scores, answer, index) => {
          scores.total += answer;

          if (this.questions[index].adhdSubscore) {
            scores.adhdSubscore += answer;
          }

          return scores;
        },
        { total: 0, adhdSubscore: 0 }
      );
    },
    interpret(scores) {
      const messages = [];

      if (scores.adhdSubscore >= 46) {
        messages.push(
          "Subescore >= 46: classificação correta de 86% dos pacientes com TDAH, com 99% de especificidade."
        );
      }

      if (scores.adhdSubscore >= 36) {
        messages.push("Subescore >= 36: alta sensibilidade para triagem inicial.");
      }

      if (messages.length === 0) {
        messages.push("Subescore < 36: abaixo dos pontos de corte informados para triagem retrospectiva de TDAH.");
      }

      return messages.join(" ");
    },
    getResultRows(scores, interpretation, incompleteQuestions) {
      return [
        { label: "Pontuação total WURS-61", value: `${scores.total} de 244` },
        { label: "Subescore TDAH WURS-25", value: `${scores.adhdSubscore} de 100` },
        { label: "Interpretação do subescore TDAH", value: interpretation },
        { label: "Respostas incompletas", value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma." },
        { label: "Observação clínica curta", value: this.clinicalNote }
      ];
    },
    clinicalNote:
      "A pontuação total WURS-61 fornece um perfil clínico qualitativo. A interpretação de TDAH deve usar o subescore de 25 itens e não substitui avaliação clínica."
  },
  {
    id: "asrs-18",
    name: "Adult ADHD Self-Report Scale v1.1 (ASRS-18)",
    description:
      "Avalia a frequência de sintomas de TDAH em adultos nos últimos 6 meses.",
    questions: asrsQuestions,
    options: asrsOptions,
    calculate(answers) {
      return answers.reduce(
        (scores, answer, index) => {
          const factor = this.questions[index].factor;

          scores.total += answer;
          scores[factor] += answer;
          scores.highestSubscale = Math.max(scores.inattention, scores.hyperactivityImpulsivity);

          return scores;
        },
        {
          total: 0,
          inattention: 0,
          hyperactivityImpulsivity: 0,
          highestSubscale: 0
        }
      );
    },
    interpret(scores) {
      if (scores.highestSubscale >= 21) {
        return "Maior escore >= 21: alta probabilidade de TDAH (sensibilidade de 92,2% e especificidade de 98,9%, conforme Leite, 2011).";
      }

      return "Maior escore < 21: baixa probabilidade de TDAH.";
    },
    getResultRows(scores, interpretation, incompleteQuestions) {
      return [
        { label: "Escore de Desatenção", value: `${scores.inattention} de 36` },
        {
          label: "Escore de Hiperatividade-Impulsividade",
          value: `${scores.hyperactivityImpulsivity} de 36`
        },
        { label: "Maior escore entre as subescalas", value: `${scores.highestSubscale} de 36` },
        { label: "Interpretação", value: interpretation },
        { label: "Respostas incompletas", value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma." },
        { label: "Observação clínica curta", value: this.clinicalNote }
      ];
    },
    clinicalNote:
      "A ASRS-18 é um instrumento de rastreio. O diagnóstico final é clínico e deve ser feito por especialista."
  },
  {
    id: "asrs-6",
    name: "Adult ADHD Self-Report Scale Screener v1.1 (ASRS-6)",
    description:
      "Instrumento breve de triagem inicial para identificar probabilidade de TDAH em adultos nos últimos 6 meses.",
    questions: asrsQuestions.slice(0, 6),
    options: asrsOptions,
    calculate(answers) {
      return answers.reduce(
        (scores, answer) => {
          scores.total += answer;

          if (answer >= 3) {
            scores.positiveSymptoms += 1;
          }

          return scores;
        },
        {
          total: 0,
          positiveSymptoms: 0
        }
      );
    },
    interpret(scores) {
      const positiveByTotal = scores.total >= 14;
      const positiveBySymptoms = scores.positiveSymptoms >= 4;

      if (positiveByTotal || positiveBySymptoms) {
        return "Rastreio positivo: os resultados sugerem uma alta probabilidade de TDAH. Recomenda-se uma avaliação clínica detalhada com um especialista.";
      }

      return "Rastreio negativo: os resultados não atingem os pontos de corte informados para rastreio positivo.";
    },
    getResultRows(scores, interpretation, incompleteQuestions) {
      const totalStatus = scores.total >= 14 ? "positivo" : "negativo";
      const symptomStatus = scores.positiveSymptoms >= 4 ? "positivo" : "negativo";

      return [
        { label: "Soma de pontos", value: `${scores.total} de 24 (${totalStatus}; corte >= 14)` },
        {
          label: "Contagem de sintomas positivos",
          value: `${scores.positiveSymptoms} de 6 (${symptomStatus}; corte >= 4)`
        },
        { label: "Resultado final", value: interpretation },
        { label: "Respostas incompletas", value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma." },
        { label: "Observação clínica curta", value: this.clinicalNote }
      ];
    },
    clinicalNote:
      "Aviso: esta é uma ferramenta de triagem inicial e não substitui o diagnóstico médico fundamentado na história de vida do paciente."
  },
  {
    id: "snap-iv-26",
    name: "SNAP-IV - versão de 26 itens",
    description:
      "Responda de acordo com o comportamento da criança nos últimos 6 meses. Se ela iniciou medicação recentemente, responda com base no comportamento anterior ao uso do remédio.",
    profiles: [
      { id: "child", label: "Criança (até 12 anos)" },
      { id: "adolescent", label: "Adolescente (13-17 anos)" }
    ],
    cutoffs: {
      child: {
        inattention: 6,
        hyperactivityImpulsivity: 6,
        odd: 4
      },
      adolescent: {
        inattention: 5,
        hyperactivityImpulsivity: 5,
        odd: 4
      }
    },
    subscales: {
      inattention: "Desatenção",
      hyperactivityImpulsivity: "Hiperatividade e Impulsividade",
      odd: "Transtorno de Oposição e Desafio - TOD"
    },
    questions: snapQuestions,
    options: snapOptions,
    calculate(answers) {
      return answers.reduce(
        (scores, answer, index) => {
          const factor = this.questions[index].factor;
          const symptomPresent = answer >= 2 ? 1 : 0;

          scores[factor] += symptomPresent;

          return scores;
        },
        {
          inattention: 0,
          hyperactivityImpulsivity: 0,
          odd: 0
        }
      );
    },
    interpret(scores, context) {
      const cutoffs = this.cutoffs[context.profile];
      const positiveSubscales = Object.keys(this.subscales).filter((subscaleId) => {
        return scores[subscaleId] >= cutoffs[subscaleId];
      });

      if (positiveSubscales.length === 0) {
        return "Nenhuma subescala atingiu o critério de mais sintomas que o esperado para o perfil selecionado.";
      }

      return `Critério de mais sintomas que o esperado atingido em: ${positiveSubscales
        .map((subscaleId) => this.subscales[subscaleId])
        .join(", ")}.`;
    },
    getResultRows(scores, interpretation, incompleteQuestions, context) {
      const cutoffs = this.cutoffs[context.profile];
      const selectedProfile = this.profiles.find((profile) => profile.id === context.profile);

      return [
        { label: "Perfil selecionado", value: selectedProfile.label },
        {
          label: "Desatenção",
          value: `${scores.inattention} de 9 sintomas presentes - ${
            scores.inattention >= cutoffs.inattention ? "critério atingido" : "critério não atingido"
          } (corte >= ${cutoffs.inattention})`
        },
        {
          label: "Hiperatividade e Impulsividade",
          value: `${scores.hyperactivityImpulsivity} de 9 sintomas presentes - ${
            scores.hyperactivityImpulsivity >= cutoffs.hyperactivityImpulsivity
              ? "critério atingido"
              : "critério não atingido"
          } (corte >= ${cutoffs.hyperactivityImpulsivity})`
        },
        {
          label: "Transtorno de Oposição e Desafio - TOD",
          value: `${scores.odd} de 8 sintomas presentes - ${
            scores.odd >= cutoffs.odd ? "critério atingido" : "critério não atingido"
          } (corte >= ${cutoffs.odd})`
        },
        { label: "Interpretação", value: interpretation },
        { label: "Respostas incompletas", value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma." },
        { label: "Observação clínica curta", value: this.clinicalNote }
      ];
    },
    clinicalNote:
      "O SNAP-IV avalia apenas o Critério A. O diagnóstico de TDAH exige a presença de sintomas antes dos 12 anos, em dois ou mais ambientes, com prejuízo claro e ausência de outras condições que expliquem os sintomas."
  }
];

const scaleSelect = document.querySelector("#scale-select");
const scaleDescription = document.querySelector("#scale-description");
const scaleForm = document.querySelector("#scale-form");
const questionsArea = document.querySelector("#questions-area");
const clearButton = document.querySelector("#clear-button");
const resultArea = document.querySelector("#result-area");
const resultList = document.querySelector("#result-list");

let answers = {};
let scaleContext = {};
let viewMode = "cards";
let incompleteQuestionIndexes = new Set();
let diva5IncompleteKeys = new Set();

function getSelectedScale() {
  return scales.find((scale) => scale.id === scaleSelect.value);
}

function getQuestionTitle(question) {
  return typeof question === "string" ? question : question.pt;
}

function getQuestionNumber(question, questionIndex) {
  if (typeof question === "string") {
    return String(questionIndex + 1);
  }

  return question.code || question.itemLabel || String(questionIndex + 1);
}

function populateScaleSelect() {
  scales.forEach((scale) => {
    const option = document.createElement("option");
    option.value = scale.id;
    option.textContent = scale.name;
    scaleSelect.appendChild(option);
  });
}

function renderQuestionText(legend, question, questionIndex) {
  const title = document.createElement("span");
  title.className = "question-title";
  title.textContent = `${getQuestionNumber(question, questionIndex)}. ${getQuestionTitle(question)}`;
  legend.appendChild(title);

  if (typeof question !== "string" && question.en) {
    const original = document.createElement("span");
    original.className = "question-original";
    original.textContent = question.en;
    legend.appendChild(original);
  }
}

function createQuestionText(question, questionIndex) {
  const wrapper = document.createElement("div");
  wrapper.className = "question-copy";

  const title = document.createElement("span");
  title.className = "question-title";
  title.textContent = `${getQuestionNumber(question, questionIndex)}. ${getQuestionTitle(question)}`;
  wrapper.appendChild(title);

  if (typeof question !== "string" && question.en) {
    const original = document.createElement("span");
    original.className = "question-original";
    original.textContent = question.en;
    wrapper.appendChild(original);
  }

  return wrapper;
}

function renderScaleSettings(scale) {
  if (!scale.profiles && !scale.instruction) {
    return;
  }

  const settings = document.createElement("section");
  settings.className = "scale-settings";

  if (scale.instruction) {
    const instruction = document.createElement("div");
    instruction.className = "scale-instruction";

    const instructionPt = document.createElement("p");
    instructionPt.className = "question-title";
    instructionPt.textContent = scale.instruction;
    instruction.appendChild(instructionPt);

    if (scale.instructionEn) {
      const instructionEn = document.createElement("p");
      instructionEn.className = "question-original";
      instructionEn.textContent = scale.instructionEn;
      instruction.appendChild(instructionEn);
    }

    settings.appendChild(instruction);
  }

  if (!scale.profiles) {
    questionsArea.appendChild(settings);
    return;
  }

  const title = document.createElement("h3");
  title.id = "profile-title";
  title.textContent = "Perfil avaliado";
  settings.setAttribute("aria-labelledby", "profile-title");

  const label = document.createElement("label");
  label.className = "field-label";
  label.setAttribute("for", "profile-select");
  label.textContent = "Selecione o perfil para aplicar os pontos de corte";

  const select = document.createElement("select");
  select.id = "profile-select";
  select.name = "profile";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Selecione o perfil";
  select.appendChild(placeholder);

  scale.profiles.forEach((profile) => {
    const option = document.createElement("option");
    option.value = profile.id;
    option.textContent = profile.label;
    option.selected = scaleContext.profile === profile.id;
    select.appendChild(option);
  });

  settings.append(title, label, select);
  questionsArea.appendChild(settings);
}

function renderViewControls(scale) {
  const controls = document.createElement("section");
  controls.className = "question-tools";

  const progress = document.createElement("p");
  progress.id = "progress-counter";
  progress.className = "progress-counter";
  controls.appendChild(progress);

  const switcher = document.createElement("div");
  switcher.className = "view-switcher";
  switcher.setAttribute("aria-label", "Visualizacao das perguntas");

  const label = document.createElement("span");
  label.textContent = "Visualizacao:";
  switcher.appendChild(label);

  [
    { id: "cards", label: "Cartoes" },
    { id: "table", label: "Tabela" }
  ].forEach((mode) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `view-button${viewMode === mode.id ? " active" : ""}`;
    button.dataset.viewMode = mode.id;
    button.textContent = mode.label;
    switcher.appendChild(button);
  });

  controls.appendChild(switcher);
  questionsArea.appendChild(controls);
  updateProgress(scale);
}

function appendDiva5RadioGroup(wrapper, name, value, options, dataset, legendText) {
  const group = document.createElement("fieldset");
  group.className = "diva-present-radio";

  const legend = document.createElement("legend");
  legend.textContent = legendText;
  group.appendChild(legend);

  options.forEach((option) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = name;
    input.value = option.value;
    input.checked = value === option.value;

    Object.keys(dataset).forEach((key) => {
      input.dataset[key] = dataset[key];
    });

    label.append(input, document.createTextNode(option.label));
    group.appendChild(label);
  });

  wrapper.appendChild(group);
}

function renderDiva5Examples(wrapper, examples, checkedExamples, datasetPrefix) {
  const list = document.createElement("div");
  list.className = "diva-examples-list";

  if (!examples.length) {
    const empty = document.createElement("p");
    empty.className = "diva-empty-examples";
    empty.textContent = "Exemplos oficiais não cadastrados. Cole os exemplos licenciados no array deste critério.";
    list.appendChild(empty);
    wrapper.appendChild(list);
    return;
  }

  examples.forEach((example, exampleIndex) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = checkedExamples.includes(exampleIndex);

    Object.keys(datasetPrefix).forEach((key) => {
      input.dataset[key] = datasetPrefix[key];
    });

    input.dataset.exampleIndex = String(exampleIndex);
    label.append(input, document.createTextNode(example));
    list.appendChild(label);
  });

  wrapper.appendChild(list);
}

function renderDiva5SymptomPeriod(item, period, labelText, state) {
  const periodState = state.criteria[item.code][period];
  const block = document.createElement("div");
  const incomplete = diva5IncompleteKeys.has(`criterion:${item.code}:${period}`);
  block.className = `diva-period-block${incomplete ? " diva-incomplete" : ""}`;

  const heading = document.createElement("h4");
  heading.textContent = labelText;
  block.appendChild(heading);

  const question = document.createElement("p");
  question.className = "diva-question";
  question.textContent =
    period === "adult"
      ? item.adultQuestion || item.question
      : item.childhoodQuestion || "Como era durante sua infância, na escola ou durante outras atividades?";
  block.appendChild(question);

  renderDiva5Examples(block, period === "adult" ? item.adultExamples : item.childhoodExamples, periodState.checkedExamples, {
    divaField: "symptomExample",
    divaCode: item.code,
    divaPeriod: period
  });

  const otherLabel = document.createElement("label");
  otherLabel.className = "field-label";
  otherLabel.textContent = "Outros exemplos";
  const otherInput = document.createElement("textarea");
  otherInput.value = periodState.other;
  otherInput.dataset.divaField = "symptomOther";
  otherInput.dataset.divaCode = item.code;
  otherInput.dataset.divaPeriod = period;
  otherLabel.appendChild(otherInput);
  block.appendChild(otherLabel);

  const noteLabel = document.createElement("label");
  noteLabel.className = "field-label";
  noteLabel.textContent = "Nota clínica";
  const noteInput = document.createElement("textarea");
  noteInput.value = periodState.note;
  noteInput.dataset.divaField = "symptomNote";
  noteInput.dataset.divaCode = item.code;
  noteInput.dataset.divaPeriod = period;
  noteLabel.appendChild(noteInput);
  block.appendChild(noteLabel);

  appendDiva5RadioGroup(
    block,
    `diva-${item.code}-${period}-present`,
    periodState.present,
    [
      { value: "yes", label: "Sim" },
      { value: "no", label: "Não" }
    ],
    {
      divaField: "symptomPresent",
      divaCode: item.code,
      divaPeriod: period
    },
    `Sintoma presente na ${period === "adult" ? "idade adulta" : "infância"}?`
  );

  return block;
}

function renderDiva5Item(item, state) {
  const card = document.createElement("article");
  const incomplete =
    diva5IncompleteKeys.has(`criterion:${item.code}:adult`) ||
    diva5IncompleteKeys.has(`criterion:${item.code}:childhood`);
  card.className = `diva-item-card${incomplete ? " diva-incomplete" : ""}`;

  const header = document.createElement("div");
  header.className = "diva-item-header";

  const badge = document.createElement("span");
  badge.className = "diva-code-badge";
  badge.textContent = item.code;

  const title = document.createElement("h3");
  title.textContent = item.title;
  header.append(badge, title);

  const question = document.createElement("p");
  question.className = "diva-question";
  question.textContent = item.question;

  const columns = document.createElement("div");
  columns.className = "diva-two-columns";
  columns.append(
    renderDiva5SymptomPeriod(item, "adult", "Idade adulta", state),
    renderDiva5SymptomPeriod(item, "childhood", "Infância", state)
  );

  card.append(header, question, columns);
  return card;
}

function renderDiva5Progress(state) {
  {
  const adultAnswered = diva5Items.filter((item) => state.criteria[item.code].adult.present !== null).length;
  const childhoodAnswered = diva5Items.filter((item) => state.criteria[item.code].childhood.present !== null).length;
  const additionalAnswered = [
    state.onset.severalSymptomsBefore12,
    state.impairment.adult.evidenceInTwoOrMoreContexts,
    state.impairment.childhood.evidenceInTwoOrMoreContexts,
    state.differential.betterExplainedByAnotherDisorder
  ].filter((value) => value !== null).length;

  return `Respondidas ${adultAnswered + childhoodAnswered + additionalAnswered} / 40`;
  }

  const adultAnswered = diva5Items.filter((item) => state.symptoms[item.code].adult.present !== null).length;
  const childhoodAnswered = diva5Items.filter((item) => state.symptoms[item.code].childhood.present !== null).length;
  const impairmentAnswered = ["adult", "childhood"].reduce((total, period) => {
    return (
      total +
      diva5ImpairmentAreas[period].filter((area) => state.impairment[period][area.id].present !== null).length
    );
  }, 0);
  const part3Complete =
    state.onset.severalBefore12 !== null &&
    impairmentAnswered === 10 &&
    state.differential.betterExplainedByAnotherDisorder !== null;

  return `Sintomas adulto: ${adultAnswered}/18 respondidos. Sintomas infância: ${childhoodAnswered}/18 respondidos. Prejuízos: ${impairmentAnswered}/10 áreas respondidas. Parte 3: ${
    part3Complete ? "completa" : "incompleta"
  }.`;
}

function updateDiva5Progress() {
  const progress = document.querySelector("#diva5-progress-counter");

  if (progress) {
    progress.textContent = renderDiva5Progress(getDiva5State());
  }
}

function createDiva5Section(title, className = "") {
  const details = document.createElement("details");
  details.className = `diva-section${className ? ` ${className}` : ""}`;
  details.open = true;

  const summary = document.createElement("summary");
  summary.textContent = title;
  details.appendChild(summary);

  return details;
}

function renderDiva5DomainSection(title, domain, state) {
  const section = createDiva5Section(title);

  diva5Items
    .filter((item) => item.domain === domain)
    .forEach((item) => {
      section.appendChild(renderDiva5Item(item, state));
    });

  questionsArea.appendChild(section);
}

function renderDiva5Onset(state) {
  const onsetBlock = document.createElement("div");
  onsetBlock.className = `diva-item-card${diva5IncompleteKeys.has("onset:severalBefore12") ? " diva-incomplete" : ""}`;

  const suggestion = document.createElement("p");
  suggestion.className = "diva-warning";
  suggestion.textContent = `Sugestão automática pelo preenchimento: ${
    countDiva5Symptoms(state, "inattention", "childhood") >= 3 ||
    countDiva5Symptoms(state, "hyperImpulsive", "childhood") >= 3
      ? "Sim"
      : "Não"
  }`;

  appendDiva5RadioGroup(
    onsetBlock,
    "diva-onset-before-12",
    state.onset.severalSymptomsBefore12,
    [
      { value: "yes", label: "Sim" },
      { value: "no", label: "Não" }
    ],
    { divaField: "onsetBefore12" },
    "Vários sintomas estavam presentes antes dos 12 anos?"
  );

  const ageWrapper = document.createElement("label");
  ageWrapper.className = `field-label${state.onset.severalSymptomsBefore12 === "no" ? "" : " hidden"}`;
  ageWrapper.dataset.divaToggle = "laterOnsetAge";
  ageWrapper.textContent = "Se não, idade aproximada de início dos sintomas";
  const ageInput = document.createElement("input");
  ageInput.type = "number";
  ageInput.min = "0";
  ageInput.value = state.onset.laterOnsetAge;
  ageInput.dataset.divaField = "laterOnsetAge";
  ageWrapper.appendChild(ageInput);

  onsetBlock.append(suggestion, ageWrapper);
  return onsetBlock;
}

function renderDiva5ImpairmentArea(period, area, state) {
  const areaState = state.impairment[period][area.id];
  const card = document.createElement("article");
  card.className = `diva-impairment-area${
    diva5IncompleteKeys.has(`impairment:${period}:${area.id}`) ? " diva-incomplete" : ""
  }`;

  const title = document.createElement("h4");
  title.textContent = area.label;
  card.appendChild(title);

  renderDiva5Examples(card, area.examples, areaState.examples, {
    divaField: "impairmentExample",
    divaPeriod: period,
    divaArea: area.id
  });

  const otherLabel = document.createElement("label");
  otherLabel.className = "field-label";
  otherLabel.textContent = "Outros";
  const otherInput = document.createElement("textarea");
  otherInput.value = areaState.other;
  otherInput.dataset.divaField = "impairmentOther";
  otherInput.dataset.divaPeriod = period;
  otherInput.dataset.divaArea = area.id;
  otherLabel.appendChild(otherInput);
  card.appendChild(otherLabel);

  appendDiva5RadioGroup(
    card,
    `diva-impairment-${period}-${area.id}`,
    areaState.present,
    [
      { value: "yes", label: "Sim" },
      { value: "no", label: "Não" }
    ],
    {
      divaField: "impairmentPresent",
      divaPeriod: period,
      divaArea: area.id
    },
    "Há prejuízo clinicamente relevante nesta área?"
  );

  return card;
}

function renderDiva5Impairment(state) {
  {
    const wrapper = document.createElement("div");
    wrapper.className = "diva-two-columns";
    const groups = [
      {
        period: "adult",
        title: "Idade adulta",
        contexts: [
          ["workEducation", "Trabalho / educação"],
          ["familyRelationships", "Família / relacionamentos"],
          ["socialContacts", "Contatos sociais"],
          ["freeTimeHobbies", "Tempo livre / hobbies"],
          ["selfConfidenceSelfImage", "Autoconfiança / autoimagem"]
        ]
      },
      {
        period: "childhood",
        title: "Infância",
        contexts: [
          ["school", "Escola"],
          ["family", "Família"],
          ["socialContacts", "Contatos sociais"],
          ["freeTimeHobbies", "Tempo livre / hobbies"],
          ["selfConfidenceSelfImage", "Autoconfiança / autoimagem"]
        ]
      }
    ];

    groups.forEach((group) => {
      const column = document.createElement("div");
      column.className = `diva-period-block${
        diva5IncompleteKeys.has(`impairment:${group.period}:evidence`) ? " diva-incomplete" : ""
      }`;
      const title = document.createElement("h3");
      title.textContent = group.title;
      column.appendChild(title);

      const list = document.createElement("div");
      list.className = "diva-examples-list";

      group.contexts.forEach(([field, labelText]) => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = state.impairment[group.period][field];
        input.dataset.divaField = "impairmentExample";
        input.dataset.divaPeriod = group.period;
        input.dataset.divaArea = field;
        label.append(input, document.createTextNode(labelText));
        list.appendChild(label);
      });

      column.appendChild(list);

      const otherLabel = document.createElement("label");
      otherLabel.className = "field-label";
      otherLabel.textContent = "Outro contexto / observação";
      const otherInput = document.createElement("textarea");
      otherInput.value = state.impairment[group.period].other;
      otherInput.dataset.divaField = "impairmentOther";
      otherInput.dataset.divaPeriod = group.period;
      otherLabel.appendChild(otherInput);
      column.appendChild(otherLabel);

      appendDiva5RadioGroup(
        column,
        `diva-impairment-${group.period}-evidence`,
        state.impairment[group.period].evidenceInTwoOrMoreContexts,
        [
          { value: "yes", label: "Sim" },
          { value: "no", label: "Não" }
        ],
        {
          divaField: "impairmentPresent",
          divaPeriod: group.period
        },
        "Há prejuízo em 2 ou mais contextos?"
      );

      wrapper.appendChild(column);
    });

    return wrapper;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "diva-two-columns";

  [
    { period: "adult", title: "Idade adulta" },
    { period: "childhood", title: "Infância/adolescência" }
  ].forEach((group) => {
    const column = document.createElement("div");
    column.className = "diva-period-block";
    const title = document.createElement("h3");
    title.textContent = group.title;
    column.appendChild(title);

    diva5ImpairmentAreas[group.period].forEach((area) => {
      column.appendChild(renderDiva5ImpairmentArea(group.period, area, state));
    });

    wrapper.appendChild(column);
  });

  return wrapper;
}

function renderDiva5Differential(state) {
  const block = document.createElement("div");
  block.className = `diva-item-card${diva5IncompleteKeys.has("differential:betterExplained") ? " diva-incomplete" : ""}`;

  appendDiva5RadioGroup(
    block,
    "diva-differential",
    state.differential.betterExplainedByAnotherDisorder,
    [
      { value: "no", label: "Não" },
      { value: "yes", label: "Sim" }
    ],
    { divaField: "differential" },
    "Sintomas são mais bem explicados por outro transtorno mental?"
  );

  const explanationLabel = document.createElement("label");
  explanationLabel.className = `field-label${
    state.differential.betterExplainedByAnotherDisorder === "yes" ||
    state.differential.betterExplainedByAnotherDisorder === "uncertain"
      ? ""
      : " hidden"
  }`;
  explanationLabel.dataset.divaToggle = "differentialExplanation";
  explanationLabel.textContent = "Descrever hipótese diferencial/comorbidades relevantes";
  const explanation = document.createElement("textarea");
  explanation.value = state.differential.explanation;
  explanation.dataset.divaField = "differentialExplanation";
  explanationLabel.appendChild(explanation);
  block.appendChild(explanationLabel);

  return block;
}

function renderDiva5Collateral(state) {
  const block = document.createElement("div");
  block.className = "diva-item-card";

  [
    ["parentsOrFamily", "Pais/irmão/familiar/outros"],
    ["partnerOrFriend", "Parceiro(a)/bom amigo/outros"],
    ["schoolReports", "Relatórios escolares"]
  ].forEach(([field, labelText]) => {
    const label = document.createElement("label");
    label.className = "field-label";
    label.textContent = labelText;

    const select = document.createElement("select");
    select.dataset.divaField = "collateral";
    select.dataset.divaCollateral = field;

    Object.keys(diva5CollateralOptions).forEach((optionValue) => {
      const option = document.createElement("option");
      option.value = optionValue;
      option.textContent = diva5CollateralOptions[optionValue];
      option.selected = state.collateral[field] === optionValue;
      select.appendChild(option);
    });

    label.appendChild(select);
    block.appendChild(label);
  });

  const notesLabel = document.createElement("label");
  notesLabel.className = "field-label";
  notesLabel.textContent = "Notas";
  const notes = document.createElement("textarea");
  notes.value = state.collateral.notes;
  notes.dataset.divaField = "collateralNotes";
  notesLabel.appendChild(notes);
  block.appendChild(notesLabel);

  const severityLabel = document.createElement("label");
  severityLabel.className = "field-label";
  severityLabel.textContent = "Gravidade";
  const severity = document.createElement("select");
  severity.dataset.divaField = "severity";

  [
    ["notDefined", "Não definida"],
    ["mild", "Leve"],
    ["moderate", "Moderada"],
    ["severe", "Grave"]
  ].forEach(([value, text]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    option.selected = state.severity === value;
    severity.appendChild(option);
  });

  severityLabel.appendChild(severity);
  block.appendChild(severityLabel);

  return block;
}

function renderDiva5(scale) {
  const state = getDiva5State();
  questionsArea.innerHTML = "";

  const settings = document.createElement("section");
  settings.className = "scale-settings";
  const description = document.createElement("p");
  description.className = "question-title";
  description.textContent =
    "Os exemplos são apoio para a entrevista. A presença do sintoma e do prejuízo deve ser marcada manualmente pelo clínico.";
  const progress = document.createElement("p");
  progress.id = "diva5-progress-counter";
  progress.className = "progress-counter";
  progress.textContent = renderDiva5Progress(state);
  const dateLabel = document.createElement("label");
  dateLabel.className = "field-label";
  dateLabel.textContent = "Data da entrevista/aplicação";
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = state.interviewDate;
  dateInput.dataset.divaField = "interviewDate";
  dateLabel.appendChild(dateInput);
  settings.append(description, dateLabel, progress);
  questionsArea.appendChild(settings);

  renderDiva5DomainSection("Parte 1: Déficit de Atenção", "attention", state);
  renderDiva5DomainSection("Parte 2: Hiperatividade/Impulsividade", "hyperImp", state);

  const part3 = createDiva5Section("Parte 3: Início e prejuízos");
  part3.appendChild(renderDiva5Onset(state));
  const impairmentTitle = document.createElement("h3");
  impairmentTitle.textContent = "Prejuízos devido aos sintomas";
  part3.append(impairmentTitle, renderDiva5Impairment(state));
  questionsArea.appendChild(part3);

  const finalSection = createDiva5Section("Parte 4: Resumo/Folha de pontuação");
  finalSection.append(renderDiva5Differential(state), renderDiva5Collateral(state));
  questionsArea.appendChild(finalSection);
}

function createOptionInput(questionIndex, option) {
  const input = document.createElement("input");
  input.type = "radio";
  input.name = `question-${questionIndex}`;
  input.value = String(option.value);
  input.dataset.questionIndex = String(questionIndex);
  input.checked = answers[questionIndex] === option.value;

  return input;
}

function getQuestionOptions(scale, question) {
  return question.options || scale.options;
}

function shouldRenderGroupHeader(scale, question, questionIndex) {
  if (!question.domain) {
    return false;
  }

  if (questionIndex === 0) {
    return true;
  }

  return scale.questions[questionIndex - 1].domain !== question.domain;
}

function createGroupHeader(question) {
  const header = document.createElement("div");
  header.className = "question-group";
  header.textContent = panssDomainLabels[question.domain] || question.domain;
  return header;
}

function renderCardQuestions(scale) {
  scale.questions.forEach((question, questionIndex) => {
    if (shouldRenderGroupHeader(scale, question, questionIndex)) {
      questionsArea.appendChild(createGroupHeader(question));
    }

    const fieldset = document.createElement("fieldset");
    fieldset.className = `question${incompleteQuestionIndexes.has(questionIndex) ? " incomplete" : ""}`;
    fieldset.dataset.questionIndex = String(questionIndex);

    const legend = document.createElement("legend");
    renderQuestionText(legend, question, questionIndex);
    fieldset.appendChild(legend);

    const optionsWrapper = document.createElement("div");
    optionsWrapper.className = "options";

    getQuestionOptions(scale, question).forEach((option) => {
      const optionLabel = document.createElement("label");
      optionLabel.className = "option";

      const input = createOptionInput(questionIndex, option);

      const labelText = document.createElement("span");
      labelText.className = "option-text";
      labelText.textContent = option.label;

      if (option.detail) {
        const detail = document.createElement("small");
        detail.textContent = option.detail;
        labelText.appendChild(detail);
      }

      optionLabel.append(input, labelText);
      optionsWrapper.appendChild(optionLabel);
    });

    fieldset.appendChild(optionsWrapper);
    questionsArea.appendChild(fieldset);
  });
}

function renderTableQuestions(scale) {
  const wrapper = document.createElement("div");
  wrapper.className = "table-wrapper";

  const table = document.createElement("table");
  table.className = "questions-table";

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");

  const leadingHeaders = scale.id === "panss" ? ["Código", "Item", "Domínio"] : ["Item", "Pergunta"];

  leadingHeaders.forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    headRow.appendChild(th);
  });

  scale.options.forEach((option) => {
    const th = document.createElement("th");
    th.textContent = option.label;
    headRow.appendChild(th);
  });

  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  scale.questions.forEach((question, questionIndex) => {
    if (shouldRenderGroupHeader(scale, question, questionIndex)) {
      const groupRow = document.createElement("tr");
      groupRow.className = "table-group-row";

      const groupCell = document.createElement("td");
      groupCell.colSpan = leadingHeaders.length + scale.options.length;
      groupCell.textContent = panssDomainLabels[question.domain] || question.domain;

      groupRow.appendChild(groupCell);
      tbody.appendChild(groupRow);
    }

    const row = document.createElement("tr");
    row.className = incompleteQuestionIndexes.has(questionIndex) ? "incomplete" : "";
    row.dataset.questionIndex = String(questionIndex);

    if (scale.id === "panss") {
      const codeCell = document.createElement("td");
      codeCell.className = "item-cell";
      codeCell.textContent = question.code;
      row.appendChild(codeCell);

      const itemCell = document.createElement("td");
      itemCell.className = "question-cell";
      itemCell.textContent = question.pt;
      row.appendChild(itemCell);

      const domainCell = document.createElement("td");
      domainCell.className = "domain-cell";
      domainCell.textContent = panssDomainLabels[question.domain];
      row.appendChild(domainCell);
    } else {
      const itemCell = document.createElement("td");
      itemCell.className = "item-cell";
      itemCell.textContent = getQuestionNumber(question, questionIndex);
      row.appendChild(itemCell);

      const questionCell = document.createElement("td");
      questionCell.className = "question-cell";
      questionCell.appendChild(createQuestionText(question, questionIndex));
      row.appendChild(questionCell);
    }

    getQuestionOptions(scale, question).forEach((option) => {
      const optionCell = document.createElement("td");
      optionCell.className = "radio-cell";
      const label = document.createElement("label");
      label.className = "table-radio";
      label.appendChild(createOptionInput(questionIndex, option));

      if (question.options) {
        const optionText = document.createElement("span");
        optionText.className = "table-option-text";
        optionText.textContent = option.label;
        label.appendChild(optionText);
      }

      optionCell.appendChild(label);
      row.appendChild(optionCell);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  wrapper.appendChild(table);
  questionsArea.appendChild(wrapper);
}

function renderQuestions(scale) {
  questionsArea.innerHTML = "";

  if (scale.id === "diva5") {
    renderDiva5(scale);
    return;
  }

  renderScaleSettings(scale);
  renderViewControls(scale);

  if (viewMode === "table") {
    renderTableQuestions(scale);
    return;
  }

  renderCardQuestions(scale);
}

function updateProgress(scale = getSelectedScale()) {
  const progress = document.querySelector("#progress-counter");

  if (!progress || !scale) {
    return;
  }

  const requiredQuestions = scale.questions.filter((question) => !question.optional);
  const answeredCount = scale.questions.reduce((total, question, questionIndex) => {
    if (question.optional) {
      return total;
    }

    return Object.prototype.hasOwnProperty.call(answers, questionIndex) ? total + 1 : total;
  }, 0);

  progress.textContent = `Respondidas: ${answeredCount} / ${requiredQuestions.length}`;
}

function updateIncompleteHighlight(questionIndex) {
  const currentItem = questionsArea.querySelector(`[data-question-index="${questionIndex}"]`);

  if (!currentItem) {
    return;
  }

  currentItem.classList.toggle("incomplete", incompleteQuestionIndexes.has(questionIndex));
}

function resetResult() {
  const prontuarioLine = resultArea.querySelector(".prontuario-line-box");

  if (prontuarioLine) {
    prontuarioLine.remove();
  }

  resultList.innerHTML = "";
  resultArea.classList.add("hidden");
}

function clearAnswers() {
  answers = {};
  scaleContext = {};
  incompleteQuestionIndexes.clear();
  diva5IncompleteKeys.clear();
  scaleForm.reset();
  resetResult();

  const selectedScale = getSelectedScale();

  if (selectedScale) {
    renderQuestions(selectedScale);
  }
}

function appendResultRow(label, value, className = "") {
  const row = document.createElement("div");
  const term = document.createElement("dt");
  const description = document.createElement("dd");

  if (className) {
    row.className = className;
  }

  term.textContent = label;
  description.textContent = value;

  row.append(term, description);
  resultList.appendChild(row);
}

function showIncompleteResult(incompleteQuestions) {
  const prontuarioLine = resultArea.querySelector(".prontuario-line-box");

  if (prontuarioLine) {
    prontuarioLine.remove();
  }

  resultList.innerHTML = "";
  appendResultRow("Pendências", `Complete: ${incompleteQuestions.join(", ")}.`);
  appendResultRow("Observação clínica curta", "Complete todos os itens obrigatórios antes de interpretar o resultado.");
  resultArea.classList.remove("hidden");
}

function showResult(scale, scores, interpretation, incompleteQuestions, context) {
  const existingProntuarioLine = resultArea.querySelector(".prontuario-line-box");

  if (existingProntuarioLine) {
    existingProntuarioLine.remove();
  }

  resultList.innerHTML = "";

  const prontuarioLine = renderProntuarioLine(scores.prontuarioLine, scores.fullSummary || "");

  if (prontuarioLine) {
    resultArea.insertBefore(prontuarioLine, resultList);
  }

  scale.getResultRows(scores, interpretation, incompleteQuestions, context).forEach((row) => {
    appendResultRow(row.label, row.value, row.className);
  });

  resultArea.classList.remove("hidden");
}

function collectAnswers(scale) {
  const orderedAnswers = [];
  const incompleteQuestions = [];
  const incompleteIndexes = [];

  scale.questions.forEach((question, questionIndex) => {
    if (!Object.prototype.hasOwnProperty.call(answers, questionIndex)) {
      if (!question.optional) {
        incompleteQuestions.push(getQuestionNumber(question, questionIndex));
        incompleteIndexes.push(questionIndex);
      }

      orderedAnswers.push(null);
      return;
    }

    orderedAnswers.push(Number(answers[questionIndex]));
  });

  return { answers: orderedAnswers, incompleteQuestions, incompleteIndexes };
}

function collectContext(scale) {
  const context = {};
  const incompleteSettings = [];

  if (scale.profiles) {
    const profileSelect = document.querySelector("#profile-select");
    context.profile = profileSelect ? profileSelect.value : "";
    scaleContext.profile = context.profile;

    if (!context.profile) {
      incompleteSettings.push("perfil avaliado");
    }
  }

  return { context, incompleteSettings };
}

function updateDiva5StateFromInput(target) {
  if (!target.dataset.divaField) {
    return false;
  }

  const state = getDiva5State();
  const field = target.dataset.divaField;

  if (field === "symptomPresent") {
    state.criteria[target.dataset.divaCode][target.dataset.divaPeriod].present = target.value;
    diva5IncompleteKeys.delete(`criterion:${target.dataset.divaCode}:${target.dataset.divaPeriod}`);
  }

  if (field === "symptomExample") {
    const checkedExamples = state.criteria[target.dataset.divaCode][target.dataset.divaPeriod].checkedExamples;
    const exampleIndex = Number(target.dataset.exampleIndex);

    if (target.checked && !checkedExamples.includes(exampleIndex)) {
      checkedExamples.push(exampleIndex);
    }

    if (!target.checked) {
      state.criteria[target.dataset.divaCode][target.dataset.divaPeriod].checkedExamples = checkedExamples.filter(
        (index) => index !== exampleIndex
      );
    }
  }

  if (field === "symptomOther") {
    state.criteria[target.dataset.divaCode][target.dataset.divaPeriod].other = target.value;
  }

  if (field === "symptomNote") {
    state.criteria[target.dataset.divaCode][target.dataset.divaPeriod].note = target.value;
  }

  if (field === "onsetBefore12") {
    state.onset.severalSymptomsBefore12 = target.value;
    diva5IncompleteKeys.delete("onset:severalBefore12");

    const laterOnset = questionsArea.querySelector('[data-diva-toggle="laterOnsetAge"]');
    if (laterOnset) {
      laterOnset.classList.toggle("hidden", target.value !== "no");
    }
  }

  if (field === "laterOnsetAge") {
    state.onset.laterOnsetAge = target.value;
  }

  if (field === "interviewDate") {
    state.interviewDate = target.value;
  }

  if (field === "impairmentPresent") {
    state.impairment[target.dataset.divaPeriod].evidenceInTwoOrMoreContexts = target.value;
    diva5IncompleteKeys.delete(`impairment:${target.dataset.divaPeriod}:evidence`);
  }

  if (field === "impairmentExample") {
    state.impairment[target.dataset.divaPeriod][target.dataset.divaArea] = target.checked;
  }

  if (field === "impairmentOther") {
    state.impairment[target.dataset.divaPeriod].other = target.value;
  }

  if (field === "differential") {
    state.differential.betterExplainedByAnotherDisorder = target.value;
    diva5IncompleteKeys.delete("differential:betterExplained");

    const explanation = questionsArea.querySelector('[data-diva-toggle="differentialExplanation"]');
    if (explanation) {
      explanation.classList.toggle("hidden", target.value !== "yes" && target.value !== "uncertain");
    }
  }

  if (field === "differentialExplanation") {
    state.differential.explanation = target.value;
  }

  if (field === "collateral") {
    state.collateral[target.dataset.divaCollateral] = target.value;
  }

  if (field === "collateralNotes") {
    state.collateral.notes = target.value;
  }

  if (field === "severity") {
    state.severity = target.value;
  }

  updateDiva5Progress();
  return true;
}

function collectDiva5IncompleteItems() {
  {
    const state = getDiva5State();
    const incompleteItems = [];
    const incompleteKeys = new Set();

    diva5Items.forEach((item) => {
      if (state.criteria[item.code].adult.present === null) {
        incompleteItems.push(`${item.code} idade adulta`);
        incompleteKeys.add(`criterion:${item.code}:adult`);
      }

      if (state.criteria[item.code].childhood.present === null) {
        incompleteItems.push(`${item.code} infância`);
        incompleteKeys.add(`criterion:${item.code}:childhood`);
      }
    });

    if (state.onset.severalSymptomsBefore12 === null) {
      incompleteItems.push("início antes dos 12 anos");
      incompleteKeys.add("onset:severalBefore12");
    }

    if (state.impairment.adult.evidenceInTwoOrMoreContexts === null) {
      incompleteItems.push("prejuízo atual em 2+ contextos");
      incompleteKeys.add("impairment:adult:evidence");
    }

    if (state.impairment.childhood.evidenceInTwoOrMoreContexts === null) {
      incompleteItems.push("prejuízo na infância em 2+ contextos");
      incompleteKeys.add("impairment:childhood:evidence");
    }

    if (state.differential.betterExplainedByAnotherDisorder === null) {
      incompleteItems.push("diagnóstico diferencial");
      incompleteKeys.add("differential:betterExplained");
    }

    return { incompleteItems, incompleteKeys };
  }

  const state = getDiva5State();
  const incompleteItems = [];
  const incompleteKeys = new Set();

  diva5Items.forEach((item) => {
    if (state.symptoms[item.code].adult.present === null) {
      incompleteItems.push(`${item.code} idade adulta`);
      incompleteKeys.add(`symptom:${item.code}:adult`);
    }

    if (state.symptoms[item.code].childhood.present === null) {
      incompleteItems.push(`${item.code} infância`);
      incompleteKeys.add(`symptom:${item.code}:childhood`);
    }
  });

  if (state.onset.severalBefore12 === null) {
    incompleteItems.push("idade de início antes dos 12 anos");
    incompleteKeys.add("onset:severalBefore12");
  }

  ["adult", "childhood"].forEach((period) => {
    diva5ImpairmentAreas[period].forEach((area) => {
      if (state.impairment[period][area.id].present === null) {
        incompleteItems.push(`${period === "adult" ? "prejuízo adulto" : "prejuízo infância"} - ${area.label}`);
        incompleteKeys.add(`impairment:${period}:${area.id}`);
      }
    });
  });

  if (state.differential.betterExplainedByAnotherDisorder === null) {
    incompleteItems.push("diagnóstico diferencial");
    incompleteKeys.add("differential:betterExplained");
  }

  return { incompleteItems, incompleteKeys };
}

function handleDiva5Submit(selectedScale) {
  const { incompleteItems, incompleteKeys } = collectDiva5IncompleteItems();

  if (incompleteItems.length > 0) {
    diva5IncompleteKeys = incompleteKeys;
    renderQuestions(selectedScale);
    showIncompleteResult(incompleteItems);
    const firstIncomplete = questionsArea.querySelector(".diva-incomplete");
    if (firstIncomplete) {
      firstIncomplete.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  diva5IncompleteKeys.clear();
  renderQuestions(selectedScale);
  const scores = selectedScale.calculate();
  const interpretation = selectedScale.interpret(scores);
  scores.prontuarioLine = buildProntuarioLine(selectedScale, scores, interpretation, {});
  scores.fullSummary = buildDivaFullSummary(scores);

  showResult(selectedScale, scores, interpretation, [], {});
}

scaleSelect.addEventListener("change", () => {
  const selectedScale = getSelectedScale();
  answers = {};
  scaleContext = {};
  incompleteQuestionIndexes.clear();
  diva5IncompleteKeys.clear();
  clearAnswers();

  if (!selectedScale) {
    scaleDescription.textContent = "";
    questionsArea.innerHTML = "";
    scaleForm.classList.add("hidden");
    return;
  }

  scaleDescription.textContent = selectedScale.description;
  renderQuestions(selectedScale);
  scaleForm.classList.remove("hidden");
});

scaleForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedScale = getSelectedScale();

  if (!selectedScale) {
    return;
  }

  if (selectedScale.id === "diva5") {
    handleDiva5Submit(selectedScale);
    return;
  }

  const { answers, incompleteQuestions, incompleteIndexes } = collectAnswers(selectedScale);
  const { context, incompleteSettings } = collectContext(selectedScale);
  const incompleteItems = [
    ...incompleteSettings,
    ...incompleteQuestions.map((questionNumber) => `item ${questionNumber}`)
  ];

  if (incompleteItems.length > 0) {
    incompleteQuestionIndexes = new Set(incompleteIndexes);
    renderQuestions(selectedScale);
    showIncompleteResult(incompleteItems);
    return;
  }

  incompleteQuestionIndexes.clear();
  renderQuestions(selectedScale);
  const scores = selectedScale.calculate(answers, context);
  const interpretation = selectedScale.interpret(scores, context);
  scores.prontuarioLine = buildProntuarioLine(selectedScale, scores, interpretation, context);

  showResult(selectedScale, scores, interpretation, incompleteQuestions, context);
});

questionsArea.addEventListener("change", (event) => {
  const target = event.target;
  const selectedScale = getSelectedScale();

  if (!selectedScale) {
    return;
  }

  if (selectedScale.id === "diva5") {
    updateDiva5StateFromInput(target);
    return;
  }

  if (target.matches('input[type="radio"][data-question-index]')) {
    const questionIndex = Number(target.dataset.questionIndex);
    answers[questionIndex] = Number(target.value);
    incompleteQuestionIndexes.delete(questionIndex);
    updateProgress(selectedScale);
    updateIncompleteHighlight(questionIndex);
    return;
  }

  if (target.matches("#profile-select")) {
    scaleContext.profile = target.value;
    resetResult();
  }
});

questionsArea.addEventListener("input", (event) => {
  const selectedScale = getSelectedScale();

  if (!selectedScale || selectedScale.id !== "diva5") {
    return;
  }

  updateDiva5StateFromInput(event.target);
});

questionsArea.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view-mode]");

  if (!button) {
    return;
  }

  viewMode = button.dataset.viewMode;
  renderQuestions(getSelectedScale());
});

clearButton.addEventListener("click", clearAnswers);

resultArea.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy-prontuario]");

  if (!button) {
    return;
  }

  const box = button.closest(".prontuario-line-box");
  const line = box ? box.querySelector(".prontuario-line-text") : null;
  const fullSummary = box ? box.querySelector(".prontuario-full-summary") : null;
  const feedback = box ? box.querySelector(".copy-feedback") : null;
  const textToCopy = button.dataset.copyTarget === "full" && fullSummary ? fullSummary.value : line ? line.textContent : "";

  if (!textToCopy) {
    return;
  }

  try {
    await copyTextToClipboard(textToCopy);

    if (feedback) {
      feedback.textContent = button.dataset.copyTarget === "full" ? "Resumo copiado." : "Linha copiada.";
      window.setTimeout(() => {
        feedback.textContent = "";
      }, 2000);
    }
  } catch (error) {
    if (feedback) {
      feedback.textContent =
        error.message === "Texto selecionado para cópia manual."
          ? "Texto selecionado para cópia manual."
          : "Não foi possível copiar.";
    }
  }
});

populateScaleSelect();
