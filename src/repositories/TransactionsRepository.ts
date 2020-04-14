import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.getIncome();

    const outcome = this.getOutcome();

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }

  private getIncome(): number {
    return this.getAccumulatedTransactionsValueByType('income');
  }

  private getOutcome(): number {
    return this.getAccumulatedTransactionsValueByType('outcome');
  }

  private getAccumulatedTransactionsValueByType(type: string): number {
    return this.transactions.reduce((accumulator, transaction) => {
      if (transaction.type === type) {
        return accumulator + transaction.value;
      }
      return accumulator;
    }, 0);
  }
}

export default TransactionsRepository;
