describe('Rotator initializes correctly', () => {
    it('starts with correct DOM', () => {
        cy.visit('/');

        cy.get('#tip-value').should('contain', '0');

        cy.get('#protractor')
            .should('have.prop', 'style')
            .its('transform')
            .should('eq', 'rotate(0deg)');
    });
});

describe('Rotator works correctly', () => {
    it('rotates by 180 degrees', () => {
        cy.visit('/');

        cy.get('#protractor')
            .trigger('touchstart', 'bottom')
            .trigger('touchmove', 'bottom')
            .trigger('touchmove', 'bottom')
            .trigger('touchend', 'bottom');

        cy.get('#tip-value').should('contain', '180');
    });

    it('resets back to 0 degrees', () => {
        cy.visit('/');

        cy.get('#protractor')
            .trigger('touchstart', 'bottom')
            .trigger('touchmove', 'bottom')
            .trigger('touchmove', 'bottom')
            .trigger('touchend', 'bottom');

        cy.get('#tip-value').should('contain', '180');

        cy.get('#tip').click();

        cy.get('#tip-value').should('contain', '0');
    });
});
