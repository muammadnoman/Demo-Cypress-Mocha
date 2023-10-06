/// <reference types ="Cypress" />

import { bookingPageElements } from "../../../PageObjects/PageActions/AddBooking"
import { landingPagesElements } from "../../../PageObjects/PageActions/LandingPages"
import { loginPageElements } from "../../../PageObjects/PageActions/LoginPageActions"
import { precheckinPageElements } from "../../../PageObjects/PageActions/PreCheckIn"

  const Login_Elements = new loginPageElements
  const Booking_Elements = new bookingPageElements
  const PreCheckIn_Elements = new precheckinPageElements
  const LandingPages_Elements = new landingPagesElements 

describe('Pre Check-In Process', () => {
  
  beforeEach(() => {
    cy.visit('/')
    sessionStorage.clear()
    cy.clearAllCookies({ log: true })
    cy.clearAllLocalStorage('your item', { log: true })
    cy.clearAllSessionStorage()
    Login_Elements.happyLogin('automation9462@gmail.com', 'Boring321')
    Booking_Elements.happyAddBooking()
  })
  
 it('Testing Something', () => {
    //cy.visit('https://master.chargeautomation.com/pre-checkin-additional-guests/73339?signature=b0463a45b66af81142b42bbd1b44938c8ee2729146b723707658c4d33d647b73')
    Login_Elements.exceptionError()
    LandingPages_Elements.goToGuest()
    LandingPages_Elements.changeMainGuest()    
  })
}) 

