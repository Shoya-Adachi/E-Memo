class Memo < ApplicationRecord
  belongs_to :category
  has_many :memo_tag, dependent: :destroy
  has_many :tag, through: :memo_tag
end
