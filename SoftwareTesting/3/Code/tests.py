import os
from main import Lab4
import unittest


class testPositiveD_3x3(unittest.TestCase):
    def allElementsAreSame(self):
        matr = [[1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]]
        expected = True

        actual = Lab4.PositiveD_3x3(matr)

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')

    def allElementsAreZeroes(self):
        matr = [[0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]]
        expected = True

        actual = Lab4.PositiveD_3x3(matr)

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')

    def testPositive(self):
        matr = [[5, 2, 3],
                [2, 6, 1],
                [3, 1, 7]]
        expected = True

        actual = Lab4.PositiveD_3x3(matr)

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')

    def testNegative(self):
        matr = [[-11, -6, -6],
                [-6, -6, -3],
                [-6, 3, -6]]
        expected = False

        actual = Lab4.PositiveD_3x3(matr)

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')


class testStringReplacer(unittest.TestCase):
    def testOneSymbolString(self):
        s = 'A'
        expected = 'A'

        actual = Lab4.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')

    def testEmptyString(self):
        s = ''
        expected = ''

        actual = Lab4.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')
                         
    def testAllDiezString(self):
        s = '##########'
        expected = '#@@@@@@@@@'

        actual = Lab4.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')

    def testStringWithoutDiez(self):
        s = 'Hello, world!'
        expected = 'Hello, world!'

        actual = Lab4.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')

    def testStringWithDiez(self):
        s = 'Hello,#world!'
        expected = 'Hello,#@@@@@@'

        actual = Lab4.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')

    def testStringWithManyDiez(self):
        s = 'Hel#o,#world!'
        expected = 'Hel#@@@@@@@@@'

        actual = Lab4.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')
    
    def testStringFirstDiez(self):
        s = '#ello, world!'
        expected = '#@@@@@@@@@@@@'

        actual = Lab4.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')
                         
    def testStringLastDiez(self):
        s = 'Hello, world#'
        expected = 'Hello, world#'

        actual = Lab4.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')


class testFoundMinimalStrInFile(unittest.TestCase):
    def testOneString(self):
        fName = 'testEqual.txt'
        strDat = ['12345']
        with open(fName, 'w') as f:
            for s in strDat:
                f.write(s + '\n')

        expected = strDat[0]
        actual = Lab4.FoundMinimalStrFromFile(fName)

        os.remove(fName);

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')
                         
    def testEmptyFile(self):
        fName = 'testEmpty.txt'
        with open(fName, 'w') as f:
            f.write('\n')

        expected = ''
        actual = Lab4.FoundMinimalStrFromFile(fName)

        os.remove(fName)

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')

    def testAllEquivalent(self):
        fName = 'testEqual.txt'
        strDat = ['12345', '67890',
                  '52132', '51231']
        with open(fName, 'w') as f:
            for s in strDat:
                f.write(s + '\n')

        expected = strDat[0]
        actual = Lab4.FoundMinimalStrFromFile(fName)

        os.remove(fName);

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')

    def testFirstMin(self):
        fName = 'testNormal.txt'
        strDat = ['12345', '6722152890',
                  '521', '5123121']
        with open(fName, 'w') as f:
            for s in strDat:
                f.write(s + '\n')

        expected = strDat[2]
        actual = Lab4.FoundMinimalStrFromFile(fName)

        os.remove(fName);
        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')
                        
    def testLastMin(self):
        fName = 'testNormal.txt'
        strDat = ['12345', '6722152890',
                  '521', '5123121']
        with open(fName, 'w') as f:
            for s in strDat:
                f.write(s + '\n')

        expected = strDat[2]
        actual = Lab4.FoundMinimalStrFromFile(fName)

        os.remove(fName);
        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')
                         
    def testNormal(self):
        fName = 'testNormal.txt'
        strDat = ['12345', '6722152890',
                  '521', '5123121']
        with open(fName, 'w') as f:
            for s in strDat:
                f.write(s + '\n')

        expected = strDat[2]
        actual = Lab4.FoundMinimalStrFromFile(fName)

        os.remove(fName);
        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')

    def testAllEmpty(self):
        fName = 'testNormal.txt'
        strDat = ['', '',
                  '', '']
        with open(fName, 'w') as f:
            for s in strDat:
                f.write(s + '\n')

        expected = strDat[0]
        actual = Lab4.FoundMinimalStrFromFile(fName)

        os.remove(fName);
        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')

if __name__ == '__main__':
    logFile = 'log_file.txt'
    with open(logFile, 'w') as f:
        runner = unittest.TextTestRunner(f)
        unittest.main(testRunner = runner, verbosity=2)
