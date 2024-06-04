import {
    Statement,
    Program,
    Expression,
    BinaryExpr,
    Integer,
    Float,
    Identifier,
} from "./ast";
import { tokenize, Token, TokenType } from "./lexer";

export default class Parser {
    private tokens: Token[] = [];

    private not_eof(): boolean {
        return this.tokens[0].type != TokenType.EOF;
    }

    private at(){
        return this.tokens[0] as Token;
    }

    private next(){
        const prev = this.tokens.shift() as Token;
        return prev;
    }

    private expect(type: TokenType, err: any){
        const prev = this.tokens.shift() as Token;
        if (!prev || prev.type === type){
            console.error("Parser Error:\n", err, prev, " - Expecting: ", type)
        }
        return prev
    }

    public buildAST(srcCode: string): Program {
        this.tokens = tokenize(srcCode);

        const program: Program = {
            kind: "Program",
            body: [],
        };
        // Parse til EOF
        while (this.not_eof()) {
            program.body.push(this.parseStatement());
        }
        return program;
    }

    private parseStatement(): Statement {
        // skip to parseExpression
        return this.parseExpression();
    }

    private parseExpression(): Expression {
        return this.parseAdditionExpression()
    }

    private parseAdditionExpression(): Expression {
        let left = this.parseMultiplicationExpression();

        while (this.at().value == "+" || this.at().value == "-"){
            const operator = this.next().value;
            const right = this.parseMultiplicationExpression();
            left = {
                kind: "BinaryExpr",
                left,
                right,
                operator,
            } as BinaryExpr
        }



        return left;
        
    }
    private parseMultiplicationExpression(): Expression {
        let left = this.parsePrimaryExpression();

        while (this.at().value == "*" || this.at().value == "/" || this.at().value == "%"){
            const operator = this.next().value;
            const right = this.parsePrimaryExpression();
            left = {
                kind: "BinaryExpr",
                left,
                right,
                operator,
            } as BinaryExpr
        }



        return left;
        
    }




    private parsePrimaryExpression(): Expression {
        const tk = this.at().type

        switch (tk) {
            case TokenType.Identifier:
                return { kind: "Identifier", symbol: this.next().value } as Identifier;
            case TokenType.Integer:
                return { kind: "Integer", value: parseInt(this.next().value) } as Integer;
            case TokenType.Float:
                return { kind: "Float", value: parseFloat(this.next().value) } as Float;
            
            case TokenType.OpenParen:
                this.next();
                const value = this.parseExpression();
                this.expect(TokenType.CloseParen, "Unexpected character found inside parentheses");
                return value
            
            default:
                console.error("Unexpected character found: ", this.at())
                // Trick Compiler for TS
                return {} as Statement;
        }
    }



}
