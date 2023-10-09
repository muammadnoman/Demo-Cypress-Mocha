import { loginPageElements } from './LoginPageActions'
import { precheckinPageElements } from './PreCheckIn'

const landingPagesElementLocators = require('../PageElements/PreCheckInPageElement.json')
const guestRegistrationElementLocators = require('../PageElements/guestRegistration.json')

const Login_Elements = new loginPageElements
const PreCheckIn_Elements = new precheckinPageElements

export class landingPagesElements {

    basicInfoValidation(){
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
        cy.get('.invalid-feedback').should('contain', 'Invalid phone number.')
        // Validate invalid Phone Number
        cy.get('.iti__selected-flag').click()
        cy.get('#iti-0__item-pk').contains('Pakistan (‫پاکستان‬‎)')
            .type('{enter}3047557094') 
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
        cy.get('.toast-message').invoke('text')
        .then((resp) => {
          expect(resp).to.equal('Answer all questions.')
        })
        // Validate Field level Validation
        cy.xpath('(//small[normalize-space()="Date of Birth is required."])[1]').should('contain', 'Date of Birth is required.')
        cy.xpath('//small[normalize-space()="Gender is required."]').should('contain', 'Gender is required.')
        cy.xpath('//small[normalize-space()="Address is required."]').should('contain', 'Address is required.')
        cy.xpath('//small[normalize-space()="Zip Code is required."]').should('contain', 'Zip Code is required.')
        cy.get('.mt-2 > h4 > .translate').should('have.text', 'GUESTS')
        // Validate Adults
        cy.get('.guest-select-option > :nth-child(1) > .form-group > label > .translate')
            .should('have.text', 'Adults')
        cy.get('#guestAdults').invoke('val') 
        .then((text) => {
            const adults = text; 
            cy.wrap(adults).should('eq', '2')
            cy.get('[data-test="basicAdultPlus"]').click({force: true})
            cy.get('#guestAdults').invoke('val') 
            .then((text) => {
                const afterAddAdults = text; 
                cy.wrap(afterAddAdults).should('eq', '3')
            })
        })
        // Validate Childs
        cy.get('.guest-select-option > :nth-child(2) > .form-group > label > .translate')
        .should('have.text', 'Children (2-17 years)')
        cy.get('[data-test="basicChildrenInput"]').invoke('val') 
        .then((text) => {
            const child = text; 
            cy.wrap(child).should('eq', '1')
            cy.get('[data-test="basicChildrenPlus"]').click({force: true})
            cy.get('[data-test="basicChildrenInput"]').invoke('val') 
            .then((text) => {
                const afterAddChild = text; 
                cy.wrap(afterAddChild).should('eq', '2')
            })
        })
        cy.get('.badge').should('contain', '5')
        // Enter all the data into fields
        cy.xpath(precheckinElementLocators.PreCheckInPageLocators.date_of_birth)
            .should('have.attr', 'placeholder', 'Date of birth').type('1997-04-04')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.gender).select('Male')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.address)
            .should('have.attr', 'placeholder', 'Please type your address').clear()
            .type('Lahore-Islamabad Motorway, Sabzazar Block E Sabzazar Housing Scheme Phase 1 & 2 Lahore, Pakistan{enter}')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.zip_code)
            .should('have.attr', 'placeholder', 'Zip code').clear().type('54000').wait(2000)
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
        cy.get('.mb-4 > .form-section-title > h4').should('contain', 'PAYMENT SUMMARY')
    } 
