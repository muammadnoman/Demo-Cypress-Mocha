
const bookingElementLocators = require('../PageElements/BookingPageElements.json')
export class bookingPageElements{

    preCheckInAddBooking(){
        cy.get('a[class="nav-item nav-link"]')
            .contains('Bookings')
        cy.get(bookingElementLocators.BookingPageLocators.booking_tab).click()
        cy.url().should('include', '/bookings')
        cy.get(bookingElementLocators.BookingPageLocators.add_booking).click()
        //Select Property
        cy.get(bookingElementLocators.BookingPageLocators.select_property).select('Waqas DHA').should('have.value', '2500' )
        //Select Date
        cy.get(bookingElementLocators.BookingPageLocators.date_picker)
            .should('be.visible').click()
        cy.get(bookingElementLocators.BookingPageLocators.date_picker).type('{enter}')
        cy.get(bookingElementLocators.BookingPageLocators.date_picker).type('{enter}{rightarrow}{downArrow}{enter}')
        // Select Source
        cy.get(bookingElementLocators.BookingPageLocators.booking_source).select("TEST_PMS_NO_PMS")
        // Reservation Status
        cy.get(bookingElementLocators.BookingPageLocators.reservation_status).select("Confirmed")
        // Booking Amount
        cy.get(bookingElementLocators.BookingPageLocators.booking_amount).type('100')
        // Enter NOte
        cy.get(bookingElementLocators.BookingPageLocators.enter_note).type('Testing Automation')
        // First Name and Last Name
        cy.get(bookingElementLocators.BookingPageLocators.first_name).type("QA")
        cy.get(bookingElementLocators.BookingPageLocators.last_name).type("Tester")
        // Enter email
        function generateUserName() {
            let text = "";
            let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
            
            for (let i = 0; i < 10; i++)
            text += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
            return text;  
          }
        const generatedUserName = generateUserName()
        cy.get(bookingElementLocators.BookingPageLocators.email_id)
            .should('have.attr', 'placeholder', 'Email')
            .type(generatedUserName + '@mailinator.com')
        cy.get(bookingElementLocators.BookingPageLocators.adult_count).clear().type("2")
        cy.get(bookingElementLocators.BookingPageLocators.Child_count).clear().type('1')
        cy.get(bookingElementLocators.BookingPageLocators.select_nationality).select("Pakistani")
        cy.get(bookingElementLocators.BookingPageLocators.save_changes).click()
        cy.get('.toast-message').invoke('text')
        .then((resp) => {
          expect(resp).to.equal('Booking added successfully')
        })
        cy.reload(true)
        cy.scrollTo('top')
    }
    bookingDetail(){
        cy.xpath("(//i[@class='fas fa-ellipsis-h'])[2]")
            .click({force: true})
        cy.wait(5000)  
        cy.get('div[class="dropdown-menu dropdown-menu-right show"] a:nth-child(3)')
        .invoke("removeAttr", "target", {force: true})
        .click({force: true})
        cy.wait(3000)
    }

    bookingTab(){
        cy.get('a[class="nav-item nav-link "]')
            .contains('Bookings')
        cy.get(bookingElementLocators.BookingPageLocators.booking_tab).click()
        cy.url().should('include', '/bookings')
    }

    addBooking(){
        cy.get('#add_booking_button')
            .should('have.text', 'Add New Booking\n                    ')
        cy.get(bookingElementLocators.BookingPageLocators.add_booking).click()
    }

    selectProperty(){
        cy.get(bookingElementLocators.BookingPageLocators.select_property).select('Waqas DHA').should('have.value', '2500' )
    }

    datePicker(){
        cy.get(bookingElementLocators.BookingPageLocators.date_picker)
            .should('be.visible').click()
        cy.get(bookingElementLocators.BookingPageLocators.date_picker).type('{enter}')
        cy.get(bookingElementLocators.BookingPageLocators.date_picker).type('{enter}{rightarrow}{downArrow}{enter}')
    
    }

    bookingSource(){
        cy.get(':nth-child(1) > #add_edit_booking_modal > .modal-dialog > .modal-content > #bookings-tabContent > .col-sm-12 > :nth-child(2) > :nth-child(2) > .form-group > #booking_source').should('be.visible')
        cy.get(bookingElementLocators.BookingPageLocators.booking_source).select("TEST_PMS_NO_PMS")
    }

