Rails.application.routes.draw do
  resources :expenses
  devise_for :users
  resources :users

  authenticated :user do
    root :to => 'expenses#index', as: :authenticated_root
  end

  root to: 'pages#index'
end
