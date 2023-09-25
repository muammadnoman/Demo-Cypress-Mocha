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

  it('Validate Complete Pre Check-In Process with Source PMS-No-PMS, using document as ID Card, Arrival by Car, Only available Guests and using all Services', () => {
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
                  cy.scrollTo('top').wait(2000)
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
                                  PreCheckIn_Elements.basicInfo()
                                  PreCheckIn_Elements.creditCard()
                                  PreCheckIn_Elements.questionnaires()
                                  PreCheckIn_Elements.arrivingByCar()
                                  // Verification ID Card and Credit Card
                                  PreCheckIn_Elements.verification()
                                  PreCheckIn_Elements.idCardVerification()
                                  PreCheckIn_Elements.creditCardImage()
                                  PreCheckIn_Elements.takeSelfy()
                                  PreCheckIn_Elements.guestVerify()
                                  PreCheckIn_Elements.allAddServices()
                                  // Validate Summary Page
                                  cy.get('.page-title').should('contain', 'Your Summary')
                                  cy.get('.mb-0.notranslate').should('contain', 'CA')
                                  cy.wait(3000)
                                  // Validate Source
                                  cy.get('div[class="gp-property-dl small"] span')
                                  .then(($sSource) => {
                                    const mySumSource = $sSource.text().replace(/Booked with /g, '')
                                    cy.log(mySumSource)
                                    cy.wrap(mySumSource).should('eq', source)
                                    // Validate Review Booking Detail
                                    cy.get('div[class="col"] h4').should('contain', 'REVIEW BOOKING DETAILS')
                                    cy.get('.col-md-12 > .row > :nth-child(1) > .gp-dl > dd')
                                    .then(($sRefNo) => {
                                      const myRefNo = $sRefNo.text()
                                      cy.log(myRefNo)
                                      cy.wrap(myRefNo).should('eq',bookingID)
                                      cy.get(':nth-child(2) > .gp-dl > .notranslate')
                                      .then(($sAmount) => {
                                        const mySumAmount = $sAmount.text()
                                        cy.log(mySumAmount)
                                        cy.wrap(mySumAmount).should('eq',tAmount)
                                        cy.get(':nth-child(3) > .gp-dl > .notranslate')
                                        .then(($sCIn) => {
                                          const myCheckInDate = $sCIn.text().replace(/,/g, '');
                                          cy.log(myCheckInDate)
                                          cy.wrap(myCheckInDate).should('eq', checkInDate)
                                          cy.get('.col-md-12 > .row > :nth-child(4) > .gp-dl > .notranslate')
                                          .then(($sCOut) => {
                                            const myCheckOutDate = $sCOut.text().replace(/,/g, '');
                                            cy.log(myCheckOutDate)
                                            cy.wrap(myCheckOutDate).should('eq', checkOutDate)
                                            // Validate Booking info
                                            cy.get(':nth-child(4) > .row > :nth-child(1) > .gp-dl > dd')
                                            .then($infoName => {
                                              const myName = $infoName.text(); 
                                              cy.log(myName)
                                              cy.wrap(myName).should('eq', fName)
                                              cy.get(':nth-child(5) > .gp-dl > dd')
                                              .then($infoEmail => {
                                                const myEmail = $infoEmail.text(); 
                                                cy.log(myEmail)
                                                cy.wrap(myEmail).should('eq', emailText)
                                                PreCheckIn_Elements.contactInfo()
                                                PreCheckIn_Elements.questionnairesValidation()
                                                PreCheckIn_Elements.summaryArrivalByCar()
                                                PreCheckIn_Elements.idDocValidation()
                                                PreCheckIn_Elements.paymentMethodValidation()
                                                PreCheckIn_Elements.signatureValidation()
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

  it('Validate Complete Pre Check-In Process using document as Driving License, Arrival by other, add more Guests and using only one Service from all', () => {
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
                  cy.scrollTo('top').wait(2000)
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
                                  PreCheckIn_Elements.basicInfo()
                                  PreCheckIn_Elements.creditCard()
                                  PreCheckIn_Elements.questionnaires()
                                  PreCheckIn_Elements.arrivingByOther()
                                  // Verification ID Card and Credit Card
                                  PreCheckIn_Elements.verification()
                                  PreCheckIn_Elements.drivingLicenseVerification()
                                  PreCheckIn_Elements.creditCardImage()
                                  PreCheckIn_Elements.takeSelfy()
                                  PreCheckIn_Elements.addNewGuestDetail()
                                  PreCheckIn_Elements.addService1()
                                  // Validate Summary Page
                                  cy.get('.page-title').should('contain', 'Your Summary')
                                  cy.get('.mb-0.notranslate').should('contain', 'CA')
                                  cy.wait(3000)
                                  // Validate Source
                                  cy.get('div[class="gp-property-dl small"] span')
                                  .then(($sSource) => {
                                    const mySumSource = $sSource.text().replace(/Booked with /g, '')
                                    cy.log(mySumSource)
                                    cy.wrap(mySumSource).should('eq', source)
                                    // Validate Review Booking Detail
                                    cy.get('div[class="col"] h4').should('contain', 'REVIEW BOOKING DETAILS')
                                    cy.get('.col-md-12 > .row > :nth-child(1) > .gp-dl > dd')
                                    .then(($sRefNo) => {
                                      const myRefNo = $sRefNo.text()
                                      cy.log(myRefNo)
                                      cy.wrap(myRefNo).should('eq',bookingID)
                                      cy.get(':nth-child(2) > .gp-dl > .notranslate')
                                      .then(($sAmount) => {
                                        const mySumAmount = $sAmount.text()
                                        cy.log(mySumAmount)
                                        cy.wrap(mySumAmount).should('eq',tAmount)
                                        cy.get(':nth-child(3) > .gp-dl > .notranslate')
                                        .then(($sCIn) => {
                                          const myCheckInDate = $sCIn.text().replace(/,/g, '');
                                          cy.log(myCheckInDate)
                                          cy.wrap(myCheckInDate).should('eq', checkInDate)
                                          cy.get('.col-md-12 > .row > :nth-child(4) > .gp-dl > .notranslate')
                                          .then(($sCOut) => {
                                            const myCheckOutDate = $sCOut.text().replace(/,/g, '');
                                            cy.log(myCheckOutDate)
                                            cy.wrap(myCheckOutDate).should('eq', checkOutDate)
                                            // Validate Booking info
                                            cy.get(':nth-child(4) > .row > :nth-child(1) > .gp-dl > dd')
                                            .then($infoName => {
                                              const myName = $infoName.text(); 
                                              cy.log(myName)
                                              cy.wrap(myName).should('eq', fName)
                                              cy.get(':nth-child(5) > .gp-dl > dd')
                                              .then($infoEmail => {
                                                const myEmail = $infoEmail.text(); 
                                                cy.log(myEmail)
                                                cy.wrap(myEmail).should('eq', emailText)
                                                PreCheckIn_Elements.contactInfo()
                                                PreCheckIn_Elements.questionnairesValidation()
                                                PreCheckIn_Elements.summaryArrivalByOther()
                                                PreCheckIn_Elements.licenseDocValidation()
                                                PreCheckIn_Elements.paymentMethodValidation()
                                                PreCheckIn_Elements.signatureValidation()
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

