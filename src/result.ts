/*
MIT License

Copyright (c) [2022] [Max Byrde]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/**
 * An object signaling that a function call completed successfully.
 */
export class Ok<R, E> {
  /**
   * The value returned by the function call.
   */
  readonly val: R;

  constructor(val: R) {
    this.val = val;
  }

  /**
   * @returns Whether or not this Result is an instance of Ok.
   */
  ok(): this is Ok<R, E> {
    return true;
  }

  /**
   * @returns Whether or not this Result is an instance of Err.
   */
  err(): this is Err<E, R> {
    return false;
  }
}

/**
 * An object signaling that a function call failed with an error.
 */
export class Err<E, R> {
  /**
   * The error reported by the function call.
   */
  readonly error: E;

  constructor(err: E) {
    this.error = err;
  }

  /**
   * @returns Whether or not this Result is an instance of Ok.
   */
  ok(): this is Ok<R, E> {
    return false;
  }

  /**
   * @returns Whether or not this Result is an instance of Err.
   */
  err(): this is Err<E, R> {
    return true;
  }
}

/**
 * Declares the possible returns values of a function.
 * @template R Return value if there is no error.
 * @template E Return value if an error occurs.
 */
export type Result<R, E> = Ok<R, E> | Err<E, R>;

/**
 * Builds an Ok object for given value.
 * @param val The value to be returned.
 * @returns A new Ok object with given value.
 */
export function ok<R>(val: R) {
  return new Ok<R, never>(val);
}

/**
 * Builds an Err object for given error.
 * @param error The error to be returned.
 * @returns A new Err object with given error.
 */
export function err<E>(error: E) {
  return new Err<E, never>(error);
}
