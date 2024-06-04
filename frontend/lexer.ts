// var x = 45

export enum TokenType {
    Identifier,

    Integer,
    Float,
    Equals,
    OpenParen,
    CloseParen,
    BinaryOperator,
    Variable,
    Constant,
    EOF // End of File
}


const KEYWORDS: Record<string,TokenType> = {
    "var": TokenType.Variable,
    "con": TokenType.Constant
}


export interface Token {
    value: string,
    type: TokenType
}


function token (value = "", type: TokenType): Token{
    return {value, type};
}

function isskippable (str: string){
    return str == ' ' || str == '\n' || str == '\t'
}


function isalpha(str:string) {
    return str.toUpperCase() != str.toLowerCase();
}

function isint(str:string) {
    const c = str.charCodeAt(0);
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
    return (c >= bounds[0] && c <= bounds[1]);
}

export function tokenize (srcCode: string): Token[] {
    const tokens = new Array<Token>();
    const src = srcCode.split("");

    // Build each token until EOF
    while (src.length > 0) {
        if (src[0] == "("){
            tokens.push(token(src.shift(),TokenType.OpenParen))
        } else if (src[0] == ")"){
            tokens.push(token(src.shift(),TokenType.CloseParen))
        } else if (src[0] == "="){
            tokens.push(token(src.shift(),TokenType.Equals))
        } else if (src[0] == "+" || src[0] == "-" || src[0] == "*" || src[0] == "/" || src[0] == "%"){
            tokens.push(token(src.shift(),TokenType.BinaryOperator))
        } else {
            // MULTI Character TOKENS
            if (isint(src[0])){
                let num = ""
                while (src.length > 0 && isint(src[0])){
                    num += src.shift();
                }

                tokens.push(token(num, TokenType.Integer))
            } else if (isalpha(src[0])){
                let id = ""
                while (src.length > 0 && isalpha(src[0])){
                    id += src.shift();
                }
                
                // check for reserved keywords

                const reserved = KEYWORDS[id];
                if (reserved == undefined){
                    tokens.push(token(id, TokenType.Identifier))
                }else{
                    tokens.push(token(id, reserved))
                }



                
            } else if (isskippable(src[0])){
                src.shift();
            } else {
                console.log("Invalid character found in source: ", src[0])
                
            }
        }
    }
    tokens.push({type: TokenType.EOF, value: "EOF"})
    return tokens
}

// const source = "con x = 45 * ( 4 / 3 )"
// for (const token of tokenize(source)){
//     console.log(token)
// }