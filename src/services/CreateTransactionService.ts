import TransactionsRepository from '../repositories/TransactionsRepository'
import Transaction from '../models/Transaction'

interface RequestDTO {
  title: string
  value: number
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transaction type is invalid')
    }

    const { total } = this.transactionsRepository.getBalance()

    if (type === 'outcome' && value > total) {
      throw new Error('Saldo insuficiente')
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    })
    return transaction
  }
}

export default CreateTransactionService
