class AddCoverUrlAndAverageRatingsToBooks < ActiveRecord::Migration[6.0]
  def change
    add_column :books, :cover_url, :string
    add_column :books, :average_rating, :decimal
  end
end
