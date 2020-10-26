// Imports 'http' and 'fs' from the deno std libraries.
import { serve, ServerRequest } from "https://deno.land/std/http/server.ts";

const PORT = 80;
const server = serve({ port: PORT });

console.log(`Listening on http://localhost:${PORT}.`);

for await (const request : ServerRequest of server){
    if (request.method === "GET"){
        try {
            if (request.url === "/"){
                request.respond({status: 200, body: await Deno.readFile("./website/index.html")});
                await request.finalize();
            } else {
                request.respond({status: 200, body: await Deno.readFile("./website/" + request.url.substring(1))});
                await request.finalize();
            }
        } catch (e) {
            request.respond({status: 404, body: await Deno.readFile("./website/404.html")})
            await request.finalize();
        }
    } else {
        request.respond({status: 405});
        await request.finalize();
    }
}