// Questionnaries validation
    questionnariesValidation(){
        cy.get('[data-test="questionnaireTitle"]').should('have.text', 'Some Importent Questions!')
        cy.get('[data-test="questionnaireDesc"]').should('have.text', 'Please answer the below Questions.').wait(3000)
        // Validate all the Questions
        cy.get('[data-test="questionnaireLabel103"]').should('contain', 'Enter note about any suggestion?*')
        cy.get('[data-test="questionnaireLabel108"]').should('contain', 'Date Question')
        cy.get('[data-test="questionnaireLabel109"]').should('contain', 'Alternate Phone Number')
        cy.get('[data-test="questionnaireLabel110"]').should('contain', 'Email')
        cy.get('[data-test="questionnaireLabel111"]').should('contain', 'Do you need an extra bed?')
        cy.get('[data-test="questionnaireLabel112"]').should('contain', 'How many beds do you need?')
        cy.get('[data-test="questionnaireLabel113"]').should('contain', 'Provide some basic infos')
        cy.get('[data-test="questionnaireLabel114"]').should('contain', 'Choose your breakfast')
        cy.get('[data-test="questionnaireLabel115"]').should('contain', 'What facilities do you need?')
        cy.get('[data-test="questionnaireLabel116"]').should('contain', 'Upload your ID?')
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
        // Validate Mandatory Fields
        cy.get('.invalid-feedback > span').should('contain', 'Answer is required.')
        cy.get('#question-103').should('have.attr', 'placeholder', 'Type your answer').clear().type('This is Automation Testing')
        // Enter Phone Number
        cy.get('.iti__selected-flag').click()
        cy.get('#iti-0__item-pk').contains('Pakistan (‫پاکستان‬‎)').type('{enter}304')
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
        cy.get('.toast-message').invoke('text')
        .then((resp) => {
          expect(resp).to.equal('Invalid phone number')
        })
        cy.get('.iti__selected-flag').click()
        cy.get('#iti-0__item-pk').contains('Pakistan (‫پاکستان‬‎)').type('{enter}7557094')
        // Validate Email field Validations
        cy.get('#question-110').should('have.attr', 'placeholder', 'Type your answer').clear().type('automationmailinator.com')
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
        cy.get('.text-danger > span').should('contain', 'Answer must be a valid email address.')
        cy.get('#question-110').clear().type('automation@mailinator.com')
        // Validate number range
        cy.get('[data-test="questionairNumber112"]').type('6')
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
        cy.get(':nth-child(8) > .row > .col-12 > .form-group > .text-danger > span').should('contain', 'Number must be within the range of 1 to 5.')
        // Enter Date
        cy.xpath('(//input[@id="date_trigger_sync108"])[1]').click()
        cy.xpath('(//button[@type="button"][normalize-space()="4"])[2]').click()
        // Choose Boolean
        cy.get('#question-111-0').should('not.be.checked').click({force: true})
        // Enter value in Number Field
        cy.get('#question-112').should('have.attr', 'placeholder', 'Type your answer').clear().type('2')
        // Enter text into Text Area
        cy.get('#question-113').should('have.attr', 'placeholder', 'Type your answer').clear().type('This is Test Automation Testing Some Basic Infos')
        // Validate Radio Button
        cy.get('#question-114-0').should('not.be.checked').click({force: true})
        // Validate CheckBoxes
        cy.get('#checkbox-115-0').should('not.be.checked').check({force: true}).should('be.checked')
        cy.get('#checkbox-115-1').should('not.be.checked').check({force: true}).should('be.checked')
        cy.get('#checkbox-115-2').should('not.be.checked').check({force: true}).should('be.checked')
        // Upload Image
        cy.get('input[data-test="questionaireFile116"]').attachFile('Images/testImage.jpeg').wait(3000)
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
        cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION')
    }
// Arrival By Validation
    arrivalByValidation(){
        // Arrival by Car with time 12:00
        cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION')
        cy.get('label[for="guestArrivalMethod"]').should('have.text', 'Arriving By')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.arriving_option).select('Car')
        cy.wait(2000)
        cy.get('label[for="standard_check_in_time"]').should('have.text', 'Estimate Arrival Time')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.arrival_time).select('12:00')
        cy.wait(2000)
        // Arrival by Other Validation
        cy.get(precheckinElementLocators.PreCheckInPageLocators.arriving_option).select('Other')
        cy.wait(2000)
        cy.get(precheckinElementLocators.PreCheckInPageLocators.arrival_time).select('10:00')
        cy.wait(2000)
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
        cy.get('.form-text.text-danger').should('contain', 'Other detail is required.')
        cy.get('#other').type('Testing Arrival by Other')
        // Arrival By Flight
        cy.get(precheckinElementLocators.PreCheckInPageLocators.arriving_option).select('Flight')
        cy.wait(2000)
        cy.get('#flightNumber').type('PIA-9669')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.arrival_time).select('10:30')
        cy.wait(2000)
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
        cy.get('div[class="form-section-title"] h4').should('have.text', '\n                                Upload\n                                copy of valid Driver License\n                            ')
    }
    goToDocValidation(){
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
        })
    }
