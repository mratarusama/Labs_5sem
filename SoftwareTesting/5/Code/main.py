class Lab5(object):
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