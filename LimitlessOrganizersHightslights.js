// ==UserScript==
// @name         Highlight Organizer with Configurable Settings
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Highlights tournament rows based on the organizer
// @author       Matux
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Global configuration for organizers
    const config = {
        organizers: {
            'PTCGP FRANCE': 'lightgreen',
            // Add more organizers here
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
        organizerHeaderText: 'Organizer' // Header text of the column to search for
    };

    // Wait for the page to fully load
    window.addEventListener('load', function() {
        console.log('Script LimitlessOrganizersHighlights by Matux');

        // Determine the configuration for the current page
        const currentUrl = window.location.href;
        const pageConfig = config.pages.find(page => currentUrl.includes(page.urlPart));

        if (!pageConfig) {
            console.log('Unrecognized URL, the script will not run.');
            return;
        }

        console.log(`Page recognized: ${pageConfig.urlPart}`);
        console.log(`Searching for configured table classes: ${config.tableClasses.join(', ')}`);

        // Loop through all configured table classes
        config.tableClasses.forEach(tableClass => {
            const tables = document.querySelectorAll(`.${tableClass}`);
            console.log(`Number of tables found with the class "${tableClass}": ${tables.length}`);

            tables.forEach((table, tableIndex) => {
                console.log(`Processing table ${tableIndex + 1} with class "${tableClass}"`);

                // Find the index of the "Organizer" column in the first tr of the tbody
                const headerRow = table.querySelector('tbody tr');
                if (!headerRow) {
                    console.log(`No header row found in table ${tableIndex + 1} with class "${tableClass}"`);
                    return;
                }

                const headerCells = headerRow.querySelectorAll('td, th');
                let organizerColumnIndex = -1;
                headerCells.forEach((cell, index) => {
                    if (cell.innerText.trim() === config.organizerHeaderText) {
                        organizerColumnIndex = index;
                        console.log(`Column "${config.organizerHeaderText}" found at index ${organizerColumnIndex} in table ${tableIndex + 1}`);
                    }
                });

                if (organizerColumnIndex === -1) {
                    console.log(`Column with header "${config.organizerHeaderText}" not found in table ${tableIndex + 1}`);
                    return;
                }

                // Loop through the body rows of the table, skipping the first (header)
                const rows = table.querySelectorAll('tbody tr:not(:first-child)');
                console.log(`Number of rows found in table ${tableIndex + 1} (excluding the header): ${rows.length}`);

                rows.forEach((row, rowIndex) => {
                    // Select all cells in the row
                    const cells = row.querySelectorAll('td');

                    // Check the "Organizer" cell based on the found index
                    const organizerCell = cells[organizerColumnIndex];
                    if (organizerCell) {
                        const organizerText = organizerCell.innerText.trim();
                        console.log(`Content of "Organizer" cell in row ${rowIndex + 1}: ${organizerText}`);

                        // Check if the organizer matches any configured values
                        if (config.organizers.hasOwnProperty(organizerText)) {
                            // Apply the configured color to each cell in the row
                            const color = config.organizers[organizerText];
                            cells.forEach(cell => {
                                cell.style.setProperty('background-color', color, 'important');
                            });
                            console.log(`Row ${rowIndex + 1} highlighted (organizer: ${organizerText}, color: ${color})`);
                        }
                    } else {
                        console.log(`"Organizer" cell not found in row ${rowIndex + 1}`);
                    }
                });
            });
        });

        console.log('Script finished.');
    });
})();
