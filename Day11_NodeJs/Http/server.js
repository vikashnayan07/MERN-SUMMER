const http = require("http");
const fsPromises = require("fs/promises");
const fs = require("fs");
const url = require("url");

const dataText = fs.readFileSync("./data.json");
const data = JSON.parse(dataText);

const app = http.createServer(async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  const { query, pathname } = url.parse(req.url, true);

  switch (pathname) {
    case "/": {
      const bf = await fsPromises.readFile("./homepage.html");
      res.end(bf);
      break;
    }
    case "/products": {
      const bf = await fsPromises.readFile("./products.html");
      let text = bf.toString();
      let productsText = "";
      for (let i = 0; i < data.length; i++) {
        productsText += `<div class="product-card">
                        <h3>${data[i].title}</h3>
                        <img src="${data[i].thumbnail}" alt='product-image' height='200'>
                        <p>${data[i].description}</p>
                        <a href="/view?id=${data[i].id}" target="_blank">More</a>
                    </div>`;
      }
      text = text.replace("$PRODUCTS$", productsText);
      res.end(text);
      break;
    }
    case "/view": {
      const bf = await fsPromises.readFile("./views.html");
      let text = bf.toString();
      const product = data.find((elem) => {
        if (elem.id == query.id) return true;
        else return false;
      });

      text = text.replace(
        "$VIEWS",
        `<div><h2>This is product id = ${product.title}</h2>
        <img src="${product.thumbnail}" alt='product-image' height='200'>
        </div>`
      );
      res.end(text);
      break;
    }
    default: {
      res.end("<h2>Oops! Page not found...</h2>");
    }
  }
});

app.listen(1400, () => {
  console.log("--------- Server Started ----------");
});
