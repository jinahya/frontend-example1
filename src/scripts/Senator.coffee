class Senator extends Bourgeoisie
  worry: ->
    console.log("The polls are down 1%!")

senator = new Senator(45, 992)
senator.worry() # "The polls are down 1%!")
senator.profit(6, 10) # 132264