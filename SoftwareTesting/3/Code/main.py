class Lab4(object):
    def PositiveD_3x3(matr):
        return (matr[0][0] * matr[1][1] * matr[2][2]
                + matr[1][0] * matr[2][1] * matr[0][2]
                + matr[0][1] * matr[1][2] * matr[2][0]) - (
                       matr[0][2] * matr[1][1] * matr[2][0]
                       + matr[0][0] * matr[1][2] * matr[2][1]
                       + matr[0][1] * matr[1][0] * matr[2][2]) >= 0

    def ReplaceAllAfterDiez(s):
        try:
            first_in = s.index('#') + 1
            length = len(s)
            if first_in > length:
                return s
            else:
                return s[0:first_in] + '@' * (length - first_in)
        except ValueError:
            return s


    def FoundMinimalStrFromFile(fName):
        with open(fName, 'r') as f:
            return min(f.read().split('\n')[:-1], key=len)