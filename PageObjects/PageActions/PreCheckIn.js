
const bookingElementLocators = require('../PageElements/BookingPageElements.json')
const precheckinElementLocators = require('../PageElements/PreCheckInPageElement.json')
export class precheckinPageElements {

    basicInfoVerification(){
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
    creditCard(){
        cy.get('.mb-4 > .form-section-title > h4').should('contain', 'PAYMENT SUMMARY')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.credit_card).within(() => {
            cy.fillElementsInput('cardNumber', '4242424242424242');
            cy.fillElementsInput('cardExpiry', '1025'); // MMYY
            cy.fillElementsInput('cardCvc', '123');
            cy.fillElementsInput('postalCode', '90210');
          })
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
// Arrival Information Page Methods
    arrivingByCar(){
        this.basicInfoVerification()
        this.creditCard()
        this.questionnaires()
        cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION')
        cy.get('label[for="guestArrivalMethod"]').should('have.text', 'Arriving By')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.arriving_option).select('Car')
        cy.wait(2000)
        cy.get('label[for="standard_check_in_time"]').should('have.text', 'Estimate Arrival Time')
        cy.get(precheckinElementLocators.PreCheckInPageLocators.arrival_time).select('12:00')
        cy.wait(2000)
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
        this.idCardVerification()
        this.takeSelfy()
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
// Document verification
    verification(){
        cy.get('div[class="form-section-title"] h4').should('have.text', '\n                                Upload\n                                copy of valid Driver License\n                            ')
        cy.get('.doc-title').should('have.text', '\n                                        Select Identification Type *')
    }
    idCardVerification(){
        this.verification()
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
        this.creditCardImage()
    }
    drivingLicenseVerification(){
        this.verification()
        const frontImage = 'Images/idCardFront.png'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.driving_license_front)
            .attachFile(frontImage).wait(3000)
        const backImage = 'Images/idCardBack.jpeg'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.driving_license_back)
            .attachFile(backImage).wait(3000)  
        this.creditCardImage()      
    }
    creditCardImage(){
        const cardImage = 'Images/visaCard.jpeg'
        cy.get(precheckinElementLocators.PreCheckInPageLocators.card_image)
          .attachFile(cardImage)
        cy.wait(5000)
        // Validate jpeg type images
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    }
    takeSelfy(){
        cy.get('div[class="gp-box gp-box-of-inner-pages"] p:nth-child(1)').should('have.text', 'Take a selfie to authenticate your identity')
        cy.wait(3000)
        cy.get('.camera-button-container > .btn-success').click({ force : true})
        cy.wait(2000)
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    }
    addNewGuestDetail(){
        cy.get('div[class="gp-box gp-box-of-inner-pages page-tab-01 pre-checkin-tabs"] h4:nth-child(1)').should('have.text', 'Guest Details\n                        1/3')
        cy.get(':nth-child(3) > :nth-child(3) > .badge').should('contain', 'Incomplete')
        cy.get(':nth-child(3) > :nth-child(4) > .guest-actions > .guest-edit > div').click({force: true})
        cy.get('#exampleModalLabel > span').should('contain', 'Adult 2').wait(3000)
        cy.xpath('(//input[@id="6"])[1]').type('Test Guest')
        cy.get('.iti__selected-flag').click()
        cy.get('#iti-0__item-pk').contains('Pakistan (‫پاکستان‬‎)').type('{enter}3047557094')
        cy.xpath('(//input[@id="7"])[1]').type('1997-04-04')
        cy.xpath('(//select[@id="8"])[1]').select("Pakistani")
        // Enter email
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
            .type(generatedUserName + '@mailinator.com')
        cy.xpath('(//select[@id="9"])[1]').select('Female')
        cy.xpath('//input[@id="update-property-address"]')
            .type('Lahore-Islamabad Motorway, Sabzazar Block E Sabzazar Housing Scheme Phase 1 & 2 Lahore, Pakistan{enter}')
        cy.xpath('(//input[@id="11"])[1]').type('54000')
        cy.get('button[class="btn btn-success btn-sm"]').click({force: true}).wait(4000)
        cy.get('.toast-message').invoke('text')
        .then((resp) => {
          expect(resp).to.equal('Data saved Successfully.')
        })
        cy.get(':nth-child(3) > :nth-child(1) > .guest-name').should('have.text', 'Test Guest')
        cy.get(':nth-child(3) > :nth-child(2) > .guest-email').should('contain', generatedUserName + '@mailinator.com')
        cy.get(':nth-child(3) > :nth-child(3) > .badge').should('contain', 'Completed')
        cy.wait(3000)
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    }
    addService1(){
        this.basicInfoVerification()
        this.creditCard()
        this.questionnaires()
        this.arrivingByOther()
        this.drivingLicenseVerification()
        this.takeSelfy()
        this.addNewGuestDetail()
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
        cy.get(':nth-child(7) > .col-12 > .gp-dl > dd').should('contain', 'Oct 04, 2023')
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
        this.contactInfo()
        this.questionnairesValidation()
        this.summaryArrivalByCar()
        cy.get(':nth-child(18) > :nth-child(1) > .form-section-title > h4').should('contain', 'DOCUMENT UPLOADED')
        cy.get(':nth-child(2) > :nth-child(1) > dd > span').should('contain', 'Selfie')
        cy.get(':nth-child(2) > dd > span').should('contain', 'Credit Card Scan')
        cy.get(':nth-child(4) > dd > span').should('contain', 'ID Card')
        this.paymentMethodValidation()
        this.signatureValidation()
    }
    licenseDocValidation(){
        this.contactInfo()
        this.questionnairesValidation()
        this.summaryArrivalByOther()                                    
        cy.get(':nth-child(18) > :nth-child(1) > .form-section-title > h4').should('contain', 'DOCUMENT UPLOADED')
        cy.get(':nth-child(2) > :nth-child(1) > dd > span').should('contain', 'Selfie')
        cy.get(':nth-child(2) > dd > span').should('contain', 'Credit Card Scan')
        cy.get(':nth-child(4) > dd > span').should('contain', "Driver's License")
        this.paymentMethodValidation()
        this.signatureValidation()
    }
    paymentMethodValidation(){
        cy.get(':nth-child(3) > .form-section-title > h4').should('contain', 'PAYMENT METHOD')
        cy.get(':nth-child(18) > :nth-child(4) > .gp-dl > :nth-child(2)').should('contain', 'QA Tester')
        cy.get(':nth-child(18) > :nth-child(4) > .gp-dl > :nth-child(3)').should('contain', '**** **** **** 4242')
    }
    signatureValidation(){
        cy.get('canvas').then($canvas => {
            const canvasWidth = $canvas.width()
            const canvasHeight = $canvas.height()
            const canvasCenterX = canvasWidth / 2
            const canvasCenterY = canvasHeight / 2
            const buttonX = canvasCenterX + ( ( canvasCenterX / 3 ) * 2 )
            const buttonY = canvasCenterY + ( ( canvasCenterY / 3 ) * 2 )
            cy.wrap($canvas)
              .scrollIntoView()
              .click(buttonX, buttonY)
            })
        cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
        cy.get('.page-title').should('contain', 'Welcome')
        cy.get('h1[class="page-title"] span[class="notranslate"]').should('contain', 'QA')
    }
    
}