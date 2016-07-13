class Expense < ApplicationRecord
  validates :description, presence: true
  validates :date, presence: true, format: { with: /\d{4}\-\d{2}\-\d{2}/, message: 'Date must be in the following format: yyyy-mm-dd' }
  validates :category, presence: true
  validates :payee, presence: true
  validates :amount, presence: true, format: { with: /\A\d+(?:\.\d{0,2})?\z/, message: 'Invalid amount, format examples: 109.88, -12.88' }
end