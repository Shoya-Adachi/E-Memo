class CreateTags < ActiveRecord::Migration[8.0]
  def change
    create_table :tags do |t|
      t.string :title
      t.references :memo, null: false, foreign_key: true

      t.timestamps
    end
    add_index :tags, [:title], unique: true
  end
end
