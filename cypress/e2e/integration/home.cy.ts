/// <reference types="cypress" />

context("Home", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.intercept("https://codaisseur-coders-network.herokuapp.com/posts", {
      count: 2,
      rows: [makeFakePost(1, "Fake post #1"), makeFakePost(2, "Fake post #2")],
    });
  });

  it("h1 should contain text", () => {
    cy.get("h1").should("contain.text", "Codaisseur Coders Network");
  });

  it("homepage contains articles", () => {
    cy.get(".MuiGrid-item").should("exist");
  });

  it("article on homepage contains title", () => {
    cy.get(".MuiGrid-item").should("have.descendants", "h2");
  });

  it("have 2 articles on the homepage", () => {
    cy.get(".MuiGrid-item").should("have.length", 2);
  });
});

function makeFakePost(id: number, title: string) {
  return {
    id,
    title,
    content: "Bla bla bla",
    createdAt: "2020-10-06T14:05:05.976Z",
    updatedAt: "2020-10-06T14:05:05.258Z",
    author_id: 2,
    tags: [],
    post_likes: [],
  };
}
