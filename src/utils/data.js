// Longevity Tests Data
export const longevityTests = [
    {
        id: 'longevity-score',
        icon: '🎯',
        title: 'Longevity Score',
        titleFi: 'Pitkäikäisyyspistemäärä',
        description: 'Comprehensive assessment of your overall lifestyle balance and longevity potential.',
        descriptionFi: 'Kattava arvio elämäntapatasapainostasi ja pitkäikäisyyspotentiaalistasi.',
        duration: '10 min',
        questions: [
            { id: 'sleep', question: 'How many hours do you sleep per night?', type: 'number', min: 0, max: 12 },
            { id: 'exercise', question: 'How many days per week do you exercise?', type: 'number', min: 0, max: 7 },
            { id: 'stress', question: 'Rate your stress level (1-10)', type: 'number', min: 1, max: 10 },
            { id: 'diet', question: 'How many servings of vegetables do you eat daily?', type: 'number', min: 0, max: 10 },
            { id: 'social', question: 'How often do you engage in social activities? (days/week)', type: 'number', min: 0, max: 7 }
        ]
    },
    {
        id: 'biological-age',
        icon: '🧬',
        title: 'Biological Age Estimate',
        titleFi: 'Biologisen iän arvio',
        description: 'Non-clinical estimation of your biological age based on lifestyle factors.',
        descriptionFi: 'Ei-kliininen arvio biologisesta iästäsi elämäntapatekijöiden perusteella.',
        duration: '8 min',
        questions: [
            { id: 'chronological_age', question: 'What is your chronological age?', type: 'number', min: 18, max: 100 },
            { id: 'smoking', question: 'Do you smoke?', type: 'select', options: ['Never', 'Former', 'Current'] },
            { id: 'alcohol', question: 'Alcohol consumption per week', type: 'select', options: ['None', '1-3 drinks', '4-7 drinks', '8+ drinks'] },
            { id: 'bmi', question: 'Your BMI (if known)', type: 'number', min: 15, max: 50 },
            { id: 'chronic_conditions', question: 'Number of chronic conditions', type: 'number', min: 0, max: 10 }
        ]
    },
    {
        id: 'sleep-quality',
        icon: '😴',
        title: 'Sleep Quality & Recovery',
        titleFi: 'Unen laatu ja palautuminen',
        description: 'Assess your sleep patterns and recovery quality.',
        descriptionFi: 'Arvioi unimalliasi ja palautumisesi laatua.',
        duration: '5 min',
        questions: [
            { id: 'sleep_hours', question: 'Average hours of sleep per night', type: 'number', min: 0, max: 12 },
            { id: 'sleep_quality', question: 'Rate your sleep quality (1-10)', type: 'number', min: 1, max: 10 },
            { id: 'wake_refreshed', question: 'How often do you wake feeling refreshed?', type: 'select', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
            { id: 'sleep_schedule', question: 'Do you maintain a consistent sleep schedule?', type: 'select', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] }
        ]
    },
    {
        id: 'stress-recovery',
        icon: '🧘',
        title: 'Stress & Recovery Balance',
        titleFi: 'Stressi ja palautumistasapaino',
        description: 'Evaluate your stress levels and recovery practices.',
        descriptionFi: 'Arvioi stressitasojasi ja palautumiskäytäntöjäsi.',
        duration: '6 min',
        questions: [
            { id: 'stress_level', question: 'Average daily stress level (1-10)', type: 'number', min: 1, max: 10 },
            { id: 'relaxation', question: 'Hours per week dedicated to relaxation', type: 'number', min: 0, max: 40 },
            { id: 'meditation', question: 'Do you practice meditation or mindfulness?', type: 'select', options: ['Never', 'Rarely', 'Weekly', 'Daily'] },
            { id: 'work_life_balance', question: 'Rate your work-life balance (1-10)', type: 'number', min: 1, max: 10 }
        ]
    },
    {
        id: 'metabolic-activity',
        icon: '🔥',
        title: 'Metabolic & Activity Habits',
        titleFi: 'Aineenvaihdunta ja aktiivisuustottumukset',
        description: 'Understand your metabolic health and physical activity patterns.',
        descriptionFi: 'Ymmärrä aineenvaihduntaterveytesi ja liikunta-aktiivisuutesi.',
        duration: '7 min',
        questions: [
            { id: 'exercise_days', question: 'Days per week with 30+ min activity', type: 'number', min: 0, max: 7 },
            { id: 'cardio', question: 'Hours of cardio per week', type: 'number', min: 0, max: 20 },
            { id: 'steps', question: 'Average daily steps', type: 'number', min: 0, max: 30000 },
            { id: 'sitting_hours', question: 'Hours sitting per day', type: 'number', min: 0, max: 24 }
        ]
    },
    {
        id: 'strength-mobility',
        icon: '💪',
        title: 'Strength & Mobility Habits',
        titleFi: 'Voima ja liikkuvuustottumukset',
        description: 'Assess your strength training and mobility practices.',
        descriptionFi: 'Arvioi voimaharjoittelua ja liikkuvuusharjoittelua.',
        duration: '5 min',
        questions: [
            { id: 'strength_training', question: 'Days per week of strength training', type: 'number', min: 0, max: 7 },
            { id: 'flexibility', question: 'Do you practice stretching or yoga?', type: 'select', options: ['Never', 'Rarely', 'Weekly', 'Daily'] },
            { id: 'balance', question: 'Can you stand on one leg for 30+ seconds?', type: 'select', options: ['No', 'With difficulty', 'Yes, easily'] },
            { id: 'mobility_issues', question: 'Do you experience mobility limitations?', type: 'select', options: ['Frequently', 'Sometimes', 'Rarely', 'Never'] }
        ]
    }
];

