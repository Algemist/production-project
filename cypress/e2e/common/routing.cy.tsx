describe('Роутинг', () => {
    describe('Пользователь не авторизован', () => {
        it('Переход на главную страницу', () => {
            cy.visit('/');
            cy.getByTestId('MainPage').should('exist');
        });

        it('Переход открывает страницу пользователя', () => {
            cy.visit('/profile/1');
            cy.getByTestId('MainPage').should('exist');
        });

        it('Переход открывает несуществующий маршрут', () => {
            cy.visit('/asd');
            cy.getByTestId('NotFoundPage').should('exist');
        });
    });

    describe('Пользователь авторизован', () => {
        beforeEach(() => {
            cy.login();
        });

        it('Переход открывает страницу пользователя', () => {
            cy.visit('/profile/1');
            cy.getByTestId('ProfilePage').should('exist');
        });

        it('Переход открывает страницу со списком статей', () => {
            cy.visit('/articles');
            cy.getByTestId('ArticlePage').should('exist');
        });
    });
});
