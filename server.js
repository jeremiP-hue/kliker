import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = Number(process.env.PORT || 3000);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "data");
const SCORES_FILE = path.join(DATA_DIR, "wyniki.json");

const headers = {
  "Access-Control-Allow-Origin": process.env.CLIENT_ORIGIN || "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const sendJson = (response, statusCode, data) => {
  response.writeHead(statusCode, {
    ...headers,
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(data));
};

const readScores = async () => {
  try {
    const content = await readFile(SCORES_FILE, "utf8");
    const scores = JSON.parse(content);
    return Array.isArray(scores)
      ? scores
          .map((score) => ({
            ...score,
            czas_wygranej: Number(score.czas_wygranej),
          }))
          .filter((score) => Number.isFinite(score.czas_wygranej))
      : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
};

const saveScores = async (scores) => {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(SCORES_FILE, `${JSON.stringify(scores, null, 2)}\n`);
};

const readRequestBody = (request) =>
  new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;

      if (body.length > 10_000) {
        request.destroy();
        reject(new Error("Request body is too large."));
      }
    });

    request.on("end", () => resolve(body));
    request.on("error", reject);
  });

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "OPTIONS") {
    response.writeHead(204, headers);
    response.end();
    return;
  }

  try {
    if (request.method === "GET" && url.pathname === "/wyniki") {
      const scores = await readScores();
      sendJson(response, 200, scores);
      return;
    }

    if (request.method === "POST" && url.pathname === "/wynik") {
      const body = await readRequestBody(request);
      const payload = JSON.parse(body || "{}");
      const name = String(payload.name || "").trim().slice(0, 40);
      const czas_wygranej = Number(payload.czas_wygranej);

      if (!name || !Number.isFinite(czas_wygranej) || czas_wygranej < 0) {
        sendJson(response, 400, { error: "Nieprawidlowe dane wyniku." });
        return;
      }

      const scores = await readScores();
      const nextScores = [...scores, { name, czas_wygranej }]
        .sort((a, b) => a.czas_wygranej - b.czas_wygranej)
        .slice(0, 20);

      await saveScores(nextScores);
      sendJson(response, 201, { ok: true, wynik: { name, czas_wygranej } });
      return;
    }

    sendJson(response, 404, { error: "Nie znaleziono endpointu." });
  } catch (error) {
    console.error(error);
    sendJson(response, 500, { error: "Blad serwera." });
  }
});

server.listen(PORT, () => {
  console.log(`API wynikow dziala na http://localhost:${PORT}`);
});
