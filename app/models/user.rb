class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  before_save :default_values

  def default_values
    self.role ||= 'user'
  end

  def regular?
    role == 'user'
  end

  def admin?
    role == 'admin'
  end

  def manager?
    role == 'manager'
  end
end
