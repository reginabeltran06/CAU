const fs = require("fs");
const path = require("path");

function check(pathStr) {
  return fs.existsSync(path.join(process.cwd(), pathStr));
}

console.log("🔍 Verificando estructura del proyecto...\n");

const checks = [
  ["server/", check("server")],
  ["server/package.json", check("server/package.json")],
  ["server/server.js (o index.js)", check("server/server.js") || check("server/index.js")],
  ["server/.env", check("server/.env")],

  ["client/", check("client")],
  ["client/package.json", check("client/package.json")],
  ["client/src/", check("client/src")],
  ["client/public/", check("client/public")],

  ["root package.json (opcional, pero permitido)", check("package.json")],

  ["NO debe existir package-lock.json en root", !check("package-lock.json")],
  ["NO debe existir node_modules en root", !check("node_modules")],
  ["NO debe existir .env en root", !check(".env")],
];

let allGood = true;

checks.forEach(([desc, ok]) => {
  if (ok) console.log("✅", desc);
  else {
    console.log("❌", desc);
    allGood = false;
  }
});

console.log("\n" + (allGood ? "🎉 Todo parece estar en orden." : "⚠️ Hay problemas arriba señalados.") );
