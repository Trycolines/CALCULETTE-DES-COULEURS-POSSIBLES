// genetique_complet.js
// Moteur de prédiction génétique complet pour la calculette Ragdoll

function resetForm() {
  const inputs = document.querySelectorAll('select, input[type="checkbox"]');
  inputs.forEach(el => {
    if (el.type === "checkbox") el.checked = false;
    else el.selectedIndex = 0;
  });
  document.getElementById("result").innerHTML = "";
}

function predictGenetics() {
  const colorFather = document.getElementById("fatherColor")?.value;
  const colorMother = document.getElementById("motherColor")?.value;
  const motifsFather = Array.from(document.querySelectorAll('[id^="fatherMotif"]:checked')).map(el => el.parentElement.innerText.trim());
  const motifsMother = Array.from(document.querySelectorAll('[id^="motherMotif"]:checked')).map(el => el.parentElement.innerText.trim());

  const carriers = [];
  if (document.getElementById("fatherCarrierChoco")?.checked || document.getElementById("motherCarrierChoco")?.checked) carriers.push("Chocolat");
  if (document.getElementById("fatherCarrierDilution")?.checked || document.getElementById("motherCarrierDilution")?.checked) carriers.push("Dilution");
  if (document.getElementById("fatherCarrierCinnamon")?.checked || document.getElementById("motherCarrierCinnamon")?.checked) carriers.push("Cinnamon");

  let motifResult = "";
  if (motifsFather.includes("Mitted") && motifsMother.includes("Mitted")) {
    motifResult = "25% Colourpoint, 50% Mitted, 25% Bicolore HM";
  } else if ((motifsFather.includes("Mitted") && motifsMother.includes("Colourpoint")) ||
             (motifsFather.includes("Colourpoint") && motifsMother.includes("Mitted"))) {
    motifResult = "50% Colourpoint, 50% Mitted";
  } else if (motifsFather.includes("Colourpoint") && motifsMother.includes("Colourpoint")) {
    motifResult = "100% Colourpoint";
  } else {
    motifResult = motifsFather.concat(motifsMother).join(" ou ") || "Motif indéterminé";
  }

  let tabbyFather = document.getElementById("fatherTabby")?.checked;
  let tabbyMother = document.getElementById("motherTabby")?.checked;
  let tabbyResult = "100% non-tabby";
  if (tabbyFather && tabbyMother) tabbyResult = "100% Tabby";
  else if (tabbyFather || tabbyMother) tabbyResult = "50% Tabby, 50% non-tabby";

  const result = document.getElementById("result");
  result.innerHTML = `
    <div class='highlight'><strong>Couleurs possibles :</strong> ${colorFather}, ${colorMother}</div>
    <div class='highlight'><strong>Gènes portés :</strong> ${carriers.length ? carriers.join(", ") : "Aucun"}</div>
    <div class='highlight'><strong>Motifs possibles :</strong> ${motifResult}</div>
    <div class='highlight'><strong>Tabby :</strong> ${tabbyResult}</div>
    <div class='highlight'><em>NB : Les couleurs Roux, Crème et Tortie dépendent du sexe des chatons.</em></div>
  `;
}