class Student extends Bourgeoisie
  worry: ->
    console.log("Does my privilege inherently make me complicit in the repression of less fortunate classes?")

  profit: (hardWork, luck, tuition) ->
    super(hardWork, luck) - tuition

student = new Student(21, 89)
student.worry() #"Does my privilege inherently make me complicit in the repression of less fortunate classes?"
student.profit(10, 10, 10000) #-11980
