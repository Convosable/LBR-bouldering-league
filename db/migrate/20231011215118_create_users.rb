class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :username
      t.string :password_digest
      t.string :email
      t.integer :handicap
      t.integer :points, default: 0
      t.integer :team_id, default: nil

      t.timestamps
    end
  end
end
