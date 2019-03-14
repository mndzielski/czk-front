import moment from "moment";

export const rules = {
  required(value) {
    return !!value || "Pole jest wymagane";
  },
  email(value) {
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (
      emailRegex.test(String(value).toLowerCase()) ||
      "Email musi być prawidłowy"
    );
  },
  hour(value) {
    var isValid = /^([0-1][0-9]|2[0-4]):([0-5][0-9])$/.test(value);
    return isValid || "Zły format godziny";
  },
  date(value) {
    return moment(value, "DD.MM.YYYY", true).isValid() || "Zły format daty";
  },
  requiredArrayConditional(field) {
    return value => !!value.length || !!field || "Pole jest wymagane.";
  },
  requiredConditionalArray(array) {
    return value => !!value || !!array.length || "Pole jest wymagane.";
  }
};
