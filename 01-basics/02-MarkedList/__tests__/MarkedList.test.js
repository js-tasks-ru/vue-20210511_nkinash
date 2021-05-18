const { getSolutionPath } = require('taskbook-test-utils');
const path = require('path');
const fs = require('fs/promises');

describe('basics/MarkedList', () => {
  it('Задача добавлена, но требует ручной проверки', () => {});

  it('Исходный код script.js должен включать "new Vue"', async () => {
    const solutionText = await fs.readFile(path.join(__dirname, getSolutionPath('script.js')), 'utf8');
    expect(solutionText).toMatch(/\bnew\s+Vue\b/gmu);
  });
});