// Id Card Validations
    idCardDocValidation(){
        cy.get('[for="drivers_license"]').should('contain', "Driver's License")
        cy.get('[for="id_card"]').should('contain', 'ID Card')
        cy.get('#id_card').should('not.be.checked').click({force: true}).wait(2000)
        cy.xpath('//label[normalize-space()="Upload ID Card Front"]').should('contain', 'Upload ID Card Front')
        cy.xpath('//label[normalize-space()="Upload ID Card Back"]').should('contain', 'Upload ID Card Back')
        cy.xpath('//span[normalize-space()="Upload Credit Card"]').should('contain', 'Upload Credit Card')
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
        cy.get(':nth-child(2) > .form-text').should('contain', 'Identification front side is required.')
        cy.get(':nth-child(3) > .form-text').should('contain', 'Identification back side is required.')
        cy.get(':nth-child(4) > .form-text').should('contain', 'Credit card is required.')
        // Validate png type images.
        const idFront = 'Images/idCardFront.png'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.id_card_front)
            .attachFile(idFront).wait(3000)
        const backImage = 'Images/idCardBack.png'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.id_card_back)
            .attachFile(backImage)
        cy.wait(3000)
        const cardImage = 'Images/visaCard.png'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.card_image)
          .attachFile(cardImage)
        cy.wait(5000) 
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
        cy.get('div[class="gp-box gp-box-of-inner-pages"] p:nth-child(1)').should('have.text', 'Take a selfie to authenticate your identity')
    }
