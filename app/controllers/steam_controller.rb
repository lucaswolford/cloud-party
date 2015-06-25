class SteamController < ApiController

  def shared
    player_ids = params[:player_ids]

    # create players
    @players = player_ids.collect {|id| Player.new(id) }

    # select shared games
    @games = @players.each.inject([]) do |games, player|
      Game.get_shared(games, player.games)
    end

    render json: @games.to_json
  end

end
