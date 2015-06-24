class Player
  def initialize(id)
    @id = id
  end

  def games
    @games ||= Steam.get_owned_games(@id)
  end
end