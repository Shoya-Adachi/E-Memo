class Tag < ApplicationRecord
  belongs_to :memo
  has_many :memo_tag, dependent: :destroy   # オプション（不要な場合もある）
  has_many :memo, through: :memo_tag
end
