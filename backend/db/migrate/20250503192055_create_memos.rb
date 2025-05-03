class CreateMemos < ActiveRecord::Migration[8.0]
  def change
    create_table :memos do |t|
      t.string :title
      t.string :content
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
