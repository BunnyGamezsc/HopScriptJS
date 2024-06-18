import Parser from "./frontend/parser"
import { evaluate } from "./runtime/interpreter";


repl();



async function repl(){
    let SOURCE = 
    `
    55 * (289/17 + 22)
    



    `
    const parser = new Parser();
    console.log("\n Repl v0.1 (HopScriptJS)")
        const input = SOURCE
        if (!input || input.includes("exit")){
            console.log("");
        }

        const program = parser.buildAST(input);
        // console.log(program)

        const result = evaluate(program)
        console.log(result);
}

