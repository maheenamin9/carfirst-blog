import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const BlogForm = () => {
  const navigate = useNavigate();
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const token = useSelector((state) => state.token);  
  const [show, setShow] = useState(false);
  // formik form
  const formikObj = useFormik({
    initialValues: {
      title: "",
      category: "",
      image: "",
      description: ""
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .min(6, "Title must be between 6 and 100 characters")
        .max(100, "Title must be between 6 and 100 characters"),
      category: Yup.string().required("Category is required"),
      image: Yup.mixed()
        .required("Image is required")
        .test("fileType", "Unsupported format", (value) => {
          const test =
            !value || (value && SUPPORTED_FORMATS.includes(value.type));
          return test;
        })
        .test(
          "size",
          "File size is too large",
          (value) => !value || (value && value.size <= 1024 * 1024)
        ), // 1 mb
      description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be between 10 and 100 characters")
        .max(500, "Description must be between 10 and 500 characters"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      // values are JS object, convert it into form data
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("image", values.image);
      // formData.append('postedBy', user)
      
      try {
        await fetch("http://localhost:3000/api/blogs", {
          method: "POST",
          headers: {
            "x-auth-token": token
          },
          body: formData,
        });
        setShow(true);
        // navigate("/blogs");

      } catch (err) {
        console.log(err.message);
      }
      resetForm({ values: "" });
    },
  });

  return (
    <div className="flex justify-center">
      <Card className="w-[35%] my-10 relative">
        <form className="px-9 py-14" onSubmit={formikObj.handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="border-2 border-green-900 p-3 w-full"
              placeholder="Title"
              name="title"
              value={formikObj.values.title}
              onChange={formikObj.handleChange}
              onBlur={formikObj.handleBlur}
            />
            {formikObj.errors.title && formikObj.touched.title ? (
              <p className="text-[#ff0000] text-sm mt-1">
                {formikObj.errors.title}
              </p>
            ) : null}
          </div>
          <div className="mb-4">
            <select
              className="border-2 border-green-900 p-3 w-full"
              name="category"
              value={formikObj.values.category || 'DEFAULT'}
              onChange={formikObj.handleChange}
              onBlur={formikObj.handleBlur}
            >
              <option value="DEFAULT" disabled>Select your blog category</option>
              <option>Main Stories</option>
              <option>Company Updates</option>
              <option>Latest Posts</option>
            </select>
            {formikObj.errors.category && formikObj.touched.category ? (
              <p className="text-[#ff0000] text-sm mt-1">
                {formikObj.errors.category}
              </p>
            ) : null}
          </div>
          <div className="mb-4">
            <input
              type="file"
              name="image"
              onChange={(e) =>
                formikObj.setFieldValue("image", e.target.files[0])
              }
              className="
            border-2 border-green-900
            w-full
            font-medium
            text-body-color
            placeholder-body-color
            focus:border-primary
            active:border-primary
            transition
            disabled:bg-[#F5F7FD] disabled:cursor-default
            cursor-pointer
            file:bg-[#F5F7FD]
            file:border-0
            file:border-solid
            file:border-r
            file:border-collapse
            file:border-form-stroke
            file:py-3
            file:px-5
            file:mr-5
            file:text-body-color
            file:cursor-pointer
            file:hover:bg-primary
            file:hover:bg-opacity-10
            "
            />
            {formikObj.errors.image && formikObj.touched.image ? (
              <p className="text-[#ff0000] text-sm mt-1">
                {formikObj.errors.image}
              </p>
            ) : null}
          </div>
          <div className="mb-4">
            <textarea
              className="border-2 border-green-900 p-3 w-full"
              rows="3"
              placeholder="Description"
              name="description"
              value={formikObj.values.description}
              onChange={formikObj.handleChange}
              onBlur={formikObj.handleBlur}
            ></textarea>
            {formikObj.errors.description && formikObj.touched.description ? (
              <p className="text-[#ff0000] text-sm">
                {formikObj.errors.description}
              </p>
            ) : null}
          </div>
            <Button className="w-full" type="submit">
              Add Blog
            </Button>
        </form>
      </Card>

      {show && <div className="flex items-center justify-center w-full h-screen top-0 bg-black bg-opacity-50 fixed">
        <Card className="w-[30%] bg-white">
          <div className="px-9 py-9">
            <div className="mb-8">
            <p className="font-bold text-lg">Thank you for posting blog</p>
            <p>Wait admin for its approval...</p>
            </div>
            <Link to="/blogs"><Button className="w-full" type="submit">Ok</Button></Link>
          </div>  
        </Card>
      </div>}
    </div>
  );
};

export default BlogForm;
