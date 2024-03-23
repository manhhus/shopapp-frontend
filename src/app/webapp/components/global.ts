let globalVariable: number = 0;

export function setGlobalVariable(newValue: number): void {
    globalVariable = newValue;
}

export function getGlobalVariable(): number {
    return globalVariable;
}