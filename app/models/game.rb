class Game
  attr_accessor :appid, :name

  def initialize(attrs)
    @appid = attrs['appid']
    @name = attrs['name']
  end

  def self.get_shared(first_list, second_list)
    return second_list if first_list.empty?
    ids = first_list.collect{|game| game.appid }
    second_list.select{|game| ids.include? game.appid }
  end
end