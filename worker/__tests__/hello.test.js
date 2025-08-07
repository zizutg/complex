const { sum } = require('../path/to/your/worker/module'); // Adjust the path as necessary

test('hello world!', () => {
	expect(sum(1, 2)).toBe(3);
});