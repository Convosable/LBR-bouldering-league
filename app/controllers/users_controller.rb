class UsersController < ApplicationController

    skip_before_action :authorize, only: :create

    
    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        render json: @current_user, status: :ok
    end
    


# USING FOR POSTMANTESTING

    # def index
    #     render json: User.all
    # end

    # def show
    #     user = User.find(params[:id])
    #     render json: user, status: :ok
    # end

    # def update
    #     user = User.find(params[:id])
    #     user.update!(user_params)
    #     render json: user, status: :accepted
    # end

   

    private

    def user_params
        params.permit(:first_name, :last_name, :username, :password, :password_confirmation, :email, :handicap, :points, :team_id)
    end

    #upon initial creation of user, team_id not included, when the user signs up for a team, team id will be given a value

end


