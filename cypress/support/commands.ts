/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('getByDataTest', (name) => cy.get(`[data-test='${name}']`));

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Cypress {
		interface Chainable {
			/**
			 * Custom command to select DOM element by data-test attribute.
			 * @example cy.getByDataTest('example-item')
			 */
			getByDataTest(value: string): Chainable<JQuery<HTMLElement>>;
		}
	}
}
