class Api::V1::MemoController < ApplicationController

  def index
    memo = Memo.all
    render json: {
      status: 'success', 
      memos: memo.as_json(only: [:id, :title, :content, :category_id])
    }
  end

  def show
    memo = Memo.find(params[:id])
    render json: {data: memo}
  end

  def search
    conditions = params.permit(:category_id).to_h

    memo = Memo.where(conditions)

    if memo
      render json: {status: 'success', data: memo}, status: :ok
    else
      render json: { status: 'error', errors: memo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    memo = Memo.find(params[:id])

    if memo.update(content: params[:content])
      render json: {status: 'success', data: memo}, status: :ok
    else
      render json: { status: 'error', errors: memo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    memo = Memo.find(params[:id])

      if memo
        memo.destroy
        head :no_content
      else
        render json: {error: 'memo not found'}, status: :not_found
      end
  end

end
