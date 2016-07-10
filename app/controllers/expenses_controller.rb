class ExpensesController < ApplicationController
  before_action :current_expense, only: [:update, :destroy]

  def index
    @expenses = Expense.all
  end

  def create
    @expense = Expense.new(expense_params)

    if @expense.save
      render json: @expense
    else
      render json: @expense.errors, status: :unprocessable_entity
    end
  end

  def update
    if @expense.update(expense_params)
      render json: @expense
    else
      render json: @expense.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @expense = Expense.find(params[:id])
    @expense.destroy
    head :no_content
  end

  private

    def expense_params
      params.require(:expense).permit(:description, :amount, :date, :payee, :category).merge(user_id: current_user.id)
    end

    def current_expense
      @expense = Expense.find(params[:id])
    end
end
