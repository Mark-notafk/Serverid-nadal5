const PORT = process.env.PORT || 3000;
const fs = require("fs");

const http = require("http");

const countries = [
  { id: 1, name: "Austria", capital: "Vienna", population: 8901064, currency: "Euro", language: "German" },
  { id: 2, name: "Belgium", capital: "Brussels", population: 11539328, currency: "Euro", language: "Dutch, French, German" },
  { id: 3, name: "Bulgaria", capital: "Sofia", population: 7000039, currency: "Bulgarian Lev", language: "Bulgarian" },
  { id: 4, name: "Croatia", capital: "Zagreb", population: 4067500, currency: "Croatian Kuna", language: "Croatian" },
  { id: 5, name: "Cyprus", capital: "Nicosia", population: 875900, currency: "Euro", language: "Greek, Turkish" },
  { id: 6, name: "Czech Republic", capital: "Prague", population: 10649800, currency: "Czech Koruna", language: "Czech" },
  { id: 7, name: "Denmark", capital: "Copenhagen", population: 5792202, currency: "Danish Krone", language: "Danish" },
  { id: 8, name: "Estonia", capital: "Tallinn", population: 1324820, currency: "Euro", language: "Estonian" }
];


const personInfo = {
    info: {
        name: "Mark",
        hobbies: ["swimming", "trains", "gaming"]
    },
    contact: {
        email: "marktre@gmail.com"
    }
};


const { info: { name, hobbies }, contact: { email } } = personInfo;

const server = http.createServer((req, res) => {

    console.log(req.url, req.method);

    if (req.url === "/contact") {

        res.writeHead(200, { "Content-Type": "text/html" });

    
        const hobbyList = hobbies.join(", ");

        res.end(`
            <h1>Hello, my name is ${name}</h1>
            <p>You can reach me at ${email}</p>

           <h3>My hobbies:</h3>
<p>${hobbyList}</p>
        `);

    } else if (req.url === "/countries") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ countries }));
}
    else if (req.url.startsWith("/countries/")) {

    const id = parseInt(req.url.split("/")[2]);

    const country = countries.find(c => c.id === id);

    res.writeHead(200, { "Content-Type": "application/json" });


    if (country) {
       return res.end(JSON.stringify(country));
     } else {
       return res.end(JSON.stringify({ message: "Country not found" }));
    }
}
else if (req.url.startsWith("/rke143") && req.method === "POST") {

    let body = "";

    req.on("data", chunk => {
        body += chunk.toString();
    });

   req.on("end", () => {

    console.log("BODY:", body);

    const data = JSON.parse(body);

    console.log("DATA:", data);

    if (data.name === "rke" && data.code === "143") {

        const fileData = fs.readFileSync("nodejs.json", "utf-8");

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(fileData);

    } else {

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "invalid credentials" }));
    }
});

}
else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home page");
}

});

server.listen(PORT, () => {
    console.log("Server running on port ${PORT}");
});