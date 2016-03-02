class Bourgeoisie
  constructor: (@age, @privilegeConstant) ->

  worry: ->
    console.log("My stocks are down 1%!")

  profit: (hardWork, luck) ->
    return (@age - 23) * hardWork * (luck + @privilegeConstant)

elite = new Bourgeoisie(29, 397)
elite.worry() # "My stocks are down 1%!"
elite.profit(20, 50) #53640