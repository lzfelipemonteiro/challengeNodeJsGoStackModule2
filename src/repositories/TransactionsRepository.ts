import Transaction from '../models/Transaction'

interface Balance {
  income: number
  outcome: number
  total: number
}

interface CreateTransactionDTO {
  title: string
  value: number
  type: 'income' | 'outcome'
}

// interface TotalTransactionBalance {
//   transaction: Transaction[]
//   balance: Balance
// }

class TransactionsRepository {
  private transactions: Transaction[]

  // private totalTransactionBalance: TotalTransactionBalance

  constructor() {
    this.transactions = []
    // this.totalTransactionBalance
  }

  public all(): Transaction[] {
    const totalTransactions = this.transactions

    // const income = totalTransactions
    //   .filter(transactions => transactions.type === 'income')
    //   .reduce((accumulator, currentValue) => accumulator + currentValue)

    // const outcome = totalTransactions
    //   .filter(transactions => transactions.type === 'outcome')
    //   .reduce((accumulator, currentValue) => accumulator + currentValue)

    return totalTransactions
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transactions: Transaction) => {
        switch (transactions.type) {
          case 'income':
            accumulator.income += transactions.value
            break
          case 'outcome':
            accumulator.outcome += transactions.value
            break
          default:
            break
        }

        return accumulator
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
    const total = income - outcome

    return { income, outcome, total }
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type })

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository
