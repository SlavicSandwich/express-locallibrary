const mongoose = require("mongoose");

const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 150 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.first_name} ${this.family_name}`;
  }

  return fullname;
});

AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("lifespan_formatted").get(function () {
  let lifespan = "";

  lifespan += this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "????";

  lifespan += " - ";

  lifespan += this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : "????";

  return lifespan;
});

AuthorSchema.virtual("form_date_of_birth").get(function () {
  if (!this.date_of_birth) return "";

  const year = this.date_of_birth.getFullYear();
  const month = (this.date_of_birth.getMonth() + 1).toString().padStart(2, "0");
  const day = this.date_of_birth.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
});

AuthorSchema.virtual("form_date_of_death").get(function () {
  if (!this.date_of_death) return "";
  const year = this.date_of_death.getFullYear();
  const month = (this.date_of_death.getMonth() + 1).toString().padStart(2, "0");
  const day = this.date_of_death.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
});

module.exports = mongoose.model("Author", AuthorSchema);
