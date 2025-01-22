def solve():
    import sys

    for line in sys.stdin:
        n = int(line)
        if n == 0:
            break
        
        if n == 1:
            print(0)
            continue
        
        target = n - 1
        x = 0
        while x * (x + 1) // 2 < target:
            x += 1
        
        print(x)


if __name__ == "__main__":
    solve()
