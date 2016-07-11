class Expense < ApplicationRecord
  validates :description, presence: true
  validates :date, presence: true
  validates :category, presence: true
  validates :payee, presence: true
  validates :amount, presence: true
end
