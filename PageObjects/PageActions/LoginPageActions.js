const loginElementLocators = require('../PageElements/LoginPageElements.json')
export class loginPageElements{
    
    happyLogin(userName, password){
<<<<<<< HEAD
        this.exceptionError()
=======
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })
>>>>>>> master
        cy.get(loginElementLocators.LoginPageLocators.login_button)
            .click()
        cy.get('.signup-upper > p').should('have.text', 'Welcome back to ChargeAutomation')
        cy.get(loginElementLocators.LoginPageLocators.username_text)
            .type(userName)
        cy.get(loginElementLocators.LoginPageLocators.Password_text)
        .type(password, { force: true })
        cy.get(loginElementLocators.LoginPageLocators.login_user).click({force: true })
        cy.get('.page-title')
            .should('have.text', 'Welcome Waqas')
        cy.url().should('include', '/dashboard-new')
        return
    }
<<<<<<< HEAD
=======
    invalidLogin(){

    }

>>>>>>> master
    exceptionError(){
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
          })
    }
<<<<<<< HEAD
=======

>>>>>>> master
    Login(){
        cy.get('a[href="https://master.chargeautomation.com/login"')
        .should('have.text', 'Log In')
        cy.get(loginElementLocators.LoginPageLocators.login_button)
            .click()
        cy.get('.signup-upper > p').should('have.text', 'Welcome back to ChargeAutomation')
        cy.url().should('include', '/login')
    }
<<<<<<< HEAD
=======

>>>>>>> master
    username(emailid){
        cy.get('input[name="email"]')
            .should('have.attr', 'placeholder', 'Email')
        cy.get(loginElementLocators.LoginPageLocators.username_text)
            .type(emailid)
        return
    }
<<<<<<< HEAD
=======

>>>>>>> master
    Password(pass){
        cy.get('input[name="password"]')
            .should('have.attr', 'placeholder', 'password')
        cy.get(loginElementLocators.LoginPageLocators.Password_text)
            .type(pass, { force: true })
        return
    }
<<<<<<< HEAD
=======

>>>>>>> master
    LoginButton(){
        cy.get(loginElementLocators.LoginPageLocators.login_user).click({force: true })
        cy.get('.page-title')
            .should('have.text', 'Welcome Waqas')
        cy.url().should('include', '/dashboard-new')
    }
<<<<<<< HEAD
=======

>>>>>>> master
    profileIcon(){
        cy.get(loginElementLocators.LoginPageLocators.profile_icon).click()
        cy.get('div.dropdown-menu.dropdown-menu-right.show').contains(' Logout').click()
        cy.get('#intro_section_text_1').should('have.text', 'Powerful Payment Processing')
    }
        
}