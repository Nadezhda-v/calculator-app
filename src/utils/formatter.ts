// Функция для добавления пробела между операторами
export const formatOperand = (operand: string) => {
  return operand.replace(/([+\-*/])/g, ' $1 ').trim();
};
