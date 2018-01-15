import { describe, it } from 'mocha';
import assume from 'assume';
import knock from './index';

describe('knock', function () {
  it('is exported as function', function () {
    assume(knock).is.a('function');
  });

  it('returns a function', function () {
    assume(knock('/what')).is.a('function');
  });

  it('just works (tm) for basic urls', function () {
    const test = knock('/foo');

    assume(test('/foo')).is.true();
  });

  describe('validators', function () {
    it('call the validators for the params', function (next) {
      next = assume.wait(2, 2, next);

      const test = knock('/:foo/:another', {
        foo: (value) => {
          assume(value).equals('bar');

          next();
          return true;
        },

        another: (value) => {
          assume(value).equals('foo');

          next();
          return true;
        }
      });

      test('/bar/foo');
    });

    it('passes tests if we have no validators defined but have params', function (){
      const test = knock('/:foo/:another');

      assume(test('/bar/foo')).is.true();
    });

    it('passes tests if we have a param that doesnt have a validator', function () {
      const test = knock('/:foo/:another', {
        another: (value) => {
          assume(value).equals('foo');
          return true;
        }
      });

      assume(test('/bar/foo')).is.true();
    });

    it('passes if all validators return true', function () {
      const test = knock('/:foo/:another', {
        foo: (value) => {
          assume(value).equals('bar');
          return true;
        },

        another: (value) => {
          assume(value).equals('foo');
          return true;
        }
      });

      assume(test('/bar/foo')).is.true();
      assume(test('/bar/foo')).is.true();
      assume(test('/bar/foo')).is.true();
      assume(test('/bar/foo')).is.true();
    });

    it('returns false if a validator returns false', function () {
      const test = knock('/:foo/:another', {
        foo: (value) => {
          assume(value).equals('bar');
          return true;
        },

        another: (value) => {
          assume(value).equals('foo');
          return false;
        }
      });

      assume(test('/bar/foo')).is.false();
      assume(test('/bar/foo')).is.false();
      assume(test('/bar/foo')).is.false();
      assume(test('/bar/foo')).is.false();
    });
  })
});
