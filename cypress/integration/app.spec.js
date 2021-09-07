describe('Note Taking App test', () => {
  const newItem = 'Test New Note'
  const newTags = ['New Tag 1{enter}', 'New Tag 2{enter}'];
  const editedItem = ' Edited';
  it('should able to fill the form then click cancel', () => {
    cy.visit('/')
    cy.get('#new-note')
      .type(newItem)

    cy.get('#new-tags')
      .type(newTags[0])
      .type(newTags[1])    
    
    cy.get('#btn-cancel').click();

    cy.get('#new-note')
      .should('be.empty')
    cy.get('#new-tags')
      .should('be.empty')
    
    cy.wait(500)
  });

  it('should able to add new notes', () => {
    cy.get('#new-note')
      .type(newItem)

    cy.get('#new-tags')
      .type(newTags[0])
      .type(newTags[1])
      
    cy.get('#btn-save').click();

    cy.get('#progress-save').should('not.exist')
    
    cy.get("[data-test-id='note-item']").last().find("div > div.MuiBox-root > p").should('have.text', newItem)
    cy.wait(500)
  });

  it('should able to filter by tag', () => {
    cy.get("[data-test-id='note-item']").last().find("[role='button']").first().click();
    cy.get("[data-test-id='note-item']").last().find("div > div.MuiBox-root > p").should('have.text', newItem)
    cy.wait(500)
  })

  it('should able to edit an item', () => {
    cy.get("[data-test-id='note-item']").last().find("[data-test-id='edit-note']").first().click();

    cy.get('#new-note')
      .type(editedItem)

    cy.get('#btn-save').click();

    cy.get('#progress-save').should('not.exist')
    
    cy.get("[data-test-id='note-item']").last().find("div > div.MuiBox-root > p").should('have.text', newItem + editedItem)
    cy.wait(500)
  })

  it('should able to delete an item', () => {
    cy.get("[data-test-id='note-item']").last().find("[data-test-id='delete-note']").first().click();
    cy.wait(500)
  })
});