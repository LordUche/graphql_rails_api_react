module Types
  class BookType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :cover_url, String, null: true
    field :average_rating, Float, null: true
  end
end
