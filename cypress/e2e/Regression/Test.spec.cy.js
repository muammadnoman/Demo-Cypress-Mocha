/// <reference types ="Cypress" />

import { bookingPageElements } from "../../../PageObjects/PageActions/AddBooking"
<<<<<<< HEAD
import { landingPagesElements } from "../../../PageObjects/PageActions/LandingPages"
=======
>>>>>>> master
import { loginPageElements } from "../../../PageObjects/PageActions/LoginPageActions"
import { precheckinPageElements } from "../../../PageObjects/PageActions/PreCheckIn"

  const Login_Elements = new loginPageElements
  const Booking_Elements = new bookingPageElements
  const PreCheckIn_Elements = new precheckinPageElements
<<<<<<< HEAD
  const LandingPages_Elements = new landingPagesElements 
=======
>>>>>>> master

describe('Pre Check-In Process', () => {
  
  beforeEach(() => {
    cy.visit('/')
    sessionStorage.clear()
    cy.clearAllCookies({ log: true })
    cy.clearAllLocalStorage('your item', { log: true })
    cy.clearAllSessionStorage()
    Login_Elements.happyLogin('automation9462@gmail.com', 'Boring321')
    Booking_Elements.happyAddBooking()
<<<<<<< HEAD
  })
  
 it('Testing Something', () => {
    //cy.visit('https://master.chargeautomation.com/pre-checkin-additional-guests/73339?signature=b0463a45b66af81142b42bbd1b44938c8ee2729146b723707658c4d33d647b73')
    Login_Elements.exceptionError()
    LandingPages_Elements.goToGuest()
    LandingPages_Elements.changeMainGuest()    
=======
    Booking_Elements.guestName()
  })
 
  it('CA_PCW_05 > Validate the upload Id card and Credit Card Validation', () => {
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
      PreCheckIn_Elements.basicInfoVerification()
      PreCheckIn_Elements.creditCard()
      cy.get('[data-test="questionnaireTitle"]').should('have.text', 'Some Importent Questions!')
      // Enter Note it's mandatory field
      cy.get('#question-103').should('have.attr', 'placeholder', 'Type your answer').clear().type('This is Automation Testing')
      cy.wait(3000)
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true}) 
      cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION')
      cy.wait(3000)
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true}) 
      PreCheckIn_Elements.verification()
      PreCheckIn_Elements.idCardDocValidation()
    })
  })

  it('CA_PCW_06 > Validate the upload Driving License and Credit Card Validation', () => {
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
      PreCheckIn_Elements.basicInfoVerification()
      PreCheckIn_Elements.creditCard()
      cy.get('[data-test="questionnaireTitle"]').should('have.text', 'Some Importent Questions!')
      // Enter Note it's mandatory field
      cy.get('#question-103').should('have.attr', 'placeholder', 'Type your answer').clear().type('This is Automation Testing')
      cy.wait(3000)
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true}) 
      cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION')
      cy.wait(3000)
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true}) 
      PreCheckIn_Elements.verification()
      PreCheckIn_Elements.drivingDocValidation()
    })
  })
  



  xit('Testing Something', () => {
    cy.visit('https://master.chargeautomation.com/pre-checkin-step-3/72817?signature=81b9098d0c52fccda2eb7ebefec5bc427a9cb1024d63eb16ea398428c20c1913')
    Login_Elements.exceptionError()
    //PreCheckIn_Elements.verification()
    PreCheckIn_Elements.drivingDocValidation()
>>>>>>> master
  })
}) 

