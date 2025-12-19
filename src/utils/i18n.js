// Translations for English and Finnish
export const translations = {
    en: {
        hero: {
            title: "Longevity IQ — Understand Your Health. Extend Your Healthspan.",
            subtitle: "A science-informed platform for longevity assessments, lifestyle insights, and long-term health tracking.",
            cta: {
                primary: "Create your Longevity Profile",
                secondary: "Explore Longevity Tests"
            }
        },
        about: {
            title: "What Is Longevity IQ",
            healthspan: {
                title: "Healthspan vs Lifespan",
                text: "Longevity isn't just about living longer—it's about living better. We focus on healthspan: the years you spend in good health, free from chronic disease and disability."
            },
            measure: {
                title: "Why Measuring Matters",
                text: "Lifestyle factors—sleep, nutrition, exercise, stress—compound over time. Understanding where you stand today helps you make informed decisions for tomorrow."
            },
            tracking: {
                title: "Tracking Over Time",
                text: "One-time tests provide snapshots. Continuous tracking reveals trends, helping you see what's working and what needs adjustment in your longevity journey."
            }
        },
        tests: {
            title: "Longevity Tests & Assessments",
            subtitle: "Quick, educational assessments that help you understand your lifestyle factors. Not diagnostic—informational.",
            disclaimer: "⚠️ These assessments do not replace medical advice. Always consult healthcare professionals for medical decisions."
        },
        dashboard: {
            title: "Your Personal Longevity Dashboard",
            feature1: {
                title: "Track Your Progress",
                text: "View all your test results in one place, with clear visualizations and trend analysis."
            },
            feature2: {
                title: "Your Data, Your Control",
                text: "Complete data ownership with bank-level encryption. Export or delete anytime."
            },
            feature3: {
                title: "Actionable Insights",
                text: "Receive evidence-based suggestions tailored to your results—no medical claims, just guidance."
            }
        },
        supplements: {
            title: "Supplements & Interventions",
            subtitle: "Educational overviews with evidence-level indicators. This is guidance, not prescription."
        },
        guides: {
            title: "Science & Guides"
        }
    },
    fi: {
        hero: {
            title: "Longevity IQ — Ymmärrä terveytesi. Pidennä terveysikääsi.",
            subtitle: "Tieteeseen perustuva alusta pitkäikäisyyden arviointiin, elämäntapaohjaukseen ja pitkäaikaiseen terveyden seurantaan.",
            cta: {
                primary: "Luo pitkäikäisyysprofiilisi",
                secondary: "Tutustu pitkäikäisyystesteihin"
            }
        },
        about: {
            title: "Mikä on Longevity IQ",
            healthspan: {
                title: "Terveysikä vs. elinikä",
                text: "Pitkäikäisyys ei ole vain pidempää elämää—se on parempaa elämää. Keskitymme terveysikään: vuosiin, jotka vietät hyvässä terveydessä, vailla kroonisia sairauksia ja toimintarajoitteita."
            },
            measure: {
                title: "Miksi mittaaminen on tärkeää",
                text: "Elämäntapatekijät—uni, ravinto, liikunta, stressi—kertautuvat ajan myötä. Ymmärtämällä missä olet tänään, voit tehdä tietoon perustuvia päätöksiä huomiselle."
            },
            tracking: {
                title: "Seuranta ajan mittaan",
                text: "Kertaluonteiset testit antavat hetkellisiä tilannekuvia. Jatkuva seuranta paljastaa trendit ja auttaa näkemään, mikä toimii ja mikä kaipaa muutosta pitkäikäisyysmatkallasi."
            }
        },
        tests: {
            title: "Pitkäikäisyystestit ja arvioinnit",
            subtitle: "Nopeat, opettavaiset arvioinnit, jotka auttavat ymmärtämään elämäntapatekijöitäsi. Ei diagnooseja—tietoa.",
            disclaimer: "⚠️ Nämä arvioinnit eivät korvaa lääketieteellistä neuvontaa. Ota aina yhteyttä terveydenhuollon ammattilaisiin lääketieteellisiin päätöksiin."
        },
        dashboard: {
            title: "Henkilökohtainen pitkäikäisyyskojelautasi",
            feature1: {
                title: "Seuraa edistymistäsi",
                text: "Näe kaikki testituloksesi yhdessä paikassa, selkeiden visualisointien ja trendianalyysien kera."
            },
            feature2: {
                title: "Datasi, sinun hallinnassasi",
                text: "Täysi datan omistajuus pankkitason salauksella. Vie tai poista milloin tahansa."
            },
            feature3: {
                title: "Toimivia oivalluksia",
                text: "Saat näyttöön perustuvia ehdotuksia tulostesi mukaan—ei lääketieteellisiä väitteitä, vain ohjausta."
            }
        },
        supplements: {
            title: "Ravintolisät ja interventiot",
            subtitle: "Opettavaisia yleiskatsauksia näyttötasoindikaattoreineen. Tämä on ohjausta, ei reseptiä."
        },
        guides: {
            title: "Tiede ja oppaat"
        }
    }
};

let currentLang = 'en';

export const setLanguage = (lang) => {
    currentLang = lang;
    updatePageContent();
};

export const getLanguage = () => currentLang;

export const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLang];

    for (const k of keys) {
        value = value?.[k];
    }

    return value || key;
};

const updatePageContent = () => {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = t(key);
    });
};
