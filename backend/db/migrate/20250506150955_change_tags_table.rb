class ChangeTagsTable < ActiveRecord::Migration[8.0]
  def change
    remove_column :tags, :memo_id
    remove_index :tags, :title if index_exists?(:tags, :title)

    add_index :tags, :title
  end
end
