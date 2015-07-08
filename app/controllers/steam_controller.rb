class SteamController < ApplicationController

  def shared
    player_ids = params[:player_ids]

    unless player_ids.blank?

      # create players
      @players = player_ids.collect {|id| Player.new(id) }

      # select shared games
      @games = @players.each.inject([]) do |games, player|
        Game.get_shared(games, player.games)
      end

	  respond_to do |format|
		  format.html{ render 'steam/shared.html.erb' }
		  format.json{
			        render json: @games.to_json
		  }
	  end
    end
  end
end
