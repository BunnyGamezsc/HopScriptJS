export type NodeType = 
| "Program" 
| "Declaration"
| "Integer"
| "Identifier"
| "Float"
| "BinaryExpr"


// var x = 45 - statement VS x = 45 - assignment expression
export interface Statement{
    kind: NodeType;
}

export interface Program extends Statement{
    kind: "Program";
    body: Statement[];
}
export interface Expression {kind: NodeType}

export interface Identifier extends Expression {
    kind: "Identifier";
    symbol: string;
}



export interface Integer extends Expression {
    kind: "Integer";
    value: Number
}

export interface Float extends Expression {
    kind: "Float";
    value: Number
}



// STATEMENTS
export interface Declaration extends Statement{
    kind: "Declaration";
    type: 'var' | 'con'
    name: Identifier
    value: Expression
}



export interface BinaryExpr extends Expression {
    kind: "BinaryExpr";
    left: Expression;
    right: Expression;
    operator: string;
}

