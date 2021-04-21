import os
from main import Lab5
import unittest


class testStringReplacer(unittest.TestCase):
    def testOneSymbolString(self):
        s = 'A'
        expected = 'A'

        actual = Lab5.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')

    def testEmptyString(self):
        s = ''
        expected = ''

        actual = Lab5.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')
                         
    def testAllDiezString(self):
        s = '##########'
        expected = '#@@@@@@@@@'

        actual = Lab5.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')

    def testStringWithoutDiez(self):
        s = 'Hello, world!'
        expected = 'Hello, world!'

        actual = Lab5.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')

    def testStringWithDiez(self):
        s = 'Hello,#world!'
        expected = 'Hello,#@@@@@@'

        actual = Lab5.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')

    def testStringWithManyDiez(self):
        s = 'Hel#o,#world!'
        expected = 'Hel#@@@@@@@@@'

        actual = Lab5.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')
    
    def testStringFirstDiez(self):
        s = '#ello, world!'
        expected = '#@@@@@@@@@@@@'

        actual = Lab5.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')
                         
    def testStringLastDiez(self):
        s = 'Hello, world#'
        expected = 'Hello, world#'

        actual = Lab5.ReplaceAllAfterDiez(s);

        self.assertEqual(expected, actual,
                         f'Expected: {expected}\nGot: {actual}')

if __name__ == '__main__':
    logFile = 'log_file.txt'
    with open(logFile, 'w') as f:
        runner = unittest.TextTestRunner(f)
        unittest.main(testRunner = runner, verbosity=2)
