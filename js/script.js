function updateTime() {
    const now = new Date();
    // Formatage de l'heure : heures, minutes et secondes sur 2 chiffres
    options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    };
    // Création de la chaîne à afficher grâce à un DateTimeFormat auquel on passe les options
    // Le premier argument est la langue, on peut mettre "default" pour utiliser celle du navigateur
    const time = new Intl.DateTimeFormat("fr-FR", options).format(now);
    document.getElementById("time").textContent = time;
    // Si on passe à minuit, on change de jour => on met à jour la date
    if (time === "00:00:00") {
        updateDate();
    }
}

function updateDate() {
    const now = new Date();
    // Utilisation d'un DateTimeFormat par défaut qui utilise la locale du navigateur
    document.getElementById("date").textContent = new Intl.DateTimeFormat().format(now);
    // On change de jour, donc on met à jour les données de l'éphéméride, de la météo et des températures
    updateWeather();
    updateSaints();
}

function updateWeather() {
    fetch("https://www.prevision-meteo.ch/services/json/toulouse")
        .then(resp => {
            if (resp.ok) return resp.json();
            else throw new Error("Données météo non collectées");
        })
        .then(obj => {
            //Lever
            document.getElementById("sunrise").textContent = obj.city_info.sunrise;
            // Coucher
            document.getElementById("sunset").textContent = obj.city_info.sunset;
            // Météo du jour
            document.querySelector("#day0Weather>td:first-of-type").textContent = obj.fcst_day_0.day_long;
            let img0 = document.querySelector("#day0Weather>td>img");
            img0.src = obj.fcst_day_0.icon;
            img0.alt = obj.fcst_day_0.condition;
            document.querySelector("#day0Weather>td:last-of-type>span").textContent = `Aujourd'hui le temps est ${obj.fcst_day_0.condition}`;
            // Météo du lendemain
            document.querySelector("#day1Weather>td:first-of-type").textContent = obj.fcst_day_1.day_long;
            let img1 = document.querySelector("#day1Weather>td>img");
            img1.src = obj.fcst_day_1.icon;
            img1.alt = obj.fcst_day_1.condition;
            document.querySelector("#day1Weather>td:last-of-type>span").textContent = `Demain le temps sera ${obj.fcst_day_1.condition}`;
            // Météo du surlendemain
            document.querySelector("#day2Weather>td:first-of-type").textContent = obj.fcst_day_2.day_long;
            let img2 = document.querySelector("#day2Weather>td>img");
            img2.src = obj.fcst_day_2.icon;
            img2.alt = obj.fcst_day_2.condition;
            document.querySelector("#day2Weather>td:last-of-type>span").textContent = `Après demain le temps sera ${obj.fcst_day_2.condition}`;
            // Températures du jours
            document.getElementById("minTemp").textContent = obj.fcst_day_0.tmin;
            document.getElementById("maxTemp").textContent = obj.fcst_day_0.tmax;
            document.getElementById("meanTemp").textContent = (obj.fcst_day_0.tmin + obj.fcst_day_0.tmax) / 2;
        })
        .catch(error => console.error(error));
}

