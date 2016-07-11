class ExpensesController < ApplicationController
  before_action :authenticate_user!
  before_action :current_expense, only: [:update, :destroy]

  def index
    @expenses = Expense.where(user_id: current_user)
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
      render json: @expense.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @expense = Expense.where(id: params[:id], user_id: current_user.id).first
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
