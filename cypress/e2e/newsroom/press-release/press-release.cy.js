describe("Press Release Page E2E", () => {
  it("'should succesfully load each url in the sitemap", () => {
    cy.request({
      url: "http://localhost:9000/sitemap/sitemap-0.xml",
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
      },
      body: {
        _vercel_password: "BigDataSimple",
      },
    })
      .as("sitemap")
      .then((response) => {
        const domain = "http://localhost:9000"
        const urls = Cypress.$(response.body)
          .find("loc")
          .toArray()
          .map((el) => el.innerText)

        urls.forEach((url) => {
          let newUrl = new URL(url)
          newUrl = domain + newUrl.pathname
          cy.request({
            url: newUrl,
            headers: {
              "Content-Type": "text/html",
              accept: "*/*",
              "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
            },
          }).then((resp) => {
            expect(resp.status).to.eq(200)
          })
          cy.visit(newUrl)
          cy.get('[data-cy="title"').invoke("text").should("have.length.gt", 0)
        })
      })
  })
})
