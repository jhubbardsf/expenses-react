class CreateExpenses < ActiveRecord::Migration[5.0]
  def change
    create_table :expenses do |t|
      t.integer :user_id
      t.string :description
      t.string :payee
      t.float :amount
      t.string :category
      t.date :date

      t.timestamps
    end

    add_index :expenses, :user_id
  end
end
