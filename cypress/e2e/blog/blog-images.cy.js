const urls = [
  "/blog/2023/02/01/design-patterns-batch-processing-financial-services.html",
  "/blog/2023/01/12/better-data-better-decisions-public-sector-through-entity-resolution-part-1.html",
  "/blog/2023/01/27/best-practices-and-guidance-cloud-engineers-deploy-databricks-aws-part-2.html",
]
urls.forEach((blogUrl) => {
  describe(`Test Blog post <main> images ${blogUrl}`, () => {
    it("confirms page loaded", () => {
      cy.visit(Cypress.env("base_url") + blogUrl, Cypress.env("auth"))
      cy.wait(5000)
    })
    it("Verifies that images are visible", () => {
      cy.get(`main img[loading="lazy"]`, { includeShadowDom: true }).each(($img) => {
        // Scrolling first to get deferred images
        cy.wrap($img)
          .scrollIntoView({ easing: "linear", duration: 100 })
          .should("be.visible")
      })
    })
    it("Verifies that images have width and height", () => {
      cy.get(`main img[loading="lazy"]`, { includeShadowDom: true }).each(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0)
        expect($img[0].naturalHeight).to.be.greaterThan(0)
      })
    })
  })
})
