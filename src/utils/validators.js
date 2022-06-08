import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  rank: Yup.number().required("Required"),
});
