Rails.application.routes.draw do
  resources :expenses
  devise_for :users
  root to: 'pages#index'
  resources :users

  authenticated :user do
    root :to => 'expenses#index'
  end
end
