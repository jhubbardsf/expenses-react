class ExpensePolicy < ApplicationPolicy
  attr_reader :current_user, :expense

  def initialize(current_user, expense)
    @current_user = current_user
    @expense = expense
  end

  def index?
    @current_user.admin?
  end

  def show?
    @current_user.admin? or @current_user == @user
  end

  def update?
    @current_user.admin? or @current_user == @user
  end

  def destroy?
    return false if @current_user == @user
    @current_user.admin?
  end
end
