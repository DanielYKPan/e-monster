import { DateStringPipe } from './date-string.pipe';

describe('DateStringPipe', () => {
  it('create an instance', () => {
    const pipe = new DateStringPipe();
    expect(pipe).toBeTruthy();
  });
});
