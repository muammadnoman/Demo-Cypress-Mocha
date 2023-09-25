
const bookingElementLocators = require('../PageElements/BookingPageElements.json')
const precheckinElementLocators = require('../PageElements/PreCheckInPageElement.json')
export class precheckinPageElements {

    basicInfo(){
        cy.get('.iti__selected-flag').click()
        cy.get('#iti-0__item-pk').contains('Pakistan (‫پاکستان‬‎)')
            .type('{enter}3047557094') 
        cy.xpath(precheckinElementLocators.PreCheckInPageLocators.date_of_birth)
            .should('have.attr', 'placeholder', 'Date of birth').type('1997-04-04')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.gender).select('Male')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.address)
            .should('have.attr', 'placeholder', 'Please type your address').clear()
            .type('Lahore-Islamabad Motorway, Sabzazar Block E Sabzazar Housing Scheme Phase 1 & 2 Lahore, Pakistan{enter}')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.zip_code)
            .should('have.attr', 'placeholder', 'Zip code').clear().type('54000')
        cy.get('.mt-2 > h4 > .translate').should('have.text', 'GUESTS')
        cy.get('.guest-select-option > :nth-child(1) > .form-group > label > .translate')
            .should('have.text', 'Adults')
        cy.get('.guest-select-option > :nth-child(2) > .form-group > label > .translate')
            .should('have.text', 'Children (2-17 years)')
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    }
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
    
    creditCard(){
        cy.get('.mb-4 > .form-section-title > h4').should('contain', 'PAYMENT SUMMARY')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.credit_card).within(() => {
            cy.fillElementsInput('cardNumber', '4242424242424242');
            cy.fillElementsInput('cardExpiry', '1025'); // MMYY
            cy.fillElementsInput('cardCvc', '123');
            cy.fillElementsInput('postalCode', '90210');
          });
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    }

    questionnaires(){
        cy.get('[data-test="questionnaireTitle"]').should('have.text', 'Some Importent Questions!')
        cy.get('[data-test="questionnaireDesc"]').should('have.text', 'Please answer the below Questions.')
        // Enter Note
        cy.get('#question-103').should('have.attr', 'placeholder', 'Type your answer').clear().type('This is Automation Testing')
        // Enter Date
        cy.xpath('(//input[@id="date_trigger_sync108"])[1]').click()
        cy.xpath('(//button[@type="button"][normalize-space()="4"])[2]').click()
        // Enter Phone Number
        cy.get('.iti__selected-flag').click()
        cy.get('#iti-0__item-pk').contains('Pakistan (‫پاکستان‬‎)').type('{enter}3047557094')
        // Enter Email
        cy.get('#question-110').should('have.attr', 'placeholder', 'Type your answer').clear().type('automation@mailinator.com')
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

// Arrival Information Page Methods
    arrivingByCar(){
        cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION')
        cy.get('label[for="guestArrivalMethod"]').should('have.text', 'Arriving By')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.arriving_option).select('Car')
        cy.wait(2000)
        cy.get('label[for="standard_check_in_time"]').should('have.text', 'Estimate Arrival Time')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.arrival_time).select('12:00')
        cy.wait(2000)
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    }
    arrivingByOther(){
        cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION')
        cy.get('label[for="guestArrivalMethod"]').should('have.text', 'Arriving By')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.arriving_option).select('Other')
        cy.wait(2000)
        cy.get('#other').type('Testing Arrival by Other')
        cy.get('label[for="standard_check_in_time"]').should('have.text', 'Estimate Arrival Time')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.arrival_time).select('10:00')
        cy.wait(2000)
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
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

