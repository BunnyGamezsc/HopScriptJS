export type ValueType = "null" | "integer" | "float"

export interface RuntimeVal {
    type: ValueType;
}

export interface NullVal extends RuntimeVal {
    type: "null";
    value: "null";
}

export interface IntegerVal extends RuntimeVal {
    type: "integer";
    value: number;
}
export interface FloatVal extends RuntimeVal {
    type: "float";
    value: number;
}