// Supplements Data
export const supplements = [
    {
        id: 'nad-precursors',
        title: 'NAD+ Precursors (NMN/NR)',
        titleFi: 'NAD+ esiasteet (NMN/NR)',
        category: 'Cellular Energy',
        categoryFi: 'Soluenergia',
        evidence: 'moderate',
        description: 'May support cellular energy production and DNA repair mechanisms.',
        descriptionFi: 'Voi tukea soluenergian tuotantoa ja DNA:n korjausmekanismeja.',
        timing: 'Morning, with or without food',
        timingFi: 'Aamulla, ruoan kanssa tai ilman',
        safety: 'Generally well-tolerated. Consult healthcare provider if on medications.'
    },
    {
        id: 'omega-3',
        title: 'Omega-3 Fatty Acids',
        titleFi: 'Omega-3 rasvahapot',
        category: 'Cardiovascular & Cognitive',
        categoryFi: 'Sydän ja aivot',
        evidence: 'strong',
        description: 'Supports heart health, brain function, and reduces inflammation.',
        descriptionFi: 'Tukee sydänterveyttä, aivotoimintaa ja vähentää tulehdusta.',
        timing: 'With meals containing fat',
        timingFi: 'Rasvaa sisältävän aterian kanssa',
        safety: 'Well-established safety profile. May interact with blood thinners.'
    },
    {
        id: 'vitamin-d',
        title: 'Vitamin D3',
        titleFi: 'D3-vitamiini',
        category: 'Bone & Immune Health',
        categoryFi: 'Luusto ja immuniteetti',
        evidence: 'strong',
        description: 'Essential for bone health, immune function, and mood regulation.',
        descriptionFi: 'Välttämätön luuston terveydelle, immuunijärjestelmälle ja mielialan säätelylle.',
        timing: 'Morning with fat-containing meal',
        timingFi: 'Aamulla rasvaa sisältävän aterian kanssa',
        safety: 'Safe at recommended doses. Regular testing advised for optimal levels.'
    },
    {
        id: 'magnesium',
        title: 'Magnesium',
        titleFi: 'Magnesium',
        category: 'Sleep & Recovery',
        categoryFi: 'Uni ja palautuminen',
        evidence: 'strong',
        description: 'Supports muscle relaxation, sleep quality, and stress management.',
        descriptionFi: 'Tukee lihasten rentoutumista, unen laatua ja stressinhallintaa.',
        timing: 'Evening, 1-2 hours before bed',
        timingFi: 'Illalla, 1-2 tuntia ennen nukkumaanmenoa',
        safety: 'Generally safe. May cause digestive discomfort at high doses.'
    },
    {
        id: 'resveratrol',
        title: 'Resveratrol',
        titleFi: 'Resveratroli',
        category: 'Longevity & Antioxidant',
        categoryFi: 'Pitkäikäisyys ja antioksidantti',
        evidence: 'moderate',
        description: 'Polyphenol that may activate longevity pathways and provide antioxidant benefits.',
        descriptionFi: 'Polyfenoli, joka voi aktivoida pitkäikäisyysreittejä ja tarjota antioksidanttihyötyjä.',
        timing: 'Morning with food',
        timingFi: 'Aamulla ruoan kanssa',
        safety: 'Generally safe. Limited long-term human data.'
    },
    {
        id: 'creatine',
        title: 'Creatine Monohydrate',
        titleFi: 'Kreatiinimonohydraatti',
        category: 'Muscle & Strength',
        categoryFi: 'Lihakset ja voima',
        evidence: 'strong',
        description: 'Supports muscle strength, power output, and may benefit cognitive function.',
        descriptionFi: 'Tukee lihasvoimaa, tehotulosta ja voi hyödyttää kognitiivista toimintaa.',
        timing: 'Any time of day, with or without food',
        timingFi: 'Mihin aikaan päivästä tahansa, ruoan kanssa tai ilman',
        safety: 'Extensively studied, very safe. Stay well-hydrated.'
    }
];

