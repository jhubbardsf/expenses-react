class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  before_save :default_values
  has_many :expenses, :dependent => :destroy


  def self.roles
    %w(user manager admin)
  end

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
