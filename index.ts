import figlet from "figlet";

const server = Bun.serve({
    port: 3000,
    fetch(req) {
        const body = figlet.textSync('Felipe!');
        return new Response(body);
    },
  });

  console.log(Bun.version)
  
  console.log(`Listening on http://localhost:${server.port} ...`);