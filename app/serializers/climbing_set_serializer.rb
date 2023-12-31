class ClimbingSetSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :set_name, :week, :image_url, :date_start, :date_end, :notes, :climbs, :formatted_start_date, :formatted_end_date, :slug

  has_many :climbs do
    object.climbs.order(grade: :asc)
  end
  
  
  def image_url
    if object.image.attached?
      rails_blob_url(object.image, only_path: true)
    end
  end

  def slug
    object.slugify
  end

end
