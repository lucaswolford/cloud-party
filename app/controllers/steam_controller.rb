class SteamController < ApplicationController

  def index
  end

  def new
    player_ids = [
      '76561198018519384',
      '76561197984012553',
      '76561198002019198']

    # create players
    @players = player_ids.collect {|id| Player.new(id) }

    # select shared games
    @games = @players.each.inject([]) do |games, player|
      Game.get_shared(games, player.games)
    end

    render json: @games.to_json
  end

end
