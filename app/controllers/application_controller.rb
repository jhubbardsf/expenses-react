class ApplicationController < ActionController::Base
  include Pundit
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  after_filter :flash_to_http_header

  protected
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    end

  private
    def flash_to_http_header
      return unless request.xhr?
      return if flash.empty?
      response.headers['X-FlashMessages'] = flash.to_hash.to_json
      flash.discard  # don't want the flash to appear when you reload page
    end
end
