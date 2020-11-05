import os
import main
import unittest

class testPositiveD_3x3(unittest.TestCase):
    def testPositive(self):
        matr = [[5, 2, 3],
                [2, 6, 1],
                [3, 1, 7]]
        expected = True

        actual = main.PositiveD_3x3(matr)

        self.assertEqual(expected, actual, f'Expected: {expected}\nGot: {actual}')

    def testNegative(self):
        matr = [[-11, 6, -6],
                [6, -6, 3],
                [-6, 3, -6]]
        expected = False

        actual = main.PositiveD_3x3(matr)

        self.assertEqual(expected, actual, f'Expected: {expected}\nGot: {actual}')

class testStringReplacer(unittest.TestCase):
    def testEmptyString(self):
        s = ''
        expected = ''

        actual = main.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual, f'Expected: {expected}\nGot: {actual}')


    def testStringWithoutDiez(self):
        s = 'Hello, world!'
        expected = 'Hello, world!'

        actual = main.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual, f'Expected: {expected}\nGot: {actual}')


    def testStringWithDiez(self):
        s = 'Hello,#world!'
        expected = 'Hello,#@@@@@@'

        actual = main.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual, f'Expected: {expected}\nGot: {actual}')


    def testStringWithManyDiez(self):
        s = 'Hel#o,#world!'
        expected = 'Hel#@@#@@@@@@'

        actual = main.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual, f'Expected: {expected}\nGot: {actual}')

class testFoundMinimalStrInFile(unittest.TestCase):
    def testEmptyFile(self):
        fName = 'testEmpty.txt'
        with open(fName, 'w') as f:
            f.write('\n')

        expected = ''
        actual = main.FoundMinimalStrFromFile(fName)

        os.remove(fName)

        self.assertEqual(expected, actual, f'Expected: {expected}\nGot: {actual}')

    def testAllEquivalent(self):
        fName = 'testEqual.txt'
        strDat = ['12345', '67890',
                  '52132', '51231']
        with open(fName, 'w') as f:
            for s in strDat:
                f.write(s+'\n')

        expected = strDat[0]
        actual = main.FoundMinimalStrFromFile(fName)

        os.remove(fName);

        self.assertEqual(expected, actual, f'Expected: {expected}\nGot: {actual}')

    def testNormal(self):
        fName = 'testNormal.txt'
        strDat = ['12345', '6722152890',
                  '521', '5123121']
        with open(fName, 'w') as f:
            for s in strDat:
                f.write(s+'\n')

        expected = strDat[2]
        actual = main.FoundMinimalStrFromFile(fName)

        os.remove(fName);
        self.assertEqual(expected, actual, f'Expected: {expected}\nGot: {actual}')

if __name__ == '__main__':
    unittest.main()