// Driving License Doc Validation
    drivingDocValidation(){
        cy.get('[for="drivers_license"]').should('contain', "Driver's License")
        cy.get('[for="id_card"]').should('contain', 'ID Card')
        cy.get('.doc-wrap > :nth-child(2) > div > .btn').should('contain', "Upload Driver's License Front")
        cy.get(':nth-child(3) > div > .btn').should('contain', "Upload Driver's License Back")
        cy.get('.fileUpload').should('contain', 'Upload Credit Card')
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
        cy.get(':nth-child(2) > .form-text').should('contain', 'Identification front side is required.')
        cy.get(':nth-child(3) > .form-text').should('contain', 'Identification back side is required.')
        cy.get(':nth-child(4) > .form-text').should('contain', 'Credit card is required.')
        // Validate Png type image
        const frontImage = 'Images/front.pdf'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.driving_license_front)
            .attachFile(frontImage).wait(3000)
        const backImage = 'Images/back.pdf'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.driving_license_back)
            .attachFile(backImage).wait(3000) 
        const cardImage = 'Images/card.pdf'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.card_image)
          .attachFile(cardImage)
        cy.wait(5000)
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
        cy.get('div[class="gp-box gp-box-of-inner-pages"] p:nth-child(1)').should('have.text', 'Take a selfie to authenticate your identity')
    }
    goToGuest(){
        this.goToDocValidation()
        PreCheckIn_Elements.idCardVerification()
        PreCheckIn_Elements.takeSelfy()
    }
    addNewGuest(){
        cy.get('button[data-target="#addGuestModal"]').click({force: true})
        cy.get('#newGuestModel').should('have.text', 'Guest')
        // Validation
        cy.get('button[class="btn btn-success btn-sm px-3"]').click({force: true})
        cy.get('.toast-message').invoke('text')
        .then((resp) => {
          expect(resp).to.equal('The given data was invalid.')
        })
        cy.get(':nth-child(1) > .form-text').should('contain', 'The name field is required.')
        cy.get(':nth-child(2) > .form-text').should('contain', 'The email field is required.')
        cy.get(':nth-child(1) > label').should('contain', 'Full Name*')
        cy.get("input[placeholder='Full name']")
            .should('have.attr', 'placeholder', 'Full name')
            .type('QA Guest')
        cy.get(':nth-child(2) > label').should('contain', 'Email*')
        cy.get("input[placeholder='Email']")
            .should('have.attr', 'placeholder', 'Email')
            .type('qaguest@mailinator.com')
        cy.get('#cancelButtonOfNewGuestModal').should('be.visible')
        cy.get('button[class="btn btn-success btn-sm px-3"]').click({force: true})
        cy.get('.toast-success > .toast-message').invoke('text')
        .then((resp) => {
          expect(resp).to.equal('Guest added Successfully')
        })
        cy.wait(3000)
        cy.get(':nth-child(4) > :nth-child(1) > .guest-name').should('contain', 'QA Guest')
        cy.get(':nth-child(4) > :nth-child(2) > .guest-email').should('contain', 'qaguest@mailinator.com')
    }
    deleteGuest(){
        cy.get('button[data-target="#addGuestModal"]').click({force: true})
        cy.get("input[placeholder='Full name']")
            .type('QA Guest')
        cy.get("input[placeholder='Email']")
            .type('qaguest@mailinator.com')
        cy.get('button[class="btn btn-success btn-sm px-3"]').click({force: true})
        cy.get(':nth-child(4) > :nth-child(1) > .guest-name').should('contain', 'QA Guest')
        cy.get(':nth-child(4) > :nth-child(2) > .guest-email').should('contain', 'qaguest@mailinator.com')
        cy.wait(3000)
        // Delete Added Guest
        cy.get(':nth-child(4) > :nth-child(4) > .guest-actions > .guest-delete > .fas')
            .click({force: true})
        cy.get('.view-edit-title').should('contain', 'Do you want to delete this Guest?')
        cy.get('.swal2-cancel').should('be.visible')
        cy.get('.swal2-confirm').should('be.visible').click({force: true}).wait(3000)
        cy.get(':nth-child(1) > .toast-message').invoke('text')
        .then((resp) => {
          expect(resp).to.equal('Guest deleted Successfully')
        })
    }
    goToGuestRegistration(){
        cy.get(':nth-child(3) > :nth-child(4) > .guest-actions > .guest-share').click({force: true})
        cy.get('.input-group-append > .btn').click()
        cy.wait(3000)
        cy.get('#shareBookingModal_linkCopyInput').invoke('val').as('inputValue');
        cy.get('@inputValue')
        .then((regLink) => {
            cy.log(regLink)
            cy.visit(regLink)
        })
    }
    guestRegistration(){
        cy.get(guestRegistrationElementLocators.GuestRegPageLocators.page_heading)
            .should('contain', 'Guest Registration')
        cy.get(guestRegistrationElementLocators.GuestRegPageLocators.page_instruction)
            .should('contain', 'The following pre check-in details are required to be completed for CA')
        cy.xpath(guestRegistrationElementLocators.GuestRegPageLocators.full_name)
            .should('have.attr', 'placeholder', 'Full name')
            .type('SQA Tester')
        cy.get(guestRegistrationElementLocators.GuestRegPageLocators.select_country).click()
        cy.get(guestRegistrationElementLocators.GuestRegPageLocators.select_pakistan).contains('Pakistan (‫پاکستان‬‎)')
            .type('{enter}3047557094') 
        cy.xpath(guestRegistrationElementLocators.GuestRegPageLocators.enter_dob)
            .should('have.attr', 'placeholder', 'Date of birth').type('1998-04-04')
        cy.xpath(guestRegistrationElementLocators.GuestRegPageLocators.select_nationality)
            .select('Pakistani')
        // Email Generator
         function generateUserName() {
            let text = "";
            let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
            
            for (let i = 0; i < 10; i++)
            text += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
            return text;  
          }
        const generatedUserName = generateUserName()
        cy.xpath(guestRegistrationElementLocators.GuestRegPageLocators.enter_email)
            .should('have.attr', 'placeholder', 'Email address')
            .type(generatedUserName + '@mailinator.com')
        cy.xpath(guestRegistrationElementLocators.GuestRegPageLocators.select_gender)
            .select('Female')
        cy.get(guestRegistrationElementLocators.GuestRegPageLocators.enter_address)
            .should('have.attr', 'placeholder', 'Please type your address').clear()
            .type('Lahore-Islamabad Motorway, Sabzazar Block E Sabzazar Housing Scheme Phase 1 & 2 Lahore, Pakistan{enter}')
        cy.xpath(guestRegistrationElementLocators.GuestRegPageLocators.enter_zipcode)
            .should('have.attr', 'placeholder', 'Zip code').clear().type('54000')
        cy.get(guestRegistrationElementLocators.GuestRegPageLocators.submit_button)
            .should('be.visible').click({force: true})
        cy.get('.toast-message').invoke('text')
        .then((resp) => {
            expect(resp).to.equal('Data saved Successfully.')
        })
        // Validate guest registration
        cy.go('back')
        cy.get(':nth-child(3) > :nth-child(1) > .guest-name').should('contain', 'SQA Tester')
        cy.get(':nth-child(3) > :nth-child(2) > .guest-email').should('contain', generatedUserName + '@mailinator.com')
    }
    guestRegValidations(){
        cy.get(guestRegistrationElementLocators.GuestRegPageLocators.page_heading)
        .should('contain', 'Guest Registration')
        cy.get(guestRegistrationElementLocators.GuestRegPageLocators.page_instruction)
            .should('contain', 'The following pre check-in details are required to be completed for CA')
        // Validate all the fields
        cy.xpath("//label[@for='6']").should('contain', "Full Name")
        cy.xpath("//label[@for='2']").should('contain', "Phone Number")
        cy.xpath("//label[@for='7']").should('contain', "Date of Birth")
        cy.xpath("//label[@for='8']").should('contain', "Nationality")
        cy.xpath("//label[@for='1']").should('contain', "Email Address")
        cy.xpath("//label[@for='9']").should('contain', "Gender")
        cy.xpath("//label[@for='10']").should('contain', "Address")
        cy.xpath("//label[@for='11']").should('contain', "Zip Code")
        // Validate Field Validations
        cy.get(guestRegistrationElementLocators.GuestRegPageLocators.submit_button)
            .should('be.visible').click({force: true})
        cy.get('.invalid-feedback').should('contain', 'Phone number is required')
        cy.get(guestRegistrationElementLocators.GuestRegPageLocators.select_country).click()
        cy.get(guestRegistrationElementLocators.GuestRegPageLocators.select_pakistan)
            .contains('Pakistan (‫پاکستان‬‎)').type('{enter}304')
        cy.get(guestRegistrationElementLocators.GuestRegPageLocators.submit_button)
            .should('be.visible').click({force: true})    
        cy.get('.invalid-feedback').should('contain', 'Invalid phone number')
        cy.get(guestRegistrationElementLocators.GuestRegPageLocators.select_country).click()
        cy.get(guestRegistrationElementLocators.GuestRegPageLocators.select_pakistan)
            .contains('Pakistan (‫پاکستان‬‎)').type('{enter}7557094')
        cy.get(guestRegistrationElementLocators.GuestRegPageLocators.submit_button)
            .should('be.visible').click({force: true}) 
        cy.get('.toast-message').invoke('text')
        .then((resp) => {
            expect(resp).to.equal('Data is not valid')
        })
        cy.xpath("//small[normalize-space()='Full Name is required.']")
            .should('contain', 'Full Name is required.')
        cy.xpath("//small[normalize-space()='Date of Birth is required.']")
            .should('contain', 'Date of Birth is required.')
        cy.xpath("//small[normalize-space()='Nationality is required.']")
            .should('contain', 'Nationality is required.')
        cy.xpath("//small[normalize-space()='Email Address is required.']")
            .should('contain', 'Email Address is required.')
        cy.xpath("//small[normalize-space()='Gender is required.']")
            .should('contain', 'Gender is required.')
        cy.xpath("//small[normalize-space()='Address is required.']")
            .should('contain', 'Address is required.')
        cy.xpath("//small[normalize-space()='Zip Code is required.']")
            .should('contain', 'Zip Code is required.')
        // Enter Actual Data in all the fields expect Email
        cy.xpath(guestRegistrationElementLocators.GuestRegPageLocators.full_name)
            .should('have.attr', 'placeholder', 'Full name')
            .type('SQA Tester')
        cy.xpath(guestRegistrationElementLocators.GuestRegPageLocators.enter_dob)
            .should('have.attr', 'placeholder', 'Date of birth').type('1998-04-04')
            cy.xpath(guestRegistrationElementLocators.GuestRegPageLocators.select_nationality)
            .select('Pakistani')
        cy.xpath(guestRegistrationElementLocators.GuestRegPageLocators.select_gender)
            .select('Female')
        cy.get(guestRegistrationElementLocators.GuestRegPageLocators.enter_address)
            .should('have.attr', 'placeholder', 'Please type your address').clear()
            .type('Lahore-Islamabad Motorway, Sabzazar Block E Sabzazar Housing Scheme Phase 1 & 2 Lahore, Pakistan{enter}')
        cy.xpath(guestRegistrationElementLocators.GuestRegPageLocators.enter_zipcode)
            .should('have.attr', 'placeholder', 'Zip code').clear().type('54000')
        // Email Generator
         function generateUserName() {
            let text = "";
            let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
            
            for (let i = 0; i < 10; i++)
            text += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
            return text;  
          }
        const generatedUserName = generateUserName()
        // Enter Wrong Email
        cy.xpath(guestRegistrationElementLocators.GuestRegPageLocators.enter_email)
            .should('have.attr', 'placeholder', 'Email address')
            .type(generatedUserName + 'mailinator.com')
        cy.get(guestRegistrationElementLocators.GuestRegPageLocators.submit_button)
            .should('be.visible').click({force: true})
        cy.get('.toast-message').invoke('text')
        .then((resp) => {
            expect(resp).to.equal('Data is not valid')
        }).wait(3000)
        cy.xpath("//small[@class='form-text text-danger invalid-feedback']")
            .should('contain', 'Email Address is not valid.')
        cy.xpath(guestRegistrationElementLocators.GuestRegPageLocators.enter_email)
            .clear().type(generatedUserName + '@mailinator.com').wait(4000)
        cy.get(guestRegistrationElementLocators.GuestRegPageLocators.submit_button)
            .should('be.visible').click({force: true})
        cy.get('.toast-message').invoke('text')
        .then((resp) => {
            expect(resp).to.equal('Data saved Successfully.')
        })             
    }
    addGuestDetail(){
        PreCheckIn_Elements.addNewGuestDetail()
    }
    guestDetailValidations(){
        cy.get('div[class="gp-box gp-box-of-inner-pages page-tab-01 pre-checkin-tabs"] h4:nth-child(1)').should('have.text', 'Guest Details\n                        1/3')
        cy.get(':nth-child(3) > :nth-child(3) > .badge').should('contain', 'Incomplete')
        cy.get(':nth-child(3) > :nth-child(4) > .guest-actions > .guest-edit > div').click({force: true})
        cy.get('#exampleModalLabel > span').should('contain', 'Adult 2').wait(3000)
        cy.get('button[class="btn btn-success btn-sm"]').click({force: true})
        // Validate Phone number Validation
        cy.get('.invalid-feedback').should('contain', 'Phone number is required')
        cy.get('.iti__selected-flag').click()
        cy.get('#iti-0__item-pk').contains('Pakistan (‫پاکستان‬‎)').type('{enter}304')
        cy.get('button[class="btn btn-success btn-sm"]').click({force: true})
        cy.get('.invalid-feedback').should('contain', 'Invalid phone number')
        cy.get('.iti__selected-flag').click()
        cy.get('#iti-0__item-pk').contains('Pakistan (‫پاکستان‬‎)').type('{enter}7557094')
        cy.get('button[class="btn btn-success btn-sm"]').click({force: true})
        cy.get('.toast-message').invoke('text')
        .then((resp) => {
            expect(resp).to.equal('Data is not valid')
        })
        // Other all fields validations
        cy.get(':nth-child(1) > .form-group > .form-text').should('contain', 'Full Name is required.')
        cy.get(':nth-child(3) > .form-group > .form-text').should('contain', 'Date of Birth is required.')
        cy.get(':nth-child(4) > .form-group > .form-text').should('contain', 'Nationality is required.')
        cy.get(':nth-child(5) > .form-group > .form-text').should('contain', 'Email Address is required.')
        cy.get(':nth-child(6) > .form-group > .form-text').should('contain', 'Gender is required.')
        cy.get(':nth-child(7) > .form-group > .form-text').should('contain', 'Address is required.')
        cy.get(':nth-child(8) > .form-group > .form-text').should('contain', 'Zip Code is required.')
        // Enter data in all the fields.
        cy.xpath('(//input[@id="6"])[1]').type('Test Guest')
        cy.xpath('(//input[@id="7"])[1]').type('1997-04-04')
        cy.xpath('(//select[@id="8"])[1]').select("Pakistani")
        // UserName Generator
        function generateUserName() {
            let text = "";
            let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
            
            for (let i = 0; i < 10; i++)
            text += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
            return text;  
          }
        const generatedUserName = generateUserName()
        cy.xpath('(//input[@id="1"])[1]')
            .should('have.attr', 'placeholder', 'Email address')
            .type(generatedUserName + 'mailinator.com')
        cy.xpath('(//select[@id="9"])[1]').select('Female')
        cy.xpath('//input[@id="update-property-address"]')
            .type('Lahore-Islamabad Motorway, Sabzazar Block E Sabzazar Housing Scheme Phase 1 & 2 Lahore, Pakistan{enter}')
        cy.xpath('(//input[@id="11"])[1]').type('54000').wait(3000)
        cy.get('button[class="btn btn-success btn-sm"]').click({force: true})
        cy.get('.toast-message').invoke('text')
        .then((resp) => {
            expect(resp).to.equal('Data is not valid')
        })
        cy.get('.form-text').should('contain', "Email Address is not valid.").wait(2000)
        // Enter Valid Email
        cy.xpath('(//input[@id="1"])[1]').clear()
            .type(generatedUserName + '@mailinator.com')
        cy.get('button[class="btn btn-success btn-sm"]').click({force: true}).wait(4000)
        cy.get('.toast-message').invoke('text')
        .then((resp) => {
          expect(resp).to.equal('Data saved Successfully.')
        })
        cy.get(':nth-child(3) > :nth-child(1) > .guest-name').should('have.text', 'Test Guest')
        cy.get(':nth-child(3) > :nth-child(2) > .guest-email').should('contain', generatedUserName + '@mailinator.com')
        cy.get(':nth-child(3) > :nth-child(3) > .badge').should('contain', 'Completed')
        cy.get('h4 > .badge').should('contain', '2/3')
    }
    editGuestDetail(){
        this.addGuestDetail()
        cy.wait(3000)
        cy.get('.btn.btn-default.d-none.d-md-inline-block').click({force: true})
        cy.get('h4 > .badge').should('contain', '2/3')
        cy.get(':nth-child(3) > :nth-child(4) > .guest-actions > .guest-edit > div').click({force: true})
        cy.get('#exampleModalLabel > span').should('contain', 'Test Guest').wait(3000)
        cy.xpath('(//input[@id="6"])[1]').clear().type('SQAE Guest')
         // UserName Generator
         function generateUserName() {
            let text = "";
            let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
            
            for (let i = 0; i < 10; i++)
            text += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
            return text;  
          }
        const generatedUserName = generateUserName()
        cy.xpath('(//input[@id="1"])[1]')
            .clear()
            .type(generatedUserName + '@mailinator.com')
        cy.get('button[class="btn btn-success btn-sm"]').click({force: true})
        cy.get('.toast-message').invoke('text')
        .then((resp) => {
          expect(resp).to.equal('Data saved Successfully.')
        })
        cy.get(':nth-child(3) > :nth-child(1) > .guest-name').should('have.text', 'SQAE Guest')
        cy.get(':nth-child(3) > :nth-child(2) > .guest-email').should('contain', generatedUserName + '@mailinator.com')
        cy.get(':nth-child(3) > :nth-child(3) > .badge').should('contain', 'Completed')
        cy.get('h4 > .badge').should('contain', '2/3')
    }
    changeMainGuest(){
        this.addGuestDetail()
        cy.wait(3000)
        cy.get('.btn.btn-default.d-none.d-md-inline-block').click({force: true})
        cy.get('h4 > .badge').should('contain', '2/3')
        cy.get(':nth-child(3) > :nth-child(4) > .guest-actions > .guest-edit > div').click({force: true})
        cy.get('.toggle-switch').click().wait(3000)
        cy.get('button[class="btn btn-success btn-sm"]').click({force: true})
        cy.get('.toast-message').invoke('text')
        .then((resp) => {
          expect(resp).to.equal('Data saved Successfully.')
        })
        cy.get('.table > :nth-child(2) > :nth-child(1) > .guest-name').should('have.text', 'Test Guest')
        cy.get(':nth-child(2) > :nth-child(3) > .badge').should('contain', 'Completed')
    }
}