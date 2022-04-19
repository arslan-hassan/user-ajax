Rails.application.routes.draw do
  resources :site_urls
  resources :site_urls , only: [] do
    post "create_urls", :on => :collection
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "site_urls#new"
end
