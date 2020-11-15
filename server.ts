// Imports deno http libraries.
import {serve, ServerRequest} from "https://deno.land/std/http/server.ts";

// Starts server.
const PORT = 80;
const server = serve({port: PORT});

console.log(`Listening on http://localhost:${PORT}.`);

// Runs on every request.
for await (const request : ServerRequest of server){
    // Checks request type.
    if (request.method === "GET"){
        // Returns associated file.
        try {
            if (request.url === "/"){
                request.respond({status: 200, body: await Deno.readFile("./website/index.html")});
            } else {
                request.respond({status: 200, body: await Deno.readFile("./website" + request.url)})
            }
        } catch (e){
            request.respond({status: 404, body: await Deno.readFile("./website/404.html")})
        }
    } else if (request.method === "POST"){
        // Checks if password provided is correct.
        try {
            const buffer: Uint8Array = await Deno.readAll(request.body);
            if (new TextDecoder("utf-8").decode(buffer) == "password"){
                request.respond({status: 200, body: "good job"});
            } else {
                request.respond({status: 200, body: "bad job"});
            }
        } catch (e){
            request.respond({status: 405, body: "There was an error in handling your message."});
        }
    }
}