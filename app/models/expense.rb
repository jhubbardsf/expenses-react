class Expense < ApplicationRecord
  validates :description, presence: true
end