// Guides Data
export const guides = [
    {
        id: 'nad-cellular-energy',
        title: 'NAD+ and Cellular Energy',
        titleFi: 'NAD+ ja soluenergia',
        summary: 'Understanding the role of NAD+ in aging and cellular metabolism.',
        summaryFi: 'NAD+:n roolin ymmärtäminen ikääntymisessä ja solun aineenvaihdunnassa.',
        content: 'NAD+ (nicotinamide adenine dinucleotide) is a crucial coenzyme found in all living cells...'
    },
    {
        id: 'autophagy-basics',
        title: 'Autophagy Basics',
        titleFi: 'Autofagian perusteet',
        summary: 'How cellular recycling contributes to longevity and health.',
        summaryFi: 'Kuinka solujen kierrätys edistää pitkäikäisyyttä ja terveyttä.',
        content: 'Autophagy is the body\'s way of cleaning out damaged cells and regenerating newer, healthier ones...'
    },
    {
        id: 'sleep-circadian',
        title: 'Sleep and Circadian Rhythm',
        titleFi: 'Uni ja vuorokausirytmi',
        summary: 'The critical role of sleep quality and timing in longevity.',
        summaryFi: 'Unen laadun ja ajoituksen kriittinen rooli pitkäikäisyydessä.',
        content: 'Sleep is not just rest—it\'s when your body performs critical repair and maintenance...'
    },
    {
        id: 'vo2-max',
        title: 'VO₂ Max and Cardiovascular Fitness',
        titleFi: 'VO₂ Max ja sydän- ja verisuonikunto',
        summary: 'Why cardiovascular fitness is one of the strongest predictors of longevity.',
        summaryFi: 'Miksi sydän- ja verisuonikunto on yksi vahvimmista pitkäikäisyyden ennustajista.',
        content: 'VO₂ max represents the maximum amount of oxygen your body can utilize during exercise...'
    },
    {
        id: 'muscle-mass-aging',
        title: 'Muscle Mass and Aging',
        titleFi: 'Lihasmassa ja ikääntyminen',
        summary: 'The importance of maintaining muscle mass for healthy aging.',
        summaryFi: 'Lihasmassan ylläpidon tärkeys terveelle ikääntymiselle.',
        content: 'Sarcopenia, the age-related loss of muscle mass, is a major factor in frailty and mortality...'
    },
    {
        id: 'inflammation-recovery',
        title: 'Inflammation and Recovery',
        titleFi: 'Tulehdus ja palautuminen',
        summary: 'Understanding chronic inflammation and recovery strategies.',
        summaryFi: 'Kroonisen tulehduksen ja palautumisstrategioiden ymmärtäminen.',
        content: 'Chronic low-grade inflammation is linked to most age-related diseases...'
    },
    {
        id: 'stress-physiology',
        title: 'Stress Physiology',
        titleFi: 'Stressifysiologia',
        summary: 'How chronic stress affects aging and what you can do about it.',
        summaryFi: 'Kuinka krooninen stressi vaikuttaa ikääntymiseen ja mitä voit tehdä asialle.',
        content: 'Chronic stress triggers a cascade of hormonal and physiological changes...'
    }
];
