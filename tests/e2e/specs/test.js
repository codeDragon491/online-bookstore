// https://docs.cypress.io/api/table-of-contents

describe('Items API test cases', () => {
  const baseURL = 'https://frozen-wave-24832.herokuapp.com/'

  it('The API responds with an error status code (eg HTTP 500).', () => {
    const errorMsg = 'Something went wrong. Try again later'
    cy.intercept(
      'GET',
      `${baseURL}/items`,
      { statusCode: 500 },
    ).as('getServerFailure')

    cy.visit('http://172.16.3.255:8080/')

    cy.wait('@getServerFailure')

    cy.get('[data-cy="error"]')
      .should('exist')
      .contains(errorMsg)
  })

  it('The request fails (eg connection timeout)', () => {
    const errorMsg = 'Something went wrong. Try again later'
    cy.intercept(
      'GET',
      `${baseURL}/items`,
      { forceNetworkError: true },
    ).as('getNetworkFailure')

    cy.visit('http://172.16.3.255:8080/')

    cy.wait('@getNetworkFailure')

    cy.get('[data-cy="error"]')
      .should('exist')
      .contains(errorMsg)
  })

  it('The api request for items completes successfully.', () => {
    cy.intercept(
      'GET',
      `${baseURL}/items`,
    ).as('getItemsComplete')

    cy.visit('http://172.16.3.255:8080/')

    cy.wait('@getItemsComplete')

    cy.get('[data-cy="items"]')
      .should('exist')
      .find('[data-cy="item"]')
      .should('have.length.least', 1)
  })
})

describe('Purchasing items test cases', () => {
  const baseURL = 'https://frozen-wave-24832.herokuapp.com/'

  const today = new Date()
  const date = today.getDate()
  const month = today.getMonth()

  it('Simulate purchasing on the 1st of August.', () => {
    cy.intercept(
      'GET',
      `${baseURL}/items`,
    ).as('getItemsComplete')

    cy.visit('http://172.16.3.255:8080/')

    cy.wait('@getItemsComplete')

    cy.get('[data-cy="item"]:first [data-cy="button"]').click()

    cy.visit('http://172.16.3.255:8080/basket').then(() => {
      if (date === 1 && month === 7) {
        cy.get('.total-amount-discount span:nth-child(1)').contains('8.44 €')
      } else cy.get('.total-amount-discount span:nth-child(1)').should('not.exist')
    })
  })

  it('Simulate purchasing on any other date.', () => {
    cy.intercept(
      'GET',
      `${baseURL}/items`,
    ).as('getItemsComplete')

    cy.visit('http://172.16.3.255:8080/')

    cy.wait('@getItemsComplete')

    cy.get('[data-cy="item"]:first [data-cy="button"]').click()

    cy.visit('http://172.16.3.255:8080/basket').then(() => {
      if (date !== 1 || month !== 7) {
        cy.get('.total-amount span:nth-child(1)').contains('10.55 €')
      } else cy.get('.total-amount span:nth-child(1)').should('not.exist')
    })
  })
})
