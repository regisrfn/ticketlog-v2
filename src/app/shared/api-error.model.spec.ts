import { ApiError } from './api-error.model';

describe('ApiError', () => {
  it('should create an instance', () => {
    expect(new ApiError()).toBeTruthy();
  });
});
