// atividade-aula02.js

console.log("\n== 1) Tipos primitivos + typeof ==");

const primString = "Olá";
const primNumber = 42;
const primBoolean = true;
let primUndefined; // undefined
const primNull = null;
const primBigInt = 9007199254740991n;
const primSymbol = Symbol("id");

console.log(typeof primString);   // "string"
console.log(typeof primNumber);   // "number"
console.log(typeof primBoolean);  // "boolean"
console.log(typeof primUndefined); // "undefined"
console.log(typeof primNull);     // "object"  (bug histórico do JS, null não é objeto de verdade)
console.log(typeof primBigInt);   // "bigint"
console.log(typeof primSymbol);   // "symbol"

console.log("\n== 2) BigInt e Symbol ==");

// BigInt
const big = 123456789012345678901234567890n;
console.log(big);           // 123456789012345678901234567890n
console.log(typeof big);    // "bigint"

// Symbol
const s1 = Symbol("id");
const s2 = Symbol("id");
console.log(s1 === s2);     // false (Symbols com mesma descrição ainda são únicos)
console.log(typeof s1);     // "symbol"

console.log("\n== 3) Operadores matemáticos, lógicos e comparação ==");

// Matemáticos
console.log(10 + 5);        // 15
console.log(10 * 3);        // 30

// Lógicos
console.log(true && false); // false
console.log(true || false); // true

// Comparação
console.log(5 > 3);         // true
console.log(5 == "5");      // true  (== faz coerção de tipo)
console.log(5 === "5");     // false (=== compara valor e tipo)

// Mais um exemplo de comparação
console.log(0 == false);    // true  (coerção)
console.log(0 === false);   // false (tipos diferentes)

console.log("\n== 4) Concatenação e conversão dinâmica ==");

console.log(2 + "2");       // "22"  (number + string => concatenação)
console.log(2 + (+"2"));    // 4     (+"2" converte string para number)

// Outro exemplo onde + vira concatenação
console.log("Olá, " + "mundo!"); // "Olá, mundo!"

// Misturando tipos
console.log("Resultado: " + 10 + 5); // "Resultado: 105" (concatena da esquerda para a direita)
console.log("Resultado: " + (10 + 5)); // "Resultado: 15" (parênteses forçam soma antes)

console.log("\n== 5) Escopo léxico e blocos {} ==");

// {} sozinho cria um bloco
{
  const dentroDoBloco = "Estou dentro do bloco";
  console.log(dentroDoBloco); // "Estou dentro do bloco"
}
// console.log(dentroDoBloco); // ERRO se descomentar: não existe fora do bloco

// “De fora pra dentro”
const fora = "valor fora";
{
  console.log(fora); // "valor fora" (variável de fora acessível dentro)
}

// “De dentro pra fora” com const/let (não pode acessar fora)
{
  let internoLet = "interno let";
  const internoConst = "interno const";
  console.log(internoLet);   // "interno let"
  console.log(internoConst); // "interno const"
}
// console.log(internoLet);   // ERRO se descomentar
// console.log(internoConst); // ERRO se descomentar

// Permissividade do var vazando do if para fora
if (true) {
  var varNoIf = "var dentro do if";
  let letNoIf = "let dentro do if";
  console.log(varNoIf); // "var dentro do if"
  console.log(letNoIf); // "let dentro do if"
}
console.log(varNoIf); // "var dentro do if" (vazou do if, var é função/global scoped)
// console.log(letNoIf); // ERRO se descomentar: let não existe fora do bloco

console.log("\n== 6) Shadowing com const ==");

const bloco = "valor";
console.log("Fora do if:", bloco); // "Fora do if: valor"

if (true) {
  console.log("Dentro do if, antes do bloco interno:", bloco); // "valor"
  {
    const bloco = "outro valor";
    console.log("Dentro do bloco interno:", bloco); // "outro valor"
  }
  console.log("Dentro do if, depois do bloco interno:", bloco); // "valor"
}

console.log("Fora do if, depois de tudo:", bloco); // "valor" (const de fora não foi alterado)

console.log("\n== 7) Imutabilidade de primitivos ==");

let texto = "abc";
texto.toUpperCase(); // parece mudar, mas não muda a string original
console.log(texto);  // "abc" (string original continua igual)

texto = texto.toUpperCase(); 
console.log(texto);  // "ABC" (agora sim, reatribuímos o resultado)

// Outro exemplo rápido
let numero = 10;
numero.toString();   // não muda o número
console.log(numero); // 10

console.log("\n== 8) Assincronismo com setTimeout ==");

console.log("Explicação: setTimeout entra na fila e roda depois do código atual terminar."); 
// "Explicação: setTimeout entra na fila e roda depois do código atual terminar."

console.log("\n-- 8.1) Exemplo A / setTimeout(B, 0) / C --");

console.log("A"); // "A"

setTimeout(() => {
  console.log("B"); // "B" (executa depois de todo o código síncrono, mesmo com 0ms)
}, 0);

console.log("C"); // "C"

// Ordem real no console: A, C, B

console.log("\n-- 8.2) Dois timeouts: 0ms e 100ms --");

setTimeout(() => {
  console.log("Timeout 0ms"); // "Timeout 0ms" (primeiro timeout a rodar)
}, 0);

setTimeout(() => {
  console.log("Timeout 100ms"); // "Timeout 100ms" (roda depois do de 0ms, se o event loop estiver livre)
}, 100);

console.log("Fim síncrono"); // "Fim síncrono" (aparece antes dos timeouts)

// Ordem típica no console:
// 1) Fim síncrono
// 2) Timeout 0ms
// 3) Timeout 100ms

// Fim do arquivo. Para rodar: node atividade-aula02.js