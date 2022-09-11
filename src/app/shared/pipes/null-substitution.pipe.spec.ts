import { NullSubstitutionPipe } from './null-substitution.pipe';

describe('NullSubstitutionPipe', () => {
  it('create an instance', () => {
    const pipe = new NullSubstitutionPipe();
    expect(pipe).toBeTruthy();
  });
});