// Document verification
    verification(){
        cy.get('div[class="form-section-title"] h4').should('have.text', '\n                                Upload\n                                copy of valid Driver License\n                            ')
        cy.get('.doc-title').should('have.text', '\n                                        Select Identification Type *')
    }
    idCardVerification(){
        const frontImage = 'Images/idCardFront.png'
        cy.get('[for="id_card"]').should('contain', 'ID Card')
        cy.get('#id_card').should('not.be.checked').click({force: true}).wait(2000)
        cy.get('div[class="row doc-wrap"] div:nth-child(2) p:nth-child(1)').should('have.text', 'ID Card (Front Side)')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.id_card_front)
            .attachFile(frontImage).wait(3000)
        const backImage = 'Images/idCardBack.jpeg'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.id_card_back)
            .attachFile(backImage)
        cy.wait(3000)
    }
    drivingLicenseVerification(){
        const frontImage = 'Images/idCardFront.png'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.driving_license_front)
            .attachFile(frontImage).wait(3000)
        const backImage = 'Images/idCardBack.jpeg'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.driving_license_back)
            .attachFile(backImage).wait(3000)        
    }
    creditCardImage(){
        const cardImage = 'Images/visaCard.jpeg'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.card_image)
          .attachFile(cardImage)
        cy.wait(5000)
        // Validate jpeg type images
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
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
        // Validate jpeg type images
        const idFrontJpeg = 'Images/idCardFront.jpeg'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.edit_id_front)
            .attachFile(idFrontJpeg, {subjectType: 'drag-n-drop'}).wait(3000)
        const backImageJpeg = 'Images/idCardBack.jpeg'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.edit_id_back)
            .attachFile(backImageJpeg)
        cy.wait(3000)
        const cardImageJpeg = 'Images/visaCard.jpeg'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.edit_card_image)
          .attachFile(cardImageJpeg)
        cy.wait(3000) 
        // Validate jpg type images
        const idFrontjpg = 'Images/idCardFront.jpg'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.edit_id_front)
            .attachFile(idFrontjpg).wait(3000)
        const backImagejpg = 'Images/idCardBack.jpg'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.edit_id_back)
            .attachFile(backImagejpg)
        cy.wait(3000)
        const cardImagejpg = 'Images/visaCard.jpg'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.edit_card_image)
          .attachFile(cardImagejpg)
        cy.wait(3000)
        // Validate pdf type file
        const frontpfd = 'Images/front.pdf'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.edit_id_front)
            .attachFile(frontpfd).wait(3000)
        const backpdf = 'Images/back.pdf'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.edit_id_back)
            .attachFile(backpdf)
        cy.wait(3000)
        const cardpdf = 'Images/card.pdf'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.edit_card_image)
          .attachFile(cardpdf)
        cy.wait(3000) 
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
        const frontImage = 'Images/idCardFront.png'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.driving_license_front)
            .attachFile(frontImage).wait(3000)
        const backImage = 'Images/idCardBack.png'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.driving_license_back)
            .attachFile(backImage).wait(3000) 
        const cardImage = 'Images/visaCard.png'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.card_image)
          .attachFile(cardImage)
        cy.wait(5000)
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
        cy.get('div[class="gp-box gp-box-of-inner-pages"] p:nth-child(1)').should('have.text', 'Take a selfie to authenticate your identity')
    }

    takeSelfy(){
        cy.get('div[class="gp-box gp-box-of-inner-pages"] p:nth-child(1)').should('have.text', 'Take a selfie to authenticate your identity')
        cy.wait(3000)
        cy.get('.camera-button-container > .btn-success').click({ force : true})
        cy.wait(2000)
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    }

    guestVerify(){
        cy.get('div[class="gp-box gp-box-of-inner-pages page-tab-01 pre-checkin-tabs"] h4:nth-child(1)').should('have.text', 'Guest Details\n                        1/3')
        cy.get('table[class="table guest-table"] h6[class="guest-name"]').should('have.text', 'QA Tester')
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    }
    addNewGuestDetail(){
        cy.get('div[class="gp-box gp-box-of-inner-pages page-tab-01 pre-checkin-tabs"] h4:nth-child(1)').should('have.text', 'Guest Details\n                        1/3')
        cy.get('table[class="table guest-table"] h6[class="guest-name"]').should('have.text', 'QA Tester')
        cy.get(':nth-child(3) > :nth-child(4) > .guest-actions > .guest-edit > div').click({force: true})
        cy.get('#exampleModalLabel > span').should('contain', '')
        cy.xpath('(//input[@id="6"])[1]').type('Test Guest')
        cy.get('.iti__selected-flag').click()
        cy.get('#iti-0__item-pk').contains('Pakistan (‫پاکستان‬‎)').type('{enter}3047557094')
        cy.xpath('(//input[@id="7"])[1]').type('1997-04-04')
        cy.xpath('(//select[@id="8"])[1]').select("Pakistani")
        cy.xpath('(//input[@id="1"])[1]').type('guest2@mailinator.com')
        cy.xpath('(//select[@id="9"])[1]').select('Female')
        cy.xpath('//input[@id="update-property-address"]')
            .type('Lahore-Islamabad Motorway, Sabzazar Block E Sabzazar Housing Scheme Phase 1 & 2 Lahore, Pakistan{enter}')
        cy.xpath('(//input[@id="11"])[1]').type('54000')
        cy.get('button[class="btn btn-success btn-sm"]').click({force: true}).wait(4000)
        cy.get(':nth-child(3) > :nth-child(1) > .guest-name').should('have.text', 'Test Guest')
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    }

    addService1(){
        cy.get('div[class="gp-inset"] div:nth-child(1) div:nth-child(2) div:nth-child(2) h3:nth-child(1) span:nth-child(1)').should('have.text', 'Test Upshell')
        cy.xpath('//span[normalize-space()="E-bike Rental"]').should('have.text', 'E-bike Rental')
        cy.get('label[for="add_on_check_598"]').click({force: true})
        cy.get('div[class="text-center mt-4 lead fw-500"] span[class="notranslate"]')
        .should('have.text', 'CA$100')
        .then($addsAmount => {
          const adds_on_total = $addsAmount.text(); 
          cy.log(adds_on_total)
          cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
          cy.get('.col-md-4 > .table-responsive > .table > tr > .text-right')
          .then($amountText => {
            const Total = $amountText.text(); 
            expect(Total).to.include(adds_on_total)
          })  
        })
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    }
    addService2(){
        cy.xpath('//span[normalize-space()="E-bike Rental"]').should('have.text', 'E-bike Rental')
    }
    allAddServices(){
        cy.get('div[class="gp-inset"] div:nth-child(1) div:nth-child(2) div:nth-child(2) h3:nth-child(1) span:nth-child(1)').should('have.text', 'Test Upshell')
        cy.xpath('//span[normalize-space()="E-bike Rental"]').should('have.text', 'E-bike Rental')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.select_all_addOns).click({force: true})
        cy.get('div[class="text-center mt-4 lead fw-500"] span[class="notranslate"]')
        .should('have.text', 'CA$300')
        .then($addsAmount => {
          const adds_on_total = $addsAmount.text(); 
          cy.log(adds_on_total)
          cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
          cy.get('.col-md-4 > .table-responsive > .table > tr > .text-right')
          .then($amountText => {
            const Total = $amountText.text(); 
            expect(Total).to.include(adds_on_total)
          })  
        })
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true}) 
    }
    contactInfo(){
        cy.get(':nth-child(3) > .col-12 > .form-section-title > h4').should('contain', 'CONTACT INFO')
        cy.get(':nth-child(4) > .row > :nth-child(2) > .gp-dl > dd').should('contain', '+923047557094')
        cy.get(':nth-child(4) > .row > :nth-child(3) > .gp-dl > dd').should('contain', 'April 4, 1997')
        cy.get(':nth-child(4) > .row > :nth-child(4) > .gp-dl > dd').should('contain', 'Pakistani')
        cy.get(':nth-child(6) > .gp-dl > dd').should('contain', 'Male')
        cy.get(':nth-child(7) > .gp-dl > dd')
            .should('contain', 'Lahore-Islamabad Motorway, Sabzazar Block E Sabzazar Housing Scheme Phase 1 & 2 Lahore, Pakistan')
        cy.get(':nth-child(8) > .gp-dl > dd').should('contain', '54000')
        cy.get(':nth-child(9) > .gp-dl > dd').should('have.text',  '\n                                        Adults\n                                        2,\n                                        Child\n                                        1\n                                    ')
    }
    questionnairesValidation(){
        cy.get(':nth-child(5) > .col-12 > .form-section-title > h4').should('contain', 'QUESTIONNAIRE')
        cy.get(':nth-child(6) > .col-12 > .gp-dl > dd').should('contain', 'This is Automation Testing')
        cy.get(':nth-child(7) > .col-12 > .gp-dl > dd').should('contain', 'Sep 04, 2023')
        cy.get(':nth-child(8) > .col-12 > .gp-dl > dd').should('contain', '+923047557094')
        cy.get(':nth-child(9) > .col-12 > .gp-dl > dd').should('contain', 'automation@mailinator.com')
        cy.get(':nth-child(10) > .col-12 > .gp-dl > dd').should('contain', 'Yes')
        cy.get(':nth-child(11) > .col-12 > .gp-dl > dd').should('contain', '2')
        cy.get(':nth-child(12) > .col-12 > .gp-dl > dd').should('contain', 'This is Test Automation Testing Some Basic Infos')
        cy.get(':nth-child(13) > .col-12 > .gp-dl > dd').should('contain', 'Bread Butter')
        cy.get(':nth-child(14) > .col-12 > .gp-dl > dd').should('contain', 'Spa,Jim,Swimming Pool')
    }
    summaryArrivalByCar(){
        cy.get(':nth-child(16) > .col-12 > .form-section-title > h4').should('contain', 'ARRIVAL')
        cy.get(':nth-child(17) > :nth-child(1) > .gp-dl > dd').should('contain', 'Car')
        cy.get(':nth-child(17) > :nth-child(2) > .gp-dl > dd').should('contain', '12:00')
    }
    summaryArrivalByOther(){
        cy.get(':nth-child(16) > .col-12 > .form-section-title > h4').should('contain', 'ARRIVAL')
        cy.get(':nth-child(17) > :nth-child(1) > .gp-dl > dd').should('contain', 'Testing Arrival by Other')
        cy.get(':nth-child(17) > :nth-child(2) > .gp-dl > dd').should('contain', '10:00')
    }
    idDocValidation(){
        cy.get(':nth-child(18) > :nth-child(1) > .form-section-title > h4').should('contain', 'DOCUMENT UPLOADED')
        cy.get(':nth-child(2) > :nth-child(1) > dd > span').should('contain', 'Selfie')
        cy.get(':nth-child(2) > dd > span').should('contain', 'Credit Card Scan')
        cy.get(':nth-child(4) > dd > span').should('contain', 'ID Card')
    }
    licenseDocValidation(){
        cy.get(':nth-child(18) > :nth-child(1) > .form-section-title > h4').should('contain', 'DOCUMENT UPLOADED')
        cy.get(':nth-child(2) > :nth-child(1) > dd > span').should('contain', 'Selfie')
        cy.get(':nth-child(2) > dd > span').should('contain', 'Credit Card Scan')
        cy.get(':nth-child(4) > dd > span').should('contain', "Driver's License")
    }
    paymentMethodValidation(){
        cy.get(':nth-child(3) > .form-section-title > h4').should('contain', 'PAYMENT METHOD')
        cy.get(':nth-child(18) > :nth-child(4) > .gp-dl > :nth-child(2)').should('contain', 'QA Tester')
        cy.get(':nth-child(18) > :nth-child(4) > .gp-dl > :nth-child(3)').should('contain', '**** **** **** 4242')
    }
    signatureValidation(){
        cy.get('canvas').then($canvas => {
            const canvasWidth = $canvas.width();
            const canvasHeight = $canvas.height();
            const canvasCenterX = canvasWidth / 2;
            const canvasCenterY = canvasHeight / 2;
            const buttonX = canvasCenterX + ( ( canvasCenterX / 3 ) * 2 );
            const buttonY = canvasCenterY + ( ( canvasCenterY / 3 ) * 2 );
            cy.wrap($canvas)
              .scrollIntoView()
              .click(buttonX, buttonY)
          });
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
        cy.get('.page-title').should('contain', 'Welcome')
        cy.get('h1[class="page-title"] span[class="notranslate"]').should('contain', 'QA')
    }
    
}