import React, { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { BASE_URL } from "./config/index";
import SuccessAlert from "./components/success_alert";
import ErrorAlert from "./components/error_alert";
import DeleteModal from "./components/delete_modal";
import AddPersonModal from "./components/add_edit_person_modal";
import Loading from "./components/loading";
import EmptyState from "./components/empty_state";
import People from "./components/people";
import { userSchema } from "./utils/validators";

function App() {
  const [people, setPeople] = useState([]);
  const [addForm, setAddForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [apiResponse, setApiResponse] = useState();
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setSubmitting,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      rank: 0,
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (!addForm) {
        handleEditPerson(values);
        return;
      }
      handleAddPerson(values);
    },
  });

  const formikProps = {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setSubmitting,
    resetForm,
    setFieldValue,
  };

  const handleShowAlert = useCallback((data) => {
    setShowAlert(true);
    setApiResponse({
      message:
        data.message || data.error ? JSON.stringify(data.error) : "API error!",
      success: data.success,
    });
  }, []);

  const handleHideAlert = useCallback((data) => {
    setShowAlert(false);
    setApiResponse();
  }, []);

  const getUsers = useCallback(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/users`)
      .then(({ data }) => {
        setPeople(data.data);
      })
      .catch(({ response }) => {
        const { data } = response;
        handleShowAlert(data);
      })
      .finally(() => setIsLoading(false));
  }, [handleShowAlert, setPeople]);

  const handleShowAddPersonForm = useCallback(() => {
    setShowAddPersonModal(true);
  }, [setShowAddPersonModal]);

  const handleHideAddPersonForm = useCallback(() => {
    setShowAddPersonModal(false);
  }, [setShowAddPersonModal]);

  const handleHideAddForm = useCallback(() => {
    resetForm();
    handleHideAddPersonForm();
    setAddForm(true);
  }, [resetForm, handleHideAddPersonForm]);

  const handleAddPerson = useCallback(
    (values) => {
      values.rank = parseInt(values.rank);
      axios
        .post(`${BASE_URL}/users`, { ...values })
        .then(({ data }) => {
          handleShowAlert(data);
          handleHideAddForm();
          getUsers();
        })
        .catch(({ response }) => {
          const { data } = response;
          handleShowAlert(data);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
    [setSubmitting, handleHideAddForm, handleShowAlert, getUsers]
  );

  const handleEditPerson = useCallback(
    (values) => {
      values.rank = parseInt(values.rank);
      axios
        .patch(`${BASE_URL}/users/${values.id}`, { ...values })
        .then(({ data }) => {
          handleShowAlert(data);
          handleHideAddForm();
          getUsers();
        })
        .catch(({ response }) => {
          const { data } = response;
          handleShowAlert(data);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
    [setSubmitting, handleHideAddForm, handleShowAlert, getUsers]
  );

  const handleSetFieldValue = (values) => {
    setFieldValue("firstName", values.firstName);
    setFieldValue("lastName", values.lastName);
    setFieldValue("rank", values.rank);
    setFieldValue("id", values.id);
  };

  const handleEdit = (person) => {
    handleSetFieldValue(person);
    handleShowAddPersonForm();
    setAddForm(false);
  };

  const handleDelete = (person) => {
    handleSetFieldValue(person);
    setShowDeleteModal(true);
  };

  const handleDeletePerson = useCallback(
    (person) => {
      setIsDeleteLoading(true);
      axios
        .delete(`${BASE_URL}/users/${person.id}`)
        .then(({ data }) => {
          handleShowAlert(data);
          setShowDeleteModal(false);
          getUsers();
        })
        .catch(({ response }) => {
          const { data } = response;
          handleShowAlert(data);
        })
        .finally(() => {
          setIsDeleteLoading(false);
        });
    },
    [getUsers, handleShowAlert]
  );

  const handleUpdatePersonRank = useCallback(
    (value, id) => {
      axios
        .patch(`${BASE_URL}/users/${id}`, { rank: parseInt(value) })
        .then(({ data }) => {
          handleShowAlert(data);
          getUsers();
        })
        .catch(({ response }) => {
          const { data } = response;
          handleShowAlert(data);
        });
    },
    [getUsers, handleShowAlert]
  );

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="mt-20 py-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">People</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the people in your account including their name and
            rank.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            onClick={handleShowAddPersonForm}
          >
            Add person
          </button>
        </div>
      </div>

      {showAlert && (
        <>
          {apiResponse.success ? (
            <SuccessAlert
              message={apiResponse.message}
              onClick={handleHideAlert}
            />
          ) : (
            <ErrorAlert
              message={apiResponse.message}
              onClick={handleHideAlert}
            />
          )}
        </>
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {people.length <= 0 ? (
            <EmptyState />
          ) : (
            <People
              people={people}
              handleUpdatePersonRank={(value, id) =>
                handleUpdatePersonRank(value, id)
              }
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </>
      )}

      {showDeleteModal && (
        <DeleteModal
          person={values}
          onCancelClick={() => setShowDeleteModal(false)}
          onDeleteClick={() => handleDeletePerson(values)}
          isSubmitting={isDeleteLoading}
        />
      )}

      {showAddPersonModal && (
        <AddPersonModal
          {...formikProps}
          addForm={addForm}
          handleHideAddForm={handleHideAddForm}
        />
      )}
    </div>
  );
}

export default App;
