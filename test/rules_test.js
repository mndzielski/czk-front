import assert from "assert";
import {rules} from '../src/_rules/rules';


describe("rules", () => {
  describe("#required()", () => {
    const result = 'Pole jest wymagane';
    it(`Zwraca '${result}' gdy podana wartość jest pusta`, () => {
      assert.equal(rules.required(''), result);
    });

    it(`Zwraca 'true' gdy podana wartość nie jest pusta`, () => {
      assert.equal(rules.required('sth'), true);
    });
  });

  describe("#email()", () => {
    const result = 'Email musi być prawidłowy';
    it(`Zwraca '${result}' gdy podana wartość nie jest emailem`, () => {
      assert.equal(rules.email('sd@s'), result);
    });

    it(`Zwraca 'true' gdy podana wartość jest emailem`, () => {
      assert.equal(rules.email('aaa@ooo.pl'), true);
    });
  });

  describe("#hour()", () => {
    const result = 'Zły format godziny';
    it(`Zwraca '${result}' gdy podana wartość nie jest godziną`, () => {
      assert.equal(rules.hour('hh:mm'), result);
    });

    it(`Zwraca 'true' gdy podana wartość jest godziną`, () => {
      assert.equal(rules.hour('21:39'), true);
    });
  });

  describe("#date()", () => {
    const result = 'Zły format daty';
    it(`Zwraca '${result}' gdy podana wartość nie jest datą`, () => {
      assert.equal(rules.date('21.38.1222'), result);
    });

    it(`Zwraca 'true' gdy podana wartość jest datą`, () => {
      assert.equal(rules.date('22.12.2018'), true);
    });
  });
});
