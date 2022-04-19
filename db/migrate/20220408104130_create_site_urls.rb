class CreateSiteUrls < ActiveRecord::Migration[6.1]
  def change
    create_table :site_urls do |t|
      t.string :url
      t.date :date

      t.timestamps
    end
  end
end
