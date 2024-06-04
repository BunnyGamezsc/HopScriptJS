import Parser from "./frontend/parser"


repl();



async function repl(){
    let SOURCE = 
    `
    10 + 5 *3



    `
    const parser = new Parser();
    console.log("\n Repl v0.1 (HopScriptJS)")
        const input = SOURCE
        if (!input || input.includes("exit")){
            console.log("");
        }

        const program = parser.buildAST(input);
        console.log(program)
}

