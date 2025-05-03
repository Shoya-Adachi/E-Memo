# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Category.create!(
  [
    { title: 'Test' },
    { title: '勉強'},
    { title: '日記'}
  ]
)

Memo.create!(
  [
    { title: 'memoのテスト', content: 'あああああああああああ', category_id: 1},
    { title: 'spaについて', content: 'spaは「single page application」の略', category_id: 2},
    { title: '2025/5/3', content: '今日はユニーク項目と外部キー設定を学んだ', category_id: 3}
  ]
)

Tag.create!(
  [
    { title: 'test', memo_id: 1},
    { title: 'React', memo_id: 2},
    { title: 'Web', memo_id: 2},
    { title: 'daily', memo_id: 3}
  ]
)