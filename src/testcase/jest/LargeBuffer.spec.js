class TestA {
  func() {
    return true
  }
}

test('返回Boolean', () => {
  expect(new TestA().func()).toBe(true)
})