    reservationStatus(){
        cy.get(':nth-child(1) > #add_edit_booking_modal > .modal-dialog > .modal-content > #bookings-tabContent > .col-sm-12 > :nth-child(3) > :nth-child(1) > .form-group > #reservation_status').should('be.visible')
        cy.get(bookingElementLocators.BookingPageLocators.reservation_status).select("Confirmed")
    }

    bookingAmount(){
        cy.get(':nth-child(1) > #add_edit_booking_modal > .modal-dialog > .modal-content > #bookings-tabContent > .col-sm-12 > :nth-child(3) > :nth-child(2) > .form-group > #total_booking_amount').should('be.visible')
        cy.get(bookingElementLocators.BookingPageLocators.booking_amount).type('100')
    }

    enterNote(){
        cy.get(':nth-child(1) > #add_edit_booking_modal > .modal-dialog > .modal-content > #bookings-tabContent > .col-sm-12 > .mt-1 > .col-md-12 > .form-group > div > #bookingNotes').should('be.visible')
        cy.get(bookingElementLocators.BookingPageLocators.enter_note).type('Testing Automation')
    }

    firstName(){
        cy.get(':nth-child(1) > #add_edit_booking_modal > .modal-dialog > .modal-content > #bookings-tabContent > .col-sm-12 > #accordion-booking-booker > .card > #accordion-booking-booker-section > .card-body > .row > :nth-child(1) > .form-group > #first_name')
        .should('have.attr', 'placeholder', 'First name')
        cy.get(bookingElementLocators.BookingPageLocators.first_name).type("QA")
    }

    lastName(){
        cy.get('input#last_name').should('have.attr', 'placeholder', 'Last name')
        cy.get(bookingElementLocators.BookingPageLocators.last_name).type("Tester")
    }

    phoneNumber(){
        cy.get(bookingElementLocators.BookingPageLocators.phone_number).click()
        cy.get('#iti-2__item-pk').contains('Pakistan (‫پاکستان‬‎)').type('{enter}3047557094')    
    }

    email(){
        function generateUserName() {
            let text = "";
            let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
            
            for (let i = 0; i < 10; i++)
            text += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
            return text;  
          }
        const generatedUserName = generateUserName()
        cy.get(bookingElementLocators.BookingPageLocators.email_id)
            .should('have.attr', 'placeholder', 'Email')
            .type(generatedUserName + '@mailinator.com')  
    }

    adultCount(){
        cy.get(bookingElementLocators.BookingPageLocators.adult_count).clear().type("2")
    }

    childCount(){
        cy.get(bookingElementLocators.BookingPageLocators.Child_count).clear().type('1')
    }

    nationality(){
        cy.get(':nth-child(1) > #add_edit_booking_modal > .modal-dialog > .modal-content > #bookings-tabContent > .col-sm-12 > #accordion-booking-booker > .card > #accordion-booking-booker-section > .card-body > .row > :nth-child(8) > .form-group > #nationality').should('be.visible')
        cy.get(bookingElementLocators.BookingPageLocators.select_nationality).select("Pakistani")
    }

    saveChanges(){
        cy.get(':nth-child(1) > #add_edit_booking_modal > .modal-dialog > .modal-content > .modal-footer > .btn-success').contains('Save Changes')
        cy.get(bookingElementLocators.BookingPageLocators.save_changes).click()
    }

    lastDate(){
        cy.get(':nth-child(1) > #add_edit_booking_modal > .modal-dialog > .modal-content > #bookings-tabContent').scrollTo('top')
        cy.get(':nth-child(1) > #add_edit_booking_modal > .modal-dialog > .modal-content > #bookings-tabContent > .col-sm-12 > :nth-child(2) > :nth-child(1) > .form-group > .custom-date-box').should('be.visible')
        cy.get(bookingElementLocators.BookingPageLocators.last_date).click()
        cy.wait(3000)
        cy.get('#airbnb-style-datepicker-wrapper-Rp4Ly > .asd__inner-wrapper > :nth-child(1) > :nth-child(2)').first().click({ force: true })
        //cy.get(':nth-child(1) > #add_edit_booking_modal > .modal-dialog > .modal-content > #bookings-tabContent > .col-sm-12 > :nth-child(2) > :nth-child(1) > .form-group > .custom-date-box').type('{downArrow}{enter}')
    }

    guestName(){
        cy.xpath("(//span[@title='QA Tester'][normalize-space()='QA Tester'])[1]")
            .should('be.visible')
            .contains("QA Tester")                          
    }

    

}    
