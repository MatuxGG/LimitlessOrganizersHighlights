// ==UserScript==
// @name         Highlight Organizer with Configurable Settings
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Met en surbrillance les lignes des tournois en fonction de l'organisateur
// @author       Matux
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Configuration globale des organisateurs
    const config = {
        organizers: {
            'PTCGP FRANCE': 'lightgreen',
            // Ajouter des lignes ici
        },
        pages: [
            {
                urlPart: '/tournaments/ongoing'
            },
            {
                urlPart: '/tournaments/completed'
            },
            {
                urlPart: '/tournaments/upcoming'
            },
            {
                urlPart: '/tournaments'
            }
        ],
        tableClasses: [
            'ongoing-tournaments',
            'completed-tournaments',
            'upcoming-tournaments'
        ],
        organizerHeaderText: 'Organizer' // Texte de l'en-tête de la colonne pour la recherche
    };

    // Attendre que la page soit complètement chargée
    window.addEventListener('load', function() {
        console.log('Script LimitlessOrganizersHighlights by Matux');

        // Déterminer la configuration de la page actuelle
        const currentUrl = window.location.href;
        const pageConfig = config.pages.find(page => currentUrl.includes(page.urlPart));

        if (!pageConfig) {
            console.log('URL non reconnue, le script ne s\'appliquera pas.');
            return;
        }

        console.log(`Page reconnue : ${pageConfig.urlPart}`);
        console.log(`Recherche des classes de tables configurées : ${config.tableClasses.join(', ')}`);

        // Parcourir toutes les classes de tables configurées
        config.tableClasses.forEach(tableClass => {
            const tables = document.querySelectorAll(`.${tableClass}`);
            console.log(`Nombre de tables trouvées avec la classe "${tableClass}" : ${tables.length}`);

            tables.forEach((table, tableIndex) => {
                console.log(`Traitement de la table ${tableIndex + 1} avec la classe "${tableClass}"`);

                // Trouver l'index de la colonne "Organizer" dans le premier tr du tbody
                const headerRow = table.querySelector('tbody tr');
                if (!headerRow) {
                    console.log(`Pas de ligne d'en-tête trouvée dans la table ${tableIndex + 1} avec la classe "${tableClass}"`);
                    return;
                }

                const headerCells = headerRow.querySelectorAll('td, th');
                let organizerColumnIndex = -1;
                headerCells.forEach((cell, index) => {
                    if (cell.innerText.trim() === config.organizerHeaderText) {
                        organizerColumnIndex = index;
                        console.log(`Colonne "${config.organizerHeaderText}" trouvée à l'index ${organizerColumnIndex} dans la table ${tableIndex + 1}`);
                    }
                });

                if (organizerColumnIndex === -1) {
                    console.log(`Colonne avec l'en-tête "${config.organizerHeaderText}" non trouvée dans la table ${tableIndex + 1}`);
                    return;
                }

                // Parcourir les lignes du corps de la table en sautant la première (en-tête)
                const rows = table.querySelectorAll('tbody tr:not(:first-child)');
                console.log(`Nombre de lignes trouvées dans la table ${tableIndex + 1} (sans l'en-tête) : ${rows.length}`);

                rows.forEach((row, rowIndex) => {
                    // Sélectionner toutes les cellules de la ligne
                    const cells = row.querySelectorAll('td');

                    // Vérifier la cellule "Organizer" selon l'index trouvé
                    const organizerCell = cells[organizerColumnIndex];
                    if (organizerCell) {
                        const organizerText = organizerCell.innerText.trim();
                        console.log(`Contenu de la cellule "Organizer" de la ligne ${rowIndex + 1} : ${organizerText}`);

                        // Vérifier si l'organisateur correspond à l'une des valeurs configurées
                        if (config.organizers.hasOwnProperty(organizerText)) {
                            // Appliquer la couleur configurée à chaque cellule de la ligne
                            const color = config.organizers[organizerText];
                            cells.forEach(cell => {
                                cell.style.setProperty('background-color', color, 'important');
                            });
                            console.log(`Ligne ${rowIndex + 1} mise en surbrillance (organisateur : ${organizerText}, couleur : ${color})`);
                        }
                    } else {
                        console.log(`Cellule "Organizer" non trouvée dans la ligne ${rowIndex + 1}`);
                    }
                });
            });
        });

        console.log('Script terminé.');
    });
})();
