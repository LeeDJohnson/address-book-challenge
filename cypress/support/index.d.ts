declare namespace Cypress {
    interface Chainable {
      mockUserDetail(userId: number): Chainable<void>;
    }
  }