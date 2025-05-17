class Api::V1::CategoriesController < ApplicationController

  # GET api/v1/categories
  def index
    categories = Category.all
    render json: {data: categories}
  end

  # POST api/v1/categories
  def create
    category = Category.build(
      title: params[:title]
    )

     if category.save
      render json: { status: 'success', data: category }, status: :created
    else
      render json: { status: 'error', errors: category.errors.full_messages }, status: :unprocessable_entity
    end
  end

end
