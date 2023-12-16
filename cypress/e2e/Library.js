///<reference types="Cypress"/>

describe("Api Testing", () => {
  let randomisbn = Math.floor(Math.random() * 14783);
  let randomaisle = Math.floor(Math.random() * 5140);
  let randombookname = [
    "The Shadow of the Wind",
    "To Kill a Mockingbird",
    "1984",
    "Pride and Prejudice",
    "The Catcher in the Rye",
    "The Great Gatsby",
    "The Hobbit",
    "Harry Potter and the Sorcerer's Stone",
    "The Lord of the Rings",
    "Brave New World",
    "The Hunger Games",
    "The Da Vinci Code",
    "The Alchemist",
    "The Martian",
    "The Name of the Wind",
  ];

  let randomfullname = [
    "Emma Smith",
    "Liam Johnson",
    "Olivia Williams",
    "Noah Brown ",
    "Ava ones ",
    "William Garcia",
    "Sophia Miller ",
    "James Davis",
    "Isabella Rodriguez",
    "Oliver Martinez",
    "Amelia Hernandez",
    "Elijah Lopez",
    "Charlotte Gonzalez ",
    "Benjamin Wilson",
    "Mia Anderson",
  ];

  let randomindexforbookname = Math.floor(
    Math.random() * randombookname.length
  );
  let randomindexforfullname = Math.floor(
    Math.random() * randomfullname.length
  );

  it("POST", () => {
    let BASEURL = "https://rahulshettyacademy.com/Library/Addbook.php";

    let RequestBody = {
      name: randombookname[randomindexforbookname],
      isbn: randomisbn,
      aisle: randomaisle,
      author: randomfullname[randomindexforfullname],
    };

    cy.request({
      method: "POST",
      url: BASEURL,
      body: RequestBody,
    }).then((Response) => {
      cy.log(Response.body);
      expect(Response.status).to.eq(200);
      expect(Response.body.Msg).to.eq("successfully added");
    });
  });

  it("GET", () => {
    let BASEURL = `https://rahulshettyacademy.com/Library/GetBook.php?ID=${randomisbn}${randomaisle}`;

    cy.request({
      method: "GET",
      url: BASEURL,
    }).then((Response) => {
      expect(Response.body[0].author).to.eq(
        randomfullname[randomindexforfullname]
      );
      expect(Response.status).to.eq(200);
    });
  });

  it("DELETE", () => {
    let BASEURL = "https://rahulshettyacademy.com/Library/DeleteBook.php";

    let RequestBody = {
      ID: `${randomisbn}${randomaisle}`,
    };

    cy.request({
      method: "DELETE",
      url: BASEURL,
      body: RequestBody,
    }).then((Response) => {
      expect(Response.status).to.eq(200);
      expect(Response.body.msg).to.eq("book is successfully deleted");
    });
  });

  it("GET After deleted", () => {
    let BASEURL = `https://rahulshettyacademy.com/Library/GetBook.php?ID=${randomisbn}${randomaisle}`;

    cy.request({
      method: "GET",
      url: BASEURL,
      failOnStatusCode: false,
    }).then((Response) => {
      expect(Response.status).to.eq(404);
      expect(Response.body.msg).to.eq(
        "The book by requested bookid / author name does not exists!"
      );
    });
  });
});
