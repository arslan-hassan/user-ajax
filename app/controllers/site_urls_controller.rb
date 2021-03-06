class SiteUrlsController < ApplicationController
  before_action :set_site_url, only: %i[ show edit update destroy ]

  # GET /site_urls or /site_urls.json
  def index
    @site_urls = SiteUrl.all
  end

  # GET /site_urls/1 or /site_urls/1.json
  def show
  end

  # GET /site_urls/new
  def new
    @site_url = SiteUrl.new
  end

  # GET /site_urls/1/edit
  def edit
  end

  def create_urls
    # params["urls"]
    urls = params["urls"]
    if urls.present?
      urls.each do |url|
        url_created = SiteUrl.find_or_create_by(url: url)
        puts "???????????"
        puts "Created: ,#{url_created}"
      end

    end
  end

  # POST /site_urls or /site_urls.json
  def create
    @site_url = SiteUrl.new(site_url_params)

    respond_to do |format|
      if @site_url.save
        format.html { redirect_to site_url_url(@site_url), notice: "Site url was successfully created." }
        format.json { render :show, status: :created, location: @site_url }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @site_url.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /site_urls/1 or /site_urls/1.json
  def update
    respond_to do |format|
      if @site_url.update(site_url_params)
        format.html { redirect_to site_url_url(@site_url), notice: "Site url was successfully updated." }
        format.json { render :show, status: :ok, location: @site_url }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @site_url.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /site_urls/1 or /site_urls/1.json
  def destroy
    @site_url.destroy

    respond_to do |format|
      format.html { redirect_to site_urls_url, notice: "Site url was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_site_url
      @site_url = SiteUrl.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def site_url_params
      params.require(:site_url).permit(:url, :date)
    end
end
