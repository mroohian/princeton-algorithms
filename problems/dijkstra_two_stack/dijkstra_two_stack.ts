const ignoreSymbols = " \t\n";
const digits = "0123456789";
const operators = "+-*/";

export function dijkstraTwoStack(expression: string): number {
  function error(message = "Unknown error"): never {
    throw new Error(`Invalid expression: ${message}`);
  }

  if (!expression) {
    error('Empty expression');
  }

  const symbols = expression.trim().split("");

  const valueStack: number[] = [];
  const operatorStack: string[] = [];

  function performOperation(): void {
    const operator = operatorStack.pop();

    const value2 = valueStack.pop();
    const value1 = valueStack.pop();

    if (value1 === undefined || value2 === undefined) {
      error("Not enough value in operation stack");
    }

    switch (operator) {
      case "+":
        valueStack.push(value1 + value2);
        break;
      case "-":
        valueStack.push(value1 - value2);
        break;
      case "*":
        valueStack.push(value1 * value2);
        break;
      case "/":
        valueStack.push(value1 / value2);
        break;
      default:
        error(`Invalid operator ${operator}`);
    }
  }

  let parenthesisCount = 0;
  let num = "";

  for (const symbol of symbols) {
    if (digits.includes(symbol)) {
      num += symbol;
      continue;
    }

    if (num) {
      valueStack.push(parseInt(num, 10));
      num = "";
    }

    if (ignoreSymbols.includes(symbol)) {
      continue;
    }

    if (operators.includes(symbol)) {
      operatorStack.push(symbol);
      continue;
    }

    if (symbol === "(") {
      parenthesisCount++;
      continue;
    }

    if (symbol === ")") {
      parenthesisCount--;
      performOperation();
      continue;
    }

    error(`Unknown symbol ${symbol}`);
  }

  if (num) {
    valueStack.push(parseInt(num, 10));
  }

  if (parenthesisCount !== 0) {
    error("Unbalanced parenthesis");
  }

  while (operatorStack.length > 0) {
    performOperation();
  }

  const result = valueStack.pop();

  if (
    result === undefined ||
    valueStack.length !== 0 ||
    operatorStack.length !== 0
  ) {
    error("Incorrect number of values and operators");
  }

  return result;
}
