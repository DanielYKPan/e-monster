import { ArrayToStringPipe } from './array-to-string.pipe';

describe('ArrayToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
