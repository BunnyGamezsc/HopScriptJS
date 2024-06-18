import { ValueType, RuntimeVal, IntegerVal, NullVal, FloatVal } from './values';
import { BinaryExpr, Float, Integer, NodeType, Program, Statement } from '../frontend/ast';


function evaluateNumericBinaryExpr(lhs: IntegerVal | FloatVal, rhs: IntegerVal | FloatVal, operator: string): IntegerVal | FloatVal {
    let result = 0;
    if (operator == "+"){
        result = lhs.value + rhs.value
    }
    else if (operator == "-"){
        result = lhs.value + rhs.value
    }
    else if (operator == "*"){
        result = lhs.value * rhs.value
    }
    else if (operator == "/"){
        // TODO: Dividing by ZERO catching
        result = lhs.value / rhs.value
    }
    else {
        result = lhs.value % rhs.value
    }

    if (Number.isInteger(result)){
        return {value: result, type: "integer"}
    }else {
        return {value: result, type: "float"}
    }


}



function evaluateBinaryExpr(binop: BinaryExpr): RuntimeVal {

    const leftSide = evaluate(binop.left);
    const rightSide = evaluate(binop.right);
    if (leftSide.type == "integer" && rightSide.type == "integer") {
        return evaluateNumericBinaryExpr(leftSide as IntegerVal, rightSide as IntegerVal, binop.operator)
    } else if (leftSide.type == "float" || rightSide.type == "float") {
        return evaluateNumericBinaryExpr(leftSide as FloatVal, rightSide as FloatVal, binop.operator)
    }


    // IF one or other is null
    return { type: "null", value: "null" } as NullVal;

}
function evaluateProgram(program: Program): RuntimeVal {
    let lastEvaluated: RuntimeVal = { type: 'null', value: "null" } as NullVal;
    for (const statement of program.body) {
        lastEvaluated = evaluate(statement);
    }
    return lastEvaluated
}



export function evaluate(astNode: Statement): RuntimeVal {

    switch (astNode.kind) {
        case "Integer":
            return { value: (astNode as Integer).value, type: "integer" } as IntegerVal
            case "Float":
            return { value: (astNode as Float).value, type: "float" } as FloatVal
        case "Null":
            return { value: "null", type: "null" } as NullVal;
        case "BinaryExpr":
            return evaluateBinaryExpr(astNode as BinaryExpr)
        case "Program":
            return evaluateProgram(astNode as Program)
        default:
            console.error("This AST Node is not supported: ", astNode)
            return {} as RuntimeVal
    }

}