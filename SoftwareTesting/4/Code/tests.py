import os
import main
import unittest


class testlab4_IntegrateTests(unittest.TestCase):
    def testNormalTests(self):
        inputVals = [[5, 3], [1, 1], [7, 1], [2, 2], [58, 17]]
        expected = [15, 1, 7, 4, 986]
        
        testingClass = main.RectangleArea()
        actual = []
        print()
        for testCase in inputVals:
            testingClass.a = testCase[0]
            testingClass.b = testCase[1]
            result = testingClass.do()
            print(str(testCase[0])+' * '+str(testCase[1])+' = '+str(result))
            actual.append(result)

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')
    
    def testZeroLength(self):
        testingClass = main.RectangleArea()
        testingClass.a = 0
        testingClass.b = 0
        
        expected = ValueError
        
        self.assertRaises(expected, testingClass.do)
    
    def testNegativeValue(self):
        testingClass = main.RectangleArea()
        testingClass.a = -5
        testingClass.b = -10
        
        expected = ValueError
        
        self.assertRaises(expected, testingClass.do)

if __name__ == '__main__':
    logFile = 'log_file.txt'
    with open(logFile, 'w') as f:
        runner = unittest.TextTestRunner(f)
        unittest.main(testRunner = runner)
