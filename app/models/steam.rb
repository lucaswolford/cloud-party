class Steam

  def self.get_owned_games(id)
    key = Rails.application.secrets.steam_api_key
    url = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=#{key}&steamid=#{id}&include_appinfo=1&format=json"

    JSON.parse(HTTParty.get(url).body)['response']['games'].collect do |game|
      Game.new(game)
    end

  end

end