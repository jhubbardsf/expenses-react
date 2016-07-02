Rails.application.routes.draw do
  resources :expenses
  devise_for :users
  root to: 'pages#index'
  resources :users
end
