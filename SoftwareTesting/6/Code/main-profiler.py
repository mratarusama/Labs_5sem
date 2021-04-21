import cProfile
import main

pr = cProfile.Profile()

multiply = main.Multiply()
square = main.RectangleArea()

pr.enable()

multiply.x = 2635858
multiply.y = 5758582
multiply.do()

square.a = 75265274
square.b = 67373493
square.do()

pr.disable()

pr.print_stats()