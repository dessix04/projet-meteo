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
            document.querySelector("#day0Weather>td:last-of-type").textContent = obj.fcst_day_0.condition;
            // Météo du lendemain
            document.querySelector("#day1Weather>td:first-of-type").textContent = obj.fcst_day_1.day_long;
            let img1 = document.querySelector("#day1Weather>td>img");
            img1.src = obj.fcst_day_1.icon;
            img1.alt = obj.fcst_day_1.condition;
            document.querySelector("#day1Weather>td:last-of-type").textContent = obj.fcst_day_1.condition;
            // Météo du surlendemain
            document.querySelector("#day2Weather>td:first-of-type").textContent = obj.fcst_day_2.day_long;
            let img2 = document.querySelector("#day2Weather>td>img");
            img2.src = obj.fcst_day_2.icon;
            img2.alt = obj.fcst_day_2.condition;
            document.querySelector("#day2Weather>td:last-of-type").textContent = obj.fcst_day_2.condition;
            // Températures du jours
            document.getElementById("minTemp").textContent = obj.fcst_day_0.tmin;
            document.getElementById("maxTemp").textContent = obj.fcst_day_0.tmax;
            document.getElementById("meanTemp").textContent = (obj.fcst_day_0.tmin + obj.fcst_day_0.tmax) / 2;
        })
        .catch(error => console.error(error));
}

function updateSaints() {
    fetch("https://nominis.cef.fr/json/nominis.php")
        .then(resp => {
            if (resp.ok) return resp.json();
            else throw new Error("Données des saints du jour non collectées");
        })
        .then(obj => {
            const names = [];
            for (const name in obj.response.prenoms.majeurs) names.push(name);
            document.getElementById("saints").textContent = names.join(', ');
        })
        .catch(error => console.error(error));
}

/* ------ PROGRAMME PRINCIPAL ------*/
window.addEventListener("DOMContentLoaded", () => {
    // Mettre à jour les champs une première fois
    updateTime();
    updateDate();
    // Automatiser la mise à jour
    setInterval(updateTime, 1000);
});
