/// <reference types ="Cypress" />

import { bookingPageElements } from "../../../PageObjects/PageActions/AddBooking"
import { loginPageElements } from "../../../PageObjects/PageActions/LoginPageActions"
import { precheckinPageElements } from "../../../PageObjects/PageActions/PreCheckIn"

  const Login_Elements = new loginPageElements
  const Booking_Elements = new bookingPageElements
  const PreCheckIn_Elements = new precheckinPageElements

describe('Pre Check-In Process', () => {
  
  beforeEach(() => {
    cy.visit('/')
    sessionStorage.clear()
    cy.clearAllCookies({ log: true })
    cy.clearAllLocalStorage('your item', { log: true })
    cy.clearAllSessionStorage()
    Login_Elements.preCheckInLogin('automation9462@gmail.com', 'Boring321')
    Booking_Elements.preCheckInAddBooking()
    Booking_Elements.guestName()
  })
 
  it('CA_PCW_01 > Validate pre-checkin welcome page', () => {
    cy.xpath("(//i[@class='fas fa-ellipsis-h'])[2]")
    .click({force: true})
    cy.get("div[class='dropdown-menu dropdown-menu-right show'] a:nth-child(1)")
    .then(($button) => {
      const link = $button.attr('href');
      cy.wrap(link).as('myLink');
      cy.log(link)
      // Here we will copy the and Visite the Pre Check-In process after logout from the portal
      cy.get('div[class="dropdown-menu dropdown-menu-right show"] a:nth-child(3)')
      .invoke("removeAttr", "target", {force: true})
      .click({force: true})
      cy.wait(3000)
      // Will get and store BookingId value in a variable
      cy.get('#bookingID') 
      .invoke('val') 
      .then((text) => {
        const bookingID = text; 
        cy.wrap(bookingID).should('eq', bookingID)
        // Will get and store Source value in a variable
        cy.get('#source') 
        .invoke('val') 
        .then((text) => {
          const source = text; 
          cy.wrap(source).should('eq', source)
          // Will get and store CheckIn Date in a variable
          cy.get('#checkinDate') 
          .invoke('val') 
          .then((text) => {
            const checkInDate = text; 
            cy.wrap(checkInDate).should('eq', checkInDate)
            // Will get and store CheckOut Date in a variable
            cy.get('#checkoutDate')
            .invoke('val') 
            .then((text) => {
              const checkOutDate = text; 
              cy.wrap(checkOutDate).should('eq', checkOutDate)
              // Now user will go to Payments and Copy the Amount 
              cy.get('#tab_general-payment-detail > .mt-sm-15')
              .click({force: true})
              cy.scrollTo('bottom')
              cy.wait(2000)
              cy.get('.col-md-4 > .table-responsive > .table > :nth-child(1) > .text-right') 
              .then($text => {
                const tAmount = $text.text(); 
                cy.log(tAmount)
                // User will logout from the portal and will open CheckIn link
                Login_Elements.profileIcon()
                cy.visit(link)
                cy.get('.text-md > span').should('contain', 'Please start Pre Check-in')
                cy.wait(3000)
                // Validate Reference Number
                cy.get('.single-line')
                .then(($ref) => {
                  const referenceID = $ref.text().trim()
                  cy.wrap(referenceID).should('eq',bookingID)
                  // Validate Soruce type
                  cy.get('.gp-property-dl > :nth-child(2) > .notranslate')
                  .then(($sour) => {
                    const sourceType = $sour.text().trim()
                    cy.wrap(sourceType).should('eq',source)
                    // Validate Amount
                    cy.get(':nth-child(1) > :nth-child(2) > .dl-with-icon > .notranslate')
                    .then(($amount) => {
                      const amountTotal = $amount.text().trim()
                      cy.wrap(amountTotal).should('eq',tAmount)
                      // Validate check In date
                      cy.get(':nth-child(1) > .dl-with-icon > .notranslate')
                      .then($cIn => {
                        const dateCheckIn = $cIn.text().replace(/,/g, '');
                        cy.log(dateCheckIn)
                        cy.wrap(dateCheckIn).should('eq', checkInDate)
                        // Validate CheckOut Date
                        cy.get(':nth-child(2) > :nth-child(2) > .dl-with-icon > .notranslate')
                        .then($cOut => {
                          const dateCheckOut = $cOut.text().replace(/,/g, '');
                          cy.log(dateCheckOut)
                          cy.wrap(dateCheckOut).should('eq', checkOutDate)
                        })
                      })
                    })
                  })
                })            
              })
            })
          })        
        })
      })            
    })
  })
  it('CA_PCW_02 > Validate basic info page field level validations and prefilled fields', () => {
    cy.xpath("(//i[@class='fas fa-ellipsis-h'])[2]")
    .click({force: true})
    cy.get("div[class='dropdown-menu dropdown-menu-right show'] a:nth-child(1)")
    .then(($button) => {
      const link = $button.attr('href');
      cy.wrap(link).as('myLink');
      cy.log(link)
      // Here we will copy the and Visite the Pre Check-In process after logout from the portal
      cy.get('div[class="dropdown-menu dropdown-menu-right show"] a:nth-child(3)')
      .invoke("removeAttr", "target", {force: true})
      .click({force: true})
      cy.scrollTo('bottom')
      cy.wait(3000)
      // Here we will get the FullName and Save into Variable
      cy.xpath('(//input[@id="6"])[1]') 
      .invoke('val') 
      .then((text) => {
        const fName = text; 
        cy.wrap(fName).should('eq', fName) 
        // Here we will get the Email and Save into Variable
        cy.xpath('(//input[@id="1"])[1]')
        .invoke('val') 
        .then((text) => {
          const emailText = text; 
          cy.wrap(emailText).should('eq', emailText)
          // User will logout from the portal and will open CheckIn link
          Login_Elements.profileIcon()
          cy.visit(link)
          cy.get('.text-md > span').should('contain', 'Please start Pre Check-in')
          cy.wait(3000)     
          cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
          cy.get('h4 > .translate').should('contain', 'CONTACT INFORMATION')
          cy.wait(3000)
          //Here we will validate Full Name and Email entered during Booking
          cy.xpath('(//input[@id="6"])[1]')
          .invoke('val') 
          .then((text) => {
            const fullName = text; 
            cy.wrap(fullName).should('eq', fName)
            //Here we will validate Full Name and Email entered during Booking
            cy.xpath('(//input[@id="1"])[1]')
            .invoke('val') 
            .then((text) => {
              const emailAddress = text; 
              cy.wrap(emailAddress).should('eq', emailText) 
              PreCheckIn_Elements.basicInfoValidation()                             
            })
          })
        })
      })
    })   
  })   
  it('CA_PCW_03 > Validate the questionnier step', () => {
    cy.xpath("(//i[@class='fas fa-ellipsis-h'])[2]")
    .click({force: true})
    cy.get("div[class='dropdown-menu dropdown-menu-right show'] a:nth-child(1)")
    .then(($button) => {
      const link = $button.attr('href');
      cy.wrap(link).as('myLink');
      cy.log(link)
      // User will logout from the portal and will open CheckIn link
      Login_Elements.profileIcon()
      cy.visit(link)
      cy.get('.text-md > span').should('contain', 'Please start Pre Check-in')
      cy.wait(3000)     
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})      
      PreCheckIn_Elements.basicInfo()
      PreCheckIn_Elements.creditCard()
      PreCheckIn_Elements.questionnariesValidation()
    })
  })
  it('CA_PCW_04 > Validate the arrival step', () => {
    cy.xpath("(//i[@class='fas fa-ellipsis-h'])[2]")
    .click({force: true})
    cy.get("div[class='dropdown-menu dropdown-menu-right show'] a:nth-child(1)")
    .then(($button) => {
      const link = $button.attr('href');
      cy.wrap(link).as('myLink');
      cy.log(link)
      // User will logout from the portal and will open CheckIn link
      Login_Elements.profileIcon()
      cy.visit(link)
      cy.get('.text-md > span').should('contain', 'Please start Pre Check-in')
      cy.wait(3000)     
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})      
      PreCheckIn_Elements.basicInfo()
      PreCheckIn_Elements.creditCard()
      cy.get('[data-test="questionnaireTitle"]').should('have.text', 'Some Importent Questions!')
      // Enter Note it's mandatory field
      cy.get('#question-103').should('have.attr', 'placeholder', 'Type your answer').clear().type('This is Automation Testing')
      cy.wait(3000)
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true}) 
      PreCheckIn_Elements.arrivalByValidation()
      })
  })
  
}) 

