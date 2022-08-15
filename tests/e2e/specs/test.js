// https://docs.cypress.io/api/table-of-contents

describe('Items API test cases', () => {
  const baseURL = 'https://frozen-wave-24832.herokuapp.com/'

  it('The API responds with an error status code (eg HTTP 500).', () => {
    const errorMsg = 'Something went wrong. Try again later'
    cy.intercept(
      'GET',
      `${baseURL}/items`,
      { statusCode: 500 }
    ).as('getServerFailure')

    cy.visit('http://172.16.3.255:8080/')
    
    cy.wait('@getServerFailure')

    cy.get('[data-cy="error"]')
      .contains(errorMsg)
      .should('be.visible')
  })


  it('The request fails (eg connection timeout)', () => {
    const errorMsg = 'Something went wrong. Try again later'
    cy.intercept(
      'GET',
      `${baseURL}/items`,
      { forceNetworkError: true }
    ).as('getNetworkFailure')

    cy.visit('http://172.16.3.255:8080/')

    cy.wait('@getNetworkFailure')

    cy.get('[data-cy="error"]')
      .contains(errorMsg)
      .should('be.visible')
  })

  it('The api request for items completes successfully.', () => {
    cy.intercept(
      'GET',
      `${baseURL}/items`,
    ).as('getItemsComplete')

    cy.visit('http://172.16.3.255:8080/')

    cy.wait('@getItemsComplete')

    cy.get('[data-cy="items"]')
      .find('[data-cy="item"]')
      .should('be.visible')
      .should('have.length.least', 1)
  })
})
