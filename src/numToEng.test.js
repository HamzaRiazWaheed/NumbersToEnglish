import convertNumberToEnglish from "./numToEng.mjs";

describe("Convert Numeric Values to english", () => {
  test('1 to one', () => { 
    const english = convertNumberToEnglish("1");
    expect(english).toBe("one");
  });

  test('1111', () => { 
    const english = convertNumberToEnglish("1111");
    expect(english).toBe("one thousand one hundred eleven");
  });

  test('11.11', () => { 
    const english = convertNumberToEnglish("11.11");
    expect(english).toBe("eleven . eleven");
  });

  test('Negative', () => { 
    const english = convertNumberToEnglish("-1");
    expect(english).toBe("Number out of allowed range of 0 and 99999");
  });

  test('above 99 999', () => { 
    const english = convertNumberToEnglish("999999");
    expect(english).toBe("Number out of allowed range of 0 and 99999");
  });

  test('Pass Non-numeric values', () => { 
    const english = convertNumberToEnglish("a");
    expect(english).toBe("Not A Valid Number");
  });
})