//      https://github.com/theofidry/ephemeris/tree/master/src
let saints =  [ 
    ["january", [
        ["Jour de l'An", ""],["Basile", "Saint"],["Geneviève", "Sainte"],["Odilon", "Saint"],["Edouard", "Saint"],
        ["Mélaine", "Saint"],["Raymond", "Saint"],["Lucien", "Saint"],["Alix", "Sainte"],["Guillaume", "Saint"],
        ["Pauline", "Saint"],["Tatiana", "Sainte"],["Yvette", "Sainte"],["Nina", "Sainte"],["Rémi", "Saint"],
        ["Marcel", "Saint"],["Roseline", "Sainte"],["Prisca", "Sainte"],["Marius", "Saint"],["Sébastien", "Saint"],
        ["Agnès", "Sainte"],["Vincent", "Saint"],["Barnard", "Saint"],["François de Sales", "Saint"],["Conversion de Paul", ""],
        ["Paule", "Sainte"],["Angèle", "Sainte"],["Thomas d'Aquin", "Saint"],["Gildas", "Saint"],["Martine", "Sainte"],["Marcelle", "Sainte"]
    ]],
    ["february", [
        ["Ella", "Sainte"],["Fête de la Présention", ""],["Blaise", "Saint"],["Véronique", "Sainte"],["Agathe", "Sainte"],["Gaston", "Saint"],["Eugènie", "Sainte"],
        ["Jacqueline", "Sainte"],["Apolline", "Sainte"],["Arnaud", "Saint"],["Notre Dame de Lourdes", "Sainte"],["Félix", "Saint"],["Béatrice", "Sainte"],
        ["Valentin", "Saint"],["Claude", "Saint"],["Julienne", "Sainte"],["Alexis", "Saint"],["Bernadette", "Sainte"],["Gabin", "Saint"],["Aimée", "Sainte"],
        ["Mercredi des Cendres", ""],["Isabelle", "Sainte"],["Lazare", "Saint"],["Modeste", "Sainte"],["Roméo", "Saint"],["Nestor", "Saint"],["Honorine", "Sainte"],
        ["Romain", "Saint"],["Auguste", "Saint"]
    ]],
    ["march", [
        ["Aubin", "Saint"],["Charles le Bon", "Saint"],["Guénolé", "Saint"],["Casimir", "Saint"],["Olive", "Saint"],["Colette", "Sainte"],["Félicité", "Sainte"],
        ["Jean de Dieu", "Saint"],["Françoise", "Sainte"],["Vivien", "Saint"],["Rosine", "Sainte"],["Justine", "Sainte"],["Rodrigue", "Saint"],["Mathilde", "Sainte"],
        ["Louise", "Sainte"],["Bénédicte", "Sainte"],["Patrice", "Saint"],["Cyrille", "Saint"],["Joseph", "Saint"],["Herbert", "Saint"],["Clémence", "Sainte"],
        ["Léa", "Sainte"],["Victorien", "Saint"],["Karine", "Sainte"],["Anne", "Sainte"],["Larissa", "Sainte"],["Habib", "Saint"],["Gontran", "Saint"],
        ["Gwladys", "Sainte"],["Amédée", "Saint"],["Benjamin", "Saint"]
    ]],
    ["april", [
        ["Hugues", "Saint"],
        ["Sandrine", "Sainte"],
        ["Richard", "Saint"],
        ["Isidore", "Saint"],
        ["Irène", "Sainte"],
        ["Marcellin", "Saint"],
        ["Jean-Baptiste de la Salle", "Saint"],
        ["Julie", "Sainte"],
        ["Gautier", "Saint"],
        ["Fulbert", "Saint"],
        ["Stanislas", "Saint"],
        ["Jules", "Saint"],
        ["Ida", "Sainte"],
        ["Maxime", "Saint"],
        ["Paterne", "Saint"],
        ["Benoît-Joseph", "Saint"],
        ["Anicet", "Saint"],
        ["Parfait", "Saint"],
        ["Emma", "Sainte"],
        ["Odette", "Sainte"],
        ["Anselme", "Saint"],
        ["Alexandre", "Saint"],
        ["Georges", "Saint"],
        ["Fidèle", "Saint"],
        ["Marc", "Saint"],
        ["Alida", "Sainte"],
        ["Zita", "Sainte"],
        ["Valérie", "Sainte"],
        ["Catherine de Sienne", "Sainte"],
        ["Robert", "Saint"]
    ]],
    ["may", [
        ["Fête du travail", ""],
        ["Boris", "Saint"],
        ["Philippe", "Saint"],
        ["Sylvain", "Saint"],
        ["Judith", "Saint"],
        ["Prudence", "Saint"],
        ["Gisèle", "Sainte"],
        ["Armistice de 1945", ""],
        ["Pacôme", "Saint"],
        ["Solange", "Sainte"],
        ["Estelle", "Sainte"],
        ["Achille", "Saint"],
        ["Rolande", "Sainte"],
        ["Matthias", "Saint"],
        ["Denise", "Sainte"],
        ["Honoré", "Saint"],
        ["Pascal", "Saint"],
        ["Eric", "Saint"],
        ["Yves", "Saint"],
        ["Bernardin", "Saint"],
        ["Constantin", "Saint"],
        ["Emile", "Saint"],
        ["Didier", "Saint"],
        ["Donatien", "Saint"],
        ["Sophie", "Sainte"],
        ["Bérenger", "Saint"],
        ["Augustin", "Saint"],
        ["Germain", "Saint"],
        ["Aymar", "Saint"],
        ["Ferdinand", "Saint"],
        ["Ferdinand", "Saint"]
    ]],
    ["june", [
        ["Justin", "Saint"],
        ["Blandine", "Sainte"],
        ["Kévin", "Saint"],
        ["Clotilde", "Sainte"],
        ["Igor", "Saint"],
        ["Norbert", "Saint"],
        ["Gilbert", "Saint"],
        ["Médard", "Saint"],
        ["Diane", "Sainte"],
        ["Landry", "Saint"],
        ["Barnabé", "Saint"],
        ["Guy", "Saint"],
        ["Antoine de Padoue", "Saint"],
        ["Elisée", "Sainte"],
        ["Germaine", "Sainte"],
        ["Jean-François Régis", "Saint"],
        ["Hervé", "Saint"],
        ["Léonce", "Saint"],
        ["Romuald", "Saint"],
        ["Silvère", "Saint"],
        ["Solstice d'été", ""],
        ["Alban", "Saint"],
        ["Audrey", "Sainte"],
        ["Jean-Baptiste", "Saint"],
        ["Prosper", "Saint"],
        ["Anthelme", "Saint"],
        ["Fernand", "Saint"],
        ["Irénée", "Saint"],
        ["Pierre", "Saint"],
        ["Martial", "Saint"]
    ]],
    ["july", [
        ["Thierry", "Saint"],
        ["Martinien", "Saint"],
        ["Thomas", "Saint"],
        ["Florent", "Saint"],
        ["Antoine", "Saint"],
        ["Mariette", "Sainte"],
        ["Raoul", "Saint"],
        ["Thibault", "Saint"],
        ["Amandine", "Sainte"],
        ["Ulrich", "Saint"],
        ["Benoît", "Saint"],
        ["Olivier", "Saint"],
        ["Henri", "Saint"],
        ["Fête Nationale", ""],
        ["Donald", ""],
        ["Fête de Notre Dame du Mont Carmel", ""],
        ["Charlotte", "Sainte"],
        ["Frédéric", "Saint"],
        ["Arsène", "Saint"],
        ["Marina", "Sainte"],
        ["Victor", "Saint"],
        ["Marie-Madeleine", "Sainte"],
        ["Brigitte", "Sainte"],
        ["Christine", "Sainte"],
        ["Jacques", "Saint"],
        ["Anne", "Sainte"],
        ["Nathalie", "Sainte"],
        ["Samson", "Saint"],
        ["Marthe", "Sainte"],
        ["Juliette", "Sainte"],
        ["Ignace de Loyola", "Saint"]
    ]],
    ["august", [
        ["Alphonse", "Saint"],
        ["Julien Eymard", "Saint"],
        ["Lydie", "Sainte"],
        ["Jean-Marie Vianney", "Saint"],
        ["Abel", "Saint"],
        ["Fête de la Transfiguration", ""],
        ["Gaétan", "Saint"],
        ["Dominique", "Saint"],
        ["Amour", "Saint"],
        ["Laurent", "Saint"],
        ["Claire", "Sainte"],
        ["Clarisse", "Sainte"],
        ["Hippolyte", "Saint"],
        ["Evrard", "Saint"],
        ["Fête de l'Assomption", ""],
        ["Armel", "Sainte"],
        ["Hyacinthe", "Saint"],
        ["Hélène", "Sainte"],
        ["Jean-Eudes", "Saint"],
        ["Bernard", "Saint"],
        ["Christophe", "Saint"],
        ["Fabrice", "Saint"],
        ["Rose de Lima", "Sainte"],
        ["Barthélémy", "Saint"],
        ["Louis", "Saint"],
        ["Natacha", "Sainte"],
        ["Monique", "Sainte"],
        ["Augustin", "Saint"],
        ["Sabine", "Sainte"],
        ["Fiacre", "Saint"],
        ["Aristide", "Saint"]
    ]],
    ["september", [
        ["Gilles", "Saint"],
        ["Ingrid", "Sainte"],
        ["Grégoire", "Saint"],
        ["Rosalie", "Sainte"],
        ["Raïssa", "Sainte"],
        ["Bertrand", "Saint"],
        ["Reine", "Sao,te"],
        ["Fête de la Nativité", ""],
        ["Alain", "Saint"],
        ["Inès", "Sainte"],
        ["Adelphe", "Saint"],
        ["Apollinaire", "Saint"],
        ["Aimé", "Saint"],
        ["Fête de la Croix Glorieuse", ""],
        ["Roland", "Saint"],
        ["Edith", "Sainte"],
        ["Renaud", "Saint"],
        ["Nadège", "Sainte"],
        ["Emilie", "Sainte"],
        ["Davy", "Saint"],
        ["Matthieu", "Saint"],
        ["Maurice", "Saint"],
        ["Equinoxe d'Automne", ""],
        ["Thècle", "Sainte"],
        ["Hermann", "Saint"],
        ["Côme", "Saint"],
        ["Vincent de Paul", "Saint"],
        ["Venceslas", "Saint"],
        ["Michel", "Saint"],
        ["Jérôme", "Saint"]
    ]],
    ["october", [
        ["Thérèse de l'Enfant Jésus", "Sainte"],
        ["Léger", "Saint"],
        ["Gérard", "Saint"],
        ["François d'Assise", "Saint"],
        ["Fleur", "Sainte"],
        ["Bruno", "Saint"],
        ["Serge", "Saint"],
        ["Pélagie", "Sainte"],
        ["Denis", "Saint"],
        ["Ghislain", "Saint"],
        ["Firmin", "Saint"],
        ["Wilfried", "Saint"],
        ["Géraud", "Saint"],
        ["Juste", "Saint"],
        ["Thérèse d'Avila", "Saint"],
        ["Edwige", "Sainte"],
        ["Baudoin", "Saint"],
        ["Luc", "Saint"],
        ["René", "Saint"],
        ["Adeline", "Sainte"],
        ["Céline", "Sainte"],
        ["Elodie", "Sainte"],
        ["Jean de Capistran", "Saint"],
        ["Florentin", "Saint"],
        ["Crépin", "Saint"],
        ["Dimitri", "Saint"],
        ["Emeline", "Sainte"],
        ["Jude", "Saint"],
        ["Narcisse", "Saint"],
        ["Bienvenue", "Sainte"],
        ["Quentin", "Saint"]
    ]],
    ["november", [
        ["Toussaint", ""],
        ["Fête des défunts", ""],
        ["Hubert", "Saint"],
        ["Charles", "Saint"],
        ["Sylvie", "Sainte"],
        ["Bertille", "Sainte"],
        ["Carine", "Sainte"],
        ["Geoffroy", "Saint"],
        ["Théodore", "Saint"],
        ["Léon", "Saint"],
        ["Armistice de 1918", ""],
        ["Christian", "Saint"],
        ["Brice", "Saint"],
        ["Sidoine", "Saint"],
        ["Albert", "Saint"],
        ["Marguerite", "Sainte"],
        ["Elisabeth", "Sainte"],
        ["Aude", "Sainte"],
        ["Tanguy", "Saint"],
        ["Edmond", "Saint"],
        ["Présence de Marie", ""],
        ["Cécile", "Sainte"],
        ["Clément", "Saint"],
        ["Flora", "Sainte"],
        ["Catherine", "Sainte"],
        ["Delphine", "Sainte"],
        ["Sévrin", "Saint"],
        ["Jacques de la Marche", "Saint"],
        ["Saturnin", "Saint"],
        ["André", "Saint"]
    ]],
    ["december", [
        ["Florence", "Sainte"],
        ["Viviane", "Sainte"],
        ["François-Xavier", "Saint"],
        ["Barbara", "Sainte"],
        ["Gérald", "Saint"],
        ["Nicolas", "Saint"],
        ["Ambroise", "Sainte"],
        ["Fête de l'Immaculée Conception", ""],
        ["Pierre Fourier", "Saint"],
        ["Romaric", "Saint"],
        ["Daniel", "Saint"],
        ["Jeanne-Françoise de Chantal", "Sainte"],
        ["Lucie", "Sainte"],
        ["Odile", "Sainte"],
        ["Ninon", "Sainte"],
        ["Alice", "Sainte"],
        ["Gaël", "Saint"],
        ["Gatien", "Saint"],
        ["Urbain", "Saint"],
        ["Théophile", "Saint"],
        ["Solstice d'Hiver", ""],
        ["Françoise-Xavière", "Sainte"],
        ["Armand", "Saint"],
        ["Adèle", "Sainte"],
        ["Noël", ""],
        ["Etienne", "Saint"],
        ["Jean", "Saint"],
        ["Innocents", "Saints"],
        ["David", "Saint"],
        ["Roger", "Saint"],
        ["Sylvestre", "Saint"]
    ]]
]
;

function updateSaints() {
        const today = new Date();
        let mois = today.getMonth(); 
        let jour = today.getDate(); 
        let happy = saints[mois][1][jour][0];
        document.getElementById("saints").textContent = happy;
}

/* ------ PROGRAMME PRINCIPAL ------*/
window.addEventListener("DOMContentLoaded", () => {
    // Mettre à jour les champs une première fois
    updateTime();
    updateDate();
    // Automatiser la mise à jour
    setInterval(updateTime, 1000);
});
